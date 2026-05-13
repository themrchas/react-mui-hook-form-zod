import { Dialog, DialogContent, DialogActions, Typography, Button, Select, MenuItem, Stack, Box, TextField, InputLabel} from '@mui/material'

import { Controller,  /*Control, */ useWatch } from 'react-hook-form';

import type { Control } from 'react-hook-form'

import { GenericAutocomplete } from './GenericAutocomplete'

import { LEAD_DIR } from '../../../constants/activityConstants';

import { schemaTravel } from '../../../schemas/schemaTravel';
import { TEST_PERSON } from '../../../constants/travelConstants';

import * as z from 'zod'

import type { SynchFormSchema } from '../../../schemas/synch.types';
import { useState } from 'react';

type TravelFormValue = z.infer<typeof schemaTravel>;
type Traveler = TravelFormValue["travel"]["travelers"][number];


export const TravelWorksheetAddPerson =( { control, index, isOpen, append, setDialogIsOpen}:
    
                { 
                
                  control: Control<SynchFormSchema>; 
                  index: number | null;
                  isOpen: boolean; 
                  append: (value: any)=> void; 
                  setDialogIsOpen: (open: boolean) => void
                } 
     ) => {


    const [newOffice, setNewOffice] = useState("");

     //True if an exisiting traveler is currently being editied
    const isEditMode: boolean = index !== null

   // const value = isEditMode ? (watchedOffice ?? "") : newOffice;

    const handleDialogClose = () => {

        console.log('in handleDialogClose')

       // saveDialogInformation("Billy Bob", "J1")

        setDialogIsOpen(false)
    
    } //handleDialogClose


    const cancelDialog = () => {

        setDialogIsOpen(false)
        
    } //cancelDialog

   

    //const office = isEditMode ? useWatch(travel.travelers.${index}.office) : newOffice;

    /*
    const watchedOffice = useWatch({
    control,
    name: `travel.travelers.${index}.office`
      
    index !== null
            ? `travel.travelers.${index}.office`
            : undefined
            
});

*/


//const office = isEditMode ? useWatch(travel.travelers.${index}.office) : newOffice;
//const office = isEditMode ? watchedOffice ?? "" : newOffice;


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
                
                {/* index null means we have a new item we are adding */}
                { isEditMode && index ? (
                    <Controller
                        name={`travel.travelers.${index}.office`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                displayEmpty
                                sx={{ width: 1 / 3 }}
                            >
                                {LEAD_DIR.map((directory: string) => (
                                    <MenuItem key={directory} value={directory}>
                                        {directory}
                                    </MenuItem>
                                ))}

                            </Select>
                        )}
                    />
                ) :  (

                   //new item to add
                    <>

                    <Select
                            value={newOffice}
                            onChange={(e) => setNewOffice(e.target.value)}
                        >
                            {LEAD_DIR.map((dir, i) => (
                                <MenuItem key={i} value={dir}>
                                    {dir}
                                </MenuItem>
                            ))}

                    </Select>

                    </>
                )
            }

                    


            </Stack>


      

    </DialogContent>

    <DialogActions>

        <Button onClick={handleDialogClose}>Save</Button>
        <Button onClick={cancelDialog}>Cancel</Button>



    </DialogActions>
        
        </Dialog >
      
        
       
        
    )

} //TravelWorksheetAddPerson