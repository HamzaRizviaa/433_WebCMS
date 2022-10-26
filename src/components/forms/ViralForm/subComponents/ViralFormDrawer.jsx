import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { useStyles } from '../index.styles';
import { useStyles as globalUseStyles } from '../../../../styles/global.style';
import { selectSpecificViralStatus } from '../../../../data/selectors';

import DrawerLayout from '../../../layouts/DrawerLayout';
import ViralInternalForm from './ViralInternalForm';

const ViralFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	contentWrapperRef,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();

	const { values, isSubmitting, resetForm, validateForm } = useFormikContext();

	const specificViralStatus = useSelector(selectSpecificViralStatus);

	const [disableDropdown, setDisableDropdown] = useState(true);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);

	const previewRef = useRef(null);
	const orientationRef = useRef(null);

	const openPreviewer = (file) => {
		setPreviewBool(true);
		setPreviewFile(file);
	};

	const closePreviewer = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	return (
		<DrawerLayout
			open={open}
			handleClose={() => {
				resetForm();
				validateForm();
				handleClose();
			}}
			isEdit={isEdit}
			isLoading={isSubmitting || specificViralStatus === 'loading'}
			title={isEdit ? 'Edit Viral' : 'Upload Viral'}
			disableDropdown={disableDropdown}
			handlePreview={closePreviewer}
			preview={previewBool}
			previewRef={previewRef}
			orientationRef={orientationRef}
			notifID={isEdit ? values.id : ''}
		>
			<div
				ref={contentWrapperRef}
				className={`${
					previewFile != null
						? globalClasses.previewContentWrapper
						: globalClasses.contentWrapper
				}`}
			>
				<ViralInternalForm
					isEdit={isEdit}
					status={status}
					previewFile={previewFile}
					setDisableDropdown={setDisableDropdown}
					openPreviewer={openPreviewer}
					onSubmitHandler={onSubmitHandler}
					toggleDeleteModal={toggleDeleteModal}
				/>
				{previewFile != null && (
					<div ref={previewRef} className={globalClasses.previewComponent}>
						<div className={globalClasses.previewHeader}>
							<Close
								onClick={() => {
									setPreviewBool(false);
									setPreviewFile(null);
								}}
								className={globalClasses.closeIcon}
							/>
							<h5>Preview</h5>
						</div>
						<div>
							{previewFile.mime_type === 'video/mp4' ? (
								<video
									id={'my-video'}
									poster={isEdit ? previewFile.media_url : null}
									className={globalClasses.previewFile}
									style={{
										width: `100%`,
										height: `${8 * 4}rem`,
										objectFit: 'contain',
										objectPosition: 'center'
									}}
									controls={true}
								>
									<source src={previewFile.media_url} />
								</video>
							) : isEdit && previewFile.type === 'video' ? (
								<video
									id={'my-video'}
									poster={isEdit ? previewFile.thumbnail_url : null}
									className={classes.previewFile}
									style={{
										width: `100%`,
										height: `${8 * 4}rem`,
										objectFit: 'contain',
										objectPosition: 'center'
									}}
									controls={true}
								>
									<source src={previewFile.media_url} />
								</video>
							) : (
								<img
									src={previewFile.media_url}
									className={globalClasses.previewFile}
									style={{
										width: `100%`,
										height: `${8 * 4}rem`,
										objectFit: 'contain',
										objectPosition: 'center'
									}}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</DrawerLayout>
	);
};

ViralFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	contentWrapperRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.elementType })
	]),
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default ViralFormDrawer;
