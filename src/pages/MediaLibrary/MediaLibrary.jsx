import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
// import UploadOrEditMedia from '../../components/media/uploadOrEditMedia';
import useGetAllMedia from '../../hooks/libraries/media/useGetAllMedia';
import { getSpecificMedia } from '../../data/features/mediaLibrary/mediaLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import { mediaColumns } from '../../data/helpers/mediaHelpers';
import MediaForm from '../../components/forms/MediaForm';

const MediaLibrary = () => {
	const dispatch = useDispatch();

	const [showSlider, setShowSlider] = useState(false);
	const [searchParams] = useSearchParams();
	const [edit, setEdit] = useState(false);
	const parsedPage = Number(searchParams.get('page'));
	const page = isNaN(parsedPage) ? 1 : parsedPage || 1;
	const [rowStatus, setrowStatus] = useState(''); //status PUBLISHED DRAFT to pass in UPLOADOREDITMEDIA

	const { data, isLoading, totalRecords } = useGetAllMedia();

	const onRowClick = (e, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificMedia(row.id));
		setrowStatus(row.status);
		setEdit(true);
		setShowSlider(true);
	};

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
		>
			<Table
				onRowClick={onRowClick}
				columns={mediaColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Media Found'
			/>
			{/* <UploadOrEditMedia
                open={showSlider}
                isEdit={edit}
                handleClose={() => {
                    setShowSlider(false);
                }}
                title={edit ? 'Edit Media' : 'Upload Media'}
                heading1={edit ? 'Media Type' : 'Select Media Type'}
                buttonText={
                    edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
                }
                rowStatus={rowStatus}
                status={rowStatus}
            /> */}
			<MediaForm
				open={showSlider}
				isEdit={edit}
				handleClose={() => {
					setShowSlider(false);
				}}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default MediaLibrary;
