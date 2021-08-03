import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'reactstrap';
import { SURVEY_ROOT_PATH, useSurveyContext } from './constants';
import Widget from '../../components/Widget/Widget';
import FormGroupInput from '../../components/Form/FormGroupInput';
import SearchButton from '../../components/button/SearchButton';
import surveyApi from '../../libs/apis/survey/survey.api';
import { useApi } from '../../libs/hooks/useApi';
import { genderStr } from '../../libs/apis/person.api';
import UserAgent from './components/UserAgent';
import { formatDateOnly } from '../../libs/utils/date.util';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import { SURVEY_TYPE } from './Admin/constants';

const SurveyExplorePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { survey } = useSurveyContext();
  const [search, setSearch] = useState('');

  const {
    exec,
    state: { isLoading, resp },
  } = useApi(() =>
    surveyApi.results(id)({
      page: 1,
      size: 50,
      filter: {
        search,
      },
    }),
  );

  return (
    <Widget className="widget-custom">
      <Form inline className="justify-content-center">
        <FormGroupInput
          type="text"
          name="search"
          className="mr-2"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search By First Name, Last Name, Email"
          style={{ width: '300px' }}
        />
        <SearchButton
          className="search-button"
          color=""
          onClick={exec}
          outline={false}
          isLoading={isLoading}
          disabled={isLoading || !(search || search.length)}
        />
      </Form>
      {resp ? (
        <table className="table table-sm table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>Person</th>
              <th>IP</th>
              <th>Client Agent</th>
              <th>BlockChain</th>
              <th>Submitted Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {resp.rows.map(row => (
              <tr>
                <td>
                  <div className="text-nowrap">
                    <p className="m-0">
                      <strong>Name: </strong>
                      {row.person.name}
                    </p>
                    <p className="m-0">
                      <strong>Email: </strong>
                      {row.person.email}
                    </p>
                    {row.ageRange ? (
                      <p className="m-0">
                        <strong>Age Range: </strong>
                        {row.ageRange}
                      </p>
                    ) : null}
                    <p className="m-0">
                      <strong>Client ID: </strong>
                      {row.clientId}
                    </p>
                    {row.person.sex ? (
                      <p className="m-0">
                        <strong>Gender: </strong>
                        {genderStr(row.person.sex)}
                      </p>
                    ) : null}
                    {row.person.address ? (
                      <p className="m-0">
                        <strong>Location: </strong>
                        {row.person.address}
                      </p>
                    ) : null}
                  </div>
                </td>
                <td>{row.IP}</td>
                <td>
                  <UserAgent agent={row.clientAgent} />
                </td>
                <td>
                  <div>
                    {row.ipfsId ? (
                      <>
                        <span className="badge badge-success text-nowrap text-ellipsis">
                          <a
                            className="text-white"
                            href={`https://ipfs.io/ipfs/${row.ipfsId}`}
                            target="_blank"
                          >
                            IPFS:{row.ipfsId}
                          </a>
                        </span>
                      </>
                    ) : (
                      <span className="badge badge-warning">
                        IPFS: Processing ...
                      </span>
                    )}
                    <br />
                    {row.blockchainId ? (
                      <span className="badge badge-primary text-nowrap text-ellipsis">
                        <a
                          className="text-white"
                          href={`https://ropsten.etherscan.io/tx/${
                            row.blockchainId
                          }`}
                          target="_blank"
                        >
                          Ethereum TX:&nbsp;{row.blockchainId}
                        </a>
                      </span>
                    ) : (
                      <span className="badge badge-warning">
                        Ethereum TX: Processing...
                      </span>
                    )}
                  </div>
                </td>
                <td>{formatDateOnly(new Date(row.submittedDate))}</td>
                <td>
                  <TableActionColumns
                    onView={() =>
                      history.push(
                        `${SURVEY_ROOT_PATH}/result/${
                          survey && survey.type === SURVEY_TYPE.PUBLIC
                            ? row.clientId
                            : row.person.email
                        }/${id}`,
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </Widget>
  );
};

SurveyExplorePage.propTypes = {};

export default SurveyExplorePage;
