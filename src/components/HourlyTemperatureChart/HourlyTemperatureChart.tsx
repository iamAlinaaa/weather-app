import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartArea,
} from "chart.js";
import { HourlyTemperatureChartProps } from "../../interfaces/weatherInterfaces";
import "./styles.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HourlyTemperatureChart: React.FC<HourlyTemperatureChartProps> = ({
  labels,
  hourlyData,
}) => {
  // Gradient
  const gradient = (ctx: CanvasRenderingContext2D, chartArea: ChartArea) => {
    if (!chartArea) return "rgba(75,192,192,0.2)";
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0, "rgba(75,192,192,0.2)");
    gradient.addColorStop(1, "rgba(75,192,192,1)");
    return gradient;
  };

  return (
    <div className="chart-container">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: hourlyData,
              fill: true,
              backgroundColor: (context) =>
                gradient(context.chart.ctx, context.chart.chartArea),
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
              pointBorderColor: "#fff",
              pointHoverRadius: 7,
              pointRadius: 5,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                font: {
                  size: 14,
                  family: "Arial, sans-serif",
                },
                color: "#4a4a4a",
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
                font: {
                  size: 16,
                  weight: "bold",
                },
                color: "#4a4a4a",
              },
              ticks: {
                color: "#4a4a4a",
              },
            },
            y: {
              title: {
                display: true,
                text: "Temperature (°C)",
                font: {
                  size: 16,
                  weight: "bold",
                },
                color: "#4a4a4a",
              },
              ticks: {
                color: "#4a4a4a",
              },
              grid: {
                color: "rgba(200, 200, 200, 0.2)",
              },
            },
          },
        }}
        height={300}
        width={600}
      />
    </div>
  );
};

export default HourlyTemperatureChart;
