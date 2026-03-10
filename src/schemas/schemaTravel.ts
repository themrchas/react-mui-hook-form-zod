import * as z from 'zod'

import dayjs, {Dayjs} from 'dayjs';

//Schema for the Travel tab, sans 'Travel Worksheet'
export const travelItem= z.object({

     office: z.string(),
     person: z.string(),
   //  travelStart: z.string().nonempty(),
   //  travelEnd: z.string().nonempty(),
     travelStart: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),
     travelEnd: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),  
               
     travelModes: z.array(z.string().nonempty())

}) //travelItem



export const travelItems = z.array(travelItem)
 