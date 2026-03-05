import React from "react";

import { DevTool } from "@hookform/devtools"

import { Dayjs } from "dayjs";

//Installed to use zod with react hook form
import { zodResolver } from "@hookform/resolvers/zod";

import { activitySchema } from "../schemas/synchSchema"

import {  FormProvider, useForm } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

import type { IActivityTest } from "../types/activity";
import type { I5WTest } from "../types/5w";


import { Activity } from "./synch/Activity";
import { FiveW } from "./synch/FiveW";

interface ISynchTool extends I5WTest, IActivityTest {};


const onSubmit: SubmitHandler<IActivityTest> = (data: IActivityTest) => {
    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<IActivityTest> = (errors: FieldErrors<IActivityTest>) => {

    console.log("onformError: submission errors are", errors)
}

export const Synch = () => {


  const formMethods = useForm<ISynchTool>({
    
        defaultValues:  {
          
              activityClassification: "",
              activityTitle: "",
              activityType: "",
              activityExerciseName: "",
              activityFiscalYear: "",

              w5missionStatement: "",

              
              activityMissionTimeline: {
                    travelStart: null,
                    travelEnd: null,
                    dutyStart: null,
                    dutyEnd: null
              }
    

        
            }, //defaultValues
            mode: "onBlur",
            resolver: zodResolver(activitySchema)
    
        }) //useForm


         const { register, control, handleSubmit, formState, watch, reset } = formMethods

return (

        <>


        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>
            <Activity />
          {/*  <FiveW />*/}
           
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>

)



    } //Synch