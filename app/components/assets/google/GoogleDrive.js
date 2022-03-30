import React, { useCallback, useState } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { useGoogleApi } from "../../../libs/hooks/partner/useGoogleApi";
import FileBrowserView from "../FileBrowser/FileBrowserView";
import { GOOGLE_MIME_TYPE, googleMappingType } from "./constants";
import { ASSET_TYPE, STORAGE_PROVIDER } from "../constants";
import noImage from "../../../images/No_image_available.svg";

// eslint-disable-next-line no-unused-vars
const GoogleDrive = ({ className, multiple, onPicked }) => {
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
              type:
                t.mimeType === GOOGLE_MIME_TYPE.FOLDER
                  ? ASSET_TYPE.FOLDER
                  : ASSET_TYPE.FILE,
              lastModifiedDate: t.modifiedTime,
              thumbnail: t.thumbnailLink || noImage,
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
          <FileBrowserView
            list={list}
            onAssetSelect={onPicked}
            isMulti={multiple}
          />
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

GoogleDrive.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
};

export default GoogleDrive;
