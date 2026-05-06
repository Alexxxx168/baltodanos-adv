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
    btnHeroPrivate: "Cotizar Viaje Privado",
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
    btnHeroPrivate: "Book a Private Trip",
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
    { name: "Auto", pax: "1-4", img: "data:image/jpeg;base64,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" },
    { name: "Microbus", pax: "15", img: "https://www.welcometonicaragua.net/wp-content/uploads/2016/06/minibus-hi-ace-toyota.jpg" },
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