import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { Button, Form } from "reactstrap";
import { BiMailSend, IoImagesSharp } from "react-icons/all";
import { toast } from "react-toastify";
import Editor from "../../../components/Form/Editor";
import useMyForm from "../../../libs/hooks/useMyForm";
import { EDITOR_TYPE } from "../../../components/constants";
import { COLOR } from "../../../styles/color";
import { commentApi } from "../../../libs/apis/comment.api";
import AssetSelect from "../../../components/assets/AssetSelect";
import { ALL_MIME_TYPE } from "../../../components/assets/constants";
import SubmitButton from "../../../components/button/SubmitButton";
import FormError from "../../../components/Form/FormError";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import CommentView from "./CommentView";

const schema = yup.object().shape({
  message: yup.string().required(),
});

export const COMMENT_PURPOSE = {
  PROVIDER: 1,
};

/* eslint-disable no-unused-vars */
const CommentEditor = ({ purpose, id }) => {
  const { onSubmit, formState, control, state, reset, resetState } = useMyForm({
    form: {},
    validationSchema: schema,
    api: data => {
      console.log(data);
      return commentApi.create(purpose, id, data);
    },
  });

  const [search, setSearch] = useState({
    page: 1,
    size: 10,
  });

  const [listComment, setListComment] = useState({
    rows: [],
    isMore: false,
  });

  const { exec, state: listState } = useApi(commentApi.search(purpose, id));

  const refresh = () =>
    exec({
      page: 1,
      size: search.page * search.size,
    }).then(t => {
      setListComment({
        rows: t.rows,
        isMore: t.rows.length === search.page * search.size,
      });
    });

  const next = () => {
    exec({
      page: search.page + 1,
      size: search.size,
    }).then(t => {
      setListComment({
        rows: [...listComment.rows, ...t.rows],
        isMore: t.rows.length === search.size,
      });
    });
    setSearch({
      ...search,
      page: search.page + 1,
    });
  };

  useEffect(() => {
    if (state.status === API_STATE.SUCCESS) {
      toast.success("Gởi ghi chú thành công");
      reset({});
      resetState();
      refresh();
    }
  }, [state]);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (listState.status === API_STATE.FAIL) {
      toast.error(listState.errors.map(t => t.message || t.code).join("\n"));
    }
  }, [listState]);

  return (
    <>
      <Form noValidate formNoValidate onSubmit={onSubmit}>
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
        <FormError errors={state.errors} className="mt-2" />
        <div className="mt-2 p-0 d-flex justify-content-between">
          <div className="align-self-center flex-grow-1">
            <Controller
              defaultValue={[]}
              name="assets"
              control={control}
              render={({ onChange, ...data }, { invalid }) => (
                <AssetSelect
                  fileTypes={ALL_MIME_TYPE}
                  buttonWrapperStyle="justify-content-start"
                  placeholder={
                    <>
                      <IoImagesSharp size={32} color={COLOR.primary} /> Tài liệu
                    </>
                  }
                  maxSize={500000}
                  {...data}
                  buttonStyle="link"
                  onChange={onChange}
                  className="h-100"
                  invalid={invalid}
                />
              )}
            />
          </div>

          <SubmitButton
            color="success"
            isLoading={state.status === API_STATE.LOADING}
            disabled={!formState.isDirty || !formState.isValid}
            className="align-self-start ml-2 text-nowrap"
            size="md"
          >
            <BiMailSend size={32} /> Send
          </SubmitButton>
        </div>
      </Form>
      <div className="list-comment">
        {listComment.rows.map(t => (
          <CommentView item={t} key={t.id} />
        ))}
        {listComment.isMore && (
          <Button
            type="button"
            color="info"
            className="mt-2"
            onClick={e => next()}
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};

CommentEditor.propTypes = {
  purpose: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default CommentEditor;
