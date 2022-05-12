import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { Button } from "reactstrap";
import { BiMailSend, IoImagesSharp } from "react-icons/all";
import Editor from "../../../components/Form/Editor";
import useMyForm from "../../../libs/hooks/useMyForm";
import { EDITOR_TYPE } from "../../../components/constants";
import { COLOR } from "../../../styles/color";

const schema = yup.object().shape({
  message: yup.string().required(),
});

export const COMMENT_PURPOSE = {
  PROVIDER: 1,
};

/* eslint-disable no-unused-vars */
const CommentEditor = ({ purpose, id }) => {
  const {
    reset,
    register,
    errors,
    onSubmit,
    control,
    state: { isLoading, errors: serverErrors },
  } = useMyForm({
    form: {},
    validationSchema: schema,
    api: data => {
      console.log(data);
      return new Promise(res => res(data));
    },
  });

  return (
    <div>
      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Editor
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            name="subject"
            type={EDITOR_TYPE.COMMENT}
            height={200}
          />
        )}
      />
      <div className="mt-2 p-0 d-flex justify-content-between">
        <Button color="link" size="sm">
          <IoImagesSharp size={32} color={COLOR.primary} />
        </Button>
        <Button color="success" onClick={() => console.log("Send")}>
          Send <BiMailSend size={24} />
        </Button>
      </div>
    </div>
  );
};

CommentEditor.propTypes = {
  purpose: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default CommentEditor;
