import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "reactstrap";
import { FaEdit, FaTrash } from "react-icons/all";
import noImage from "../../../images/No_image_available.svg";
import "./AvatarChoosen.scss";

const AvatarChoosen = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ value, invalid, onChange, defaultValue, isDirty }, ref) => {
    const imgRef = useRef();
    const [imageUrl, setImageUrl] = useState(null);
    const onFileChange = event => {
      console.log(event.target.files);
      if (event.target.files[0]) {
        onChange(event.target.files[0]);
      } else {
        onChange(null);
      }
    };

    useEffect(() => {
      if (value) {
        const reader = new FileReader();
        reader.onload = function onLoad() {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(value);
      } else {
        setImageUrl(null);
      }
    }, [value]);
    return (
      <div className={classnames("avatar-wrapper", { invalid })}>
        <label htmlFor="chooseFile" className="btn-edit btn btn-info">
          <FaEdit />
        </label>
        <Button
          size="sm"
          type="button"
          color="danger"
          className={classnames("btn-trash", {
            hide: !imageUrl && !defaultValue,
          })}
          onClick={() => onChange(null)}
        >
          <FaTrash />
        </Button>
        <img
          ref={imgRef}
          alt="avatar"
          className="img-thumbnail img-fluid"
          src={imageUrl || (!isDirty ? defaultValue : noImage)}
        />
        <input
          accept="image/*"
          type="file"
          id="chooseFile"
          className="hide"
          onChange={onFileChange}
        />
      </div>
    );
  },
);

AvatarChoosen.propTypes = {
  value: PropTypes.any,
  isDirty: PropTypes.bool,
  invalid: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default AvatarChoosen;
