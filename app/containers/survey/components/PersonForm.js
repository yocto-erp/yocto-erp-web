import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from 'reactstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import SubmitButton from '../../../components/button/SubmitButton';
import FormGroup from '../../../components/Form/FormGroup';
import useSyncForm from '../../../libs/hooks/useSyncForm';
import { GENDER } from '../../../libs/apis/person.api';
import { useSearchQuery } from '../../../libs/hooks/useSearchQuery';
import { SURVEY_TYPE } from '../Admin/constants';
import messages, { personFormMessages } from '../messages';

const validationPerson = Yup.object().shape({
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  email: Yup.string()
    .email()
    .required(),
  gender: Yup.string().required(),
  age: Yup.string().required(),
  address: Yup.string().required(),
});

const PersonForm = ({ onSubmitFormPerson, surveyType, form = {}, intl }) => {
  const {
    register,
    errors,
    onSubmit,
    formState: { isDirty, isValid },
  } = useSyncForm({
    form,
    validationSchema: validationPerson,
    api: async formData => onSubmitFormPerson(formData),
  });

  const { language = 'en' } = useSearchQuery();

  return React.useMemo(
    () => (
      <Form onSubmit={onSubmit} noValidate formNoValidate>
        <div className="row">
          <div className="col-md-6">
            <FormGroup
              name="firstName"
              type="text"
              error={errors.firstName}
              register={register}
              placeholder={intl.formatMessage(personFormMessages.email)}
              label=""
              iconLeft={<i className="fa fa-user" />}
            />
          </div>
          <div className="col-md-6">
            <FormGroup
              name="lastName"
              type="text"
              error={errors.lastName}
              register={register}
              placeholder={intl.formatMessage(personFormMessages.lastName)}
              label=""
            />
          </div>
        </div>
        <FormGroup
          name="email"
          type="email"
          readOnly={surveyType === SURVEY_TYPE.EMAIL_VERIFY}
          register={register}
          error={errors.email}
          placeholder={intl.formatMessage(personFormMessages.firstName)}
          label=""
          iconLeft={<i className="fa fa-envelope" />}
        />
        <FormGroup
          name="gender"
          type="select"
          register={register}
          error={errors.gender}
          label=""
          iconLeft={<i className="fa fa-female" />}
          iconRight={<i className="fa fa-male" />}
        >
          <option value="">
            {intl.formatMessage(personFormMessages.gender)}
          </option>
          <option value={GENDER.MALE}>MALE</option>
          <option value={GENDER.FEMALE}>FEMALE</option>
          <option value={GENDER.OTHER}>OTHER</option>
        </FormGroup>
        <FormGroup
          name="age"
          type="select"
          register={register}
          error={errors.age}
          label=""
          iconLeft={<i className="fa fa-birthday-cake" />}
        >
          <option value="">{intl.formatMessage(personFormMessages.age)}</option>
          <option value="Under 20">Under 20</option>
          <option value="21-30">21-30</option>
          <option value="31-40">31-40</option>
          <option value="41-50">41-50</option>
          <option value="51-60">51-60</option>
          <option value="Over 60">Over 60</option>
        </FormGroup>
        <FormGroup
          name="address"
          type="select"
          register={register}
          label=""
          iconLeft={<i className="fa fa-address-book-o" />}
        >
          <option value="">
            {intl.formatMessage(personFormMessages.location)}
          </option>
          <optgroup label="北海道">
            <option value="hokkaido">Hokkaido</option>
          </optgroup>
          <optgroup label="東北">
            <option value="iwate">Iwate Prefecture</option>
            <option value="miyagi">Miyagi Prefecture</option>
            <option value="aomori">Aomori Prefecture</option>
            <option value="akita">Akita</option>
            <option value="hukushima">Fukushima Prefecture</option>
            <option value="yamagata">Yamagata Prefecture</option>
          </optgroup>
          <optgroup label="北関東">
            <option value="tochigi">Tochigi Prefecture</option>
            <option value="ibaragi">Ibaraki Prefecture</option>
            <option value="gunma">Gunma Prefecture</option>
          </optgroup>
          <optgroup label="首都圏">
            <option value="tiba">Chiba</option>
            <option value="saitama">Saitama</option>
            <option value="tokyo">Tokyo</option>
            <option value="kanagawa">Kanagawa Prefecture</option>
          </optgroup>
          <optgroup label="甲信越">
            <option value="niigata">Niigata Prefecture</option>
            <option value="yamanasi">Yamanashi Prefecture</option>
            <option value="nagano">Nagano Prefecture</option>
          </optgroup>
          <optgroup label="北陸">
            <option value="toyama">Toyama Prefecture</option>
            <option value="ishikawa">Ishikawa Prefecture</option>
            <option value="hukui">Fukui prefecture</option>
          </optgroup>
          <optgroup label="東海">
            <option value="aichi">Aichi prefecture</option>
            <option value="mie">Mie Prefecture</option>
            <option value="gihu">Gifu Prefecture</option>
            <option value="shizuoka">Shizuoka Prefecture</option>
          </optgroup>
          <optgroup label="近畿">
            <option value="nara">Nara Prefecture</option>
            <option value="hyogo">Hyogo prefecture</option>
            <option value="osaka">Osaka</option>
            <option value="kyoto">Kyoto</option>
            <option value="wakayama">Wakayama Prefecture</option>
            <option value="shiga">Shiga Prefecture</option>
          </optgroup>
          <optgroup label="山陽・山陰">
            <option value="okayama">Okayama Prefecture</option>
            <option value="simane">Shimane Prefecture</option>
            <option value="tottori">Tottori prefecture</option>
            <option value="hiroshima">Hiroshima Prefecture</option>
            <option value="yamaguchi">Yamaguchi Prefecture</option>
          </optgroup>
          <optgroup label="四国">
            <option value="tokushima">Tokushima Prefecture</option>
            <option value="kagawa">Kagawa Prefecture</option>
            <option value="ehime">Ehime Prefecture</option>
            <option value="kouchi">Kochi Prefecture</option>
          </optgroup>
          <optgroup label="九州">
            <option value="hukuoka">Fukuoka Prefecture</option>
            <option value="saga">Saga Prefecture</option>
            <option value="nagasaki">Nagasaki Prefecture</option>
            <option value="kumamoto">Kumamoto Prefecture</option>
            <option value="ooita">Oita Prefecture</option>
            <option value="miyazaki">Miyazaki prefecture</option>
            <option value="kagoshima">Kagoshima prefecture</option>
          </optgroup>
          <optgroup label="沖縄">
            <option value="okinawa">Okinawa Prefecture</option>
          </optgroup>
        </FormGroup>
        <SubmitButton
          className="btn-block"
          color="primary"
          disabled={!isDirty || !isValid}
        >
          <FormattedMessage {...messages.submit} />
        </SubmitButton>
      </Form>
    ),
    [errors, onSubmit, register, isValid, isDirty, language],
  );
};

PersonForm.propTypes = {
  onSubmitFormPerson: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  surveyType: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(PersonForm);
