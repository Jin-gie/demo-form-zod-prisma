import { z } from "zod";
 
export const schema = z.object({
  name: z
    .string({
      required_error: "Obligatoire"
    })
    .min(4, { message: 'Le nom doit faire au moins 4 caractères' }),
  age: z.number({
    required_error: "Obligatoire"
  }).min(10, {message: "Vous devez avoir au moins 10 ans"}),
});