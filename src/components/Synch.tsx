import React from "react";



import { DevTool } from "@hookform/devtools"

import { Dayjs } from "dayjs";

//Installed to use zod with react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'


//import { activitySchema } from "../schemas/synchSchema"

import { schemaFiveW } from '../schemas/schemaFiveW'
import { schemaFiveWTest } from '../schemas/schemaFiveW'
//import { activitySchema } from "../schemas/_synchSchema";
import { activitySchema } from "../schemas/schemaActivity";

//const synchSchema = activitySchema.extend(schemaFiveW);
const synchSchema = activitySchema.extend(schemaFiveW.shape);

type SynchFormValues = z.infer<typeof synchSchema>;

import {  FormProvider, useForm } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import type { IActivityTest } from "../types/activity";
import type { I5W } from "../types/5w";



//Import components corresponding to each tab
import { Activity } from "./synch/Activity";
import { FiveW } from "./synch/FiveW";

//Create form interface
interface ISynchTool extends I5W, IActivityTest {};
//interface ISynchTool extends IActivityTest {};


const onSubmit: SubmitHandler<IActivityTest> = (data: IActivityTest) => {
    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<IActivityTest> = (errors: FieldErrors<IActivityTest>) => {

    console.log("onformError: submission errors are", errors)
}

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
              }
        
            }, //defaultValues
            mode: "onBlur",
           // resolver: zodResolver(activitySchema)
           resolver: zodResolver(synchSchema)
    
        }) //useForm


         const { register, control, handleSubmit, formState, watch, reset } = formMethods

return (

        <>


        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>
            <Activity />
            <FiveW />
           
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>

)



    } //Synch