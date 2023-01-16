/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { ruleColumns } from '../../data/helpers/ruleHelpers';
import RuleForm from '../../components/forms/RuleForm';
import useGetAllRulesQuery from '../../hooks/libraries/rules/useGetAllRulesQuery';

/**
 * RuleLibrary Component serves as the starting point for the complete flow of the virals library.
 * It uses the DashboardLayout, Table, and ViralForm components and manages states and behaviours for these components.
 * @component
 */
const RuleLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllRulesQuery();
	// console.log('DATA', data);
	// console.log('TOTAL REC', totalRecords);
	// const data = [
	// 	{
	// 		_id: '63bfc858621954313a9e90e6',
	// 		title: 'Test Geoblock 2',
	// 		rule_type: '-',
	// 		tier: '-',
	// 		geoblocking: {
	// 			countries: 'Germany, Netherlands',
	// 			duration: 48
	// 		},
	// 		age: '-',
	// 		post_date: '2023-01-12T08:44:08.975Z',
	// 		last_edit: '2023-01-12T08:44:08.975Z'
	// 	},
	// 	{
	// 		_id: '63bfc843621954313a9e90e3',
	// 		title: 'Test Geoblock',
	// 		rule_type: '-',
	// 		tier: '-',
	// 		geoblocking: {
	// 			countries: 'Pakistan, India'
	// 		},
	// 		age: '-',
	// 		post_date: '2023-01-12T08:43:47.157Z',
	// 		last_edit: '2023-01-12T08:43:47.157Z'
	// 	},
	// 	{
	// 		_id: '63bfc806621954313a9e90e0',
	// 		title: 'Test age rule',
	// 		rule_type: '-',
	// 		tier: '-',
	// 		geoblocking: '-',
	// 		age: {
	// 			min: 18
	// 		},
	// 		post_date: '2023-01-12T08:42:46.754Z',
	// 		last_edit: '2023-01-12T08:42:46.754Z'
	// 	},
	// 	{
	// 		_id: '63bfc873621954313a9e90e9',
	// 		title: 'Bundesliga Geoblock',
	// 		rule_type: '-',
	// 		tier: '-',
	// 		geoblocking: {
	// 			countries: 'Germany, Austria, Switzerland',
	// 			duration: 72
	// 		},
	// 		age: '-',
	// 		post_date: '2023-01-10T08:44:35.725Z',
	// 		last_edit: '2023-01-12T08:44:35.725Z'
	// 	}
	// ];

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
		//dispatch(getSpecificRule(row.id));
		setEdit(true);
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Rule'
			customText='Create New Rule'
			//isLoading={isLoading}
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
