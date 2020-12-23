import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../../libs/hooks/useAsync';
import surveyQuestionAdminApi from '../../../libs/apis/survey/survey-question-admin.api';
import PageTitle from '../../Layout/PageTitle';
import CreateButton from '../../../components/button/CreateButton';
import QuestionComponentForm from './components/QuestionComponentForm';
import QuestionModalForm from './components/QuestionModalForm';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';

const ListQuestionPage = ({ history }) => {
  const { id } = useParams();
  const [isOpen, open] = React.useState(false);
  const [isOpenDel, openDel] = React.useState(false);
  const [questionId, setQuestionId] = React.useState(null);
  const [, exec, resp] = useAsync({
    asyncApi: () => surveyQuestionAdminApi.listQuestions(id),
  });

  React.useEffect(() => {
    exec();
  }, [id]);

  const action = (
    <div>
      <CreateButton
        onClick={() => {
          setQuestionId(null);
          open(true);
        }}
      >
        Add Question
      </CreateButton>
    </div>
  );

  const onEdit = React.useCallback(
    (e, question) => {
      e.preventDefault();
      e.stopPropagation();
      open(true);
      setQuestionId(question?.id);
    },
    [resp, questionId],
  );
  const onDelete = React.useCallback(
    (e, question) => {
      e.preventDefault();
      e.stopPropagation();
      openDel(true);
      setQuestionId(question?.id);
    },
    [resp, questionId],
  );

  const deleteConfirmDialog = React.useMemo(
    () => (
      <DeleteConfirmModal
        isReload={false}
        id={questionId?.toString() || ''}
        deleteApi={surveyQuestionAdminApi.remove}
        readApi={surveyQuestionAdminApi.read}
        onClose={item => {
          if (item) {
            toast.success(`Delete Survey ${item.content} Success`);
            exec();
          }
        }}
        title="Delete Survey?"
        message={row => {
          if (!row) return '';
          return `Are you sure to delete ${row.content} ?`;
        }}
      />
    ),
    [questionId],
  );

  return resp ? (
    <>
      <PageTitle title={resp?.name} actions={action} />
      <div className="row">
        <div className="col-md-12">
          {resp?.questions?.map(t => (
            <div className="row" key={`${resp?.id}-${t?.id}`}>
              <div className="col">
                <QuestionComponentForm
                  question={t}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen ? (
        <QuestionModalForm
          surveyId={id}
          id={questionId || null}
          closeHandle={val => {
            if (val) {
              exec();
            }
            open(false);
          }}
          isOpen={isOpen}
        />
      ) : (
        ''
      )}
      {isOpenDel ? deleteConfirmDialog : ''}
    </>
  ) : (
    ''
  );
};

ListQuestionPage.propTypes = { history: PropTypes.any };

export default ListQuestionPage;
