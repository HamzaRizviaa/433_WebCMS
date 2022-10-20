import React, { useCallback } from 'react';
import { useField } from 'formik';
import RichTextEditor from '../../RichTextEditor';

const FormikTextEditor = ({ name, onChange, onBlur }) => {
    const [ field, meta, helpers ] = useField(name)
    const { value } = field
    const { touched, error } = meta
    const { setValue, setTouched } = helpers

    const handleChange = useCallback((text) => {
        setValue(text)
        if(onChange){
            onChange(name, text)
        }
    },[onChange])

    const handleBlur = useCallback(() => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	}, [value, onBlur]);
    return(
        <RichTextEditor 
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched ? error : ''}
        />
    )
}

export default FormikTextEditor;