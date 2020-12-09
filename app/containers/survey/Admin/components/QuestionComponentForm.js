import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardHeader,
  Collapse,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { SURVEY_QUESTION_TYPE } from '../../constants';

const QuestionComponentForm = ({ question, isOpen, onEdit, onDelete }) => {
  const [state, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return React.useMemo(() => {
    let rs = '';
    switch (question?.type) {
      case SURVEY_QUESTION_TYPE.CHECKBOX:
        rs = <span className="badge badge-info">CHECKBOX</span>;
        break;
      case SURVEY_QUESTION_TYPE.RADIO:
        rs = <span className="badge badge-primary">RADIO</span>;
        break;
      default:
        return rs;
    }
    return (
      <Card className="text-left mt-2">
        <CardHeader
          className="font-weight-bolder"
          onClick={() => setIsOpen(!state)}
        >
          <div className="row">
            <div className="col-9">{question?.content}</div>
            <div className="col-1">
              <div>{rs}</div>
            </div>
            <div className="col-2">
              <ButtonToolbar className="">
                <ButtonGroup size="sm">
                  <Button
                    key="edit"
                    onClick={e => onEdit(e, question)}
                    color="warning"
                  >
                    <i className="fi flaticon-edit" />
                  </Button>
                  <Button
                    key="delete"
                    onClick={() => onDelete(question)}
                    color="danger"
                  >
                    <i className="fi flaticon-trash" />
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </div>
        </CardHeader>
        <Collapse isOpen={state}>
          <CardBody>
            <ul>
              {question?.questionAnswers?.map((item, index) => (
                <li key={item?.id}>
                  {index + 1}. {item?.content}
                </li>
              ))}
            </ul>
          </CardBody>
        </Collapse>
      </Card>
    );
  }, [question, state]);
};

QuestionComponentForm.propTypes = {
  question: PropTypes.object,
  isOpen: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default QuestionComponentForm;
