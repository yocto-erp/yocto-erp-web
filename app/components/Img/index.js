/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-shimmer";
import { Spinner } from "reactstrap";
import noImage from "../../images/No_image_available.svg";

function Img(props) {
  return (
    <Image
      src={props.src}
      NativeImgProps={{
        className: props.className,
        alt: props.alt,
      }}
      errorFallback={() => <img src={noImage} alt="not available" />}
      fallback={
        <div
          className="display-flex h-100 align-items-center justify-content-center"
          style={{ opacity: 0.35 }}
        >
          <Spinner />
        </div>
      }
    />
  );
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.any])
    .isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
