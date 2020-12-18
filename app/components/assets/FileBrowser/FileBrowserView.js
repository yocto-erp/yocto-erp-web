import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import { useApi } from '../../../libs/hooks/useApi';
import './FileBrowser.scss';
import TextIconButton from '../../button/TextIconButton';
import AssetItem from './AssetItem';
import { MIME_TYPE } from '../constants';
import IconButton from '../../button/IconButton';

export const ROOT_FOLDER = 'root';

const FileBrowserView = ({ list, drive = 'My Drive' }) => {
  const driverRoot = { id: ROOT_FOLDER, name: drive };
  const searchBreadCrumb = [driverRoot, { id: 'search', name: 'search' }];
  const [assets, setAssets] = useState({
    isMore: false,
    rows: [],
  });
  const [searchInput, setSearchInput] = useState('');

  const [selectAssets, setSelectAssets] = useState({});

  const [breadcrumbs, setBreadCrumbs] = useState([driverRoot]);

  const [searchObject, setSearchObject] = useState({
    search: '',
    size: 10,
    assetId: ROOT_FOLDER,
  });

  const {
    exec,
    state: { isLoading },
  } = useApi((item, isNext) => list(item, isNext));

  const search = useCallback(
    debounce((isMore = false) => {
      exec(searchObject, isMore).then(t => {
        if (isMore) {
          setAssets(oldAssets => ({
            isMore: t.isMore,
            rows: [...oldAssets.rows, ...t.rows],
          }));
        } else {
          setAssets(t);
        }
      });
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

  const onDoubleClick = useCallback(
    (e, item) => {
      setBreadCrumbs([...breadcrumbs, item]);
      setSearchObject(prev => ({ ...prev, search: '', assetId: item.id }));
    },
    [assets, search],
  );

  const views = useMemo(() => {
    const folders = [];
    const files = [];
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
    return {
      folders,
      files,
    };
  }, [assets, selectAssets]);

  const breadCrumbView = useMemo(
    () => (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map(t => (
            <li
              key={t.id}
              className={classnames('breadcrumb-item', {
                active: t.id === searchObject.assetId,
              })}
              aria-current="page"
            >
              {t.name}
            </li>
          ))}
        </ol>
      </nav>
    ),
    [breadcrumbs, searchObject],
  );

  useEffect(() => {
    if (searchInput.length) {
      setSearchObject(prev => ({ ...prev, assetId: '', search: searchInput }));
      setBreadCrumbs(searchBreadCrumb);
    } else {
      setSearchObject(prev => ({
        ...prev,
        assetId: ROOT_FOLDER,
        search: searchInput,
      }));
      setBreadCrumbs([driverRoot]);
    }
  }, [searchInput]);

  useEffect(() => {
    search();
  }, [searchObject]);

  return (
    <div className="asset-browser-wrapper">
      <div className="asset-browser-header">
        <div
          className="btn-toolbar mb-3"
          role="toolbar"
          aria-label="File actions"
        >
          <div className="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" className="btn btn-secondary">
              1
            </button>
            <button type="button" className="btn btn-secondary">
              2
            </button>
            <button type="button" className="btn btn-secondary">
              3
            </button>
            <button type="button" className="btn btn-secondary">
              4
            </button>
          </div>
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
                onClick={() => search(false)}
              >
                <i className="fa fa-search fa-fw" />{' '}
              </IconButton>
            </div>
          </div>
        </div>
        {breadCrumbView}
      </div>
      <div className="asset-browser-body">
        {views.folders.length ? (
          <>
            <p>Folders</p>
            <div className="row no-gutters align-items-center">
              {views.folders}
            </div>
          </>
        ) : null}
        {views.files.length ? (
          <>
            <p className="mt-4">Files</p>
            <div className="row no-gutters align-items-center">
              {views.files}
            </div>
          </>
        ) : null}

        {assets.isMore ? (
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
