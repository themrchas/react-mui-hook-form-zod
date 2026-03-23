import * as z from 'zod'

const supportRequired = z.object({

     directorate: z.string(),
     internalSupportRequired: z.string()

}) //internalSupportRequired

//Schema for the Travel tab, sans 'Travel Worksheet'
export const conopItem = z.object({

    situation: z.string().default("").optional(),
    purpose: z.string().default("").optional(),
    desiredOutcome: z.array(z.string()),
    //visitedOrganziations: z.array(z.string()) */
   internalSupportRequired: z.array(supportRequired),

   
    additionalComments: z.string(),
    
    
    communicationsPlan: z.object({
                email: z.email(), //.optional().default(""),
                alternateEmail: z.email(), //.optional().default(""),
                phone: z.string(),
                alternatePhone: z.string() //.optional().default("")
     }),
     recordOfDecision: z.string()
     
       

}) //conopItem


//export const conop = conopItem
export const rootSchema = z.object({ conop: conopItem})




 