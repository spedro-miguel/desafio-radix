import {
  BarChart2,
  ChartColumnDecreasing,
  ChartColumnIncreasing,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import ValueOverviewChart from "../components/overview/ValueOverviewChart";
import CategoryChart from "../components/overview/CategoryChart";
import ValuePerSensorChart from "../components/overview/ValuePerSensorChart";

const DashboardPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Valor máximo do sensor"
            icon={ChartColumnIncreasing}
            value="190.0"
            color="#6366F1"
          />
          <StatCard
            name="Valor mínimo do sensor"
            icon={ChartColumnDecreasing}
            value="60.0"
            color="#8B5CF6"
          />
          <StatCard
            name="Quantidade de sensor"
            icon={ShoppingBag}
            value="4"
            color="#EC4899"
          />
          <StatCard
            name="Sensor com maior leitura (%)"
            icon={BarChart2}
            value="31%"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ValueOverviewChart />
          <CategoryChart />
          <ValuePerSensorChart />
        </div>
      </main>
    </div>
  );
};
export default DashboardPage;
