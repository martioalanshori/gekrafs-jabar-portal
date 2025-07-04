import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Building2, Mail, Phone, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Kepengurusan = () => {
  const organisasiData = {
    ExecutiveBoard: [
      {
        nama: "Elvan Syah Muharam",
        jabatan: "Presidium",
        kampus: "Universitas Garut",
        email: "presidium1@gekrafs-jabar.org",
        photo: "assets/img/kepengurusan/elvan.png",
        socials: {
          facebook: "https://facebook.com/ahmadrizki",
          instagram: "https://instagram.com/ahmadrizki",
          linkedin: "https://linkedin.com/in/ahmadrizki",
          x: "https://x.com/ahmadrizki"
        }
      },
      {
        nama: "Estella Aldina",
        jabatan: "Presidium II",
        kampus: "Universitas Pendidikan Indonesia",
        email: "presidium2@gekrafs-jabar.org",
        phone: "+62 812 3456 7891",
        photo: "assets/img/kepengurusan/estel.png",
        socials: {
          facebook: "https://facebook.com/mayasari",
          instagram: "https://instagram.com/mayasari",
          linkedin: "https://linkedin.com/in/mayasari",
          x: "https://x.com/mayasari"
        }
      },
      {
        nama: "Ahmad Ghozin Abdil Aziz",
        jabatan: "Presidium III",
        kampus: "UIN Sunan Gunung Djati Bandung",
        email: "presidium3@gekrafs-jabar.org",
        phone: "+62 812 3456 7892",
        photo: "assets/img/kepengurusan/ozin.png",
        socials: {
          facebook: "https://facebook.com/indrafirman",
          instagram: "https://instagram.com/indrafirman",
          linkedin: "https://linkedin.com/in/indrafirman",
          x: "https://x.com/indrafirman"
        }
      },
      {
        nama: "Usamah Husnun Daudi",
        jabatan: "Presidium IV",
        kampus: "Universitas Padjajaran",
        email: "presidium4@gekrafs-jabar.org",
        phone: "+62 812 3456 7893",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        socials: {
          facebook: "https://facebook.com/raniaputri",
          instagram: "https://instagram.com/raniaputri",
          linkedin: "https://linkedin.com/in/raniaputri",
          x: "https://x.com/raniaputri"
        }
      },
      {
        nama: "Syafa Najla Ullaya",
        jabatan: "Presidium V",
        kampus: "Universitas Padjajaran",
        email: "presidium5@gekrafs-jabar.org",
        phone: "+62 812 3456 7894",
        photo: "assets/img/kepengurusan/syaira.png",
        socials: {
          facebook: "https://facebook.com/dimasaditya",
          instagram: "https://instagram.com/dimasaditya",
          linkedin: "https://linkedin.com/in/dimasaditya",
          x: "https://x.com/dimasaditya"
        }
      }
    ],
    managementBoard: [
      {
        nama: "Ari Ramdani",
        jabatan: "Sekretaris Umum",
        kampus: "Sekolah Tinggi Ilmu Ekonomi Yasa Anggana Garut",
        email: "sekretaris1@gekrafs-jabar.org",
        phone: "+62 812 3456 7891",
        photo: "assets/img/kepengurusan/ari.png",
        socials: {
          facebook: "https://facebook.com/sitinurhaliza",
          instagram: "https://instagram.com/sitinurhaliza",
          linkedin: "https://linkedin.com/in/sitinurhaliza",
          x: "https://x.com/sitinurhaliza"
        }
      },
      {
        nama: "Ghiyats Adatul Fawwaz",
        jabatan: "Wakil Sekertaris I",
        kampus: "Universitas Garut",
        email: "sekretaris2@gekrafs-jabar.org",
        phone: "+62 812 3456 7892",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        socials: {
          facebook: "https://facebook.com/budisantoso",
          instagram: "https://instagram.com/budisantoso",
          linkedin: "https://linkedin.com/in/budisantoso",
          x: "https://x.com/budisantoso"
        }
      },
      {
        nama: "Azra Teapha Fellica",
        jabatan: "Wakil Sekretaris II",
        kampus: "Universitas Telkom",
        email: "sekretaris3@gekrafs-jabar.org",
        phone: "+62 812 3456 7895",
        photo: "assets/img/kepengurusan/azra.png",
        socials: {
          facebook: "https://facebook.com/rinakusuma",
          instagram: "https://instagram.com/rinakusuma",
          linkedin: "https://linkedin.com/in/rinakusuma",
          x: "https://x.com/rinakusuma"
        }
      },
      {
        nama: "Syaira Bilqis Zahra Nazira",
        jabatan: "Bendahara Umum",
        kampus: "Universitas Widyatama",
        email: "bendahara1@gekrafs-jabar.org",
        phone: "+62 812 3456 7893",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        socials: {
          facebook: "https://facebook.com/dewilestari",
          instagram: "https://instagram.com/dewilestari",
          linkedin: "https://linkedin.com/in/dewilestari",
          x: "https://x.com/dewilestari"
        }
      },
      {
        nama: "Deya Adinda Wusantika Rasidi",
        jabatan: "Wakil Bendahara I",
        kampus: "Institut Teknologi Nasional",
        email: "bendahara2@gekrafs-jabar.org",
        phone: "+62 812 3456 7894",
        photo: "assets/img/kepengurusan/deya.png",
        socials: {
          facebook: "https://facebook.com/agussetiawan",
          instagram: "https://instagram.com/agussetiawan",
          linkedin: "https://linkedin.com/in/agussetiawan",
          x: "https://x.com/agussetiawan"
        }
      }
    ],
  bidang: [
    {
      nama: "Bidang 1 (Periklanan, Penerbitan dan Desain Produk)",
      anggota: [
        {
          nama: "Ketua Bidang 2",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Indonesia",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    },
    {
      nama: "Bidang 2 (Film, Animasi, Video, Televisi, Radio, dan Fotografi)",
      anggota: [
        {
          nama: "Ibnu Mucharror",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Digitech",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "assets/img/kepengurusan/ibnu.png",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Husein",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    },
    {
      nama: "Bidang 3 (Arsitektur, Desain Interior, Dan Seni Rupa)",
      anggota: [
        {
          nama: "Ketua Bidang 2",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Indonesia",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    },
    {
      nama: "Bidang 4 (Kuliner)",
      anggota: [
        {
          nama: "Ketua Bidang 2",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Indonesia",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    },
    {
      nama: "Bidang 5 (Fesyen)",
      anggota: [
        {
          nama: "Ketua Bidang 2",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Indonesia",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    },
    {
      nama: "Bidang 6 (Aplikasi & Pengembangan Permainan)",
      anggota: [
        {
          nama: "Muhammad Martio Alanshori",
          jabatan: "Ketua Bidang 6",
          kampus: "Universitas Teknologi Bandung",
          email: "martioala",
          phone: "+62 812 3456 7891",
          photo: "assets/img/kepengurusan/martio.png",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/martio.alan",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        }
      ]
    },
    {
      nama: "Bidang 7 (Musik & Seni Pertunjukan)",
      anggota: [
        {
          nama: "Ketua Bidang 2",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Indonesia",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    },
    {
      nama: "Bidang 8 (Desain Komunikasi Visual)",
      anggota: [
        {
          nama: "Ketua Bidang 2",
          jabatan: "Ketua Bidang 2",
          kampus: "Universitas Indonesia",
          email: "ketua.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 7891",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/ketua.bidang2",
            instagram: "https://instagram.com/ketua.bidang2",
            linkedin: "https://linkedin.com/in/ketua.bidang2",
            x: "https://x.com/ketua.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
        {
          nama: "Anggota 3 Bidang 2",
          jabatan: "Anggota Bidang 2",
          kampus: "Universitas Pendidikan Indonesia",
          email: "anggota3.bidang2@gekrafs-jabar.org",
          phone: "+62 812 3456 8191",
          photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          socials: {
            facebook: "https://facebook.com/anggota3.bidang2",
            instagram: "https://instagram.com/anggota3.bidang2",
            linkedin: "https://linkedin.com/in/anggota3.bidang2",
            x: "https://x.com/anggota3.bidang2"
          }
        },
      ]
    }
  ]
};
  const renderPersonCard = (person: any) => (
<Card key={person.nama} className="shadow-xl border-0 bg-white hover:shadow-2xl transition-shadow duration-300">
  <CardHeader className="text-center pb-4">
    <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
      <img 
        src={person.photo} 
        alt={person.nama}
        className="w-full h-full object-cover"
      />
    </div>
    <CardTitle className="text-xl text-gray-800">{person.nama}</CardTitle>
    <p className="text-blue-600 font-semibold">{person.jabatan}</p>
    <p className="text-sm text-gray-500">{person.kampus}</p>
  </CardHeader>
  <CardContent className="text-center space-y-4">
    <div className="space-y-2">
      <div className="flex items-center justify-center space-x-2 text-gray-600">
        <Mail className="h-4 w-4" />
        <span className="text-sm">{person.email}</span>
      </div>
    </div>
    <div className="flex justify-center space-x-3 pt-2 border-t">
      <a href={person.socials.facebook} target="_blank" rel="noopener noreferrer" 
         className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
        <Facebook className="h-4 w-4" />
      </a>
      <a href={person.socials.instagram} target="_blank" rel="noopener noreferrer"
         className="p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors">
        <Instagram className="h-4 w-4" />
      </a>
      <a href={person.socials.linkedin} target="_blank" rel="noopener noreferrer"
         className="p-2 text-blue-700 hover:bg-blue-50 rounded-full transition-colors">
        <Linkedin className="h-4 w-4" />
      </a>
      <a href={person.socials.x} target="_blank" rel="noopener noreferrer"
         className="p-2 text-gray-800 hover:bg-gray-50 rounded-full transition-colors">
        <X className="h-4 w-4" />
      </a>
    </div>
  </CardContent>
</Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Kepengurusan GEKRAFS Jawa Barat</h1>
            <p className="text-xl text-gray-600">Tim pengurus periode 2024-2025</p>
          </div>

          {/* Eksekutif Board */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Executive Board</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {organisasiData.ExecutiveBoard.map((person) => renderPersonCard(person))}
            </div>
          </div>

          {/* Management Board */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Management Board</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {organisasiData.managementBoard.map((person) => renderPersonCard(person))}
            </div>
          </div>

          {/* Bidang-bidang */}
          {organisasiData.bidang.map((bidang, index) => (
            <div key={index} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{bidang.nama}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {bidang.anggota.map((person) => renderPersonCard(person))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-sky-600 to-yellow-6000 hover:from-sky-700 hover:to-yellow-700">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Kepengurusan;
