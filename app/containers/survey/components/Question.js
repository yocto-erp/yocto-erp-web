import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'reactstrap';
import * as Yup from 'yup';
import AnswerItem from './AnswerItem';
import useMyForm from '../../../libs/hooks/useMyForm';
import { SURVEY_QUESTION_TYPE } from '../constants';

const Question = ({ question, onBack, onNext, index, total, answers }) => {
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
  const {
    register,
    onSubmit,
    errors,
    formState: { isValid },
  } = useMyForm({
    form: {
      answer: answers,
    },
    validationSchema: schema,
    api: async formData => onNext(formData),
  });

  return (
    <Form onSubmit={onSubmit} noValidate formNoValidate>
      <div className="question-form">
        <p>{question.introduction}</p>
        <p>{question.content}</p>
        {Object.keys(errors).length ? (
          <div className="alert-danger alert">
            <ul className="list-group text-left">
              {Object.keys(errors).map(t => {
                const item = errors[t];
                return <li className="">{item.message}</li>;
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
        <div className="row mt-3">
          <div className="col justify-content-start ">
            {index > 0 ? (
              <Button type="button" outline color="secondary" onClick={onBack}>
                Back
              </Button>
            ) : null}
          </div>
          <div className="col justify-content-end">
            {index <= total ? (
              <Button type="submit" disabled={!isValid} color="primary">
                Next
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Form>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  index: PropTypes.number,
  total: PropTypes.number,
  answers: PropTypes.any,
};

export default Question;
