import { Helmet } from "react-helmet-async";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>OceanDAO | Premium Web3 Dashboard</title>
        <meta name="description" content="Experience the next generation of DeFi with OceanDAO's immersive Web3 dashboard. Track your portfolio, stake assets, and navigate the blockchain ocean." />
      </Helmet>
      <Dashboard />
    </>
  );
};

export default Index;
