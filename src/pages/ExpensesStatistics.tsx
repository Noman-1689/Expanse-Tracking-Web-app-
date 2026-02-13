import { lazy, Suspense } from "react";
import { MoreHorizontal } from "lucide-react";

// Lazy load to fix the "chunks larger than 500 kB" error
const Chart = lazy(() => import("react-apexcharts"));

const ExpensesStatistics = () => {
  // 1. Pie Chart Config
  const pieConfig = {
    series: [45, 25, 20, 10],
    options: {
      chart: { type: "donut" as const },
      labels: ["Shopping", "Bills", "Food", "Others"],
      colors: ["#7c3aed", "#a78bfa", "#c4b5fd", "#ddd6fe"],
      legend: {
        position: "bottom" as const,
        fontSize: "12px",
        fontFamily: "inherit",
      },
      dataLabels: { enabled: false },
      stroke: { show: false },
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Spend",
                formatter: () => "Rs. 88.6k",
              },
            },
          },
        },
      },
    },
  };

  // 2. Line Chart Config
  const lineConfig = {
    series: [{ name: "Spend", data: [30, 40, 35, 50, 49, 60, 70] }],
    options: {
      chart: { toolbar: { show: false }, fontFamily: "inherit" },
      stroke: { curve: "smooth" as const, width: 3, colors: ["#7c3aed"] },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
      grid: { borderColor: "#f8f8f8" },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
    },
  };

  // 3. Bar Chart Config
  const barConfig = {
    series: [{ name: "Budget Usage", data: [400, 500, 350, 700, 600] }],
    options: {
      chart: { toolbar: { show: false }, fontFamily: "inherit" },
      plotOptions: { bar: { borderRadius: 6, columnWidth: "40%" } },
      colors: ["#7c3aed"],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          // FIXED: Added type definition to 'val'
          formatter: (val: number) => `Rs. ${val}`,
        },
      },
      grid: { show: true, borderColor: "#f1f1f1", strokeDashArray: 4 },
    },
  };

  return (
    <div className="space-y-8 p-1">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Analytics Overview
          </h2>
          <p className="text-sm text-gray-400">
            Track your financial habits in 2026
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
          <MoreHorizontal />
        </button>
      </div>

      <Suspense
        fallback={
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-3xl animate-pulse text-gray-400">
            Loading charts...
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <Chart
              options={lineConfig.options}
              series={lineConfig.series}
              type="area"
              height={220}
            />
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <Chart
              options={pieConfig.options}
              series={pieConfig.series}
              type="donut"
              height={260}
            />
          </div>

          <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <Chart
              options={barConfig.options}
              series={barConfig.series}
              type="bar"
              height={250}
            />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ExpensesStatistics;
