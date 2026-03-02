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
                        {...register("username")}                                       
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        {...register("email")}     
                    />


     </Stack>

                    )



} //Comp1