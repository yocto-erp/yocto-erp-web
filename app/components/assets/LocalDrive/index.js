import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import FileBrowserView from "../FileBrowser/FileBrowserView";
import { assetApi, thumbnail } from "../../../libs/apis/image.api";
import { hasText } from "../../../utils/util";
import { ROOT_FOLDER } from "../constants";

// eslint-disable-next-line no-unused-vars
const LocalDrive = ({ className, multiple, onPicked, fileTypes = ["*"] }) => {
  const [page, setPage] = useState(1);
  const list = useCallback(
    (searchObj, isNext, isReload = false) => {
      let newPage = 1;
      let { size } = searchObj;
      if (!isReload) {
        newPage = isNext ? page + 1 : 1;
        setPage(newPage);
      } else {
        size = page * searchObj.size;
      }

      let parentId = "";
      if (!hasText(searchObj.search) && searchObj.assetId !== ROOT_FOLDER) {
        parentId = searchObj.assetId;
      }
      return assetApi
        .search({
          page: newPage,
          size,
          filter: {
            search: searchObj.search,
            parentId,
          },
        })
        .then(t => ({
          rows: t.rows.map(item => ({
            ...item,
            thumbnail: thumbnail(item.fileId),
            lastModifiedDate: item.createdDate,
          })),
          isMore: t.rows.length === size,
        }));
    },
    [page],
  );

  return (
    <FileBrowserView
      list={list}
      onAssetSelect={onPicked}
      isMulti={multiple}
      fileTypes={fileTypes}
      className={className}
    />
  );
};

LocalDrive.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
  fileTypes: PropTypes.array,
};

export default LocalDrive;
