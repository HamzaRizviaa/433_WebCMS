import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { ruleColumns } from '../../data/helpers/ruleHelpers';
import RuleForm from '../../components/forms/RuleForm';
import useGetAllRulesQuery from '../../hooks/libraries/rules/useGetAllRulesQuery';
import { getSpecificRule } from '../../data/features/ruleLibrary/ruleLibraryActions';

/**
 * RuleLibrary Component serves as the starting point for the complete flow of the virals library.
 * It uses the DashboardLayout, Table, and ViralForm components and manages states and behaviours for these components.
 * @component
 */
const RuleLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllRulesQuery();

	const [showSlider, setShowSlider] = useState(false);
	const [isEdit, setEdit] = useState(false);

	// /**
	//  * onUploadRuleClick which is fired whenver the "Upload Viral" button is clicked.
	//  * It's responsible for opening the form in creation mode.
	//  */
	const onUploadRuleClick = () => {
		setEdit(false);
		setShowSlider(true);
	};

	// /**
	//  * onRowClick which is fred whenver any record of the table is clicked.
	//  * It's responsible for opening the form in edit mode.
	//  * @param {*} _
	//  * @param {*} row
	//  */
	const onRowClick = (_, row) => {
		console.log('row', row);
		dispatch(getSpecificRule(row._id));
		setEdit(true);
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Rule'
			customText='Create New Rule'
			customSearchText='Search for Title, Country'
			isLoading={isLoading}
			onButtonClick={onUploadRuleClick}
		>
			<Table
				columns={ruleColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				onRowClick={onRowClick}
				noDataText='No Rules Found'
			/>
			<RuleForm
				open={showSlider}
				isEdit={isEdit}
				handleClose={() => {
					setShowSlider(false);
				}}
			/>
		</DashboardLayout>
	);
};

export default RuleLibrary;
