import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface TransectionProps {
  id: string;
  detail: string;
  date: string;
  // Removed time property
  amount: number;
  type: "credit" | "debit";
  category?: string;
}

interface ExpenseProps {
  transection: TransectionProps[];
  balance: number;
  totalcredit: number;
  totaldebit: number;
}

const getFormattedDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const dummyData: TransectionProps[] = [
  {
    id: nanoid(),
    detail: "Monthly Salary",
    amount: 450000,
    type: "credit",
    category: "Salary",
    date: getFormattedDate(10),
  },
  {
    id: nanoid(),
    detail: "Apartment Rent",
    amount: 120000,
    type: "debit",
    category: "Housing",
    date: getFormattedDate(9),
  },
  {
    id: nanoid(),
    detail: "Grocery Shopping",
    amount: 25000,
    type: "debit",
    category: "Groceries",
    date: getFormattedDate(8),
  },
  {
    id: nanoid(),
    detail: "Freelance Project",
    amount: 75000,
    type: "credit",
    category: "Business",
    date: getFormattedDate(7),
  },
  {
    id: nanoid(),
    detail: "Internet Subscription",
    amount: 15500,
    type: "debit",
    category: "Internet",
    date: getFormattedDate(6),
  },
  {
    id: nanoid(),
    detail: "Electricity Bill",
    amount: 12000,
    type: "debit",
    category: "Services",
    date: getFormattedDate(5),
  },
  {
    id: nanoid(),
    detail: "Gym Membership",
    amount: 10000,
    type: "debit",
    category: "Health",
    date: getFormattedDate(4),
  },
  {
    id: nanoid(),
    detail: "Dining Out",
    amount: 18000,
    type: "debit",
    category: "Outings",
    date: getFormattedDate(3),
  },
  {
    id: nanoid(),
    detail: "Uber Ride",
    amount: 4500,
    type: "debit",
    category: "Car",
    date: getFormattedDate(2),
  },
  {
    id: nanoid(),
    detail: "Netflix Subscription",
    amount: 3600,
    type: "debit",
    category: "Services",
    date: getFormattedDate(1),
  },
];

const initialCredit = dummyData.reduce(
  (acc, curr) => (curr.type === "credit" ? acc + curr.amount : acc),
  0,
);
const initialDebit = dummyData.reduce(
  (acc, curr) => (curr.type === "debit" ? acc + curr.amount : acc),
  0,
);

const initialState: ExpenseProps = {
  transection: dummyData,
  balance: 321500.09 + (initialCredit - initialDebit),
  totalcredit: initialCredit,
  totaldebit: initialDebit,
};

export const expanceSlice = createSlice({
  name: "expanceTracker",
  initialState,
  reducers: {
    addtransection: (
      state,
      // Now only Omit id. Date comes from the component form.
      action: PayloadAction<Omit<TransectionProps, "id">>,
    ) => {
      const { detail, amount, type, category, date } = action.payload;

      const newTrans: TransectionProps = {
        id: nanoid(),
        detail,
        amount,
        type,
        category,
        date, // Use the date passed from the form
      };

      state.transection.unshift(newTrans);

      if (type === "credit") {
        state.balance += amount;
        state.totalcredit += amount;
      } else {
        state.balance -= amount;
        state.totaldebit += amount;
      }
    },

    removetransection: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      const existingItem = state.transection.find((t) => t.id === idToRemove);

      if (existingItem) {
        if (existingItem.type === "credit") {
          state.balance -= existingItem.amount;
          state.totalcredit -= existingItem.amount;
        } else {
          state.balance += existingItem.amount;
          state.totaldebit -= existingItem.amount;
        }
        state.transection = state.transection.filter(
          (t) => t.id !== idToRemove,
        );
      }
    },

    updatetransection: (
      state,
      action: PayloadAction<TransectionProps>, // Accept full object for update
    ) => {
      const { id, detail, amount, type, category, date } = action.payload;
      const index = state.transection.findIndex((t) => t.id === id);

      if (index !== -1) {
        const oldTrans = state.transection[index];

        // Reverse Old Math
        if (oldTrans.type === "credit") {
          state.balance -= oldTrans.amount;
          state.totalcredit -= oldTrans.amount;
        } else {
          state.balance += oldTrans.amount;
          state.totaldebit -= oldTrans.amount;
        }

        // Update Data
        state.transection[index] = { id, detail, amount, type, category, date };

        // Apply New Math
        if (type === "credit") {
          state.balance += amount;
          state.totalcredit += amount;
        } else {
          state.balance -= amount;
          state.totaldebit += amount;
        }
      }
    },
  },
});

export const { addtransection, removetransection, updatetransection } =
  expanceSlice.actions;
export default expanceSlice.reducer;
