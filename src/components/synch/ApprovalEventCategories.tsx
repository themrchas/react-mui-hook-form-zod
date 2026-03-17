import { z } from "zod"

import { useFormContext, get, Controller, useFieldArray } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

import { approvalEventCategoryItem } from "../../schemas/schemaApproval"

type ApprovalEventCategoryItemType = z.infer<typeof approvalEventCategoryItem>;

export const ApprovalEventCategories = () => {

const { control ,watch  } = useFormContext(); // gets control from parent form

const eventCategories = watch("approvalEventCategoryChoices");

return (

     <FormGroup>

      {/* 'item' is not reactive 
           FormControlLabel is from react mui
      */}
      <Stack direction="row" spacing={2}>
      {eventCategories?.map((item: ApprovalEventCategoryItemType, index:number) => (

        <Controller
          key={index} 
          name={`approvalEventCategoryChoices.${index}.chkBoxEventCategory.checked`} //what will be controlled in the Checkbox
          control={control} //passed from useFormContext
          render={({ field }) => (
            
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={item.chkBoxEventCategory.disabled} // respects disabled
                />
              }
              label={item.category}
            /> //FormControlLabel
          )}
        />
      ))}
      </Stack>

    </FormGroup>

)


} //ApprovalEventCategoryItemType