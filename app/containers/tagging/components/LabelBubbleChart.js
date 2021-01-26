import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import chroma from 'chroma-js';
import { useApi } from '../../../libs/hooks/useApi';
import taggingApi from '../../../libs/apis/tagging.api';
import Widget from '../../../components/Widget/Widget';
import { DEFAULT_TEXT_COLOR } from '../../../components/constants';

am4core.useTheme(am4themesAnimated);

const LabelBubbleChart = props => {
  const {
    exec,
    state: { isLoading, errors, resp },
  } = useApi(() =>
    taggingApi
      .search({ page: 1, size: 10, sorts: { total: 'DESC' } })
      .then(t => t.rows.filter(item => item.total > 0)),
  );

  const chartEls = React.useRef(null);

  React.useLayoutEffect(() => {
    const chart = am4core.create('chartdiv', am4charts.TreeMap);

    /* Define data fields */
    chart.dataFields.value = 'value';
    chart.dataFields.name = 'name';
    chart.dataFields.color = 'color';

    /* Configure top-level series */
    const level1 = chart.seriesTemplates.create('0');
    const level1Column = level1.columns.template;
    level1Column.stroke = am4core.color('rgba(0,0,0,0)');

    /* Add bullet labels */
    const level1Bullet = level1.bullets.push(new am4charts.LabelBullet());
    level1Bullet.locationY = 0.5;
    level1Bullet.locationX = 0.5;
    level1Bullet.label.text = '{name}';
    level1Bullet.label.adapter.add('fill', (value, target) => {
      const { dataItem } = target;
      if (dataItem) {
        const {
          treeMapDataItem: { color },
        } = dataItem;
        const chromaColor = chroma(color);
        return am4core.color(
          chroma.contrast(chromaColor, 'white') > 2 ? '#ffffff' : '#000000',
        );
      }

      return am4core.color('#fff');
    });

    chartEls.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    console.log(resp);
    if (resp && resp.length && chartEls.current) {
      chartEls.current.data = resp.map(t => ({
        name: t.label,
        value: t.total,
        color: t.color || DEFAULT_TEXT_COLOR,
      }));
    }
  }, [resp, chartEls.current]);

  useEffect(() => {
    exec();
  }, []);

  return (
    <Widget
      className=""
      bodyClass="d-flex justify-content-center"
      title={
        <div className="d-flex justify-content-between align-items-center">
          <h6>
            <i className="fa fa-tags" /> Label
          </h6>

          <small />
        </div>
      }
    >
      <div id="chartdiv" style={{ width: '100%', height: '250px' }} />
    </Widget>
  );
};

LabelBubbleChart.propTypes = {};

export default LabelBubbleChart;
