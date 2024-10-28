import React, { useEffect, useState } from "react";
import {
  CoffeeButton,
  PaymentButton,
} from "src/components/button/StyledButton";
import {
  CoffeeButtonContainer,
  Overlay,
  PopupContent,
  QRcodeContainer,
  QRCodeItem,
  VerticalDivider,
} from "./styles";

const Dashboard: React.FC = () => {
  const [coffeeOverlay, setCoffeeOverlay] = useState<boolean>(false);
  const [cryptoOverlay, setCryptoOverlay] = useState<boolean>(false);

  function coffeeButtonClick() {
    setCoffeeOverlay(true);
    setCryptoOverlay(false);
  }

  function cryptoButtonClick() {
    setCryptoOverlay(true);
    setCoffeeOverlay(false);
  }

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      setCoffeeOverlay(false);
      setCryptoOverlay(false);
    }
  }

  useEffect(() => {
    console.log("Crypto Overlay Status:", cryptoOverlay);
  }, [cryptoOverlay]);

  return (
    <>
      {(coffeeOverlay || cryptoOverlay) && (
        <Overlay onClick={handleOverlayClick}>
          <PopupContent>
            {coffeeOverlay && (
              <>
                <p
                  style={{
                    display: "flex",
                    color: "black",
                    marginBottom: "40px",
                  }}
                >
                  Thanks a lot for your kindness! You can use either payment
                  method.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <PaymentButton>Rial</PaymentButton>
                  <PaymentButton onClick={cryptoButtonClick}>
                    Crypto
                  </PaymentButton>
                </div>
              </>
            )}
            {cryptoOverlay && (
              <QRcodeContainer>
                <QRCodeItem>
                  <img
                    src="/img/BTC-2024-10-28 10.51.21.jpg"
                    alt="BTC"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <p>BTC: bc1qqkr508m7ekxvjgrux6dxxrt474p6fytludfl2h</p>
                </QRCodeItem>

                <VerticalDivider />

                <QRCodeItem>
                  <img
                    src="/img/ETH-2024-10-28 10.51.42.jpg"
                    alt="ETH"
                    style={{ width: "100px", height: "auto" }}
                  />
                  <p>ETH & USDT: 0x1833B62E481fD711977b3cf8172161a4f58F3Ea2</p>
                </QRCodeItem>
              </QRcodeContainer>
            )}
          </PopupContent>
        </Overlay>
      )}
      <CoffeeButtonContainer>
        <CoffeeButton onClick={coffeeButtonClick}>
          Buy me a coffee!
        </CoffeeButton>
      </CoffeeButtonContainer>
    </>
  );
};

export default Dashboard;
