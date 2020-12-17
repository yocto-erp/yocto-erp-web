import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useGoogleApi } from '../../libs/hooks/partner/useGoogleApi';

const GoogleDrive = props => {
  const {
    isSignIn,
    googleApi,
    isLoading,
    currentUser,
    listFiles,
    signOut,
    signIn,
  } = useGoogleApi();

  const [files, setFiles] = useState({
    isMore: false,
    rows: [],
  });

  useEffect(() => {
    if (isSignIn) {
      listFiles().then(t => setFiles(t));
    }
  }, [isSignIn]);

  if (isLoading) {
    return 'Loading';
  }
  return (
    <div>
      {isSignIn ? (
        <>
          Signed In
          {JSON.stringify(currentUser)}
          <div className="row">
            {files.rows.map(t => (
              <div key={t.id} className="col-3">
                {t.name}
              </div>
            ))}
          </div>
          <Button onClick={e => signOut()}>Google SignOut</Button>
        </>
      ) : (
        // eslint-disable-next-line no-unused-vars
        <Button onClick={e => signIn()}>Google SignIn</Button>
      )}
    </div>
  );
};

GoogleDrive.propTypes = {};

export default GoogleDrive;
