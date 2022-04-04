import React from "react";
import PropTypes from "prop-types";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import TagItem from "./TagItem";

const MAX_SHOW_ITEM = 3;
const Tags = ({ item, className = "mb-0 pb-0 mt-1" }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const id = React.useMemo(() => `tags${uuidv4()}`, [item]);

  if (item && item.length) {
    item.sort((a, b) => a.label.localeCompare(b.label));
    const length = Math.min(item.length, MAX_SHOW_ITEM);
    return (
      <>
        <ul className={classnames("list-inline", className)}>
          {item
            .filter((t, i) => i < length)
            .map(t => (
              <li className="list-inline-item" key={t.id}>
                <TagItem item={t} />
              </li>
            ))}
          {item.length > MAX_SHOW_ITEM ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              className="list-inline-item badge badge-info"
              id={id}
              style={{ cursor: "pointer" }}
              onClick={toggle}
            >
              <>+{item.length - MAX_SHOW_ITEM}</>
            </li>
          ) : null}
        </ul>
        {item.length > MAX_SHOW_ITEM ? (
          <Popover
            placement="bottom"
            isOpen={popoverOpen}
            target={id}
            toggle={toggle}
            popperClassName="popover-info"
            fade={false}
          >
            <PopoverHeader>Labels</PopoverHeader>
            <PopoverBody>
              <ul className={classnames("list-inline", className)}>
                {item.map(t => (
                  <li className="list-inline-item" key={t.id}>
                    <TagItem item={t} background="light" />
                  </li>
                ))}
              </ul>
            </PopoverBody>
          </Popover>
        ) : null}
      </>
    );
  }
  return null;
};

Tags.propTypes = {
  item: PropTypes.array,
  className: PropTypes.string,
};

export default Tags;
