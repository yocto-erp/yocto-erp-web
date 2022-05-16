import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import { Button, Form } from "reactstrap";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import { studentTrackingApi } from "../../../libs/apis/student/student-tracking.api";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import LoadingIndicator from "../../../components/LoadingIndicator";
import useMyForm from "../../../libs/hooks/useMyForm";
import SearchButton from "../../../components/button/SearchButton";
import StudentSelect from "../components/StudentSelect";
import DateSelect from "../../../components/date/DateSelect";
import {
  formatDate,
  formatDateOnly,
  getDatesBetween,
  thisMonthRange,
} from "../../../libs/utils/date.util";
import UserView from "../../../components/ListWidget/UserView";
import { cloudAssetUrl } from "../../../libs/apis/image.api";
import { studentTrackingMessage } from "./messages";
import { STUDENT_DAILY_STATUS } from "./constants";
import StudentTrackingUpdateStatusModal from "./components/StudentTrackingUpdateStatusModal";
import "./student-tracking.scss";

const validationSchema = yup.object().shape({
  student: yup.object().required(),
  fromDate: yup.date().required(),
  toDate: yup.date().required(),
});
const ListPage = () => {
  const montRange = thisMonthRange();
  const { exec, state: summaryState } = useApi(studentTrackingApi.summary);
  const {
    watch,
    onSubmit,
    formState,
    state,
    control,
    setValue,
    resetState,
  } = useMyForm({
    api: data => studentTrackingApi.list(data),
    validationSchema,
    form: {
      fromDate: montRange.from,
      toDate: montRange.to,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const [selectList, setSelectList] = useState({});

  const onSelectItem = useCallback((e, item) => {
    const isChecked = e.currentTarget.checked;
    setSelectList(prev => ({ ...prev, [item.date]: isChecked ? item : null }));
  }, []);

  const { fromDate, toDate, student } = watch([
    "fromDate",
    "toDate",
    "student",
  ]);

  const listDate = useMemo(() => {
    const rs = [];
    if (state.status === API_STATE.SUCCESS) {
      const rangeDate = getDatesBetween(fromDate, toDate, false);
      for (let i = rangeDate.length - 1; i >= 0; i -= 1) {
        const item = { date: rangeDate[i] };
        item.tracking = state.resp.find(
          t => new Date(t.trackingDate).getTime() === rangeDate[i].getTime(),
        );
        rs.push(item);
      }
    }
    return rs;
  }, [fromDate, toDate, state]);

  const onBulkSelect = useCallback(
    isCheck => {
      const rs = {};
      listDate.forEach(function processCheck(t) {
        rs[t.date] = isCheck ? t : null;
      });
      console.log(rs);
      setSelectList(rs);
    },
    [listDate],
  );

  const reset = useCallback(() => {
    resetState();
    setSelectList({});
  }, [resetState, setSelectList]);

  useEffect(() => {
    reset();
    console.log(fromDate, toDate);
    if (fromDate && toDate) {
      exec({ fromDate, toDate });
    }
  }, [fromDate, toDate]);

  const selectedLength = Object.keys(selectList).filter(
    t => selectList[t] != null,
  ).length;

  return (
    <>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <Form inline onSubmit={onSubmit} noValidate>
            <div className="mr-2 mt-2 mt-md-0">
              <Controller
                defaultValue={null}
                control={control}
                name="fromDate"
                render={({ onChange, value }, { invalid }) => (
                  <DateSelect
                    placeholder="Select start date"
                    value={value}
                    onChange={onChange}
                    isClearable
                    selectsStart
                    endDate={toDate}
                    invalid={invalid}
                  />
                )}
              />
            </div>
            <div className="mr-2 mt-2 mt-md-0">
              <Controller
                defaultValue={null}
                control={control}
                name="toDate"
                render={({ onChange, value }, { invalid }) => (
                  <DateSelect
                    placeholder="Select end date"
                    value={value}
                    selectsEnd
                    startDate={fromDate}
                    minDate={fromDate}
                    onChange={onChange}
                    isClearable
                    invalid={invalid}
                  />
                )}
              />
            </div>
            <div className="mr-2 mt-2 mt-md-0" style={{ width: "300px" }}>
              <Controller
                defaultValue={null}
                control={control}
                id="student"
                name="student"
                render={({ onChange, value, onBlur, name }, { invalid }) => (
                  <StudentSelect
                    onChange={val => {
                      reset();
                      onChange(val);
                    }}
                    invalid={invalid}
                    onBlur={onBlur}
                    isClearable
                    value={value}
                    placeholder="Select Student"
                    name={name}
                  />
                )}
              />
            </div>
            <SearchButton
              className="mr-2 mt-2 mt-md-0"
              disabled={!formState.isValid || !formState.isDirty}
              isLoading={state.status === API_STATE.LOADING}
            />
          </Form>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-3">
          {summaryState.status === API_STATE.LOADING && <LoadingIndicator />}
          {summaryState.status === API_STATE.SUCCESS && fromDate && toDate && (
            <>
              <div
                className="row justify-content-center align-items-center"
                style={{ "min-height": "32px" }}
              >
                <div className="col-auto">
                  <h5 className="mb-0 align-middle">
                    {formatDateOnly(fromDate)} - {formatDateOnly(toDate)}
                  </h5>
                </div>
              </div>
              <div className="table-responsive mt-4">
                <table className="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Absent Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryState.resp.map(t => (
                      <tr key={t.student.id}>
                        <td>
                          <Button
                            color="link"
                            onClick={() => {
                              setValue("student", t.student, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              onSubmit().then();
                            }}
                          >
                            {t.student?.child.name} ({t.student?.alias})
                          </Button>
                        </td>
                        <td>{t.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        <div className="col-md-9">
          {state.status === API_STATE.LOADING && <LoadingIndicator />}
          {state.status === API_STATE.SUCCESS && (
            <>
              <div className="row justify-content-center align-items-center">
                <div className="col">
                  <h5 className="mb-0">
                    {student?.child.fullName || student?.child.name} (
                    {student?.alias}) daily status
                  </h5>
                </div>
                <div className="col-auto">
                  <span>Selects: {selectedLength}</span>
                  <Button
                    type="button"
                    size="sm"
                    className="ml-2 mt-2 mt-md-0"
                    disabled={!selectedLength}
                    onClick={() => setIsOpen(true)}
                  >
                    Update Status
                  </Button>
                </div>
              </div>

              <div className="table-responsive mt-4 detail-status">
                <table className="table table-sm table-bordered table-striped">
                  <thead>
                    <tr>
                      <th className="min text-center">
                        Select
                        <br />
                        <Button
                          type="button"
                          color="link"
                          size="sm"
                          className="text-success"
                          style={{ padding: "2px" }}
                          onClick={() => onBulkSelect(true)}
                        >
                          ALL
                        </Button>
                        |
                        <Button
                          type="button"
                          color="link"
                          size="sm"
                          className="text-danger"
                          style={{ padding: "2px" }}
                          onClick={() => onBulkSelect(false)}
                        >
                          None
                        </Button>
                      </th>
                      <th className="min align-middle text-center">Date</th>
                      <th className="min align-middle text-center">Status</th>
                      <th className="align-middle">Remark</th>
                      <th className="min align-middle text-center">Check In</th>
                      <th className="min align-middle text-center">
                        Check Out
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listDate.map(t => (
                      <tr key={`${t.date}-${t.tracking?.lastModifiedDate}`}>
                        <td className="text-center align-middle">
                          <div className="form-check">
                            <input
                              className="form-check-input position-static"
                              type="checkbox"
                              id={`input${t.date}`}
                              value="1"
                              aria-label="..."
                              checked={!!selectList[t.date]}
                              onChange={e => onSelectItem(e, t)}
                            />
                          </div>
                        </td>
                        <td className="min align-middle text-center">
                          <label
                            htmlFor={`input${t.date}`}
                            className="mb-0"
                            style={{ cursor: "pointer" }}
                          >
                            {formatDateOnly(t.date)}
                          </label>
                        </td>
                        <td className="align-middle text-center">
                          <span
                            className={classNames("badge", {
                              "badge-success":
                                t.tracking?.status !==
                                STUDENT_DAILY_STATUS.ABSENT,
                              "badge-danger":
                                t.tracking?.status ===
                                STUDENT_DAILY_STATUS.ABSENT,
                            })}
                          >
                            <FormattedMessage
                              {...studentTrackingMessage[
                                `formStatus${t.tracking?.status || 1}`
                              ]}
                            />
                          </span>
                        </td>
                        <td>{t.tracking?.checkInRemark}</td>
                        <td>
                          <div className="media">
                            {t.tracking?.checkInSignature && (
                              <a
                                href={cloudAssetUrl(
                                  t.tracking?.checkInSignature,
                                )}
                                style={{ width: "64px", height: "64px" }}
                                className="mr-3 text-center"
                                target="_blank"
                              >
                                <img
                                  title="signature"
                                  src={cloudAssetUrl(
                                    t.tracking?.checkInSignature,
                                  )}
                                  className="img-thumbnail"
                                  style={{
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                  alt="signature"
                                />
                              </a>
                            )}

                            <div className="media-body">
                              <span className="text-nowrap">
                                {t.tracking?.checkInWith && (
                                  <UserView user={t.tracking?.checkInWith} />
                                )}
                                {t.tracking?.checkInCoordinate && (
                                  <a
                                    href={`https://maps.google.com/maps?q=${
                                      t.tracking.checkInCoordinate
                                        .coordinates[1]
                                    },${
                                      t.tracking.checkInCoordinate
                                        .coordinates[0]
                                    }&hl=es;z=14&amp;output=embed`}
                                    target="_blank"
                                  >
                                    <i className="fa fa-map-marker fa-fw" />
                                  </a>
                                )}
                              </span>
                              {t.tracking?.checkInFromBus && (
                                <p className="mb-0 text-nowrap">
                                  <i className="fa fa-bus fa-fw" />{" "}
                                  {t.tracking.checkInFromBus.name}
                                </p>
                              )}
                              {t.tracking?.checkInIP && (
                                <p className="mb-0 text-nowrap">
                                  <i className="fa fa-mobile fa-fw" />{" "}
                                  <strong>{t.tracking?.checkInIP}</strong>
                                </p>
                              )}
                              {t.tracking?.checkInDate && (
                                <p className="mb-0 text-nowrap">
                                  <i className="fa fa-clock-o fa-fw" />{" "}
                                  {formatDate(new Date(t.tracking.checkInDate))}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="media">
                            {t.tracking?.checkOutSignature && (
                              <a
                                href={cloudAssetUrl(
                                  t.tracking?.checkOutSignature,
                                )}
                                style={{ width: "64px", height: "64px" }}
                                className="mr-3 text-center"
                                target="_blank"
                              >
                                <img
                                  title="signature"
                                  src={cloudAssetUrl(
                                    t.tracking?.checkOutSignature,
                                  )}
                                  className="img-thumbnail"
                                  style={{
                                    height: "100%",
                                    "object-fit": "contain",
                                  }}
                                  alt="signature"
                                />
                              </a>
                            )}

                            <div className="media-body">
                              <span className="text-nowrap">
                                {t.tracking?.checkOutWith && (
                                  <UserView user={t.tracking?.checkOutWith} />
                                )}
                                {t.tracking?.checkOutCoordinate && (
                                  <a
                                    href={`https://maps.google.com/maps?q=${
                                      t.tracking.checkOutCoordinate
                                        .coordinates[1]
                                    },${
                                      t.tracking.checkOutCoordinate
                                        .coordinates[0]
                                    }&hl=es;z=14&amp;output=embed`}
                                    target="_blank"
                                  >
                                    <i className="fa fa-map-marker fa-fw" />
                                  </a>
                                )}
                              </span>
                              {t.tracking?.checkOutAtBus && (
                                <p className="mb-0 text-nowrap">
                                  <i className="fa fa-bus" />{" "}
                                  {t.tracking.checkOutAtBus.name}
                                </p>
                              )}
                              {t.tracking?.checkOutIP && (
                                <p className="mb-0 text-nowrap">
                                  IP: <strong>{t.tracking?.checkOutIP}</strong>
                                </p>
                              )}
                              {t.tracking?.checkOutDate && (
                                <p className="mb-0 text-nowrap">
                                  <i className="fa fa-clock-o fa-fw" />{" "}
                                  {formatDate(
                                    new Date(t.tracking.checkOutDate),
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      <StudentTrackingUpdateStatusModal
        isOpen={isOpen}
        student={student}
        closeHandle={isUpdate => {
          if (isUpdate) {
            onSubmit().then();
            exec({ fromDate, toDate });
          }
          setIsOpen(false);
        }}
        listDate={Object.keys(selectList)
          .filter(t => selectList[t] !== null)
          .map(t => selectList[t].date)}
      />
    </>
  );
};

ListPage.propTypes = {};

export default ListPage;
