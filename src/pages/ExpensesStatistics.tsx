import Chart from "react-apexcharts";
import { ChevronDown, MoreHorizontal, TrendingUp } from "lucide-react";

const ExpensesStatistics = () => {
  // 1. Pie Chart Config (Categories)
  const pieConfig = {
    series: [45, 25, 20, 10],
    options: {
      chart: { type: "donut" },
      labels: ["Shopping", "Bills", "Food", "Others"],
      colors: ["#7c3aed", "#a78bfa", "#c4b5fd", "#ddd6fe"],
      legend: { position: "bottom", fontSize: "12px", fontFamily: "inherit" },
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

  // 2. Line Chart Config (Trends)
  const lineConfig = {
    series: [{ name: "Spend", data: [30, 40, 35, 50, 49, 60, 70] }],
    options: {
      chart: {
        toolbar: { show: false },
        sparkline: { enabled: false },
        fontFamily: "inherit",
      },
      stroke: { curve: "smooth", width: 3, colors: ["#7c3aed"] },
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
      markers: { size: 0, hover: { size: 5 } },
    },
  };

  // 3. Bar Chart Config (Monthly Comparison)
  const barConfig = {
    series: [{ name: "Budget Usage", data: [400, 500, 350, 700, 600] }],
    options: {
      chart: {
        toolbar: { show: false },
        fontFamily: "inherit",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "40%",
        },
      },
      colors: ["#7c3aed"],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (val: number) => `Rs. ${val}`,
        },
      },
      grid: {
        show: true,
        borderColor: "#f1f1f1",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
      },
    },
  };

  return (
    <div className="space-y-8 p-1">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Analytics Overview
          </h2>
          <p className="text-sm text-gray-400">
            Track your financial habits in 2026
          </p>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
          <MoreHorizontal />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Graph Card - Weekly Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-gray-700">
                Weekly Spending Trend
              </h3>
              <p className="text-xs text-gray-400">Daily outflow analysis</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <Chart
            options={lineConfig.options as any}
            series={lineConfig.series}
            type="area"
            height={220}
          />
        </div>

        {/* Pie Graph Card - Categories */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Category Split</h3>
            <p className="text-xs text-gray-400 mb-4">Where your money goes</p>
          </div>
          <div className="flex justify-center">
            <Chart
              options={pieConfig.options as any}
              series={pieConfig.series}
              type="donut"
              height={260}
            />
          </div>
        </div>

        {/* Bar Graph Card - Monthly Usage */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-gray-700">
                Monthly Budget Usage
              </h3>
              <p className="text-xs text-gray-400">
                Actual vs Planned spending
              </p>
            </div>
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-600 gap-2 cursor-pointer border border-gray-100">
              Fiscal Year 2026 <ChevronDown size={14} />
            </div>
          </div>
          <Chart
            options={barConfig.options as any}
            series={barConfig.series}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesStatistics;
