import React from "react";

import { useFormContext, get } from "react-hook-form";

import { useEffect } from "react";

import { Stack, TextField, Typography, Grid, Box,  InputLabel, Select, MenuItem, Autocomplete } from '@mui/material';

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


    <TextField
                                
                                id="w5desiredOutput"
                                type="text"
                                label="Desired Output"
                                {...register("w5desiredOutput")}
                                error={!!errors.w5desiredOutput}
                               helperText={ !!errors.w5desiredOutput ?   <Typography color="error">{String(errors.activityTitle?.message)} </Typography> : null }
                            />

 <Grid container spacing={2}>
                  <Grid size={{xs:4, md:6}}>
                      <Box>


                        <TextField
                                
                                id="w5communicationPlan.email"
                                type="text"
                                label="Email"
                                {...register("w5communicationPlan.email")}
                                error={!!get(errors, "w5communicationPlan.email")}
                                helperText={get(errors, "w5communicationPlan.email")?.message
? (
      <Typography color="error" variant="caption">
        {get(errors, "w5communicationPlan.email")?.message}
      </Typography>
    ) : null
                                }
                            />

                      </Box>
                  </Grid>

            <Grid size={{xs:4, md:6}}>
                       <Box>


                        <TextField
                                
                                id="w5communicationPlan.alternateEmail"
                                type="text"
                                label="Alternate Email"
                                {...register("w5communicationPlan.alternateEmail")}
                                error={!!get(errors, "w5communicationPlan.alternateEmail")}
                                helperText={get(errors, "w5communicationPlan.alternateEmail")?.message
? (
      <Typography color="error" variant="caption">
        {get(errors, "w5communicationPlan.phone")?.message}
      </Typography>
    ) : null
                                }
                            />

                      </Box>
                  </Grid>



                  <Grid size={{xs:4, md:6}}>
                       <Box>


                        <TextField
                                
                                id="w5communicationPlan.phone"
                                type="text"
                                label="Phone"
                                {...register("w5communicationPlan.phone")}
                                error={!!get(errors, "w5communicationPlan.phone")}
                                helperText={get(errors, "w5communicationPlan.phone")?.message
? (
      <Typography color="error" variant="caption">
        {get(errors, "w5communicationPlan.phone")?.message}
      </Typography>
    ) : null
                                }
                            />

                      </Box>
                  </Grid>
                 
                  <Grid size={{md:4, lg: 6}}>
                      <Box>


                        <TextField
                                
                                id="w5communicationPlan.alternatePhone"
                                type="text"
                                label="Alternate Phone"
                                {...register("w5communicationPlan.alternatePhone")}
                                error={!!get(errors, "w5communicationPlan.alternatePhone")}
                                helperText={get(errors, "w5communicationPlan.alternatePhone")?.message
? (
      <Typography color="error" variant="caption">
        {get(errors, "w5communicationPlan.alternatePhone")?.message}
      </Typography>
    ) : null
                                }
                            />

                      </Box>
                  </Grid>
              </Grid>


    

        

</>
    )

} //5W