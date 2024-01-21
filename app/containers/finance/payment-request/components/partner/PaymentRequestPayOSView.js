import React from "react";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";

/**
 * {
 * "bin": "970422",
 * "amount": 2000,
 * "qrCode": "00020101021238570010A000000727012700069704220113VQRQ00018vrjc0208QRIBFTTA5303704540420005802VN62210817TTZ6MZVH  Dang Ky63048BDE",
 * "status": "PENDING",
 * "currency": "VND",
 * "orderCode": 6,
 * "accountName": "LE PHUOC CANH", "checkoutUrl": "https://pay.payos.vn/web/dec52ab9506d44d78671fdf8e0c016ee", "description": "TTZ6MZVH  Dang Ky", "accountNumber": "VQRQ00018vrjc", "paymentLinkId": "dec52ab9506d44d78671fdf8e0c016ee"}
 * @param partnerPayment
 * @return {JSX.Element}
 * @constructor
 */
const PaymentRequestPayOSView = ({ partnerPayment }) => {
  const {
    response: { qrCode },
  } = partnerPayment;
  return (
    <>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 256,
          padding: "4px",
          background: "white",
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrCode}
          viewBox="0 0 256 256"
        />
      </div>
      <p className="text-primary font-weight-bold mt-2 text-center">
        Quét mã QR để thanh toán qua bất kỳ App ngân hàng nào.
      </p>
    </>
  );
};

PaymentRequestPayOSView.propTypes = {
  partnerPayment: PropTypes.object.isRequired,
};

export default PaymentRequestPayOSView;
