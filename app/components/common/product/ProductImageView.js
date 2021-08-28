import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
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
} from 'reactstrap';
import { API_STATE, useApi } from '../../../libs/hooks/useApi';
import productApi from '../../../libs/apis/product/product.api';
import ModalOKButton from '../../button/ModalOKButton';
import { imageUrl } from '../../../libs/apis/image.api';

const ProductImageView = ({ id, isOpen, onClose }) => {
  const { exec, state } = useApi(productApi.assets);
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
      exec(id);
    }
  }, [id, isOpen]);

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      setItems(state.resp);
    }
  }, [state]);

  const slides = useMemo(
    () =>
      items
        .map(t => t.asset)
        .map(item => (
          <CarouselItem
            className="text-center"
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.fileId}
          >
            <img
              src={imageUrl(item.fileId)}
              alt="asset"
              style={{ height: '600px', width: '800px', objectFit: 'contain' }}
            />
            <CarouselCaption captionText={item.name} />
          </CarouselItem>
        )),
    [items],
  );

  return (
    <Modal scrollable size="xl" isOpen={isOpen} fade={false}>
      <ModalHeader toggle={onClose}>Image</ModalHeader>
      <ModalBody>
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
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
        <ModalOKButton type="button" onClick={onClose}>
          Close
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

ProductImageView.propTypes = {
  id: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};

export default ProductImageView;
