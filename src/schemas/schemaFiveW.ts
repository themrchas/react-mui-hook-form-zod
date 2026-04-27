import * as z from 'zod'

import { genericMultiCheckbox } from './schemaComponentCheckbox'



export const visitedOrganizationCategory = z.object({

    /*
    category: z.string(),
    checkboxes: z.array(genericMultiCheckbox)
    */
   //genericMultiCheckbox

}) //visitedOrganizationCategory

const fiveWItem = z.object({

    missionStatement: z.string().nonempty("5W Mission Statement is a required field"),
    visitedOrganizations: z.array(genericMultiCheckbox),
    desiredOutput: z.string().nonempty("5W Mission Desired Output is a required field"),
    communicationPlan: z.object({
            email: z.email("Required"),
            alternateEmail: z.email().optional(),
            phone: z.string().nonempty("Communication Plan phone is a required field"),
            alternatePhone: z.string()
    })

}) //fiveWItem

export const schemaFiveW = z.object({

    fiveW: fiveWItem   
    

}) //schemaFiveW

