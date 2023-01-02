import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick, omit } from 'lodash';
import { useFormikContext } from 'formik';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';
import {
	articleFormInitialValues,
	articleUnwantedKeysForDeepEqual,
	checkIfAnyArticleElementIsEmpty
} from '../../../../../data/helpers';
import { useSelector } from 'react-redux';
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
		isValid,
		status: formikStatus,
		setSubmitting,
		handleSubmit
	} = useFormikContext();

	const isDraftButtonDisabled = useMemo(() => {
		const isAnyElementEmpty = checkIfAnyArticleElementIsEmpty(values.elements);
		const isEqualToDefaultValues = isEqual(
			omit(
				pick(values, Object.keys(articleFormInitialValues(rules))),
				articleUnwantedKeysForDeepEqual
			),
			omit(articleFormInitialValues(rules), articleUnwantedKeysForDeepEqual)
		);

		const isDirty = isEdit ? dirty : formikStatus?.dirty;

		return !isDirty || isAnyElementEmpty || isEqualToDefaultValues;
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
					DELETE ARTICLE
				</Button>
			)}
			<div className={classes.container}>
				{(isDraft || !isEdit) && (
					<Button
						size='small'
						variant='outlined'
						className={classes.draftButton}
						disabled={isDraftButtonDisabled}
						onClick={() => onSubmitHandler(values, { setSubmitting }, true)}
					>
						{isEdit && isDraft ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
					</Button>
				)}
				<Button
					type='submit'
					size='small'
					className={classes.btn}
					disabled={!isDraft ? (!dirty ? isValid : !isValid) : !isValid}
					onClick={handleSubmit}
				>
					{isEdit && !isDraft ? 'SAVE CHANGES' : 'PUBLISH'}
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
