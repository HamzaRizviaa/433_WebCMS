import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './subComponents.styles';
import PropTypes from 'prop-types';
import ImagePreview from '../../../ArticleBuilder/PreviewArticles/imagePreview';
// import InstagramPost from '../../../ArticleBuilder/PreviewArticles/InstagramPost';
import QuestionPoll from '../../../ArticleBuilder/PreviewArticles/QuestionPoll';
// import TextPreview from '../../../ArticleBuilder/PreviewArticles/textPreview';
// import TwitterPost from '../../../ArticleBuilder/PreviewArticles/TwitterPost';
import PreviewWrapper from '../../../ArticleBuilder/PreviewWrapper';
import { ElementTypes } from './ElementTypes';
import MatchElementPreviewer from './previewers/MatchElementPreviewer';
import SocialPostElementPreviewer from './previewers/SocialPostElementPreviewr';
import TextElementPreviewer from './previewers/TextElementPreviewer';
const ArticlePreviewSidebar = ({ data, form, isEdit }) => {
	const classes = useStyles();

	const renderElements = (item, index, isEdit) => {
		const { element_type: type } = item;
		switch (type) {
			case ElementTypes.MEDIA:
				return (
					<ImagePreview style={{ width: '100%' }} data={item} isEdit={isEdit} />
				);
			case ElementTypes.TEXT:
				return <TextElementPreviewer data={item} style={{ width: '100%' }} />;
			case ElementTypes.TWITTER:
				return (
					<SocialPostElementPreviewer
						data={item}
						itemIndex={index}
						style={{ width: '100%' }}
					/>
				);
			case ElementTypes.IG:
				return (
					<SocialPostElementPreviewer
						data={item}
						itemIndex={index}
						style={{ width: '100%' }}
					/>
				);
			case ElementTypes.QUESTION:
				return (
					<QuestionPoll
						data={item}
						itemIndex={index}
						style={{ width: '100%' }}
					/>
				);
			case ElementTypes.MATCH:
				return (
					<MatchElementPreviewer
						item={item}
						itemIndex={index}
						style={{ width: '100%' }}
					/>
				);
			default:
				return null;
		}
	};
	return (
		<Box px={2} className={classes.gridDivSmall}>
			<Box mb={3.5} className={classes.mainTitleDescription}>
				<h2>Preview</h2>
				<p>Review the result here before publishing</p>
			</Box>

			<PreviewWrapper form={form}>
				{data.map((item, index) => {
					return (
						<div key={index} style={{ padding: '5px' }}>
							{renderElements(item, index, isEdit)}
						</div>
					);
				})}
			</PreviewWrapper>
		</Box>
	);
};

export default ArticlePreviewSidebar;

ArticlePreviewSidebar.propTypes = {
	data: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	isEdit: PropTypes.bool.isRequired
};
