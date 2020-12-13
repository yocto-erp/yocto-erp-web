import React, { useCallback, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { Button } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import PageTitle from '../../Layout/PageTitle';
import FilePicker from '../../../components/FilePicker';
import ListWidget from '../../../components/ListWidget';
import SendMailButton from '../../../components/button/SendMailButton';
import ConfigureButton from '../../../components/button/ConfigureButton';
import MailMergeConfigure from './components/MailMergeConfigure';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';

const MailMerge = props => {
  const [file, setFile] = React.useState(null);
  const [configure, setConfigure] = React.useState(null);
  const [isOpenConfigure, setIsOpenConfigure] = React.useState(false);
  const [table, setTable] = React.useState({
    columns: [],
    rows: [],
  });

  const handleProcessFile = React.useCallback(selectFile => {
    const reader = new FileReader();

    reader.onload = function onLoad(e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, {
        type: 'binary',
      });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const parseRows = XLSX.utils.sheet_to_json(firstSheet, {
        range: 1,
        header: 1,
        defval: '',
      });
      console.log(parseRows);
      const columns = parseRows.shift();
      const rows = parseRows.map(t => ({
        id: uuidv4(),
        data: t,
      }));
      setTable({
        columns,
        rows,
      });
    };

    reader.onerror = function onError(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(selectFile);
  }, []);

  const columns = React.useMemo(() => {
    if (!table.columns.length) return [];
    return [
      ...table.columns.map((col, i) => ({
        header: String(col),
        data: String(col),
        render: row => String(row.data[i]),
      })),
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            buttons={[
              <Button
                key="preview"
                color="info"
                disabled={!configure}
                onClick={() => {
                  console.log(row);
                }}
              >
                <i className="fa fa-eye" />
              </Button>,
              <Button
                key="sendTest"
                color="warning"
                disabled={!configure}
                onClick={() => {
                  console.log(row);
                }}
              >
                <i className="fa fa-send" />
              </Button>,
            ]}
          />
        ),
      },
    ];
  }, [table, configure]);

  const search = React.useCallback(
    params =>
      new Promise(resolve => {
        console.log(params);
        const { page, size } = params;
        const from = (page - 1) * size;
        const rows = [];
        const maxLength = Math.min(size, table.rows.length);
        for (let i = 0; i < maxLength; i += 1) {
          rows.push(table.rows[from + i]);
        }
        resolve({
          count: table.rows.length,
          rows,
        });
      }),
    [table],
  );

  const actions = React.useMemo(
    () =>
      table.rows.length ? (
        <div>
          <Button
            className="mr-2 btn-raised"
            color="danger"
            onClick={() => {
              setFile(null);
              setTable({ rows: [], columns: [] });
            }}
          >
            <i className="fa fa-trash-o mr-2" aria-hidden="true" />
            Reset
          </Button>

          <SendMailButton
            className="mr-2 btn-raised"
            disabled={!configure}
            onClick={() => {
              console.log('Sent');
            }}
          />
          <ConfigureButton
            className="shadow btn-raised"
            onClick={() => {
              setIsOpenConfigure(!isOpenConfigure);
            }}
          />
        </div>
      ) : null,
    [table, configure, isOpenConfigure],
  );

  const emailRender = useCallback(
    row => {
      let rs = null;
      if (configure && row) {
        let { subject, content } = configure;
        for (let i = 0; i < row.length; i += 1) {
          subject = subject.replaceAll(`{{column[${i}]}}`, row[i]);
          content = content.replaceAll(`{{column[${i}]}}`, row[i]);
        }
        rs = { ...configure, subject, content };
      }
      return rs;
    },
    [configure],
  );

  const pageTitle = useMemo(
    () => <PageTitle title="Mail Merge" actions={actions} />,
    [actions],
  );

  const render = useMemo(() => {
    let rs = null;
    if (file) {
      rs = (
        <ListWidget
          fetchData={search}
          columns={columns}
          pageHeader={pageTitle}
        />
      );
    } else {
      rs = (
        <>
          {pageTitle}
          <FilePicker
            multiple={false}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onPicked={selectedFile => {
              console.log(selectedFile);
              setFile(selectedFile);
              handleProcessFile(selectedFile[0]);
            }}
          />
        </>
      );
    }
    return rs;
  }, [file, table, columns, search, pageTitle]);

  return (
    <>
      {render}
      <MailMergeConfigure
        onClose={() => setIsOpenConfigure(false)}
        onDone={setting => {
          setConfigure(setting);
          setIsOpenConfigure(false);
        }}
        columns={table.columns}
        isOpen={isOpenConfigure}
        setting={configure}
      />
    </>
  );
};
MailMerge.propTypes = {};

export default MailMerge;
