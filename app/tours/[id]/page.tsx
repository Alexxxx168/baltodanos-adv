import { createClient } from "next-sanity";
import TourDetailPage from "../../Tour"; 

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// IMPORTANTE: En las nuevas versiones de Next.js, params debe ser tratado como una Promesa en algunos casos
export default async function Page({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  
  // 1. Forzamos la espera de los parámetros (esto arregla errores en Next 14/15)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // 2. Query limpia
  const query = `*[_type == "viaje" && (title match $id || _id == $id)][0]`;

  try {
    // 3. Pasamos el parámetro explícitamente en un objeto literal
    const tourData = await client.fetch(query, { id: id });

    if (!tourData) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
            <h1 className="text-2xl font-black text-slate-800">¡Ups! Aventura no encontrada</h1>
            <p className="text-slate-500 mb-6">Parece que este tour ya no está disponible o el enlace es incorrecto.</p>
            <a href="/" className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
              Volver al inicio
            </a>
          </div>
        </div>
      );
    }

    return <TourDetailPage tourData={tourData} />;

  } catch (error) {
    console.error("Error en Sanity Fetch:", error);
    return <div>Error al cargar los datos del tour.</div>;
  }
}