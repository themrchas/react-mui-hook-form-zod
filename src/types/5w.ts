export interface I5W {

    w5missionStatement: string,
   
    w5desiredOutput: string,

    w5communicationPlan: {
        email: string,
        alternateEmail?: string,
        phone: string,
        alternatePhone: string
    }

} //I5W

//Remove in production
export interface I5WTest {

    w5missionStatement: string,

} //I5WTest