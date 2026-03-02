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
                        {...register("street",)}                        
                        
                    />

                    <label htmlFor="color">E-mail</label>
                    <input
                        type="text"
                        id="color"
                        {...register("color")}                          
                    />


     </Stack>

                    )





    
} //Comp2