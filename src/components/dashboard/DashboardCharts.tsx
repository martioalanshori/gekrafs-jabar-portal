
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Performance Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Performa Bulanan</h3>
        <p className="text-xs text-gray-500 mb-2">Grafik ini menunjukkan jumlah artikel, produk, dan pesanan yang tercatat setiap bulan.</p>
        <div className="w-[340px] sm:w-full">
          {(!monthlyData || monthlyData.length === 0) ? (
            <div className="text-center text-gray-400 py-8 sm:py-12">Belum ada data untuk ditampilkan.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip formatter={(value, name) => [
                  `${value}`,
                  typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : String(name)
                ]} />
                <Legend />
                <Bar dataKey="articles" fill="#3B82F6" name="Artikel" />
                <Bar dataKey="products" fill="#10B981" name="Produk" />
                <Bar dataKey="orders" fill="#F59E0B" name="Pesanan" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Orders Status Distribution */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Status Pesanan</h3>
        <p className="text-xs text-gray-500 mb-2">Distribusi status pesanan (pending, processing, completed, cancelled) dari seluruh pesanan yang tercatat.</p>
        <div className="w-[340px] sm:w-full">
          {(!ordersByStatus || ordersByStatus.length === 0) ? (
            <div className="text-center text-gray-400 py-8 sm:py-12">Tidak tersedia data pesanan.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
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
                <Tooltip formatter={(value, name) => [
                  `${value}`,
                  typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : String(name)
                ]} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Growth Trend */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg lg:col-span-2 overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Tren Pertumbuhan</h3>
        <p className="text-xs text-gray-500 mb-2">Grafik tren pertumbuhan artikel, produk, dan pesanan dari waktu ke waktu.</p>
        <div className="w-[340px] sm:w-full">
          {(!monthlyData || monthlyData.length === 0) ? (
            <div className="text-center text-gray-400 py-8 sm:py-12">Belum ada data tren pertumbuhan.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip formatter={(value, name) => [
                  `${value}`,
                  typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : String(name)
                ]} />
                <Legend />
                <Line type="monotone" dataKey="articles" stroke="#3B82F6" strokeWidth={2} name="Artikel" />
                <Line type="monotone" dataKey="products" stroke="#10B981" strokeWidth={2} name="Produk" />
                <Line type="monotone" dataKey="orders" stroke="#F59E0B" strokeWidth={2} name="Pesanan" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
