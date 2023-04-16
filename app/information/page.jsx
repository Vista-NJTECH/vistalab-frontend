"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useState, useEffect } from "react";
import { RiBaseStationLine } from "react-icons/ri";
import { Responsive, WidthProvider } from "react-grid-layout";
import { FiThermometer, FiDroplet, FiSun } from "react-icons/fi";

import Card from "./components/Card";
import styles from "./components/lab.module.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Page() {
  const [people, setPeople] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState({
    temperature_min: "",
    temperature_max: "",
    weather: "",
  });

  const videoUrl = "https://backend.vistalab.top/cam/?action=stream";

  useEffect(() => {
    const ws = new WebSocket("wss://backend.vistalab.top/ws");
    ws.onopen = () => {
      console.log("WebSocket connection opened");
      setConnectionStatus(true);
    };
    ws.onmessage = (event) => {
      setPeople(JSON.parse(event.data));
    };
    ws.onclose = () => {
      console.log("WebSocket connection closed");
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
      const res = await fetch(
        "https://devapi.qweather.com/v7/weather/3d?location=101190107&key=ed1a0454398f45da875002ad02316554"
      );
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
        className='layout'
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        isDraggable={true}
        isResizable={true}
      >
        <div key='1' data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
          <Card>
            <h1>
              <FiThermometer />
              Temperature
            </h1>
            <p>{temperature}</p>
          </Card>
        </div>

        <div key='2' data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
          <Card>
            <h1>
              <FiDroplet />
              Humidity
            </h1>
            <p>{humidity}</p>
          </Card>
        </div>

        <div key='3' data-grid={{ w: 2, h: 3, x: 6, y: 0 }}>
          <Card>
            <h1>
              <FiSun />
              Weather
            </h1>
            <p>{`weather: ${weather.weather}`}</p>
            <p>{`Min: ${weather.temperature_min}`}℃</p>
            <p>{`Max: ${weather.temperature_max}`}℃</p>
          </Card>
        </div>

        <div key='4' data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
          <Card>
            <h1>
              <RiBaseStationLine />
              在线人数
            </h1>
            <p>{`Count: ${people}`}</p>
          </Card>
        </div>

        <div key='6' data-grid={{ w: 6, h: 8, x: 0, y: 3 }}>
          <Card>
            <h1>VISTA-CAM-1</h1>
            <img src={videoUrl} alt='stream video' />
          </Card>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
}
