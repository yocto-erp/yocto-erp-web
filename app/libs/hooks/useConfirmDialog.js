import React, { useCallback, useState } from 'react';
import ConfirmModal from '../../components/modal/ConfirmModal';

export const useConfirmDialog = () => {
  const [confirm, setConfirm] = useState(null);
  const onCloseHandle = React.useCallback(
    isConfirm => {
      setConfirm(null);
      confirm.onClose(isConfirm);
    },
    [confirm],
  );

  const openConfirm = useCallback(({ title, message, onClose }) => {
    setConfirm({ title, message, onClose });
  }, []);

  const modal = React.useMemo(
    () => (
      <ConfirmModal
        isOpen={confirm != null}
        title={confirm?.title}
        message={confirm?.message}
        onClose={onCloseHandle}
      />
    ),
    [confirm],
  );

  return { confirmModal: modal, openConfirm };
};

useConfirmDialog.propTypes = {};
