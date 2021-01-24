import React from 'react';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
import { Button, Popover, PopoverBody, PopoverHeader } from 'reactstrap';
import classnames from 'classnames';
import { DEFAULT_TEXT_COLOR } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

const formatTag = data => {
  const color = chroma(data.color || DEFAULT_TEXT_COLOR);
  const backgroundColor = color.alpha(0.1).css();
  return {
    backgroundColor,
    color,
  };
};

const formatTag1 = data => {
  const color = chroma(data.color || DEFAULT_TEXT_COLOR);
  const backgroundColor = color.alpha(0.1).css();
  return {
    backgroundColor: color,
    color: chroma.contrast(color, 'white') > 2 ? 'white' : 'black',
  };
};

const MAX_SHOW_ITEM = 3;
const Tags = ({ item, className = 'mb-0 pb-0' }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const id = React.useMemo(() => `tags${uuidv4()}`, [item]);

  if (item && item.length) {
    item.sort((a, b) => a.label.localeCompare(b.label));
    const length = Math.min(item.length, MAX_SHOW_ITEM);
    return (
      <>
        <ul className={classnames('list-inline', className)}>
          {item
            .filter((t, i) => i < length)
            .map(t => (
              <li
                className="list-inline-item badge"
                key={t.id}
                style={formatTag(t)}
              >
                {t.label}
              </li>
            ))}
          {item.length > MAX_SHOW_ITEM ? (
            <li className="list-inline-item">
              <Button color="link" onClick={toggle} id={id}>
                <span className="badge badge-info">...</span>
              </Button>
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
          >
            <PopoverHeader>Labels</PopoverHeader>
            <PopoverBody>
              <ul className={classnames('list-inline', className)}>
                {item.map(t => (
                  <li
                    className="list-inline-item badge"
                    key={t.id}
                    style={formatTag1(t)}
                  >
                    {t.label}
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
