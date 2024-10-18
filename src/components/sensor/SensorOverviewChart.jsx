import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const sensorData = {
  sensor1: {
    monthly: [
      { week: "Sem 1", valor: 176 },
      { week: "Sem 2", valor: 182 },
      { week: "Sem 3", valor: 160 },
      { week: "Sem 4", valor: 185 },
    ],
    weekly: [
      { day: "Dom", valor: 120 },
      { day: "Seg", valor: 135 },
      { day: "Ter", valor: 145 },
      { day: "Qua", valor: 112 },
      { day: "Qui", valor: 130 },
      { day: "Sex", valor: 155 },
      { day: "Sab", valor: 148 },
    ],
    twoDays: [
      { hours: "00:00h", valor: 95 },
      { hours: "08:00h", valor: 125 },
      { hours: "16:00h", valor: 110 },
      { hours: "00:00h", valor: 105 },
      { hours: "08:00h", valor: 130 },
      { hours: "16:00h", valor: 120 },
      { hours: "00:00h", valor: 115 },
    ],
    daily: [
      { hours: "00:00h", valor: 65 },
      { hours: "04:00h", valor: 80 },
      { hours: "08:00h", valor: 90 },
      { hours: "12:00h", valor: 100 },
      { hours: "16:00h", valor: 85 },
      { hours: "20:00h", valor: 95 },
      { hours: "00:00h", valor: 70 },
    ],
  },
  sensor2: {
    monthly: [
      { week: "Sem 1", valor: 178 },
      { week: "Sem 2", valor: 189 },
      { week: "Sem 3", valor: 150 },
      { week: "Sem 4", valor: 170 },
    ],
    weekly: [
      { day: "Dom", valor: 125 },
      { day: "Seg", valor: 138 },
      { day: "Ter", valor: 142 },
      { day: "Qua", valor: 110 },
      { day: "Qui", valor: 135 },
      { day: "Sex", valor: 160 },
      { day: "Sab", valor: 150 },
    ],
    twoDays: [
      { hours: "00:00h", valor: 100 },
      { hours: "08:00h", valor: 115 },
      { hours: "16:00h", valor: 120 },
      { hours: "00:00h", valor: 110 },
      { hours: "08:00h", valor: 125 },
      { hours: "16:00h", valor: 135 },
      { hours: "00:00h", valor: 118 },
    ],
    daily: [
      { hours: "00:00h", valor: 68 },
      { hours: "04:00h", valor: 85 },
      { hours: "08:00h", valor: 92 },
      { hours: "12:00h", valor: 105 },
      { hours: "16:00h", valor: 88 },
      { hours: "20:00h", valor: 97 },
      { hours: "00:00h", valor: 72 },
    ],
  },
  sensor3: {
    monthly: [
      { week: "Sem 1", valor: 170 },
      { week: "Sem 2", valor: 190 },
      { week: "Sem 3", valor: 155 },
      { week: "Sem 4", valor: 180 },
    ],
    weekly: [
      { day: "Dom", valor: 128 },
      { day: "Seg", valor: 137 },
      { day: "Ter", valor: 146 },
      { day: "Qua", valor: 120 },
      { day: "Qui", valor: 140 },
      { day: "Sex", valor: 150 },
      { day: "Sab", valor: 160 },
    ],
    twoDays: [
      { hours: "00:00h", valor: 97 },
      { hours: "08:00h", valor: 120 },
      { hours: "16:00h", valor: 110 },
      { hours: "00:00h", valor: 105 },
      { hours: "08:00h", valor: 130 },
      { hours: "16:00h", valor: 125 },
      { hours: "00:00h", valor: 115 },
    ],
    daily: [
      { hours: "00:00h", valor: 60 },
      { hours: "04:00h", valor: 78 },
      { hours: "08:00h", valor: 85 },
      { hours: "12:00h", valor: 98 },
      { hours: "16:00h", valor: 82 },
      { hours: "20:00h", valor: 90 },
      { hours: "00:00h", valor: 75 },
    ],
  },
  sensor4: {
    monthly: [
      { week: "Sem 1", valor: 180 },
      { week: "Sem 2", valor: 190 },
      { week: "Sem 3", valor: 165 },
      { week: "Sem 4", valor: 185 },
    ],
    weekly: [
      { day: "Dom", valor: 130 },
      { day: "Seg", valor: 140 },
      { day: "Ter", valor: 155 },
      { day: "Qua", valor: 115 },
      { day: "Qui", valor: 138 },
      { day: "Sex", valor: 165 },
      { day: "Sab", valor: 145 },
    ],
    twoDays: [
      { hours: "00:00h", valor: 110 },
      { hours: "08:00h", valor: 125 },
      { hours: "16:00h", valor: 115 },
      { hours: "00:00h", valor: 105 },
      { hours: "08:00h", valor: 135 },
      { hours: "16:00h", valor: 120 },
      { hours: "00:00h", valor: 115 },
    ],
    daily: [
      { hours: "00:00h", valor: 65 },
      { hours: "04:00h", valor: 82 },
      { hours: "08:00h", valor: 88 },
      { hours: "12:00h", valor: 100 },
      { hours: "16:00h", valor: 90 },
      { hours: "20:00h", valor: 95 },
      { hours: "00:00h", valor: 80 },
    ],
  },
};

const SensorOverviewChart = ({ selectedSensor, setSelectedSensor }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30 dias");

  const getChartData = () => {
    const sensor = sensorData[selectedSensor];
    switch (selectedTimeRange) {
      case "1 dia":
        return sensor.daily;
      case "2 dias":
        return sensor.twoDays;
      case "7 dias":
        return sensor.weekly;
      case "30 dias":
      default:
        return sensor.monthly;
    }
  };

  const getXAxisDataKey = () => {
    switch (selectedTimeRange) {
      case "1 dia":
      case "2 dias":
        return "hours";
      case "7 dias":
        return "day";
      case "30 dias":
      default:
        return "week";
    }
  };

  const getChartTitle = () => {
    switch (selectedTimeRange) {
      case "1 dia":
        return `Valor médio diariamente - Sensor ${selectedSensor.slice(-1)}`;
      case "2 dias":
        return `Valor médio a cada dois dias - Sensor ${selectedSensor.slice(
          -1
        )}`;
      case "7 dias":
        return `Valor médio semanalmente - Sensor ${selectedSensor.slice(-1)}`;
      case "30 dias":
      default:
        return `Valor médio mensalmente - Sensor ${selectedSensor.slice(-1)}`;
    }
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          {getChartTitle()}
        </h2>

        <div className="flex space-x-4">
          {/* Seleção de intervalo de tempo */}
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <option value="1 dia">1 dia</option>
            <option value="2 dias">2 dias</option>
            <option value="7 dias">7 dias</option>
            <option value="30 dias">30 dias</option>
          </select>

          {/* Seleção de sensor */}
          <select
            className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
          >
            <option value="sensor1">Sensor 1</option>
            <option value="sensor2">Sensor 2</option>
            <option value="sensor3">Sensor 3</option>
            <option value="sensor4">Sensor 4</option>
          </select>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={getXAxisDataKey()} stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SensorOverviewChart;
