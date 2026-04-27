import * as z from 'zod'


export const genericCheckBox = z.object({
    label: z.string().nonempty(),
    checked:z.boolean(),
    disabled: z.boolean()
})

 export const genericMultiCheckbox = z.object({
 
     category: z.string(),
     checkboxes: z.array(genericCheckBox)
 
 }) //genericMultiCheckbox 
 