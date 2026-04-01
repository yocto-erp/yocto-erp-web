import React from "react"
import { Route, Switch } from "react-router-dom"
import { listPage } from "../../libs/utils/crud.util"
import ListCompanySchoolUpdate from "./ListCompanySchoolUpdate"
import { COMPANY_SCHOOL_UPDATE_LIST } from "./constants"
import CompanySchoolDetail from "./CompanySchoolDetail"

function CompanySchoolPage() {
  return (
    <Switch>
      <Route
        exact
        path={`${COMPANY_SCHOOL_UPDATE_LIST}/:id/view`}
        component={CompanySchoolDetail}
      />
      <Route path={`${listPage(COMPANY_SCHOOL_UPDATE_LIST)}`} component={ListCompanySchoolUpdate} />
    </Switch>
  )
}

CompanySchoolPage.propTypes = {}

CompanySchoolPage.defaultProps = {}

export default CompanySchoolPage
