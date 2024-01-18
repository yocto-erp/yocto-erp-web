import React from "react";
import { Route, Switch } from "react-router-dom";
import { STUDENT_ROOT_PATH } from "./constants";
import { STUDENT_MONTHLY_ROOT_PATH } from "./monthly-fee/constants";
import StudentMonthlyPage from "./monthly-fee/Loadable";
import { STUDENT_CLASS_ROOT_PATH } from "./student-class/constants";
import StudentClassPage from "./student-class/Loadable";
import { STUDENT_BUS_STOP_ROOT_PATH } from "./student-bus-stop/constants";
import StudentBusStopPage from "./student-bus-stop/Loadable";
import { STUDENT_TRACKING_ROOT_PATH } from "./student-tracking/constants";
import StudentTrackingPage from "./student-tracking/Loadable";
import StudentPage from "./Loadable";

function StudentRoutePage() {
  return (
    <Switch>
      <Route
        path={`${STUDENT_MONTHLY_ROOT_PATH}`}
        component={StudentMonthlyPage}
      />
      <Route path={`${STUDENT_CLASS_ROOT_PATH}`} component={StudentClassPage} />
      <Route path={STUDENT_BUS_STOP_ROOT_PATH} component={StudentBusStopPage} />
      <Route
        path={STUDENT_TRACKING_ROOT_PATH}
        component={StudentTrackingPage}
      />
      <Route path={STUDENT_ROOT_PATH} component={StudentPage} />
    </Switch>
  );
}

StudentRoutePage.propTypes = {};

StudentRoutePage.defaultProps = {};

export default StudentRoutePage;
