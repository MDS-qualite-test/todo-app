import z from "zod";

export type Todo = z.infer<typeof todoSchema>;
export const todoSchema = z.object({
    id: z.number(),
    nom: z.string(),
    description: z.string(),
    localisation: z.string(),
    dateHeure: z.string(),
    completed: z.boolean().default(false),
});

export type TodoCreateInput = z.infer<typeof todoCreateSchema>;
export const todoCreateSchema = todoSchema.omit({ id: true });

export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>;
export const todoUpdateSchema = todoSchema.partial();
