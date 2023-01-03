import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { isEqual, pick, omit } from 'lodash';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';
import {
	articleTemplateFormInitialValues,
	articleTemplateUnwantedKeysForDeepEqual
} from '../../../../../data/helpers';
import { getRules } from '../../../../../data/selectors';

const ArticleBuilderFooter = ({
	isEdit,
	loading,
	openDeleteModal,
	onSubmitHandler
}) => {
	const classes = useArticleFooterStyles({ loading, isEdit });
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
				articleTemplateUnwantedKeysForDeepEqual
			),
			omit(
				articleTemplateFormInitialValues(rules),
				articleTemplateUnwantedKeysForDeepEqual
			)
		);

		const isDirty = isEdit ? dirty : formikStatus?.dirty;

		console.log({ isDirty, isEqualToDefaultValues });

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
