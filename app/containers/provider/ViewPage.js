import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Button } from "reactstrap";
import { FaSignature } from "react-icons/fa";
import { API_STATE, useApi } from "../../libs/hooks/useApi";
import { providerApi } from "../../libs/apis/provider/provider.api";
import LoadingIndicator from "../../components/LoadingIndicator";
import PageTitle from "../Layout/PageTitle";
import messages from "./messages";
import SubjectView from "../partner/subject/components/SubjectView";
import ProviderStatus from "./components/ProviderStatus";
import Widget from "../../components/Widget/Widget";
import { formatDateFromStr } from "../../libs/utils/date.util";
import ProductView, {
  PRODUCT_VIEW_TYPE,
} from "../../components/common/product/ProductView";
import PreviewImage from "../../components/assets/AssetSelect/PreviewImage";
import ViewLargeAssetModal from "../../components/assets/ViewLargeAssetModal";
import BackButton from "../../components/button/BackButton";
import CommentEditor, {
  COMMENT_PURPOSE,
} from "../comment/components/CommentEditor";
import ProviderApproveStatus from "./components/ProviderApproveStatus";

const ViewPage = () => {
  const { id } = useParams();
  const { state, exec } = useApi(providerApi.read);
  const [enlargeFile, setEnlargeFile] = useState(null);

  const viewLarge = useCallback(
    (e, file) => {
      e.preventDefault();
      e.stopPropagation();
      setEnlargeFile(file);
    },
    [setEnlargeFile],
  );

  useEffect(() => {
    exec(id);
  }, [id]);

  if (state.status === API_STATE.LOADING) {
    return <LoadingIndicator />;
  }

  const { resp } = state;
  return (
    <>
      <PageTitle
        className=""
        colLeft={9}
        colRight={3}
        actions={
          <>
            <BackButton className="mr-2" />
            <Button type="button" color="primary">
              <FaSignature /> Sign
            </Button>
          </>
        }
        title={<FormattedMessage {...messages.viewPageTitle} />}
      />
      <Widget className="mb-0">
        <div className="row">
          <div className="col-md-7">
            <div className="d-flex justify-content-between align-items-center form-heading">
              <p className="mb-0">Đối tác </p>
              <small>
                Cập nhập{" "}
                {formatDateFromStr(resp?.lastModifiedDate || resp?.createdDate)}
              </small>
            </div>
            <div className="row">
              <div className="col-md-8">
                <SubjectView item={resp?.subject} isShowAddress isShowTagging />
                <p className="mt-4">
                  <ProviderStatus status={resp?.status} />
                </p>
              </div>
              <div className="col-md-4">
                <ProviderApproveStatus provider={resp} />
              </div>
            </div>

            <div className="mt-4" role="alert">
              {resp?.remark}
            </div>
            <p className="form-heading no-bottom mt-4">Sản phẩm</p>
            <div className="row row-cols-3">
              {resp?.products.map(t => (
                <div className="col mt-2" key={t.id}>
                  <ProductView item={t} type={PRODUCT_VIEW_TYPE.CARD} />
                </div>
              ))}
            </div>
            <p className="form-heading no-bottom mt-4">Tài liệu</p>
            <div className="row no-gutters">
              {resp?.assets.map(t => (
                <div className="col-auto" key={t.id}>
                  <PreviewImage
                    file={t}
                    onViewLarge={e => viewLarge(e, t)}
                    style={{ width: "120px" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-5">
            <p className="form-heading">Ghi chú</p>
            <CommentEditor id={id} purpose={COMMENT_PURPOSE.PROVIDER} />
          </div>
        </div>
        <ViewLargeAssetModal
          file={enlargeFile}
          onClose={() => setEnlargeFile(null)}
        />
      </Widget>
    </>
  );
};

ViewPage.propTypes = {};

export default ViewPage;
