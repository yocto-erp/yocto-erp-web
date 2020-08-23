import React, { useCallback } from 'react';
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import s from '../Header.module.scss';
import { makeSelectLocale } from '../../../LanguageProvider/selectors';
import { changeLocale } from '../../../LanguageProvider/actions';

const LanguageDropDown = () => {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());

  const changeLanguage = useCallback(lang => dispatch(changeLocale(lang)), [
    dispatch,
  ]);

  const isSelectLanguage = useCallback(testLang => language === testLang, [
    language,
  ]);

  return (
    <UncontrolledDropdown nav>
      <DropdownToggle nav className={`${s.navItem} text-white`}>
        <i className="glyphicon glyphicon-globe" />
      </DropdownToggle>
      <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
        <DropdownItem onClick={() => changeLanguage('en')}>
          <Badge
            color="info"
            className={classNames({
              'animate__infinite animate__animated infinite animate__heartBeat': isSelectLanguage(
                'en',
              ),
            })}
          >
            EN
          </Badge>
          <div className={s.details}>English</div>
        </DropdownItem>
        <DropdownItem onClick={() => changeLanguage('vn')}>
          <Badge
            color="primary"
            className={classNames({
              'animate__infinite animate__animated infinite animate__heartBeat': isSelectLanguage(
                'vn',
              ),
            })}
          >
            VN
          </Badge>
          <div className={s.details}>Viet Nam</div>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

LanguageDropDown.propTypes = {};

export default LanguageDropDown;
