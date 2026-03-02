import React from "react";

import { useFormContext } from "react-hook-form";

import { Stack } from '@mui/material';

export const Comp2 = () => {

    const { register } = useFormContext()


return (

    
   
   
   <Stack>

                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        {...register("street",
                            {
                                required: "Street cannot be blank and must start with a non-whitespace character",
                                pattern: {
                                    value: /^\S+/,
                                    message: "Street must begin with a non whitespace character"
                                },
                                validate: {
                                    noElm: (value) => {
                                        return (
                                            !value.includes("Elm") || "The street cannot contain the word 'Elm'"
                                        )
                                    },
                                    noNumber: (value) => {
                                        return (
                                            /\d+/.test(value) || "The street must contain at least one digit.")
                                    }
                                } //validate


                            } //register options
                        )}
                    />


                    <label htmlFor="color">E-mail</label>
                    <input
                        type="text"
                        id="color"
                        {...register("color",
                            { 
                                required: "Color must contain a value",
                                validate: {
                                    checkcolor: async (fieldValue) => {
                                                                      
                                    //Test if data.length === 0...if not, then the email already exists
                                    return fieldValue !== "yellow" || "Color cannot be yellow"

                                    }//nameExists

                                } //validate
                            }
                        )} />


     </Stack>

                    )





    
} //Comp2