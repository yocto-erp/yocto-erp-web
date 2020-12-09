import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import get from 'lodash/get';
import {
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { Controller, useFieldArray } from 'react-hook-form';
import { useHookCRUDForm } from '../../../../libs/hooks/useHookCRUDForm';
import BackButton from '../../../../components/button/BackButton';
import SubmitButton from '../../../../components/button/SubmitButton';
import Widget from '../../../../components/Widget/Widget';
import surveyAdminApi from '../../../../libs/apis/survey/survey-admin.api';
import TypeSelect from '../../../../components/Select/TypeSelect';
import FormErrorMessage from '../../../../components/Form/FormHookErrorMessage';
import { SURVEY_TYPE_OPTION } from '../constants';
import { ERROR } from '../../../../components/Form/messages';
import AddLanguageModal from './AddLanguageModal';
import { LANGUAGE_TYPE } from '../../constants';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required.'),
  type: Yup.number()
    .typeError(ERROR.required)
    .moreThan(0, ERROR.numberGT0)
    .required(ERROR.required),
  surveyI18Ns: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required('This field is required.')
          .nullable(true),
      }),
    )
    .required('Details is required'),
});

const { create, update, read } = surveyAdminApi;

function MyForm({ id }) {
  const {
    register,
    submit,
    errors,
    control,
    state: { isLoading, formData },
    formState: { isDirty, isValid },
  } = useHookCRUDForm({
    create,
    update,
    read,
    onSuccess: resp => {
      toast.success(
        id
          ? `Update Survey ${resp.name} success`
          : `Create Survey ${resp.name} success`,
      );
    },
    mappingToForm: form => ({
      name: form.name,
      remark: form.remark,
      type: form.type,
      surveyI18Ns: form.surveyI18Ns.map(t => ({ ...t })),
    }),
    validationSchema,
    initForm: {
      name: '',
      remark: '',
      type: 1,
      surveyI18Ns: [],
    },
    id,
  });

  const [activeTab, setActiveTab] = React.useState(0);
  const [isOpen, open] = React.useState(false);
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const { fields, append } = useFieldArray({
    control,
    name: 'surveyI18Ns',
    keyName: 'fId',
  });

  const form = React.useMemo(
    () => (
      <Form onSubmit={submit} noValidate formNoValidate>
        <FormGroup>
          <Label for="type" className="mr-sm-2">
            Type<span className="text-danger">*</span>
          </Label>
          <Controller
            name="type"
            defaultValue={formData ? formData?.type : ''}
            control={control}
            render={({ onChange, ...data }) => (
              <TypeSelect
                invalid={!!errors.type}
                id="type"
                placeholder="Select Type"
                onChange={val => {
                  onChange(val);
                }}
                isShow={false}
                options={SURVEY_TYPE_OPTION}
                {...data}
              />
            )}
          />
          <FormErrorMessage error={errors.type} />
        </FormGroup>
        <FormGroup>
          <Label for="type" className="mr-sm-2">
            Language<span className="text-danger">*</span>
          </Label>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === 0 })}
                  onClick={() => {
                    toggle(0);
                  }}
                >
                  Default
                </NavLink>
              </NavItem>
              {fields.map((item, index) => (
                <NavItem key={item.languageId}>
                  <NavLink
                    className={classnames({ active: activeTab === index + 1 })}
                    onClick={() => {
                      toggle(index + 1);
                    }}
                  >
                    {item.language.name}
                  </NavLink>
                </NavItem>
              ))}
              <NavItem>
                <NavLink onClick={() => open(true)}>Add Language</NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={0}>
                <Row>
                  <Col sm="12">
                    <FormGroup>
                      <Label for="name" className="mr-sm-2">
                        Name<span className="text-danger">*</span>
                      </Label>
                      <Input
                        invalid={!!errors.name}
                        type="text"
                        name="name"
                        innerRef={register}
                        id="name"
                        placeholder="Survey Name"
                      />
                      <FormFeedback>
                        {errors.name && errors.name.message}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label for="remark" className="required">
                        Remark
                      </Label>
                      <Input
                        type="textarea"
                        name="remark"
                        innerRef={register}
                        id="remark"
                        placeholder="Survey remark"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </TabPane>
              {fields.map((item, index) => (
                <TabPane key={item.languageId} tabId={index + 1}>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Input
                          type="hidden"
                          name={`surveyI18Ns[${index}].languageId`}
                          innerRef={register()}
                          id={`surveyI18Ns[${index}].languageId`}
                          defaultValue={item.languageId}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="name" className="mr-sm-2">
                          Name<span className="text-danger">*</span>
                        </Label>
                        <Input
                          invalid={
                            !!get(errors, ['surveyI18Ns', index, 'name'], false)
                          }
                          type="text"
                          name={`surveyI18Ns[${index}].name`}
                          innerRef={register()}
                          id={`surveyI18Ns[${index}].name`}
                          placeholder="Survey Name"
                          defaultValue={item.name}
                        />
                        <FormErrorMessage
                          error={get(errors, ['surveyI18Ns', index, 'name'])}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="remark" className="required">
                          Remark
                        </Label>
                        <Input
                          type="textarea"
                          name={`surveyI18Ns[${index}].remark`}
                          innerRef={register()}
                          id={`surveyI18Ns[${index}].remark`}
                          placeholder="Survey remark"
                          defaultValue={item.remark}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </TabPane>
              ))}
            </TabContent>
          </div>
        </FormGroup>
        <BackButton className="mr-2" />
        <SubmitButton disabled={!isValid || !isDirty} isLoading={isLoading} />
      </Form>
    ),
    [errors, isLoading, submit, register, control],
  );

  const addLanguageDialog = React.useMemo(
    () => (
      <AddLanguageModal
        closeHandle={val => {
          if (val) {
            if (!fields.some(item => item.languageId === val.languageId)) {
              const lang = LANGUAGE_TYPE.find(l => l.id === val.languageId);
              append({
                languageId: lang.id,
                language: { id: lang.id, name: lang.name },
                name: '',
                remark: '',
                id: uuidv4(),
              });
            } else {
              toast.warning(`Language Already Exists`);
            }
          }
          open(false);
        }}
        isOpen
      />
    ),
    [fields, open],
  );

  return (
    <Widget>
      {form} {isOpen ? addLanguageDialog : ''}
    </Widget>
  );
}

MyForm.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MyForm.defaultProps = {};

export default MyForm;
