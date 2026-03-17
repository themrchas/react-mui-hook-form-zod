import * as z from 'zod'

import { DECISION_OPTIONS } from '../constants/approvalConstants'

/******* Start defintions for Validation / Decision*******/

const approvalValidationCheckbox = z.object({
    checked:z.boolean(),
    disabled: z.boolean()
})

const approvalDecisionRadioBtn = z.object({
    decision: z.enum(DECISION_OPTIONS),
    disabled: z.boolean()
})

export const approvalSpecialValidationItem = z.object({

    approver: z.string().nonempty(),
    chkBoxValidate: approvalValidationCheckbox,
    radioBtnDecision: approvalDecisionRadioBtn

})

export const approvalSpecialValidation = z.array(

    approvalSpecialValidationItem

) //travelItem


/******* End defintions for Validation / Decision *******/


/******* Start defintions for Event Categories  *******/

const approvalEventCategoryCheckbox = z.object({
    checked:z.boolean(),
    disabled: z.boolean()
})


export const approvalEventCategoryItem = z.object({

    category: z.string().nonempty(),
    chkBoxEventCategory: approvalEventCategoryCheckbox

})


export const approvalEventCategoryChoices = z.array(

    approvalEventCategoryItem

) //approvalEventCategory


/******* End  defintions for Event Categories *******/


/******* Start defintions for Additional Activity Items  *******/

const approvalAdditionalActivityCheckbox = z.object({
    checked:z.boolean(),
    disabled: z.boolean()
});

export const approvalAdditionalActivityItem = z.object({

    activity: z.string().nonempty(),
    chkBoxAdditionalActivity: approvalAdditionalActivityCheckbox

});

export const approvalAdditionalActivityChoices = z.array(

    approvalAdditionalActivityItem

) //approvalEventCategory


/******* End defintions for Additional Activity Items  *******/