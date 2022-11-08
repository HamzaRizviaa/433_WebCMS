import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ViralForm from '../../components/forms/ViralForm';
import useGetAllViralsQuery from '../../hooks/libraries/virals/useGetAllViralsQuery';
import { getSpecificViral } from '../../data/features/viralLibrary/viralLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import { viralTableColumns } from '../../data/helpers/viralHelpers';

/**
 * ViralLibrary Component serves as the starting point for the complete flow of the virals library.
 * It uses the DashboardLayout, Table, and ViralForm components and manages states and behaviours for these components.
 * @component
 */
const ViralLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllViralsQuery();

	const [showSlider, setShowSlider] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [rowStatus, setRowStatus] = useState(''); //publish or draft

	/**
	 * onUploadViralClick which is fired whenver the "Upload Viral" button is clicked.
	 * It's responsible for opening the form in creation mode.
	 */
	const onUploadViralClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	/**
	 * onRowClick which is fred whenver any record of the table is clicked.
	 * It's responsible for opening the form in edit mode.
	 * @param {*} _
	 * @param {*} row
	 */
	const onRowClick = (_, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificViral(row.id));
		setEdit(true);
		setRowStatus(row.status); // pass in slider
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Viral'
			isLoading={isLoading}
			onButtonClick={onUploadViralClick}
		>
			<Table
				onRowClick={onRowClick}
				columns={viralTableColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Virals Found'
			/>
			<ViralForm
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

export default ViralLibrary;
