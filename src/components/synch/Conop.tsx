
import { useFormContext, get, useFieldArray } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box,  Button, InputAdornment, Select, MenuItem, Autocomplete } from '@mui/material';




export const Conop = () => {

    const { register, control, formState: {errors}} = useFormContext();

    const { fields: fieldsKeyTasks, append: appendKeyTasks, remove: removeKeyTasks } = useFieldArray({
                name: 'conop.keyTask',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
                control  //This is control returned from useForm hook
        
            })

    const { fields: fieldsDesiredOutcomes, append:appendDesiredOutcomes, remove: removeDesiredOutcomes } = useFieldArray({
                name: 'conop.desiredOutcome',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
                control  //This is control returned from useForm hook
        
            })

    return (
    


    <Box sx={{ width: 1 / 2, m: 3 }}>
        <Stack spacing={2}>

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


                            <TextField
                                
                                id="conop-purpose"
                                type="text"
                                label="Purpose"
                                {...register("conop.purpose")}
                                error={!!get(errors, "conop.purpose")}
                             //  helperText={ !!errors.conop?.situation   <Typography color="error">{String(errors.conop?.situation?.message)} </Typography> : null }
                             helperText={get(errors, "conop.purpose")?.message ? (
    <Typography color="error">{get(errors, "conop.purpose")?.message}</Typography>
  ) : null}
                            />


  <Grid container spacing={2}>

                    {fieldsKeyTasks.map((field, index) => (

                        <>

                            
                            <Grid size={9}>
                                <TextField
                                    key={field.id}
                                    label={`Key Task ${index + 1}`}
                                    {...register(`conop.keyTask.${index}.task`)}
                                    //defaultValue={field.task}
                                    fullWidth
                                    slotProps={{
                                        input: { startAdornment: <InputAdornment position="start">{index}</InputAdornment> }
                                    }}
                                />
                            </Grid>
                                    <Grid size={3}> <Button type="button" onClick={() => removeKeyTasks(index)}>Remove</Button></Grid>
                        </>

))}




 
 </Grid>

  <Grid container spacing={2}>

                    {fieldsDesiredOutcomes.map((field, index) => (

                        <>

                            
                            <Grid size={9}>
                                <TextField
                                    key={field.id}
                                    label={`Desired Outcome ${index + 1}`}
                                    {...register(`conop.desiredOutcome.${index}.outcome`)}
                                    //defaultValue={field.task}
                                    fullWidth
                                    slotProps={{
                                        input: { startAdornment: <InputAdornment position="start">{index}</InputAdornment> }
                                    }}
                                />
                            </Grid>
                                    <Grid size={3}> <Button type="button" onClick={() => removeDesiredOutcomes(index)}>Remove</Button></Grid>
                        </>

))}




 
 </Grid>




</Stack>
            </Box>


    )

} //Conop