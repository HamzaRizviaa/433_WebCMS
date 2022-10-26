import React from 'react';
import ChipsSelectField from '../../ChipsSelectField';

const FormikChipSelect = ({ name, onChange, onBlur }) => {
    const [field, meta, helpers] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const { setValue, setTouched } = helpers;

	const handleChange = useCallback(
		(value) => {
			setValue(value);
			if (onChange) {
				onChange(name, value);
			}
		},
		[onChange]
	);
    
    const handleBlur = useCallback(() => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	}, [value, onBlur]);
    return(
        <ChipsSelectField 
            onChange={handleChange}
			onBlur={handleBlur}
			name={name}
			value={value}
			error={touched ? error : ''}
        />
    )
}

export default FormikChipSelect;