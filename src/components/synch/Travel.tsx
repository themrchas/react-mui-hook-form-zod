import { useState } from 'react';

import { Autocomplete, Button, TextField, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography, accordionActionsClasses } from '@mui/material'

import { useFormContext, useFieldArray, Controller } from "react-hook-form";

import type { FieldArrayWithId } from "react-hook-form"

import { TEST_PERSON } from "../../constants/travelConstants";

import { TravelWorksheet } from './components/TravelWorksheet'

import type { SynchFormSchema, TravelFormSchema, CheckboxItemType } from '../../schemas/synch.types';




const createTravelModesString = (travelModes: Array<CheckboxItemType>) : string => {

    return travelModes.reduce( (acc,current) =>

         { 
           return current.checked ? (acc ? `${acc} ${current.label}` : current.label) : acc
        }, ""
    )
}

/* Create an entry in the Travel tab.
* Note that we use FieldArrayWithId in order to let react 'add' the RHF 'id' property
* when using fields.
*/
const createTableItem = (
    // item: FieldArrayWithId<TravelFormValues, "travelItems.travelItems", "id">,
    item: FieldArrayWithId<TravelFormSchema['travel'], "travelers", "id">,
    index: number,
    register: any,
    remove: (index: number) => void,
    control: any,

    //Controls adding or editing a travel worksheet
    handleDialogButtonClick: (index: number | null) => void
) => {


    return (

        <TableRow key={item.id}>
            <TableCell>1</TableCell>

            {/*  <TableCell {...register(`TravelFormValues`)}>{item.office}</TableCell>*/}
            <TableCell>
                <TextField
                    //   {...register(`travelItems.${index}.office`)} 
                    {...register(`travelItems.travel.travelers.${index}.office`)}
                    defaultValue={item.office}
                />
            </TableCell>

            <TableCell>


                <Controller
                    name={`travel.travelers.${index}.person`}  // Dynamic field name for person
                    control={control}

                    render={({ field, fieldState }) => (
                        <Autocomplete

                            /* Spread field to ensure proper binding.
                            * This is how RHF will manage the component.
                            * field.value is the RHF managed value of this component
                            */
                            {...field}

                            freeSolo //Allow free text inputs
                            options={TEST_PERSON} //Array of options to display 

                            /*How to display values from which user can choose.
                            * If option is a string value and not in TEST_PERSON, then it is of type 
                            * string, else we display the value associated with label - 'label: "Bob"'
                            * */
                            getOptionLabel={(option) => typeof option === "string" ? option : option.label}

                            //When the user selects an option from the dropdown OR clicks the clear (x) button
                            onChange={(e, value, reason) => {
                                //console.log("e is",e,'value is', value,'reason is',reason);
                                field.onChange(typeof value === "string" ? value : value?.label ?? "")
                            }  // Update value with the label

                            }

                            //Text shown in autocomplete box
                            inputValue={field.value || ""}

                            // Highlight selected option in the drop down
                            value={TEST_PERSON.find(person => person.label === field.value) || null}

                            //When the text in the input field changes (typing, clearing, autocompleting)
                            onInputChange={(e, newInputValue, reason) => {
                                if (reason === "input" || reason === "clear") {
                                    field.onChange(newInputValue);
                                }
                            }}

                            renderInput={(params) => (<TextField
                                {...params}
                                error={!!fieldState.error} // <-- flag the error
                            //helperText={fieldState.error?.message} // <-- display the message
                            />
                            )}

                        />
                    )}
                />




            </TableCell>
            <TableCell>
                <Button type="button" onClick={() => handleDialogButtonClick(index)}>Edit</Button>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
                <Button type="button" onClick={() => remove(index)}>Remove</Button>

            </TableCell>
            <TableCell>{item.travelStart?.format("YYYY-MM-DD HH:mm")}</TableCell>
            <TableCell>{item.travelEnd?.format("YYYY-MM-DD HH:mm")}</TableCell>
          {/*   <TableCell>{item.travelModes.join(', ')}</TableCell> */}
          <TableCell>{createTravelModesString(item.travelModes)}</TableCell>

        </TableRow>

    )


} //createTableItem


export const Travel = () => {

  //  const { control, register } = useFormContext<TravelFormSchema>();
  const { control, register, setValue, getValues } = useFormContext<SynchFormSchema>();

   /*const [newTraveler, setNewTraveler] = useState<basicTraveler>({
        office: "",
        person: ""
    });
*/


    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)
        

    //Dynamic fields we use 'fields' in the JSX which is essentially a reference to travelItems object
    const { fields: travelers, append: appendTraveler, remove: removeTraveler } = useFieldArray({
        name: 'travel.travelers',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    });
    
/*
    const { fields, append, remove } = useFieldArray({
        name: 'travel.travelers',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    });
    */

    //Current traveler entry being edited
    const [currentIndex, setcurrentIndex] = useState<number | null>(null);


    //Handler for opening a dialog to add a traveler to the 'Travel Worksheet' tab
    //const handleDialogButtonClick = () => {
    const handleDialogButtonClick = (index: number | null) => {
  
  
     setcurrentIndex(index);
        setDialogIsOpen(true);

    }



    return (

        <>

            <TableContainer component={Paper}>

                <Table sx={{ maxWidth: 900 }} size="small" >
                    <TableHead>
                        <TableCell>No.</TableCell>
                        <TableCell>Office</TableCell>
                        <TableCell>Person</TableCell>
                        <TableCell>Travel Worksheet</TableCell>
                        <TableCell>Generate PDF</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Travel Start</TableCell>
                        <TableCell>Travel End</TableCell>
                        <TableCell>Travel Modes</TableCell>
                    </TableHead>
                    <TableBody>

                        {travelers.map((item, index) => {

                            console.log("money");

                            return createTableItem(item, index, register, removeTraveler, control, handleDialogButtonClick)

                        })}



                    </TableBody>



                </Table>

            </TableContainer>

            <Button variant="outlined" 
                    size="medium" 
                    sx={{ my: 3 }}
                    onClick={() => handleDialogButtonClick(null)}
             >Add Traveler                
             </Button>

           <TravelWorksheet
                control={control} 
                index={currentIndex} 
                isOpen={dialogIsOpen} 
                append={appendTraveler} 
                getValues={getValues}
                setValue={setValue}
                setDialogIsOpen={setDialogIsOpen}>
                
            </TravelWorksheet>



        </>
    )


} //TravelWorksheet