
interface IInternalSupport {

    directorate: string,
    comment: string
} //


export interface IConop {

    situation: string,
    purpose: string,
    keyTask: string[],
    desiredOutcome: string[],
    visitedOrganizations: string[],
    internalSupportRequired: IInternalSupport[],
    additionalSupport: string,
    communicationPlan: {
        email: string,
        alternateEmail: string,
        phone: string,
        alternatePhone: string
    }
    recordOfDecision: string





} //IConop