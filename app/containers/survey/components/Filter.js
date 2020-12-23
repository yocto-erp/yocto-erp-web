import React from 'react';
import { Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { injectIntl, intlShape } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useListFilter } from '../../../components/ListWidget/constants';
import SearchButton from '../../../components/button/SearchButton';
import { GENDER } from '../../../libs/apis/person.api';
import FormGroup from '../../../components/Form/FormGroup';
import { personFormMessages } from '../messages';
import { AGE_RANGES } from '../constants';
import surveyApi from '../../../libs/apis/survey/survey.api';

const Filter = ({ data, intl, formConfig = {} }) => {
  const { id } = useParams();
  const { handleSubmit, register } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => setFilter(val));
  return (
    <Form inline onSubmit={onSubmit} noValidate>
      <FormGroup
        type="text"
        register={register}
        name="search"
        className="mb-2 mr-2"
        placeholder="Search By Name or Email"
        style={{ width: '300px' }}
      />
      {formConfig.enableGender ? (
        <FormGroup
          name="gender"
          className="mb-2 mr-2"
          type="select"
          register={register}
          label=""
        >
          <option value="">
            {intl.formatMessage(personFormMessages.gender)}
          </option>
          <option value={GENDER.MALE}>MALE</option>
          <option value={GENDER.FEMALE}>FEMALE</option>
          <option value={GENDER.OTHER}>OTHER</option>
        </FormGroup>
      ) : null}
      {formConfig.enableAge ? (
        <FormGroup
          name="age"
          type="select"
          register={register}
          className="mb-2 mr-2"
          label=""
          iconLeft={<i className="fa fa-birthday-cake" />}
        >
          <option value="">{intl.formatMessage(personFormMessages.age)}</option>
          {AGE_RANGES.map(t => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </FormGroup>
      ) : null}
      {formConfig.enableAddress ? (
        <FormGroup
          name="address"
          type="select"
          register={register}
          className="mb-2 mr-2"
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
      ) : null}
      <SearchButton color="warning" className="mb-2 mr-2" />
      <a
        className="btn btn-primary mb-2"
        href={surveyApi.downloadRawLink(id)}
        target="_blank"
      >
        <i className="fa fa-file-excel-o fa-fw" /> Download Raw
      </a>
    </Form>
  );
};

Filter.propTypes = {
  data: PropTypes.object,
  intl: intlShape.isRequired,
  formConfig: PropTypes.object,
};

export default injectIntl(Filter);
