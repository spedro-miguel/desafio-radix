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
import { useState, useEffect } from "react";

const SensorOverviewChart = ({ selectedSensor, setSelectedSensor }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30 dias");
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch("/sensores.json");
        const data = await response.json();
        setSensorData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados dos sensores:", error);
        setLoading(false);
      }
    };

    fetchSensorData();
  }, []);

  const getChartData = () => {
    if (!sensorData) return [];

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
