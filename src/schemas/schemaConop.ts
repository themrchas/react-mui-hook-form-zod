import * as z from 'zod'

const internalSupportRequired = z.object({

     directorate: z.string(),
     internalSupportRequired: z.string()

}) //internalSupportRequired

const keyTask = z.object({

    task: z.string()


}) //keyTest

//Schema for the Travel tab, sans 'Travel Worksheet'
const conopItem = z.object({

    situation: z.string().optional(),
  
    purpose: z.string().optional(),

    keyTask: z.array(keyTask),

    desiredOutcome: z.array(z.string()),

    //visitedOrganziations: z.array(z.string())

    
    internalSupportRequired: z.array(internalSupportRequired),
    additionalComments: z.string(), //.default(""),
    communicationsPlan: z.object({
                email: z.email(), //.optional().default(""),
                alternateEmail: z.email(), //.optional().default(""),
                phone: z.string(), //.default(""),
                alternatePhone: z.string() //.optional().default("")
     }),
     recordOfDecision: z.string()
   
    

}) //conopItem


export const schemaConop = z.object({ conop: conopItem});
   




 