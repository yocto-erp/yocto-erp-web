import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import CreateButton from "../../../../components/button/CreateButton";
import { editPage, newPage } from "../../../../libs/utils/crud.util";
import {
  useListActionContext,
  useListStateContext,
} from "../../../../components/ListWidget/constants";
import SendMailButton from "../../../../components/button/SendMailButton";
import PageTitle from "../../../Layout/PageTitle";
import { STUDENT_MONTHLY_ROOT_PATH } from "../constants";
import SendMailStudentFee from "./SendMail";
import CloneNextMonth from "./CloneNextMonth";
import { useConfirmDialog } from "../../../../libs/hooks/useConfirmDialog";
import studentMonthlyFeeApi from "../../../../libs/apis/student/student-monthly-fee.api";

const ROOT_PATH = STUDENT_MONTHLY_ROOT_PATH;
const Header = ({ history }) => {
  const getStateSelect = useListStateContext();
  const totalSelectedItems = Object.keys(getStateSelect).length;
  const [isOpenSendMail, setIsOpenSendMail] = React.useState(false);
  const [isOpenCloneNextMonth, setIsOpenCloneNextMonth] = React.useState(false);
  const { confirmModal, openConfirm } = useConfirmDialog();
  const { onDeleted } = useListActionContext();
  const actions = (
    <>
      {totalSelectedItems ? (
        <div className="mr-2 d-md-inline d-sm-block">
          <span>Select: {totalSelectedItems} items</span>
        </div>
      ) : null}
      <CreateButton
        size="sm"
        className="mr-2 btn-raised"
        icon="fa fa-clone"
        color="info"
        disabled={!totalSelectedItems}
        onClick={() => {
          setIsOpenCloneNextMonth(true);
        }}
      >
        Clone for Next Month
      </CreateButton>
      <CreateButton
        size="sm"
        className="mr-2 btn-raised"
        onClick={() => {
          history.push(newPage(ROOT_PATH));
        }}
      />
      <CreateButton
        size="sm"
        className="mr-2 btn-raised"
        icon="fi flaticon-edit"
        disabled={!totalSelectedItems}
        color="warning"
        onClick={() => {
          history.push(editPage(ROOT_PATH, Object.values(getStateSelect)));
        }}
      >
        Edit
      </CreateButton>

      <CreateButton
        size="sm"
        className="mr-2 btn-raised"
        icon="fi flaticon-trash"
        disabled={!totalSelectedItems}
        color="danger"
        onClick={() => {
          openConfirm({
            title: `Delete total ${totalSelectedItems} Student Monthly Fee ?`,
            message: "Are you sure to delete ?",
            onClose: isConfirm => {
              if (isConfirm) {
                studentMonthlyFeeApi
                  .deleteList({
                    ids: Object.values(getStateSelect),
                  })
                  .then(
                    () => {
                      toast.success("Delete success");
                      onDeleted(Object.values(getStateSelect));
                    },
                    err => toast.error(err.errors[0].message),
                  );
              }
            },
          });
        }}
      >
        Delete
      </CreateButton>

      <SendMailButton
        size="sm"
        className="mr-2 btn-raised"
        disabled={!totalSelectedItems}
        onClick={() => {
          setIsOpenSendMail(true);
        }}
      />
    </>
  );
  return (
    <>
      <PageTitle
        title="Student Monthly Fee"
        actions={actions}
        colLeft={4}
        colRight={8}
      />
      {confirmModal}
      <CloneNextMonth
        ids={Object.values(getStateSelect)}
        onClose={setIsOpenCloneNextMonth}
        isOpen={isOpenCloneNextMonth}
      />
      <SendMailStudentFee
        fees={Object.values(getStateSelect)}
        onClose={setIsOpenSendMail}
        isOpen={isOpenSendMail}
      />
    </>
  );
};

Header.propTypes = {
  history: PropTypes.any.isRequired,
};

export default Header;
