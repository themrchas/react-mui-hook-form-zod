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
import { schemaActivity } from "../schemas/schemaActivity";
import { schemaFiveW } from '../schemas/schemaFiveW'
//import { activitySchema } from "../schemas/_synchSchema";
import { schemaTravel } from "../schemas/schemaTravel"
import { schemaConop } from "../schemas/schemaConop";

//Associated with the Approval tab
import { approvalSpecialValidation, approvalEventCategoryChoices, approvalAdditionalActivityChoices } from "../schemas/schemaApproval"; 

import {APPROVER_LABEL_SNR, APPROVER_LABEL_MEDAD, APPROVER_LABEL_LEGAD, APPROVER_LABEL_SECURITY} from '../constants/approvalConstants'
import {EVENT_CATEGORY_MILESTONE, EVENT_CATEGORY_KEY_EVENT, EVENT_CATEGORY_BATLLE_RHYTHM, EVENT_CATEGORY_VTC, EVENT_CATEGORY_KLE } from '../constants/approvalConstants'
import {ADDITIONAL_ACTVITY_CONOP_APPROVAL, ADDITIONAL_ACTVITY_NO_REPORT_REQUIRED } from '../constants/approvalConstants'
import {STRATEGIC_APPROACH_ONE, STRATEGIC_APPROACH_TWO, STRATEGIC_APPROACH_THREE, STRATEGIC_APPROACH_FOUR} from '../constants/activityConstants'




//const synchSchema = activitySchema.extend(schemaFiveW);
//const synchSchema = activitySchema.extend(schemaFiveW.shape).extend(travelItem.shape);
const synchSchema = schemaActivity
        .extend(schemaFiveW.shape)
      //  .extend({ travelItems })
        .extend(schemaTravel.shape)
        .extend({ approvalSpecialValidation })
        .extend({ approvalEventCategoryChoices })
        .extend({ approvalAdditionalActivityChoices })
        .extend( schemaConop.shape )
       


//This sets the form schema based on the zod mini-schemas for eacg tab component
type SynchFormValues = z.infer<typeof synchSchema>;



import {  FormProvider, useForm } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import type { IActivityTest } from "../types/activity";
import type { I5W } from "../types/5w";
import type { ITabPanelProps } from '../types/application'

import { TABS } from '../constants/synchConstants'



//Import components corresponding to each tab
import { Activity } from "./synch/Activity";
import { FiveW } from "./synch/FiveW";
import { Travel } from './synch/Travel'
import { ApprovalSpecialValidation }from './synch/ApprovalSpecialValidation'
/*import { ApprovalEventCategories } from "./synch/ApprovalEventCategories";
import { ApprovalAdditionalActivity } from "./synch/ApprovalAdditionalActivity";
*/
import { Conop } from "./synch/Conop";

import { GenericCheckbox } from "./synch/GenericCheckbox";


//Create form interface
interface ISynchTool extends I5W, IActivityTest {};
//interface ISynchTool extends IActivityTest {};


//const onSubmit: SubmitHandler<IActivityTest> = (data: IActivityTest) => {
const onSubmit: SubmitHandler<SynchFormValues> = (data: SynchFormValues) => {
    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<IActivityTest> = (errors: FieldErrors<IActivityTest>) => {

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

export const Synch = () => {


  //const formMethods = useForm<ISynchTool>({
  const formMethods = useForm<SynchFormValues>({
    
        defaultValues:  {

            activity: {
          
              classification: "",
              title: "",
              type: "",
              exerciseName: "",
              fiscalYear: "",
            
              missionTimeline: {
                    travelStart: null,
                    travelEnd: null,
                    dutyStart: null,
                    dutyEnd: null
              },

              lineOfEffort: "",
              commanderPriority: "",
              decisiveCondtion: "",

              strategicApproach: [

                { label:STRATEGIC_APPROACH_ONE,  checked: true, disabled: false },
                { label:STRATEGIC_APPROACH_TWO, checked: true, disabled: false },
                { label:STRATEGIC_APPROACH_THREE, checked: false, disabled: false },
                { label :STRATEGIC_APPROACH_FOUR, checked: true, disabled: true },
              
              ],

              destinationsAndTimeline: [
                {location:"Belgium", startDateTime:dayjs('2026-02-15 04:00'), endDateTime: dayjs('2026-03-02 18:00', 'YYYY-MM-DD HH:mm')},
                {location:"Netherlands", startDateTime:dayjs('2026-02-15 04:00'), endDateTime: dayjs('2026-03-02 18:00', 'YYYY-MM-DD HH:mm')},
                {location:"France", startDateTime:dayjs('2026-02-15 04:00'), endDateTime: dayjs('2026-06-02 18:00', 'YYYY-MM-DD HH:mm')},
                {location:"Germany", startDateTime:dayjs('2026-02-15 04:00'), endDateTime: dayjs('2026-05-02 18:00', 'YYYY-MM-DD HH:mm')},

              ],

              leadDirectorate: "",
              planningOPR: "Burns, Frank",

              participantsByOffice: [
              
                { office: "DIR 1", count: 2, purpose: "Purpose of participation 1"},
                { office: "DIR 2", count: 5, purpose: "Purpose of participation 2"},
                { office: "DIR 1", count: 1, purpose: "Purpose of participation 3"},

              ],

              missionLead: "SMITH, Till"

            },

            fiveW: {

             missionStatement: "",
             desiredOutput: "",

              communicationPlan: {
                email:"",
                alternateEmail: "",
                phone: "",
                alternatePhone: ""
              }
            },

            travel : {
              //travelItems: []
              travelers: [
                /*
                {office: "J4", person: "Beavis", travelStart:"2025-09-12", travelEnd: "2025-09-15", travelModes: ["Air","Sea"]},
                {office: "J5", person: "Butthead", travelStart:"2026-09-12", travelEnd: "2026-09-15", travelModes: ["Auto"]}
                */
          /*     {office: "J4", person: "Beavis", travelStart:dayjs('2026-02-15 04:00', 'YYYY-MM-DD HH:mm'), travelEnd: dayjs('2026-03-02 18:00', 'YYYY-MM-DD HH:mm'), travelModes: ["Air","Sea"]},
                {office: "J5", person: "Butthead", travelStart:dayjs(), travelEnd: dayjs(), travelModes: ["Auto"]}
            */
           {office: "J4", person: "Beavis", travelStart:dayjs('2026-02-15 04:00'), travelEnd: dayjs('2026-03-02 18:00', 'YYYY-MM-DD HH:mm'), travelModes: ["Air","Sea"]},
          {office: "J5", person: "Butthead", travelStart:dayjs(), travelEnd: dayjs(), travelModes: ["Auto"]}
           
                
              ],

            },

              approvalSpecialValidation:  [
                
      { approver:APPROVER_LABEL_SNR,  chkBoxValidate: { checked: true, disabled: false }, radioBtnDecision: { decision: "Yes", disabled: false } },
      { approver:APPROVER_LABEL_MEDAD,chkBoxValidate: { checked: false, disabled: false }, radioBtnDecision: { decision: "NA", disabled: false } },
      { approver:APPROVER_LABEL_LEGAD, chkBoxValidate: { checked: true, disabled: true }, radioBtnDecision: { decision: "Pending", disabled: true } },
      { approver:APPROVER_LABEL_SECURITY, chkBoxValidate: { checked: false, disabled: false }, radioBtnDecision: { decision: "No", disabled: false } }
    ],

    approvalEventCategoryChoices: [
        { label: EVENT_CATEGORY_MILESTONE, checked: true, disabled: false },
        { label: EVENT_CATEGORY_KEY_EVENT,  checked: true, disabled: false },
        { label: EVENT_CATEGORY_BATLLE_RHYTHM, checked: true, disabled: false },
        { label: EVENT_CATEGORY_VTC,   checked: true, disabled: false },
        { label: EVENT_CATEGORY_KLE,  checked: true, disabled: false },

    ],

        approvalAdditionalActivityChoices: [

            /*
            { activity: ADDITIONAL_ACTVITY_CONOP_APPROVAL, chkBoxAdditionalActivity: { checked: true, disabled: false } },
            { activity: ADDITIONAL_ACTVITY_NO_REPORT_REQUIRED, chkBoxAdditionalActivity: { checked: true, disabled: false } },
        */
        { label: ADDITIONAL_ACTVITY_CONOP_APPROVAL, checked: true, disabled: false  },
        { label: ADDITIONAL_ACTVITY_NO_REPORT_REQUIRED,  checked: true, disabled: false  }
        


    ],
   
    conop: {
        situation: "CONOP situation entry",
     
        purpose: "CONOP puropose",
        keyTask: [ {task: "Key task description 1"}, { task:"Key task description 2" }, { task: "Key task description 3" }],

        desiredOutcome: [ { outcome: "Desired outcome 1"}, { outcome: "Desired outcome 2"}],
        internalSupportRequired: [ 
            { directorate: "J1", internalSupportRequired: "Internal Support Required reason 1"},
            { directorate: "J6", internalSupportRequired: "Internal Support Required reason 2"}
        ],
        additionalComments: "CONOP additional comments",
        communicationsPlan: {
            email: "the@the.com",
            alternateEmail: "world@world.net",
            phone: "45087-07987",
            alternatePhone: ""

        },
        recordOfDecision: "https://google.com"
  

   } //conop
        
        }, //defaultValues
            mode: "onBlur",
           // resolver: zodResolver(activitySchema)
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
                    <Tab label="Activity">
                    </Tab>
                    <Tab label="5W">
                    </Tab>
                    <Tab label="Travel Worksheet">
                    </Tab>
                    <Tab label="Approval">
                    </Tab>
                    <Tab label="Conop">
                    </Tab>
                </Tabs>

                    <CustomTabPanel value={currentTabIndex} index={0}>
                        <Activity />

                                              
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={1}>
                        <FiveW />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={2}>
                        <Travel />
                        
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={3}>

                        <ApprovalSpecialValidation />

                        <GenericCheckbox
                            items={watch("approvalEventCategoryChoices")}
                            namePrefix="approvalEventCategoryChoices"
                    />
                 {/*       <ApprovalEventCategories />  */}
                   {/*     <ApprovalAdditionalActivity /> */}
                         <GenericCheckbox
                            items={watch("approvalAdditionalActivityChoices")}
                            namePrefix="approvalAdditionalActivityChoices"
                    />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={4}>
                        <Conop />
                    </CustomTabPanel>
           
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>

)



    } //Synch