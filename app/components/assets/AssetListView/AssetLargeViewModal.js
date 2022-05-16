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
import { FaFileDownload } from "react-icons/all";
import ModalOKButton from "../../button/ModalOKButton";
import { isArrayHasItem } from "../../../utils/util";
import AssetView from "./AssetView";
import { cloudAssetUrl } from "../../../libs/apis/image.api";
import "./AssetLargeViewModal.scss";

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
          className="text-center h-100"
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.fileId}
        >
          <AssetView asset={item} size={400} display="preview" />
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
      tabIndex="-1"
      size="xl"
      isOpen={isArrayHasItem(assets)}
      fade={false}
      className="product-image-view info"
      modalClassName="fullscreen"
      toggle={onClose}
      keyboard
    >
      <ModalHeader toggle={onClose} tag="div">
        <div className="row">
          <div className="col-auto">Asset</div>
          <div className="col align-items-center d-flex justify-content-center">
            <strong>{assets[activeIndex]?.name}</strong>
            <a
              href={cloudAssetUrl(assets[activeIndex])}
              target="_blank"
              className="ml-3 d-inline-flex justify-content-between align-items-center text-warning"
            >
              Tải về <FaFileDownload />
            </a>
          </div>
        </div>
      </ModalHeader>
      <ModalBody>
        <Carousel
          interval={false}
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          className="h-100"
        >
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
