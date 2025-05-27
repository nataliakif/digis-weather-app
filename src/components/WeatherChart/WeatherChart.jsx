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

    const grouped = [];

    for (const date in map) {
      if (map.hasOwnProperty(date)) {
        const entries = map[date];
        const temps = entries.map((e) => e.main.temp);
        const avg = temps.reduce((sum, t) => sum + t, 0) / temps.length;

        grouped.push({
          date,
          temp: Math.round(avg),
        });
      }
    }

    return grouped;
  }, [data]);

  if (!data || groupedByDay.length === 0) return null;

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer>
        <BarChart data={groupedByDay}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <YAxis
            unit="°C"
            tick={{ fontSize: 12, fill: "#666" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
          <Bar
            dataKey="temp"
            fill="#e39b14"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeatherChart;
