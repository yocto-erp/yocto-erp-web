import React from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Card,
  CardBody,
  CardDeck,
  CardFooter,
  CardText,
  CardTitle,
  Container,
} from "reactstrap";

import { mutate } from "swr";
import Footer from "../../Layout/Footer";
import useUser, { SWR_KEY_USER } from "../../../libs/hooks/useUser";
import { selectCompany } from "../../../libs/apis/auth.api";
import { set, STORAGE } from "../../../libs/utils/storage";
import { useApi } from "../../../libs/hooks/useApi";
import LoadingIndicator from "../../../components/LoadingIndicator";

export function CompanyChoose() {
  const { user } = useUser();

  const {
    state: { isLoading },
    exec,
  } = useApi(companyId => {
    selectCompany(companyId).then(async resp1 => {
      set(STORAGE.JWT, resp1.token);
      await mutate(SWR_KEY_USER);
    });
  });

  return (
    <>
      <Helmet titleTemplate="%s - Yocto ERP" defaultTitle="Yocto ERP">
        <meta
          name="description"
          content="Yocto ERP - a simple management tool for small company"
        />
      </Helmet>
      <div className="h-100 d-flex align-items-center">
        <Container>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <CardDeck>
              {user?.userCompanies?.map(t => (
                <Card outline color="primary">
                  <CardBody>
                    <CardTitle>
                      <h3>{t.name}</h3>
                    </CardTitle>
                    <CardText>{t.remark}</CardText>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" onClick={() => exec(t.id)}>
                      Select
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardDeck>
          )}
          <div className="bg-widget auth-widget-footer" />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default CompanyChoose;
