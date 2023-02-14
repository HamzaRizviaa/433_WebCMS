import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';

const DeleteModal = ({
	text,
	open,
	toggle,
	deleteBtn,
	isSubmitting = false
}) => {
	return (
		<Modal
			title={`Delete this ${text}?`}
			open={open}
			onClose={toggle}
			onConfirm={deleteBtn}
			isSubmitting={isSubmitting}
			confirmButtonText={`Delete ${text}`}
			size='xsmall'
		>
			<p className='mb-4'>
				You are about to delete this <strong>{text}.</strong> You won’t be able
				to retrieve the post.
			</p>
		</Modal>
	);
};

DeleteModal.propTypes = {
	text: PropTypes.string,
	open: PropTypes.bool,
	toggle: PropTypes.func.isRequired,
	deleteBtn: PropTypes.func.isRequired,
	isSubmitting: PropTypes.bool
};

export default DeleteModal;
