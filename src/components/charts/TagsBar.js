import React from "react";
import Chart from "react-apexcharts";

export default function TagsBar({ tagsData }) {
  let data = [],
    categories = [];

  tagsData?.map((el) => data.push(el.count));
  tagsData?.map((el) => categories.push(el.tag.name));
  const series = [
    {
      data,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 355,
    },
    title: {
      text: "Popular Tags",
      align: "left",
      margin: 20,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height="375" />
    </div>
  );
}
