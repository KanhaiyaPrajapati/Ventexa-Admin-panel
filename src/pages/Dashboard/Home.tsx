import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import PageMeta from "../../components/common/PageMeta";
import Service from "../../components/ecommerce/Service"

export default function Home() {
  return (
    <>
      <PageMeta
        title="VenTexa Admin Panel"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div className="col-span-2 space-y-1 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>
        <div className="col-span-2">
          <StatisticsChart />
          <Service />
        </div>
      </div>
    </>
  );
}
