import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';
import Widget from '../../components/Widget/Widget';
import emailConfigurationApi from '../../libs/apis/configuration/email.api';
import EmailTestForm from './components/EmailTestForm';
import MailgunForm from './components/MailgunForm';
import SMTPForm from './components/SMTPForm';
import { EMAIL_PROVIDER } from './constants';

const EmailConfigurationPage = () => {
  const [mailProvider, setMailProvider] = useState('');
  const [mailForm, setMailForm] = useState(null);
  const [configuration, setConfiguration] = useState(null);

  useEffect(() => {
    emailConfigurationApi.get().then(resp => {
      if (resp) {
        setMailProvider(resp.mailProvider);
        setMailForm(resp);
        setConfiguration(resp);
      }
    });
  }, []);

  const onSubmit = useCallback(
    data =>
      emailConfigurationApi.save(data).then(t => {
        setConfiguration(t);
        return t;
      }),
    [],
  );

  const onConfigurationChange = useCallback(
    data => {
      setConfiguration(data);
    },
    [setConfiguration],
  );
  const mailFormEls = useMemo(() => {
    switch (mailProvider) {
      case EMAIL_PROVIDER.SMTP:
        return (
          <SMTPForm
            form={mailForm}
            onUpdate={onSubmit}
            onConfigurationChange={onConfigurationChange}
          />
        );
      case EMAIL_PROVIDER.MAILGUN:
        return (
          <MailgunForm
            form={mailForm}
            onUpdate={onSubmit}
            onConfigurationChange={onConfigurationChange}
          />
        );
      default:
        return '';
    }
  }, [mailProvider, mailForm, onSubmit]);

  return (
    <Row>
      <Col md={8}>
        <Widget title="Email Configuration">
          <FormGroup>
            <Label>
              Mail Provider <span className="text-danger">*</span>
            </Label>
            <Input
              type="select"
              name="mailProvider"
              value={mailProvider}
              onChange={event => {
                event.preventDefault();
                setMailProvider(event.target.value);
              }}
            >
              <option value="">Select</option>
              <option value={EMAIL_PROVIDER.SMTP}>SMTP</option>
              <option value={EMAIL_PROVIDER.MAILGUN}>Mailgun</option>
            </Input>
          </FormGroup>
          {mailFormEls}
        </Widget>
      </Col>
      <Col md={4}>
        <EmailTestForm configuration={configuration} />
      </Col>
    </Row>
  );
};

EmailConfigurationPage.propTypes = {};

export default EmailConfigurationPage;
