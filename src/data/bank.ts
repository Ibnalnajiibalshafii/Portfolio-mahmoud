export type Employee = {
  id: string;
  name: string;
  branch: string;
  position: string;
  hireDate: string;
  salary: number;
  type: "Permanent" | "Contract";
  status: "Active" | "On Leave";
};

export const employees: Employee[] = [
  { id: "EMP001", name: "Amina Otieno", branch: "Nairobi Central", position: "Branch Manager", hireDate: "2024-02-01", salary: 164000, type: "Permanent", status: "Active" },
  { id: "EMP002", name: "Brian Mwangi", branch: "Nairobi Central", position: "Operations Officer", hireDate: "2024-05-08", salary: 112000, type: "Permanent", status: "On Leave" },
  { id: "EMP003", name: "Carol Wanjiku", branch: "Nairobi Central", position: "Relationship Manager", hireDate: "2020-03-24", salary: 114000, type: "Contract", status: "Active" },
  { id: "EMP004", name: "David Kiptoo", branch: "Nairobi Central", position: "Credit Analyst", hireDate: "2019-11-24", salary: 115000, type: "Permanent", status: "Active" },
  { id: "EMP005", name: "Esther Njeri", branch: "Nairobi Central", position: "Customer Service Officer", hireDate: "2023-02-19", salary: 69000, type: "Contract", status: "Active" },
  { id: "EMP006", name: "Felix Ouma", branch: "Nairobi Central", position: "Teller", hireDate: "2022-01-01", salary: 41000, type: "Contract", status: "On Leave" },
  { id: "EMP007", name: "Grace Achieng", branch: "Nairobi Central", position: "Sales Officer", hireDate: "2019-04-08", salary: 55000, type: "Contract", status: "Active" },
  { id: "EMP008", name: "Hassan Ali", branch: "Nairobi Central", position: "Loan Officer", hireDate: "2023-10-01", salary: 85000, type: "Contract", status: "Active" },
  { id: "EMP009", name: "Irene Chebet", branch: "Nairobi Central", position: "Accountant", hireDate: "2023-04-23", salary: 102000, type: "Permanent", status: "Active" },
  { id: "EMP010", name: "James Kariuki", branch: "Nairobi Central", position: "Digital Banking Officer", hireDate: "2024-12-18", salary: 97000, type: "Permanent", status: "Active" },
  { id: "EMP011", name: "Kevin Mutua", branch: "Mombasa", position: "Branch Manager", hireDate: "2022-04-15", salary: 197000, type: "Permanent", status: "Active" },
  { id: "EMP012", name: "Lydia Muthoni", branch: "Mombasa", position: "Operations Officer", hireDate: "2023-05-26", salary: 123000, type: "Contract", status: "On Leave" },
  { id: "EMP013", name: "Martin Barasa", branch: "Mombasa", position: "Relationship Manager", hireDate: "2019-03-23", salary: 91000, type: "Permanent", status: "Active" },
  { id: "EMP014", name: "Nancy Atieno", branch: "Mombasa", position: "Credit Analyst", hireDate: "2022-06-09", salary: 99000, type: "Permanent", status: "Active" },
  { id: "EMP015", name: "Oscar Maina", branch: "Mombasa", position: "Customer Service Officer", hireDate: "2020-04-25", salary: 55000, type: "Permanent", status: "Active" },
  { id: "EMP016", name: "Patricia Wairimu", branch: "Mombasa", position: "Teller", hireDate: "2021-02-03", salary: 53000, type: "Permanent", status: "Active" },
  { id: "EMP017", name: "Quincy Omondi", branch: "Mombasa", position: "Sales Officer", hireDate: "2022-02-12", salary: 54000, type: "Contract", status: "Active" },
  { id: "EMP018", name: "Ruth Jepkosgei", branch: "Mombasa", position: "Loan Officer", hireDate: "2021-10-09", salary: 63000, type: "Contract", status: "Active" },
  { id: "EMP019", name: "Samuel Karanja", branch: "Mombasa", position: "Accountant", hireDate: "2019-12-15", salary: 104000, type: "Permanent", status: "Active" },
  { id: "EMP020", name: "Teresia Wambui", branch: "Mombasa", position: "Digital Banking Officer", hireDate: "2023-02-13", salary: 90000, type: "Contract", status: "On Leave" },
  { id: "EMP021", name: "Victor Were", branch: "Kisumu", position: "Branch Manager", hireDate: "2019-09-10", salary: 216000, type: "Contract", status: "Active" },
  { id: "EMP022", name: "Winnie Adhiambo", branch: "Kisumu", position: "Operations Officer", hireDate: "2024-10-28", salary: 100000, type: "Permanent", status: "Active" },
  { id: "EMP023", name: "Xavier Kamau", branch: "Kisumu", position: "Relationship Manager", hireDate: "2021-10-07", salary: 111000, type: "Permanent", status: "Active" },
  { id: "EMP024", name: "Yvonne Nyambura", branch: "Kisumu", position: "Credit Analyst", hireDate: "2024-02-02", salary: 117000, type: "Permanent", status: "Active" },
  { id: "EMP025", name: "Zachary Kiprotich", branch: "Kisumu", position: "Customer Service Officer", hireDate: "2024-04-25", salary: 50000, type: "Permanent", status: "Active" },
  { id: "EMP026", name: "Alice Muli", branch: "Kisumu", position: "Teller", hireDate: "2021-02-28", salary: 40000, type: "Permanent", status: "Active" },
  { id: "EMP027", name: "Benard Otieno", branch: "Kisumu", position: "Sales Officer", hireDate: "2020-02-13", salary: 52000, type: "Permanent", status: "Active" },
  { id: "EMP028", name: "Cynthia Wekesa", branch: "Kisumu", position: "Loan Officer", hireDate: "2021-08-21", salary: 76000, type: "Contract", status: "Active" },
  { id: "EMP029", name: "Dennis Kibet", branch: "Kisumu", position: "Accountant", hireDate: "2021-03-12", salary: 104000, type: "Permanent", status: "On Leave" },
  { id: "EMP030", name: "Eunice Mumbi", branch: "Kisumu", position: "Digital Banking Officer", hireDate: "2021-04-22", salary: 80000, type: "Contract", status: "On Leave" },
  { id: "EMP031", name: "Francis Juma", branch: "Nakuru", position: "Branch Manager", hireDate: "2021-12-22", salary: 174000, type: "Permanent", status: "Active" },
  { id: "EMP032", name: "Gladys Akinyi", branch: "Nakuru", position: "Operations Officer", hireDate: "2024-02-20", salary: 112000, type: "Contract", status: "On Leave" },
  { id: "EMP033", name: "Henry Kimani", branch: "Nakuru", position: "Relationship Manager", hireDate: "2024-03-18", salary: 116000, type: "Contract", status: "Active" },
  { id: "EMP034", name: "Isabel Chepkirui", branch: "Nakuru", position: "Credit Analyst", hireDate: "2024-04-06", salary: 86000, type: "Permanent", status: "On Leave" },
  { id: "EMP035", name: "Joseph Ndegwa", branch: "Nakuru", position: "Customer Service Officer", hireDate: "2022-07-09", salary: 71000, type: "Contract", status: "Active" },
  { id: "EMP036", name: "Kelly Anyango", branch: "Nakuru", position: "Teller", hireDate: "2024-12-18", salary: 45000, type: "Permanent", status: "Active" },
  { id: "EMP037", name: "Leonard Muriuki", branch: "Nakuru", position: "Sales Officer", hireDate: "2020-11-11", salary: 67000, type: "Contract", status: "Active" },
  { id: "EMP038", name: "Mercy Wafula", branch: "Nakuru", position: "Loan Officer", hireDate: "2019-04-27", salary: 68000, type: "Permanent", status: "Active" },
  { id: "EMP039", name: "Noah Kiprono", branch: "Nakuru", position: "Accountant", hireDate: "2019-06-13", salary: 99000, type: "Permanent", status: "Active" },
  { id: "EMP040", name: "Olive Wanjiru", branch: "Nakuru", position: "Digital Banking Officer", hireDate: "2021-02-07", salary: 93000, type: "Permanent", status: "Active" },
  { id: "EMP041", name: "Peter Odhiambo", branch: "Nyeri", position: "Branch Manager", hireDate: "2023-12-11", salary: 219000, type: "Permanent", status: "Active" },
  { id: "EMP042", name: "Queen Wambui", branch: "Nyeri", position: "Operations Officer", hireDate: "2020-11-16", salary: 100000, type: "Permanent", status: "On Leave" },
  { id: "EMP043", name: "Robert Kiplagat", branch: "Nyeri", position: "Relationship Manager", hireDate: "2022-11-15", salary: 121000, type: "Contract", status: "Active" },
  { id: "EMP044", name: "Sheila Auma", branch: "Nyeri", position: "Credit Analyst", hireDate: "2020-05-05", salary: 105000, type: "Permanent", status: "Active" },
  { id: "EMP045", name: "Tom Mbugua", branch: "Nyeri", position: "Customer Service Officer", hireDate: "2020-12-18", salary: 60000, type: "Permanent", status: "On Leave" },
  { id: "EMP046", name: "Ursula Chebet", branch: "Nyeri", position: "Teller", hireDate: "2023-05-24", salary: 46000, type: "Contract", status: "Active" },
  { id: "EMP047", name: "Vincent Ochieng", branch: "Nyeri", position: "Sales Officer", hireDate: "2023-07-19", salary: 63000, type: "Contract", status: "Active" },
  { id: "EMP048", name: "Wendy Naliaka", branch: "Nyeri", position: "Loan Officer", hireDate: "2022-06-08", salary: 61000, type: "Contract", status: "Active" },
  { id: "EMP049", name: "Yusuf Abdalla", branch: "Nyeri", position: "Accountant", hireDate: "2020-09-16", salary: 73000, type: "Permanent", status: "Active" },
  { id: "EMP050", name: "Zena Muthoni", branch: "Nyeri", position: "Digital Banking Officer", hireDate: "2019-01-28", salary: 68000, type: "Permanent", status: "On Leave" },
];

export type BranchPerf = {
  branch: string;
  sales: number;
  profit: number;
  target: number;
  payrollBudget: number;
  csat: number;
};

export const branchPerf: BranchPerf[] = [
  { branch: "Nairobi Central", sales: 18500000, profit: 4250000, target: 17500000, payrollBudget: 820000, csat: 948 },
  { branch: "Mombasa", sales: 14800000, profit: 3120000, target: 15000000, payrollBudget: 740000, csat: 955 },
  { branch: "Nakuru", sales: 13900000, profit: 2450000, target: 14500000, payrollBudget: 710000, csat: 834 },
  { branch: "Kisumu", sales: 12600000, profit: 2860000, target: 12000000, payrollBudget: 680000, csat: 860 },
  { branch: "Nyeri", sales: 10900000, profit: 2510000, target: 10500000, payrollBudget: 620000, csat: 950 },
];
