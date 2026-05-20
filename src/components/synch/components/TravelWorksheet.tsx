import { useEffect } from 'react';

import { Dialog, DialogContent, DialogActions, Typography, Button, Select, MenuItem, Stack, Box, TextField, InputLabel } from '@mui/material'

//DateTimePicker 
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb'


import { useForm, Controller } from 'react-hook-form';

import type { Control, UseFormSetValue, UseFormGetValues } from 'react-hook-form'

//Used for person choce in the worksheet
import { GenericAutocomplete } from './GenericAutocomplete'
import { GenericCheckbox } from './GenericCheckbox';

import { TEST_PERSON } from '../../../constants/travelConstants';

import type { SynchFormSchema, TravelItemType } from '../../../schemas/synch.types';

export const TravelWorksheet = ({ control, index, isOpen, append, getValues, setValue, setDialogIsOpen }:

    {
        //Root form tracked by RHF
        control: Control<SynchFormSchema>;
        index: number | null;
        isOpen: boolean;
        append: (value: TravelItemType) => void;
        getValues: UseFormGetValues<SynchFormSchema>
        setValue: UseFormSetValue<SynchFormSchema>;
        setDialogIsOpen: (open: boolean) => void
    }
) => {


        /* For an exisiting item, grab the current values
        *  'watch' returns this info in json format
        */
       // const exisitingTraveler = index !== null ? watch(`travel.travelers.${index}`) : null;
      const exisitingTraveler = index !== null ? getValues(`travel.travelers.${index}`) : null;




    //If this is null, we are dealing with a new travel entry
    const isEditMode = index !== null;

    /* Local draft for new or exisitng item.
    * This is creating a temporay form of type TravelItemType.
    * Note the initilization of the temporay form.
    * 
    * This is what will be manipulated during edits.
    */
    const tempForm = useForm<TravelItemType>({

        defaultValues: exisitingTraveler ?? {
            office: "",
            person: "",
            travelStart: null,
            travelEnd: null,
            dutyStart: null,
            dutyEnd: null,
            travelModes: [],
        },
    });

    //Destruct as needed from the tempForm aka new form
    const { handleSubmit, control: tempControl, watch: tempWatch } = tempForm;

    // Close dialog
    const handleCancel = () => setDialogIsOpen(false);

    // Save handler for dialog
    const handleSave = (data: TravelItemType) => {

        
        //Update an exisiting entry 
        if (isEditMode) {

            setValue(`travel.travelers.${index}`, data)

        }
        // Append new traveler to main form
        else {

            append(data);
        }
        setDialogIsOpen(false);
    };

    
    //Takes care of switching between travelers in the component
    useEffect(() => {

    if (exisitingTraveler) {

        tempForm.reset(exisitingTraveler);

    } else {

        tempForm.reset({
            office: "",
            person: "",
            travelStart: null,
            travelEnd: null,
            dutyStart: null,
            dutyEnd: null,
            travelModes: [],
        });

    }

}, [exisitingTraveler]);


    return (


        //Dialog opens and closes based on value of isOpen
        <Dialog
            open={isOpen}
            //  onClose={handleDialogClose} //run when user clicks badrop or ESC
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: { height: 400 }
                }
            }}

        >
            <DialogContent>

                <Stack>
                    <InputLabel id="travel-worksheet-office">Office</InputLabel>

                    {/* isEdit mode 'true', then this is an exisiting travel entry 
                        Note that exisiting entries are controlled by the RHF control passed into the component
                    */}
                    {isEditMode ? (

                        <>

                            <GenericAutocomplete
                              //  name={`travel.travelers.${index}.person`}
                              //  control={control}
                              name={`person`}
                                control={tempControl}
                                options={TEST_PERSON}
                                getOptionLabel={(p) => p.label}
                                getOptionValue={(p) => p.label}
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                              <Controller
                           
                                 name={`travelStart`}
                                    control={tempControl}
                                    render={({ field }) => (

                                        <DateTimePicker

                                            {...field}
                                            label='Travel Start Date'
                                            ampm={false} //Turn off AM/PM choice

                                            value={field.value ?? dayjs()}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        />

                                    )}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <Controller

                                    name={`travelEnd`}
                                    control={tempControl}
                                    render={({ field }) => (

                                        <DateTimePicker

                                            {...field}
                                            label='Travel End Date'
                                            ampm={false} //Turn off AM/PM choice

                                            value={field.value ?? dayjs()}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        />

                                    )}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <Controller

                                    name={`dutyStart`}
                                    control={tempControl}
                                    render={({ field }) => (

                                        <DateTimePicker

                                            {...field}
                                            label='Duty Start Date'
                                            ampm={false} //Turn off AM/PM choice

                                            value={field.value ?? dayjs()}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        />

                                    )}
                                />
                            </LocalizationProvider>

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <Controller

                                    name={`dutyEnd`}
                                    control={tempControl}
                                    render={({ field }) => (

                                        <DateTimePicker

                                            {...field}
                                            label='Duty End Date'
                                            ampm={false} //Turn off AM/PM choice

                                            value={field.value ?? dayjs()}
                                            onChange={(newValue) => field.onChange(newValue)}
                                        />

                                    )}
                                />
                            </LocalizationProvider>

                            <GenericCheckbox<TravelItemType>
                                items={tempWatch(`travelModes`)}

                                /* Backticks are needed so that the 'name' property in the GenericCheckbox Controller
                                 * resolves to e.g travel.travelers.1.travelModes.0.checked.
                                */
                                namePrefix={`travelModes`}
                                control={tempControl}
                            />

                        </>

                    ) : (

                        //new item to add - note control used
                        <GenericAutocomplete<TravelItemType, typeof TEST_PERSON[number]>

                            name="person"
                            control={tempControl} // no RHF control
                            options={TEST_PERSON}
                            getOptionLabel={(p) => p.label}
                            getOptionValue={(p) => p.label}

                        />

                    )
                    }

                </Stack>


            </DialogContent>

            <DialogActions>


                {/* The handleSubmit function (RHF) will run and will call handleSave with form data as an argument */}
                <Button onClick={handleSubmit(handleSave)}>Save</Button>

                <Button onClick={handleCancel}>Cancel</Button>

            </DialogActions>

        </Dialog >

    )

} //TravelWorksheet