
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GoogleMapsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Alamat Perusahaan Kami
          </h2>
          <p className="text-xl text-gray-600">
            Kunjungi kantor sekretariat kami di Kota Bandung Jawa Barat
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span>Alamat Perusahaan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Alamat Lengkap:</h4>
                <p className="text-gray-600 leading-relaxed">
                Jl. Diponegoro No.22, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Jam Operasional:</h4>
                <p className="text-gray-600">Senin - Jumat: 08.00 - 17.00 WIB</p>
                <p className="text-gray-600">Sabtu: 08.00 - 12.00 WIB</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Kontak:</h4>
                <p className="text-gray-600">Email: gekrafskampusjabar@gmail.com</p>
                <p className="text-gray-600">Telepon: +62 822 1899 2356</p>
              </div>
            </CardContent>
          </Card>

          {/* Google Maps Embed */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9007507631386!2d107.6187018!3d-6.9024715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x37be7ac9d575f7ed!2sGedung%20Sate!5e0!3m2!1sen!2sid!4v1752861364557!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kantor GEKRAFS Kampus Jabart"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapsSection;
