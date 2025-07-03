
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleMapsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Kantor Sekretariat GEKRAFS
          </h2>
          <p className="text-xl text-gray-600">
            Kunjungi kantor sekretariat kami di Bandung, Jawa Barat
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span>Alamat Sekretariat</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Alamat Lengkap:</h4>
                <p className="text-gray-600 leading-relaxed">
                  Jl. Dipati Ukur No. 35, Lebak Gede, Coblong, 
                  Kota Bandung, Jawa Barat 40132
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Jam Operasional:</h4>
                <p className="text-gray-600">Senin - Jumat: 08.00 - 17.00 WIB</p>
                <p className="text-gray-600">Sabtu: 08.00 - 12.00 WIB</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Kontak:</h4>
                <p className="text-gray-600">Email: info@gekrafs-jabar.org</p>
                <p className="text-gray-600">Telepon: +62 812 3456 7890</p>
              </div>
            </CardContent>
          </Card>

          {/* Google Maps Embed */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798475095945!2d107.61701997477308!3d-6.914744467959552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e9%3A0x3c2ca0d1f90e5e3b!2sGedung%20Sate!5e0!3m2!1sen!2sid!4v1699123456789!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor Sekretariat GEKRAFS Jawa Barat"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapsSection;
