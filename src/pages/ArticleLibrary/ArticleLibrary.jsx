import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ArticleBuilderForm from '../../components/forms/ArticleForm/ArticleBuilderForm';
import useGetAllArticlesQuery from '../../hooks/libraries/articles/useGetAllArticlesQuery';
import { getSpecificArticle } from '../../data/features/articleLibrary/articleLibrarySlice';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import { articleTableColumns } from '../../data/helpers/articleHelpers';
import ArticleTemplateModal from '../../components/ui/ArticleTemplateModal';
import TemplateCard from '../../components/forms/ArticleForm/subComonents/TemplateCard';
import ArticleTemplateForm from '../../components/forms/ArticleForm/ArticleTemplateForm';

const ArticleLibrary = () => {
	const dispatch = useDispatch();

	const { data, isLoading, totalRecords } = useGetAllArticlesQuery();

	// ARTICLE BUILDER FORM STATES
	const [showSlider, setShowSlider] = useState(false);
	const [edit, setEdit] = useState(false);
	const [rowStatus, setRowStatus] = useState('');

	// ARTICLE TEMPLATE STATES
	const [showTemplateModal, setShowTemplateModal] = useState(false);
	const [showTemplateSlider, setShowTemplateSlider] = useState(false);

	/**
	 * @type {string}
	 * @description The selectedOption state will contain either one of the three values,
	 * which are "", "article", and "template". If it is any empty string then it identifes
	 * that neither one of the option is selected.
	 */
	const [selectedOption, setSelectedOption] = useState('');

	const handleRowClick = (_, row) => {
		row.status === 'draft' && dispatch(getAllNewLabels());
		dispatch(getSpecificArticle(row.id));
		setEdit(true);
		setShowSlider(true);
		setRowStatus(row?.status);
		setSelectedOption('article');
	};

	const handleUploadArticleClick = useCallback(() => {
		setSelectedOption('article');
		setShowTemplateModal(true);
	}, []);

	const handleUploadTemplateClick = useCallback(() => {
		setSelectedOption('template');
		setShowTemplateModal(true);
	}, []);

	const handleNewArticleClick = useCallback(() => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowTemplateModal(false);
		setShowSlider(true);
	}, []);

	const handleTemplateClick = useCallback(() => {
		dispatch(getAllNewLabels());
		setEdit(false);
		setShowTemplateModal(false);
		setShowTemplateSlider(true);
	}, []);

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
			<ArticleTemplateModal
				title={
					selectedOption === 'article' ? 'UPLOAD ARTICLE' : 'TEMPLATE MANAGER'
				}
				open={showTemplateModal}
				onClose={() => setShowTemplateModal(false)}
			>
				<TemplateCard
					newArticleClick={handleNewArticleClick}
					handleTemplateClick={handleTemplateClick}
				/>
			</ArticleTemplateModal>
			<ArticleBuilderForm
				open={showSlider}
				handleClose={() => setShowSlider(false)}
				isEdit={edit}
				status={rowStatus}
				selectedOption={selectedOption}
			/>
			<ArticleTemplateForm
				open={showTemplateSlider}
				handleClose={() => setShowTemplateSlider(false)}
				isEdit={edit}
				status={rowStatus}
				selectedOption={selectedOption}
			/>
		</DashboardLayout>
	);
};

export default ArticleLibrary;
