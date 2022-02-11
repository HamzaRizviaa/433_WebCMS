import React from 'react';

import Slider from '../../slider';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './quizStyles';
import EditQuiz from './EditQuiz';
import QuizResults from './QuizResults';
export default function QuizDetails({ open, handleClose, title,  }) {
  const muiClasses = useStyles();
  return (<Slider
    open={open}
    handleClose={() => {
      handleClose();
    }}
    title={title}
  >	
  <div className={muiClasses.root}>
         <TabsUnstyled defaultValue={0}  className={muiClasses.tabRoot}>
           <TabsListUnstyled  className={muiClasses.tabMainDiv} >
               <TabUnstyled >Quiz Results</TabUnstyled>
               <TabUnstyled >Edit Quiz</TabUnstyled>
           </TabsListUnstyled>
          <TabPanelUnstyled value={0}>
               {/* table */}
               <QuizResults />
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}> 
               {/* add edit quiz */}
               <EditQuiz/> 
            </TabPanelUnstyled>  
        </TabsUnstyled>
     </div>
 </Slider>) 
};
QuizDetails.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired
};