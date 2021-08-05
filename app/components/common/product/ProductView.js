import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import noImage from '../../../images/No_image_available.svg';
import { imagePath } from '../../../libs/apis/image.api';
import ProductImageView from './ProductImageView';
import { hasText } from '../../../utils/util';

const ProductView = ({ item }) => {
  const [isViewImage, setIsViewImage] = useState(false);
  const onViewListImage = useCallback(() => {
    if (item.thumbnail) {
      setIsViewImage(true);
    }
  }, [item]);
  return (
    <>
      <div className="media">
        <img
          role="presentation"
          src={item.thumbnail ? imagePath(item.thumbnail) : noImage}
          style={{ width: 48, height: 48, cursor: 'pointer' }}
          title="Click to view all image"
          className="mr-3"
          alt="..."
          onClick={onViewListImage}
          onKeyDown={onViewListImage}
        />
        <div className="media-body">
          <p className="mt-0 mb-0 font-weight-bold">{item.productDocumentId}</p>
          <p className="mt-0 mb-0">{item.name}</p>
        </div>
      </div>
      {hasText(item?.thumbnail) ? (
        <ProductImageView
          id={item.id}
          isOpen={isViewImage}
          onClose={() => setIsViewImage(false)}
        />
      ) : null}
    </>
  );
};

ProductView.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductView;
