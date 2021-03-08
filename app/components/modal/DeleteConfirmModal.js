import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import isFunction from 'lodash/isFunction';
import { toast } from 'react-toastify';
import { useAsync } from '../../libs/hooks/useAsync';
import ModalOKButton from '../button/ModalOKButton';
import ModalCancelButton from '../button/ModalCancelButton';
import { useListActionContext } from '../ListWidget/constants';

const DeleteConfirmModal = ({
  id,
  deleteApi,
  readApi,
  message,
  title,
  onClose,
  isReload = true,
}) => {
  const [isLoading, exec] = useAsync({ asyncApi: deleteApi });
  const [item, setItem] = useState(null);

  const { onDeleted, refresh } = useListActionContext();

  const onCloseHandle = useCallback(
    result => {
      if (isReload) {
        if (result && result.id) {
          onDeleted([result.id]);
        } else {
          refresh();
        }
      }

      setItem(null);
      if (isFunction(onClose)) {
        onClose(result);
      }
    },
    [onClose, onDeleted, refresh],
  );

  useEffect(() => {
    console.log(`UseEffect: ${JSON.stringify(id)}`);
    if (id) {
      readApi(id).then(resp => {
        setItem(resp);
      });
    }
  }, [id]);

  const onDelete = () => {
    exec(item.id).then(
      () => {
        onCloseHandle(item);
      },
      onerror => {
        toast.error(onerror.errors[0].message);
      },
    );
  };

  return (
    <Modal className="danger" isOpen={id != null && item != null} fade={false}>
      <ModalHeader toggle={() => onCloseHandle(false)}>
        {title || 'Confirmation ?'}
      </ModalHeader>
      <ModalBody>{isFunction(message) ? message(item) : message}</ModalBody>
      <ModalFooter>
        <ModalCancelButton onClick={() => onCloseHandle(false)} />
        <ModalOKButton color="danger" isLoading={isLoading} onClick={onDelete}>
          <i className="fi flaticon-trash mr-2" /> Delete
        </ModalOKButton>
      </ModalFooter>
    </Modal>
  );
};

DeleteConfirmModal.propTypes = {
  id: PropTypes.string.isRequired,
  deleteApi: PropTypes.func.isRequired,
  readApi: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  title: PropTypes.node,
  onClose: PropTypes.func,
  isReload: PropTypes.bool,
};

export default DeleteConfirmModal;
