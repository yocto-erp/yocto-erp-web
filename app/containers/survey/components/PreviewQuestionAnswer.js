import React, { useCallback, useEffect } from 'react';
import { Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import { isArrayHasItem } from '../../../utils/util';

const PreviewQuestionAnswer = ({ question, answer, isOpen }) => {
  console.log(question);
  const [state, setIsOpen] = React.useState(false);

  const getAnwserContent = useCallback(
    key => {
      const answers = question.questionAnswers || question.answers;
      return answers.find(t => t.key === key).content;
    },
    [question],
  );

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  return (
    <Card className="text-left mt-2">
      <CardHeader
        className="font-weight-bolder"
        onClick={() => setIsOpen(!state)}
      >
        {question.content}
      </CardHeader>
      <Collapse isOpen={state}>
        <CardBody>
          {isArrayHasItem(answer) ? (
            <ul>
              {answer.map(item => (
                <li key={item}>- {getAnwserContent(item)}</li>
              ))}
            </ul>
          ) : (
            getAnwserContent(answer)
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
