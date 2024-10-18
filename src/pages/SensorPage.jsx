import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SensorOverviewChart from "../components/sensor/SensorOverviewChart";
import { useState, useEffect } from "react";

// Dados de exemplo para KPIs de cada sensor
const sensorKpiData = {
  sensor1: {
    totalRevenue: "$1,234,567",
    averageOrderValue: "$78.90",
    conversionRate: "3.45%",
    salesGrowth: "12.3%",
  },
  sensor2: {
    totalRevenue: "$2,345,678",
    averageOrderValue: "$88.50",
    conversionRate: "4.10%",
    salesGrowth: "15.6%",
  },
  sensor3: {
    totalRevenue: "$3,456,789",
    averageOrderValue: "$95.30",
    conversionRate: "5.25%",
    salesGrowth: "10.8%",
  },
  sensor4: {
    totalRevenue: "$1,567,890",
    averageOrderValue: "$72.40",
    conversionRate: "2.95%",
    salesGrowth: "8.9%",
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
            name="Total Revenue"
            icon={DollarSign}
            value={kpis.totalRevenue}
            color="#6366F1"
          />
          <StatCard
            name="Avg. Order Value"
            icon={ShoppingCart}
            value={kpis.averageOrderValue}
            color="#10B981"
          />
          <StatCard
            name="Conversion Rate"
            icon={TrendingUp}
            value={kpis.conversionRate}
            color="#F59E0B"
          />
          <StatCard
            name="Sales Growth"
            icon={CreditCard}
            value={kpis.salesGrowth}
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
