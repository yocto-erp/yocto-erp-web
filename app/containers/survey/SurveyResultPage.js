import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDateOnly } from '../../libs/utils/date.util';
import TableActionColumns from '../../components/ListWidget/TableActionColumn';
import ListWidget from '../../components/ListWidget';
import Filter from './components/Filter';
import surveyApi from '../../libs/apis/survey/survey.api';
import { parseUserAgent } from '../../utils/client';

const SurveyResultPage = () => {
  const { id } = useParams();
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
      {
        header: 'IP',
        data: 'IP',
        width: '12%',
      },
      {
        header: 'Client Agent',
        data: 'clientAgent',
        class: 'text-nowrap',
        width: '12%',
        render: row => {
          const ua = parseUserAgent(row.clientAgent);
          console.log(ua);
          return (
            <div>
              {ua.browser.name}
              <br />
              {ua.os.name} - {ua.os.version}
            </div>
          );
        },
      },
      {
        header: 'BlockChain',
        data: 'blockchain',
        class: 'text-eclipse',
        render: row => (
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
                <br />
              </>
            ) : (
              <span className="badge badge-warning">IPFS: Processing ...</span>
            )}

            {row.blockchainId ? (
              <span className="badge badge-primary text-nowrap text-ellipsis">
                <a
                  className="text-white"
                  href={`https://ropsten.etherscan.io/tx/${row.blockchainId}`}
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
        ),
      },
      {
        header: 'Submitted Date',
        data: 'submittedDate',
        class: 'min',
        render: row => formatDateOnly(new Date(row.submittedDate)),
      },
      {
        header: 'Action',
        data: 'action',
        class: 'action',
        render: row => (
          <TableActionColumns onView={() => console.log('onView', row)} />
        ),
      },
    ],
    [],
  );

  const search = { search: '' };

  return (
    <ListWidget
      widgetClassname="widget-custom"
      columns={columns}
      fetchData={surveyApi.results(id)}
      initialSize={10}
      initialPage={1}
      initialFilter={search}
    >
      <Filter data={search} />
    </ListWidget>
  );
};

SurveyResultPage.propTypes = {};

export default SurveyResultPage;
