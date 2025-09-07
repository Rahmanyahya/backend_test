import z from "zod"; export 
class AuthSchema { 
    static readonly login = z.object({ email: z.email(), password: z.string() });
    static readonly register = z.object({ name: z.string(), password: z.string(), email: z.string() });
}