import { type SchemaTypeDefinition } from 'sanity'
import { tourType } from './tour'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tourType],
}