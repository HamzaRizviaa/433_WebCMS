import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, truncate } from 'lodash';
import {
	selectAllArticleTemplate,
	selectAllArticleTemplateStatus,
	selectSpecificArticleTemplate,
	selectSpecificArticleStatus
} from '../../../../data/selectors';
import {
	getAllArticleTemplatesThunk,
	getSpecificArticleTemplateThunk
} from '../../../../data/features/articleLibrary/articleLibrarySlice';
import TemplateModal from '../TemplateModal';
import TemplateCardListing from '../../cards/TemplateCard/TemplateCardListing';
import PreviewerModal from '../PreviewerModal';
import ArticlePreviewerForm from '../../../forms/ArticleForm/ArticlePreviewerForm';

const ArticleTemplatesModal = ({
	isEdit,
	status,
	selectedOption,
	showTemplateModal,
	setShowTemplateModal,
	onTemplateCardClick
}) => {
	const dispatch = useDispatch();

	// SELECTORS
	const templateListingData = useSelector(selectAllArticleTemplate);
	const templateListingDataStatus = useSelector(selectAllArticleTemplateStatus);
	const specificArticleTemplate = useSelector(selectSpecificArticleTemplate);
	const specificArticleStatus = useSelector(selectSpecificArticleStatus);

	// STATES
	const [selectedTemplateId, setSelectedTemplateId] = useState('');
	const [showPreviewrModal, setShowPreviewrModal] = useState(false);

	useEffect(() => {
		dispatch(getAllArticleTemplatesThunk());
	}, []);

	const handleTemplatePreviewClick = useCallback((template) => {
		setSelectedTemplateId(template.id);
		setShowPreviewrModal(true);
		dispatch(getSpecificArticleTemplateThunk(template.id));
	}, []);

	const onPreviewerCloseHandler = useCallback(() => {
		setSelectedTemplateId('');
		setShowPreviewrModal(false);
	}, []);

	return (
		<Fragment>
			<TemplateModal
				title={
					selectedOption === 'article' ? 'UPLOAD ARTICLE' : 'TEMPLATE MANAGER'
				}
				open={showTemplateModal}
				onClose={() => setShowTemplateModal(false)}
			>
				<TemplateCardListing
					loading={templateListingDataStatus === 'loading'}
					emptyCardText={
						selectedOption === 'article' ? 'Empty Article' : 'Empty Template'
					}
					data={templateListingData}
					selectedTemplateId={selectedTemplateId}
					onCardClick={onTemplateCardClick}
					onPreviewClick={handleTemplatePreviewClick}
				/>
			</TemplateModal>
			<PreviewerModal
				open={showPreviewrModal}
				onClose={onPreviewerCloseHandler}
				title={
					!isEmpty(specificArticleTemplate)
						? truncate(specificArticleTemplate.template_name, { length: 30 })
						: ''
				}
				loading={specificArticleStatus === 'loading'}
			>
				{!isEmpty(specificArticleTemplate) && (
					<ArticlePreviewerForm
						isEdit={isEdit}
						status={status}
						selectedOption={'template'}
						data={specificArticleTemplate}
					/>
				)}
			</PreviewerModal>
		</Fragment>
	);
};

ArticleTemplatesModal.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired,
	showTemplateModal: PropTypes.bool.isRequired,
	setShowTemplateModal: PropTypes.func.isRequired,
	onTemplateCardClick: PropTypes.func.isRequired
};

export default ArticleTemplatesModal;
