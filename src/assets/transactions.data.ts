export interface Transaction {
  id: number;
  name: string;
  date: string;
  time: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
}

export const transactionsData: Transaction[] = [
  {
    id: 1,
    name: "Daily Savings",
    date: "Sept 2, 2022",
    time: "10:30 am",
    amount: 1500,
    type: "debit",
    category: "Savings",
  },
  {
    id: 2,
    name: "Housekeeping",
    date: "Sept 2, 2022",
    time: "04:00 pm",
    amount: 5000,
    type: "debit",
    category: "Services",
  },
  {
    id: 3,
    name: "Gadgets",
    date: "Sept 2, 2022",
    time: "02:30 pm",
    amount: 5000,
    type: "debit",
    category: "Misc",
  },
  {
    id: 4,
    name: "Project Bonus",
    date: "Sept 2, 2022",
    time: "12:00 pm",
    amount: 5000,
    type: "credit",
    category: "Work",
  },
  {
    id: 5,
    name: "Salary",
    date: "Sept 1, 2022",
    time: "09:00 am",
    amount: 500000,
    type: "credit",
    category: "Work",
  },
];
