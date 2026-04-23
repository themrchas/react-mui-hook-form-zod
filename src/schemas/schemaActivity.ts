import * as z from 'zod'

import dayjs, {Dayjs} from 'dayjs';

//Replaced with genericCheckBox object
const strategicApproachCheckbox = z.object({
    checked:z.boolean(),
    disabled: z.boolean()
})

//Replaced with genericCheckBox object
const strategicApproachItem = z.object({

     strategicApproach: z.string().nonempty(),
     chkBoxStrategicApproach: strategicApproachCheckbox

})


import { genericCheckBox } from './schemaComponentCheckbox';

const destinationAndTimelineItem = z.object({

      location: z.string().nonempty(),
      startDateTime: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),
      endDateTime: z
               .custom<Dayjs>((val) => val === null || val instanceof dayjs)
               .nullable(),


}) //destinationAndTimelineItem


const participantByOffice = z.object({

      office: z.string().nonempty(),
      count: z.number(),
      purpose: z.string().optional()

}) //participantsByOffice



const activityItem = z.object({

     classification: z.string().nonempty("Classification is a required field"),
     title: z.string().nonempty("Title is a required field"),
     type: z.string().nonempty("Activity Type is a required field"),
     exerciseName: z.string().optional(),
     fiscalYear: z.string().optional(),

  
     missionTimeline: z.object({
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
     }),

     lineOfEffort: z.string().nonempty("Line of Effort is a required field"),
     commanderPriority: z.string().nonempty("Commander Priority is a required field."),
     decisiveCondtion: z.string().nonempty("Decisive Condition is a required field."),

   //  strategicApproach: z.array(strategicApproachItem)
   strategicApproach: z.array(genericCheckBox),
   destinationsAndTimeline: z.array(destinationAndTimelineItem),
   leadDirectorate: z.string().nonempty("Lead directory is a required field"),
   planningOPR: z.string().nonempty("Planning OPR is a required field"),
   participantsByOffice: z.array(participantByOffice),
   missionLead: z.string().nonempty("Planning OPR is a required field"), 
   division: z.string().nonempty("Division is a required field"), 



}) //activityItem

export const schemaActivity = z.object({ activity: activityItem});