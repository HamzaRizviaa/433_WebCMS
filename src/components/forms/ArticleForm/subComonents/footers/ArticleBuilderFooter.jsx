import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEqual, pick, omit } from 'lodash';
import { useFormikContext } from 'formik';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';
import {
	articleFormInitialValues,
	articleUnwantedKeysForDeepEqual,
	checkIfAnyArticleElementIsEmpty
} from '../../../../../data/helpers';
import { getRules } from '../../../../../data/selectors';
import { Calendar } from '../../../../../assets/svg-icons';
import useSchedulerHandlers from '../../../../../hooks/useSchedulerHandlers';

const ArticleBuilderFooter = ({
	isEdit,
	isDraft,
	loading,
	openDeleteModal,
	onSubmitHandler,
	openSchedulerModal
}) => {
	const { rules } = useSelector(getRules);

	const { values, dirty, isValid, status: formikStatus } = useFormikContext();

	const isDraftButtonDisabled = useMemo(() => {
		const isCategorySelected =
			!!values.mainCategoryId && !!values.subCategoryId;
		const isAnyElementEmpty = checkIfAnyArticleElementIsEmpty(values.elements);
		const isEqualToDefaultValues = isEqual(
			omit(
				pick(values, Object.keys(articleFormInitialValues(rules))),
				articleUnwantedKeysForDeepEqual
			),
			omit(articleFormInitialValues(rules), articleUnwantedKeysForDeepEqual)
		);

		const isDirty = isEdit ? dirty : formikStatus?.dirty;

		return isCategorySelected
			? !isDirty || isAnyElementEmpty || isEqualToDefaultValues
			: !isCategorySelected;
	}, [isEdit, values, dirty, formikStatus]);

	const { handleDraftClick, handlePublishClick, handleSaveChangesClick } =
		useSchedulerHandlers({ onSubmitHandler });

	const classes = useArticleFooterStyles({ loading, isEdit, isDraft });

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
					<>
						{values.is_scheduled ? (
							<Button
								size='small'
								variant='outlined'
								type='submit'
								disabled={isValid ? !dirty : !isValid}
								onClick={handleSaveChangesClick}
							>
								SAVE CHANGES
							</Button>
						) : (
							<Button
								size='small'
								variant='outlined'
								disabled={isDraftButtonDisabled}
								onClick={handleDraftClick}
							>
								{isDraft && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
							</Button>
						)}
					</>
				)}
				<Button
					type='submit'
					size='small'
					className={classes.btn}
					disabled={!isDraft ? (!dirty ? isValid : !isValid) : !isValid}
					onClick={handlePublishClick}
				>
					{isEdit && !isDraft ? 'SAVE CHANGES' : 'PUBLISH'}
				</Button>
				{isDraft && !values.is_scheduled && (
					<Button
						disabled={values.is_scheduled || !isDraft ? true : !isValid}
						onClick={openSchedulerModal}
						iconBtn
					>
						<Calendar />
					</Button>
				)}
			</div>
		</div>
	);
};

ArticleBuilderFooter.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	isDraft: PropTypes.bool.isRequired,
	loading: PropTypes.bool,
	openDeleteModal: PropTypes.func,
	onSubmitHandler: PropTypes.func.isRequired,
	openSchedulerModal: PropTypes.func.isRequired
};

export default ArticleBuilderFooter;
