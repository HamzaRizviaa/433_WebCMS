import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UploadOrEditNews from '../../components/news/uploadOrEditNews';
import { newsColumns } from '../../data/helpers/newsHelpers';
import Table from '../../components/ui/Table';
import useGetAllNews from '../../hooks/libraries/news/useGetAllNews';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getSpecificNews } from '../../data/features/newsLibrary/newsLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';

const NewsLibrary = () => {
	const navigate = useNavigate();

	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [page] = useState(1);
	const [rowStatus, setrowStatus] = useState(''); //publish or draft

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
		if (time_difference_minutes <= 1) {
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}
	}, []);

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

	const dispatch = useDispatch();

	const onRowClick = (e, row) => {
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
				page={page}
				buttonText={
					edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
				}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default NewsLibrary;
