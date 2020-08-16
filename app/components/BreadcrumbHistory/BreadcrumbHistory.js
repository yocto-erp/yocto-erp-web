import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

class BreadcrumbHistory extends Component {
  renderBreadCrumbs = () => {
    const route = ['test1', 'test2'];
    const { length } = route;
    return route.map((item, index) =>
      length === index + 1 ? (
        <BreadcrumbItem key={uuidv4()} className="active">
          <strong>{item}</strong>
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem key={uuidv4()}>{item}</BreadcrumbItem>
      ),
    );
  };

  render() {
    return (
      <>
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.url !== '/app/chat' ? (
          <div>
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
              {this.renderBreadCrumbs()}
            </Breadcrumb>
          </div>
        ) : null}
      </>
    );
  }
}

export default BreadcrumbHistory;
