import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import ArticleInternalForm from './subComonents/ArticleInternalForm';
import { articleDataFormatterForForm } from '../../../data/helpers';
import { getRules } from '../../../data/selectors';

const ArticlePreviewerForm = ({ isEdit, status, selectedOption, data }) => {
	const topElementRef = useRef(null);
	const elementsWrapperRef = useRef(null);

	const { rules } = useSelector(getRules);

	const initialValues = useMemo(
		() => articleDataFormatterForForm(data, rules),
		[data, rules]
	);

	return (
		<Formik initialValues={initialValues} enableReinitialize validateOnMount>
			<Form>
				<ArticleInternalForm
					isEdit={isEdit}
					status={status}
					selectedOption={selectedOption}
					topElementRef={topElementRef}
					elementsWrapperRef={elementsWrapperRef}
					readOnly
				/>
			</Form>
		</Formik>
	);
};

ArticlePreviewerForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired,
	data: PropTypes.object
};

export default ArticlePreviewerForm;
