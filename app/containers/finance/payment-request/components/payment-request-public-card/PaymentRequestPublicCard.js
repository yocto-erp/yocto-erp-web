import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PaymentRequestApi } from "../../../../../libs/apis/public/payment-request.api";
import PaymentRequestStatusView from "../PaymentRequestStatusView";
import Price from "../../../../../components/common/Price";
import { PAYMENT_METHOD } from "../../../payment/constants";
import PaymentRequestPayOSView from "../partner/PaymentRequestPayOSView";
import { PaymentRequestStatus } from "../../constants";

const PaymentRequestPublicCard = ({ paymentRequestPublicId }) => {
  const [paymentRequestInfo, setPaymentRequest] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    PaymentRequestApi.get(paymentRequestPublicId).then(resp => {
      setPaymentRequest(resp);
      setStatus(resp.paymentRequest.status);
    });
  }, [paymentRequestPublicId]);

  const reloadStatus = useCallback(() => {
    setTimeout(() => {
      PaymentRequestApi.get(paymentRequestPublicId).then(resp => {
        if (resp.paymentRequest.status === PaymentRequestStatus.PENDING) {
          reloadStatus();
        } else {
          setStatus(resp.paymentRequest.status);
        }
      });
    }, 5000);
  }, [paymentRequestPublicId]);

  useEffect(() => {
    if (status === PaymentRequestStatus.PENDING && paymentRequestPublicId) {
      reloadStatus();
    }
  }, [paymentRequestPublicId, status]);

  if (!paymentRequestInfo) {
    return null;
  }

  const { paymentRequest, paymentPartner } = paymentRequestInfo;

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">
          Tình trạng thanh toán: <PaymentRequestStatusView status={status} />
        </p>
        <p className="card-text">
          Số tiền: <Price amount={paymentRequest.totalAmount} />
        </p>
        {paymentRequest.status === PaymentRequestStatus.PENDING && (
          <>
            <p className="text-danger">Vui lòng thanh toán để xác nhận.</p>
            {paymentRequest.paymentMethod.paymentTypeId ===
              PAYMENT_METHOD.PAYOS && (
              <PaymentRequestPayOSView partnerPayment={paymentPartner} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

PaymentRequestPublicCard.propTypes = {
  paymentRequestPublicId: PropTypes.string.isRequired,
};

export default PaymentRequestPublicCard;
