import React from 'react'
import Chart from "react-apexcharts";

export default function QuerySummaryPie() {
    const options =  {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
    const  series =  []
  
    return (
        <div>
             <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
        </div>
    )
}
