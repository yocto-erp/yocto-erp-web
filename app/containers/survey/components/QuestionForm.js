import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import * as Yup from 'yup';
import { FormattedMessage } from 'react-intl';
import AnswerItem from './AnswerItem';
import { SURVEY_QUESTION_TYPE } from '../constants';
import useSyncForm from '../../../libs/hooks/useSyncForm';
import messages from '../messages';

const QuestionForm = ({ question, onBack, onNext, index, total, answers }) => {
  const schema = React.useMemo(() => {
    let rs = null;
    switch (question.type) {
      case SURVEY_QUESTION_TYPE.RADIO:
        rs = Yup.object().shape({
          answer: Yup.string().required(),
        });
        break;
      case SURVEY_QUESTION_TYPE.CHECKBOX: {
        let arraySchema = Yup.array().required();
        try {
          const conf = JSON.parse(question.data);
          if (conf.max) {
            console.log(conf);
            arraySchema = arraySchema.max(conf.max);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}

        rs = Yup.object().shape({
          answer: arraySchema,
        });
        break;
      }
      default:
    }
    return rs;
  }, [question.type, question.data]);

  const initForm = useMemo(() => {
    let rs = null;
    if (answers) {
      switch (question.type) {
        case SURVEY_QUESTION_TYPE.RADIO:
          rs = String(answers.key);
          break;
        case SURVEY_QUESTION_TYPE.CHECKBOX: {
          rs = answers.map(t => String(t.key));
          break;
        }
        default:
      }
    }

    return rs;
  }, [answers, question.type]);
  const {
    register,
    onSubmit,
    errors,
    formState: { isValid },
  } = useSyncForm({
    form: {
      answer: initForm,
    },
    validationSchema: schema,
    api: async formData => {
      const userAnswer = formData.answer;
      let rs = null;
      if (typeof userAnswer === 'object') {
        rs = [];
        for (let j = 0; j < userAnswer.length; j += 1) {
          for (let i = 0; i < question.questionAnswers.length; i += 1) {
            const answer = question.questionAnswers[i];
            if (answer.key === userAnswer[j]) {
              rs.push(answer);
              break;
            }
          }
        }
      } else {
        for (let i = 0; i < question.questionAnswers.length; i += 1) {
          const answer = question.questionAnswers[i];
          if (answer.key === userAnswer) {
            rs = answer;
            break;
          }
        }
      }

      onNext(rs);
    },
  });

  return (
    <Form onSubmit={onSubmit} noValidate formNoValidate>
      <p>{question.introduction}</p>
      <p>{question.content}</p>
      {Object.keys(errors).length ? (
        <div className="alert-danger alert">
          <ul className="list-group text-left">
            {Object.keys(errors).map(t => {
              const item = errors[t];
              return (
                <li className="" key={item.message}>
                  {item.message}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div>
        {question.questionAnswers.map(t => (
          <AnswerItem
            key={t.id}
            register={register}
            type={question.type}
            item={t}
            name="answer"
          />
        ))}
      </div>
      <div className="row mt-3 mb-3 text-center">
        <div className="col-md-6">
          {index > 0 ? (
            <Button type="button" outline color="secondary" onClick={onBack}>
              <FormattedMessage {...messages.back} />
            </Button>
          ) : null}
        </div>
        <div className="col-md-6">
          {index <= total ? (
            <Button type="submit" disabled={!isValid} color="primary">
              <FormattedMessage {...messages.next} />
            </Button>
          ) : null}
        </div>
      </div>
    </Form>
  );
};

QuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  index: PropTypes.number,
  total: PropTypes.number,
  answers: PropTypes.any,
};

export default QuestionForm;
