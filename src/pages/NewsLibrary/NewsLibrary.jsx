import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import NewsForm from '../../components/forms/NewsForm';
import { newsColumns } from '../../data/helpers/newsHelpers';
import Table from '../../components/ui/Table';
import useGetAllNews from '../../hooks/libraries/news/useGetAllNews';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getSpecificNews } from '../../data/features/newsLibrary/newsLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import NotificationForm from '../../components/forms/NotificationForm';

/**
 * News Library Component
 * @component
 */
const NewsLibrary = () => {
	const dispatch = useDispatch();
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [rowStatus, setrowStatus] = useState(''); //publish or draft

	const { data, totalRecords, isLoading } = useGetAllNews();

	/**
	 * Opens the slider to upload new News Item
	 * @returns {void}
	 */
	const onUploadNewsClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	/**
	 * Opens up the slider and populates the clicked news item.
	 * @param {object} row - Contains pecific news item data
	 * @returns {void}
	 */
	const onRowClick = (_, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificNews(row.id));
		setEdit(true);
		setrowStatus(row.status); // pass in slider
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='News'
			isLoading={isLoading}
			onButtonClick={onUploadNewsClick}
		>
			<Table
				onRowClick={onRowClick}
				data={data}
				columns={newsColumns}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No News Found'
			/>
			<NewsForm
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
				}}
				status={rowStatus}
			/>
			<NotificationForm />
		</DashboardLayout>
	);
};

export default NewsLibrary;
