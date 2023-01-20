"use client";

import React, { useState, useEffect } from 'react';
import Card from './components/Card'
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './components/lab.module.css';
import { FiThermometer, FiDroplet, FiSun, FiUsers } from 'react-icons/fi';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Lab() {
  // 初始化状态
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState({
    temperature_min: '',
    temperature_max: '',
    weather: ''
  });
  const [people, setPeople] = useState("");

  // 模拟数据
  useEffect(() => {
    // 模拟请求数据的过程
    setTimeout(() => {
      setTemperature("23℃");
      setHumidity("50%");
      setPeople("15人");
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch('https://devapi.qweather.com/v7/weather/3d?location=101190107&key=ed1a0454398f45da875002ad02316554');
      const data = await res.json();
      console.log(data)
      setWeather({
        temperature_min: data.daily[0].tempMin,
        temperature_max: data.daily[0].tempMax,
        weather: data.daily[0].textDay,
      });
    }
    fetchWeather();
  }, []);

  return (
    <div className={styles.container}>
    <ResponsiveReactGridLayout
    className="layout"
    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
    rowHeight={30}
    isDraggable={true}
    isResizable={true}
  >
    <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
      <Card>
        <h3><FiThermometer />Temperature</h3>
        <p>{temperature}</p>
      </Card>
    </div>
    <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
      <Card>
        <h3><FiDroplet />Humidity</h3>
        <p>{humidity}</p>
      </Card>
    </div>
    <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
      <Card>
        <h3><FiSun />Weather</h3>
        <p>{`weather: ${weather.weather}`}</p>
        <p>{`Min: ${weather.temperature_min}`}℃</p>
        <p>{`Max: ${weather.temperature_max}`}℃</p>
      </Card>
    </div>
    </ResponsiveReactGridLayout>
    </div>
)
}
