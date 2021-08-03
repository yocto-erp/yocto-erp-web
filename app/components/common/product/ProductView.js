import React, { useState } from 'react';
import PropTypes from 'prop-types';

import noImage from '../../../images/No_image_available.svg';
import { imagePath } from '../../../libs/apis/image.api';
import ProductImageView from './ProductImageView';

const ProductView = ({ item }) => {
  const [isViewImage, setIsViewImage] = useState(false);
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
          onClick={() => {
            setIsViewImage(true);
          }}
          onKeyDown={() => {
            console.log('Set is view image');
            setIsViewImage(true);
          }}
        />
        <div className="media-body">
          <p className="mt-0 mb-0 font-weight-bold">{item.productDocumentId}</p>
          <p className="mt-0 mb-0">{item.name}</p>
        </div>
      </div>
      <ProductImageView
        id={item.id}
        isOpen={isViewImage}
        onClose={() => setIsViewImage(false)}
      />
    </>
  );
};

ProductView.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductView;
