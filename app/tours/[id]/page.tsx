import React from 'react';
// Importamos la conexión a Sanity
import { createClient } from "next-sanity";
import TourDetailPage from '../../Tour'; 
import ConcertDetailPage from '../../Concert';

// ── 1. CONFIGURACIÓN DEL CLIENTE DE SANITY ───────────────────────
const client = createClient({
  // Estos datos los sacas de tu archivo .env.local
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01", 
  useCdn: false, // Ponlo en false para ver cambios al instante mientras desarrollas
});

// ── 2. FUNCIÓN PARA CONSULTAR LA BASE DE DATOS ───────────────────
async function getTourDesdeSanity(id: string) {
  // Escribimos la consulta (GROQ) para pedirle el tour a Sanity
  // Buscamos un documento que sea tipo 'viaje' y cuyo título (slugificado) coincida con la URL
  const query = `*[_type == "viaje" && title match $id][0]`;
  const options = { id }; // Le pasamos el ID de la URL a la consulta
  
  const tour = await client.fetch(query, options);
  return tour;
}

// ── 3. LA FUNCIÓN PRINCIPAL AHORA ES ASYNC ────────────────────────
export default async function RutaDinamica({ params }: { params: { id: string } }) {
  
  // 4. Esperamos los datos reales de Sanity
  const viajeEncontrado = await getTourDesdeSanity(params.id);

  if (!viajeEncontrado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">¡Uppss! El tour no existe o aún no está publicado en Sanity.</h1>
      </div>
    );
  }

  // 5. Controlador de tráfico
  if (viajeEncontrado.type === "concert") {
    return <ConcertDetailPage concertData={viajeEncontrado} />;
  }

  return <TourDetailPage tourData={viajeEncontrado} />;
}