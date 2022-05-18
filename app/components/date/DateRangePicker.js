import React, { useMemo, useState } from "react";
import { Button, Popover, PopoverBody } from "reactstrap";
import {
  DateRangePicker as ReactDateRangePicker,
  createStaticRanges,
} from "react-date-range";
import { injectIntl, intlShape } from "react-intl";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import * as locales from "react-date-range/dist/locale";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { DEFAULT_HOOK_FORM_PROP_TYPE } from "../Form/constants";
import { formatDateOnly } from "../../libs/utils/date.util";
import { IconCalendar, IconTrash } from "../../containers/Icon/constants";
import "./DateRangePicker.scss";
import { makeSelectLocale } from "../../containers/LanguageProvider/selectors";

import { messages } from "./messages";

export const DEFAULT_DATE_RANGE_VALUE = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};

const DateRangePicker = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ value, onChange, name, className, intl }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const language = useSelector(makeSelectLocale());

    const toggle = () => setIsOpen(!isOpen);

    const defaultStaticRanges = createStaticRanges([
      {
        label: intl.formatMessage(messages.today),
        range: () => ({
          startDate: defineds.startOfToday,
          endDate: defineds.endOfToday,
        }),
      },
      {
        label: intl.formatMessage(messages.yesterday),
        range: () => ({
          startDate: defineds.startOfYesterday,
          endDate: defineds.endOfYesterday,
        }),
      },

      {
        label: intl.formatMessage(messages.thisWeek),
        range: () => ({
          startDate: defineds.startOfWeek,
          endDate: defineds.endOfWeek,
        }),
      },
      {
        label: intl.formatMessage(messages.lastWeek),
        range: () => ({
          startDate: defineds.startOfLastWeek,
          endDate: defineds.endOfLastWeek,
        }),
      },
      {
        label: intl.formatMessage(messages.thisMonth),
        range: () => ({
          startDate: defineds.startOfMonth,
          endDate: defineds.endOfMonth,
        }),
      },
      {
        label: intl.formatMessage(messages.lastMonth),
        range: () => ({
          startDate: defineds.startOfLastMonth,
          endDate: defineds.endOfLastMonth,
        }),
      },
    ]);

    const dateRangeStr = useMemo(() => {
      if (value) {
        return `${formatDateOnly(value.startDate)} - ${formatDateOnly(
          value.endDate,
        )}`;
      }
      return "Chọn khoảng thời gian";
    }, [value]);

    return (
      <div className={classnames("date-range-picker input-group", className)}>
        <div className="input-group-prepend">
          <Button
            color="primary"
            outline
            className="btn-icon ml-2 calendar"
            id={name}
            type="button"
          >
            <IconCalendar />
          </Button>
        </div>
        <input
          type="text"
          onClick={toggle}
          readOnly
          style={{ width: "180px" }}
          className="form-control-plaintext border-top border-bottom border-primary text-white user-select-none text-center"
          value={dateRangeStr}
        />
        <div className="input-group-append">
          <Button
            className="btn-icon"
            disabled={!value}
            color="danger"
            outline
            type="button"
            onClick={() => onChange(null)}
          >
            <IconTrash />
          </Button>
        </div>

        <Popover
          popperClassName="date-range-picker-popover"
          isOpen={isOpen}
          toggle={toggle}
          placement="auto"
          target={name}
          fade={false}
        >
          <PopoverBody>
            <ReactDateRangePicker
              locale={locales[language]}
              onChange={item => {
                // setIsOpen(false)
                onChange(item.selection);
                console.log("OnChange", item.selection);
              }}
              showSelectionPreview
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={[value || DEFAULT_DATE_RANGE_VALUE]}
              direction="vertical"
              staticRanges={defaultStaticRanges}
              inputRanges={[]}
            />
            <div className="row mt-2">
              <div className="col-md-12 text-right">
                <Button type="button" color="primary" onClick={toggle}>
                  Chọn
                </Button>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  },
);

DateRangePicker.propTypes = {
  ...DEFAULT_HOOK_FORM_PROP_TYPE,
  intl: intlShape.isRequired,
};

export default injectIntl(DateRangePicker);
