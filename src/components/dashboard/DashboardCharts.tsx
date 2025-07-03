
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface DashboardChartsProps {
  monthlyData: Array<{
    month: string;
    articles: number;
    products: number;
    orders: number;
  }>;
  ordersByStatus: Array<{
    status: string;
    count: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardCharts = ({ monthlyData, ordersByStatus }: DashboardChartsProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Performance Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Performa Bulanan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="articles" fill="#3B82F6" name="Artikel" />
            <Bar dataKey="products" fill="#10B981" name="Produk" />
            <Bar dataKey="orders" fill="#F59E0B" name="Pesanan" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Status Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Status Pesanan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ordersByStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ status, count, percent }) => `${status}: ${count} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {ordersByStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Trend */}
      <div className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Tren Pertumbuhan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="articles" stroke="#3B82F6" strokeWidth={2} name="Artikel" />
            <Line type="monotone" dataKey="products" stroke="#10B981" strokeWidth={2} name="Produk" />
            <Line type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} name="Pesanan" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
