"use client";
import { useState, useEffect } from 'react';
import styles from './lab.module.css'

export default async function Page() {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [weather, setWeather] = useState("");
  const [people, setPeople] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTemperature("23℃");
      setHumidity("50%");
      setWeather("25℃");
      setPeople("15人");
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
    <main className={styles.main}>
    <h1 className={styles.title}>Lab Monitor</h1>
    <div className={styles.grid}>
      <div className={styles.card}>
        <h3>Temperature</h3>
        <p>{temperature}</p>
      </div>
      <div className={styles.card}>
        <h3>Humidity</h3>
        <p>{humidity}</p>
      </div>
      <div className={styles.card}>
        <h3>Weather</h3>
        <p>{weather}</p>
      </div>
      <div className={styles.card}>
        <h3>People</h3>
        <p>{people}</p>
      </div>
    </div>
  </main>
</div>
)
}
