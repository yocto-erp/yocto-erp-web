import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TableActionColumns from '../../../components/ListWidget/TableActionColumn';
import studentMonthlyFeeApi from '../../../libs/apis/student/student-monthly-fee.api';
import { STUDENT_MONTHLY_ROOT_PATH } from './constants';
import Filter from './components/Filter';
import { deletePage, deletePagePattern } from '../../../libs/utils/crud.util';
import DeleteConfirmModal from '../../../components/modal/DeleteConfirmModal';
import ListWidget from '../../../components/ListWidget';
import { SORT_DIR } from '../../../components/ListWidget/constants';
import Header from './components/Header';
import { formatDate, formatMonth } from '../../../libs/utils/date.util';
import Price from '../../../components/common/Price';
import useStudentConfigure from '../../../libs/hooks/useStudentConfigure';
import DownloadButton from '../../../components/button/DownloadButton';
import IconButton from '../../../components/button/IconButton';
import StudentFeePaid from './components/StudentFeePaid';

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const ListPage = ({ history }) => {
  const { configure } = useStudentConfigure();
  const [paymentStudent, setPaymentStudent] = useState(null);
  const columns = React.useMemo(
    () => [
      {
        header: 'Month / Student',
        data: 'monthYear',
        class: 'text-nowrap min',
        render: row => (
          <>
            <span>{formatMonth(row.monthFee, row.yearFee)}</span>
            <br />
            <p className="mb-0">
              <strong>
                {row.student.child.name} ({row.student.alias})
              </strong>
            </p>
          </>
        ),
      },
      {
        header: 'Tuition Fee',
        data: 'tuitionFee',
        class: 'text-nowrap min',
        render: row => (
          <>
            <Price amount={row.feePerMonth} />
            {row.scholarShip ? (
              <p className="mb-0">
                <strong>ScholarShip:</strong> {row.scholarShip}% (
                <Price amount={row.scholarFee} />)
              </p>
            ) : null}
          </>
        ),
      },
      {
        header: 'Detail Fees',
        data: 'absentDay',
        class: 'text-nowrap min',
        render: row => (
          <>
            {row.absentDay ? (
              <p className="mb-0">
                <strong>School Absent Day: </strong>
                {row.absentDay} (
                <Price amount={row.absentDayFee} />)
              </p>
            ) : null}
            {row.studentAbsentDay ? (
              <p className="mb-0">
                <strong>Student Absent Day: </strong>
                {row.studentAbsentDay} (
                <Price amount={row.studentAbsentDayFee} />)
              </p>
            ) : null}
            {row.trialDate ? (
              <p className="mb-0">
                <strong>Trial Day:</strong> {row.trialDate} (
                <Price amount={row.trialDateFee} />)
              </p>
            ) : null}
            {row.busFee ? (
              <p className="mb-0">
                <strong>Bus Fee: </strong> <Price amount={row.busFee} />
              </p>
            ) : null}
            {row.mealFee ? (
              <p className="mb-0">
                <strong>Meal Fee: </strong> <Price amount={row.mealFee} />
              </p>
            ) : null}
            {row.otherFee ? (
              <p className="mb-0">
                <strong>Extra: </strong>
                <Price amount={row.otherFee} />
              </p>
            ) : null}
            {row.otherDeduceFee ? (
              <p className="mb-0">
                <strong>Deduce: </strong>
                <Price amount={row.otherDeduceFee} />
              </p>
            ) : null}
            {row.debt ? (
              <p className="mb-0">
                <strong>Debt: </strong>
                <Price amount={row.debt} />
              </p>
            ) : null}
          </>
        ),
      },
      {
        header: 'Remark',
        data: 'remark',
      },
      {
        header: 'Total',
        data: 'totalAmount',
        class: 'text-nowrap min',
        render: row => <Price amount={row.totalAmount} />,
      },
      {
        header: 'Paid',
        data: 'paid',
        class: 'min no-wrap',
        render: row => {
          if (!row.paidDate) {
            return (
              <IconButton
                size="sm"
                color="warning"
                onClick={() => setPaymentStudent(row)}
                title="Set Payment"
              >
                <i className="fa fa-dollar" />{' '}
              </IconButton>
            );
          }
          return (
            <>
              <p className="m-0">
                Paid: <Price amount={row.paidAmount} />
                <br />
                On: {formatDate(new Date(row.paidDate))}
                <br />
                <span className="text-info small">{row.paidInformation}</span>
              </p>
            </>
          );
        },
      },
      {
        header: 'Action',
        data: '',
        class: 'action',
        render: row => (
          <TableActionColumns
            onDelete={() => {
              history.push(deletePage(ROOT_PATH, row.id));
            }}
          >
            <div className="btn-group-sm btn-group">
              <DownloadButton
                key="pdf"
                title="Download PDF"
                link={() =>
                  studentMonthlyFeeApi.pdf(
                    row.id,
                    configure.printTemplateId || 0,
                  )
                }
                fileName={() => `${row.student.child.name}.pdf`}
              >
                <i className="fa fa-file-pdf-o" />
              </DownloadButton>
            </div>
          </TableActionColumns>
        ),
      },
    ],
    [configure, setPaymentStudent],
  );

  const search = { search: '' };

  const deleteConfirmDialog = React.useMemo(
    () => (
      <Route
        path={deletePagePattern(ROOT_PATH)}
        render={({
          match: {
            params: { id },
          },
        }) => (
          <DeleteConfirmModal
            id={id}
            deleteApi={studentMonthlyFeeApi.remove}
            readApi={par =>
              studentMonthlyFeeApi.read(par).then(resp => resp[0])
            }
            routePattern={ROOT_PATH}
            onClose={item => {
              history.goBack();
              if (item) {
                toast.success(
                  <span>
                    Delete Student Fee{' '}
                    <strong>
                      {item.student.studentId} - {item.student.child.name}
                    </strong>{' '}
                    at month{' '}
                    <strong>{formatMonth(item.monthFee, item.yearFee)}</strong>{' '}
                    Success
                  </span>,
                );
              }
            }}
            title="Delete Student Fee?"
            message={row => {
              if (!row) return '';
              return (
                <span>
                  Are you sure to delete fee of student{' '}
                  <strong>
                    {row.student.studentId} - {row.student.child.name}
                  </strong>{' '}
                  at month{' '}
                  <strong>{formatMonth(row.monthFee, row.yearFee)}</strong> ?
                </span>
              );
            }}
          />
        )}
      />
    ),
    [],
  );
  return (
    <>
      <ListWidget
        pageHeader={<Header history={history} />}
        deleteDialog={deleteConfirmDialog}
        columns={columns}
        fetchData={studentMonthlyFeeApi.search}
        initFilter={search}
        initPage={1}
        initSize={10}
        enableSelectColumn
      >
        <Filter data={search} />
      </ListWidget>
      <StudentFeePaid
        student={paymentStudent}
        isOpen={!!paymentStudent}
        onClose={() => setPaymentStudent(null)}
      />
    </>
  );
};
ListPage.propTypes = {
  history: PropTypes.any,
};

export default ListPage;
