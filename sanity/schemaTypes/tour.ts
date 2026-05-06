export const tourType = {
  name: 'viaje',
  title: 'Catálogo de Viajes',
  type: 'document',
  fields: [
    { name: 'active', title: '¿Activo?', type: 'boolean', initialValue: true },
    {
      name: 'type',
      title: 'Tipo de Viaje',
      type: 'string',
      options: { 
        list: [
          { title: 'Tour', value: 'tour' }, 
          { title: 'Concierto', value: 'concert' }
        ], 
        layout: 'radio' 
      }
    },
    { name: 'title', title: 'Nombre del Viaje', type: 'string' },
    
    // ── CAMPO SLUG AÑADIDO ────────────────────────────────
    {
      name: 'slug',
      title: 'Enlace Permanente (Slug)',
      type: 'slug',
      description: 'Haz clic en Generate para crear el enlace automático basado en el nombre.',
      options: {
        source: 'title', // Toma el valor del campo 'title'
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required().error('El enlace es obligatorio para que la página funcione.'),
    },
    // ──────────────────────────────────────────────────────

    { name: 'price', title: 'Precio', type: 'string' },
    { name: 'fechaViaje', title: 'Fecha del Viaje (Ej: 15 de Mayo, 2024)', type: 'string' },
    { name: 'horaSalida', title: 'Hora de Salida (Ej: 05:00 AM)', type: 'string' },
    { name: 'puntoPartida', title: 'Puntos de Abordaje', type: 'string' },
    { name: 'image', title: 'Imagen Principal (Alta Calidad)', type: 'image', options: { hotspot: true } },
    
    // --- ESPAÑOL ---
    { name: 'tagline_es', title: 'Frase Corta (ES)', type: 'string', group: 'espanol' },
    { name: 'duracion_es', title: 'Duración (ES) - Ej: Todo el día', type: 'string', group: 'espanol' },
    { name: 'dificultad_es', title: 'Dificultad (ES) - Ej: Moderada', type: 'string', group: 'espanol' },
    { name: 'fullDesc_es', title: 'Descripción Larga (ES)', type: 'text', group: 'espanol' },
    {
      name: 'itinerario_es',
      title: 'Itinerario (ES)',
      type: 'array',
      group: 'espanol',
      of: [{ type: 'object', fields: [{ name: 'hora', type: 'string' }, { name: 'actividad', type: 'string' }] }]
    },
    { name: 'incluye_es', title: '¿Qué incluye? (ES)', type: 'array', group: 'espanol', of: [{ type: 'string' }] },

    // --- INGLÉS ---
    { name: 'tagline_en', title: 'Frase Corta (EN)', type: 'string', group: 'ingles' },
    { name: 'duracion_en', title: 'Duración (EN)', type: 'string', group: 'ingles' },
    { name: 'dificultad_en', title: 'Difficulty (EN)', type: 'string', group: 'ingles' },
    { name: 'fullDesc_en', title: 'Full Description (EN)', type: 'text', group: 'ingles' },
    {
      name: 'itinerario_en',
      title: 'Itinerary (EN)',
      type: 'array',
      group: 'ingles',
      of: [{ type: 'object', fields: [{ name: 'hora', type: 'string' }, { name: 'actividad', type: 'string' }] }]
    },
    { name: 'incluye_en', title: 'Included (EN)', type: 'array', group: 'ingles', of: [{ type: 'string' }] },
  ],
  groups: [
    { name: 'espanol', title: 'Español' }, 
    { name: 'ingles', title: 'English' }
  ],
  // Esto arregla lo de "Untitled" en la barra lateral
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image'
    }
  }
}