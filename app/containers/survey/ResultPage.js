import React from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../libs/hooks/useApi';
import surveyApi from '../../libs/apis/survey.api';
import PreviewQuestionAnswer from './components/PreviewQuestionAnswer';

const ResultPage = () => {
  const { target, surveyId } = useParams();
  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(() => surveyApi.readResult(surveyId, target));

  React.useEffect(() => {
    exec();
  }, []);

  return resp ? (
    <div className="d-flex h-100 justify-content-center">
      <div className="container p-4 text-center">
        <h1 className="mb-5">
          {resp.survey.name}
          <br />
          <small className="text-muted">{resp.survey.remark}</small>
        </h1>
        <div className="row">
          <div className="col-md-6">
            {resp.answers.map(t => (
              <div className="row" key={`${resp.id}-${t.question.id}`}>
                <div className="col">
                  <PreviewQuestionAnswer
                    question={t.question}
                    answer={t.answer}
                    isOpen
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 text-left mt-2">
            <div className="alert alert-success text-nowrap text-ellipsis">
              <strong>Ethereum Transaction:&nbsp;</strong>
              {resp.blockchainId ? (
                <a
                  target="_blank"
                  href={`https://ropsten.etherscan.io/tx/${resp.blockchainId}`}
                >
                  ${resp.blockchainId}
                </a>
              ) : (
                <span>Processing ...</span>
              )}
            </div>
            <div className="alert alert-primary">
              <strong>IPFS Hash:&nbsp;</strong>
              {resp.ipfsId ? (
                <a target="_blank" href={`https://ipfs.io/ipfs/${resp.ipfsId}`}>
                  ${resp.ipfsId}
                </a>
              ) : (
                <span>Processing ...</span>
              )}
            </div>
            <table className="table table-bordered">
              <tr>
                <td>Contract Address</td>
                <td>
                  <a
                    href="https://ropsten.etherscan.io/address/0x688ff2472c992f0849e765083f75e85564f86483"
                    target="_blank"
                  >
                    0x688ff2472c992f0849e765083f75e85564f86483
                  </a>
                </td>
              </tr>
              <tr>
                <td>Contract Source Code</td>
                <td>
                  <a
                    href="https://github.com/lpcanh/vote-contract"
                    target="_blank"
                  >
                    https://github.com/lpcanh/vote-contract
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

ResultPage.propTypes = {};

export default ResultPage;
