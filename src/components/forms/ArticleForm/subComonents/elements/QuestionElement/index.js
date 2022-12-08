import React from 'react';
import PropTypes from 'prop-types';

import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

import TabPanes from '../../../../../ui/TabPanes';
import ArticleQuestionForm from './ArticleQuestionForm';

const QuestionElement = ({ index, item }) => {
	const headings = ['Quiz', 'Poll'];
	const defaultSelectedTab = 0; //later will set according to edit status

	console.log(index, item, 'article question');

	// temp
	const isPublished = false;

	return (
		<>
			<DraggableLayoutWrapper>
				<DraggableCardLayout
					title={'Add Question'}
					key={index}
					index={index}
					item={item}
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
								<ArticleQuestionForm type={'quiz'} isPublished={isPublished} />
							</TabPanes.TabPanel>
							<TabPanes.TabPanel value={1}>
								<ArticleQuestionForm type={'poll'} isPublished={isPublished} />
							</TabPanes.TabPanel>
						</TabPanes>
					</div>
				</DraggableCardLayout>
			</DraggableLayoutWrapper>
		</>
	);
};

QuestionElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object
};

export default QuestionElement;
