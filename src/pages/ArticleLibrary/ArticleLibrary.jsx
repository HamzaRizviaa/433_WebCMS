/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
// import UploadOrEditArticle from '../../components/articles/uploadOrEditArticle';
import ArticleBuilderForm from '../../components/forms/ArticleForm/ArticleBuilderForm';
import useGetAllArticlesQuery from '../../hooks/libraries/articles/useGetAllArticlesQuery';
import { getSpecificArticle } from '../../data/features/articleLibrary/articleLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import { articleTableColumns } from '../../data/helpers/articleHelpers';
<<<<<<< HEAD
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
=======
import ArticleTemplateModal from '../../components/ui/ArticleTemplateModal';
import { SettingsPowerRounded } from '@material-ui/icons';
import TemplateCard from '../../components/forms/ArticleForm/subComonents/TemplateCard';
import ArticleTemplateForm from '../../components/forms/ArticleForm/ArticleTemplateForm';
>>>>>>> 19f055ee877a446b0e8426f53a6317438ea23824

const ArticleLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllArticlesQuery();

<<<<<<< HEAD
	const [openModal, setOpenModal] = useState(false);
=======
	// ARTICLE BUILDER FORM STATES
>>>>>>> 19f055ee877a446b0e8426f53a6317438ea23824
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [rowStatus, setRowStatus] = useState('');

	// ARTICLE TEMPLATE FORM STATES
	const [showTemplateSlider, setShowTemplateSlider] = useState(false);

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
	// const handleUploadArticleTemplateClick = () => {
	// 	setOpenModal(true);
	// };

	const handleNewArticleClick = () => {
		setOpenModal(false);
		setShowSlider(true);
	};

	const handleTemplateClick = () => {
		setOpenModal(false);
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowTemplateSlider(true);
	};

	const handleUploadTemplateClick = () => {
		setOpenModal(true);
		// dispatch(getAllNewLabels());
		// setEdit(false);
		// setShowTemplateSlider(true);
	};

	return (
		<DashboardLayout
			title='Article'
			isLoading={isLoading}
			onButtonClick={handleUploadArticleClick}
			// onTemplateButtonClick={handleUploadArticleTemplateClick}
			secondaryButtonText={'Templates'}
			secondaryButtonClick={handleUploadTemplateClick}
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
<<<<<<< HEAD
				<CardListing
					emptyCardText={'Empty Article'}
					data={dummyData}
					emptyCardClick={handleNewArticleClick}
				/>
			</TemplateModal>

			<ArticleForm
=======
				<TemplateCard
					newArticleClick={handleNewArticleClick}
					handleTemplateClick={handleTemplateClick}
				/>
			</ArticleTemplateModal>
			<ArticleBuilderForm
>>>>>>> 19f055ee877a446b0e8426f53a6317438ea23824
				open={showSlider}
				handleClose={() => setShowSlider(false)}
				isEdit={edit}
				status={rowStatus}
			/>
			<ArticleTemplateForm
				open={showTemplateSlider}
				handleClose={() => setShowTemplateSlider(false)}
				isEdit={edit}
				status={rowStatus}
			/>
		</DashboardLayout>
	);
};

export default ArticleLibrary;
