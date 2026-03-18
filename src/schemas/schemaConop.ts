import * as z from 'zod'

const internalSupportRequired = z.object({

     directorate: z.string(),
     internalSupportRequired: z.string()

}) //internalSupportRequired

//Schema for the Travel tab, sans 'Travel Worksheet'
const conopItem = z.object({

    situation: z.string().default(""),
    purpose: z.string().default(""),
    desiredOutcome: z.array(z.string()),
    //visitedOrganziations: z.array(z.string())
    internalSupportRequired: z.array(internalSupportRequired),
    additionalComments: z.string().default(""),
    communicationsPlan: z.object({
                email: z.email(), //.optional().default(""),
                alternateEmail: z.email(), //.optional().default(""),
                phone: z.string().default(""),
                alternatePhone: z.string().optional().default("")
     }),
     recordOfDecision: z.string().default("")
   
    

}) //conopItem


export const conop = conopItem
   




 