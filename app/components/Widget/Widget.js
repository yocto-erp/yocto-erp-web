/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
import s from './Widget.module.scss';
import Loader from '../Loader/Loader'; // eslint-disable-line css-modules/no-unused-class

class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fullscreen: PropTypes.bool,
    collapse: PropTypes.bool,
    collapsed: PropTypes.bool,
    refresh: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    settings: PropTypes.bool,
    settingsInverse: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
    showTooltip: PropTypes.bool,
    bodyClass: PropTypes.string,
    customControls: PropTypes.bool,
    options: PropTypes.object, // eslint-disable-line,
    fetchingData: PropTypes.bool,
    widgetType: PropTypes.any,
    updateWidgetData: PropTypes.any,
    customClose: PropTypes.any,
    customExpand: PropTypes.any,
    customCollapse: PropTypes.any,
    customFullscreen: PropTypes.any,
    customReload: PropTypes.any,
    customDropDown: PropTypes.any,
    customBody: PropTypes.any,
    prompt: PropTypes.any,
    controls: PropTypes.any,
  };

  static defaultProps = {
    title: null,
    className: '',
    children: [],
    close: false,
    fullscreen: false,
    collapse: false,
    refresh: false,
    settings: false,
    settingsInverse: false,
    tooltipPlacement: 'bottom',
    showTooltip: false,
    bodyClass: '',
    customControls: false,
    customClose: null,
    customExpand: null,
    customCollapse: null,
    customFullscreen: null,
    customReload: null,
    customDropDown: null,
    prompt: false,
    collapsed: false,
    options: {},
    fetchingData: false,
    widgetType: '',
    controls: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      randomId: uuidv4(),
      hideWidget: false,
      collapseWidget: !!props.collapsed,
      height: props.collapsed ? 0 : 'auto',
      fullScreened: false,
      reloading: false,
      modal: false,
    };
  }

  toggleModal = () => {
    this.setState(previous => ({ modal: !previous.modal }));
  };

  handleClose = () => {
    this.setState(prevs => ({ hideWidget: !prevs.hideWidget }));
  };

  handleCollapse = () => {
    const heightValue = this.state.collapseWidget ? 'auto' : 0;
    this.setState(prev => ({
      height: heightValue,
      collapseWidget: !prev.collapseWidget,
      reloading: false,
    }));
  };

  closeWithModal = () => {
    this.toggleModal();
    this.handleClose();
  };

  handleExpand = () => {
    this.setState({
      height: 'auto',
      collapseWidget: false,
    });
  };

  handleReload = () => {
    const { widgetType, updateWidgetData } = this.props;
    const type = widgetType;
    if (type) {
      updateWidgetData(type);
    }
    this.setState({ reloading: true });
    const endpoint = false;
    if (!endpoint) {
      setTimeout(() => this.setState({ reloading: false }), 2000);
    } else {
      this.setState({ reloading: true });
    }
  };

  handleFullscreen = () => {
    this.setState(prev => ({ fullScreened: !prev.fullScreened }));
  };

  render() {
    const {
      title,
      className,
      children,
      close,
      fullscreen,
      collapse,
      refresh,
      settings,
      settingsInverse,
      tooltipPlacement,
      showTooltip,
      bodyClass,
      customControls,
      customClose,
      customExpand,
      customCollapse,
      customFullscreen,
      customReload,
      fetchingData,
      customDropDown,
      customBody,
      prompt,
      collapsed,
      widgetType,
      updateWidgetData,
      options, //eslint-disable-line
      controls,
      ...attributes
    } = this.props;
    const mainControls = !!(
      close ||
      fullscreen ||
      collapse ||
      refresh ||
      settings ||
      settingsInverse
    );

    const {
      reloading,
      fullScreened,
      randomId,
      height,
      hideWidget,
      collapseWidget,
      modal,
    } = this.state;

    return (
      <React.Fragment>
        <section
          style={{ display: hideWidget ? 'none' : '' }}
          className={classNames(
            'widget',
            {
              fullScreened: !!fullScreened,
              collapsed: !!collapseWidget,
            },
            s.widget,
            className,
            reloading || fetchingData ? s.reloading : '',
          )}
          {...attributes}
        >
          {title &&
            (typeof title === 'string' ? (
              <h5 className={s.title}>{title}</h5>
            ) : (
              <header className={s.title}>{title}</header>
            ))}

          {!customControls && mainControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {settings && (
                <button type="button">
                  <i className="la la-cog" />
                </button>
              )}
              {settingsInverse && (
                <button
                  type="button"
                  className={`bg-gray-transparent ${s.inverse}`}
                >
                  <i className="la la-cog text-white" />
                </button>
              )}
              {refresh && (
                <button
                  type="button"
                  onClick={this.handleReload}
                  id={`reloadId-${randomId}`}
                >
                  {typeof refresh === 'string' ? (
                    <strong className="text-gray-light">{refresh}</strong>
                  ) : (
                    <i className="la la-refresh" />
                  )}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`reloadId-${randomId}`}
                    >
                      Reload
                    </UncontrolledTooltip>
                  )}
                </button>
              )}
              {fullscreen && (
                <button
                  type="button"
                  onClick={this.handleFullscreen}
                  id={`fullscreenId-${randomId}`}
                >
                  <i
                    className={`glyphicon glyphicon-resize-${
                      fullScreened ? 'small' : 'full'
                    }`}
                  />
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`fullscreenId-${randomId}`}
                    >
                      Fullscreen
                    </UncontrolledTooltip>
                  )}
                </button>
              )}
              {!fullScreened && collapse && (
                <span>
                  <button
                    type="button"
                    onClick={this.handleCollapse}
                    id={`collapseId-${randomId}`}
                  >
                    <i
                      className={`la la-angle-${
                        !collapseWidget ? 'down' : 'up'
                      }`}
                    />
                    {showTooltip && (
                      <UncontrolledTooltip
                        placement={tooltipPlacement}
                        target={`collapseId-${randomId}`}
                      >
                        Collapse
                      </UncontrolledTooltip>
                    )}
                  </button>
                </span>
              )}
              {!fullScreened &&
                (close && !prompt ? (
                  <button
                    type="button"
                    onClick={this.handleClose}
                    id={`closeId-${randomId}`}
                  >
                    {typeof close === 'string' ? (
                      <strong className="text-gray-light">{close}</strong>
                    ) : (
                      <i className="la la-remove" />
                    )}
                    {showTooltip && (
                      <UncontrolledTooltip
                        placement={tooltipPlacement}
                        target={`closeId-${randomId}`}
                      >
                        Close
                      </UncontrolledTooltip>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={this.toggleModal}
                    id={`closeId-${randomId}`}
                  >
                    {typeof close === 'string' ? (
                      <strong className="text-gray-light">{close}</strong>
                    ) : (
                      <i className="la la-remove" />
                    )}
                    {showTooltip && (
                      <UncontrolledTooltip
                        placement={tooltipPlacement}
                        target={`closeId-${randomId}`}
                      >
                        Modal
                      </UncontrolledTooltip>
                    )}
                  </button>
                ))}
            </div>
          )}
          {customDropDown && (
            <div className={`${s.widgetControls} widget-controls`}>
              <UncontrolledDropdown>
                <DropdownToggle tag="span" data-toggle="dropdown">
                  <i className="glyphicon glyphicon-cog" />
                </DropdownToggle>
                <DropdownMenu className="bg-widget-transparent" right>
                  <DropdownItem onClick={this.handleReload} title="Reload">
                    Reload &nbsp;&nbsp;
                    <span className="badge badge-pill badge-success animate__animated animate__bounceIn">
                      <strong>9</strong>
                    </span>
                  </DropdownItem>

                  <DropdownItem
                    onClick={this.handleFullscreen}
                    title={!fullScreened ? 'Full Screen' : 'Restore'}
                  >
                    {!fullScreened ? 'Fullscreen' : 'Restore'}{' '}
                  </DropdownItem>
                  <DropdownItem divider />
                  {!fullScreened &&
                    (!prompt ? (
                      <DropdownItem onClick={this.handleClose} title="Close">
                        Close
                      </DropdownItem>
                    ) : (
                      <DropdownItem onClick={this.toggleModal} title="Close">
                        Close
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}
          {customControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {!fullScreened &&
                (customClose && !prompt ? (
                  <button
                    type="button"
                    onClick={this.handleClose}
                    id={`closeId-${randomId}`}
                    className={s.customControlItem}
                  >
                    <i title="Close" className="glyphicon glyphicon-remove" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={this.toggleModal}
                    id={`closeId-${randomId}`}
                    className={s.customControlItem}
                  >
                    <i title="Close" className="glyphicon glyphicon-remove" />
                  </button>
                ))}
              {!fullScreened &&
                (customCollapse && (
                  <button
                    type="button"
                    onClick={this.handleCollapse}
                    id={`closeId-${randomId}`}
                    className={s.customControlItem}
                  >
                    <i
                      title="Collapse"
                      className={`glyphicon glyphicon-chevron-${
                        !collapseWidget ? 'down' : 'up'
                      }`}
                    />
                  </button>
                ))}
              {customFullscreen && (
                <button
                  type="button"
                  onClick={this.handleFullscreen}
                  id={`closeId-${randomId}`}
                  className={s.customControlItem}
                >
                  <i
                    title="Fullscreen"
                    className={`glyphicon glyphicon-resize-${
                      fullScreened ? 'small' : 'full'
                    }`}
                  />
                </button>
              )}
              {customReload && (
                <button
                  type="button"
                  onClick={this.handleReload}
                  id={`closeId-${randomId}`}
                  className={s.customControlItem}
                >
                  <i title="I am spinning!" className="fa fa-refresh" />
                </button>
              )}
            </div>
          )}

          {controls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {controls}
            </div>
          )}

          <div className={`${s.widgetBody} widget-body ${bodyClass}`}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {reloading || fetchingData ? (
              <Loader className={s.widgetLoader} size={40} />
            ) : customBody ? (
              <div className="jumbotron handle bg-default text-white mb-0">
                <div className="container">
                  <h1>Draggable story!</h1>
                  <p className="lead">
                    <em>Build</em> your own interfaces! Sit back and relax.
                  </p>
                  <p className="text-center">
                    <button
                      type="button"
                      onClick={this.handleFullscreen}
                      className="btn btn-danger btn-lg"
                    >
                      {!fullScreened ? (
                        <React.Fragment>
                          Fullscreen me! &nbsp;
                          <i className="fa fa-check" />
                        </React.Fragment>
                      ) : (
                        'Go Back'
                      )}
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </section>
        {prompt && (
          <Modal isOpen={modal} toggle={this.toggleModal} id="news-close-modal">
            <ModalHeader toggle={this.toggleModal} id="news-close-modal-label">
              Sure?
            </ModalHeader>
            <ModalBody className="bg-white">
              Do you really want to unrevertably remove this super news widget?
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                onClick={this.toggleModal}
                data-dismiss="modal"
              >
                No
              </Button>{' '}
              <Button
                color="danger"
                onClick={this.closeWithModal}
                id="news-widget-remove"
              >
                Yes, remove widget
              </Button>
            </ModalFooter>
          </Modal>
        )}
        <div
          style={{ display: fullScreened ? 'block' : 'none' }}
          className={s.widgetBackground}
        />
      </React.Fragment>
    );
  }
}

export default Widget;
