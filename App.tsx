
import React, { useState, useEffect, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  Navigate
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListOrdered, 
  Target, 
  TrendingUp, 
  Plus, 
  X,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PiggyBank,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  LogOut,
  User
} from 'lucide-react';
import { 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RPieChart,
  Pie
} from 'recharts';

import { Transaction, TransactionCategory, CategoryBudget, SavingsGoal } from './types';
import { Card } from './components/Card';
import { StatBox } from './components/StatBox';

// --- CONSTANTS ---
const CATEGORIES: TransactionCategory[] = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Income', 'Other'];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b', '#06b6d4'];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2024-05-01', description: 'Monthly Salary', amount: 850000, category: 'Income', type: 'income' },
  { id: '2', date: '2024-05-02', description: 'House Rent', amount: 250000, category: 'Other', type: 'expense' },
  { id: '3', date: '2024-05-05', description: 'Simba Supermarket', amount: 45000, category: 'Food', type: 'expense' },
  { id: '4', date: '2024-05-06', description: 'Canal+ Subscription', amount: 25000, category: 'Entertainment', type: 'expense' },
];

const INITIAL_BUDGETS: CategoryBudget[] = [
  { category: 'Food', limit: 150000 },
  { category: 'Transport', limit: 50000 },
  { category: 'Entertainment', limit: 80000 },
  { category: 'Shopping', limit: 100000 },
];

const INITIAL_GOALS: SavingsGoal[] = [
  { id: 'g1', name: 'Emergency Fund', targetAmount: 2000000, currentAmount: 450000, icon: '🛡️' },
  { id: 'g2', name: 'New Laptop', targetAmount: 1200000, currentAmount: 300000, icon: '💻' },
];

// --- AUTH COMPONENT ---

const AuthScreen = ({ onLogin }: { onLogin: (user: string) => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!isLogin) {
      const users = JSON.parse(localStorage.getItem('app_users') || '{}');
      users[email] = { name, password };
      localStorage.setItem('app_users', JSON.stringify(users));
      onLogin(name);
    } else {
      const users = JSON.parse(localStorage.getItem('app_users') || '{}');
      const user = users[email];
      if (user && user.password === password) {
        onLogin(user.name);
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-300">
      <Card className="w-full max-w-md shadow-2xl border-2 border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-200 dark:shadow-none">
            <TrendingUp size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">FinanceFlow</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            {isLogin ? 'Manage your money with confidence' : 'Create your account to start tracking'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-rose-500 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none mt-2"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isLogin ? "New to FinanceFlow? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </Card>
    </div>
  );
};

// --- COMPONENTS ---

const Navigation = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/transactions', label: 'History', icon: <ListOrdered size={20} /> },
    { to: '/goals', label: 'Budgets & Goals', icon: <Target size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:static lg:block bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-slate-800 lg:w-64 lg:min-h-screen z-50 transition-colors duration-300">
      <div className="p-4 hidden lg:flex items-center gap-2 mb-8">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <TrendingUp size={24} />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">FinanceFlow</h1>
      </div>
      <div className="flex lg:flex-col h-full lg:h-[calc(100%-80px)]">
        <ul className="flex lg:flex-col justify-around lg:justify-start p-2 lg:p-4 w-full">
          {links.map((link) => (
            <li key={link.to} className="w-full lg:mb-1">
              <Link
                to={link.to}
                className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-3 p-3 rounded-xl transition-all ${
                  location.pathname === link.to
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                {link.icon}
                <span className="text-[10px] lg:text-sm">{link.label}</span>
              </Link>
            </li>
          ))}
          <li className="w-full lg:hidden">
            <button
              onClick={onLogout}
              className="flex flex-col items-center gap-1 p-3 rounded-xl text-rose-600 dark:text-rose-400 transition-all active:scale-95"
            >
              <LogOut size={20} />
              <span className="text-[10px]">Log Out</span>
            </button>
          </li>
        </ul>
        <div className="mt-auto p-4 hidden lg:block">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 p-3 w-full rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 border border-rose-100 dark:border-rose-900/40 transition-all font-semibold"
          >
            <LogOut size={20} />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const TransactionModal = ({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (t: Transaction) => void }) => {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('Food');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;
    onAdd({
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      description: desc,
      amount: parseFloat(amount),
      category,
      type
    });
    setDesc('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200 shadow-2xl" title="New Transaction">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <input 
              type="text" 
              value={desc} 
              onChange={e => setDesc(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              placeholder="e.g. Weekly Groceries"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount (RWF)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value as 'income' | 'expense')}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value as TransactionCategory)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md shadow-blue-200 dark:shadow-none"
            >
              Add Entry
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const Dashboard = ({ transactions }: { transactions: Transaction[] }) => {
  const stats = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expenses;
    
    const categories = transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(categories).map(([name, value]) => ({ name, value }));
    const recent = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    return { income, expenses, balance, pieData, recent };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Current Balance" value={`${stats.balance.toLocaleString()} RWF`} subtext="Total Savings" color="blue" />
        <StatBox label="Monthly Income" value={`${stats.income.toLocaleString()} RWF`} subtext="From all sources" color="green" />
        <StatBox label="Total Expenses" value={`${stats.expenses.toLocaleString()} RWF`} subtext="This month" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Spending Breakdown" icon={<PieChart size={20} />}>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RPieChart>
                <Pie
                  data={stats.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toLocaleString()} RWF`, 'Spent']}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
                    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b'
                  }}
                  itemStyle={{ color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b' }}
                />
              </RPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {stats.pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                <span>{d.name}: <span className="font-semibold text-slate-800 dark:text-slate-200">{d.value.toLocaleString()} RWF</span></span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Transactions" icon={<ListOrdered size={20} />}>
          <div className="space-y-4">
            {stats.recent.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${t.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    {t.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{t.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.date} • {t.category}</p>
                  </div>
                </div>
                <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} RWF
                </p>
              </div>
            ))}
            <Link to="/transactions" className="block text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 transition-colors">
              View All Transactions
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Transactions = ({ transactions, onDelete }: { transactions: Transaction[], onDelete: (id: string) => void }) => {
  return (
    <Card title="Transaction History" icon={<ListOrdered size={20} />}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 px-2">Date</th>
              <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 px-2">Description</th>
              <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 px-2">Category</th>
              <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 px-2 text-right">Amount</th>
              <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(t => (
              <tr key={t.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <td className="py-4 text-sm text-slate-500 dark:text-slate-400 px-2">{t.date}</td>
                <td className="py-4 px-2">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{t.description}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${t.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    {t.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 text-sm text-slate-600 dark:text-slate-400 px-2">
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md text-xs font-medium">
                    {t.category}
                  </span>
                </td>
                <td className={`py-4 text-sm font-bold text-right px-2 ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} RWF
                </td>
                <td className="py-4 text-right px-2">
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-slate-400 hover:text-rose-600 dark:text-slate-600 dark:hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const GoalsAndBudgets = ({ transactions, budgets, savingsGoals, onUpdateBudget, onUpdateGoal, onAddGoal }: { 
  transactions: Transaction[], 
  budgets: CategoryBudget[], 
  savingsGoals: SavingsGoal[],
  onUpdateBudget: (cat: TransactionCategory, val: number) => void,
  onUpdateGoal: (id: string, current: number) => void,
  onAddGoal: (goal: SavingsGoal) => void
}) => {
  const spendingByCategory = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.type === 'expense') {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [transactions]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Wallet size={20} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Monthly Budgets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATEGORIES.filter(cat => cat !== 'Income').map(cat => {
            const budget = budgets.find(b => b.category === cat)?.limit || 0;
            const spent = spendingByCategory[cat] || 0;
            const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
            const isOver = spent > budget && budget > 0;

            return (
              <Card key={cat} className="relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{cat}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Target: {budget.toLocaleString()} RWF</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isOver ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-100'}`}>
                      {spent.toLocaleString()} RWF
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Spent so far</p>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${isOver ? 'bg-rose-500' : 'bg-blue-500'}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isOver ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`}>
                    {isOver ? 'OVER BUDGET' : 'ON TRACK'}
                  </span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number"
                      placeholder="Set limit"
                      className="w-24 text-xs p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded outline-none focus:ring-1 focus:ring-blue-500 dark:text-white"
                      onChange={(e) => onUpdateBudget(cat, parseFloat(e.target.value) || 0)}
                      value={budget === 0 ? '' : budget}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white">
              <PiggyBank size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Savings Goals</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const isCompleted = goal.currentAmount >= goal.targetAmount;

            return (
              <Card key={goal.id} className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{goal.icon}</div>
                  {isCompleted && <CheckCircle2 className="text-emerald-500" size={24} />}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">{goal.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Target: {goal.targetAmount.toLocaleString()} RWF</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    <span>{Math.round(progress)}%</span>
                    <span>{goal.currentAmount.toLocaleString()} RWF</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 bg-emerald-500`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <input 
                      type="number"
                      placeholder="+ Add saved"
                      className="flex-1 text-xs p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded outline-none dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = parseFloat((e.target as HTMLInputElement).value) || 0;
                          onUpdateGoal(goal.id, goal.currentAmount + val);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
          
          <button 
            onClick={() => {
              const name = prompt('Goal name?');
              const target = prompt('Target amount (RWF)?');
              if (name && target) {
                onAddGoal({
                  id: Math.random().toString(36).substr(2, 9),
                  name,
                  targetAmount: parseFloat(target),
                  currentAmount: 0,
                  icon: '🎯'
                });
              }
            }}
            className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 hover:border-blue-400 dark:hover:border-blue-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all group"
          >
            <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">New Savings Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const AppContent = () => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem('finance_flow_user'));
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finance_flow_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<CategoryBudget[]>(() => {
    const saved = localStorage.getItem('finance_flow_budgets');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });

  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem('finance_flow_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('finance_flow_user', user);
    } else {
      localStorage.removeItem('finance_flow_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('finance_flow_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance_flow_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('finance_flow_goals', JSON.stringify(savingsGoals));
  }, [savingsGoals]);

  const addTransaction = (t: Transaction) => setTransactions(prev => [t, ...prev]);
  const deleteTransaction = (id: string) => setTransactions(prev => prev.filter(t => t.id !== id));
  
  const updateBudget = (cat: TransactionCategory, limit: number) => {
    setBudgets(prev => {
      const exists = prev.find(b => b.category === cat);
      if (exists) return prev.map(b => b.category === cat ? { ...b, limit } : b);
      return [...prev, { category: cat, limit }];
    });
  };

  const updateGoal = (id: string, currentAmount: number) => {
    setSavingsGoals(prev => prev.map(g => g.id === id ? { ...g, currentAmount } : g));
  };

  const addGoal = (goal: SavingsGoal) => {
    setSavingsGoals(prev => [...prev, goal]);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthScreen onLogin={(name) => setUser(name)} />;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 lg:pb-0 transition-colors duration-300">
      <Navigation onLogout={handleLogout} />
      
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 items-center justify-center text-blue-600 dark:text-blue-400">
               <User size={20} />
             </div>
             <div>
               <p className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Hello, {user}</p>
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Finance Dashboard</h2>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
            >
              <Plus size={20} />
              <span className="inline">Add Entry</span>
            </button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard transactions={transactions} />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} onDelete={deleteTransaction} />} />
          <Route path="/goals" element={
            <GoalsAndBudgets 
              transactions={transactions} 
              budgets={budgets} 
              savingsGoals={savingsGoals} 
              onUpdateBudget={updateBudget} 
              onUpdateGoal={updateGoal}
              onAddGoal={addGoal}
            />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addTransaction} 
      />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
