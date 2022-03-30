import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import debounce from "lodash/debounce";
import { API_STATE, useApi } from "../../../libs/hooks/useApi";
import "./FileBrowser.scss";
import TextIconButton from "../../button/TextIconButton";
import AssetItem from "./AssetItem";
import { MIME_TYPE, STORAGE_PROVIDER } from "../constants";
import IconButton from "../../button/IconButton";
import LoadingIndicator from "../../LoadingIndicator";

export const ROOT_FOLDER = "root";
const SEARCH_FOLDER = "search";

const FileBrowserView = ({ list, drive = "My Drive" }) => {
  const driverRoot = { id: ROOT_FOLDER, name: drive };
  const [assets, setAssets] = useState({
    isMore: false,
    rows: [],
  });
  const [searchInput, setSearchInput] = useState("");

  const [selectAssets, setSelectAssets] = useState({});

  const [breadcrumbs, setBreadCrumbs] = useState([driverRoot]);

  const [searchObject, setSearchObject] = useState({
    search: "",
    size: 10,
    assetId: ROOT_FOLDER,
    key: ROOT_FOLDER,
  });

  const {
    exec,
    state: { isLoading, status },
  } = useApi((item, isNext) => list(item, isNext));

  const search = useCallback(
    debounce((isMore = false) => {
      exec(searchObject, isMore).then(
        t => {
          if (isMore) {
            setAssets(oldAssets => ({
              isMore: t.isMore,
              rows: [...oldAssets.rows, ...t.rows],
            }));
          } else {
            setAssets(t);
          }
        },
        err => {
          console.log(err);
        },
      );
    }, 300),
    [exec, searchObject],
  );

  const onAssetSelected = useCallback(
    (e, index) => {
      let rs = selectAssets[`item${index}`];
      if (!rs) {
        rs = index + 1;
      } else if (e.metaKey) {
        rs = 0;
      }
      if (e.metaKey) {
        setSelectAssets({ ...selectAssets, [`item${index}`]: rs });
      } else {
        setSelectAssets({ [`item${index}`]: rs });
      }
    },
    [selectAssets],
  );

  const onDoubleClick = useCallback((e, item) => {
    if (item.mimeType === MIME_TYPE.FOLDER) {
      setBreadCrumbs(prev => [...prev, item]);
      setSearchObject(prev => ({
        size: prev.size,
        search: "",
        assetId: item.id,
        key: item.id,
      }));
      setSelectAssets({});
    } else if (item.provider === STORAGE_PROVIDER.GOOGLE) {
      window.open(item.url, "_blank");
    }
  }, []);

  const onBreadCrumbClick = useCallback(
    index => {
      const item = breadcrumbs[index];
      breadcrumbs.splice(index + 1, breadcrumbs.length - index);
      if (item.id === SEARCH_FOLDER) {
        setSearchObject(prev => ({
          size: prev.size,
          search: item.name,
          assetId: "",
          key: item.id,
        }));
      } else {
        setSearchObject(prev => ({
          size: prev.size,
          search: "",
          assetId: item.id,
          key: item.id,
        }));
      }
      setBreadCrumbs([...breadcrumbs]);
      setSelectAssets({});
    },
    [breadcrumbs],
  );

  const views = useMemo(() => {
    const folders = [];
    const files = [];
    if (assets && assets.rows && assets.rows.length) {
      for (let i = 0; i < assets.rows.length; i += 1) {
        const t = assets.rows[i];
        const itemView = (
          <div className="col-md-3 col-xl-2 col-sm-4" key={t.id}>
            <AssetItem
              id={t.id}
              index={i}
              lastModifiedDate={t.lastModifiedDate}
              mimeType={t.mimeType}
              name={t.name}
              size={t.size}
              className={classnames({ active: selectAssets[`item${i}`] })}
              thumbnail={t.thumbnail}
              onClick={e => onAssetSelected(e, i)}
              onDoubleClick={e => onDoubleClick(e, t)}
            />
          </div>
        );
        if (t.mimeType === MIME_TYPE.FOLDER) {
          folders.push(itemView);
        } else {
          files.push(itemView);
        }
      }
    }

    return {
      folders,
      files,
    };
  }, [assets, selectAssets]);

  const breadCrumbView = useMemo(
    () => (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map((t, i) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              key={t.id}
              data-index={i}
              className={classnames("breadcrumb-item", {
                active: t.id === searchObject.key,
              })}
              aria-current="page"
              onClick={
                t.id !== searchObject.key ? () => onBreadCrumbClick(i) : null
              }
            >
              {t.id !== SEARCH_FOLDER ? t.name : `Search (${t.name})`}
            </li>
          ))}
        </ol>
      </nav>
    ),
    [breadcrumbs, searchObject, onBreadCrumbClick],
  );

  const onSearchClick = useCallback(() => {
    if (searchInput.length) {
      setSearchObject(prev => ({
        size: prev.size,
        assetId: "",
        search: searchInput,
        key: SEARCH_FOLDER,
      }));
      setBreadCrumbs([driverRoot, { id: SEARCH_FOLDER, name: searchInput }]);
    } else {
      setSearchObject(prev => ({
        size: prev.size,
        assetId: ROOT_FOLDER,
        search: searchInput,
        key: ROOT_FOLDER,
      }));
      setBreadCrumbs([driverRoot]);
    }
  }, [searchInput]);

  useEffect(() => {
    search();
  }, [searchObject]);

  const notFoundHtml = useMemo(() => {
    if (status === API_STATE.SUCCESS || status === API_STATE.FAIL) {
      if (!views.files.length && !views.folders.length) {
        return <p className="text-danger h5">Not found any file or folder</p>;
      }
    }
    return null;
  }, [status, views]);

  return (
    <div className="asset-browser-wrapper">
      <div className="asset-browser-header">
        <div
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="File actions"
        >
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search by name"
              aria-describedby="btnGroupAddon"
              onChange={e => {
                setSearchInput(e.target.value);
              }}
              value={searchInput}
            />
            <div className="input-group-append">
              <IconButton
                isLoading={isLoading}
                className="ml-0"
                type="button"
                color="primary"
                onClick={onSearchClick}
              >
                <i className="fa fa-search fa-fw" />{" "}
              </IconButton>
            </div>
          </div>
        </div>
        {breadCrumbView}
      </div>
      <div className="asset-browser-body">
        {status === API_STATE.LOADING ? <LoadingIndicator /> : null}
        {notFoundHtml}

        <>
          {views.folders.length ? (
            <>
              <p className="heading">Folders</p>
              <div className="row no-gutters align-items-center">
                {views.folders}
              </div>
            </>
          ) : null}
          {views.files.length ? (
            <>
              <p className="mt-4 heading">Files</p>
              <div className="row no-gutters align-items-center">
                {views.files}
              </div>
            </>
          ) : null}
        </>
        {assets?.isMore ? (
          <div className="text-center mt-4">
            <TextIconButton
              isLoading={isLoading}
              onClick={() => {
                search(true);
              }}
            >
              Load More
            </TextIconButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

FileBrowserView.propTypes = {
  list: PropTypes.func.isRequired,
  drive: PropTypes.string,
};

export default FileBrowserView;
