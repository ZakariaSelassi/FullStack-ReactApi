import React from 'react'
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';
const InputTextField = ({name,label,register,error, ...inputProps}) => {
 
    return (
        <>
           
            <TextField
                {...inputProps}
                name={name}
                label={label}
                error={error}
                {...register(name)}
            />
         {error && <p>{error?.message}</p>}
        </>
    )
}

export default InputTextField
