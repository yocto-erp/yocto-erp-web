import React from 'react';
import { useParams } from 'react-router-dom';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { useApi } from '../../../libs/hooks/useApi';
import surveyApi from '../../../libs/apis/survey.api';
const ResultPage = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { target, surveyId } = useParams();
  const toggle = () => setIsOpen(!isOpen);
  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.readResult(surveyId, target));
  React.useEffect(() => {
    exec();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row align-items-center justify-content-center mh-100">
        <div className="col-12 col-sm-10 col-md-6 col-lg-6 text-center">
          <h1 className="mb-5">
            {resp?.survey?.name}
            <br />
            {resp?.survey?.remark ? (
              <small className="text-muted">{resp?.survey?.remark}</small>
            ) : null}
          </h1>
          {resp?.surveyPersonAnswers.map((t, indexQ) => {
            const conf = JSON.parse(t?.answer);
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className="mt-2" key={indexQ}>
                <Button
                  color="secondary"
                  onClick={toggle}
                  className="result-button-question text-left"
                >
                  {indexQ + 1}. {t?.question?.content}
                </Button>
                <Collapse isOpen={isOpen}>
                  <Card className="text-left">
                    {typeof conf === 'object' ? (
                      <>
                        {conf.map((answer, indexA) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <CardBody key={indexA}>
                            {indexA + 1}. {answer}
                          </CardBody>
                        ))}
                      </>
                    ) : (
                      <CardBody>1. {conf}</CardBody>
                    )}
                  </Card>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ResultPage.propTypes = {};

export default ResultPage;
