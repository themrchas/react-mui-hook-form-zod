import { z } from "zod"

import { useFormContext, get, Controller, useFieldArray } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

import { DECISION_OPTIONS } from "../../constants/approvalConstants"

import { approvalSpecialValidationItem } from "../../schemas/schemaApproval"


//Create type to be used for dynamic fields
/*type ApprovalValidationValues = {
  approvalValidationItems: z.infer<typeof approvalSpecialValidation>;
};
*/
type ApprovalItemType = z.infer<typeof approvalSpecialValidationItem>;


export const ApprovalSpecialValidation = () => {

const { control ,watch  } = useFormContext(); // gets control from parent form



const approvalItems = watch("approvalSpecialValidation");


return (

     <FormGroup>

      {/* 'item' is not reactive 
           FormControlLabel is from react mui
      */}
      <Stack direction="row" spacing={2}>
      {approvalItems?.map((item: ApprovalItemType, index:number) => (

        <Controller
          key={index} 
          name={`approvalSpecialValidation.${index}.chkBoxValidate.checked`} //what will be controlled in the Checkbox
          control={control} //passed from useFormContext
          render={({ field }) => (
            
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={item.chkBoxValidate.disabled} // respects disabled
                />
              }
              label={item.approver}
            /> //FormControlLabel
          )}
        />
      ))}
      </Stack>

    </FormGroup>

)





} //Approval