import React from 'react';
import { useStyles } from './index.styles';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import PropTypes from 'prop-types';
import Button from '../../button';

const ArticleFooter = ({
	buttonText,
	isEdit,
	form,
	dataElement,
	status,
	deleteBtnStatus,
	toggleDeleteModal,
	draftBtnDisabled,
	validateDraft,
	handleDraftSave,
	validateForm,
	editBtnDisabled,
	handleAddSaveBtn,
	loading
}) => {
	const classes = useStyles({ loading });
	const globalClasses = globalUseStyles();

	return (
		<div className={classes.footer}>
			<div>
				{isEdit || (status === 'draft' && isEdit) ? (
					<div className={globalClasses.editBtn}>
						<Button
							disabled={deleteBtnStatus}
							button2={isEdit ? true : false}
							onClick={() => {
								if (!deleteBtnStatus) {
									toggleDeleteModal();
								}
							}}
							className={classes.btn}
							text={'DELETE ARTICLE'}
						/>
					</div>
				) : (
					<></>
				)}
			</div>

			<div className={globalClasses.publishDraftDiv}>
				{status === 'draft' || !isEdit ? (
					<div className={isEdit ? classes.draftBtnEdit : classes.draftBtn}>
						<Button
							disabledDraft={
								isEdit ? draftBtnDisabled : !validateDraft(form, dataElement)
							}
							onClick={() => handleDraftSave()}
							button3={true}
							text={
								status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'
							}
							className={classes.btn}
						/>
					</div>
				) : (
					<></>
				)}

				<div
					className={
						isEdit && validateForm(form, dataElement)
							? classes.addMediaBtn
							: isEdit
							? classes.addMediaBtnEdit
							: classes.addMediaBtn
					}
				>
					<Button
						disabled={
							isEdit && validateForm(form, dataElement) && status === 'draft'
								? false
								: isEdit
								? editBtnDisabled
								: !validateForm(form, dataElement)
						}
						button2AddSave={true}
						text={buttonText}
						onClick={() => handleAddSaveBtn()}
						className={classes.btn}
					/>
				</div>
			</div>
		</div>
	);
};

export default ArticleFooter;

ArticleFooter.propTypes = {
	buttonText: PropTypes.string.isRequired,
	isEdit: PropTypes.bool.isRequired,
	form: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
	deleteBtnStatus: PropTypes.bool.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired,
	draftBtnDisabled: PropTypes.bool.isRequired,
	validateDraft: PropTypes.func.isRequired,
	handleDraftSave: PropTypes.func.isRequired,
	validateForm: PropTypes.func.isRequired,
	editBtnDisabled: PropTypes.bool.isRequired,
	handleAddSaveBtn: PropTypes.func.isRequired,
	dataElement: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};
