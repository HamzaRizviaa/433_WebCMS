import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from '@material-ui/core';

import Modal from '../../../ui/Modal';
import RadioButton from '../../../ui/inputs/RadioButton';
import { useQuestionsStyles } from '../index.style';

const PublishAndStopModal = ({
	questionType,
	actionInfo,
	open,
	onClose,
	onConfirm,
	isStopModal = false,
	isSubmitting = false
}) => {
	const [value, setValue] = useState('closed');
	const classes = useQuestionsStyles();

	const handleRadioChange = (event) => {
		setValue(event.target.value);
	};

	const handleConfirm = () => {
		onClose();
		if (onConfirm) onConfirm(value);
	};

	return (
		<Modal
			title={
				isStopModal
					? `Stop this ${questionType}?`
					: `Publish new ${questionType}`
			}
			open={open}
			onClose={onClose}
			onConfirm={handleConfirm}
			isSubmitting={isSubmitting}
		>
			<span>{actionInfo}</span>
			<div className={classes.modalContent}>
				<RadioGroup
					aria-label='status'
					name='status'
					value={value}
					onChange={handleRadioChange}
				>
					<RadioButton
						name='status'
						value='closed'
						label={`Stop ${questionType}`}
						helperText={`Once you stop the ${questionType} you can’t move it back to the homepage`}
					/>
				</RadioGroup>
			</div>
		</Modal>
	);
};

PublishAndStopModal.propTypes = {
	questionType: PropTypes.string.isRequired,
	actionInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	open: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	isStopModal: PropTypes.bool,
	isSubmitting: PropTypes.bool
};

export default PublishAndStopModal;
