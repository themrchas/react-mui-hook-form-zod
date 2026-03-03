import { useFormContext } from "react-hook-form";

import { Stack, TextField, Typography, InputLabel, Select, MenuItem } from '@mui/material';

import { CLASSIFICATION, FISCAL_YEAR_LOWER_BOUND, FISCAL_YEAR_UPPER_BOUND } from "../../constants/activityConstants";

//Remove once integrated into SPFx
import { ACTIVITY_TYPE } from "../../constants/activityConstants";

export const Activity = () => {




    return (

    <>

    

     <InputLabel id="lblClassification">Classification</InputLabel>
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
                            {...register("activityTitle")}
                            error={!!errors.activityTitle}
                           helperText={ !!errors.activityTitle ?   <Typography color="error">{String(errors.activityTitle?.message)} </Typography> : null }
                        />


                <TextField
                            
                            id="activityTitle"
                            type="text"
                            {...register("activityTitle")}
                            error={!!errors.activityTitle}
                           helperText={ !!errors.activityTitle ?   <Typography color="error">{String(errors.activityTitle?.message)} </Typography> : null }
                        />

                <InputLabel id="lblActivityType">Classification</InputLabel>
                <Select
    
                            displayEmpty
                            labelId="lbllblActivityType" 
                            {...register("activityType")}
                            value={getValues('activityType') || ""}
                                             
                            >
                    {ACTIVITY_TYPE.map( 
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)
    
                    }
              
                </Select>



{/*
                 <InputLabel id="lblExercises">Classification</InputLabel>
                <Select
    
                            displayEmpty
                            labelId="lblExercises" 
                            {...register("activityExerciseName")}
                            value={getValues('activityExerciseName') || ""}
                                             
                            >
                    {ACTIVITY_TYPE.map( 
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)
    
                    }
              
                </Select>
*/}

<InputLabel id="lblFiscalYear">Fiscal Year</InputLabel>
                <Select
    
                            displayEmpty
                            labelId="lblExercises" 
                            {...register("activityExerciseName")}
                            value={getValues('activityExerciseName') || ""}
                                             
                            >
                    { for(i=FISCAL_YEAR_LOWER_BOUND; i <= FISCAL_YEAR_UPPER_BOUND; i++) 
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)
    
                    }
              
                </Select>


            



        </>

                )


} //Activity