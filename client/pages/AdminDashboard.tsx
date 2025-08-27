import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity,
  Search,
  Bell,
  Settings,
  LogOut,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Gamepad2,
  ShoppingCart,
  UserCheck,
  AlertTriangle,
  Star,
  Filter,
  Eye,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  user: string;
  game: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  type: 'Diamonds' | 'UC' | 'Genesis Crystals' | 'VP' | 'Robux';
}

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  todayTransactions: number;
  activeUsers: number;
  growthRate: number;
  conversionRate: number;
}

const revenueData = [
  { date: 'Aug 21', revenue: 2450000 },
  { date: 'Aug 22', revenue: 2780000 },
  { date: 'Aug 23', revenue: 2290000 },
  { date: 'Aug 24', revenue: 3120000 },
  { date: 'Aug 25', revenue: 2980000 },
  { date: 'Aug 26', revenue: 3450000 },
  { date: 'Aug 27', revenue: 3890000 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [stats] = useState<DashboardStats>({
    totalUsers: 12847,
    totalRevenue: 84729300,
    todayTransactions: 234,
    activeUsers: 1847,
    growthRate: 15.8,
    conversionRate: 23.4
  });

  const [recentTransactions] = useState<Transaction[]>([
    { id: 'TXN101', user: 'Slayer_17', game: 'Mobile Legends', amount: 77000, status: 'completed', timestamp: '3 min ago', type: 'Diamonds' },
    { id: 'TXN102', user: 'NoobMaster69', game: 'PUBG Mobile', amount: 150000, status: 'completed', timestamp: '8 min ago', type: 'UC' },
    { id: 'TXN103', user: 'KeqingLover', game: 'Genshin Impact', amount: 479000, status: 'pending', timestamp: '15 min ago', type: 'Genesis Crystals' },
    { id: 'TXN104', user: 'JettMain', game: 'Valorant', amount: 250000, status: 'completed', timestamp: '22 min ago', type: 'VP' },
    { id: 'TXN105', user: 'OOF_Lord', game: 'Roblox', amount: 125000, status: 'failed', timestamp: '30 min ago', type: 'Robux' },
    { id: 'TXN106', user: 'WannabePro', game: 'Free Fire', amount: 50000, status: 'completed', timestamp: '45 min ago', type: 'Diamonds' },
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'Diamonds': return '💎';
      case 'UC': return '🪙';
      case 'Genesis Crystals': return '✨';
      case 'VP': return '🎯';
      case 'Robux': return 'R$';
      default: return '💰';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, trend, isCurrency = false }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-2xl p-4 sm:p-6 hover:border-blue-500/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-400/20">
          <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400" />
        </div>
        <div className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${ trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10' }`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {change}%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-lg sm:text-2xl font-bold text-white">{isCurrency ? `Rp ${value.toLocaleString()}` : value.toLocaleString()}</p>
        <p className="text-xs sm:text-sm text-gray-400">{title}</p>
      </div>
    </motion.div>
  );

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />
      <div className="fixed top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="fixed bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Mobile Header */}
      <header className="relative z-30 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Gaming Admin</h1>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Dashboard Control</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="pl-10 w-48 lg:w-64 bg-gray-800/50 border-gray-700/50 text-white" 
              />
            </div>
            
            {/* Mobile Search Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-4 h-4 text-gray-400" />
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{notifications}</span>
              )}
            </Button>
            
            {/* Desktop Nav Items */}
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm"><Settings className="w-5 h-5 text-gray-400" /></Button>
              <Button variant="ghost" size="sm"><LogOut className="w-5 h-5 text-gray-400" /></Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="sm:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-20 border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-xl sm:hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-10 w-full bg-gray-800/50 border-gray-700/50 text-white" 
                />
              </div>
              
              {/* Mobile Navigation Items */}
              {navigationItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 py-3 px-3 rounded-lg transition-all duration-300 ${
                    activeTab === id 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              
              {/* Mobile Menu Items */}
              <div className="pt-3 border-t border-gray-800/50 space-y-1">
                <button className="w-full flex items-center space-x-3 py-3 px-3 text-gray-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 py-3 px-3 text-gray-400 hover:text-white">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <nav className="relative z-10 border-b border-gray-800/50 bg-gray-900/20 backdrop-blur-sm hidden sm:block">
        <div className="flex space-x-4 lg:space-x-8 px-4 sm:px-6 overflow-x-auto">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === id 
                  ? 'border-blue-500 text-white' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium text-sm lg:text-base">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="relative z-10 p-3 sm:p-4 lg:p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                <StatCard title="Total Users" value={stats.totalUsers} change={stats.growthRate} icon={Users} trend="up" />
                <StatCard title="Total Revenue" value={stats.totalRevenue} change={12.5} icon={DollarSign} trend="up" isCurrency={true} />
                <StatCard title="Today's Transactions" value={stats.todayTransactions} change={8.3} icon={ShoppingCart} trend="up" />
                <StatCard title="Active Users" value={stats.activeUsers} change={-2.1} icon={UserCheck} trend="down" />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Revenue Chart */}
                <div className="xl:col-span-2">
                  <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-3 sm:pb-4">
                      <CardTitle className="text-white flex items-center justify-between text-base sm:text-lg">
                        Revenue Overview
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ChartContainer
                        config={{
                          revenue: { label: "Revenue", color: "#8b5cf6" }
                        }}
                        className="h-48 sm:h-64 w-full"
                      >
                        <ResponsiveContainer>
                          <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                            <XAxis 
                              dataKey="date" 
                              stroke="rgba(255, 255, 255, 0.7)" 
                              fontSize={10}
                              tick={{ fontSize: 10 }}
                            />
                            <YAxis 
                              stroke="rgba(255, 255, 255, 0.7)" 
                              fontSize={10}
                              tick={{ fontSize: 10 }}
                              tickFormatter={(value) => `${Number(value) / 1000000}M`}
                            />
                            <Tooltip
                              content={
                                <ChartTooltipContent
                                  formatter={(value) => [`Rp ${Number(value).toLocaleString()}`, "Revenue"]}
                                  className="bg-gray-800/90 backdrop-blur-sm text-white border-gray-700 text-xs"
                                />
                              }
                            />
                            <Line
                              type="monotone"
                              dataKey="revenue"
                              stroke="var(--color-revenue)"
                              strokeWidth={2}
                              dot={{ fill: "var(--color-revenue)", r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-base sm:text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-green-500/10">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-white">Conversion Rate</p>
                            <p className="text-xs text-gray-400">This month</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white text-sm sm:text-base">{stats.conversionRate}%</p>
                          <p className="text-xs text-green-400">+2.3%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10">
                            <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-white">Top Game</p>
                            <p className="text-xs text-gray-400">Most Popular</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white text-sm sm:text-base">Genshin Impact</p>
                          <p className="text-xs text-blue-400">+1.2k plays</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-red-500/10">
                            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-white">Failed Transactions</p>
                            <p className="text-xs text-gray-400">Today</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white text-sm sm:text-base">12</p>
                          <p className="text-xs text-red-400">-0.8%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Transactions */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <CardTitle className="text-white text-base sm:text-lg">Recent Transactions</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                        <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Filter
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        View All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {recentTransactions.map((transaction, index) => (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700/30"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                          <div className="text-lg sm:text-2xl flex-shrink-0">{getTypeIcon(transaction.type)}</div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white text-sm sm:text-base truncate">{transaction.user}</p>
                            <p className="text-xs sm:text-sm text-gray-400 truncate">{transaction.game}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                          <div className="text-right">
                            <p className="font-semibold text-white text-xs sm:text-sm">
                              Rp {transaction.amount.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400 hidden sm:block">{transaction.timestamp}</p>
                          </div>
                          
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            <span className="hidden sm:inline">{transaction.status}</span>
                            <span className="sm:hidden">
                              {transaction.status === 'completed' ? '✓' : transaction.status === 'pending' ? '⏳' : '✗'}
                            </span>
                          </span>
                          
                          <Button variant="ghost" size="sm" className="hidden sm:flex">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab !== 'overview' && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-center h-64 sm:h-96"
            >
              <div className="text-center px-4">
                <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page
                </h3>
                <p className="text-sm sm:text-base text-gray-400">This section is under development</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}