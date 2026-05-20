//import { z } from "zod"

import { useFormContext, get, Controller, useFieldArray} from "react-hook-form";
import type { Control, FieldValues, FieldPath } from 'react-hook-form'
import { Stack, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

//import { approvalAdditionalActivityItem } from "../../schemas/schemaApproval"
import { genericCheckBox } from "../../../schemas/schemaComponentCheckbox";

import type { CheckboxItemType } from "../../../schemas/synch.types";

//type CheckboxItemType = z.infer<typeof genericCheckBox>;


/*
interface CheckboxListProps {
  items: CheckboxItemType[];
  namePrefix: string; // form path in react-hook-form
  control: 
}
  */

interface CheckboxListProps<
  TFieldValues extends FieldValues
> {
  items: CheckboxItemType[];

  namePrefix: FieldPath<TFieldValues>;

  control: Control<TFieldValues>;
}


//export const GenericCheckbox = ({ items, namePrefix, control }: CheckboxListProps) => {
export const GenericCheckbox = <
  TFieldValues extends FieldValues
>({
  items,
  namePrefix,
  control
}: CheckboxListProps<TFieldValues>) => {


 // const { control, watch } = useFormContext(); // gets control from parent form

  //const additionalActivities = watch("approvalAdditionalActivityChoices");

  return (
<>
   
    <FormGroup>

      {/* 'item' is not reactive 
           FormControlLabel is from react mui
      */}
      <Stack direction="row" spacing={2}>
        {items?.map((item: CheckboxItemType, index: number) => (

          <Controller
            key={index}
            name={`${namePrefix}.${index}.checked` as FieldPath<TFieldValues>} //what will be controlled in the Checkbox
            control={control} //passed from useFormContext
            render={({ field }) => (

              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    disabled={item.disabled} // respects disabled
                  />
                }
                label={item.label}
              /> //FormControlLabel
            )}
          />
        ))}
      </Stack>

    </FormGroup>

    </>

  )

} //GenericCheckbox
