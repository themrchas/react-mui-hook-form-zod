export interface I5W {

    missionStatement: string,
    visitedOrganizations: string[],
    desiredOutput: string,
    communicationPlan: {
        email: string,
        alternateEmail: string,
        phone: string,
        alternatePhone: string
    }

} //I5W

//Remove in production
export interface I5WTest {

    w5missionStatement: string,

} //I5WTest