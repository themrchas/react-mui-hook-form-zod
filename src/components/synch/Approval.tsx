//import { z } from "zod"

import { useFormContext, get, Controller, useFieldArray } from "react-hook-form";

import { Stack, TextField, Typography, Grid, Box, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

import { DECISION_OPTIONS } from "../../constants/approvalConstants"

//import { approvalSpecialValidation} from "../../schemas/schemaApproval"


//Create type to be used for dynamic fields
/*type ApprovalValidationValues = {
  approvalValidationItems: z.infer<typeof approvalSpecialValidation>;
};
*/

export const Approval = () => {

const { control } = useFormContext(); // gets control from parent form

  const { fields } = useFieldArray({
    control,
    name: "approvalSpecialValidation", // must match defaultValues
  });


return (

     <FormGroup>
      {fields.map((item, index) => (
        <Controller
          key={item.id} // always use item.id with useFieldArray
          name={`approvalSpecialValidation.${index}.chkBoxValidate.checked`}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  disabled={item.chkBoxValidate.disabled} // respects disabled
                />
              }
              label={item.approver}
            />
          )}
        />
      ))}
    </FormGroup>





        }





     </FormGroup>
                


)


} //Approval