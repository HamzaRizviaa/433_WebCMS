import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { isEqual, pick, isEmpty } from 'lodash';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';
import { articleTemplateFormInitialValues } from '../../../../../data/helpers';
import { getRules } from '../../../../../data/selectors';

const ArticleBuilderFooter = ({
	isEdit,
	loading,
	openDeleteModal,
	onSubmitHandler
}) => {
	const classes = useArticleFooterStyles({ loading, isEdit });
	const { rules } = useSelector(getRules);

	const { values, dirty, setSubmitting, setFieldError } = useFormikContext();

	const isTemplateButtonDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(articleTemplateFormInitialValues(rules))),
			articleTemplateFormInitialValues(rules)
		);

		return isEmpty(values.template_name)
			? true
			: !dirty || isEqualToDefaultValues || values.elements.length === 0;
	}, [isEdit, values, dirty, rules]);

	return (
		<div className={classes.footer}>
			{isEdit && (
				<Button
					onClick={openDeleteModal}
					size='small'
					variant='outlined'
					className={[classes.btn, classes.borderColor].join(' ')}
				>
					DELETE TEMPLATE
				</Button>
			)}
			<div className={classes.container}>
				<Button
					size='small'
					className={classes.btn}
					disabled={isTemplateButtonDisabled}
					onClick={() =>
						onSubmitHandler(values, { setSubmitting, setFieldError })
					}
				>
					{isEdit ? 'SAVE TEMPLATE' : 'CREATE TEMPLATE'}
				</Button>
			</div>
		</div>
	);
};

ArticleBuilderFooter.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	loading: PropTypes.bool,
	openDeleteModal: PropTypes.func,
	onSubmitHandler: PropTypes.func.isRequired
};

export default ArticleBuilderFooter;
