import React from "react";

import { Tabs, Tab, Box, Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell }from '@mui/material'

import { useFormContext, useFieldArray, Controller } from "react-hook-form";

import type { FieldArrayWithId }from "react-hook-form"

import { z } from "zod"

import { travelItems } from '../../schemas/schemaTravel'


//Create type to be used for dynamic fields
type TravelFormValues = {
  travelItems: z.infer<typeof travelItems>;
};


/* Create an entry in the Travel tab.
* Note that we use FieldArrayWithId in order to let react 'add' the RHF 'id' property
* when using fields.
*/
const createTableItem = (item: FieldArrayWithId<TravelFormValues, "travelItems", "id">) => {

     
    return (

        <TableRow key={item.id}>
            <TableCell>{item.office}</TableCell>
            <TableCell>{item.person}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>{item.travelStart?.format("YYYY-MM-DD")}</TableCell>
            <TableCell>{item.travelEnd?.format("YYYY-MM-DD")}</TableCell>
            <TableCell>{item.travelModes.toString()}</TableCell>

        </TableRow>

    )


} //createTableItem


export const Travel = () => {

    const { control, register } = useFormContext<TravelFormValues>();



    //Dynamic fields we use 'fields' in the JSX which is essentially a reference to phNumbers object
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

                            return createTableItem(item)
                        
                        
                        
                        })}



                    </TableBody>




                </Table>



            </TableContainer>



        </>
    )


} //TravelWorksheet