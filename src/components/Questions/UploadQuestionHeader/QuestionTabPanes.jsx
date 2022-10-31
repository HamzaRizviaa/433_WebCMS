import React from 'react';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from '../quizStyles';

const QuestionTabPanes = ({
	edit,
	setQuesType,
	resetSlides,
	type,
	status,
	setTabClickCount
}) => {
	const muiClasses = useStyles();

	return (
		<div className={muiClasses.root}>
			<TabsUnstyled
				value={type === 'quiz' ? 1 : 0}
				className={muiClasses.tabRoot}
			>
				<TabsListUnstyled className={muiClasses.tabMainDiv}>
					<TabUnstyled
						onClick={() => {
							if (type !== 'poll') setTabClickCount((prev) => prev + 1);
							setQuesType('poll');
							resetSlides('poll');
						}}
					>
						{edit && status !== 'draft' ? 'Result' : 'Poll'}
					</TabUnstyled>
					<TabUnstyled
						onClick={() => {
							if (type !== 'quiz') setTabClickCount((prev) => prev + 1);
							setQuesType('quiz');
							resetSlides('quiz');
						}}
					>
						{edit && status !== 'draft' ? `${'Edit ' + type}` : 'Quiz'}
					</TabUnstyled>
				</TabsListUnstyled>
				<TabPanelUnstyled value={0}></TabPanelUnstyled>
				<TabPanelUnstyled value={1}></TabPanelUnstyled>
			</TabsUnstyled>
		</div>
	);
};

QuestionTabPanes.propTypes = {
	setQuesType: PropTypes.func.isRequired,
	resetSlides: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired,

	type: PropTypes.string.isRequired,
	status: PropTypes.string,
	setTabClickCount: PropTypes.func.isRequired
};
export default QuestionTabPanes;
