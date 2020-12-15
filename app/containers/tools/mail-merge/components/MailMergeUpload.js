import React from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import FilePicker from '../../../../components/FilePicker';
import { MAIL_MERGE_ROW_STATE } from '../constants';

const MailMergeUpload = ({ onDone }) => {
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
      const columns = parseRows.shift();
      const rows = parseRows.map(t => ({
        id: uuidv4(),
        state: MAIL_MERGE_ROW_STATE.PENDING,
        message: '',
        data: t,
      }));
      onDone({
        columns,
        rows,
      });
    };

    reader.onerror = function onError(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(selectFile);
  }, []);
  return (
    <FilePicker
      multiple={false}
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      onPicked={selectedFile => {
        handleProcessFile(selectedFile[0]);
      }}
    />
  );
};

MailMergeUpload.propTypes = {
  onDone: PropTypes.func,
};

export default MailMergeUpload;
