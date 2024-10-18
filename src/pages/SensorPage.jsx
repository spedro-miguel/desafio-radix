import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import {
  ChartColumnDecreasing,
  ChartColumnIncreasing,
  IdCard,
  TrendingUp,
} from "lucide-react";
import SensorOverviewChart from "../components/sensor/SensorOverviewChart";
import { useState, useEffect } from "react";

const sensorKpiData = {
  sensor1: {
    valorMaximo: "185.0",
    valorMinimo: "65.0",
    valorMedio: "121.32",
    idSensor: "EQ-12051",
  },
  sensor2: {
    valorMaximo: "189.0",
    valorMinimo: "68.0",
    valorMedio: "123.08",
    idSensor: "EQ-12958",
  },
  sensor3: {
    valorMaximo: "190.0",
    valorMinimo: "60.0",
    valorMedio: "121.84",
    idSensor: "EQ-12448",
  },
  sensor4: {
    valorMaximo: "190.0",
    valorMinimo: "65.0",
    valorMedio: "125.32",
    idSensor: "EQ-12163",
  },
};

const SensorPage = () => {
  const [selectedSensor, setSelectedSensor] = useState("sensor1");
  const [kpis, setKpis] = useState(sensorKpiData[selectedSensor]);

  // Atualiza as KPIs sempre que o sensor selecionado mudar
  useEffect(() => {
    setKpis(sensorKpiData[selectedSensor]);
  }, [selectedSensor]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard Sensor" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* SENSOR STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Valor máximo"
            icon={ChartColumnIncreasing}
            value={kpis.valorMaximo}
            color="#6366F1"
          />
          <StatCard
            name="Valor mínimo"
            icon={ChartColumnDecreasing}
            value={kpis.valorMinimo}
            color="#10B981"
          />
          <StatCard
            name="Valor médio"
            icon={TrendingUp}
            value={kpis.valorMedio}
            color="#F59E0B"
          />
          <StatCard
            name="Id sensor"
            icon={IdCard}
            value={kpis.idSensor}
            color="#EF4444"
          />
        </motion.div>

        {/* Passa o estado do sensor selecionado para o gráfico */}
        <SensorOverviewChart
          selectedSensor={selectedSensor}
          setSelectedSensor={setSelectedSensor}
        />
      </main>
    </div>
  );
};

export default SensorPage;
