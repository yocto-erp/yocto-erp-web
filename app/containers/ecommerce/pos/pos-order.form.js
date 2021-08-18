import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as Yup from 'yup';
import CustomerSelect from '../../../components/common/customer/CustomerSelect';
import { usePosDispatch, usePosOrderContext } from './pos.context';
import { calculateOrder, onSelectCustomer } from './pos.reduce';
import Price from '../../../components/common/Price';
import { PosScrollOptions } from './constants';
import Input from '../../../components/Form/Input';
import InputAmount from '../../../components/Form/InputAmount';
import { hasText } from '../../../utils/util';
import FormHookErrorMessage from '../../../components/Form/FormHookErrorMessage';
import { transformUnNumber } from '../../../libs/utils/number.util';
import PosCheckOut from './ check-out.modal';

const PosOrderForm = () => {
  const order = usePosOrderContext();
  const dispatch = usePosDispatch();

  const [checkoutOrder, setCheckOutOrder] = useState({
    order: null,
    form: {},
  });
  const summary = calculateOrder(order);
  const validationSchema = Yup.object().shape({
    isDebt: Yup.boolean(),
    payAmount: Yup.number()
      .transform(transformUnNumber)
      .nullable(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    control,
    watch,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      isShipping: false,
      address: '',
      payAmount: '',
      isDebt: false,
    },
  });

  const onSubmit = handleSubmit(val => {
    console.log(val);
    setCheckOutOrder({ order, form: val });
  });

  const onCustomerChange = useCallback(
    customer => {
      dispatch(onSelectCustomer(customer));
      setValue('address', customer.address);
    },
    [dispatch, setValue],
  );

  const customerSelect = useMemo(
    () => (
      <CustomerSelect
        value={order?.customer}
        onChange={onCustomerChange}
        onAdded={onCustomerChange}
      />
    ),
    [order?.customer, onCustomerChange],
  );

  const isEnableCheckout = useMemo(() => {
    let rs = false;
    if (order) {
      const { customer, products } = order;
      if (customer && products.length) {
        rs = true;
      }
    }
    return rs;
  }, [order]);

  const { isShipping, payAmount } = watch(['isShipping', 'payAmount']);

  useEffect(() => {
    console.log(payAmount);
    if (payAmount < summary.total) {
      setValue('isDebt', true);
    } else {
      setValue('isDebt', false);
    }
  }, [payAmount]);

  return (
    <div className="checkout-wrapper border-primary border-right">
      {order ? (
        <div className="checkout">
          <div className="checkout-form">
            {customerSelect}
            {order.customer && (
              <p className="m-0">
                {hasText(order.phone) && (
                  <span>
                    <i className="fa fa-phone fa-fw" />
                    &nbsp;{order.phone}{' '}
                  </span>
                )}
                {hasText(order.email) && (
                  <span className="ml-3 text-nowrap">
                    <i className="fa fa-envelope fa-fw" />
                    &nbsp;{order.email}{' '}
                  </span>
                )}
                {hasText(order.address) && (
                  <>
                    <br />
                    <span>
                      <i className="fa fa-location-arrow fa-fw" />
                      &nbsp;{order.address}{' '}
                    </span>
                  </>
                )}
              </p>
            )}
            <OverlayScrollbarsComponent
              className="product-list mt-3"
              options={PosScrollOptions}
            >
              <table className="table table-sm table-bordered">
                <thead>
                  <tr className="bg-primary">
                    <th>Product ({order.products.length})</th>
                    <th>
                      Qty (
                      {order.products
                        .map(t => t.qty)
                        .reduce((a, b) => a + b, 0)}
                      )
                    </th>
                    <th className="text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map(t => (
                    <tr key={t.product.id}>
                      <td>{t.product.webDisplayName}</td>
                      <td>
                        {t.qty} {t.product.unit.name}
                      </td>
                      <td className="text-right">
                        <Price amount={t.product.price * t.qty} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </OverlayScrollbarsComponent>
          </div>
          <div className="action">
            <div className="info">
              <table className="table-borderless table-sm w-100">
                <tbody>
                  <tr>
                    <td />
                    <td className="text-right">
                      Tax: <Price amount={order.tax} />{' '}
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td className="text-right">
                      <strong className="text-danger h4">
                        <Price amount={summary.total} />
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p />
              <p />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-9  p-0">
                  <div className="input-group mb-1">
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text"
                        style={{ width: '70px' }}
                      >
                        <Input
                          id="isShipping"
                          name="isShipping"
                          type="checkbox"
                          register={register}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="isShipping"
                        >
                          &nbsp;Ship
                        </label>
                      </div>
                    </div>
                    <Input
                      className="form-control"
                      type="text"
                      disabled={!isShipping}
                      name="address"
                      register={register}
                      error={errors.address}
                      placeholder="Shipping Address"
                    />
                  </div>
                  <Controller
                    name="payAmount"
                    control={control}
                    defaultValue=""
                    render={({ onChange, value }, { invalid }) => {
                      console.log('Value change', value);
                      return (
                        <>
                          <InputAmount
                            prepend={
                              <div className="input-group-prepend">
                                <div
                                  className="input-group-text"
                                  style={{ width: '70px' }}
                                >
                                  <Input
                                    disabled={payAmount >= summary.total}
                                    name="isDebt"
                                    id="isDebt"
                                    type="checkbox"
                                    register={register}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="isDebt"
                                  >
                                    &nbsp;Debt
                                  </label>
                                </div>
                              </div>
                            }
                            placeholder="Payment Amount"
                            onChange={onChange}
                            value={value}
                            invalid={invalid}
                          />
                          <p className="help-block">
                            {payAmount >= summary.total ? (
                              <span className="text-success">
                                Return:{' '}
                                <Price amount={payAmount - summary.total} />{' '}
                              </span>
                            ) : (
                              <span className="text-danger">
                                Debt:{' '}
                                <Price amount={summary.total - payAmount} />
                              </span>
                            )}
                          </p>
                          <FormHookErrorMessage error={errors.payAmount} />
                        </>
                      );
                    }}
                  />
                </div>
                <div className="col-md-3 p-0 pl-1">
                  <button
                    type="button"
                    className="btn btn-primary btn-block h-100"
                    disabled={!isEnableCheckout || !isValid || !isDirty}
                    onClick={() => onSubmit()}
                  >
                    <span className="text-uppercase">Check Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-order text-warning">No Order</div>
      )}
      <PosCheckOut
        order={checkoutOrder}
        onClose={res => {
          console.log(res);
          setCheckOutOrder({ order: null, form: {} });
        }}
      />
    </div>
  );
};

PosOrderForm.propTypes = {};

export default PosOrderForm;
