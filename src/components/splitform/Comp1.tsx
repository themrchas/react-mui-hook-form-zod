import React from "react";

import { useFormContext } from "react-hook-form";

import { Stack } from '@mui/material';

export const Comp1 = () => {

    const { register } = useFormContext()

  return (
   
   
   <Stack>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username",
                            {
                                required: "Username cannot be blank and must start with a non-whitespace character",
                                pattern: {
                                    value: /^\S+/,
                                    message: "Username must begin with a non whitespace character"
                                },
                                validate: {
                               
                            } //validate

                            }
                        )}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        {...register("email",
                            { 
                                required: "E-mail must contain a value",
                                validate: {
                                    nameExists: async (fieldValue) => {

                                        const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                                        const data = await response.json();
                                    
                                    //Test if data.length === 0...if not, then the email already exists
                                    return data.length === 0 || "Email already exists"

                                    }//nameExists

                                } //validate
                            }
                        )} />


     </Stack>

                    )



} //Comp1