import {Dayjs} from 'dayjs';


export interface ITravelWorksheet {

    office: string,
    person: string,
    travelModes: string[],  //Grab from a SharePoint list
    travelDates: {
        travelStart: Dayjs,
        travelEnd: Dayjs,
        dutyStart: Dayjs,
        dutyEnd: Dayjs
    }
    conferenceFees: number,
    remarks: string
   
} //ITravelWorksheet

export interface ITravelPerson {
    label: string
}