export const tourType = {
  name: 'viaje',
  title: 'Catálogo de Viajes',
  type: 'document',
  fields: [
    {
      name: 'active',
      title: '¿Tour Activo?',
      description: 'Apágalo si el tour ya pasó de fecha para ocultarlo de la página principal sin borrarlo.',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'type',
      title: 'Tipo de Viaje',
      type: 'string',
      options: {
        list: [
          { title: 'Tour de Naturaleza/Ciudad', value: 'tour' },
          { title: 'Viaje a Concierto', value: 'concert' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'title',
      title: 'Nombre del Tour o Concierto',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Precio (Ej: $35 o C$1500)',
      type: 'string',
    },
    {
      name: 'puntoPartida',
      title: 'Lugar de Salida / Puntos de Abordaje',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true, // Le permite al cliente recortar la imagen visualmente
      }
    },
    // --- SECCIÓN BILINGÜE ---
    {
      name: 'tagline_es',
      title: 'Frase llamativa (Español)',
      type: 'string',
      group: 'espanol',
    },
    {
      name: 'tagline_en',
      title: 'Frase llamativa (Inglés)',
      type: 'string',
      group: 'ingles',
    },
    {
      name: 'fullDesc_es',
      title: 'Descripción completa (Español)',
      type: 'text',
      group: 'espanol',
    },
    {
      name: 'fullDesc_en',
      title: 'Descripción completa (Inglés)',
      type: 'text',
      group: 'ingles',
    },
  ],
  // Esto crea pestañas en el panel para separar idiomas y que se vea más ordenado
  groups: [
    { name: 'espanol', title: 'ESP 🇳🇮' },
    { name: 'ingles', title: 'ENG 🇺🇸' },
  ]
}