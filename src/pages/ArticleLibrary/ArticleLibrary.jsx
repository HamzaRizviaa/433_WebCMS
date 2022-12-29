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
import ArticleTemplateForm from '../../components/forms/ArticleForm/ArticleTemplateForm';

const ArticleLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllArticlesQuery();

	// ARTICLE BUILDER FORM STATES
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

	const handleUploadTemplateClick = () => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowTemplateSlider(true);
	};

	return (
		<DashboardLayout
			title='Article'
			isLoading={isLoading}
			onButtonClick={handleUploadArticleClick}
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
			{/* <UploadOrEditArticle
				open={showSlider}
				isEdit={edit}
				handleClose={() => setShowSlider(false)}
				title={edit ? 'Edit Article' : 'Article Builder'}
				heading1={edit ? 'Media File' : 'Add Media File'}
				buttonText={
					edit && rowStatus === 'published' ? 'SAVE CHANGES' : 'PUBLISH'
				}
				status={rowStatus}
			/> */}
			<ArticleBuilderForm
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
