import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import Header from "../components/Header";
import "../index.scss";
import { cloudImageUrl } from "../../../libs/apis/image.api";
import noImage from "../../../images/No_image_available.svg";
import { formatMoney } from "../../../libs/utils/number.util";

const CheckOutFlowPage = () => {
  const { products } = useSelector(state => state.shop);
  return (
    <div className="public-page">
      <div className="background">
        <Header companyName="Company Name" />
        <main>
          <div className="container-fluid mt-5">
            <h1>List Product</h1>
            <div className="table-responsive mb-4">
              <Table bordered striped size="sm">
                <thead>
                  <tr>
                    <th className="min text-nowrap">Image</th>
                    <th className="min text-nowrap">Name</th>
                    <th className="min text-nowrap">Quantity</th>
                    <th className="min text-nowrap">Price/Per</th>
                    <th className="min text-nowrap">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map(item => (
                      <tr key={`product${item.product.id}`}>
                        <td>
                          <div className="media">
                            <img
                              style={{ width: "32px", height: "32px" }}
                              src={
                                item.product?.thumbnail
                                  ? cloudImageUrl(item.product?.thumbnail)
                                  : noImage
                              }
                              className="align-self-center mr-3"
                              alt="thumbnail"
                            />
                          </div>
                        </td>
                        <td>
                          {item.qty} x {item?.product?.webDisplayName} -{" "}
                          {formatMoney(item?.product.price, "VND")}
                        </td>
                        <td>{item.qty}</td>
                        <td>{formatMoney(item?.product.price, "VND")}</td>
                        <td>
                          {" "}
                          {formatMoney(item?.product.price * item.qty, "VND")}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td className="text-center" colSpan="4">
                      {products && products.length}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
            <h1>Shipping</h1>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

CheckOutFlowPage.propTypes = {};

export default CheckOutFlowPage;
