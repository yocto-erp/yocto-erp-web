import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import FileBrowserView, { ROOT_FOLDER } from "../FileBrowser/FileBrowserView";
import { assetApi } from "../../../libs/apis/image.api";
import { hasText } from "../../../utils/util";

// eslint-disable-next-line no-unused-vars
const LocalDrive = ({ className, multiple, onPicked }) => {
  const [page, setPage] = useState(1);
  const list = useCallback(
    (searchObj, isNext) => {
      console.log(searchObj, isNext);
      const newPage = isNext ? page + 1 : 1;
      setPage(newPage);
      let parentId = "";
      if (!hasText(searchObj.search) && searchObj.assetId !== ROOT_FOLDER) {
        parentId = searchObj.assetId;
      }
      return assetApi
        .search({
          page: newPage,
          size: searchObj.size,
          filter: {
            search: searchObj.search,
            parentId,
          },
        })
        .then(t => ({
          rows: t.rows,
          isMore: t.rows.length === searchObj.size,
        }));
    },
    [page],
  );

  return (
    <FileBrowserView list={list} onAssetSelect={onPicked} isMulti={multiple} />
  );
};

LocalDrive.propTypes = {
  onPicked: PropTypes.func,
  className: PropTypes.string,
  multiple: PropTypes.bool,
};

export default LocalDrive;
