"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import {
  Compass,
  MapPin,
  Phone,
  MessageCircle,
  Car,
  Plane,
  Globe,
  Users, 
  Hotel
} from 'lucide-react';

// ── 1. CONFIGURACIÓN DE SANITY ──────────────────────────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// ── 2. DICCIONARIO DE TRADUCCIONES ──────────────────────────────
const dict = {
  es: {
    heroSubtitle: "¡Viaja rápido y seguro con nosotros!",
    btnExplore: "Explorar Destinos",
    btnHeroPrivate: "Viajes Privados",
    toursTitle: "Nuestros Tours Populares",
    btnMoreInfo: "Más información",
    btnQuickQuery: "Consulta rápida",
    transferTitle: "¿Necesitas transporte seguro?",
    transferDesc: "Ofrecemos traslados privados desde el aeropuerto hasta tu hotel, o entre ciudades. Viaja con comodidad, aire acondicionado y la seguridad que te mereces.",
    btnQuote: "Cotizar mi traslado",
    privateTitle: "Arma tu propia aventura",
    privateDesc: "Contamos con una flota moderna para tus viajes privados. Elige el vehículo que mejor se adapte a tu grupo y viaja a tu propio ritmo.",
    capacity: "Capacidad",
    pax: "pasajeros",
    footerDesc: "Basados en Diriamba, Carazo. Expertos en crear memorias inolvidables.",
    rights: "Todos los derechos reservados."
  },
  en: {
    heroSubtitle: "Travel fast and safe with us!",
    btnExplore: "Explore Destinations",
    btnHeroPrivate: "Private Trips",
    toursTitle: "Our Popular Tours",
    btnMoreInfo: "More information",
    btnQuickQuery: "Quick inquiry",
    transferTitle: "Need safe transportation?",
    transferDesc: "We offer private transfers from the airport to your hotel, or between cities. Travel comfortably with AC and the security you deserve.",
    btnQuote: "Quote my transfer",
    privateTitle: "Create your own adventure",
    privateDesc: "We have a modern fleet for your private trips. Choose the vehicle that best fits your group and travel at your own pace.",
    capacity: "Capacity",
    pax: "passengers",
    footerDesc: "Based in Diriamba, Carazo. Experts in creating unforgettable memories.",
    rights: "All rights reserved."
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [realTours, setRealTours] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const t = dict[lang];

  // ── 3. LA FLOTA DEL CLIENTE (Datos fijos por ahora) ───────────
  const fleet = [
    { name: "Camioneta", pax: "1-4", img: "https://scontent.fmga3-1.fna.fbcdn.net/v/t39.30808-6/471319436_122163119402270044_8427007052785172303_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=yLXiSUkRBuMQ7kNvwFWvrsH&_nc_oc=AdpzF05QYYL1chNebbNPWBncEKMnCppsWWzrjBs7_eDHYwBUUQpFfuG1PPp-8w2FwV_t1FW-20YRBbkFL4f5wJdi&_nc_zt=23&_nc_ht=scontent.fmga3-1.fna&_nc_gid=gI5FiYTjyaS4AeWALlYF9A&_nc_ss=7b2a8&oh=00_Af5r8UtEPf3uAtBy9S0uRUd55ArVU6ZVbMQSfPJZlVAXlw&oe=6A01A342" },
    { name: "Microbús", pax: "15", img: "https://www.welcometonicaragua.net/wp-content/uploads/2016/06/minibus-hi-ace-toyota.jpg" },
    { name: "Microbus Yutong", pax: "19", img: "https://en.yutong.com/z/V6/images/v6/2.png" },
    { name: "Bus Coaster", pax: "30", img: "https://epicsafarijourneys.com/wp-content/uploads/2025/07/yutong-coaster-3.jpg" }
  ];

  // ── 4. CARGAR DATOS DESDE SANITY ──────────────────────────────
  useEffect(() => {
    async function fetchTours() {
      try {
        const query = `*[_type == "viaje" && active == true]`;
        const data = await client.fetch(query);
        setRealTours(data);
      } catch (error) {
        console.error("Error cargando tours de Sanity:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 relative">
      
      {/* BOTÓN DE CAMBIO DE IDIOMA */}
      <div className="fixed top-4 right-4 z-[99999] pointer-events-auto"> 
        <button 
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLang(prev => (prev === 'es' ? 'en' : 'es'));
            if (window.navigator.vibrate) window.navigator.vibrate(50);
          }}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-full border-2 border-white/50 shadow-2xl touch-none cursor-pointer active:bg-green-600 active:scale-95 transition-all select-none"
        >
          <Globe size={20} className="pointer-events-none" />
          <span className="font-black text-sm pointer-events-none tracking-widest uppercase">
            {lang === 'es' ? 'EN' : 'ES'}
          </span>
        </button>
      </div>

      {/* HERO SECTION */}
      <header className="relative h-[80vh] flex items-center justify-center text-white text-center px-4">
        <img 
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover brightness-50 pointer-events-none select-none"
          alt="Paisaje de Nicaragua"
          draggable="false"
        />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg text-white font-black italic uppercase">Baltodano's Adventure</h1>
          <p className="text-xl md:text-2xl mb-8 font-light drop-shadow">{t.heroSubtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a href="#tours" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl w-full sm:w-auto">
              {t.btnExplore}
            </a>
            <a href="#flota" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl w-full sm:w-auto">
              {t.btnHeroPrivate}
            </a>
          </div>
        </div>
      </header>

      {/* SECCIÓN DE TOURS */}
      <section id="tours" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-10 text-green-600">
          <Compass className="animate-pulse" />
          <h2 className="text-3xl font-bold text-slate-900 uppercase italic font-black">{t.toursTitle}</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400">Cargando aventuras...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {realTours.map((tour) => (
              <div key={tour._id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  {tour.image ? (
                    <img 
                      src={urlFor(tour.image).url()} 
                      alt={tour.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
                      Falta imagen en Sanity
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-green-700 font-bold shadow-md">
                    {tour.price}
                  </div>
                </div>

                <div className="p-6 grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800 uppercase italic font-black">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mb-3 uppercase font-semibold">
                    <MapPin size={14} /> {tour.puntoPartida}
                  </div>
                  <p className="text-slate-600 text-sm mb-6 grow leading-relaxed">
                    {lang === 'es' ? (tour.fullDesc_es || tour.tagline_es) : (tour.fullDesc_en || tour.tagline_en)}
                  </p>

                  <a
                    href={`/tours/${tour.slug?.current}`}
                    className="block w-full text-center bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-all font-bold mb-3 shadow-lg touch-manipulation"
                  >
                    {t.btnMoreInfo}
                  </a>

                  <a
                    href={`https://wa.me/50558257206?text=${encodeURIComponent(`Hola! Me interesa el tour: ${tour.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm py-2 active:scale-95 transition-transform"
                  >
                    <MessageCircle size={18} /> {t.btnQuickQuery}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECCIÓN DE FLOTA PRIVADA */}
      <section id="flota" className="py-20 px-4 max-w-6xl mx-auto border-t border-slate-200">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase italic font-black mb-4">
            {t.privateTitle}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.privateDesc}
          </p>
        </div>

        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
          {fleet.map((vehicle, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={vehicle.img} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-black italic uppercase">{vehicle.name}</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-2 text-slate-600 mb-6 font-semibold">
                  <Users size={18} className="text-green-500" />
                  <span>{t.capacity}: {vehicle.pax} {t.pax}</span>
                </div>
                
                <a
                  href={`https://wa.me/50558257206?text=${encodeURIComponent(`Hola! Quiero cotizar un viaje privado en: ${vehicle.name} para ${vehicle.pax} pasajeros.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-all font-bold w-full active:scale-95 shadow-md"
                >
                  <MessageCircle size={18} className="text-green-400" />
                  {t.btnQuickQuery}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* SECCIÓN DE TRASLADOS */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* AQUÍ ESTÁ EL CAMBIO DE LOS ÍCONOS */}
          <div className="flex justify-center items-center gap-6 mb-8 text-green-500">
            <Plane size={40} />
            <div className="w-8 md:w-16 h-1 border-t-2 border-dashed border-green-500/50"></div>
            <Car size={40} />
            <div className="w-8 md:w-16 h-1 border-t-2 border-dashed border-green-500/50"></div>
            <Hotel size={40} />
          </div>
          {/* ---------------------------------- */}

          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase italic font-black">{t.transferTitle}</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.transferDesc}
          </p>
          <a
            href={`https://wa.me/50558257206?text=${encodeURIComponent(`Hola! Necesito información sobre el servicio de traslado privado.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Phone size={20} />
            {t.btnQuote}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center text-left">
          <div>
            <h2 className="text-white text-3xl font-black mb-4 uppercase italic">Baltodano's Adventure</h2>
            <p className="flex items-start gap-3 max-w-md">
              <MapPin size={24} className="text-green-500 shrink-0" /> {t.footerDesc}
            </p>
          </div>
          <div className="flex md:justify-end gap-6 font-bold text-white">
            <a href="#" className="hover:text-green-500 transition-colors">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61558101334163" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">Facebook</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          © {new Date().getFullYear()} Baltodano's Adventure - {t.rights}
        </div>
      </footer>

      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a 
        href={`https://wa.me/50558257206?text=${encodeURIComponent(`Hola! Me gustaria tener más información sobre Tours`)}`}
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl z-50 animate-bounce transition-all hover:scale-110 active:scale-90 touch-manipulation"
      >
        <Phone size={28} />
      </a>

    </div>
  ); 
}