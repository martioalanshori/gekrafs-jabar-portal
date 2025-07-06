import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, ShoppingBag, FileText, Calendar } from "lucide-react";
import DashboardCharts from "@/components/dashboard/DashboardCharts";

interface DashboardOverviewProps {
  user: any;
  profile: any;
  stats: any;
  statsLoading: boolean;
  error: string | null;
  isSuperAdmin: boolean;
}

const DashboardOverview = ({ user, profile, stats, statsLoading, error, isSuperAdmin }: DashboardOverviewProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Selamat datang, {profile?.full_name || user.email}
        </p>
        {error && (
          <p className="text-red-600 text-sm mt-2">
            Error: {error}. Data mungkin tidak akurat.
          </p>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
        {isSuperAdmin && (
          <Card className="shadow-lg hover-lift smooth-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    +{stats.activeAccounts} akun aktif
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        )}
        
        <Card className="shadow-lg hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artikel</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalArticles}</div>
                <p className="text-xs text-muted-foreground">
                  Artikel yang dikelola
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produk</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Produk tersedia
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pesanan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Pesanan masuk
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover-lift smooth-transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booking Meeting</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.bookingMeetings}</div>
                <p className="text-xs text-muted-foreground">
                  Pesan kontak
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {isSuperAdmin && (
          <Card className="shadow-lg hover-lift smooth-transition">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Akun Aktif</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stats.activeAccounts}</div>
                  <p className="text-xs text-muted-foreground">
                    Pengguna aktif bulan ini
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts */}
      {isSuperAdmin && !statsLoading && (
        <DashboardCharts 
          monthlyData={stats.monthlyData}
          ordersByStatus={stats.ordersByStatus}
        />
      )}
    </div>
  );
};

export default DashboardOverview;