
import { useFormContext, get, useFieldArray, Controller } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box, Button, InputAdornment, Select, MenuItem, Autocomplete } from '@mui/material';




export const Conop = () => {

    const { register, control, formState: { errors } } = useFormContext();

    const { fields: fieldsKeyTasks, append: appendKeyTasks, remove: removeKeyTasks } = useFieldArray({
        name: 'conop.keyTask',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    })

    const { fields: fieldsDesiredOutcomes, append: appendDesiredOutcomes, remove: removeDesiredOutcomes } = useFieldArray({
        name: 'conop.desiredOutcome',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    })

      const { fields: fieldsInternalSupportRequired, append: appendInternalSupportRequired, remove: removeInternalSupportRequired } = useFieldArray({
        name: 'conop.internalSupportRequired',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
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
<Button type="button" onClick={() => appendKeyTasks(fieldsKeyTasks.length)}>Append</Button>
                
                
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
                <Button type="button" onClick={() => appendDesiredOutcomes(fieldsDesiredOutcomes.length)}>Append</Button>





                <Grid container spacing={2}>

                    {fieldsInternalSupportRequired.map((field, index) => (

                        <>
                            <Grid size={2}>
                                <Controller
                                    name={`conop.internalSupportRequired.${index}.directorate`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} label="Directorate">
                                            <MenuItem value="IT">IT</MenuItem>
                                            <MenuItem value="HR">HR</MenuItem>
                                        </Select>
                                    )}

                                />

                            </Grid>

                            <Grid size={10}>

                                <Controller
                                    name={`conop.internalSupportRequired.${index}.internalSupportRequired`}
                                    control={control}

                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            label="text for inter support required"
                                            variant="outlined"
                                        />


                                    )}
                                />
                              
                            </Grid>

                        </>

                                ))}


                        </Grid>

                



            </Stack>
        </Box>


    )

} //Conop