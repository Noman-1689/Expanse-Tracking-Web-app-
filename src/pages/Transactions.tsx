import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast"; // Only import toast
import {
  addtransection,
  removetransection,
  updatetransection,
} from "../features/ExpanceTrack/expanceTrackSlice";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";

const Transactions = () => {
  const dispatch = useDispatch();
  const {
    transection: transactions = [],
    balance = 0,
    totalcredit = 0,
    totaldebit = 0,
  } = useSelector((state: any) => state.expanceTracker || {});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all",
  );

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    type: "debit" as "credit" | "debit",
    category: "General",
    date: new Date().toISOString().split("T")[0],
  });

  const filteredTransactions = transactions.filter((t: any) => {
    if (filterType === "all") return true;
    return t.type === filterType;
  });

  const lastActivity =
    transactions.length > 0 ? transactions[0].date : "No recent activity";

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(removetransection(id));
      toast.success("Transaction deleted successfully");
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    const dateObj = new Date(item.date);
    const formattedDate = isNaN(dateObj.getTime())
      ? new Date().toISOString().split("T")[0]
      : dateObj.toISOString().split("T")[0];

    setFormData({
      name: item.detail,
      amount: item.amount.toString(),
      type: item.type,
      category: item.category || "General",
      date: formattedDate,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(formData.amount) <= 0) {
      return toast.error("Please enter a valid amount");
    }

    const displayDate = new Date(formData.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const payload = {
      detail: formData.name,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
      date: displayDate,
    };

    if (editingId) {
      dispatch(updatetransection({ id: editingId, ...payload }));
      toast.success("Transaction updated!");
    } else {
      dispatch(addtransection(payload));
      toast.success("New transaction added!");
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      amount: "",
      type: "debit",
      category: "General",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">
              Balance
            </p>
            <h3 className="text-2xl font-bold text-gray-800">
              Rs. {balance.toLocaleString()}
            </h3>
            <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
              <Calendar size={10} /> {lastActivity}
            </p>
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">
            Total
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-green-600 uppercase font-bold tracking-widest">
              Total Income
            </p>
            <h3 className="text-2xl font-bold text-green-600">
              Rs. {totalcredit.toLocaleString()}
            </h3>
          </div>
          <TrendingUp className="text-green-600" size={24} />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-purple-900 uppercase font-bold tracking-widest">
              Total Expenses
            </p>
            <h3 className="text-2xl font-bold text-purple-900">
              Rs. {totaldebit.toLocaleString()}
            </h3>
          </div>
          <TrendingDown className="text-purple-900" size={24} />
        </div>
      </div>

      {/* HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Transactions
        </h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto">
            {(["all", "credit", "debit"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === type
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-2xl hover:bg-purple-700 transition-all shadow-md active:scale-95 shrink-0"
          >
            <Plus size={18} /> <span className="hidden sm:inline">Add New</span>
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-50">
              <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                <th className="px-6 py-5">Activity</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5 text-right">Amount</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item: any) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-purple-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-xl ${item.type === "credit" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                        >
                          {item.type === "credit" ? (
                            <ArrowDownLeft size={16} />
                          ) : (
                            <ArrowUpRight size={16} />
                          )}
                        </div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {item.detail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-gray-500">
                        {item.date}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-md font-bold uppercase">
                        {item.category || "General"}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-bold text-sm ${item.type === "credit" ? "text-green-600" : "text-purple-900"}`}
                    >
                      {item.type === "credit" ? "+" : "-"} Rs.{" "}
                      {item.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400 text-sm italic"
                  >
                    No {filterType !== "all" ? filterType : ""} transactions
                    found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit" : "New"} Transaction
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                  Detail
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Shopping"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                    Amount (Rs.)
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                    Type
                  </label>
                  <select
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as any })
                    }
                  >
                    <option value="debit">Expense</option>
                    <option value="credit">Income</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="General"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all mt-4"
              >
                {editingId ? "Update Entry" : "Add Entry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
