"use client";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import React, { useState, useEffect } from "react";
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
  const [currentCamera, setCurrentCamera] = useState("camera1");

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

  const handleCameraChange = (camera) => {
    setCurrentCamera(camera);
  };

  const getCameraStreamSrc = () => {
    if (currentCamera === "camera1") {
      return process.env.BACKEND_URL + "cam/?action=stream";
    } else if (currentCamera === "camera2") {
      return process.env.BACKEND_URL + "cam2/?action=stream";
    }
    // Add more camera options if needed
  };

  return (
    <div className={style.container}>
      <ResponsiveReactGridLayout
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        isDraggable={true}
        isResizable={true}
      >
        <div key="1" data-grid={{ w: 2, h: 3, x: 3, y: 0 }}>
          <Card>
            <h1>
              <FiThermometer />
              温度
            </h1>
            <p>{temperature}</p>
          </Card>
        </div>

        <div key="2" data-grid={{ w: 2, h: 3, x: 5, y: 0 }}>
          <Card>
            <h1>
              <FiDroplet />
              湿度
            </h1>
            <p>{humidity}</p>
          </Card>
        </div>

        <div key="3" data-grid={{ w: 2, h: 3, x: 7, y: 0 }}>
          <Card>
            <h1>
              <RiBaseStationLine />
              在线人数
            </h1>
            <p>{`Count: ${people}`}</p>
          </Card>
        </div>

        <div key="4" data-grid={{ w: 6, h: 12, x: 3, y: 3 }}>
          <Card>
          <div>
        <label htmlFor="cameraSelect">选择摄像头：</label>
        <select
          id="cameraSelect"
          value={currentCamera}
          onChange={(e) => handleCameraChange(e.target.value)}
        >
          <option value="camera1">摄像头1</option>
          <option value="camera2">摄像头2</option>
        </select>
      </div>
            <h1>
              {currentCamera === "camera1" ? "VISTA-CAM-1" : "VISTA-CAM-2"}
            </h1>
            <img
              src={getCameraStreamSrc()}
              alt="电源已关闭或摄像头损坏，请联系管理员jerrygu.gjw@gmail.com"
              className="wshexianw-full rounded-md aspect-video object-cover object-center"
            />
          </Card>
        </div>
      </ResponsiveReactGridLayout>

      
    </div>
  );
}