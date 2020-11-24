import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import { isArrayHasItem } from '../../../utils/util';

const PreviewQuestionAnswer = ({ question, answer, isOpen }) => {
  const [state, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <Card className="text-left mt-2">
      <CardHeader onClick={() => setIsOpen(!state)}>
        {question.content}
      </CardHeader>
      <Collapse isOpen={state}>
        <CardBody>
          {isArrayHasItem(answer) ? (
            <ul>
              {answer.map(item => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          ) : (
            answer
          )}
        </CardBody>
      </Collapse>
    </Card>
  );
};

PreviewQuestionAnswer.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.any,
  isOpen: PropTypes.bool,
};

export default PreviewQuestionAnswer;
