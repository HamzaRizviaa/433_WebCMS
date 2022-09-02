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
	type,
	status
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
						{edit && status !== 'draft' ? 'Result' : 'Poll'}
					</TabUnstyled>
					<TabUnstyled
						onClick={() => {
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
	location: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	status: PropTypes.string
};
export default QuestionTabPanes;
