import * as z from 'zod'

export const formSchema = z.object({

     username: z.string().nonempty("Username cannot be empty"),
     email: z.email().nonempty("Email address must be specified"),
     street: z.string().nonempty("Street is a required field"),
     color: z.string().optional().refine((val) => val !== "red", { error: "Color cannot be red" }),
     city: z.string().nonempty("City must be nonempty"),
     state: z.string().nonempty("State must be selected")

}) //formSchema

// Type inferred from the Zod schema
//export type FormData = z.infer<typeof formSchema>;