/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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

	const [showSlider, setShowSlider] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [edit, setEdit] = useState(false);
	const parsedPage = Number(searchParams.get('page'));
	const page = isNaN(parsedPage) ? 1 : parsedPage || 1;
	const [rowStatus, setrowStatus] = useState(''); //status PUBLISHED DRAFT to pass in UPLOADOREDITMEDIA

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
