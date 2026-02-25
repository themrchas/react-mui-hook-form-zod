export interface IApproval {

    toValidate: {
        snr: boolean,
        medad: {
            validate: boolean,
            decision: boolean
        }
        legad: {
            validate: boolean,
            decision: boolean
        }
        securityImplications: boolean
    } //toValidate

    eventCategories: {
        milestone: boolean,
        keyEvent: boolean,
        battleRhythm: boolean,
        vtc: boolean,
        kle: boolean
    }

    additionalActivity : {
        conopApproval: boolean,
        noReportRequired: boolean
    }





} //IApproval