import React from "react";
import Chart from "react-apexcharts";

export default function SentimentDonut({ sentimentData }) {
  let series = [],
    labels = [];

  sentimentData?.map((el) => series.push(el.count));
  sentimentData?.map((el) => labels.push(el.sentiment));

  const options = {
    labels,
    chart: {
      type: "donut",
    },
    title: {
      text: "Sentiment",
      align: "left",
      margin: 20,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
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
      <Chart options={options} series={series} type="donut" width="500" />
    </div>
  );
}
