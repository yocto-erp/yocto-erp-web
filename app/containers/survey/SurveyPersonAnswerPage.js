import React from 'react';
import { useParams } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import ListWidget from '../../components/ListWidget';
import Filter from './components/Filter';
import surveyApi from '../../libs/apis/survey/survey.api';
import { useAsync } from '../../libs/hooks/useAsync';

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
            <p className="text-nowrap" id={`question${index + 1}`}>
              question{index + 1} <i className="fa fa-info" />
            </p>
            <UncontrolledTooltip
              placement="right"
              target={`question${index + 1}`}
            >
              {question.content}
            </UncontrolledTooltip>
          </div>
        ),
        data: `surveyPersonAnswers${index}`,
        width: '5%',
        render: row => row.surveyPersonAnswers[index].answer,
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
          </div>
        ),
      },
      ...questionColumn,
      {
        header: 'Action',
        data: 'action',
        class: 'action',
        render: row => (
          <TableActionColumns onView={() => console.log('onView', row)} />
        ),
      },
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
