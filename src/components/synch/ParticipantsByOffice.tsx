
import { TextField, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Box, MenuItem, Select } from '@mui/material'
//import { NumberField } from '@base-ui/react';
import  NumberField  from './components/NumberField'


import { useFormContext, useFieldArray, Controller } from "react-hook-form";

import type { FieldArrayWithId } from "react-hook-form"

import { z } from "zod"

import { schemaActivity } from '../../schemas/schemaActivity'
import { LEAD_DIR } from '../../constants/activityConstants';


import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb'


type ActivityFormValues = z.infer<typeof schemaActivity>;

/* Handles the creation of Destination and Timeline control
* Note that we use FieldArrayWithId in order to let react 'add' the RHF 'id' property
* when using fields.
*/
const createTableItem = (

    /*
    * ActivityFormValues['activity'] - this is the parent node in the Activity Schema containing the array information of interest
    * participantsByOffice - the child in the Activity Schema which will have the dynamic data displayed
    * Note that per the Activity Schema -> activity.participantsByOffice is the target data. 
    */
    item: FieldArrayWithId<ActivityFormValues['activity'], "participantsByOffice", "id">,
    index: number,

    /* Used to register variables with RHF */
    register: any,
    remove: (index: number) => void,

    /* RHF for controlled components */
    control: any
) => {


    return (

        <TableRow key={item.id}>
            <TableCell>
                <Controller
                    name={`activity.participantsByOffice.${index}.office`}
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="Office">


                            {LEAD_DIR.map((office: string, index: number) =>

                                <MenuItem key={index} value={office}>{office}</MenuItem>)

                            }
                        </Select>
                    )}

                />
            </TableCell>
            <TableCell>

                
                <Controller
                    name={`activity.participantsByOffice.${index}.count`}
                    control={control}
                    render={({ field }) => (
                        <NumberField label="Number Field" 
                            min={1} 
                            max={20} 
                            size="small" 
                            value={field.value}
                            onChange={field.onChange}
                        /> 
                    )}
                />

                
           
            </TableCell>

            <TextField

                    id={`activity-participant-by-office-purpose-${index}`}
                    type="text"
                    //label="Activity Title"
                    {...register(`activity.participantsByOffice.${index}.purpose`)}
              //     error={!!errors.activity?.title}
                  //  helperText={!!errors.activity.title?.message ? <Typography color="error">{String(errors.activity.title?.message)} </Typography> : null}
              //  helperText={get(errors, "activity.title")?.message ? <Typography color="error">{get(errors, "activity.title")?.message} </Typography> : null}
                
               
               />



            <TableCell>
                <Button type="button" onClick={() => remove(index)}>Remove</Button>
            </TableCell>

        </TableRow>

    )


} //createTableItem

/* Component used to display and manipulate the Participants By Office information */
export const ParticipantsByOffice = () => {

    const { control, register } = useFormContext<ActivityFormValues>();


    //Dynamic fields we use 'fields' in the JSX which is essentially a reference to participantsByOffice object
    const { fields, append, remove } = useFieldArray({
        name: 'activity.participantsByOffice',    //Use 'participantsByOffice' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    })

    return (

        <>
            <Box>

                <TableContainer component={Paper}>

                    <Table sx={{ maxWidth: 900 }} size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell>Office</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Purpose of Participation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {fields.map((item, index) => {

                                return createTableItem(item, index, register, remove, control)


                            })}


                        </TableBody>

                    </Table>

                </TableContainer>

                <Button variant="outlined" size="medium" sx={{ my: 3 }}
                    onClick={() => append({
                        office: "",
                        count: 0,
                        purpose: "Appended purpose"
                    })
                    }>
                    Add Participants
                </Button>


            </Box>


        </>
    )


} //TravelWorksheet