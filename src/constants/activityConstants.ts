import type { IActivityExercise} from "../types/activity"


export const CLASSIFICATION: string[] = ["NATO UNCLASSIFIED", "NATO CONFIDENTIAL"];

/***** START:  Hook into SP list  when integrated into SPFx   *******/

export const ACTIVITY_TYPE: string[] = ["Activity 1", "Activity 2", "Activity 3", "Activity 4"];

export const EXERCISES: Array<IActivityExercise> = 
    [
        {category: 'NATO Exercises',exercise:'NATO Exercise 1'}, {category:'NATO Exercises',exercise: 'NATO Exercise 2'}, {category:'NATO Exercises',exercise: 'NATO Exercise 3'},
        {category:'NATO Exercises',exercise: 'NATO Exercise 4'},{category: 'National Exercises',exercise:'National Exercise 1'}, {category:'National Exercises',exercise: 'Natinal Exercise 2'}, {category:'National Exercises',exercise: 'National Exercise 3'},
        {category:'National Exercises',exercise: 'National Exercise 4'}
    ]
   

/*******END:  Hook into SP list  when integrated into SPFx  *********/ 




export const FISCAL_YEAR_LOWER_BOUND: number = 2021;
export const FISCAL_YEAR_UPPER_BOUND: number = 2040;

