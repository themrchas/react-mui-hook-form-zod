import React from "react";

import { DevTool } from "@hookform/devtools"

//import { useForm, useFieldArray, useFormState, type FieldErrors } from "react-hook-form";
import { useForm, useFieldArray, Controller} from "react-hook-form";

import type { FieldErrors, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

import { Box, Stack, Typography, Button, TextField } from '@mui/material'

import { FormLabel, FormControl, FormControlLabel, FormGroup, Checkbox} from '@mui/material'


import { useEffect, useState } from "react";

interface IFormInput {

    username: string
    email: string
    channel?: string
    street: string
    defaultValueDemo?: string
    id: number
    company: {
        name: string
        catchPhrase: string
    },
    phNumbers: { number: string }[],
    controlledTextField: string,
    animals: string[]
}

const onSubmitWithEvent = (data: IFormInput, event: React.SyntheticEvent<HTMLFormElement>) => {
    console.log('Form submitted data is ', data, 'with event', event)
}

const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log('Form submitted data is ', data)
}

//This can exist inside the component definition as well.
const doGetValues = (values: string) => {

    console.log("values are ",values)

}

const onFormError: SubmitErrorHandler<IFormInput> = (errors: FieldErrors<IFormInput>) => {

    console.log("onformError: submission errors are", errors)
}


const handleCheckboxChange = (

    event: React.ChangeEvent<HTMLInputElement>,
    currentSelectedAnimals: string[],
    updateAnimalSelections: (newSelected: string[]) => void

) => {

    const selectedAnimal = event.target.value;

    let newValues: string[];

    if ( currentSelectedAnimals.indexOf(selectedAnimal) == -1) {

        newValues = [...currentSelectedAnimals, selectedAnimal]

    }
    else {

        newValues = currentSelectedAnimals.filter( (elem) => elem !== selectedAnimal)

    }

    updateAnimalSelections(newValues)


} //handleCheckboxChange


let renderCount = 0;


export const Basic = () => {

    //Grab reference to the form
    const form = useForm<IFormInput>({

        defaultValues: async () => {

            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
            const data = await response.json()
            return {
                username: data.name,
                email: data.email,
                street: data.address.street,
                id: data.id,
                company: {
                    name: data.company.name,
                    catchPhrase: data.company.catchPhrase
                },
                phNumbers: [{ number: '' }],
                controlledTextField: "Yes, money.",
                animals: []
               

            }
        }, //defaultValues
        mode: "onBlur"

    }) //useForm

    //Grab form related controls
    const { register, control, handleSubmit, formState, watch, getValues, setValue, reset } = form

    const { errors, 
            isDirty, //This refers to the entire form
            dirtyFields,
            touchedFields,
            isValid,  //Value reflects the validity of of all form controls
            isSubmitSuccessful,

          } = formState

    //Dynamic fields  We use 'fields' in the JSX which is essentially a reference to phNumbers object
    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',    //Use 'phNumbers' as the field array to use to store dynamic content; this must be an array of objects
        control  //This is control returned from useForm hook

    })

    const watchForm = watch(['username','email']);

    useEffect(() => {

        const subscription = watch((value) => { console.log('userEffect watch value',value) });
        
        return () => subscription.unsubscribe();
    }
        , [watch]
    )

    //Used to demo the non react hook form version of a checkbox
   const [neighbors, setNeighbors] = useState<string[]>([])

    
    
    const checkBoxSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
 
        const targetValue = event.target.value;

        console.log("event is", event)

        setNeighbors( (prevNeighbors) => {

            //If the target is not in the array, add it as 'checked
            if (prevNeighbors.indexOf(targetValue)== -1) {
                return [...prevNeighbors, targetValue]
            }
            else {

                //Target is in array, so we want to 'uncheck'
                return prevNeighbors.filter( (elem) => elem !== targetValue)
            }
           

        }); 

    } //checkBoxSelected

    const [ petNameIsReadOnly,togglePetNameIsReadOnly ] = useState<boolean>(false)
       
    const togglePetName = (event:React.SyntheticEvent) => {

        console.log("petNameToggled: toggle event is ",event);
        togglePetNameIsReadOnly( (current) => {
            
            console.log("togglePetNameIsRead: current value is",current)  
            return !current

        })

    };



    const resetForm = () => {

        reset()
    }



    renderCount++;

    return (

        <>

            <Typography variant="h6">Render Count: {renderCount/2}</Typography>
            <Typography variant="h6" sx={{mb:1}}>{JSON.stringify(watchForm)}</Typography>
             <Typography variant="h6" sx={{mb:1}}>Form is dirty: {isDirty? "true" : "false"}</Typography>
             <Typography variant="h6" sx={{mb:1}}>Form is valid: {isValid? "true" : "false"}</Typography>
             <Typography variant="h6" sx={{mb:1}}>dirtyFields: {JSON.stringify(dirtyFields)}</Typography>
            <Typography variant="h6" sx={{mb:1}}>touchedFields: {JSON.stringify(touchedFields)}</Typography>
            <Typography variant="h6" sx={{mb:1}}>isSubmitSuccessful: {isSubmitSuccessful? "true" : "false"}</Typography>

        <Box>

            {/* handleSubmit is a mehtod from the 'form' object of react hook form */}
            {/* <form onSubmit={handleSubmit((data,event) => onSubmitWithEvent(data,event))}>*/}
            <form onSubmit={handleSubmit(onSubmit,onFormError)} noValidate>

                <Stack>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username",
                            {
                                required: "Username cannot be blank and must start with a non-whitespace character",
                                pattern: {
                                    value: /^\S+/,
                                    message: "Username must begin with a non whitespace character"
                                },
                                validate: {
                               
                            } //validate

                            }
                        )}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        type="text"
                        id="email"
                        {...register("email",
                            { 
                                required: "E-mail must contain a value",
                                validate: {
                                    nameExists: async (fieldValue) => {

                                    const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                                    const data = await response.json();
                                    
                                    //Test if data.length === 0...if not, then the email already exists
                                    return data.length === 0 || "Email already exists"

                                    }//nameExists

                                } //validate
                            }
                        )} />

                    <label htmlFor="channel">Channel</label>
                    <input type="text"
                        id="channel"
                        {...register("channel",
                            { required: { value: false, message: 'Channel is a required field' } }

                        )} />
                    <p>{errors.channel?.message}</p>


                    <label htmlFor="street">Street</label>
                    <input
                        type="text"
                        id="street"
                        {...register("street",
                            {
                                required: "Street cannot be blank and must start with a non-whitespace character",
                                pattern: {
                                    value: /^\S+/,
                                    message: "Street must begin with a non whitespace character"
                                },
                                validate: {
                                    noElm: (value) => {
                                        return (
                                            !value.includes("Elm") || "The street cannot contain the word 'Elm'"
                                        )
                                    },
                                    noNumber: (value) => {
                                        return (
                                            /\d+/.test(value) || "The street must contain at least one digit.")
                                    }
                                } //validate


                            } //register options
                        )}
                    />


                    <label htmlFor="defaultValueDemo">Default Value</label>
                    <input
                        type="text"
                        id="defaultValueDemo"
                        {...register("defaultValueDemo",
                            { required: "Default value demo must contain a value" }
                        )} />



                    <Typography variant="h4" sx={{ mt: 3 }}>Nested objects</Typography>

                    <label htmlFor="company">Company Name</label>
                    <input type="text"
                        id="company"
                        {...register("company.name",
                            { required: { value: true, message: 'Company name is a required field' } }

                        )} />


                    <label htmlFor="catchPhrase">Catch Phrase</label>
                    <input type="text"
                        id="catchPhrase"
                        {...register("company.catchPhrase",
                            { required: { value: true, message: 'Company catch phrase is a required field' } }

                        )} />


                    <Typography variant="h4" sx={{ mt: 3 }}>Dynamic Fields</Typography>

                    <Box>
                        <div>
                            {
                                fields.map((phoneNumber, index) => {

                                    return (
                                        <>

                                        {/* Per docs, 'id' is automatically generated by useFieldArray*/}
                                        <div key={phoneNumber.id}>
                                            
                                            <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                                        </div>
                                        <button type="button" onClick={ () => remove(index)}>Remove</button>
                                        </>
                                    )
                                })
                            }


                        </div>
                        <button type="button" onClick={() => append({ number: "" })}>Add Phone Number</button>

                    </Box>

                    <Typography variant="h4" sx={{ mt: 3 }}>Numeric and Date Types</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>It is possible that the schema requires a number type.  Use the following to force this on submit:<br />
                    We are not intersted in 'id:"3"'for example.  We want 'id:3'

                    </Typography>

                     <label htmlFor="id">Default Value</label>
                    <input
                        type="number"
                        id="id"
                        {...register("id",
                            { 
                                required: "Default value must contain a value" ,
                                valueAsNumber: true
                            }
                        )} />


                        <Typography variant="h4" sx={{ mt: 3 }}>getValue Example</Typography>
                        <Button

                            variant="contained"
                            size="small"

                            onClick={() => doGetValues(getValues("username"))}

                        >Press getValues</Button>

                        <Typography variant="h4" sx={{ mt: 3 }}>setValue Example</Typography>
                        <Button

                            variant="contained"
                            size="small"
                            color="secondary"

                            onClick={() => setValue("username", "Yes - money",{shouldDirty:true})}

                        >Press setValue</Button>
                        
                        <Typography variant="h4" sx={{ mt: 3 }}>Pet Name RO</Typography>
                        <Stack direction="row">
                        <Box>
                        
                        <TextField
                            id="pet-name"
                            sx={{'& .MuiInputBase-input': { padding: '5px'}}}
                            type="text"
                            slotProps={{
                                input: { readOnly: petNameIsReadOnly }
                            }}
                        ></TextField>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={togglePetName}

                        >Set RO</Button>
                        </Stack>



                    {/* Controlled Input example */}

                    <Typography variant="h4" sx={{ mt: 3 }}>Controlled TextField with Error Handling</Typography>
                        
                    <Box sx={{ my:3 }}>
                    <Controller
                        
                        name="controlledTextField"
                        control={control}
                       // defaultValue="Yes - money!"

                       rules={{
                        minLength: { value:5, message: "Minimum length is 5 characters"}
                       }}
                    
                        render={({field}) => (
                        <TextField 
                            {...field}
                            label="controlledTextFieldLabel"
                            variant="outlined"
                           
                            slotProps={{
                                inputLabel: { shrink:true }
                            }}
                               
                        />
                    )}
                    

                    /> {/* Controller */}
                    </Box>



                    <Typography variant="h4" sx={{ mt: 3 }}>Vanilla MUI Checkbox</Typography>
                    <Box sx={{ mx: 3}}>

                        
                            <FormLabel>Neighbors</FormLabel>
                                <FormGroup>
                                    <FormControlLabel 
                                        label="Beavis" 
                                        control={
                                            <Checkbox 
                                                value='beavis'
                                                checked={neighbors.includes('beavis')} 
                                                onChange={checkBoxSelected} 
                                            />
                                        }
                                    />
                                    <FormControlLabel 
                                        label="Butthead" 
                                        control={<Checkbox value="butthead" checked={neighbors.includes("butthead")} onChange={checkBoxSelected} />}
                                    />
                                    <FormControlLabel 
                                        label="Mr. Johnson" 
                                        control={<Checkbox value="mr. johnson" checked={neighbors.includes("mr. johnson")} onChange={checkBoxSelected} />}
                                    />


                                </FormGroup>

                       




                    </Box>


                     <Typography variant="h4" sx={{ my: 3 }}>Checkbox with React Hook Forms
                     <Box sx={{ fontSize: '16px'}}>Due to the 'async' call for defaultValues, we use checked=&#123;Array.isArray(fields.value) && fields.values.includes('cat)&#125;</Box>
                     </Typography>

                        <Box sx={{ mx: 3 }}>

                            <FormControl>
                                <FormLabel>Animals</FormLabel>
                                <FormGroup>
                                    <Controller

                                        name="animals"
                                        control={control}
                                        render={({ field }) => {

                                            return (

                                                <>

                                                    <FormControlLabel
                                                        label="Dog"
                                                        control={
                                                            <Checkbox
                                                                value='dog'
                                                                checked={Array.isArray(field.value) && field.value.includes('dog')}
                                                                onChange={(e) => handleCheckboxChange(e, field.value, field.onChange)}
                                                            />
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        label="Cat"
                                                        control={
                                                            <Checkbox
                                                                value='cat'
                                                                checked={Array.isArray(field.value) && field.value.includes('cat')}
                                                                onChange={(e) => handleCheckboxChange(e, field.value, field.onChange)}
                                                            />

                                                        }
                                                    />
                                                    <FormControlLabel
                                                        label="Mouse"
                                                        control={
                                                            <Checkbox
                                                                value='mouse'
                                                                checked={Array.isArray(field.value) && field.value.includes('mouse')}           
                                                                onChange={(e) => handleCheckboxChange(e, field.value, field.onChange)}
                                                            />
                                                        }
                                                    />
                                                </>
                                            );
                                        }}
                                
                                />

                                </FormGroup>
                            </FormControl>





                        </Box>



                   {/* <button disabled={!isDirty || !isValid}>Submit</button>*/}
                   <Stack direction="row" sx={{ my:3}}>
                   <Button variant="contained" type="submit" color="info">Submit</Button>
                   <Button 
                        variant="contained" 
                        type="button" 
                        color="info"
                        sx={{ ml:3}}
                        onClick={resetForm}
                    >
                    Reset</Button>
                   </Stack>

                </ Stack >

            </form>

            <DevTool control={control} />

        </Box>

        </>



    )







} //Basic