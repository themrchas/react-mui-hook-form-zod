//Installed to use zod with react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'


import { schemaActivity } from "../schemas/schemaActivity";
import { schemaFiveW } from '../schemas/schemaFiveW'
import { schemaTravel } from "../schemas/schemaTravel"
import { schemaConop } from "../schemas/schemaConop";

//Associated with the Approval tab
import { approvalSpecialValidation, approvalEventCategoryChoices, approvalAdditionalActivityChoices } from "../schemas/schemaApproval"; 


const synchSchema = schemaActivity
        .extend(schemaFiveW.shape)
      //  .extend({ travelItems })
        .extend(schemaTravel.shape)
        .extend({ approvalSpecialValidation })
        .extend({ approvalEventCategoryChoices })
        .extend({ approvalAdditionalActivityChoices })
        .extend( schemaConop.shape )
       


//This sets the form schema based on the zod mini-schemas for eacg tab component
export type SynchFormSchema = z.infer<typeof synchSchema>;

export type TravelFormSchema =  z.infer<typeof schemaTravel>;
