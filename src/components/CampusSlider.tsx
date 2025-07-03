
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CampusSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data dummy logo kampus mitra (gunakan placeholder untuk sekarang)
  const campusLogos = [
    { name: "Universitas Padjadjaran", logo: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Institut Teknologi Bandung", logo: "https://images.unsplash.com/photo-1551805491-6e52bb5c7a95?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Indonesia", logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Gadjah Mada", logo: "https://images.unsplash.com/photo-1540740985333-ac2f3b75e6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Airlangga", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Brawijaya", logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Diponegoro", logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Sebelas Maret", logo: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Universitas Hasanuddin", logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ];

  const totalSlides = Math.ceil(campusLogos.length / 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSlideLogos = () => {
    const start = currentSlide * 6;
    return campusLogos.slice(start, start + 6);
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Kampus Mitra GEKRAFS Jawa Barat
          </h2>
          <p className="text-gray-600">
            Jaringan kolaborasi lintas kampus di Jawa Barat
          </p>
        </div>

        <div className="relative">
          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {getSlideLogos().map((campus, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <img
                    src={campus.logo}
                    alt={campus.name}
                    className="w-12 h-12 object-contain rounded-full"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-800 text-center leading-tight">
                  {campus.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusSlider;
