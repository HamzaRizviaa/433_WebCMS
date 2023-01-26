import React from 'react';
import { FieldArray } from 'formik';
import TargetApp from './TargetApp';

const TargetStepForm = () => {
	return (
		<div>
			<FieldArray name='target' component={TargetApp} />
		</div>
	);
};

export default TargetStepForm;
