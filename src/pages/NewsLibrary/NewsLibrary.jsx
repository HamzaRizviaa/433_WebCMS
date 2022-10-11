import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UploadOrEditNews from '../../components/news/uploadOrEditNews';
import { newsColumns } from '../../data/helpers/newsHelpers';
import Table from '../../components/ui/Table';
import useGetAllNews from '../../hooks/libraries/news/useGetAllNews';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getSpecificNews } from '../../data/features/newsLibrary/newsLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';

const NewsLibrary = () => {
	const dispatch = useDispatch();

	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [rowStatus, setrowStatus] = useState('');

	const {
		data,
		totalRecords,
		isLoading,
		noResultStatus,
		noResultStatusCalendar
	} = useGetAllNews();

	const onUploadNewsClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	const onRowClick = (e, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificNews(row.id));
		setEdit(true);
		setrowStatus(row.status); // pass in slider
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='News Library'
			isLoading={isLoading}
			onButtonClick={onUploadNewsClick}
			isSearchFilterError={noResultStatus}
			isDateFilterError={noResultStatusCalendar}
		>
			<Table
				onRowClick={onRowClick}
				data={data}
				columns={newsColumns}
				totalRecords={totalRecords}
			/>
			<UploadOrEditNews
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
				}}
				title={edit ? 'Edit News' : 'Upload News'}
				buttonText={
					edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
				}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default NewsLibrary;
