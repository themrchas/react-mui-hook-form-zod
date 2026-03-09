//Schema used prior to breaking it up.  Do not include in production

import * as z from 'zod'

import dayjs, {Dayjs} from 'dayjs';

export const activitySchema = z.object({

     activityClassification: z.string().nonempty("Classification is a required field"),
     activityTitle: z.string().nonempty("Title is a required field"),
     activityType: z.string().nonempty("Activity Type is a required field"),
     activityExerciseName: z.string().optional(),
     activityFiscalYear: z.string().optional(),

    // w5missionStatement: z.string("5W Mission Statement is a required field"),

     activityMissionTimeline: z.object({
          travelStart: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),
          travelEnd: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),       
          dutyStart: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),     
          dutyEnd: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable()
     })
     

}) //formSchema

// Type inferred from the Zod schema
//export type FormData = z.infer<typeof formSchema>;