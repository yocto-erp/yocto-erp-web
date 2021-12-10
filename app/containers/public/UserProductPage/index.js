import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Spinner } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import Header from '../components/Header';
import '../index.scss';
import { useApi } from '../../../libs/hooks/useApi';
import ecommerceShopApi from '../../../libs/apis/public/ecommerce-shop';
import CardShop from '../../../components/Card';
import InputAsyncTagging from '../../../components/Form/InputAsyncTagging';
import SearchButton from '../../../components/button/SearchButton';
import Pagination from '../../../components/Pagination';

const UserProductPage = () => {
  const { publicId } = useParams();
  const { handleSubmit, register, control } = useForm({});
  const [searchObject, setSearchObject] = useState({
    search: '',
    tagging: null,
    page: 1,
    size: 2,
  });
  const [option, setOptions] = useState({
    count: 0,
    rows: [],
  });
  const {
    state: { isLoading },
    exec,
  } = useApi(item =>
    ecommerceShopApi.listPublicECommerceProducts(publicId, item),
  );

  const search = useCallback(
    debounce(() => {
      exec(searchObject).then(t => {
        setOptions(t);
      });
    }, 300),
    [exec, searchObject],
  );

  useEffect(() => {
    search();
  }, [searchObject]);

  const onSubmit = handleSubmit(val => {
    if (val.search.length || (val.tagging && val.tagging.length)) {
      setSearchObject(prev => ({
        ...prev,
        publicId,
        search: val.search,
        tagging: val.tagging,
      }));
    } else {
      setSearchObject(prev => ({
        ...prev,
        search: '',
        tagging: null,
      }));
    }
  });

  const setPage = useCallback(
    page => {
      setSearchObject(prev => ({
        ...prev,
        publicId,
        page,
      }));
    },
    [searchObject],
  );

  const setSize = useCallback(
    size => {
      setSearchObject(prev => ({
        ...prev,
        publicId,
        size,
      }));
    },
    [searchObject],
  );

  const pagination = React.useMemo(
    () => (
      <div className="w-100 mt-2">
        <div className="d-flex align-items-center">
          <Input
            type="select"
            name="pageSize"
            className="mr-2"
            bsSize="sm"
            onChange={event => {
              setSize(Number(event.target.value));
            }}
            style={{ width: 'auto' }}
            value={searchObject.size}
          >
            <option value={10}>10 / Page</option>
            <option value={20}>20 / Page</option>
            <option value={50}>50 / Page</option>
            <option value={100}>100 / Page</option>
          </Input>
          <Pagination
            currentPage={searchObject.page}
            pageSize={searchObject.size}
            total={option?.count}
            setPage={setPage}
          />
          <div className="ml-2">Total: {option?.count} records</div>
          {isLoading ? <Spinner className="ml-auto" /> : ''}
        </div>
      </div>
    ),
    [searchObject, option, isLoading],
  );

  return (
    <div className="public-page">
      <div className="background">
        <Header companyName="test" />
        <main>
          <div className="container">
            <div>
              <Form inline onSubmit={onSubmit} noValidate>
                <Input
                  type="search"
                  name="search"
                  className="mr-2"
                  style={{ width: '300px' }}
                  innerRef={register}
                  id="search"
                  placeholder="Search By Product Name, ID"
                />
                <div style={{ width: '300px' }} className="mr-2">
                  <Controller
                    name="tagging"
                    defaultValue={[]}
                    control={control}
                    render={({ onChange, ...data }) => (
                      <InputAsyncTagging
                        {...data}
                        onChange={onChange}
                        loadOptionApi={ecommerceShopApi.search}
                      />
                    )}
                  />
                </div>
                <SearchButton />
              </Form>
            </div>
            <div className="row mt-5">
              {option?.rows?.map((item, index) => (
                <CardShop index={index} item={item} key={item.id} />
              ))}
            </div>
            {pagination}
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

UserProductPage.propTypes = {};

export default UserProductPage;
