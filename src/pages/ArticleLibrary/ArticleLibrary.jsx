/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
// import UploadOrEditArticle from '../../components/articles/uploadOrEditArticle';
import ArticleForm from '../../components/forms/ArticleForm';
import useGetAllArticlesQuery from '../../hooks/libraries/articles/useGetAllArticlesQuery';
import { getSpecificArticle } from '../../data/features/articleLibrary/articleLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import { articleTableColumns } from '../../data/helpers/articleHelpers';
import CardListing from '../../components/ui/Card/CardListing';
import TemplateModal from '../../components/ui/TemplateModal';

const dummyData = [
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Matches of the week',
		last_edited: '21-12-2022, 12:05'
	},
	{
		username: 'Alexander jordaan',
		title: 'Template 2 but with longer name',
		last_edited: '21-12-2022, 12:05'
	}
];

const ArticleLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllArticlesQuery();

	const [openModal, setOpenModal] = useState(false);
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [rowStatus, setRowStatus] = useState('');

	const handleRowClick = (_, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificArticle(row.id));
		setEdit(true);
		setShowSlider(true);
		setRowStatus(row?.status);
	};

	const handleUploadArticleClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowSlider(true);
	};
	const handleUploadArticleTemplateClick = () => {
		setOpenModal(true);
	};

	const handleNewArticleClick = () => {
		setOpenModal(false);
		setShowSlider(true);
	};

	return (
		<DashboardLayout
			title='Article'
			isLoading={isLoading}
			onButtonClick={handleUploadArticleClick}
			onTemplateButtonClick={handleUploadArticleTemplateClick}
		>
			<Table
				onRowClick={handleRowClick}
				columns={articleTableColumns}
				data={data}
				totalRecords={totalRecords}
				isLoading={isLoading}
				noDataText='No Articles Found'
			/>

			<TemplateModal
				title={'UPLOAD ARTICLE'}
				open={openModal}
				onClose={() => setOpenModal(false)}
			>
				<CardListing
					emptyCardText={'Empty Article'}
					data={dummyData}
					emptyCardClick={handleNewArticleClick}
				/>
			</TemplateModal>

			<ArticleForm
				open={showSlider}
				handleClose={() => setShowSlider(false)}
				isEdit={edit}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default ArticleLibrary;
