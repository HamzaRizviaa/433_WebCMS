/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { ruleColumns } from '../../data/helpers/ruleHelpers';
import useGetAllRulesQuery from '../../hooks/libraries/rules/useGetAllRules';
import RuleForm from '../../components/forms/RuleForm';
// import ViralForm from '../../components/forms/ViralForm';
// import useGetAllViralsQuery from '../../hooks/libraries/virals/useGetAllViralsQuery';
// import { getSpecificViral } from '../../data/features/viralLibrary/viralLibrarySlice';
// import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
// import { viralTableColumns } from '../../data/helpers/viralHelpers';

/**
 * ViralLibrary Component serves as the starting point for the complete flow of the virals library.
 * It uses the DashboardLayout, Table, and ViralForm components and manages states and behaviours for these components.
 * @component
 */
const RuleLibrary = () => {
	// const dispatch = useDispatch();

	const { isLoading, totalRecords } = useGetAllRulesQuery();
	const data = [
		{
			_id: '63bfc858621954313a9e90e6',
			title: 'Test Geoblock 2',
			rule_type: '-',
			tier: '-',
			geoblocking: {
				countries: 'Germany, Netherlands',
				duration: 48
			},
			age: '-',
			post_date: '2023-01-12T08:44:08.975Z',
			last_edit: '2023-01-12T08:44:08.975Z'
		},
		{
			_id: '63bfc843621954313a9e90e3',
			title: 'Test Geoblock',
			rule_type: '-',
			tier: '-',
			geoblocking: {
				countries: 'Pakistan, India'
			},
			age: '-',
			post_date: '2023-01-12T08:43:47.157Z',
			last_edit: '2023-01-12T08:43:47.157Z'
		},
		{
			_id: '63bfc806621954313a9e90e0',
			title: 'Test age rule',
			rule_type: '-',
			tier: '-',
			geoblocking: '-',
			age: {
				min: 18
			},
			post_date: '2023-01-12T08:42:46.754Z',
			last_edit: '2023-01-12T08:42:46.754Z'
		},
		{
			_id: '63bfc873621954313a9e90e9',
			title: 'Bundesliga Geoblock',
			rule_type: '-',
			tier: '-',
			geoblocking: {
				countries: 'Germany, Austria, Switzerland',
				duration: 72
			},
			age: '-',
			post_date: '2023-01-10T08:44:35.725Z',
			last_edit: '2023-01-12T08:44:35.725Z'
		}
	];

	const [showSlider, setShowSlider] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [rowStatus, setRowStatus] = useState(''); //publish or draft

	const onUploadRuleClick = () => {
		// dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	// /**
	//  * onRowClick which is fred whenver any record of the table is clicked.
	//  * It's responsible for opening the form in edit mode.
	//  * @param {*} _
	//  * @param {*} row
	//  */
	// const onRowClick = (_, row) => {
	// 	row.status === 'draft' && dispatch(getAllNewLabels());
	// 	dispatch(getSpecificViral(row.id));
	// 	setEdit(true);
	// 	setRowStatus(row.status); // pass in slider
	// 	setShowSlider(true);
	// };

	return (
		<DashboardLayout
			title='Rule'
			customText='Create New Rule'
			isLoading={isLoading}
			onButtonClick={onUploadRuleClick}
		>
			<Table
				columns={ruleColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Rules Found'
			/>
			<RuleForm
				open={showSlider}
				isEdit={isEdit}
				handleClose={() => {
					setShowSlider(false);
				}}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default RuleLibrary;
