import React from 'react';
// import { useDispatch } from 'react-redux';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { ruleColumns } from '../../data/helpers/ruleHelpers';
import useGetAllRulesQuery from '../../hooks/libraries/rules/useGetAllRules';
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
			_id: '63aabfe31122a69f77e16c3a',
			title: 'Bundesliga Geoblock',
			rule_type: '-',
			tier: '-',
			created_at: '2022-12-27T09:50:27.311Z',
			updated_at: '2022-12-27T09:50:27.311Z',
			geoblocking: {
				countries: [
					{
						name: 'Germany',
						code: 'DE'
					},
					{
						name: 'Austria',
						code: 'AT'
					},
					{
						name: 'Switzerland',
						code: 'CH'
					}
				],
				duration: 72
			}
		},
		{
			_id: '63aac1b6f179d49c0b7b8a4b',
			title: 'Test Geoblock',
			rule_type: '-',
			tier: '-',
			created_at: '2022-12-27T09:58:14.589Z',
			updated_at: '2022-12-27T09:58:14.589Z',
			geoblocking: {
				countries: [
					{
						name: 'Pakistan',
						code: 'PK'
					},
					{
						name: 'India',
						code: 'IN'
					}
				]
			}
		},
		{
			_id: '63aac517cd9e59bc213b7057',
			title: 'Test age rule',
			rule_type: '-',
			tier: '-',
			created_at: '2022-12-27T10:12:39.941Z',
			updated_at: '2022-12-27T10:12:39.941Z',
			age: {
				min: 18
			}
		},
		{
			_id: '63ac65e8460ab2d52dc8f296',
			title: 'Bundesliga Geoblock 2',
			rule_type: '-',
			tier: '-',
			created_at: '2022-12-28T15:51:04.274Z',
			updated_at: '2022-12-28T15:51:04.274Z',
			geoblocking: {
				countries: [
					{
						name: 'Pakistan',
						code: 'PK'
					},
					{
						name: 'India',
						code: 'IN'
					}
				],
				duration: 72
			}
		},
		{
			_id: '63bd6b74ccd62e72de4182be',
			title: 'Bundesliga Geoblock Shahzaib',
			rule_type: '-',
			tier: '-',
			created_at: '2023-01-10T13:43:16.827Z',
			updated_at: '2023-01-10T13:43:16.827Z',
			geoblocking: {
				countries: [
					{
						name: 'Germany',
						code: 'DE'
					},
					{
						name: 'Austria',
						code: 'AT'
					},
					{
						name: 'Switzerland',
						code: 'CH'
					}
				],
				duration: 72
			}
		},
		{
			_id: '63be68f3457805ecb66b590b',
			title: 'Geoblock Isfhan',
			rule_type: '-',
			tier: '-',
			created_at: '2023-01-11T07:44:51.229Z',
			updated_at: '2023-01-11T07:44:51.229Z',
			geoblocking: {
				countries: [
					{
						name: 'Germany',
						code: 'DE'
					},
					{
						name: 'Austria',
						code: 'AT'
					},
					{
						name: 'Switzerland',
						code: 'CH'
					}
				],
				duration: 72
			}
		}
	];

	// const [showSlider, setShowSlider] = useState(false);
	// const [isEdit, setEdit] = useState(false);
	// const [rowStatus, setRowStatus] = useState(''); //publish or draft

	// /**
	//  * onUploadViralClick which is fired whenver the "Upload Viral" button is clicked.
	//  * It's responsible for opening the form in creation mode.
	//  */
	// const onUploadViralClick = () => {
	// 	dispatch(getAllNewLabels());
	// 	setEdit(false);
	// 	setShowSlider(true);
	// };

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
			// isLoading={isLoading}
			// onButtonClick={onUploadViralClick}
		>
			<Table
				columns={ruleColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Rules Found'
			/>
			{/* <ViralForm
				open={showSlider}
				isEdit={isEdit}
				handleClose={() => {
					setShowSlider(false);
				}}
				status={rowStatus}
			/> */}
		</DashboardLayout>
	);
};

export default RuleLibrary;
