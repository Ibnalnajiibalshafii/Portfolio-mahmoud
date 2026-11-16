export const salesSummary = {
  rows: 120,
  total: 190121.61,
  average: 1584.35,
  min: 72.67,
  q1: 558.08,
  median: 1162.49,
  mean: 1584.35,
  q3: 2462.06,
  max: 5769.68,
  std: 1297.56,
  missingProduct: 2,
  missingUnits: 1,
};

export const branchSales: { branch: string; sales: number }[] = [
  { branch: "Eldoret", sales: 54436.24 },
  { branch: "Nairobi", sales: 38168.34 },
  { branch: "Nakuru", sales: 35879.33 },
  { branch: "Nyeri", sales: 30825.64 },
  { branch: "Mombasa", sales: 30812.06 },
];

export const categorySales: { category: string; sales: number }[] = [
  { category: "Household", sales: 58885.52 },
  { category: "Personal Care", sales: 56477.99 },
  { category: "Groceries", sales: 32348.67 },
  { category: "Beverages", sales: 23895.04 },
  { category: "Snacks", sales: 18514.39 },
];

export const printedTransactions: {
  id: string;
  date: string;
  branch: string;
  category: string;
  product: string;
  units: number;
  price: number;
  discount: number;
  sales: number;
}[] = [
  { id: "TX1001", date: "2026-09-07", branch: "Nakuru", category: "Groceries", product: "Cooking Oil", units: 13, price: 303.95, discount: 0, sales: 3951.35 },
  { id: "TX1002", date: "2026-09-27", branch: "Nyeri", category: "Personal Care", product: "Shampoo", units: 14, price: 212.19, discount: 0.05, sales: 2822.13 },
  { id: "TX1003", date: "2026-09-05", branch: "Eldoret", category: "Personal Care", product: "Shampoo", units: 4, price: 164.18, discount: 0, sales: 656.72 },
  { id: "TX1004", date: "2026-09-30", branch: "Nyeri", category: "Household", product: "Dish Soap", units: 14, price: 142.11, discount: 0, sales: 1989.54 },
  { id: "TX1005", date: "2026-09-29", branch: "Nakuru", category: "Household", product: "Batteries", units: 2, price: 224.13, discount: 0, sales: 448.26 },
  { id: "TX1029", date: "2026-09-28", branch: "Nairobi", category: "Household", product: "Batteries", units: 14, price: 412.12, discount: 0, sales: 5769.68 },
  { id: "TX1116", date: "2026-10-15", branch: "Eldoret", category: "Household", product: "Bleach", units: 12, price: 314.48, discount: 0.05, sales: 3585.07 },
  { id: "TX1117", date: "2026-09-07", branch: "Nyeri", category: "Groceries", product: "Flour", units: 13, price: 93.64, discount: 0.05, sales: 1156.45 },
  { id: "TX1118", date: "2026-10-11", branch: "Nairobi", category: "Groceries", product: "Cooking Oil", units: 1, price: 84.90, discount: 0, sales: 84.90 },
  { id: "TX1119", date: "2026-09-05", branch: "Eldoret", category: "Beverages", product: "Juice", units: 10, price: 139.64, discount: 0, sales: 1396.40 },
  { id: "TX1120", date: "2026-10-04", branch: "Nyeri", category: "Groceries", product: "Flour", units: 2, price: 233.07, discount: 0, sales: 466.14 },
];
