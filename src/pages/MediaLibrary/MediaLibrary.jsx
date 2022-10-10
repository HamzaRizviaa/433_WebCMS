/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSpecificMedia } from '../../data/features/mediaLibrary/mediaLibrarySlice';
import { getAllNewLabels } from "../../data/features/postsLibrary/postsLibrarySlice";
import UploadOrEditMedia from '../../components/media/uploadOrEditMedia';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Table from '../../components/ui/Table';
import { mediaColumns } from '../../data/helpers/mediaHelpers';
import useGetAllMedia from '../../hooks/libraries/media/useGetAllMedia';

const MediaLibrary = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [page, setPage] = useState(1);
		useState('#404040');
	const [rowStatus, setrowStatus] = useState(''); //status PUBLISHED DRAFT to pass in UPLOADOREDITMEDIA

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
		isLoading,
		totalRecords,
		noResultStatus,
		noResultStatusCalendar
	} = useGetAllMedia();

	const onRowClick = (e, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificMedia(row.id));
		setrowStatus(row.status);
		setEdit(true);
		setShowSlider(true);
	}

	useEffect(() => {
		let tableBody = document.getElementsByTagName('tbody')[0];
		if (tableBody) {
			tableBody.scrollTop = 0;
		}
	}, [page]);

	const onUploadMediaClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Media'
			isLoading={isLoading}
			onButtonClick={onUploadMediaClick}
			isSearchFilterError={noResultStatus}
			isDateFilterError={noResultStatusCalendar}
		>
			<Table
				onRowClick={onRowClick}
				columns={mediaColumns}
				data={data}
				totalRecords={totalRecords}
			/>
			<UploadOrEditMedia
					open={showSlider}
					isEdit={edit}
					handleClose={() => {
						setShowSlider(false);
					}}
					page={page}
					title={edit ? 'Edit Media' : 'Upload Media'}
					heading1={edit ? 'Media Type' : 'Select Media Type'}
					buttonText={
						edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
					}
					status={rowStatus}
				/>

		</DashboardLayout>
	);
};

export default MediaLibrary;
