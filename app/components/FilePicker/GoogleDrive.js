import React from 'react';
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
  if (isLoading) {
    return 'Loading';
  }
  return (
    <div>
      {isSignIn ? (
        <>
          Signed In
          {JSON.stringify(currentUser)}
          {JSON.stringify(listFiles())}
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
