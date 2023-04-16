"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useState, useEffect } from "react";
import { RiBaseStationLine } from "react-icons/ri";
import { FiThermometer, FiDroplet } from "react-icons/fi";
import { Responsive, WidthProvider } from "react-grid-layout";

import Card from "./components/Card";
import style from "./components/Card.module.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function Client() {
  const [people, setPeople] = useState("");
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://backend.vistalab.top/ws");

    ws.onopen = () => console.log("WebSocket connection opened");
    ws.onmessage = (event) => setPeople(JSON.parse(event.data));
    ws.onclose = () => console.log("WebSocket connection closed");

    return () => ws.close();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHumidity("50%");
      setTemperature("13");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={style.container}>
      <ResponsiveReactGridLayout
        className='layout'
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        isDraggable={true}
        isResizable={true}
      >
        <div key='1' data-grid={{ w: 2, h: 3, x: 3, y: 0 }}>
          <Card>
            <h1>
              <FiThermometer />
              Temperature
            </h1>
            <p>{temperature}</p>
          </Card>
        </div>

        <div key='2' data-grid={{ w: 2, h: 3, x: 5, y: 0 }}>
          <Card>
            <h1>
              <FiDroplet />
              Humidity
            </h1>
            <p>{humidity}</p>
          </Card>
        </div>

        <div key='3' data-grid={{ w: 2, h: 3, x: 7, y: 0 }}>
          <Card>
            <h1>
              <RiBaseStationLine />
              在线人数
            </h1>
            <p>{`Count: ${people}`}</p>
          </Card>
        </div>

        <div key='4' data-grid={{ w: 6, h: 12, x: 3, y: 3 }}>
          <Card>
            <h1>VISTA-CAM-1</h1>
            <img
              src={process.env.BACKEND_URL + "cam/?action=stream"}
              alt='stream video'
              className='w-full rounded-md aspect-video object-cover object-center'
            />
          </Card>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );
}
