import React, { useState } from 'react';
import MailMergeUpload from '../tools/mail-merge/components/MailMergeUpload';
import Widget from '../../components/Widget/Widget';
import { SURVEY_QUESTION_TYPE, useSurveyContext } from './constants';
import { isNumber } from '../../libs/utils/number.util';
import surveyApi from '../../libs/apis/survey/survey.api';

const SurveyImportRaw = props => {
  const { survey, surveyQuestions } = useSurveyContext();
  const [table, setTable] = React.useState({
    columns: [],
    rows: [],
  });
  const [parseQuestions, setParseQuestions] = useState({});

  console.log(survey, surveyQuestions);

  const onNewUploadFile = React.useCallback(
    newTable => {
      if (surveyQuestions) {
        const { rows, columns } = newTable;
        const rs = {};
        columns.forEach((col, index) => {
          if (col[0] === 'Q') {
            const questionInfo = col.replaceAll('Q', '').split('_');
            const [questionIndex, answerId] = questionInfo;
            if (isNumber(questionIndex)) {
              const question = surveyQuestions[questionIndex - 1];
              if (question) {
                rs[`question${index}`] = {
                  Q: col,
                  question,
                  answerId,
                };
              }
            }
          }
        });
        const forms = [];
        rows.forEach((rowItem, rowIndex) => {
          const formPerson = {};
          const formAnswer = surveyQuestions.map(t => ({ questionId: t.id }));
          let clientId = '';
          rowItem.data.forEach((col, i) => {
            switch (i) {
              case 0: // clientId
                clientId = col;
                break;
              case 41:
                formPerson.lastName = col;
                break;
              case 42:
                formPerson.firstName = col;
                break;
              case 43:
                formPerson.email = col;
                break;
              default: {
                const question = rs[`question${i}`];
                if (question) {
                  const answer = Number(col);
                  const questionAnswer = formAnswer.find(
                    t => t.questionId === question.question.id,
                  );

                  if (
                    question.question.type === SURVEY_QUESTION_TYPE.CHECKBOX
                  ) {
                    const userQuestionAnswer =
                      question.question.questionAnswers[
                        Number(question.answerId) - 1
                      ];
                    if (!questionAnswer.answer) {
                      questionAnswer.answer = [];
                    }
                    if (isNumber(answer) && answer) {
                      questionAnswer.answer.push(userQuestionAnswer.key);
                    }
                  } else {
                    const userQuestionAnswer =
                      question.question.questionAnswers[answer - 1];
                    if (userQuestionAnswer) {
                      questionAnswer.answer = userQuestionAnswer.key;
                    }
                  }
                }
                break;
              }
            }
          });
          surveyApi
            .answerQuestion(btoa(`${survey.id}|${clientId}||`), {
              formPerson,
              formAnswer,
            })
            .then(
              resp => {
                console.log(rowIndex, 'Success', resp);
              },
              err => {
                console.log(rowIndex, 'Error', err);
              },
            );
        });
        console.log(rs);
        console.log(forms);
      }
    },
    [surveyQuestions, survey],
  );

  return (
    <Widget className="widget-custom">
      <MailMergeUpload onDone={onNewUploadFile} />
    </Widget>
  );
};

SurveyImportRaw.propTypes = {};

export default SurveyImportRaw;
