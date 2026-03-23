import React from "react";

import { Tabs, Tab, Box, Typography }from '@mui/material'
import { useEffect, useState } from "react";


import { DevTool } from "@hookform/devtools"

import dayjs, { Dayjs } from "dayjs";

import customParseFormat from 'dayjs/plugin/customParseFormat.js';

// Extend dayjs with the plugin
dayjs.extend(customParseFormat);

//Installed to use zod with react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'



//import { activitySchema } from "../schemas/synchSchema"

//import { schemaFiveW } from '../schemas/schemaFiveW'
//import { schemaFiveWTest } from '../schemas/schemaFiveW'
//import { activitySchema } from "../schemas/_synchSchema";
//import { activitySchema } from "../schemas/schemaActivity";
//import {  travelItems } from "../schemas/schemaTravel"
import {  rootSchema  /* conopItem */} from "../schemas/schemaSandbox";


//Associated with the Approval tab
//import { approvalSpecialValidation, approvalEventCategoryChoices, approvalAdditionalActivityChoices } from "../schemas/schemaApproval"; 

//import {APPROVER_LABEL_SNR, APPROVER_LABEL_MEDAD, APPROVER_LABEL_LEGAD, APPROVER_LABEL_SECURITY} from '../constants/approvalConstants'
//import {EVENT_CATEGORY_MILESTONE, EVENT_CATEGORY_KEY_EVENT, EVENT_CATEGORY_BATLLE_RHYTHM, EVENT_CATEGORY_VTC, EVENT_CATEGORY_KLE } from '../constants/approvalConstants'
//import {ADDITIONAL_ACTVITY_CONOP_APPROVAL, ADDITIONAL_ACTVITY_NO_REPORT_REQUIRED } from '../constants/approvalConstants'

//const synchSchema = activitySchema.extend(schemaFiveW);
//const synchSchema = activitySchema.extend(schemaFiveW.shape).extend(travelItem.shape);
/*const synchSchema = activitySchema
        .extend(schemaFiveW.shape)
        .extend({ travelItems })
        .extend({ approvalSpecialValidation })
        .extend({ approvalEventCategoryChoices })
        .extend({ approvalAdditionalActivityChoices })
        .extend({ conop })
       //.extend({ conopItem })
       */

       const synchSchema = rootSchema


//This sets the form schema based on the zod mini-schemas for eacg tab component
type SynchFormValues = z.infer<typeof synchSchema>;

import {  FormProvider, useForm } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import type { IActivityTest } from "../types/activity";
import type { I5W } from "../types/5w";
import type { ITabPanelProps } from '../types/application'

import { TABS } from '../constants/synchConstants'

import { SandboxConop } from "./synch/SandboxConop";

//Create form interface
interface ISynchTool extends I5W, IActivityTest {};
//interface ISynchTool extends IActivityTest {};


const onSubmit: SubmitHandler<SynchFormValues> = (data: SynchFormValues) => {
    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<SynchFormValues> = (errors: FieldErrors<SynchFormValues>) => {

    console.log("onformError: submission errors are", errors)
}


const CustomTabPanel = (props: ITabPanelProps) => {

    const { children, value, index, ...other } = props;

    return (

        <Box
            sx={{ display: value === index ? 'block' : 'none' }}
            {...other}
        >

            <Typography variant="h5">Tab number {index} </Typography>

            {children}


        </Box>


    ) //return

} //CustomTabPanel

export const Sandbox = () => {


  //const formMethods = useForm<ISynchTool>({
  const formMethods = useForm<SynchFormValues>({
    
        defaultValues:  {
          
   /* conop: {
        situation: "CONOP situation entry"
    }
        */
     
    conop: {
 /*   situation: "CONOP situation entry",
     
    purpose: "CONOP puropose",
    desiredOutcome: [ "Desired outcome 1", "Desired outcome 2"],
*/
        internalSupportRequired: [ 
            { directorate: "J1", internalSupportRequired: "Internal Support Required reason 1"},
            { directorate: "J6", internalSupportRequired: "Internal Support Required reason 2"}
        ],
        
     /*   additionalComments: "CONOP additional comments",
        communicationsPlan: {
            email: "the@the.com",
            alternateEmail: "world@world.net",
            phone: "45087-07987",
            alternatePhone: "66778"

        },
        recordOfDecision: "https://google.com"
  */

    }
    

       
            }, //defaultValues
            mode: "onBlur",
            resolver: zodResolver(synchSchema)
            
    
        }) //useForm


         const { register, control, handleSubmit, formState, watch, reset } = formMethods

        const [currentTabIndex, setNewTabIndex] = useState<number>(TABS.Zero);


          const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {
        
                console.log('event is', event, 'and newTabIdnex is', newTabIndex)
        
                setNewTabIndex((oldTabIndex: number) => {
        
                    return newTabIndex
        
                })
        
        
            } //handleTabChange




return (

        <>


        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>
                <Tabs value={currentTabIndex} onChange={handleTabChange}>
                    <Tab label="Sandbox">
                    </Tab>
                    
                </Tabs>

                                         
                    <CustomTabPanel value={currentTabIndex} index={0}>
                        <SandboxConop />
                    </CustomTabPanel>
           
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>

)



    } //Synch