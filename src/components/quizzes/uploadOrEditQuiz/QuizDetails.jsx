import React from 'react';
import classes from './_uploadOrEditQuiz.module.scss';
import Slider from '../../slider';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './quizStyles';
import EditQuiz from './EditQuiz';

export default function QuizDetails({ open, handleClose, title,  }) {
  const muiClasses = useStyles();
  return (<Slider
    open={open}
    handleClose={() => {
      handleClose();
    }}
    title={title}
  >	<div className={muiClasses.root}>
  <TabsUnstyled defaultValue={0}  className={muiClasses.tabRoot}>
           <TabsListUnstyled  className={muiClasses.tabMainDiv} >
               <TabUnstyled >Quiz Results</TabUnstyled>
               <TabUnstyled >Edit Quiz</TabUnstyled>
          </TabsListUnstyled>
          <TabPanelUnstyled value={0}>
  {/* table */}
  <QuizDetails/>
</TabPanelUnstyled>
          <TabPanelUnstyled value={1}> 
   {/* add edit quiz */}
   <EditQuiz/> 
</TabPanelUnstyled>  
        </TabsUnstyled>
</div><div className={classes.quizDetails}>
  <div className={classes.contentWrapper}>
    <div className={classes.QuizQuestion}>
    Who will win El Classico? 
    </div>
  </div>
</div>;
    </Slider>) 
};
QuizDetails.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired
};