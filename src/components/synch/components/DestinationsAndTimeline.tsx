
import { TextField, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, Box } from '@mui/material'

import { useFormContext, useFieldArray, Controller } from "react-hook-form";

import type { FieldArrayWithId } from "react-hook-form"

import { z } from "zod"

import { schemaActivity } from '../../../schemas/schemaActivity'
import { TEST_PERSON } from "../../../constants/travelConstants";

import { GenericAutocomplete } from "./GenericAutocomplete";

//DateTimePicker 
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    * destinationAndTimeline - the child in the Activity Schema which will have the dynamic data displayed
    * Per Activity Schema -> activity.destinationAndTimeline is the target data. 
    */
    item: FieldArrayWithId<ActivityFormValues['activity'], "destinationsAndTimeline", "id">,
    index: number,

    /* Used to register variables with RHF */
    register: any,
    remove: (index: number) => void,

    /* RHF for controlled components */
    control: any
) => {


    return (

        <TableRow key={item.id}>
            <TableCell>1</TableCell>

           
            <TableCell >
                <GenericAutocomplete <ActivityFormValues, (typeof TEST_PERSON)[number]>
                    name={`activity.destinationsAndTimeline.${index}.location`}
                    control={control}
                    options={TEST_PERSON}
                    getOptionLabel={(p) => p.label}
                    getOptionValue={(p) => p.label}
                />
            </TableCell>
            <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <Controller
                        name={`activity.destinationsAndTimeline.${index}.startDateTime`}
                        control={control}
                        render={({ field }) => (

                            <DateTimePicker

                                {...field}
                                label='Start Date'
                                ampm={false} //Turn off AM/PM choice

                                value={field.value ?? dayjs()}
                                onChange={(newValue) => field.onChange(newValue)}
                            />

                        )}
                    />
                </LocalizationProvider>
            </TableCell>
            <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <Controller
                        name={`activity.destinationsAndTimeline.${index}.endDateTime`}
                        control={control}
                        render={({ field }) => (

                            <DateTimePicker

                                {...field}
                                label='End Date'
                                ampm={false} //Turn off AM/PM choice

                                value={field.value ?? dayjs()}
                                onChange={(newValue) => field.onChange(newValue)}
                            />

                        )}
                    />
                </LocalizationProvider>
            </TableCell>
            <TableCell>
                <Button type="button" onClick={() => remove(index)}>Remove</Button>
            </TableCell>

        </TableRow>

    )


} //createTableItem

/* Component used to display and manipulate the Destination and Timeline information */
export const DestinationAndTimelineItem = () => {

    const { control, register } = useFormContext<ActivityFormValues>();


    //Dynamic fields we use 'fields' in the JSX which is essentially a reference to destinationAndTimelineItem object
    const { fields, append, remove } = useFieldArray({
        name: 'activity.destinationsAndTimeline',    //Use 'destinationAndTimelineItem' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    })

    return (

        <>
            <Box>

                <TableContainer component={Paper}>

                    <Table sx={{ maxWidth: 900 }} size="small" >
                        <TableHead>
                            <TableCell>No.</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
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
                        location: "",
                        startDateTime: dayjs('2026-02-15 04:00'),
                        endDateTime: dayjs('2026-03-02 18:00', 'YYYY-MM-DD HH:mm')
                    })
                    }>
                    Add New Destination
                </Button>


            </Box>


        </>
    )


} //TravelWorksheet