import React, { useCallback, useEffect, useMemo } from 'react';

import { Button, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import { TEMPLATE_TYPE } from '../../../libs/apis/template/templateType.api';
import EmailTemplateSelect from '../../../components/common/template/EmailTemplateSelect';
import { emailApi } from '../../../libs/apis/email.api';
import { MAIL_MERGE_ROW_STATE } from './constants';
import { useApi } from '../../../libs/hooks/useApi';
import TextIconButton from '../../../components/button/TextIconButton';
import MailMergeStateBtnIcon from './components/MailMergeStateBtnIcon';
import PageTitle from '../../Layout/PageTitle';
import { emailSchema } from '../../../libs/utils/schema.util';
import MailMergeUpload from './components/MailMergeUpload';
import ListWidget from '../../../components/ListWidget';
import RawHTML from '../../../components/RawHtml';
import { useConfirmDialog } from '../../../libs/hooks/useConfirmDialog';

const MailMerge = () => {
  const [emailContent, setEmailContent] = React.useState(null);
  const [emailColumn, setEmailColumn] = React.useState('0');
  const [table, setTable] = React.useState({
    columns: [],
    rows: [],
  });
  const [templateId, setTemplateId] = React.useState(null);

  const {
    state: { isLoading, errors, resp },
    exec,
  } = useApi(emailApi.send);

  const { confirmModal, openConfirm } = useConfirmDialog();

  const unsentMessages = useMemo(() => {
    if (!table || !table.rows || !table.rows.length) return [];
    return table.rows.filter(t => t.state === MAIL_MERGE_ROW_STATE.PENDING);
  }, [table]);

  const setRowState = React.useCallback(
    (id, { state, message }) => {
      const newRows = table.rows.map(t => {
        if (t.id === id) {
          return { ...t, state, message };
        }
        return t;
      });
      setTable({ columns: table.columns, rows: newRows });
    },
    [table],
  );

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

  const variables = useMemo(() => {
    let rs = null;
    if (table && table.columns && table.columns.length) {
      rs = table.columns.map((t, i) => ({
        value: `{{column[${i}]}}`,
        remark: String(t),
      }));
    }
    return rs;
  }, [table]);

  const emailRender = useCallback(
    row => {
      let rs = null;
      if (templateId && row && !Number.isNaN(emailColumn)) {
        let {
          subject,
          template: { content },
        } = templateId;
        for (let i = 0; i < row.data.length; i += 1) {
          subject = subject.replaceAll(`{{column[${i}]}}`, row.data[i]);
          content = content.replaceAll(`{{column[${i}]}}`, row.data[i]);
        }
        rs = {
          id: row.id,
          ...templateId,
          subject,
          content,
          to: row.data[Number(emailColumn)],
        };
      }
      return rs;
    },
    [templateId, emailColumn],
  );

  const sendAllEmail = React.useCallback(() => {
    openConfirm({
      title: 'Send All Email',
      message: `Are you sure to send total ${unsentMessages.length} email?`,
      onClose: isConfirm => {
        if (isConfirm) {
          const emailMessages = unsentMessages.map(t => emailRender(t));
          console.log(emailMessages);
          exec(emailMessages);
        }
      },
    });
  }, [unsentMessages, exec, emailRender]);

  const sendEmailRow = React.useCallback(
    row => {
      const emailMessage = emailRender(row);
      openConfirm({
        title: 'Send Email',
        message: `Send email to ${emailMessage.to}`,
        onClose: isConfirm => {
          if (isConfirm) {
            setRowState(row.id, { state: MAIL_MERGE_ROW_STATE.PROCESSING });

            emailApi.send([emailMessage]).then(
              _resp => {
                console.log(_resp);
                setRowState(row.id, { state: MAIL_MERGE_ROW_STATE.DONE });
              },
              err => {
                console.log(err);
                setRowState(row.id, { state: MAIL_MERGE_ROW_STATE.FAIL });
              },
            );
          }
        },
      });
    },
    [setRowState, emailRender],
  );

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
                disabled={!templateId}
                onClick={() => {
                  setEmailContent(emailRender(row));
                }}
              >
                <i className="fa fa-eye" />
              </Button>,
              <MailMergeStateBtnIcon
                key="sendTest"
                type="button"
                disabled={
                  !templateId || row.state !== MAIL_MERGE_ROW_STATE.PENDING
                }
                onClick={() => {
                  sendEmailRow(row);
                }}
                isLoading={row.state === MAIL_MERGE_ROW_STATE.PROCESSING}
                state={row.state}
              />,
            ]}
          />
        ),
      },
    ];
  }, [table, templateId, sendEmailRow]);

  const actions = React.useMemo(
    () =>
      table.rows.length ? (
        <div className="form-inline">
          <label htmlFor="emailColumn" className="mr-2">
            Select Email Column
          </label>
          <Input
            type="select"
            id="emailColumn"
            className="mr-2"
            value={emailColumn}
            onChange={e => {
              setEmailColumn(e.target.value);
            }}
          >
            {table.columns.map((t, i) => (
              <option key={uuidv4()} value={i}>
                {t}
              </option>
            ))}
          </Input>
          <label htmlFor="emailColumn" className="mr-2">
            Select Template
          </label>
          <div className="d-inline mr-2">
            <EmailTemplateSelect
              enableAction
              style={{ width: '300px' }}
              name="templateId"
              type={TEMPLATE_TYPE.MAIL_MERGE}
              value={templateId}
              onChange={setTemplateId}
              variables={variables}
            />
          </div>
          <TextIconButton
            className="mr-2 btn-raised"
            disabled={!templateId || !unsentMessages.length}
            isLoading={isLoading}
            icon={<i className="fa fa-send fa-fw" />}
            onClick={e => {
              sendAllEmail();
              e.preventDefault();
            }}
          >
            Send Mail
          </TextIconButton>
          <Button
            className="mr-2 btn-raised"
            color="danger"
            onClick={() => {
              setTable({ rows: [], columns: [] });
            }}
          >
            <i className="fa fa-trash-o mr-2" aria-hidden="true" />
            Reset
          </Button>
        </div>
      ) : null,
    [templateId, emailColumn, variables, isLoading, unsentMessages],
  );

  const pageTitle = useMemo(() => <PageTitle title="Mail Merge" />, [actions]);

  const onNewUploadFile = React.useCallback(newTable => {
    setTable(newTable);
    const { rows } = newTable;
    if (rows.length > 0) {
      const [{ data }] = rows;
      for (let i = 0; i < data.length; i += 1) {
        try {
          emailSchema.validateSync(data[i]);
          setEmailColumn(String(i));
          return;
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    }
    toast.warning(
      'Can not detect any email column in upload file. Must have at least 1 column contain email',
    );
  }, []);

  const mailMergeUpload = React.useMemo(
    () => (
      <>
        {pageTitle}
        <MailMergeUpload onDone={onNewUploadFile} />
      </>
    ),
    [pageTitle],
  );

  const render = useMemo(() => {
    let rs;
    if (table.columns.length) {
      rs = (
        <ListWidget fetchData={search} columns={columns} pageHeader={pageTitle}>
          {actions}
        </ListWidget>
      );
    } else {
      rs = mailMergeUpload;
    }
    return rs;
  }, [table, columns, search, pageTitle]);

  useEffect(() => {
    if (errors && errors.length) {
      toast.error(errors.map(t => t.message).join('\n'));
    }
  }, [errors]);

  useEffect(() => {
    if (resp) {
      const { success, fail } = resp;
      toast.success(
        <>
          {success.length ? (
            <p className="">Send success: {success.length}</p>
          ) : null}
          {fail.length ? (
            <p className="text-danger">Send fail: {fail.length}</p>
          ) : null}
        </>,
      );
      const newRows = table.rows.map(t => {
        const successItem = success.find(item => item.id === t.id);
        if (successItem) {
          return { ...t, state: MAIL_MERGE_ROW_STATE.DONE };
        }
        const failItem = fail.find(item => item.id === t.id);
        if (failItem) {
          return { ...t, state: MAIL_MERGE_ROW_STATE.FAIL };
        }
        return t;
      });
      setTable({ columns: table.columns, rows: newRows });
    }
  }, [resp]);

  return (
    <>
      {render}
      <Modal isOpen={!!emailContent} fade={false} className="info">
        <ModalHeader toggle={() => setEmailContent(null)}>
          Email Content
        </ModalHeader>
        <ModalBody>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="min">From:</td>
                <td>{emailContent?.from}</td>
              </tr>
              <tr>
                <td className="min">To:</td>
                <td>{emailContent?.to}</td>
              </tr>
              {emailContent && emailContent.cc && emailContent.cc.length ? (
                <tr>
                  <td className="min">CC:</td>
                  <td>{emailContent.cc.join(',')}</td>
                </tr>
              ) : null}
              {emailContent && emailContent.bcc && emailContent.bcc.length ? (
                <tr>
                  <td className="min">BCC:</td>
                  <td>{emailContent.bcc.join(',')}</td>
                </tr>
              ) : null}
              <tr>
                <td className="min">Content:</td>
                <td>
                  <RawHTML html={emailContent?.content} />
                </td>
              </tr>
            </tbody>
          </table>
        </ModalBody>
      </Modal>
      {confirmModal}
    </>
  );
};
MailMerge.propTypes = {};

export default MailMerge;
