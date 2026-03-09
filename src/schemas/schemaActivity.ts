import * as z from 'zod'

import dayjs, {Dayjs} from 'dayjs';

export const activitySchema = z.object({

     activityClassification: z.string().nonempty("Classification is a required field"),
     activityTitle: z.string().nonempty("Title is a required field"),
     activityType: z.string().nonempty("Activity Type is a required field"),
     activityExerciseName: z.string().optional(),
     activityFiscalYear: z.string().optional(),

  
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