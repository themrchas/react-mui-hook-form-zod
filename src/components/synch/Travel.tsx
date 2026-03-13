import React from "react";

import { Tabs, Tab, Box, Typography, Autocomplete, Button, TextField, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell }from '@mui/material'

import { useFormContext, useFieldArray, Controller} from "react-hook-form";

import type { FieldArrayWithId }from "react-hook-form"

import type { ITravelPerson } from "../../types/travel";

import { z } from "zod"

import { travelItems } from '../../schemas/schemaTravel'
import { TEST_PERSON } from "../../constants/travelConstants";


//Create type to be used for dynamic fields
type TravelFormValues = {
  travelItems: z.infer<typeof travelItems>;
};


/* Create an entry in the Travel tab.
* Note that we use FieldArrayWithId in order to let react 'add' the RHF 'id' property
* when using fields.
*/
const createTableItem = (
    item: FieldArrayWithId<TravelFormValues, "travelItems", "id">,
    index: number,
    register: any,
    remove: (index: number) => void,
    control: any
) => {

     
    return (

        <TableRow key={item.id}>
            <TableCell>1</TableCell>

          {/*  <TableCell {...register(`TravelFormValues`)}>{item.office}</TableCell>*/}
            <TableCell>
                <TextField 
                    {...register(`travelItems.${index}.office`)} 
                    defaultValue={item.office} 
                />
            </TableCell>
         
           <TableCell>
        {/*   <Autocomplete<ITravelPerson>
                               options={TEST_PERSON}
                              // groupBy={(option)=> option.category}
                               getOptionLabel={(option) => option.label}
                               renderInput={(params) => <TextField {...params}/>}
                               {...register(`travelItems.${index}.person`)}
            />*/}
            
            
              <Controller
                    name={`travelItems.${index}.person`}  // Dynamic field name for person
                    control={control}
               
                    render={({ field, fieldState}) => (
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
                                field.onChange(typeof value === "string" ? value : value?.label ?? "")}  // Update value with the label
                                
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
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
                <Button type="button" onClick={() => remove(index)}>Remove</Button>
                                          
            </TableCell>
            <TableCell>{item.travelStart?.format("YYYY-MM-DD HH:mm")}</TableCell>
            <TableCell>{item.travelEnd?.format("YYYY-MM-DD HH:mm")}</TableCell>
            <TableCell>{item.travelModes.join(', ')}</TableCell>

        </TableRow>

    )


} //createTableItem


export const Travel = () => {

    const { control, register } = useFormContext<TravelFormValues>();



    //Dynamic fields we use 'fields' in the JSX which is essentially a reference to travelItems object
        const { fields, append, remove } = useFieldArray({
            name: 'travelItems',    //Use 'travelItems' as the field array to use to store dynamic content; this must be an array of objects
            control  //This is control returned from useForm hook
    
        })

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

                        { fields.map( (item, index) => {

                            return createTableItem(item,index,register,remove,control)
                                                
                        })}



                    </TableBody>




                </Table>



            </TableContainer>



        </>
    )


} //TravelWorksheet