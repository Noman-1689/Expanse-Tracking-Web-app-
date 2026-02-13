import { useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import Transaction from "../pages/Transactions";
import { ChevronDown, Pencil, Check, X } from "lucide-react";
import toast from "react-hot-toast"; // Only import toast, not Toaster

const Dashboard = () => {
  const {
    transection: transactions = [],
    balance = 0,
    totaldebit = 0,
  } = useSelector((state: any) => state.expanceTracker || {});

  const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(350000);
  const [budget, setBudget] = useState(350000);

  const handleSave = () => {
    if (tempBudget < 0) {
      return toast.error("Budget cannot be negative");
    }

    setBudget(tempBudget);
    setIsEditing(false);

    toast.success(`Budget updated to Rs. ${tempBudget.toLocaleString()}`, {
      icon: "💰",
      style: {
        borderRadius: "15px",
        background: "#7c3aed",
        color: "#fff",
      },
    });
  };

  const handleCancel = () => {
    setTempBudget(budget);
    setIsEditing(false);
    toast("Changes discarded", { icon: "ℹ️" });
  };

  // --- CHART LOGIC ---
  const recentExpenseData = transactions
    .filter((t: any) => t.type === "debit")
    .slice(0, 7)
    .map((t: any) => t.amount)
    .reverse();

  const chartConfig = {
    series: [
      {
        name: "Expenses",
        data:
          recentExpenseData.length > 0
            ? recentExpenseData
            : [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
        sparkline: { enabled: true },
        fontFamily: "inherit",
      },
      colors: ["#7c3aed"],
      stroke: { curve: "smooth", width: 3 },
      tooltip: { theme: "light", x: { show: false } },
    },
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <header>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Welcome back, Good Sir!
        </h1>
        <p className="text-sm text-gray-400">Financial Overview for 2026</p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          {/* BALANCE CARD */}
          <div className="bg-slate-200 p-6 md:p-8 rounded-[40px] flex flex-col justify-between border border-white shadow-inner">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Available Balance
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-purple-900 mt-1">
                Rs.{" "}
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </h2>
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="font-mono text-gray-600 tracking-wider">
                **** 3923
              </p>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-slate-200 shadow-sm" />
                <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-slate-200 shadow-sm" />
              </div>
            </div>
          </div>

          {/* BUDGET SUMMARY CARD */}
          <div className="grid grid-cols-2 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm relative group">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest">
                  Monthly budget
                </p>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-400 hover:text-purple-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Pencil size={12} />
                  </button>
                )}
              </div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-purple-600">Rs.</span>
                  <input
                    type="number"
                    value={tempBudget}
                    onChange={(e) => setTempBudget(Number(e.target.value))}
                    className="w-full text-lg font-bold text-purple-600 border-b-2 border-purple-500 outline-none bg-transparent"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    className="text-green-500 hover:bg-green-50 p-1 rounded"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <p className="text-lg font-bold text-green-600">
                  Rs. {budget.toLocaleString()}
                </p>
              )}
            </div>
            <div className="border-l border-gray-100 pl-4 flex flex-col justify-center">
              <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">
                Spent
              </p>
              <p className="text-lg font-bold text-red-500">
                Rs. {totaldebit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-800">Spending Trends</h3>
              <p className="text-[10px] text-gray-400">Last 7 expenses</p>
            </div>
            <div className="flex items-center text-xs text-gray-400 cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
              2026 <ChevronDown size={14} className="ml-1" />
            </div>
          </div>
          <div className="h-40 w-full mt-auto">
            <Chart
              options={chartConfig.options as any}
              series={chartConfig.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
      </section>

      <section className="pb-10">
        <Transaction />
      </section>
    </div>
  );
};

export default Dashboard;
