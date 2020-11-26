import React from 'react';
import QuestionChart from './components/QuestionChart';

const QuestionSummaryPage = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <QuestionChart surveyId={8} questionId={11} />
        </div>
        <div className="col-md-12">
          <QuestionChart surveyId={8} questionId={12} type="pie" />
        </div>
      </div>
    </div>
  );
};

QuestionSummaryPage.propTypes = {};

export default QuestionSummaryPage;
