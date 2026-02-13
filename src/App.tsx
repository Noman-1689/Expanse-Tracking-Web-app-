import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import ExpensesStatistics from "./pages/ExpensesStatistics";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "15px",
              background: "#333",
              color: "#fff",
            },
          }}
        />

        <Sidebar />

        {/* FIX: Added 'pt-20' for mobile to clear the menu button.
          Added 'lg:pt-8' to reset padding on large screens where the button is hidden.
        */}
        <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-8 lg:pt-8 custom-scrollbar">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/statistics" element={<ExpensesStatistics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
