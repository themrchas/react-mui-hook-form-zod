

import * as z from 'zod'

import { useFormContext, get } from "react-hook-form";

import { useEffect } from "react";

import { Stack, TextField, Typography, InputLabel, Select, MenuItem, ListSubheader, Autocomplete } from '@mui/material';

import { CLASSIFICATION, FISCAL_YEAR_LOWER_BOUND, FISCAL_YEAR_UPPER_BOUND, LOE, CP, DC } from "../../constants/activityConstants";

import { schemaActivity } from '../../schemas/schemaActivity';

//Remove once integrated into SPFx
import { ACTIVITY_TYPE, EXERCISES, LEAD_DIR } from "../../constants/activityConstants";
import { TEST_PERSON } from "../../constants/travelConstants";


import { GenericCheckbox } from "./components/GenericCheckbox"
import { GenericAutocomplete } from './components/GenericAutocomplete';
import { DestinationAndTimelineItem } from "./components/DestinationsAndTimeline";
import { ParticipantsByOffice } from './ParticipantsByOffice';

const fiscalYears: string[] = Array.from({ length: FISCAL_YEAR_UPPER_BOUND - FISCAL_YEAR_LOWER_BOUND + 1 }, (_, index) => (FISCAL_YEAR_LOWER_BOUND + index).toString())

//Grab the type of planningOPR field
type ActivityFormValues = z.infer<typeof schemaActivity>;

export const Activity = () => {

    const { register, watch, control,  getValues, formState: { errors } } = useFormContext<ActivityFormValues>()

/*
    useEffect(() => {
        register("select")
    }, [register])
    */

    const planningOPR = watch("activity.planningOPR")
    const missionLead = watch("activity.missionLead")

    return (

        <>

            <Stack>

                <InputLabel id="activity-classification">Activity Classification</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-classification"
                    {...register("activity.classification")}
                //  value={getValues('activityClassification') || ""}

                >
                    {CLASSIFICATION.map(
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)

                    }

                </Select>


                <TextField

                    id="activity-title"
                    type="text"
                    label="Activity Title"
                    {...register("activity.title")}
                   error={!!errors.activity?.title}
                  //  helperText={!!errors.activity.title?.message ? <Typography color="error">{String(errors.activity.title?.message)} </Typography> : null}
                helperText={get(errors, "activity.title")?.message ? <Typography color="error">{get(errors, "activity.title")?.message} </Typography> : null}
                
               
               />


                <InputLabel id="activity-type">Activity Type</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-type"
                    {...register("activity.type")}

                >
                    {ACTIVITY_TYPE.map(
                        (item: string) => <MenuItem key={item} value={item}>{item}</MenuItem>)

                    }

                </Select>

                <Autocomplete
                    options={EXERCISES}
                    groupBy={(option) => option.category}
                    getOptionLabel={(option) => option.exercise}
                    renderInput={(params) => <TextField {...params} label="Exercises" />}
                    {...register("activity.exerciseName")}
                />




                <InputLabel id="activity-fiscal-year">Fiscal Year</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-fiscal-year"
                    {...register("activity.fiscalYear")}
                //   value={getValues('activityFiscalYear') || ""}

                >
                    {fiscalYears.map((year: string) =>

                        <MenuItem key={year} value={year}>{year}</MenuItem>)

                    }





                </Select>


                <InputLabel id="activity-line-of-effort">LOE</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-line-of-effort"
                    {...register("activity.lineOfEffort")}
                //   value={getValues('activityFiscalYear') || ""}

                >
                    {LOE.map((lineOfEffort: string, index: number) =>

                        <MenuItem key={index} value={lineOfEffort}>{lineOfEffort}</MenuItem>)

                    }

                </Select>

                <InputLabel id="activity-commander-priority">Commander Priority</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-commander-priority"
                    {...register("activity.commanderPriority")}

                >
                    {CP.map((commanderPriority: string, index: number) =>

                        <MenuItem key={index} value={commanderPriority}>{commanderPriority}</MenuItem>)

                    }

                </Select>

                <InputLabel id="activity-decisive-condition">Decisive Conditions</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-decisive-condition"
                    {...register("activity.decisiveCondtion")}

                >
                    {DC.map((decisiveCondition: string, index: number) =>

                        <MenuItem key={index} value={decisiveCondition}>{decisiveCondition}</MenuItem>)

                    }

                </Select>

                <GenericCheckbox
                    items={watch("activity.strategicApproach")}
                    namePrefix="activity.strategicApproach"
                />

                <DestinationAndTimelineItem />

                <InputLabel id="activity-lead-directorate">Lead Directorate</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-lead-directorate"
                    {...register("activity.leadDirectorate")}

                >
                    {LEAD_DIR.map((directory: string, index: number) =>

                        <MenuItem key={index} value={directory}>{directory}</MenuItem>)

                    }

                </Select>


                <GenericAutocomplete <ActivityFormValues, (typeof TEST_PERSON)[number]>
                    name={`activity.planningOPR`}
                    control={control}

                    /* Added this to included the current person (if any) reads from default values.
                       This allows previously saved values to be displayed when the planning OPR is no 
                       longer included in the people source. 
                    */
                    options={[...TEST_PERSON,
                    ...(planningOPR ? [{ label: planningOPR }] : [])
                    ]}


                    getOptionLabel={(p) => p.label}
                    getOptionValue={(p) => p.label}
                />

                <ParticipantsByOffice />

                <GenericAutocomplete <ActivityFormValues, (typeof TEST_PERSON)[number]>
                    name={`activity.missionLead`}
                    control={control}

                    /* Added this to included the current person (if any) reads from default values.
                       This allows previously saved values to be displayed when the planning OPR is no 
                       longer included in the people source. 
                    */
                    options={[...TEST_PERSON,
                    ...(missionLead ? [{ label: missionLead }] : [])
                    ]}


                    getOptionLabel={(p) => p.label}
                    getOptionValue={(p) => p.label}
                />


                <InputLabel id="activity-division">Division</InputLabel>
                <Select

                    displayEmpty
                    labelId="activity-division"
                    {...register("activity.division")}

                >
                    {LEAD_DIR.map((directory: string, index: number) =>

                        <MenuItem key={index} value={directory}>{directory}</MenuItem>)

                    }

                </Select>

            

            </Stack>


        </>

    )


} //Activity