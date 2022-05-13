import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { cloudImageUrl } from "../../../libs/apis/image.api";
import ModalOKButton from "../../button/ModalOKButton";
import { isArrayHasItem } from "../../../utils/util";

const AssetLargeViewModal = ({ assets, onClose, currentIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === assets.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? assets.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = useMemo(
    () =>
      assets.map(item => (
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
        </CarouselItem>
      )),
    [assets],
  );

  useEffect(() => {
    setActiveIndex(currentIndex || 0);
  }, [currentIndex]);

  return (
    <Modal
      scrollable
      size="xl"
      isOpen={isArrayHasItem(assets)}
      fade={false}
      className="product-image-view"
    >
      <ModalHeader toggle={onClose} tag="div">
        <div className="row">
          <div className="col-auto">Image</div>
          <div className="col text-center">
            <strong>{assets[activeIndex]?.name}</strong>
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
          items={assets}
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

AssetLargeViewModal.propTypes = {
  assets: PropTypes.array,
  onClose: PropTypes.func,
  currentIndex: PropTypes.number,
};

export default AssetLargeViewModal;
