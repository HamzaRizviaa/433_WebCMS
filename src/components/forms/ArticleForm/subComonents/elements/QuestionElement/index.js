import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { toLower, isEmpty } from 'lodash';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';
import TabPanes from '../../../../../ui/TabPanes';
import ArticleQuestionForm from './ArticleQuestionForm';
import {
	articleSidebarElements,
	ARTICLE_ELEMENTS_TYPES
} from '../../../../../../data/helpers';

const tabPanesHeadings = ['Add Poll', 'Add Quiz'];

const QuestionElement = ({
	index,
	item,
	handleRemoveElement,
	isEdit,
	status
}) => {
	const isPublished = isEdit && status === 'published';
	const isItemCreated = !isEmpty(item.id);
	const [selectedTab, setSelectedTab] = useState(0);

	const { setFieldValue } = useFormikContext();

	useEffect(() => {
		if (isEdit) {
			setQuestionTypeValue(item.question_data.question_type);
		}
	}, [isEdit, item]);

	const setQuestionTypeValue = (value) => {
		setFieldValue(
			`elements.${index}.question_data.question_type`,
			toLower(value)
		);
		setSelectedTab(toLower(value) === 'poll' ? 0 : 1);
	};

	const resetQuestionDataField = () => {
		const questionElement = articleSidebarElements.find(
			(item) => item.data.element_type === ARTICLE_ELEMENTS_TYPES.QUESTION
		);
		setFieldValue(
			`elements.${index}.question_data`,
			questionElement.data.question_data
		);
	};

	const tabPanesOnClickHanlder = (value) => {
		if (
			(toLower(value) === 'poll' && selectedTab === 0) ||
			(toLower(value) === 'quiz' && selectedTab === 1)
		)
			return;

		setQuestionTypeValue(value);
		resetQuestionDataField();
	};

	return (
		<DraggableCardLayout
			title={'Add Question'}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleRemoveElement}
		>
			<div>
				<TabPanes
					type='questions'
					headings={tabPanesHeadings}
					defaultValue={selectedTab}
					value={selectedTab}
					onClick={tabPanesOnClickHanlder}
					disabled={isPublished && isItemCreated}
				>
					<TabPanes.TabPanel value={0}>
						<ArticleQuestionForm
							type={'poll'}
							index={index}
							item={item}
							isPublished={isPublished}
						/>
					</TabPanes.TabPanel>
					<TabPanes.TabPanel value={1}>
						<ArticleQuestionForm
							type={'quiz'}
							index={index}
							item={item}
							isPublished={isPublished}
						/>
					</TabPanes.TabPanel>
				</TabPanes>
			</div>
		</DraggableCardLayout>
	);
};

QuestionElement.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	handleRemoveElement: PropTypes.func,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default QuestionElement;
