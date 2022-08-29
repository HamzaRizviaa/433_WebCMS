import React from 'react';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from '../quizStyles';
const QuestionTabPanes = ({
	location,
	edit,
	setQuesType,
	resetSlides,
	type
}) => {
	const muiClasses = useStyles();
	console.log(location, edit, 'abc');

	return (
		<div className={muiClasses.root}>
			<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
				<TabsListUnstyled className={muiClasses.tabMainDiv}>
					<TabUnstyled
						onClick={() => {
							setQuesType('poll');
							resetSlides('poll');
						}}
					>
						{edit ? 'Result' : 'Poll'}
					</TabUnstyled>
					<TabUnstyled
						onClick={() => {
							setQuesType('quiz');
							resetSlides('quiz');
						}}
					>
						{edit ? `${'Edit ' + type}` : 'Quiz'}
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
	location: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default QuestionTabPanes;
