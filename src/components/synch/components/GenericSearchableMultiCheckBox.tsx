import { Fragment } from "react";

import { z } from "zod"

import { useFormContext, get, Controller, useFieldArray } from "react-hook-form";

import { Stack, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material'

//import { approvalAdditionalActivityItem } from "../../schemas/schemaApproval"
import { genericCheckBox, genericMultiCheckbox } from "../../../schemas/schemaComponentCheckbox";

type CheckboxItemType = z.infer<typeof genericCheckBox>;
type MultiCheckboxItemType = z.infer<typeof genericMultiCheckbox>;

interface MultiCheckboxProps {

  items: MultiCheckboxItemType[],
  namePrefix: string //form path in react-hook-form

}


export const GenericSearchableMultiCheckbox = ({ items, namePrefix }: MultiCheckboxProps) => {

  const { control } = useFormContext(); // gets control from parent form

  return (

    <>

      <FormGroup>
        
        <Stack direction="column" spacing={2} 
        
        sx={{border: "1px solid",
  borderColor: "grey.300",
  borderRadius: 2,
  p: 2,
  backgroundColor: "background.paper"}}
        >

          {items?.map((item: MultiCheckboxItemType, categoryIndex: number) => (


            <Fragment key={categoryIndex}>

            <Box sx={{backgroundColor: "lightgray"}}>

              {/* Category heading */}
              <h3>{item.category}</h3>

              {item.checkboxes.map((checkbox: CheckboxItemType, checkboxIndex: number) => (

                <Controller
                  key={checkboxIndex}
                  name={`${namePrefix}.${categoryIndex}.checkboxes.${checkboxIndex}.checked`} //what will be controlled in the checkbox
                  control={control} //passed from useFormContext
                  render={({ field }) => (

                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={checkbox.disabled} // respects disabled
                        />
                      }
                      label={checkbox.label}
                    /> //FormControlLabel
                  )}
                />

              ))}

              </Box>


            </Fragment>


          ))}
        </Stack>

      </FormGroup>

    </>

  )

} //GenericSearchableMultiCheckbox
