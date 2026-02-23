import React from "react";

//Installed to use zod with react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"

import { Box, Typography, Tab, Tabs, Stack, Button, TextField } from '@mui/material'

import { useForm, useFieldArray, Controller} from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

import { useEffect, useState } from "react";


const TABS  = {
    Zero: 0,
    One: 1,
    Two:  2

} as const //TABS



interface ITabPanelProps {

    children?: React.ReactNode;
    index: number;
    value: number

} //ITabPanelProps

interface IFormInput{
    username: string
    email: string
    street: string
    color?: string
}


const schema = z.object({

    username: z.string().nonempty("Username cannot be empty"),
    email: z.email().nonempty("Email address must be specified"),
    street: z.string().nonempty("Street is a required field"),
    color: z.string("Value must be a string").startsWith("q").optional(),
    
})


const CustomTabPanel = (props: ITabPanelProps) => {

        const { children, value, index, ...other } = props;

        return (

            <Box 
                sx={{ display: value === index ? 'block': 'none'}}
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

        setNewTabIndex( (oldTabIndex: number) => {

            return newTabIndex

        })


    } //handleTabChange


    return (

        <Box sx={{width: "500"}}>
            <Typography variant="h5" sx={{m:2}}>Tabs Example</Typography> 

            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>
           <Tabs value={currentTabIndex} onChange={handleTabChange}>
                <Tab label="Tab  1" />
                <Tab label="Tab  2" />
            </Tabs>

           

                <CustomTabPanel value={currentTabIndex} index={0}>
                    <Typography>Money 0</Typography>
                        <Controller

                                name="username"
                                control={control}
                                // defaultValue="Yes - money!"

                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="usernameTextFieldLabel"
                                        variant="outlined"
                                        error={!!formState.errors.username}
                                        helperText={formState.errors.username ? formState.errors.username.message : ""}
                                        slotProps={{
                                            inputLabel: { shrink: true }
                                        }}

                                    />
                                )}

                            /> {/* Controller */}

                     <TextField 
                        label="email"
                        id="email"
                        type="text"
                        {...register("email")}
                        error={!!formState.errors.email}
                        helperText={formState.errors.email ? formState.errors.email.message : ""}

                    />


                </CustomTabPanel>
                <CustomTabPanel value={currentTabIndex} index={1}>
                    <Typography>Money 1</Typography>

                    <TextField 
                        label="street"
                        id="street"
                        type="text"
                    />

                     <TextField 
                        label="color"
                        id="color"
                        type="text"
                    />
                </CustomTabPanel>

 

         
          <Stack direction="row" sx={{ my:3}}>
                   <Button variant="contained" type="submit" color="info">Submit</Button>
                 {/*}  <Button 
                        variant="contained" 
                        type="button" 
                        color="info"
                        sx={{ ml:3}}
                        onClick={resetForm}
                    >
                    Reset</Button> */}
                   </Stack>

                   </form>



        </Box>

        

    )  //return




} //TabsDemo