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
	isEdit,
	status,
	index,
	item,
	required = false,
	handleRemoveElement,
	readOnly
}) => {
	const { setFieldValue, setFieldTouched } = useFormikContext();

	const isPublished = isEdit && status === 'published';
	const isItemCreated = !isEmpty(item.id);

	const [selectedTab, setSelectedTab] = useState(
		item.question_data.question_type === 'poll' ? 0 : 1
	);

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
		setFieldTouched(`elements.${index}`, false);
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
			disableActions={readOnly}
		>
			<TabPanes
				type='questions'
				headings={tabPanesHeadings}
				defaultValue={item.question_data.question_type === 'poll' ? 0 : 1}
				onClick={tabPanesOnClickHanlder}
				hideTabsHead={(isPublished && isItemCreated) || readOnly}
			>
				<TabPanes.TabPanel value={0}>
					<ArticleQuestionForm
						type={'poll'}
						index={index}
						item={item}
						isPublished={isPublished}
						required={required}
						readOnly={readOnly}
					/>
				</TabPanes.TabPanel>
				<TabPanes.TabPanel value={1}>
					<ArticleQuestionForm
						type={'quiz'}
						index={index}
						item={item}
						isPublished={isPublished}
						required={required}
						readOnly={readOnly}
					/>
				</TabPanes.TabPanel>
			</TabPanes>
		</DraggableCardLayout>
	);
};

QuestionElement.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	required: PropTypes.bool,
	handleRemoveElement: PropTypes.func,
	readOnly: PropTypes.bool
};

export default QuestionElement;
