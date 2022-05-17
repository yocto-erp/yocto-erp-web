import React, { useMemo } from "react";
import { DateRangePicker as ReactDateRangePicker } from "react-date-range";
import { Button, PopoverBody, UncontrolledPopover } from "reactstrap";
import { DEFAULT_HOOK_FORM_PROP_TYPE } from "../Form/constants";
import { formatDateOnly } from "../../libs/utils/date.util";
import { IconCalendar } from "../../containers/Icon/constants";

const DateRangePicker = ({ value, onChange, name }) => {
  const dateRangeStr = useMemo(() => {
    if (value && value[0]) {
      return `${formatDateOnly(value[0].startDate)} - ${formatDateOnly(
        value[0].endDate,
      )}`;
    }
    return "Chọn khoảng thời gian";
  }, [value]);

  return (
    <>
      <Button
        className="btn-icon"
        color="primary"
        outline
        type="button"
        id={name}
      >
        {dateRangeStr} <IconCalendar className="ml-2" />
      </Button>
      <UncontrolledPopover
        trigger="click"
        placement="auto"
        target={name}
        fade={false}
      >
        <PopoverBody>
          <ReactDateRangePicker
            onChange={item => onChange([item.selection])}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={
              value || [
                {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: "selection",
                },
              ]
            }
            direction="horizontal"
          />
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
};

DateRangePicker.propTypes = {
  ...DEFAULT_HOOK_FORM_PROP_TYPE,
};

export default DateRangePicker;
