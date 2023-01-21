"use client";

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Temperature (°C)'
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Date'
      }
    }]
  }
};

export default function TemperatureGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://devapi.qweather.com/v7/weather/3d?location=101190107&key=ed1a0454398f45da875002ad02316554');
      const json = await res.json();
      console.log(json)
      const labels = json.daily.map(day => day.fxDate);
      const temperatureMin = json.daily.map(day => day.tempMin);
      const temperatureMax = json.daily.map(day => day.tempMax);
      setData({
        labels,
        datasets: [
          {
            label: 'Minimum Temperature',
            data: temperatureMin,
            borderColor: '#3e95cd',
            fill: false
          },
          {
            label: 'Maximum Temperature',
            data: temperatureMax,
            borderColor: '#8e5ea2',
            fill: false
          }
        ]
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Temperature Forecast</h2>
      <Line data={data} options={options} />
    </div>
  );
}
