import React, { useState, useEffect, useMemo } from 'react';
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

	const defaultSelectedTab = useMemo(
		() => (item.question_data.question_type === 'poll' ? 0 : 1),
		[item]
	);

	const [selectedTab, setSelectedTab] = useState(defaultSelectedTab);

	const { setFieldValue } = useFormikContext();

	useEffect(() => {
		if (isEdit) {
			setQuestionTypeValue(item.question_data.question_type);
		}
	}, [isEdit, item]);

	/**
	 * This method is responsible for updating the question_type field in form and
	 * The selectedTab state in the component
	 * @param {string} value - Can either be "poll" or "quiz"
	 */
	const setQuestionTypeValue = (value) => {
		setFieldValue(
			`elements.${index}.question_data.question_type`,
			toLower(value)
		);
		setSelectedTab(toLower(value) === 'poll' ? 0 : 1);
	};

	/**
	 * This method is responsible for reseting the question_data values to default
	 * @param {string} value - Can either be "poll" or "quiz"
	 */
	const resetQuestionDataField = (value) => {
		const questionElement = articleSidebarElements.find(
			(item) => item.data.element_type === ARTICLE_ELEMENTS_TYPES.QUESTION
		);
		setFieldValue(`elements.${index}.question_data`, {
			...questionElement.data.question_data,
			question_type: value
		});
	};

	const tabPanesOnClickHanlder = (value) => {
		const formattedValue = toLower(value.split(' ')[1]);

		if (
			(formattedValue === 'poll' && selectedTab === 0) ||
			(formattedValue === 'quiz' && selectedTab === 1)
		) {
			return;
		}

		setQuestionTypeValue(formattedValue);
		resetQuestionDataField(formattedValue);
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
					defaultValue={defaultSelectedTab}
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
