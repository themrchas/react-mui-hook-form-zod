import * as z from 'zod'

export const schemaFiveW = z.object({

    w5missionStatement: z.string().nonempty("5W Mission Statement is a required field"),
    //w5visitedOrganizations
    w5desiredOutput: z.string().nonempty("5W Mission Desired Output is a required field"),
    w5communicationPlan: z.object({
            email: z.email("Required"),
            alternateEmail: z.email().optional(),
            phone: z.string().nonempty("Communication Plan phone is a required field"),
            alternatePhone: z.string()
    })

}) //schemaFiveW

export const schemaFiveWTest = z.object({

    w5missionStatement: z.string().nonempty("5W Mission Statement is a required field"),
    

}) //schemaFiveWTest

