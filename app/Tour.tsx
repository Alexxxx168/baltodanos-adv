"use client";
import React, { useState } from 'react';
import { 
  MapPin, Clock, Signal, CheckCircle2, ArrowLeft, MessageCircle, Globe 
} from 'lucide-react';

// ── 1. DICCIONARIO BILINGÜE PARA LA PLANTILLA ──────────────────────────────
const dict = {
  es: {
    back: "Volver a inicio",
    duration: "Duración",
    difficulty: "Nivel",
    departure: "Punto de salida",
    about: "Sobre esta aventura",
    includes: "¿Qué incluye el paquete?",
    itinerary: "Tu Itinerario",
    bookNow: "¡Reservar mi lugar ahora!",
    whatsappMsg: "¡Hola Baltodano's Adventure! Quiero reservar mi lugar para el tour:"
  },
  en: {
    back: "Back to home",
    duration: "Duration",
    difficulty: "Difficulty",
    departure: "Departure point",
    about: "About this adventure",
    includes: "What's included?",
    itinerary: "Your Itinerary",
    bookNow: "Book my spot now!",
    whatsappMsg: "Hello Baltodano's Adventure! I want to book my spot for the tour:"
  }
};

// ── 2. LA FUNCIÓN AHORA RECIBE "tourData" COMO PROPIEDAD ───────────────────
export default function TourDetailPage({ tourData }: { tourData: any }) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* BOTONES FLOTANTES SUPERIORES (Volver e Idioma) */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 transition-all font-bold shadow-lg">
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">{t.back}</span>
        </a>

        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 transition-all font-bold shadow-lg"
        >
          <Globe size={18} />
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* CABECERA (HERO DEL TOUR) */}
      <div className="h-[50vh] sm:h-[60vh] relative">
        <img src={tourData.image} className="w-full h-full object-cover" alt={tourData.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 max-w-4xl mx-auto">
          <span className="inline-block bg-green-500 text-white font-black px-4 py-1.5 rounded-full mb-4 shadow-lg">
            {tourData.price}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 drop-shadow-md bg-white/90 w-fit px-4 py-2 rounded-2xl mb-2">
            {tourData.title}
          </h1>
          <p className="text-green-800 font-bold text-lg sm:text-xl bg-white/90 w-fit px-4 py-1 rounded-xl shadow-sm">
            {tourData.tagline[lang]}
          </p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        
        {/* DATOS RÁPIDOS */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 flex justify-around items-center divide-x divide-slate-100">
          <div className="flex flex-col items-center text-center px-4">
            <Clock size={24} className="text-green-600 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.duration}</span>
            <span className="font-bold text-slate-700">{tourData.duracion[lang]}</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <Signal size={24} className="text-green-600 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.difficulty}</span>
            <span className="font-bold text-slate-700">{tourData.dificultad[lang]}</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <MapPin size={24} className="text-red-500 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.departure}</span>
            <span className="font-bold text-slate-700 text-sm">{tourData.puntoPartida}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Info e Itinerario */}
          <div className="md:col-span-2 space-y-10">
            {/* DESCRIPCIÓN */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{t.about}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {tourData.fullDesc[lang]}
              </p>
            </section>

            {/* ITINERARIO VISUAL */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{t.itinerary}</h2>
              <div className="space-y-6 relative before:absolute before:left-[45px] before:top-2 before:bottom-2 before:w-0.5 before:bg-green-100">
                {tourData.itinerario[lang].map((paso: any, idx: number) => (
                  <div key={idx} className="flex gap-6 relative items-start">
                    <span className="bg-white border-2 border-green-500 text-green-700 text-xs font-black px-3 py-1.5 rounded-xl min-w-[90px] text-center shadow-sm z-10">
                      {paso.hora}
                    </span>
                    <span className="text-base text-slate-700 font-medium pt-1">
                      {paso.actividad}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA: Checklist y Reserva */}
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
              <h3 className="font-bold text-xl text-green-900 mb-4">{t.includes}</h3>
              <ul className="space-y-3">
                {tourData.incluye[lang].map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* BOTÓN CTA FIJO */}
            <div className="sticky top-6">
              <a
                href={`https://wa.me/50558257206?text=${encodeURIComponent(`${t.whatsappMsg} ${tourData.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white text-center py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-200 hover:bg-green-700 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <MessageCircle size={24} />
                {t.bookNow}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}