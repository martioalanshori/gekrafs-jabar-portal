import { useEffect, useRef } from "react";

const LogoSlider = () => {
  const logosRef = useRef<HTMLDivElement>(null);

  const logos = [
    { name: "Universitas Indonesia", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png" },
    { name: "Institut Teknologi Bandung", logo: "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png" },
    { name: "Universitas Padjajaran", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/8/80/Lambang_Universitas_Padjadjaran.svg/1200px-Lambang_Universitas_Padjadjaran.svg.png" },
    { name: "Universitas Pendidikan Indonesia", logo: "https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg" },
    { name: "Telkom University", logo: "https://telkomuniversity.ac.id/wp-content/uploads/2019/07/cropped-favicon-2.png" },
    { name: "UIN Sunan Gunung Djati", logo: "https://fst.uinsgd.ac.id/wp-content/uploads/2020/05/cropped-logo-uin.png" },
    { name: "UNIGA", logo: "https://images.seeklogo.com/logo-png/33/2/universitas-garut-logo-png_seeklogo-339889.png" },
    { name: "Universitas Pasundan", logo: "https://upload.wikimedia.org/wikipedia/id/f/fb/Logo_UNPAS.png" },
    { name: "Digitech", logo: "https://digitechuniversity.kuliahkelaskaryawanstembi.com/wp-content/uploads/2022/11/cropped-Logo-Digitech.png" },
    { name: "Universitas Widyatama", logo: "https://www.widyatama.ac.id/wp-content/uploads/2015/07/widyatama.jpg" },
    { name: "UNISBA", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Lambang-Universitas_Islam_Bandung.png" },
    { name: "Universitas Muhammadiyah Bandung", logo: "https://upload.wikimedia.org/wikipedia/id/3/37/Logo_Universitas_Muhammadiyah_Bandung.png" },
    { name: "UTB", logo: "https://edunitas.id/assets/logo/universitas-teknologi-bandung.png" },
    { name: "IPI Garut", logo: "https://assets.siakadcloud.com/uploads/ipigarut/logoaplikasi/1390.jpg" },
    { name: "UNLA", logo: "https://assets.nsd.co.id/images/kampus/logo/Logo_Universitas_Langlangbuana_Bandung_png_300_dpi.png" },
    { name: "STIE WIKARA", logo: "https://akupintar.id/documents/20143/0/Sekolah_Tinggi_Ilmu_Ekonomi_Wibawa_Karta_Raharja.png/68d6c52a-c1e2-725a-4dee-a72b83bafcbd?version=1.0&t=1539614888828&imagePreview=1" },
    { name: "ITG", logo: "https://assets.nsd.co.id/images/kampus/logo/www_itg_ac_id.png" }
  ];

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Kampus Mitra
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Lebih dari 15+ mitra kampus yang tersebar di Jawa Barat.
          </p>
        </div>

        {/* Infinite Logo Carousel */}
        <div className="relative overflow-hidden bg-white">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Logo container with infinite scroll */}
          <div className="logo-slider-container">
            <div className="logo-slider-track">
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`first-${logo.name}-${index}`}
                  className="logo-slider-item"
                  title={logo.name}
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              
              {/* Duplicate set for seamless infinite scroll */}
              {logos.map((logo, index) => (
                <div
                  key={`second-${logo.name}-${index}`}
                  className="logo-slider-item"
                  title={logo.name}
                >
                  <img
                    src={logo.logo}
                    alt={logo.name}
                    className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS Animation */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .logo-slider-container {
              width: 100%;
              overflow: hidden;
              position: relative;
            }
            
            .logo-slider-track {
              display: flex;
              align-items: center;
              animation: scroll 30s linear infinite;
              width: max-content;
            }
            
            .logo-slider-item {
              flex-shrink: 0;
              margin: 0 1.5rem;
              padding: 0 1rem;
            }
            
            @media (min-width: 640px) {
              .logo-slider-item {
                margin: 0 2rem;
              }
            }
            
            @media (min-width: 768px) {
              .logo-slider-item {
                margin: 0 2.5rem;
              }
            }
            
            @media (min-width: 1024px) {
              .logo-slider-item {
                margin: 0 3rem;
              }
            }
            
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
          `
        }} />
      </div>
    </div>
  );
};

export default LogoSlider;