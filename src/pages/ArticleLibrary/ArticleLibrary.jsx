import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Table from '../../components/ui/Table';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ArticleBuilderForm from '../../components/forms/ArticleForm/ArticleBuilderForm';
import useGetAllArticlesQuery from '../../hooks/libraries/articles/useGetAllArticlesQuery';
import {
	getSpecificArticle,
	getSpecificArticleTemplateThunk,
	getAllArticleTemplatesThunk
} from '../../data/features/articleLibrary/articleLibrarySlice';
import {
	selectAllArticleTemplate,
	selectAllArticleTemplateStatus
} from '../../data/selectors';
import { getAllNewLabels } from '../../data/features/postsLibrary/postsLibrarySlice';
import { articleTableColumns } from '../../data/helpers/articleHelpers/index';
import ArticleTemplateModal from '../../components/ui/TemplateModal';
import ArticleTemplateForm from '../../components/forms/ArticleForm/ArticleTemplateForm';
import TemplateCardListing from '../../components/ui/cards/TemplateCard/TemplateCardListing';
import TemplatingCardsSkeleton from '../../components/ui/cards/TemplateCard/TemplatingCardsSkeleton';

const ArticleLibrary = () => {
	const dispatch = useDispatch();
	const templateListingData = useSelector(selectAllArticleTemplate);
	const templateListingDataStatus = useSelector(selectAllArticleTemplateStatus);
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

	useEffect(() => {
		dispatch(getAllArticleTemplatesThunk());
	}, []);

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
		setEdit(false);
		setRowStatus('');
		setShowTemplateModal(true);
	}, []);

	const handleUploadTemplateClick = useCallback(() => {
		setSelectedOption('template');
		setEdit(false);
		setRowStatus('');
		setShowTemplateModal(true);
	}, []);

	const handleTemplateCardClick = useCallback(
		(data) => {
			if (!isEmpty(data)) {
				dispatch(getSpecificArticleTemplateThunk(data.id));
			}

			dispatch(getAllNewLabels());
			setShowTemplateModal(false);
			setEdit(selectedOption === 'template' && !isEmpty(data) ? true : false);

			selectedOption === 'article'
				? setShowSlider(true)
				: setShowTemplateSlider(true);
		},
		[selectedOption]
	);

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
				{templateListingDataStatus === 'loading' ? (
					<TemplatingCardsSkeleton />
				) : (
					<TemplateCardListing
						emptyCardText={
							selectedOption === 'article' ? 'Empty Article' : 'Empty Template'
						}
						data={templateListingData}
						onCardClick={handleTemplateCardClick}
					/>
				)}
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
