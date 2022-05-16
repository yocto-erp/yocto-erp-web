import React from "react";
import PropTypes from "prop-types";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { cloudAssetUrl } from "../../../libs/apis/image.api";

const AssetPdfView = props => (
  <Document file={cloudAssetUrl(props.item)} className="d-inline-block h-100">
    <OverlayScrollbarsComponent
      className="h-100"
      options={{
        resize: "both",
        scrollbars: {
          autoHide: "scroll",
        },
        paddingAbsolute: false,
      }}
    >
      <Page pageNumber={1} />
    </OverlayScrollbarsComponent>
  </Document>
);

AssetPdfView.propTypes = {
  item: PropTypes.object.isRequired,
};

export default AssetPdfView;
