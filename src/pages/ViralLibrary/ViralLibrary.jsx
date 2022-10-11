import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import UploadOrEditViral from '../../components/virals/uploadOrEditViral';
import { getSpecificViral } from '../../data/features/viralLibrary/viralLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import useGetAllViralsQuery from '../../hooks/libraries/virals/useGetAllViralsQuery';
import { tableColumns } from '../../data/helpers/viralHelpers';

const ViralLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllViralsQuery();

	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [rowStatus, setrowStatus] = useState(''); //publish or draft

	const onRowClick = (_, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificViral(row.id));
		setEdit(true);
		setrowStatus(row.status); // pass in slider
		setShowSlider(true);
	};

	const onUploadViralClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Viral Library'
			isLoading={isLoading}
			onButtonClick={onUploadViralClick}
		>
			<Table
				onRowClick={onRowClick}
				columns={tableColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Virals Found'
			/>
			<UploadOrEditViral
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
				}}
				title={edit ? 'Edit Viral' : 'Upload Viral'}
				heading1={edit ? 'Media File' : 'Add Media File'}
				buttonText={
					edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
				}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default ViralLibrary;
