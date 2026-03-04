import React from "react";

import { useFormContext } from "react-hook-form";

import { useEffect } from "react";

import { Stack, TextField, Typography, InputLabel, Select, MenuItem, ListSubheader } from '@mui/material';

import { CLASSIFICATION, FISCAL_YEAR_LOWER_BOUND, FISCAL_YEAR_UPPER_BOUND } from "../../constants/activityConstants";

//Remove once integrated into SPFx
import { ACTIVITY_TYPE, EXERCISES } from "../../constants/activityConstants";

const fiscalYears: string[] = Array.from({ length: FISCAL_YEAR_UPPER_BOUND - FISCAL_YEAR_LOWER_BOUND + 1 }, (_,index) => (FISCAL_YEAR_LOWER_BOUND + index).toString())


export const Activity = () => {

 const { register, getValues, formState: {errors}} = useFormContext()


 useEffect( () => {}, [] );

    return (

    <>

    <Stack>

     <InputLabel id="lblClassification">Activity Classification</InputLabel>
                            <Select
    
                            displayEmpty
                            labelId="lblClassification" 
                            {...register("activityClassification")}
                            value={getValues('activityClassification') || ""}
                                             
                            >
                    { CLASSIFICATION.map( 
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)
    
                    }
              
                </Select>


                <TextField
                            
                            id="activityTitle"
                            type="text"
                            label="Activity Title"
                            {...register("activityTitle")}
                            error={!!errors.activityTitle}
                           helperText={ !!errors.activityTitle ?   <Typography color="error">{String(errors.activityTitle?.message)} </Typography> : null }
                        />

                
                <InputLabel id="lblActivityType">Activity Type</InputLabel>
                <Select
    
                            displayEmpty
                            labelId="lbllblActivityType" 
                            {...register("activityType")}
                        //    value={getValues('activityType') || ""}
                                             
                            >
                    {ACTIVITY_TYPE.map( 
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)
    
                    }
              
                </Select>




                 <InputLabel id="lblExercises">Exercise</InputLabel>
                <Select
    
                           // displayEmpty
                            labelId="lblExercises" 
                            {...register("activityExerciseName")}
                      //      value={getValues('activityExerciseName') || ""}
                                             
                            >
                               
                    { 
                        Object.entries(EXERCISES).map( ([category,exercises]) => 
                            <>
                                <ListSubheader>{category}</ListSubheader>
                                {
                                    exercises.map((exercise) => 
                                        <MenuItem value={exercise}>
                                            {exercise}
                                        </MenuItem>
                       
                                    )
                               }
                              
                            </>
                        ) //map

                    }

                               
                </Select>


<InputLabel id="lblFiscalYear">Fiscal Year</InputLabel>
                <Select
    
                            displayEmpty
                            labelId="lblFiscalYear" 
                            {...register("activityFiscalYear")}
                         //   value={getValues('activityFiscalYear') || ""}
                                             
                            >
                                { fiscalYears.map((year:string) => 
                                   
                         <MenuItem key={year} value={year}>{year}</MenuItem>)
    
                    }

                            
                    
                   
              
                </Select>

                </Stack>



        </>

                )


} //Activity