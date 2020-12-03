import React from 'react';
import { Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useListFilter } from '../../../components/ListWidget/constants';
import SearchButton from '../../../components/button/SearchButton';
import { LANGUAGE } from '../constants';
import { GENDER } from '../../../libs/apis/person.api';
import { useSearchQuery } from '../../../libs/hooks/useSearchQuery';
import FormGroup from '../../../components/Form/FormGroup';

const Filter = ({ data }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: data,
  });
  const setFilter = useListFilter();
  const onSubmit = handleSubmit(val => setFilter(val));
  const { language = 'en' } = useSearchQuery();
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
      <FormGroup
        name="gender"
        className="mb-2 mr-2"
        type="select"
        register={register}
        label=""
      >
        <option value="">{LANGUAGE[language].gender}</option>
        <option value={GENDER.MALE}>MALE</option>
        <option value={GENDER.FEMALE}>FEMALE</option>
        <option value={GENDER.OTHER}>OTHER</option>
      </FormGroup>
      <FormGroup
        name="age"
        type="select"
        register={register}
        className="mb-2 mr-2"
        label=""
        iconLeft={<i className="fa fa-birthday-cake" />}
      >
        <option value="">{LANGUAGE[language].age}</option>
        <option value="Under 18">Under 18</option>
        <option value="18-25">18-25</option>
        <option value="26-40">26-40</option>
        <option value="41-55">41-55</option>
        <option value="56-65">56-65</option>
        <option value="66-75">66-75</option>
        <option value="Over 75">Over 75</option>
      </FormGroup>
      <FormGroup
        name="address"
        type="select"
        register={register}
        className="mb-2 mr-2"
        label=""
        iconLeft={<i className="fa fa-address-book-o" />}
      >
        <option value="">{LANGUAGE[language].location}</option>
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
      <SearchButton color="warning" className="mb-2 mr-2" />
    </Form>
  );
};

Filter.propTypes = {
  data: PropTypes.object,
};

export default Filter;
