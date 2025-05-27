import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./WeatherChart.module.css";

const WeatherChart = () => {
  const data = useSelector((state) => state.weather.data);

  const groupedByDay = useMemo(() => {
    if (!data) return [];

    const map = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!map[date]) {
        map[date] = [];
      }
      map[date].push(item);
    });

    return Object.entries(map).map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const avg = temps.reduce((sum, t) => sum + t, 0) / temps.length;

      return {
        date,
        temp: Math.round(avg),
      };
    });
  }, [data]);

  if (!data || groupedByDay.length === 0) return null;

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer>
        <BarChart data={groupedByDay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit="°C" />
          <Tooltip />
          <Bar dataKey="temp" fill="#1890ff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
