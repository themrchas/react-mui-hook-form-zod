import * as z from 'zod'

import { DECISION_OPTIONS } from '../constants/approvalConstants'


const approvalValidationCheckbox = z.object({
    checked:z.boolean(),
    disabled: z.boolean()
})

const approvalDecisionRadioBtn = z.object({
    decision: z.enum(DECISION_OPTIONS),
    disabled: z.boolean()
})

const approvalSpecialValidationItem = z.object({

    chkBoxValidate: approvalValidationCheckbox,
    radioBtnDecision: approvalDecisionRadioBtn

})

export const approvalSpecialValidation = z.array(

    approvalSpecialValidationItem

) //travelItem
