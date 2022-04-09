import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import PageTitle from "../../Layout/PageTitle";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import posApi from "../../../libs/apis/pos.api";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { POS_ROOT_PATH } from "./constants";

const ListPosPage = () => {
  const history = useHistory();
  const { exec, state } = useApi(posApi.listPos);

  useEffect(() => {
    exec();
  }, []);

  const widgets = useMemo(() => {
    if (state.status === API_STATE.SUCCESS) {
      if (state.resp.length === 0) {
        return (
          <div className="alert alert-danger h3">
            <p className="mb-0">
              You do not have any permission to access any POS
            </p>
          </div>
        );
      }
      return state.resp.map(t => (
        <div className="col-md-4">
          <div className="card text-white bg-primary">
            <div className="card-header text-capitalize font-weight-bold">
              {t.pos.name}
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Shop <strong>{t.pos.shop.name}</strong>
              </h5>
              <p className="card-text">
                Địa chỉ:{" "}
                <strong className="text-capitalize">
                  {t.pos.shop.address}
                </strong>
              </p>
              <p className="card-text">
                Warehouse: <strong>{t.pos.warehouse.name}</strong>
              </p>
              <button
                type="button"
                className="btn btn-info"
                onClick={() =>
                  history.push(`${POS_ROOT_PATH}/${t.pos.id}/order`)
                }
              >
                Open
              </button>
            </div>
          </div>
        </div>
      ));
    }
    return <LoadingIndicator />;
  }, [state]);

  return (
    <>
      <PageTitle title="POS List" />
      <div className="row">{widgets}</div>
    </>
  );
};

ListPosPage.propTypes = {};

export default ListPosPage;
