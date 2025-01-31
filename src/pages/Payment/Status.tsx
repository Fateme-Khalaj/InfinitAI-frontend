"use client"

import { useEffect, useState, useRef } from "react"
import styled from "styled-components"


const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20px;
`

const StyledCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`

const CardHeader = styled.div`
  margin-bottom: 30px;
  text-align: center;
`

const CardTitle = styled.h2`
  color: #2d3436;
  font-size: 24px;
  margin: 0;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`

const DetailLabel = styled.span`
  color: #636e72;
  font-weight: 500;
`

const DetailValue = styled.span<{ $highlight?: boolean }>`
  color: ${props => props.$highlight ? '#2ecc71' : '#2d3436'};
  font-weight: 600;
  ${props => props.$highlight && 'font-size: 1.2em;'}
`

const StatusIndicator = styled.div<{ $status: 'success' | 'pending' | 'failed' }>`
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  margin: 24px 0;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${props => 
    props.$status === 'success' ? '#2ecc7120' :
    props.$status === 'pending' ? '#f1c40f20' :
    '#e74c3c20'};
  color: ${props => 
    props.$status === 'success' ? '#2ecc71' :
    props.$status === 'pending' ? '#f1c40f' :
    '#e74c3c'};
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`

const ActionButton = styled.button<{ $secondary?: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.$secondary ? '#636e72' : '#3498db'};
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`

const TransactionId = styled.span`
  font-family: monospace;
  color: #3498db;
`

// ... (keep all your existing styled components)
interface PaymentResponse {
    api_key: string;
    token: number;
    email: string;
    status: string;
  }

export default function PaymentCheckPage() {
  const [status, setStatus] = useState<string | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentResponse | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip first extra render in Strict Mode
    }
    // Parse query parameters
    const isMounted = true; // Track mounted state

    // Fetch payment details using the parameters
    const fetchPaymentDetails = async () => {
      try {
        const params = new URLSearchParams(window.location.search)
        const auth = params.get('Authority')
        const stat = params.get('Status')

        if (!auth || !stat) {
          throw new Error('Missing payment parameters')
        }

        setStatus(stat)
        const response = await fetch(`https://api.infinitai.ir/payment/verify/?Authority=${auth}&Status=${stat}`)

        if (!response.ok) {
          throw new Error('Failed to verify payment')
        }

        const data: PaymentResponse = await response.json();
        if (isMounted) {
          setPaymentData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Payment verification failed');
          setLoading(false);
        }
      }
    };

    fetchPaymentDetails();
     // Cleanup function
  }, []);

  if (loading) {
    return <StyledContainer>Loading payment details...</StyledContainer>
  }

  if (error) {
    return (
      <StyledContainer>
        <StyledCard>
          <CardHeader>
            <CardTitle>Payment Error</CardTitle>
          </CardHeader>
          <ErrorMessage>{error}</ErrorMessage>
        </StyledCard>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer>
      <StyledCard>
        <CardHeader>
          <CardTitle>Payment {status === 'OK' ? 'Successful' : 'Failed'}</CardTitle>
        </CardHeader>

        {/* Display payment details */}
        {paymentData && (
          <>
            <DetailRow>
              <DetailLabel>API Key:</DetailLabel>
              <TransactionId>{paymentData.api_key}</TransactionId>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Amount:</DetailLabel>
              <DetailValue>{paymentData.token}</DetailValue>
            </DetailRow>

            <DetailRow>
              <DetailLabel>Email:</DetailLabel>
              <DetailValue>{paymentData.email}</DetailValue>
            </DetailRow>

            {/* Rest of your payment details */}
          </>
        )}

        {/* <StatusIndicator $status={paymentData?.status || 'failed'}>
          Payment {paymentData?.status || 'unknown'}
        </StatusIndicator> 

        <ButtonGroup>
          <ActionButton>Back to Home</ActionButton>
            {status !== 'OK' && <ActionButton $secondary>Retry Payment</ActionButton>}
        </ButtonGroup>
        */}
      </StyledCard>
    </StyledContainer>
  )
}