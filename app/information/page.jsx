"use client";

import React, { useState, useEffect } from 'react';
import Card from './components/Card'
import TemperatureGraph from './components/TemperatureGraph'
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './components/lab.module.css';
import { FiThermometer, FiDroplet, FiSun } from 'react-icons/fi';
import { FcInfo } from 'react-icons/fc';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Page() {
  const [connectionStatus, setConnectionStatus] = React.useState(false);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState({
    temperature_min: '',
    temperature_max: '',
    weather: ''
  });
  const [people, setPeople] = useState("");

  var options = {
    protocol: 'mqtt',
    clientId: 'mqttx_c563443e' 	
  };

  useEffect(() => {
    const ws = new WebSocket('wss://backend.vistalab.top/ws');
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      setConnectionStatus(true);
    };
    ws.onmessage = (event) => {
      setPeople(JSON.parse(event.data));
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus(false);
    };
    return () => {
      ws.close();
    };
  }, []);

  
  useEffect(() => {
    setTimeout(() => {
      setHumidity("50%");
      setTemperature("13");
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch('https://devapi.qweather.com/v7/weather/3d?location=101190107&key=ed1a0454398f45da875002ad02316554');
      const data = await res.json();
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
    <div key="3" data-grid={{ w: 2, h: 3, x: 6, y: 0 }}>
      <Card>
        <h3><FiSun />Weather</h3>
        <p>{`weather: ${weather.weather}`}</p>
        <p>{`Min: ${weather.temperature_min}`}℃</p>
        <p>{`Max: ${weather.temperature_max}`}℃</p>
      </Card>
    </div>
    <div key="4" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
      <Card>
      <p>{`people: ${people}`}</p>
        <p>{`people: ${people}`}</p>
      </Card>
    </div>
    <div key="5" data-grid={{ w: 2, h: 3, x: 10, y: 0 }}>
    <h3><FcInfo />本页面开发有待时日</h3>
    </div>
    </ResponsiveReactGridLayout>
    </div>
)
}
