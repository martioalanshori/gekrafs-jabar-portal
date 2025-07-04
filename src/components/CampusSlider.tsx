import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CampusSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logosPerSlide, setLogosPerSlide] = useState(6);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  const campusLogos = [
    { name: "Universitas Indonesia", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png" },
    { name: "Institut Teknologi Bandung", logo: "https://upload.wikimedia.org/wikipedia/id/9/95/Logo_Institut_Teknologi_Bandung.png" },
    { name: "Universitas Padjajaran", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/8/80/Lambang_Universitas_Padjadjaran.svg/1200px-Lambang_Universitas_Padjadjaran.svg.png" },
    { name: "Universitas Pendidikan Indonesia", logo: "https://upload.wikimedia.org/wikipedia/id/0/09/Logo_Almamater_UPI.svg" },
    { name: "Telkom University", logo: "https://telkomuniversity.ac.id/wp-content/uploads/2019/07/cropped-favicon-2.png" },
    { name: "UIN Sunan Gunung Djati", logo: "https://fst.uinsgd.ac.id/wp-content/uploads/2020/05/cropped-logo-uin.png" },
    { name: "Trisakti", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Trisakti_Logo.svg/1200px-Trisakti_Logo.svg.png" },
    { name: "UNIGA", logo: "https://images.seeklogo.com/logo-png/33/2/universitas-garut-logo-png_seeklogo-339889.png" },
    { name: "Universitas Pasundan", logo: "https://upload.wikimedia.org/wikipedia/id/f/fb/Logo_UNPAS.png" },
    { name: "Digitech UPI", logo: "https://digitechuniversity.kuliahkelaskaryawanstembi.com/wp-content/uploads/2022/11/cropped-Logo-Digitech.png" },
    { name: "Universitas Widyatama", logo: "https://www.widyatama.ac.id/wp-content/uploads/2015/07/widyatama.jpg" },
    { name: "UNISBA", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Lambang-Universitas_Islam_Bandung.png" },
    { name: "Universitas Muhammadiyah Bandung", logo: "https://upload.wikimedia.org/wikipedia/id/3/37/Logo_Universitas_Muhammadiyah_Bandung.png" },
    { name: "UTB", logo: "https://edunitas.id/assets/logo/universitas-teknologi-bandung.png" },
    { name: "IPI Garut", logo: "https://assets.siakadcloud.com/uploads/ipigarut/logoaplikasi/1390.jpg" },
    { name: "UNLA", logo: "https://assets.nsd.co.id/images/kampus/logo/Logo_Universitas_Langlangbuana_Bandung_png_300_dpi.png" },
    { name: "STIE WIKARA", logo: "https://stie-wikara.ac.id/wp-content/uploads/2025/03/logo_stie_wikara_webp.webp" },
    { name: "ITG", logo: "https://assets.nsd.co.id/images/kampus/logo/www_itg_ac_id.png" }
  ];

  // Hitung jumlah logo per slide berdasarkan layar
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setLogosPerSlide(3);
      } else if (width < 1024) {
        setLogosPerSlide(5);
      } else {
        setLogosPerSlide(6);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(campusLogos.length / logosPerSlide);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next >= totalSlides ? 0 : next;
    });
    
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setCurrentSlide((prev) => {
      const next = prev - 1;
      return next < 0 ? totalSlides - 1 : next;
    });
    
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const getSlideLogos = () => {
    const start = currentSlide * logosPerSlide;
    return campusLogos.slice(start, start + logosPerSlide);
  };

  return (
    <div className="bg-white py-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Kampus Mitra GEKRAFS Kampus Jawa Barat
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jaringan kolaborasi lintas kampus di Jawa Barat
          </p>
        </div>

        {/* Wrapper with hover-triggered nav */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={isTransitioning}
            className="p-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="overflow-hidden px-4">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                width: `${totalSlides * 100}%`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {campusLogos
                    .slice(slideIndex * logosPerSlide, (slideIndex + 1) * logosPerSlide)
                    .map((campus, logoIndex) => (
                      <div
                        key={`${slideIndex}-${logoIndex}`}
                        className="basis-1/3 sm:basis-1/5 lg:basis-1/6 flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        title={campus.name}
                      >
                        <img
                          src={campus.logo}
                          alt={campus.name}
                          className="w-full max-w-[100px] h-auto object-contain filter drop-shadow-sm"
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={isTransitioning}
            className="p-2 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? "bg-blue-600 scale-110" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusSlider;