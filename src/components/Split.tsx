import React from "react";

import { DevTool } from "@hookform/devtools"

import {  FormProvider, useForm } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import type { ISplitForm } from "../types/splitform";

import { Comp1 } from '../components/splitform/Comp1'
import { Comp2 } from '../components/splitform/Comp2'


const onSubmit: SubmitHandler<ISplitForm> = (data: ISplitForm) => {
    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<ISplitForm> = (errors: FieldErrors<ISplitForm>) => {

    console.log("onformError: submission errors are", errors)
}


export const Split = () => {

    const formMethods = useForm<ISplitForm>({
    
            defaultValues: async () => {
    
                const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
                const data = await response.json()
                return {
                    username: data.name,
                    email: data.email,
                    street: data.address.street,
                    color: "blue"
                   
                }
            }, //defaultValues
            mode: "onBlur"
    
        }) //useForm

        const { register, control, handleSubmit, formState, watch, reset } = formMethods


    return (

        <>


        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>
            <Comp1 />
            <Comp2 />
            <button type="submit">Submit</button>
            </form>
        </FormProvider>


        <DevTool control={control} />

        
        </>


    )








} //Split