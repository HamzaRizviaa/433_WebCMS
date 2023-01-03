import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { isEqual, pick, omit } from 'lodash';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';
import {
	articleTemplateFormInitialValues,
	articleUnwantedKeysForDeepEqual
} from '../../../../../data/helpers';
import { getRules } from '../../../../../data/selectors';

const ArticleBuilderFooter = ({
	isEdit,
	isDraft,
	loading,
	openDeleteModal,
	onSubmitHandler
}) => {
	const classes = useArticleFooterStyles({ loading, isEdit, isDraft });
	const { rules } = useSelector(getRules);

	const {
		values,
		dirty,
		status: formikStatus,
		setSubmitting
	} = useFormikContext();

	const isTemplateButtonDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			omit(
				pick(values, Object.keys(articleTemplateFormInitialValues(rules))),
				articleUnwantedKeysForDeepEqual
			),
			omit(
				articleTemplateFormInitialValues(rules),
				articleUnwantedKeysForDeepEqual
			)
		);

		const isDirty = isEdit ? dirty : formikStatus?.dirty;

		return !isDirty || isEqualToDefaultValues;
	}, [isEdit, values, dirty, formikStatus]);

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
					type='submit'
					size='small'
					className={classes.btn}
					disabled={isTemplateButtonDisabled}
					onClick={() => onSubmitHandler(values, { setSubmitting })}
				>
					{isEdit && !isDraft ? 'SAVE TEMPLATE' : 'CREATE TEMPLATE'}
				</Button>
			</div>
		</div>
	);
};

ArticleBuilderFooter.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	isDraft: PropTypes.bool.isRequired,
	loading: PropTypes.bool,
	openDeleteModal: PropTypes.func,
	onSubmitHandler: PropTypes.func.isRequired
};

export default ArticleBuilderFooter;
