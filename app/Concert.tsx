"use client";
import React, { useState } from 'react';
import { 
  MapPin, Clock, Calendar, CheckCircle2, ArrowLeft, MessageCircle, Globe, Music 
} from 'lucide-react';

// ── 1. DICCIONARIO BILINGÜE PARA CONCIERTOS ─────────────────────────
const dict = {
  es: {
    back: "Volver a inicio",
    date: "Fecha",
    departureTime: "Hora de salida",
    boardingPoints: "Puntos de Abordaje",
    about: "Sobre el Viaje al Evento",
    includes: "¿Qué incluye el paquete?",
    schedule: "Horarios Clave",
    bookNow: "¡Asegurar mi lugar!",
    whatsappMsg: "¡Hola Baltodano's Adventure! Quiero reservar mi asiento para el concierto de:"
  },
  en: {
    back: "Back to home",
    date: "Date",
    departureTime: "Departure Time",
    boardingPoints: "Boarding Points",
    about: "About the Event Trip",
    includes: "What's included?",
    schedule: "Key Schedule",
    bookNow: "Secure my spot!",
    whatsappMsg: "Hello Baltodano's Adventure! I want to book my seat for the concert:"
  }
};

// ── 2. LA FUNCIÓN AHORA RECIBE "concertData" COMO PROPIEDAD ─────────
export default function ConcertDetailPage({ concertData }: { concertData: any }) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 pb-20"> 
      {/* NOTA: Fondo oscuro para dar ambiente de "noche/concierto" */}
      
      {/* BOTONES FLOTANTES SUPERIORES */}
      <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 transition-all font-bold shadow-lg">
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">{t.back}</span>
        </a>

        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 transition-all font-bold shadow-lg"
        >
          <Globe size={18} />
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      {/* CABECERA (HERO DEL CONCIERTO) */}
      <div className="h-[50vh] sm:h-[60vh] relative">
        <img src={concertData.image} className="w-full h-full object-cover" alt={concertData.title} />
        {/* Degradado más oscuro para resaltar el texto claro */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black/60 to-black/30" />
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-purple-600 text-white font-black px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-purple-900/50">
            <Music size={16} /> Transporte al Evento
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white drop-shadow-md mb-2">
            {concertData.title}
          </h1>
          <p className="text-purple-300 font-bold text-lg sm:text-xl drop-shadow-sm">
            {concertData.tagline[lang]}
          </p>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        
        {/* DATOS RÁPIDOS */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 mb-8 flex justify-around items-center divide-x divide-slate-700 border border-slate-700">
          <div className="flex flex-col items-center text-center px-4">
            <Calendar size={24} className="text-purple-500 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.date}</span>
            <span className="font-bold text-slate-200 text-sm">{concertData.fecha[lang]}</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <Clock size={24} className="text-purple-500 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">{t.departureTime}</span>
            <span className="font-bold text-slate-200 text-sm">{concertData.horaSalida}</span>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <MapPin size={24} className="text-purple-500 mb-2" />
            <span className="text-[10px] uppercase font-bold text-slate-400">Destino</span>
            <span className="font-bold text-slate-200 text-sm">{concertData.lugarEvento}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Info y Puntos de Abordaje */}
          <div className="md:col-span-2 space-y-10">
            {/* DESCRIPCIÓN */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">{t.about}</h2>
              <p className="text-slate-300 leading-relaxed text-lg">
                {concertData.fullDesc[lang]}
              </p>
            </section>

            {/* PUNTOS DE ABORDAJE */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">{t.boardingPoints}</h2>
              <div className="flex flex-wrap gap-3">
                {concertData.puntosAbordaje[lang].map((punto: string, idx: number) => (
                  <span key={idx} className="bg-slate-800 border border-slate-700 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm">
                    <MapPin size={16} className="text-purple-500" />
                    {punto}
                  </span>
                ))}
              </div>
            </section>

            {/* HORARIOS CLAVE */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">{t.schedule}</h2>
              <div className="space-y-6 relative before:absolute before:left-[45px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                {concertData.horarios[lang].map((paso: any, idx: number) => (
                  <div key={idx} className="flex gap-6 relative items-start">
                    <span className="bg-slate-800 border-2 border-purple-500 text-purple-400 text-xs font-black px-3 py-1.5 rounded-xl min-w-[90px] text-center shadow-sm z-10">
                      {paso.hora}
                    </span>
                    <span className="text-base text-slate-300 font-medium pt-1">
                      {paso.evento}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* COLUMNA DERECHA: Precio, Checklist y Reserva */}
          <div className="space-y-6">
            
            {/* Tarjeta de Precio Destacado */}
            <div className="bg-gradient-to-br from-purple-900 to-slate-800 p-6 rounded-3xl border border-purple-500/30 text-center shadow-2xl">
               <p className="text-purple-300 text-sm font-bold uppercase tracking-widest mb-1">Costo del Transporte</p>
               <p className="text-5xl font-black text-white">{concertData.price}</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <h3 className="font-bold text-xl text-white mb-4">{t.includes}</h3>
              <ul className="space-y-3">
                {concertData.incluye[lang].map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 font-medium">
                    <CheckCircle2 size={20} className="text-purple-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* BOTÓN CTA FIJO */}
            <div className="sticky top-6">
              <a
                href={`https://wa.me/50558257206?text=${encodeURIComponent(`${t.whatsappMsg} ${concertData.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white text-center py-5 rounded-2xl font-black text-lg shadow-xl shadow-purple-900/50 hover:bg-purple-500 hover:scale-[1.02] active:scale-95 transition-all"
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