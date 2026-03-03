import React from "react";

import { useFormContext } from "react-hook-form";

import { Stack, TextField } from '@mui/material';

export const Comp1 = () => {

    const { register } = useFormContext()

  return (
   
   
   <Stack>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username")}                                       
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        {...register("email")}     
                    />

                    <TextField
                            label="City"
                            id="city"
                            type="text"
                            {...register("city")}
                          /*  error={!!formState.errors.email}
                            helperText={!!formState.errors.email ? formState.errors.email.message : ""}
                            */

                        />





     </Stack>

                    )



} //Comp1