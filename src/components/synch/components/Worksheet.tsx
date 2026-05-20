import { Dialog, DialogContent, DialogActions, Typography, Button, Select, MenuItem, Stack, Box, TextField, InputLabel} from '@mui/material'

import { Controller, Control } from 'react-hook-form';

import type { SynchFormSchema } from '../../../schemas/synch.types';

import type { WorksheetSchema } from '../../../schemas/synch.types';


//import type { Control } from 'react-hook-form'


export const TravelWorksheet = ( { control, isOpen, index } :
    
    {

        control: Control<SynchFormSchema>,
        isOpen: boolean,
        index: number | null,
        details: WorksheetSchema | null,
        append: (value: any)=> void; 
        setDialogIsOpen: (open: boolean) => void

    }

) => { 


    const handleDialogClose = () => {

        console.log('in handleDialogClose')

       // saveDialogInformation("Billy Bob", "J1")

        setDialogIsOpen(false)
    
    } //handleDialogClose


    const cancelDialog = () => {

        setDialogIsOpen(false)
        
    } //cancelDialog


    return (

        <Stack>

        <Dialog
            open={isOpen}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: { height: 400 }
                }
            }}
        >

         <DialogContent>


            <Typography>Hello world from a <dialog></dialog></Typography>
         
         
         </DialogContent>

        

         <DialogActions>
         
                 <Button onClick={handleDialogClose}>Save</Button>
                 <Button onClick={cancelDialog}>Cancel</Button>
         
             </DialogActions>

             </Dialog >


        </Stack>


    )
    

}
