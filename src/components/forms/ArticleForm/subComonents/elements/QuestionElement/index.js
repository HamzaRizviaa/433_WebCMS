import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { toLower, isEmpty } from 'lodash';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';
import TabPanes from '../../../../../ui/TabPanes';
import ArticleQuestionForm from './ArticleQuestionForm';

const tabPanesHeadings = ['Quiz', 'Poll'];

const QuestionElement = ({
	index,
	item,
	handleRemoveElement,
	isEdit,
	status
}) => {
	const isPublished = isEdit && status === 'published';
	const isItemCreated = !isEmpty(item.id);
	const [defaultSelectedTab, setDefaultSelectedTab] = useState(0);

	const { setFieldValue } = useFormikContext();

	useEffect(() => {
		if (isEdit) {
			setQuestionTypeValue(item.question_data.question_type);
			setDefaultSelectedTab(
				item.question_data.question_type === 'quiz' ? 0 : 1
			);
		}
	}, [item]);

	const setQuestionTypeValue = (value) => {
		setFieldValue(
			`elements.${index}.question_data.question_type`,
			toLower(value)
		);
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
					onClick={(value) => setQuestionTypeValue(value)}
					disabled={isPublished && isItemCreated}
				>
					<TabPanes.TabPanel value={0}>
						<ArticleQuestionForm
							type={'quiz'}
							index={index}
							item={item}
							isPublished={isPublished}
						/>
					</TabPanes.TabPanel>
					<TabPanes.TabPanel value={1}>
						<ArticleQuestionForm
							type={'poll'}
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
