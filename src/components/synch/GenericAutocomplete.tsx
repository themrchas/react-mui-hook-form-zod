import {
    Controller,

} from "react-hook-form";

import type { Control, FieldValues, Path } from "react-hook-form";



import { Autocomplete, TextField } from "@mui/material";

type GenericAutocompleteProps<
    TFormValues extends FieldValues, //“I don’t know the form yet — but when someone uses me, they will provide it.”
    /* FieldValues is used as the base type for form data in RHF 
    * TFormValues is the structure of the object being passed to process
    */

    TOption //the type of option the Autocomplete component will render
> = {
    name: Path<TFormValues>; //Structure of the form data  
    control: Control<TFormValues>; //Structure of the form data; controls RHF instance
    options: TOption[]; //autocomplete type array

    getOptionLabel: (option: TOption) => string;
    getOptionValue: (option: TOption) => string;
};

export function GenericAutocomplete<
    TFormValues extends FieldValues,
    TOption
>({
    name,
    control,
    options,
    getOptionLabel,
    getOptionValue,
}: GenericAutocompleteProps<TFormValues, TOption>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Autocomplete<TOption, false, true, true>

                    /* Spread field to ensure proper binding.
                    * This is how RHF will manage the component.
                    * field.value is the RHF managed value of this component
                    */
                    {...field}

                    freeSolo //Allow free text inputs
                    options={options} //Autocomplete options to display 
                   

                    /*How to display values from which user can choose.
                    * If option is a string value and not in 'options'', then it is of type 
                    * string, else we display the value associated with label - 'label: "Bob"'
                    */
                    getOptionLabel={(option) =>
                        typeof option === "string"
                            ? option
                            : getOptionLabel(option)
                    }

                    // Highlight selected option in the drop down; underlying value form actually store
                    value={options.find(opt => getOptionValue(opt) === field.value) || ""}


                    //Text shown in autocomplete box
                    inputValue={field.value || ""}

                    //When the user selects an option from the dropdown OR clicks the clear (x) button
                    onChange={(e, value) => {
                        field.onChange(
                            typeof value === "string"
                                ? value
                                : value
                                    ? getOptionValue(value)
                                    : ""
                        );
                    }}

                    //When the text in the input field changes (typing, clearing, autocompleting)
                    onInputChange={(e, newInputValue, reason) => {
                        if (reason === "input" || reason === "clear") {
                            field.onChange(newInputValue);
                        }
                    }}

                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            )}
        />
    );
}