"use client"; // This is a client component 👈🏽

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [day, setDay] = useState("Friday");
  const [startTime, setStartTime] = useState("14:20");
  const [endTime, setEndTime] = useState("15:50");
  const [schedules, setSchedules] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/schedules", {
        day,
        startTime,
        endTime,
      });
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };
  return (
    <main className={styles.main}>
      {" "}
      <form onSubmit={handleSubmit}>
        <label>
          Day:
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <button type="submit">Filter Schedules</button>
      </form>
      <div>
        <h2>Available Schedules</h2>
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.id}>{schedule.details}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
