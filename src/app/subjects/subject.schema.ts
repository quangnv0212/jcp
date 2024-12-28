import z from "zod";

export const SubjectBody = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "required" }),
    description: z.string().min(1, { message: "required" }),
    isActive: z.boolean(),
    price: z.number().min(0),
  })
  .strict();

export type SubjectBodyType = z.TypeOf<typeof SubjectBody>;
export const GetSubjectsQueryParams = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
  name: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  isActive: z.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional(),
});

export type GetSubjectsQueryParamsType = z.TypeOf<
  typeof GetSubjectsQueryParams
>;
