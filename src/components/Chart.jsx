import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  PieController,
  LineController,
  PolarAreaController,
  
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js'

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  /*
    BarController,
    ArcElement,
    LineElement,
    PointElement,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    */
   Legend,
   SubTitle,
   Tooltip,
   Title,
)

export default function chart({ usageData }) {
  const data = {
    labels: usageData.labels,
    datasets: [
      {
        label: 'Usage Stats in Minutes',
        data: usageData.labelUsage,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
        
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        // display: false,
        ticks: {
            display: true,
        },
        title: {
            display: true,
            text: 'Usage in Minutes ',
        }
      },
      x: {
        title: {
            display: true,
            text: 'Host App',
        }
      }
    },
  }

  return (
    <div className="chart-div">
      <Bar data={data} options={options} />
    </div>
  )
}
