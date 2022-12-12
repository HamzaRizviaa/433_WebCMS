import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick } from 'lodash';
import { useFormikContext } from 'formik';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';
import {
	areAllFieldsEmpty,
	articleFormInitialValues
} from '../../../../../data/helpers';

const ArticleFormFooter = ({
	isEdit,
	isDraft,
	loading,
	openDeleteModal,
	onSubmitHandler
}) => {
	const classes = useArticleFooterStyles({ loading });
	const { values, dirty, isValid, setSubmitting } = useFormikContext();

	const isDraftButtonDisabled = useMemo(() => {
		const isAnyElementEmpty = values.elements.some((item) =>
			areAllFieldsEmpty(item)
		);
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(articleFormInitialValues)),
			articleFormInitialValues
		);

		return !dirty || isAnyElementEmpty || isEqualToDefaultValues;
	}, [values, dirty]);

	return (
		<div className={classes.footer}>
			{isEdit || isDraft ? (
				<Button
					onClick={openDeleteModal}
					size='small'
					variant='outlined'
					className={classes.btn}
				>
					DELETE ARTICLE
				</Button>
			) : (
				<div></div>
			)}
			<div className={classes.container}>
				{isDraft || !isEdit ? (
					<Button
						size='small'
						variant='outlined'
						className={classes.draftButton}
						disabled={isDraftButtonDisabled}
						onClick={() => onSubmitHandler(values, { setSubmitting }, isDraft)}
					>
						{isEdit && isDraft ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
					</Button>
				) : null}
				<Button
					type='submit'
					size='small'
					className={classes.btn}
					disabled={!isDraft ? (!dirty ? isValid : !isValid) : !isValid}
					onClick={onSubmitHandler}
				>
					{isEdit && !isDraft ? 'SAVE CHANGES' : 'PUBLISH'}
				</Button>
			</div>
		</div>
	);
};

ArticleFormFooter.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	isDraft: PropTypes.bool.isRequired,
	loading: PropTypes.bool,
	openDeleteModal: PropTypes.func,
	onSubmitHandler: PropTypes.func.isRequired
};

export default ArticleFormFooter;
