import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { useApi } from "../../../libs/hooks/useApi";
import { globalSummaryApi } from "../../../libs/apis/summary/summary.api";
import { formatMoney } from "../../../libs/utils/number.util";
import Widget from "../../../components/Widget/Widget";
import Ago from "../../../components/common/date/Ago";

const GlobalChart = ({ dateFrom, dateTo }) => {
  const {
    exec,
    state: { resp },
  } = useApi(() => globalSummaryApi.get(dateFrom, dateTo));
  useEffect(() => {
    if (dateFrom && dateTo) {
      exec();
    }
  }, [dateTo, dateFrom]);

  const data = useMemo(
    () => ({
      labels: ["Receipt", "Payment"],
      datasets: [
        {
          data: [
            resp?.costSummary?.totalReceipt || 0,
            resp?.costSummary?.totalPayment || 0,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [resp],
  );
  return (
    <Widget
      className=""
      title={
        <div className="d-flex justify-content-between align-items-center">
          <h6>
            <i className="fa fa-money" /> Money Flow
          </h6>

          <small>
            <Ago date={resp?.costSummary?.lastUpdated} />
          </small>
        </div>
      }
    >
      <Pie
        data={data}
        height={250}
        options={{
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label(tooltipItem, chartData) {
                const value =
                  chartData.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ] || "";
                let label = chartData.labels[tooltipItem.index] || "";
                if (label) {
                  label += ": ";
                }
                label += formatMoney(value, "VND");
                return label;
              },
            },
          },
        }}
      />
    </Widget>
  );
};

GlobalChart.propTypes = {
  dateFrom: PropTypes.any,
  dateTo: PropTypes.any,
};

export default GlobalChart;
