import React, { useCallback, useState } from 'react';
import { Button } from 'reactstrap';
import { useGoogleApi } from '../../../libs/hooks/partner/useGoogleApi';
import FileBrowserView from '../FileBrowser/FileBrowserView';
import { googleMappingType } from './constants';

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

  const [lastSearch, setLastSearch] = useState({});

  const list = useCallback(
    (searchObj, isNext) => {
      console.log(searchObj, isNext);
      const { assetId, search, mimeType, size, nextPageToken } = !isNext
        ? searchObj
        : lastSearch;
      return listFiles({
        id: assetId,
        pageToken: nextPageToken,
        mimeType,
        pageSize: size,
        search,
      }).then(function success(response) {
        console.log('Files: ', response);
        console.log(response.result.files);
        setLastSearch({
          assetId,
          search,
          mimeType,
          size,
          nextPageToken: response.result.nextPageToken,
        });
        return {
          isMore: !!response.result.nextPageToken,
          rows: response.result.files.map(t => ({
            id: t.id,
            name: t.name,
            mimeType: googleMappingType(t.mimeType),
            lastModifiedDate: t.modifiedTime,
            thumbnail: t.thumbnailLink,
          })),
        };
      });
    },
    [listFiles, lastSearch],
  );

  if (isLoading) {
    return 'Loading';
  }
  return (
    <div>
      {isSignIn ? (
        <>
          <FileBrowserView list={list} />
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
