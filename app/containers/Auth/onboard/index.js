import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import * as yup from 'yup';

import {
  Container,
  FormGroup,
  Label,
  InputGroup,
  Input,
  FormFeedback,
} from 'reactstrap';
import { mutate } from 'swr';
import messages from './messages';
import Widget from '../../../components/Widget/Widget';
import Footer from '../../Layout/Footer';
import SubmitButton from '../../../components/button/SubmitButton';
import { createCompany } from '../../../libs/apis/auth.api';
import FormError from '../../../components/Form/FormError';
import useMyForm from '../../../libs/hooks/useMyForm';
import { set, STORAGE } from '../../../libs/utils/storage';
import { SWR_KEY_USER } from '../../../libs/hooks/useUser';

const schema = yup.object().shape({
  name: yup.string().required('This field is required.'),
});

export function OnboardPage() {
  const {
    register,
    errors,
    onSubmit,
    formState,
    state: { isLoading, errors: serverErrors, resp },
  } = useMyForm({
    api: createCompany,
    validationSchema: schema,
  });

  const onSubmitOk = async () => {
    set(STORAGE.JWT, resp.token);
    await mutate(SWR_KEY_USER);
  };

  const formEls = useMemo(
    () => (
      <>
        <form onSubmit={onSubmit} noValidate>
          <FormGroup className="mt">
            <Label for="name">
              Name<span className="text-danger">*</span>
            </Label>
            <InputGroup className="input-group-no-border">
              {/* <InputGroupAddon addonType="prepend"> */}
              {/*  <InputGroupText> */}
              {/*    <i className="la la-building text-white" /> */}
              {/*  </InputGroupText> */}
              {/* </InputGroupAddon> */}
              <Input
                invalid={!!errors.name}
                id="name"
                className="input-transparent pl-3"
                type="text"
                innerRef={register}
                name="name"
                placeholder="Company Name"
              />
              <FormFeedback>{errors.name && errors.name.message}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup className="mt">
            <Label for="gsm">Phone</Label>
            <InputGroup className="input-group-no-border">
              {/* <InputGroupAddon addonType="prepend"> */}
              {/*  <InputGroupText> */}
              {/*    <i className="la la-envelope text-white" /> */}
              {/*  </InputGroupText> */}
              {/* </InputGroupAddon> */}
              <Input
                invalid={!!errors.gsm}
                id="gsm"
                className="input-transparent pl-3"
                type="text"
                innerRef={register}
                name="gsm"
                placeholder="Phone Number"
              />
              <FormFeedback>{errors.gsm && errors.gsm.message}</FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup className="mt">
            <Label for="address">Address</Label>
            <InputGroup className="input-group-no-border">
              {/* <InputGroupAddon addonType="prepend"> */}
              {/*  <InputGroupText> */}
              {/*    <i className="la la-address-book text-white" /> */}
              {/*  </InputGroupText> */}
              {/* </InputGroupAddon> */}
              <Input
                invalid={!!errors.address}
                id="address"
                className="input-transparent pl-3"
                type="text"
                innerRef={register}
                name="address"
                placeholder="address"
              />
              <FormFeedback>
                {errors.address && errors.address.message}
              </FormFeedback>
            </InputGroup>
          </FormGroup>

          <FormGroup className="mt">
            <Label for="remark">Introduction</Label>
            <InputGroup className="input-group-no-border">
              {/* <InputGroupAddon addonType="prepend"> */}
              {/*  <InputGroupText> */}
              {/*    <i className="la la-envelope text-white" /> */}
              {/*  </InputGroupText> */}
              {/* </InputGroupAddon> */}
              <Input
                invalid={!!errors.remark}
                id="remark"
                className="input-transparent pl-3"
                type="textarea"
                innerRef={register}
                name="remark"
                placeholder="Introduction company"
              />
              <FormFeedback>
                {errors.remark && errors.remark.message}
              </FormFeedback>
            </InputGroup>
          </FormGroup>
          <div className="bg-widget auth-widget-footer">
            <SubmitButton
              type="submit"
              color="danger"
              className="auth-btn text-white mb-3"
              size="sm"
              disabled={!(formState.isValid && formState.isDirty)}
              isLoading={isLoading}
            >
              <FormattedMessage {...messages.createCompanyButton} />
            </SubmitButton>
          </div>
        </form>
      </>
    ),
    [onSubmit, errors, register, formState, isLoading],
  );

  return (
    <div>
      <>
        {resp ? (
          <>
            <div className="auth-page d-flex align-items-center">
              <Container>
                <Widget
                  className="widget-auth mx-auto"
                  title={<h3 className="mt-0">Thank You</h3>}
                >
                  <p className="widget-auth-info">
                    Your company has been created success !. Click Ok to start
                  </p>
                  <div className="bg-widget auth-widget-footer">
                    <SubmitButton
                      type="button"
                      color="primary"
                      className="auth-btn text-white mb-3"
                      size="sm"
                      onClick={onSubmitOk}
                    >
                      OK
                    </SubmitButton>
                  </div>
                </Widget>
              </Container>
              <Footer />
            </div>
          </>
        ) : (
          <>
            <Helmet>
              <title>Create Company</title>
              <meta
                name="description"
                content="Description of create company"
              />
            </Helmet>
            <div className="auth-page d-flex align-items-center">
              <Container>
                <Widget
                  className="widget-auth mx-auto"
                  title={
                    <h3 className="mt-0">
                      <FormattedMessage {...messages.header} />
                    </h3>
                  }
                >
                  <p className="widget-auth-info">
                    Nhập thông tin để tạo company!
                  </p>
                  <FormError
                    className="mt-3"
                    errors={serverErrors}
                    item={item => 'Create failed!'}
                  />
                  {formEls}
                </Widget>
              </Container>
              <Footer />
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default OnboardPage;
