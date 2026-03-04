import React from "react";

import { DevTool } from "@hookform/devtools"

import {  FormProvider, useForm } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import type { IActivityTest } from "../types/activity";

import { Activity } from "./synch/Activity";




const onSubmit: SubmitHandler<IActivityTest> = (data: IActivityTest) => {
    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<IActivityTest> = (errors: FieldErrors<IActivityTest>) => {

    console.log("onformError: submission errors are", errors)
}

export const Synch = () => {


  const formMethods = useForm<IActivityTest>({
    
        defaultValues:  {
          
              activityClassification: "",
              activityTitle: "",
              activityType: "",
              activityExerciseName: "",
              activityFiscalYear: null

        
            }, //defaultValues
            mode: "onBlur"
    
        }) //useForm


         const { register, control, handleSubmit, formState, watch, reset } = formMethods

return (

        <>


        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>
            <Activity />
           
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>

)



    } //Synch