/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { selectSpecificRuleStatus } from '../../../../data/selectors';
import DrawerLayout from '../../../layouts/DrawerLayout';
import RuleInternalForm from './RuleInternalForm';

/**
 * RuleFormDrawer Component is used as a child of the ViralForm and the link to that is given below.
 * RuleFormDrawer serves the purpose of wrapping up the DrawerLayout and the ViralInternalForm.
 * The drawer which basically opens up from the side side and the interal form inside that.
 * @component
 * @see {@link http://127.0.0.1:5500/docs/ViralForm.html|ViralForm}
 */
const RuleFormDrawer = ({
	open,
	handleClose,
	isEdit,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting } = useFormikContext();
	const specificRuleStatus = useSelector(selectSpecificRuleStatus);

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={isEdit ? 'Edit Rule' : 'Create new Rule'}
			notifID={isEdit && values ? values._id : ''}
			isLoading={isSubmitting || specificRuleStatus === 'pending'}
		>
			<RuleInternalForm
				isEdit={isEdit}
				onSubmitHandler={onSubmitHandler}
				toggleDeleteModal={toggleDeleteModal}
			/>
		</DrawerLayout>
	);
};

RuleFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default RuleFormDrawer;
