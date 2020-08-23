import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import isFunction from 'lodash/isFunction';
import { useAsync } from '../../libs/hooks/useAsync';
import ModalOKButton from '../button/ModalOKButton';
import ModalCancelButton from '../button/ModalCancelButton';
import { useListRefreshContext } from '../ListWidget/constants';

const DeleteConfirmModal = ({
  id,
  deleteApi,
  readApi,
  message,
  title,
  onClose,
}) => {
  const [isLoading, exec] = useAsync({ asyncApi: deleteApi });
  const [item, setItem] = useState(null);

  const refresh = useListRefreshContext();

  const onCloseHandle = useCallback(
    result => {
      refresh();
      setItem(null);
      if (isFunction(onClose)) {
        onClose(result);
      }
    },
    [onClose, refresh],
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
    exec(item.id).then(() => {
      onCloseHandle(item);
    });
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
};

export default DeleteConfirmModal;
