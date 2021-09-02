import React from "react";
import Chart from "react-apexcharts";

const formatData = (data) => {
  if (!data.length) {
    return {
      firstMonthName: "",
      lastMonthName: "",
      firstmonth: [],
      lastMonth: [],
    };
  }
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstmonth = [],
    lastMonth = [];
  let small, big;

  for (let i = 0; i < data.length; i++) {
    const first = data[0].created.split("-");
    const current = data[i].created.split("-");

    if (first[1] * 1 === current[1] * 1) {
      small = `${first[1]}-${first[2]}`;
      firstmonth.push(data[i].count);
    } else {
      big = `${current[1]}-${current[2]}`;
      lastMonth.push(data[i].count);
    }
  }

  if (!lastMonth.length) {
    return {
      firstMonthName: months[+small[0] - 1],
      lastMonthName: "",
      firstmonth,
      lastMonth: [],
    };
  }

  small = small.split("-");
  big = big.split("-");

  if (+small[0] > +big[0] && +small[1] === +big[1]) {
    return {
      firstMonthName: months[+big[0] - 1],
      lastMonthName: months[+small[0] - 1],
      firstmonth: lastMonth,
      lastMonth: firstmonth,
    };
  } else if (+small[0] < +big[0] && +small[1] === +big[1]) {
    return {
      firstMonthName: months[+small[0] - 1],
      lastMonthName: months[+big[0] - 1],
      firstmonth,
      lastMonth,
    };
  } else if (+small[0] > +big[0] && +small[1] < +big[1]) {
    return {
      firstMonthName: months[+small[0] - 1],
      lastMonthName: months[+big[0] - 1],
      firstmonth,
      lastMonth,
    };
  } else if (+small[0] < +big[0] && +small[1] > +big[1]) {
    return {
      firstMonthName: months[+big[0] - 1],
      lastMonthName: months[+small[0] - 1],
      firstmonth: lastMonth,
      lastMonth: firstmonth,
    };
  } else if (+small[0] > +big[0] && +small[1] > +big[1]) {
    return {
      firstMonthName: months[+big[0] - 1],
      lastMonthName: months[+small[0] - 1],
      firstmonth: lastMonth,
      lastMonth: firstmonth,
    };
  } else if (+small[0] === +big[0] && +small[1] < +big[1]) {
    return {
      firstMonthName: months[+small[0] - 1],
      lastMonthName: months[+big[0] - 1],
      firstmonth,
      lastMonth,
    };
  } else if (+small[0] === +big[0] && +small[1] > +big[1]) {
    return {
      firstMonthName: months[+big[0] - 1],
      lastMonthName: months[+small[0] - 1],
      firstmonth: lastMonth,
      lastMonth: firstmonth,
    };
  } else {
    return {
      firstMonthName: months[+small[0] - 1],
      lastMonthName: months[+big[0] - 1],
      firstmonth,
      lastMonth,
    };
  }
};

export default function MonthlyTrendLine({ monthlyTrendData }) {
  console.log(monthlyTrendData);
  const { firstMonthName, lastMonthName, firstmonth, lastMonth } = formatData(monthlyTrendData);
  console.log(firstmonth);
  console.log(lastMonth);
  const series = [
    {
      name: firstMonthName,
      data: firstmonth,
    },
    {
      name: lastMonthName,
      data: lastMonth,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
      margin: 20,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height="375" />
    </div>
  );
}
