import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CreateButton from "../../button/CreateButton";
import ModalCancelButton from "../../button/ModalCancelButton";
import SubmitButton from "../../button/SubmitButton";
import ProductSelect from "./ProductSelect";
import "./ProductMultipleSelect.scss";
import { thumbnail } from "../../../libs/apis/image.api";
import noImage from "../../../images/No_image_available.svg";
import { isArrayHasItem } from "../../../utils/util";

const ProductMultipleSelect = React.forwardRef((
  { onChange, value },
  // eslint-disable-next-line no-unused-vars
  ref,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(false);

  const onRemoveItem = index => {
    const newItems = [...value];
    newItems.splice(index, 1);
    onChange(newItems);
    return newItems;
  };

  const viewList = useMemo(() => {
    if (value) {
      return (
        <ReactSortable className="row mb-4" list={value} setList={onChange}>
          {value.map((item, i) => (
            <div className="col-auto " key={item.id}>
              <div
                className="card mt-2 product-wrapper"
                style={{ width: "18rem", cursor: "move" }}
              >
                <img
                  src={item.thumbnail ? thumbnail(item.thumbnail) : noImage}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="mt-0 mb-0 font-weight-bold">
                    {item.productDocumentId}
                  </p>
                  <p className="mt-0 mb-0">{item.name}</p>
                </div>
                <div className="buttons">
                  <Button
                    size="sm"
                    type="button"
                    color="danger"
                    onClick={() => {
                      onRemoveItem(i);
                    }}
                  >
                    <i className="fa fa-trash" />{" "}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ReactSortable>
      );
    }
    return null;
  }, [value]);

  return (
    <div>
      {viewList}
      <CreateButton size="sm" type="button" onClick={() => setIsOpen(true)}>
        Add Product
      </CreateButton>
      <Modal className="primary" size="lg" isOpen={isOpen}>
        <ModalHeader toggle={() => setIsOpen(false)}>
          <>Chọn sản phẩm</>
        </ModalHeader>
        <ModalBody>
          <ProductSelect
            isMulti
            mappingProduct={null}
            value={product}
            name="product"
            onChange={val => setProduct(val)}
          />
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => setIsOpen(false)}>
            Close
          </ModalCancelButton>
          <SubmitButton
            type="button"
            onClick={() => {
              if (isArrayHasItem(product)) {
                const newProducts = [...value];
                for (let i = 0; i < product.length; i += 1) {
                  const item = product[i];
                  if (!newProducts.find(t => t.id === item.id)) {
                    newProducts.push(item);
                  }
                }
                onChange(newProducts);
              }
              setIsOpen(false);
              setProduct(null);
            }}
          >
            Choose Product
          </SubmitButton>
        </ModalFooter>
      </Modal>
    </div>
  );
});

ProductMultipleSelect.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default ProductMultipleSelect;
