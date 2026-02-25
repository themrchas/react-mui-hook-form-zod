import React from "react";

//Installed to use zod with react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

import type { IActivity  }  from './types/activity.ts';
import type { I5W } from './types/5w.ts';
import type { ITabValidity, ITabPanelProps }from './types/application.ts';
import type { IApproval } from './types/approval.ts';
import type { IConop } from './types/conop.ts';
import type { ITravelWorksheet } from './types/travel.ts';

import type { IFormInput } from "./types/test.ts";


import dayjs, {Dayjs} from 'dayjs';

import { Box, Typography, Tab, Tabs, Stack, Button, TextField } from '@mui/material'

import { useForm, useFieldArray, Controller } from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

import { useEffect, useState } from "react";


//A psedo enum to allow tab manipulation
const TABS = {

    Zero: 0,
    One: 1,
    Two: 2

} as const //TABS



const schema = z.object({

    username: z.string().nonempty("Username cannot be empty"),
    email: z.email().nonempty("Email address must be specified and formatted correctly"),
    street: z.string().nonempty("Street is a required field"),
    color: z.string("Value must be a string beginning with the letter 'q'").startsWith("q").optional(),

})


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



const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {

    console.log('Form submitted data is ', data)
}

const onFormError: SubmitErrorHandler<IFormInput> = (errors: FieldErrors<IFormInput>) => {

    console.log("onformError: submission errors are", errors)
}



export const TabsDemo = () => {


    //Grab reference to the form
    const form = useForm<IFormInput>({

        defaultValues: {

            username: "Beavis",
            email: "beavis@the.com",
            street: "Butthead Blvd. ",
            color: "blue"

        }, //defaultValues
        mode: "onBlur",
        resolver: zodResolver(schema)

    }) //useForm


    const { register, control, handleSubmit, formState, watch, getValues, setValue, reset } = form

    const [currentTabIndex, setNewTabIndex] = useState<number>(TABS.Zero)


    const handleTabChange = (event: React.SyntheticEvent, newTabIndex: number) => {

        console.log('event is', event, 'and newTabIdnex is', newTabIndex)

        setNewTabIndex((oldTabIndex: number) => {

            return newTabIndex

        })


    } //handleTabChange



    // Track errors for the tabs
    const [tabErrors, setTabErrors] = useState<ITabValidity>({
        Zero: false,
        One: false,
        Two: false
    });


    // Update tab error state when formState changes changes
    useEffect(() => {

        let errorsTest: ITabValidity = {
            Zero: false,
            One: false,
            Two: false
        }

        //These will be organized on a per tab basis
        errorsTest.Zero = !!formState.errors.username || !!formState.errors.email
        errorsTest.One = !!formState.errors.street || !!formState.errors.color;

        setTabErrors(errorsTest);


    }, [formState]); // Per the react-hook-form.com handling for formState.errors, pass 'formstate' object to useEffect




    return (

        <>
            {/* <Typography variant="h6" sx={{ mb: 1 }}>{JSON.stringify(formState.errors)}</Typography>*/}
            <Typography variant="h6" sx={{ mb: 1 }}>Form is dirty: {formState.isDirty ? "true" : "false"}</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>{JSON.stringify(tabErrors)}</Typography>

            <Box sx={{ width: "500" }}>
                <Typography variant="h5" sx={{ m: 2 }}>Tabs Example</Typography>

                <form onSubmit={handleSubmit(onSubmit, onFormError)} noValidate>
                    <Tabs value={currentTabIndex} onChange={handleTabChange}>
                        <Tab label="Tab  0"

                            sx={{
                                bgcolor: tabErrors.Zero ? "red" : "inherit", // Change color to red if there are errors in this tab
                                borderBottom: tabErrors.Zero ? "2px solid red" : "none", // Add a red underline
                            }}

                        />

                        <Tab label="Tab  1"

                            sx={{
                                bgcolor: tabErrors.One ? "red" : "inherit", // Change color to red if there are errors in this tab
                                borderBottom: tabErrors.One ? "2px solid red" : "none", // Add a red underline
                            }}

                        />
                    </Tabs>



                    <CustomTabPanel value={currentTabIndex} index={0}>
                        <Typography>Money 0</Typography>

                        <TextField
                            id="username"
                            label="usernameTextFieldLabel"
                            type="text"
                            {...register("username")}
                            variant="outlined"
                            error={!!formState.errors.username}
                            helperText={formState.errors.username ? formState.errors.username.message : ""}
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}

                        />


                        <TextField
                            label="email"
                            id="email"
                            type="text"
                            {...register("email")}
                            error={!!formState.errors.email}
                            helperText={!!formState.errors.email ? formState.errors.email.message : ""}

                        />


                    </CustomTabPanel>
                    <CustomTabPanel value={currentTabIndex} index={1}>
                        <Typography>Money 1</Typography>

                        <TextField
                            label="street"
                            id="street"
                            type="text"
                            {...register("street")}
                            error={!!formState.errors.street}
                            helperText={!!formState.errors.street ? formState.errors.street.message : ""}
                        />

                        <TextField
                            label="color"
                            id="color"
                            type="text"
                            {...register("color")}
                            error={!!formState.errors.color}
                            helperText={!!formState.errors.color ? formState.errors.color.message : ""}
                        />
                    </CustomTabPanel>




                    <Stack direction="row" sx={{ my: 3 }}>
                        <Button variant="contained" type="submit" color="info">Submit</Button>

                    </Stack>

                </form>



            </Box>

        </>

    )  //return




} //TabsDemo