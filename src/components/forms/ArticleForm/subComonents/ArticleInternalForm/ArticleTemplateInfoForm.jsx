import React from 'react';
import PropTypes from 'prop-types';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import FormikField from '../../../../ui/inputs/formik/FormikField';

const ArticleTemplateInfoForm = ({ readOnly }) => (
	<AccordianLayout title={'Template Information'}>
		<FormikField
			label='TEMPLATE NAME'
			name='template_name'
			placeholder='Please write your template name here'
			multiline
			required={readOnly ? false : true}
			maxRows={2}
			readOnly={readOnly}
		/>
	</AccordianLayout>
);

ArticleTemplateInfoForm.propTypes = {
	readOnly: PropTypes.bool
};

export default ArticleTemplateInfoForm;
