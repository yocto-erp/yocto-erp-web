import React from 'react';
import { useParams } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import ListWidget from '../../components/ListWidget';
import Filter from './components/Filter';
import surveyApi from '../../libs/apis/survey/survey.api';
import { useAsync } from '../../libs/hooks/useAsync';
import { formatDateOnly } from '../../libs/utils/date.util';

const SurveyPersonAnswerPage = () => {
  const { id } = useParams();

  const [, exec, resp] = useAsync({
    asyncApi: () => surveyApi.readSurveyQuestion(id),
  });

  React.useEffect(() => {
    exec();
  }, [id]);

  const questionColumn = React.useMemo(() => {
    if (resp) {
      return resp.map((question, index) => ({
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
  }, [resp]);

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
              <strong>Address: </strong>
              {row.person.address}
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
    [resp, questionColumn],
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
