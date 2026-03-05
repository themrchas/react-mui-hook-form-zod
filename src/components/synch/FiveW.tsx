import React from "react";

import { useFormContext } from "react-hook-form";

import { useEffect } from "react";

import { Stack, TextField, Typography, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';

export const FiveW = () => {

    const { register, formState: {errors}} = useFormContext();

    return (
    <>

     <TextField
                                
                                id="w5missionStatement"
                                type="text"
                                label="Mission Statement"
                                {...register("w5missionStatement")}
                                error={!!errors.w5missionStatement}
                               helperText={ !!errors.w5missionStatement ?   <Typography color="error">{String(errors.activityTitle?.message)} </Typography> : null }
                            />

</>
    )

} //5W