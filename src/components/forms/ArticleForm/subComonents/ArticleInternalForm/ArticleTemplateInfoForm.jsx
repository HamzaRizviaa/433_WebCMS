import React from 'react';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import FormikField from '../../../../ui/inputs/formik/FormikField';

const ArticleTemplateInfoForm = () => (
	<AccordianLayout title={'Template Information'}>
		<FormikField
			label='TEMPLATE NAME'
			name='template_name'
			placeholder='Please write your template name here'
			multiline
			required
			maxRows={2}
		/>
	</AccordianLayout>
);

export default ArticleTemplateInfoForm;
