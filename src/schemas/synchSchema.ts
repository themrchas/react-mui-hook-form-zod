import * as z from 'zod'

export const activitySchema = z.object({

     activityClassification: z.string().nonempty("Classification is a required field"),
     activityTitle: z.string().nonempty("Title is a required field"),
     activityType: z.string().nonempty("Activity Type is a required field"),
     activityExerciseName: z.string().optional(),
     activityFiscalYear: z.string().optional()
     

}) //formSchema

// Type inferred from the Zod schema
//export type FormData = z.infer<typeof formSchema>;