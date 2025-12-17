import {z} from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.string().default('5000'),
    DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof env.NODE_ENV>;