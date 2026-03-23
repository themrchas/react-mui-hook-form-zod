
import { useFormContext, get } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box,  InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';

export const Conop = () => {

    const { register, formState: {errors}} = useFormContext();

    return (
    <>

     <TextField
                                
                                id="conop-situation"
                                type="text"
                                label="Situation"
                                {...register("conop.situation")}
                                error={!!get(errors, "conop.situation")}
                             //  helperText={ !!errors.conop?.situation   <Typography color="error">{String(errors.conop?.situation?.message)} </Typography> : null }
                             helperText={get(errors, "conop.situation")?.message ? (
    <Typography color="error">{get(errors, "conop.situation")?.message}</Typography>
  ) : null}
                            />

</>
    )

} //Conop