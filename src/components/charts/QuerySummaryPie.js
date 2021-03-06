import React from "react";
import Chart from "react-apexcharts";

export default function QuerySummaryPie({querySummaryData}) {
  let series = [], labels = [];
  querySummaryData?.map(el => series.push(el.count))
  querySummaryData?.map(el => labels.push(el.type))
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    title: {
      text: "Query Summary",
      align: "left",
      margin: 20,
    },
    labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} series={series} type="pie" width="500" />
    </div>
  );
}
