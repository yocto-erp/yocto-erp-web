import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PaymentRequestApi } from "../../../../../libs/apis/public/payment-request.api";
import PaymentRequestStatusView from "../PaymentRequestStatusView";
import Price from "../../../../../components/common/Price";
import { PAYMENT_METHOD } from "../../../payment/constants";
import PaymentRequestPayOSView from "../partner/PaymentRequestPayOSView";
import { PaymentRequestStatus } from "../../constants";
import { API_STATE, useApi } from "../../../../../libs/hooks/useApi";
import BlockUI from "../../../../../components/blockUI/BlockUI";

const PaymentRequestPublicCard = ({ paymentRequestPublicId }) => {
  const [status, setStatus] = useState(null);
  const { exec, state } = useApi(PaymentRequestApi.get);

  useEffect(() => {
    exec(paymentRequestPublicId).then(resp => {
      setStatus(resp.paymentRequest.status);
    });
  }, [paymentRequestPublicId]);

  const reloadStatus = useCallback(
    (waitTime = 5000) => {
      setTimeout(() => {
        console.log("Update payment status");
        PaymentRequestApi.get(paymentRequestPublicId).then(
          resp => {
            if (resp.paymentRequest.status === PaymentRequestStatus.PENDING) {
              reloadStatus();
            } else {
              setStatus(resp.paymentRequest.status);
            }
          },
          err => {
            console.log(err.message);
            reloadStatus(10000);
          },
        );
      }, waitTime);
    },
    [paymentRequestPublicId],
  );

  useEffect(() => {
    if (status === PaymentRequestStatus.PENDING && paymentRequestPublicId) {
      reloadStatus();
    }
  }, [paymentRequestPublicId, status]);

  return (
    <div className="card">
      <div className="card-body">
        <BlockUI isShow={state.status === API_STATE.LOADING}>
          {state.resp && (
            <>
              <p className="card-text">
                Tình trạng thanh toán:{" "}
                <PaymentRequestStatusView status={status} />
              </p>
              <p className="card-text">
                Số tiền:{" "}
                <Price amount={state.resp.paymentRequest.totalAmount} />
              </p>
              {status === PaymentRequestStatus.PENDING && (
                <>
                  <p className="text-danger">
                    Vui lòng thanh toán để xác nhận.
                  </p>
                  {state.resp.paymentRequest.paymentMethod.paymentTypeId ===
                    PAYMENT_METHOD.PAYOS && (
                    <PaymentRequestPayOSView
                      partnerPayment={state.resp.paymentPartner}
                    />
                  )}
                </>
              )}
            </>
          )}
        </BlockUI>
      </div>
    </div>
  );
};

PaymentRequestPublicCard.propTypes = {
  paymentRequestPublicId: PropTypes.string.isRequired,
};

export default PaymentRequestPublicCard;
