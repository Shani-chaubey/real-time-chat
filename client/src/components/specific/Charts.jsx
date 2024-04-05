import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { getLast7Days } from "../../lib/features";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        borderColor: "rgba(75,12,192,1)",
        backgroundColor: "rgba(75,12,192,0.1)",
        fill: false,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    // cutout:120 for thickness 
  };


const DoughnutChart = ({value=[], labels=[] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        borderColor: ["rgba(75,12,192,1)", "rgba(75,192,192,1)"],
        hoverBackgroundColor: ["rgba(75,12,192,1)", "rgba(75,192,192,1)"],
        backgroundColor: ["rgba(75,12,192,0.4)", "rgba(75,192,192,0.4)"],
        offset: 2 /* for gapping between two's */
      },
    ],
  };
  return <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutChartOptions} />;
};

export { LineChart, DoughnutChart };
