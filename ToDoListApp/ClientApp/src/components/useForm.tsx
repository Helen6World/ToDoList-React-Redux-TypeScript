import React, {useState, useEffect} from 'react';
const useFrom=(initialFieldValues: { content: string; isDone: string; }, validate: (fieldValues?: any) => boolean, setCurrentId: (arg0: number) => void) => {
    const [values,setValues] =useState(initialFieldValues)
    const [errors, setErrors]=useState({})
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const resetForm =()=> {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}
export default useFrom;