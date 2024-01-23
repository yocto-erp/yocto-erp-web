import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormGroup, Label } from "reactstrap";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { API_STATE, useApi } from "../../../../libs/hooks/useApi";
import { FormPublicApi } from "../../../../libs/apis/form/form-public.api";
import Widget from "../../../../components/Widget/Widget";
import { cloudAssetUrl } from "../../../../libs/apis/image.api";
import FormViewClass from "../FormViewClass";
import FormViewProduct from "../FormViewProduct";
import NotFound from "../../../NotFoundPage";
import PaymentRequestPublicCard from "../../../finance/payment-request/components/payment-request-public-card/PaymentRequestPublicCard";
import "./FormRegisterInfoPage.scss";

const FormRegisterInfoPage = () => {
  const { publicId } = useParams();

  const { exec, state } = useApi(FormPublicApi.registerInfo);

  const { resp } = state;

  useEffect(() => {
    exec(publicId);
  }, [publicId]);

  return (
    <div className="public-page">
      <Header isShowSignUp={false} isShowCart={false} />
      <main>
        <div className="container mt-4">
          <Widget bodyClass="form-register-info-page">
            {resp && (
              <>
                {resp.form.banner && (
                  <div className="banner mb-3">
                    <img src={cloudAssetUrl(resp.form.banner)} alt="banner" />
                  </div>
                )}
                <div className="body-content">
                  <h1 className="display-4 mb-4">{resp.form.name}</h1>

                  <p className="thank-you">
                    Cảm ơn đã đăng ký thành công khoá học với thông tin chi tiết
                    sau:
                  </p>
                  <div className="row mt-5">
                    <div className="col-md-6 col-sm-12">
                      {resp.classes && resp.classes.length && (
                        <FormGroup>
                          <Label className="d-block text-center">
                            Khoá học
                          </Label>
                          <div className="container">
                            <div className="row justify-content-center row-cols-md-2 row-cols-sm-1">
                              {resp.classes.map(t => (
                                <div className="col p-2" key={t.id}>
                                  <FormViewClass
                                    isActive
                                    clazz={t}
                                    onClick={() => console.log("nothing")}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </FormGroup>
                      )}
                      {resp.products && resp.products.length && (
                        <FormGroup className="">
                          <Label className="d-block text-center">
                            Sản phẩm
                          </Label>
                          <div className="container">
                            <div className="row justify-content-center row-cols-md-2 row-cols-sm-1">
                              {resp.products.map(t => (
                                <div className="col p-2" key={t.id}>
                                  <FormViewProduct product={t} isActive />
                                </div>
                              ))}
                            </div>
                          </div>
                        </FormGroup>
                      )}
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <table className="table table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td className="min">Họ tên</td>
                            <td>{resp.name}</td>
                          </tr>
                          <tr>
                            <td className="min">Email</td>
                            <td>{resp.email}</td>
                          </tr>
                          <tr>
                            <td className="min">Số điện thoại</td>
                            <td>{resp.phone}</td>
                          </tr>
                          <tr>
                            <td className="min">Góp ý thêm</td>
                            <td>{resp.description}</td>
                          </tr>
                        </tbody>
                      </table>
                      {resp.payment && (
                        <div className="mt-4">
                          <PaymentRequestPublicCard
                            paymentRequestPublicId={resp.payment.publicId}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            {!resp && state.status === API_STATE.SUCCESS && (
              <div className="p-2">
                <NotFound />
              </div>
            )}
          </Widget>
        </div>
      </main>
      <Footer />
    </div>
  );
};

FormRegisterInfoPage.propTypes = {};

export default FormRegisterInfoPage;
