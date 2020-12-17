import React from 'react';
import { useParams } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import ListWidget from '../../components/ListWidget';
import Filter from './components/Filter';
import surveyApi from '../../libs/apis/survey/survey.api';
import { formatDateOnly } from '../../libs/utils/date.util';
import { genderStr } from '../../libs/apis/person.api';
import { useSurveyContext } from './constants';

const SurveyPersonAnswerPage = () => {
  const { id } = useParams();

  const { surveyQuestions, survey } = useSurveyContext();

  const questionColumn = React.useMemo(() => {
    if (surveyQuestions) {
      return surveyQuestions.map((question, index) => ({
        key: `question${index + 1}`,
        header: (
          <div>
            <p className="text-nowrap mb-0" id={`question${question.id}`}>
              Question {index + 1} <i className="la la-info-circle" />
            </p>
            <UncontrolledTooltip
              placement="right"
              target={`question${question.id}`}
            >
              {question.content}
            </UncontrolledTooltip>
          </div>
        ),
        data: `surveyPersonAnswers${index}`,
        class: 'align-top',
        render: row => {
          const rs = row.surveyPersonAnswers
            .filter(t => t.questionId === question.id)
            .map(t => t.answer);
          if (rs.length > 1) {
            return (
              <ul className="mb-0">
                {rs.map(t => (
                  <li> - {t}</li>
                ))}
              </ul>
            );
          }
          return rs.join('');
        },
      }));
    }
    return [];
  }, [surveyQuestions]);

  const columns = React.useMemo(
    () => [
      {
        key: 'personId',
        header: 'Person',
        data: 'personId',
        width: '5%',
        render: row => (
          <div className="text-nowrap">
            <p className="m-0">
              <strong>Name: </strong>
              {row.person.name}
            </p>
            <p className="m-0">
              <strong>Email: </strong>
              {row.person.email}
            </p>
            <p className="m-0">
              <strong>Location: </strong>
              {row.person.address}
            </p>
            <p className="m-0">
              <strong>Age Range: </strong>
              {row.ageRange}
            </p>
            <p className="m-0">
              <strong>Gender: </strong>
              {genderStr(row.person.sex)}
            </p>
            <p className="m-0">
              <strong>Submitted Date: </strong>
              {formatDateOnly(new Date(row.submittedDate))}
            </p>
          </div>
        ),
      },
      ...questionColumn,
    ],
    [questionColumn],
  );

  const search = { search: '' };
  return (
    <ListWidget
      widgetClassname="widget-custom"
      columns={columns}
      fetchData={surveyApi.personAnswer(id)}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
    >
      <Filter data={search} />
    </ListWidget>
  );
};

SurveyPersonAnswerPage.propTypes = {};

export default SurveyPersonAnswerPage;
