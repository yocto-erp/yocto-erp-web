import React from 'react';
import PropTypes from 'prop-types';
import './AssetItem.scss';
import classnames from 'classnames';
import { MIME_TYPE } from '../constants';
import MimeTypeIcon from './MimeTypeIcon';

const AssetItem = ({
  id,
  lastModifiedDate,
  mimeType,
  name,
  size,
  thumbnail,
  className,
  ...props
}) => (
  <div className={classnames('asset-item-wrapper', className)} {...props}>
    <div className="asset-item">
      {mimeType !== MIME_TYPE.FOLDER ? (
        <div className="thumbnail">
          <img src={thumbnail} alt="thumbnail" />
        </div>
      ) : null}
      <div className="title">
        <MimeTypeIcon mimeType={mimeType} className="mr-2" />
        {name}
      </div>
    </div>
  </div>
);

AssetItem.propTypes = {
  id: PropTypes.any.isRequired,
  name: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  size: PropTypes.number,
  mimeType: PropTypes.string,
  thumbnail: PropTypes.string,
  className: PropTypes.string,
  onSelected: PropTypes.func,
};

export default AssetItem;
