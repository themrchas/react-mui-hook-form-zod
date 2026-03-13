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

import { schemaFiveW } from '../schemas/schemaFiveW'
import { schemaFiveWTest } from '../schemas/schemaFiveW'
//import { activitySchema } from "../schemas/_synchSchema";
import { activitySchema } from "../schemas/schemaActivity";
import { travelItem , travelItems } from "../schemas/schemaTravel"
import { approvalSpecialValidation } from "../schemas/schemaApproval"; 

//const synchSchema = activitySchema.extend(schemaFiveW);
//const synchSchema = activitySchema.extend(schemaFiveW.shape).extend(travelItem.shape);
const synchSchema = activitySchema
        .extend(schemaFiveW.shape)
        .extend({ travelItems })
        .extend({approvalSpecialValidation});


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
import { Approval }from './synch/Approval'

//Create form interface
interface ISynchTool extends I5W, IActivityTest {};
//interface ISynchTool extends IActivityTest {};


const onSubmit: SubmitHandler<IActivityTest> = (data: IActivityTest) => {
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
          
              activityClassification: "",
              activityTitle: "",
              activityType: "",
              activityExerciseName: "",
              activityFiscalYear: "",
            
              activityMissionTimeline: {
                    travelStart: null,
                    travelEnd: null,
                    dutyStart: null,
                    dutyEnd: null
              },

             w5missionStatement: "",
             w5desiredOutput: "",

              w5communicationPlan: {
                email:"",
                alternateEmail: "",
                phone: "",
                alternatePhone: ""
              },

              //travelItems: []
              travelItems: [
                /*
                {office: "J4", person: "Beavis", travelStart:"2025-09-12", travelEnd: "2025-09-15", travelModes: ["Air","Sea"]},
                {office: "J5", person: "Butthead", travelStart:"2026-09-12", travelEnd: "2026-09-15", travelModes: ["Auto"]}
                */
               {office: "J4", person: "Beavis", travelStart:dayjs('2026-02-15 04:00', 'YYYY-MM-DD HH:mm'), travelEnd: dayjs('2026-03-02 18:00', 'YYYY-MM-DD HH:mm'), travelModes: ["Air","Sea"]},
                {office: "J5", person: "Butthead", travelStart:dayjs(), travelEnd: dayjs(), travelModes: ["Auto"]}
                
              ],

              approvalSpecialValidation:  [
      { chkBoxValidate: { checked: true, disabled: false }, radioBtnDecision: { decision: "Yes", disabled: false } },
      { chkBoxValidate: { checked: false, disabled: false }, radioBtnDecision: { decision: "NA", disabled: false } },
      { chkBoxValidate: { checked: true, disabled: true }, radioBtnDecision: { decision: "Pending", disabled: true } },
      { chkBoxValidate: { checked: false, disabled: false }, radioBtnDecision: { decision: "No", disabled: false } }
    ]
        
        
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
                </Tabs>

                    <CustomTabPanel value={currentTabIndex} index={0}>
                        <Activity />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={1}>
                        <FiveW />
                    </CustomTabPanel><CustomTabPanel value={currentTabIndex} index={2}>
                        <Travel />
                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={3}>
                        <Approval />
                    </CustomTabPanel>
           
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>

)



    } //Synch