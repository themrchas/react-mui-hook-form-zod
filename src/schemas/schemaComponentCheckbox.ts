import * as z from 'zod'


export const genericCheckBox = z.object({
    label: z.string().nonempty(),
    checked:z.boolean(),
    disabled: z.boolean()
})


 