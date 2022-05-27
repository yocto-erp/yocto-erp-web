import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";

import { mutate } from "swr";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import Footer from "../../Layout/Footer";
import { SWR_KEY_USER } from "../../../libs/hooks/useUser";
import { selectCompany } from "../../../libs/apis/auth.api";
import { set, STORAGE } from "../../../libs/utils/storage";
import { useApi } from "../../../libs/hooks/useApi";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { workspaceApi } from "../../../libs/apis/workspace.api";
import CreateButton from "../../../components/button/CreateButton";
import WorkspaceModalForm from "./WorkspaceModalForm";
import messages from "./messages";
import { ADMIN_PATH } from "../../../constants";

export function CompanyChoose() {
  const { state, exec: workspaceGet } = useApi(workspaceApi.search);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { isLoading },
    exec,
  } = useApi(companyId =>
    selectCompany(companyId).then(async resp1 => {
      set(STORAGE.JWT, resp1.token);
      await mutate(SWR_KEY_USER, resp1.user);
      history.push(ADMIN_PATH);
    }),
  );

  useEffect(() => {
    workspaceGet();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <>
      <Helmet titleTemplate="%s - Yocto ERP" defaultTitle="Yocto ERP">
        <meta
          name="description"
          content="Yocto ERP - a simple management tool for small company"
        />
      </Helmet>
      <div className="h-100 d-flex justify-content-center flex-column align-items-start">
        <Container>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <div className="row">
                {state.resp?.rows
                  ?.map(t => t.company)
                  .map(t => (
                    <div className="col-sm-4 pt-2 pb-2" key={t.id}>
                      <Card outline color="primary" className="h-100">
                        <CardBody>
                          <CardTitle>
                            <h3>{t.name}</h3>
                          </CardTitle>
                          <CardText>{t.remark}</CardText>
                        </CardBody>
                        <CardFooter>
                          <Button
                            color="primary"
                            type="button"
                            onClick={() => exec(t.id)}
                          >
                            <FormattedMessage {...messages.chooseCompany} />
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  <CreateButton type="button" onClick={() => setIsOpen(true)}>
                    <FormattedMessage {...messages.createCompanyButton} />
                  </CreateButton>
                </div>
              </div>
            </>
          )}
        </Container>
        <Footer />
      </div>
      <WorkspaceModalForm
        isOpen={isOpen}
        closeHandle={isOk => {
          setIsOpen(false);
          if (isOk) {
            workspaceGet();
          }
        }}
      />
    </>
  );
}

export default CompanyChoose;
