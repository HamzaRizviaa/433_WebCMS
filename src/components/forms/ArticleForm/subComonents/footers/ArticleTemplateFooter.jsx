import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useArticleFooterStyles } from './index.style';
import Button from '../../../../ui/Button';

const ArticleBuilderFooter = ({
	isEdit,
	isDraft,
	loading,
	openDeleteModal
}) => {
	const classes = useArticleFooterStyles({ loading, isEdit, isDraft });

	const { dirty, isValid, handleSubmit } = useFormikContext();

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
					disabled={!isDraft ? (!dirty ? isValid : !isValid) : !isValid}
					onClick={handleSubmit}
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
	openDeleteModal: PropTypes.func
};

export default ArticleBuilderFooter;
