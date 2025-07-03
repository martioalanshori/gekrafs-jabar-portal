
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Building, Star } from "lucide-react";

const OrganizationStats = () => {
  const stats = [
    {
      icon: MapPin,
      number: "27",
      label: "Kota Kabupaten",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Building,
      number: "17",
      label: "Kampus Mitra",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      number: "30",
      label: "Anggota Kepengurusan Aktif",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Star,
      number: "4",
      label: "Program Unggulan",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            GEKRAFS dalam Angka
          </h2>
          <p className="text-xl text-gray-600">
            Jejak dan pencapaian organisasi kami di Jawa Barat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-xl border-0 bg-white text-center hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrganizationStats;
