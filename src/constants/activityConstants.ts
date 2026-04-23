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
   
//This will be populated by managed metadata    
export const LOE: string[] = ["LOE 1","LOE 2","LOE 3", "LOE 4"];

//This will be populated by managed metadata
export const CP: string[] = ["Priority 1", "Priority 2", "Priority 3"];

//This will be populated by managed metadata
export const DC: string[] = ["DC 1", "DC 2", "DC 3"];

export const LEAD_DIR: string[] = ["DIR 1", "DIR 2", "DIR 3", "DIR 4"]

/*******END:  Hook into SP list  when integrated into SPFx  *********/ 

// Will theses choices be read out of a list or MM ????
export const STRATEGIC_APPROACH_ONE = "Strategic Approach 1";
export const STRATEGIC_APPROACH_TWO = "Strategic Approach 2";
export const STRATEGIC_APPROACH_THREE = "Strategic Approach 3";
export const STRATEGIC_APPROACH_FOUR = "Strategic Approach 4";


export const FISCAL_YEAR_LOWER_BOUND: number = 2021;
export const FISCAL_YEAR_UPPER_BOUND: number = 2040;

