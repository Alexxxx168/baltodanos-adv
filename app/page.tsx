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
  Globe
} from 'lucide-react';



// ── 1. CONFIGURACIÓN DE SANITY ──────────────────────────────────
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // <--- Agrega esta línea
});
// Función para procesar las imágenes de Sanity
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// ── 2. DICCIONARIO DE TRADUCCIONES ──────────────────────────────
const dict = {
  es: {
    heroSubtitle: "¡Viaja rápido y seguro con nosotros!",
    btnExplore: "Explorar Destinos",
    toursTitle: "Nuestros Tours Populares",
    btnMoreInfo: "Más información",
    btnQuickQuery: "Consulta rápida",
    transferTitle: "¿Necesitas transporte seguro?",
    transferDesc: "Ofrecemos traslados privados desde el aeropuerto hasta tu hotel, o entre ciudades. Viaja con comodidad, aire acondicionado y la seguridad que te mereces.",
    btnQuote: "Cotizar mi traslado",
    footerDesc: "Basados en Diriamba, Carazo. Expertos en crear memorias inolvidables.",
    rights: "Todos los derechos reservados."
  },
  en: {
    heroSubtitle: "Travel fast and safe with us!",
    btnExplore: "Explore Destinations",
    toursTitle: "Our Popular Tours",
    btnMoreInfo: "More information",
    btnQuickQuery: "Quick inquiry",
    transferTitle: "Need safe transportation?",
    transferDesc: "We offer private transfers from the airport to your hotel, or between cities. Travel comfortably with AC and the security you deserve.",
    btnQuote: "Quote my transfer",
    footerDesc: "Based in Diriamba, Carazo. Experts in creating unforgettable memories.",
    rights: "All rights reserved."
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [realTours, setRealTours] = useState<any[]>([]); // Estado para los tours de Sanity
  const [loading, setLoading] = useState(true);
  
  const t = dict[lang];

  // ── 3. CARGAR DATOS DESDE SANITY ──────────────────────────────
  useEffect(() => {
    async function fetchTours() {
      try {
        // Pedimos todos los documentos tipo 'viaje' que estén marcados como activos
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
{/* BOTÓN DE CAMBIO DE IDIOMA - VERSIÓN FINAL PARA MÓVIL */}
      <div className="fixed top-4 right-4 z-[99999] pointer-events-auto"> 
        <button 
          type="button"
          /* Usamos onPointerDown para capturar el toque antes que cualquier otra cosa */
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Forzamos el cambio de idioma
            const nuevoIdioma = lang === 'es' ? 'en' : 'es';
            setLang(nuevoIdioma);
            
            // Opcional: Pequeña vibración para confirmar el toque en Android
            if (window.navigator.vibrate) window.navigator.vibrate(50);
            
            console.log("Cambiando idioma a:", nuevoIdioma);
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
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg text-white">Baltodano's Adventure</h1>
          <p className="text-xl md:text-2xl mb-8 font-light drop-shadow">{t.heroSubtitle}</p>
          <a href="#tours" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl inline-block">
            {t.btnExplore}
          </a>
        </div>
      </header>

      {/* SECCIÓN DE TOURS */}
      <section id="tours" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-10 text-green-600">
          <Compass className="animate-pulse" />
          <h2 className="text-3xl font-bold text-slate-900">{t.toursTitle}</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-slate-400">Cargando aventuras...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {realTours.map((tour) => (
              <div key={tour._id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  {/* Usamos urlFor para procesar la imagen de Sanity */}
                  <img src={urlFor(tour.image).url()} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-green-700 font-bold shadow-md">
                    {tour.price}
                  </div>
                </div>

                <div className="p-6 grow flex flex-col">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mb-3 uppercase font-semibold">
                    <MapPin size={14} /> {tour.puntoPartida}
                  </div>
                  {/* Extraemos la descripción del campo bilingüe de Sanity */}
                  <p className="text-slate-600 text-sm mb-6 grow leading-relaxed">
                    {lang === 'es' ? tour.fullDesc_es : tour.fullDesc_en}
                  </p>

                  <a
                    href={`/tours/${tour.title.toLowerCase().replace(/ /g, '-')}`}
                    className="block w-full text-center bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-all font-bold mb-3 shadow-lg touch-manipulation"
                  >
                    {t.btnMoreInfo}
                  </a>

                  <a
                    href={`https://wa.me/50558257206?text=${encodeURIComponent(`Hola! Me interesa el tour: ${tour.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm py-2"
                  >
                    <MessageCircle size={18} /> {t.btnQuickQuery}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECCIÓN DE TRASLADOS */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6 text-green-500">
            <Plane size={40} />
            <Car size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.transferTitle}</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.transferDesc}
          </p>
          <a
            href={`https://wa.me/50558257206?text=${encodeURIComponent(`Hola! Necesito información sobre el servicio de traslado privado.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
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
            <h2 className="text-white text-3xl font-black mb-4">Baltodano's Adventure</h2>
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
        href="https://wa.me/50558257206" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 bg-green-500 text-white p-5 rounded-full shadow-2xl z-50 animate-bounce transition-all hover:scale-110 active:scale-90 touch-manipulation"
      >
        <Phone size={28} />
      </a>

    </div>
  );
}