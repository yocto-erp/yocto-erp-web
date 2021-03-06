import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import classNames from 'classnames';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import s from './Layout.module.scss';
import Dashboard from '../dashboard/Dashboard';
import { WAREHOUSE_ROOT_PATH } from '../warehouse/constants';
import WarehousePage from '../warehouse/Loadable';
import Footer from './Footer';
import { PRODUCT_ROOT_PATH } from '../product/constants';
import ProductPage from '../product/Loadable';
import InventoryPage from '../inventory/Loadable';
import { INVENTORY_ROOT_PATH } from '../inventory/constants';
import { PURCHASE_ROOT_PATH } from '../order/purchase/constants';
import PurchasePage from '../order/purchase/Loadable';
import { COST_ROOT_PATH } from '../cost/constants';
import CostPage from '../cost';
import { SALE_ROOT_PATH } from '../order/sale/constants';
import SalePage from '../order/sale/Loadable';
import { PARTNER_ROOT_PATH } from '../partner/constants';
import PartnerPage from '../partner/Loadable';
import { STUDENT_ROOT_PATH } from '../student/constants';
import StudentPage from '../student/Loadable';
import ConfigurationPage from '../configuration/Loadable';
import StudentMonthlyPage from '../student/monthly-fee/Loadable';
import { STUDENT_MONTHLY_ROOT_PATH } from '../student/monthly-fee/constants';
import {
  TEMPLATE_EMAIL_ROOT_PATH,
  TEMPLATE_PRINT_ROOT_PATH,
} from '../template/constants';
import TemplatePrintPage from '../template/print/Loadable';
import TemplateEmailPage from '../template/email/Loadable';
import SurveyAdminPage from '../survey/Admin/Loadable';
import { SURVEY_MANAGEMENT_ROOT_PATH } from '../survey/Admin/constants';
import { LOG_ROOT_PATH } from '../log/constants';
import LogPage from '../log/Loadable';
import { CONFIGURATION_ROOT_PATH } from '../configuration/constants';
import MailMerge from '../tools/mail-merge';
import { MAIL_MERGE_ROOT_PATH } from '../tools/mail-merge/constants';
import FileBrowser from '../../components/assets/FileBrowser';
import { AUDIT_ROOT_PATH } from '../Audit/constants';
import AuditPage from '../Audit/Loadable';
import { TAGGING_ROOT_PATH } from '../tagging/constants';
import TaggingPage from '../tagging/ListPage';
import { USER_ROOT_PATH } from '../user/constants';
import UserPage from '../user/Loadable';
import { ADMIN_PATH } from '../../constants';

function Layout({ sidebarPosition, sidebarVisibility }) {
  return (
    <div
      className={[
        s.root,
        `sidebar-${sidebarPosition}`,
        `sidebar-${sidebarVisibility}`,
      ].join(' ')}
    >
      <div className={s.wrap}>
        <Header />
        {/* <Chat chatOpen={this.state.chatOpen} /> */}
        {/* <Helper /> */}
        <Sidebar />
        <main>
          <OverlayScrollbarsComponent
            options={{
              resize: 'both',
              scrollbars: {
                autoHide: 'scroll',
              },
              paddingAbsolute: false,
            }}
            className={classNames(s.contentWrapper, 'os-theme-light')}
          >
            <div className="content">
              <Switch>
                <Route path={ADMIN_PATH} exact component={Dashboard} />
                <Route
                  path={`${ADMIN_PATH}/dashboard`}
                  exact
                  component={Dashboard}
                />
                <Route path={SALE_ROOT_PATH} component={SalePage} />
                <Route path={PURCHASE_ROOT_PATH} component={PurchasePage} />
                <Route
                  path={`${WAREHOUSE_ROOT_PATH}`}
                  component={WarehousePage}
                />
                <Route path={`${PRODUCT_ROOT_PATH}`} component={ProductPage} />
                <Route
                  path={`${INVENTORY_ROOT_PATH}`}
                  component={InventoryPage}
                />
                <Route path={`${PARTNER_ROOT_PATH}`} component={PartnerPage} />
                <Route
                  path={`${STUDENT_MONTHLY_ROOT_PATH}`}
                  component={StudentMonthlyPage}
                />
                <Route path={`${COST_ROOT_PATH}`} component={CostPage} />
                <Route path={`${STUDENT_ROOT_PATH}`} component={StudentPage} />
                <Route
                  path={`${CONFIGURATION_ROOT_PATH}`}
                  component={ConfigurationPage}
                />
                <Route
                  path={`${TEMPLATE_PRINT_ROOT_PATH}`}
                  component={TemplatePrintPage}
                />
                <Route
                  path={`${TEMPLATE_EMAIL_ROOT_PATH}`}
                  component={TemplateEmailPage}
                />
                <Route
                  path={`${SURVEY_MANAGEMENT_ROOT_PATH}`}
                  component={SurveyAdminPage}
                />
                <Route path={`${MAIL_MERGE_ROOT_PATH}`} component={MailMerge} />
                <Route path={`${LOG_ROOT_PATH}`} component={LogPage} />
                <Route path={`${AUDIT_ROOT_PATH}`} component={AuditPage} />
                <Route path={`${TAGGING_ROOT_PATH}`} component={TaggingPage} />
                <Route path="/drive" component={FileBrowser} />
                <Route path={`${USER_ROOT_PATH}`} component={UserPage} />
              </Switch>
              <Footer />
            </div>
          </OverlayScrollbarsComponent>
        </main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  sidebarOpened: PropTypes.bool,
  dispatch: PropTypes.func,
  sidebarPosition: PropTypes.any,
  sidebarVisibility: PropTypes.any,
};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
