type PrimitiveSchema =
  | { type: 'string'; example?: string }
  | { type: 'number'; example?: number }
  | { type: 'boolean'; example?: boolean };

type ObjectSchema = {
  type: 'object';
  properties: Record<string, SchemaType>;
};

type ArraySchema = {
  type: 'array';
  items: SchemaType;
};

type RefSchema = { $ref: string };

type SchemaType = PrimitiveSchema | ObjectSchema | ArraySchema | RefSchema;

// ── Helpers ──────────────────────────────────────────────
export const ref = (name: string): RefSchema => ({ $ref: `#/components/schemas/${name}` });
export const array = (name: string): ArraySchema => ({
  type: 'array',
  items: ref(name),
});

console.log('arra', ref('Category'));

// ── তোমার sendSuccessResponse এর exact structure ──────────
export const successSchema = (dataSchema: SchemaType, withMeta = false) => ({
  success: true,
  statusCode: 200,
  message: 'Operation successful',
  data: dataSchema,
  ...(withMeta && {
    meta: {
      page: 1,
      limit: 10,
      total: 100,
    },
  }),
});
