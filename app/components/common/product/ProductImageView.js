import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import ModalOKButton from "../../button/ModalOKButton";
import { cloudImageUrl } from "../../../libs/apis/image.api";
import "./ProductImageView.scss";

const ProductImageView = ({ isOpen, onClose, getAssetsApi }) => {
  const { exec, state } = useApi(getAssetsApi);
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (isOpen) {
      exec();
    }
  }, [isOpen]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      setItems(state.resp.filter(t => t !== null));
    }
  }, [state]);

  const slides = useMemo(
    () =>
      items.map(item => (
        <CarouselItem
          className="text-center"
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.fileId}
        >
          <img
            src={cloudImageUrl(item)}
            alt="asset"
            style={{ height: "600px", width: "800px", objectFit: "contain" }}
          />
          <CarouselCaption captionText={item.name} />
        </CarouselItem>
      )),
    [items],
  );

  return (
    <Modal
      scrollable
      size="xl"
      isOpen={isOpen}
      fade={false}
      className="product-image-view"
    >
      <ModalHeader toggle={onClose} tag="div">
        <div className="row">
          <div className="col-auto">Image</div>
          <div className="col text-center">
            <strong>{items[activeIndex]?.name}</strong>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </ModalBody>
      <ModalFooter>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        <ModalOKButton type="button" onClick={onClose}>
          Close
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

ProductImageView.propTypes = {
  getAssetsApi: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default ProductImageView;
