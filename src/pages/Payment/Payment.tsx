"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import styled from "styled-components"

const StyledCard = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
`

const CardHeader = styled.div`
  margin-bottom: 24px;
`

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`

const CardContent = styled.div`
  margin-bottom: 24px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
`

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
`

export default function PaymentForm() {
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [totalAmount, setTotalAmount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const pricePerToken = 60

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)
    const numericValue = Number.parseFloat(value) || 0
    setTotalAmount(numericValue * pricePerToken) // 6 Rials per token
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("https://api.infinitai.ir/payment/pay/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          amount,
          totalAmount: totalAmount.toFixed(2),
        }),
      })

      if (!response.ok) {
        throw new Error("Payment failed. Please try again.")
      }
    
      const result = await response.json()
      if (result.payment_url) {
        console.log("PPPP:", result.payment_url)
        window.location.href = result.payment_url; // Redirect to the payment page
      } else {
        throw new Error("Payment URL not provided by the server.");
      }
      console.log("Payment submitted successfully:", result)
      // Here you can handle the successful payment, e.g., show a success message or redirect the user
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <StyledCard>
      <CardHeader>
        <CardTitle>Payment Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="123-456-7890"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              required
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </FormGroup>
          <TotalAmount>
            <span>Price per token: {pricePerToken} Rials</span>
            <span>Total Amount: {totalAmount.toFixed(2)} Rials</span>
          </TotalAmount>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : `Pay ${totalAmount.toFixed(2)} Rials`}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </CardContent>
    </StyledCard>
  )
}

