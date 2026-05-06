"use client";
import React, { useState } from 'react';
import { MapPin, Clock, Signal, CheckCircle2, ArrowLeft, MessageCircle, Globe, Calendar } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) { return builder.image(source); }

const dict = {
  es: { back: "Volver", duration: "Duración", difficulty: "Nivel", departure: "Salida", about: "Sobre la aventura", includes: "Incluye", itinerary: "Itinerario", bookNow: "Reservar mi lugar", date: "Fecha" },
  en: { back: "Back", duration: "Duration", difficulty: "Difficulty", departure: "Departure", about: "About", includes: "Includes", itinerary: "Itinerary", bookNow: "Book now", date: "Date" }
};

export default function TourDetailPage({ tourData }: { tourData: any }) {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = dict[lang];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* HEADER GIGANTE */}
      <div className="relative h-[60vh] w-full bg-slate-900">
        {tourData.image && (
          <img src={urlFor(tourData.image).width(1600).url()} className="w-full h-full object-cover opacity-80" alt={tourData.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />
        
        <div className="absolute top-6 left-6 right-6 flex justify-between z-50">
           <a href="/" className="bg-white/90 p-3 rounded-full text-slate-900 shadow-xl"><ArrowLeft /></a>
           <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="bg-slate-900 text-white px-4 py-2 rounded-full font-bold shadow-xl flex gap-2 items-center">
             <Globe size={18}/> {lang.toUpperCase()}
           </button>
        </div>

        <div className="absolute bottom-10 left-6 right-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 uppercase italic">{tourData.title}</h1>
          <p className="text-lg md:text-xl text-white font-bold bg-green-600 w-fit px-4 py-1 rounded-lg">
            {lang === 'es' ? tourData.tagline_es : tourData.tagline_en}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-12 mt-12">
        <div className="md:col-span-2 space-y-12">
          {/* DATOS RÁPIDOS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-green-500">
              <Calendar className="text-green-600 mb-1" size={20} />
              <p className="text-[10px] uppercase font-bold text-slate-400">{t.date}</p>
              <p className="font-bold text-sm">{tourData.fechaViaje || 'Próximamente'}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-green-500">
              <Clock className="text-green-600 mb-1" size={20} />
              <p className="text-[10px] uppercase font-bold text-slate-400">{t.duration}</p>
              <p className="font-bold text-sm">{lang === 'es' ? tourData.duracion_es : tourData.duracion_en}</p>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-black mb-4 uppercase text-slate-800">{t.about}</h2>
            <p className="text-slate-600 leading-relaxed">{lang === 'es' ? tourData.fullDesc_es : tourData.fullDesc_en}</p>
          </section>

          {/* ITINERARIO */}
          {(lang === 'es' ? tourData.itinerario_es : tourData.itinerario_en) && (
            <section>
              <h2 className="text-2xl font-black mb-6 uppercase text-slate-800">{t.itinerary}</h2>
              <div className="space-y-4 border-l-2 border-green-100 ml-4 pl-6">
                {(lang === 'es' ? tourData.itinerario_es : tourData.itinerario_en).map((p: any, i: number) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm" />
                    <p className="text-xs font-black text-green-600 uppercase">{p.hora}</p>
                    <p className="text-slate-700 font-medium">{p.actividad}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* BARRA LATERAL DE RESERVA */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl sticky top-8 shadow-2xl">
            <p className="text-xs uppercase font-bold text-green-400 mb-1">Precio por persona</p>
            <p className="text-5xl font-black mb-8">{tourData.price}</p>
            
            <h3 className="font-bold mb-4 text-green-400 uppercase text-sm">{t.includes}:</h3>
            <ul className="space-y-3 mb-8">
              {(lang === 'es' ? tourData.incluye_es : tourData.incluye_en)?.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300 italic">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>

            <a href={`https://wa.me/50558257206?text=Hola! Quiero reservar: ${tourData.title}`} 
               target="_blank" rel="noopener noreferrer"
               className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-green-900/20">
              {t.bookNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}