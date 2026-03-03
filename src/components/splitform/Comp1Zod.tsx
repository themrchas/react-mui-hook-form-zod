import React from "react";

import { useFormContext } from "react-hook-form";

import { Stack, TextField, Typography, InputLabel, Select, MenuItem } from '@mui/material';

const states: string[] = ["FL", "GA", "NJ", "NY"]

export const Comp1 = () => {

    const { register, getValues, formState: {errors}} = useFormContext()

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
                            //label="City"
                            id="city"
                            type="text"
                            {...register("city")}
                            error={!!errors.city}
                        //    helperText={ !!errors.city ?  <Typography color="error">{errors.city?.message}</Typography> : null }
                            helperText={ !!errors.city ?   <Typography color="error">{String(errors.city?.message)} </Typography> : null }
                        />
                       
                <InputLabel id="lblClassification">Classification</InputLabel>
                        <Select

                        displayEmpty
                        labelId="lblClassification" 
                        {...register("state")}
                        //onChange={getNativeSelectUtilityClasses('')}
                        value={getValues('state')|| ""}
                        //fullWidth  //Expands the select statement to the size of the parent container
                        //multiple
              
            >
                { states.map( 
                    (item) => <MenuItem key={item} value={item}>{item}</MenuItem>)

                }
          
            </Select>
                    
            
                        





     </Stack>

                    )



} //Comp1