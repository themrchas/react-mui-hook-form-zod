import { z } from "zod"

import { useFormContext, get, Controller, useFieldArray } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

import {  approvalAdditionalActivityItem } from "../../schemas/schemaApproval"

type ApprovalEventCategoryItemType = z.infer<typeof  approvalAdditionalActivityItem>;

export const ApprovalAdditionalActivity = () => {

const { control ,watch  } = useFormContext(); // gets control from parent form

const additionalActivities = watch("approvalAdditionalActivityChoices");

return (

     <FormGroup>

      {/* 'item' is not reactive 
           FormControlLabel is from react mui
      */}
      <Stack direction="row" spacing={2}>
      {additionalActivities?.map((item: ApprovalEventCategoryItemType, index:number) => (

        <Controller
          key={index} 
          name={`approvalAdditionalActivityChoices.${index}.chkBoxAdditionalActivity.checked`} //what will be controlled in the Checkbox
          control={control} //passed from useFormContext
          render={({ field }) => (
            
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={item.chkBoxAdditionalActivity.disabled} // respects disabled
                />
              }
              label={item.activity}
            /> //FormControlLabel
          )}
        />
      ))}
      </Stack>

    </FormGroup>

)

} //Approval } from "../../constants/approvalConstants"
