import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from 'reactstrap';
import { useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import SubmitButton from '../../../../components/button/SubmitButton';
import ModalCancelButton from '../../../../components/button/ModalCancelButton';
import CreateButton from '../../../../components/button/CreateButton';
import FormRow from '../../../../components/Form/FormRow';
import surveyQuestionAdminApi from '../../../../libs/apis/survey/survey-question-admin.api';
import { SURVEY_QUESTION_TYPE } from '../../constants';
const validationSchema = Yup.object().shape({
  content: Yup.string().required('This field is required.'),
  type: Yup.number().required('This field is required.'),
  questionAnswers: Yup.array()
    .of(
      Yup.object().shape({
        key: Yup.string().required('This field is required.'),
        content: Yup.string().required('This field is required.'),
      }),
    )
    .required('This field is required.'),
});

const { read, create, update } = surveyQuestionAdminApi;
const QuestionModalForm = ({ isOpen, closeHandle, id, surveyId }) => {
  const {
    register,
    submit,
    errors,
    control,
    state: { isLoading },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Question ${resp.content} success`
          : `Create Question ${resp.content} success`,
      );
      closeHandle(resp);
    },
    mappingToForm: form => ({
      content: form.content,
      type: form.type,
      questionAnswers: form?.questionAnswers.map(t => ({ ...t })),
    }),
    mappingToServer: form => {
      const questionAnswers = form.questionAnswers.map(result => ({
        ...result,
        key: result.key,
        content: result.content,
      }));
      return {
        content: form.content,
        type: form.type,
        surveyId,
        questionAnswers,
      };
    },
    validationSchema,
    initForm: {
      content: '',
      type: 1,
      questionAnswers: [{ key: '', content: '' }],
    },
    id,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questionAnswers',
  });
  return (
    <Modal isOpen={isOpen} style={{ minWidth: '1000px' }}>
      <Form onSubmit={submit} noValidate formNoValidate>
        <ModalHeader toggle={() => closeHandle(false)}>
          Question Form
        </ModalHeader>
        <ModalBody>
          <FormRow
            label={
              <>
                Content<span className="text-danger">*</span>
              </>
            }
            name="content"
            type="textarea"
            error={errors.content}
            register={register}
            placeholder="Content"
          />
          <FormRow
            label={
              <>
                Type<span className="text-danger">*</span>
              </>
            }
            name="type"
            type="select"
            register={register}
            error={errors.type}
          >
            <option value={SURVEY_QUESTION_TYPE.RADIO}>RADIO</option>
            <option value={SURVEY_QUESTION_TYPE.CHECKBOX}>CHECKBOX</option>
          </FormRow>
          <FormGroup>
            <Label>Answers</Label>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>
                    Key<span className="text-danger">*</span>
                  </th>
                  <th>
                    Content<span className="text-danger">*</span>
                  </th>
                  <th className="action">Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <Input
                        type="textarea"
                        invalid={
                          !!get(
                            errors,
                            ['questionAnswers', index, 'key'],
                            false,
                          )
                        }
                        name={`questionAnswers[${index}].key`}
                        innerRef={register()}
                        defaultValue={item.key}
                      />
                      <FormFeedback>
                        {get(
                          errors,
                          ['questionAnswers', index, 'key', 'message'],
                          '',
                        )}
                      </FormFeedback>
                    </td>
                    <td>
                      <Input
                        invalid={
                          !!get(
                            errors,
                            ['questionAnswers', index, 'content'],
                            false,
                          )
                        }
                        type="textarea"
                        name={`questionAnswers[${index}].content`}
                        innerRef={register()}
                        defaultValue={item.content}
                      />
                      <FormFeedback>
                        {get(
                          errors,
                          ['questionAnswers', index, 'content', 'message'],
                          '',
                        )}
                      </FormFeedback>
                    </td>
                    <td className="action">
                      <Button
                        type="button"
                        color="danger"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <i className="fi flaticon-trash" />{' '}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">
                    <CreateButton
                      size="sm"
                      type="button"
                      onClick={() =>
                        append({
                          id: uuidv4(),
                          key: '',
                          content: '',
                        })
                      }
                    >
                      Add Answers
                    </CreateButton>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <ModalCancelButton onClick={() => closeHandle(false)} />
          <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
        </ModalFooter>
      </Form>
    </Modal>
  );
};

QuestionModalForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isOpen: PropTypes.bool.isRequired,
  closeHandle: PropTypes.func.isRequired,
  surveyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default QuestionModalForm;
