/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik, Form } from 'formik';
import { useCommonParams } from '../../../hooks';
import { getRules, selectSpecificRule } from '../../../data/selectors';
import {
	ruleDataFormatterForForm,
	ruleDataFormatterForService,
	ruleFormInitialValues,
	ruleFormValidationSchema
} from '../../../data/helpers';
import {
	createOrEditRuleThunk,
	deleteRuleThunk,
	getAllRulesApi,
	fetchRules
} from '../../../data/features/ruleLibrary/ruleLibrarySlice';
// import { uploadFileToServer } from '../../../data/utils';

import RuleFormDrawer from './subComponents/RuleFormDrawer';
import DeleteModal from '../../ui/modals/DeleteModal';

const RuleForm = ({ open, handleClose, isEdit }) => {
	const navigate = useNavigate();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();
	const dispatch = useDispatch();
	const specificRule = useSelector(selectSpecificRule);
	const { rules } = useSelector(getRules);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(
		() =>
			isEdit && !isEmpty(specificRule)
				? ruleDataFormatterForForm(specificRule)
				: ruleFormInitialValues,
		[isEdit, specificRule]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
	const closeDeleteModal = () => setOpenDeleteModal(false);

	/**
	 * onSubmitHandler is fired whenever a user is saving a Viral as draft, published or saving changes.
	 * It's responsible for submitting that data to the backend and updating the UI accordingly.
	 * @param {Object} values - Formik form values.
	 * @param {Object} formikBag - Formik bag object which has all the utilities provided by formik.
	 */
	const onSubmitHandler = useCallback(
		async (values, formikBag) => {
			formikBag.setSubmitting(true);

			try {
				const ruleData = ruleDataFormatterForService(values);

				const { type } = await dispatch(createOrEditRuleThunk(ruleData));

				if (type === 'ruleLibrary/createOrEditRuleThunk/fulfilled') {
					handleClose();

					if (isEdit) {
						dispatch(getAllRulesApi(queryParams));
						dispatch(fetchRules());
					} else if (isSearchParamsEmpty) {
						dispatch(getAllRulesApi());
						dispatch(fetchRules());
					} else {
						navigate('/rule-library');
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
				formikBag.setSubmitting(false);
			}
		},
		[queryParams, isSearchParamsEmpty]
	);

	/**
	 * onDeleteHandler is fired whenever a user wants to delete a viral.
	 * It's responsible for calling the backend for deletion of viral and updating the UI accordingly.
	 * @param {string} id - Id of the viral which is to be deleted
	 * @param {Function} setSubmitting - Function which receives a boolean value as a param and changes the state of form if it is submitting or not
	 */

	const onDeleteHandler = useCallback(
		async (id, isDraft = false, setSubmitting) => {
			setSubmitting(true);
			setOpenDeleteModal(false);
			try {
				await dispatch(deleteRuleThunk({ id: id }));
				handleClose();
				dispatch(getAllRulesApi(queryParams));
				dispatch(fetchRules());
			} catch (e) {
				console.error(e);
			} finally {
				setSubmitting(false);
			}
		},
		[queryParams]
	);

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={ruleFormValidationSchema}
			validateOnMount
			onSubmit={onSubmitHandler}
		>
			{({ setSubmitting, isSubmitting }) => (
				<Form>
					<RuleFormDrawer
						open={open}
						handleClose={handleClose}
						isEdit={isEdit}
						//status={status}
						onSubmitHandler={onSubmitHandler}
						toggleDeleteModal={toggleDeleteModal}
					/>
					<DeleteModal
						open={openDeleteModal}
						toggle={closeDeleteModal}
						deleteBtn={() => {
							onDeleteHandler(specificRule?._id, false, setSubmitting);
						}}
						text={'Rule'}
						wrapperRef={dialogWrapper}
						isSubmitting={isSubmitting}
					/>
				</Form>
			)}
		</Formik>
	);
};

RuleForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired
};

export default RuleForm;
