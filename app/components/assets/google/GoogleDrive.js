import React, { useCallback, useState } from "react";
import { Button } from "reactstrap";
import { useGoogleApi } from "../../../libs/hooks/partner/useGoogleApi";
import FileBrowserView from "../FileBrowser/FileBrowserView";
import { googleMappingType } from "./constants";
import { STORAGE_PROVIDER } from "../constants";

const GoogleDrive = () => {
  const { isSignIn, isLoading, listFiles, signOut, signIn } = useGoogleApi();

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
      }).then(
        function success(response) {
          console.log("Files: ", response);
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
              url: t.webViewLink,
              provider: STORAGE_PROVIDER.GOOGLE,
            })),
          };
        },
        function error(errs) {
          throw errs.result.error;
        },
      );
    },
    [listFiles, lastSearch],
  );

  if (isLoading) {
    return null;
  }
  return (
    <div>
      {isSignIn ? (
        <>
          <FileBrowserView list={list} />
          <div className="d-flex justify-content-end p-2">
            <div className="btn-toolbar align-right">
              <Button onClick={() => signOut()} size="sm">
                <i className="fa fa-sign-out" />
                &nbsp;SignOut
              </Button>
            </div>
          </div>
        </>
      ) : (
        // eslint-disable-next-line no-unused-vars
        <div className="d-flex justify-content-center p-4">
          <Button onClick={() => signIn()}>Google SignIn</Button>
        </div>
      )}
    </div>
  );
};

GoogleDrive.propTypes = {};

export default GoogleDrive;
