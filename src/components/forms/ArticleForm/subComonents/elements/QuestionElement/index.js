import React from 'react';
import PropTypes from 'prop-types';

import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

import TabPanes from '../../../../../ui/TabPanes';
import ArticleQuestionForm from './ArticleQuestionForm';

const QuestionElement = ({ index, item, handleRemoveElement }) => {
	const headings = ['Quiz', 'Poll'];
	const defaultSelectedTab = 0; //later will set according to edit status

	return (
		<DraggableLayoutWrapper>
			<DraggableCardLayout
				title={'Add Question'}
				key={index}
				index={index}
				item={item}
				onDeleteIconClick={handleRemoveElement}
			>
				<div>
					<TabPanes
						headings={headings}
						// onClick={handleTabClick}
						type='questions'
						defaultValue={defaultSelectedTab}
						//hideTabsHead={isPublished}
					>
						<TabPanes.TabPanel value={0}>
							<ArticleQuestionForm type={'quiz'} index={index} item={item} />
						</TabPanes.TabPanel>
						<TabPanes.TabPanel value={1}>
							<ArticleQuestionForm type={'poll'} index={index} item={item} />
						</TabPanes.TabPanel>
					</TabPanes>
				</div>
			</DraggableCardLayout>
		</DraggableLayoutWrapper>
	);
};

QuestionElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	handleRemoveElement: PropTypes.func
};

export default QuestionElement;
