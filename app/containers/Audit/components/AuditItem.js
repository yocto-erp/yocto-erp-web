import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import { PERMISSION } from "../../../components/Acl/constants";
import messages from "../messages";

/**
 * actionId: 29
 companyId: 1
 createdBy: {id: 2, email: "admin@gmail.com", displayName: null, imageUrl: null,…}
 createdDate: "2021-01-25T07:45:11.000Z"
 id: 1
 partnerCompany: null
 partnerCompanyId: null
 partnerPerson: {name: "Le Canh", id: 1, firstName: "Le", lastName: "Canh", gsm: "0938130683", email: "", address: "",…}
 partnerPersonId: 1
 relativeId: "25"
 remark: ""
 userId: 2
 * @param item
 * @param intl
 * @returns {JSX.Element}
 * @constructor
 */

const AuditItem = ({ item, intl }) => {
  const {
    actionId,
    createdBy,
    // eslint-disable-next-line no-unused-vars
    partnerPerson,
    // eslint-disable-next-line no-unused-vars
    partnerCompany,
    // eslint-disable-next-line no-unused-vars
    relativeId,
    remark,
  } = item;

  let rs = (
    <strong>
      {createdBy.displayName || createdBy.email} - {actionId} - {relativeId}
    </strong>
  );
  const values = {
    name: <strong>{createdBy.displayName || createdBy.email}</strong>,
    item: (
      <strong>
        {intl.formatMessage(messages.cost)}
        {remark && remark.length ? <>&nbsp;{remark}</> : null}
      </strong>
    ),
  };

  const valuesProduct = {
    name: <strong>{createdBy.displayName || createdBy.email}</strong>,
    item: (
      <strong>
        {intl.formatMessage(messages.product)}
        {remark && remark.length ? <>&nbsp;{remark}</> : null}
      </strong>
    ),
  };

  switch (actionId) {
    case PERMISSION.COST.CREATE:
      rs = <FormattedMessage {...messages.create} values={values} />;
      break;
    case PERMISSION.COST.UPDATE:
      rs = <FormattedMessage {...messages.update} values={values} />;
      break;
    case PERMISSION.PRODUCT.CREATE:
      rs = <FormattedMessage {...messages.create} values={valuesProduct} />;
      break;
    case PERMISSION.PRODUCT.UPDATE:
      rs = <FormattedMessage {...messages.update} values={valuesProduct} />;
      break;
    default:
      break;
  }
  return rs;
};

AuditItem.propTypes = {
  item: PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(AuditItem);
