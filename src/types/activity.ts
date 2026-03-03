import {Dayjs} from 'dayjs';


//Number of Participants by Office
interface IParticipantsByOffice {

    office: string,
    number: number,
    purposeOfParticipation: string

} //IParticipantsByOffice


//Interface describing the majority of fields found in Synch
export interface IActivity {

    activityClassification: string,
    activityTitle: string,
    activityType: string,
    activityExerciseName: string,
    activityFiscalYear: number,

    missionTimeline: {
        travelStart: Dayjs,
        travelEnd: Dayjs,
        dutyStart: Dayjs,
        dutyEnd: Dayjs
    },

    linesOfEffort: string,
    commandersPriorities: string,
    decisiveConditions: string,
    strategicApproach: string,
    affectedNations: string[],
    leadDirectory: string,
    planningOPR: string,
    participantsByOffice: IParticipantsByOffice[],
    activityInitiator: string,
    missionLead: string,
    division: string

} //ISynchActivity






