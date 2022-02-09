import React , {useState} from 'react';
import { styled } from '@mui/material/styles';
import classes from './_uploadOrEditQuiz.module.scss';
import Button from '../../../components/button';
import Table from '../../../components/table';
// import { useStyles } from './quizStyles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { getDateTime } from '../../../utils';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: "56px",
	borderRadius: '8px',
	[`&.${linearProgressClasses.colorPrimary}`]: {
	  backgroundColor: theme.palette.grey[theme.palette.mode === '#404040' ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
	  borderRadius: '8px',
	  backgroundColor: theme.palette.mode === '#404040' ? 'red' : '#808080',
	},
  }));
 
export default function QuizResults() {
    // const muiClasses = useStyles();
	const [sortState, setSortState] = useState({ sortby: '', order_type: '' });

	const sortKeysMapping = {
		username: 'username',
		answers: 'postdate',
		date_time: 'enddate',
	};

    const sortRows = (order, col) => {
		if (order && col.dataField) {
			if (
				order.toUpperCase() != sortState.order_type ||
				sortKeysMapping[col.dataField] != sortState.sortby
			) {
				setSortState({
					sortby: sortKeysMapping[col.dataField],
					order_type: order.toUpperCase()
				});
			}
		}
		if (!order)
			return (
				<ArrowDropUpIcon
					className={classes.sortIcon}
					style={{
						left:
							col?.dataField === 'answers' ||
							col?.dataField === 'labels' ||
							col?.dataField === 'date_time' 
								? -7
								: -4
					}}
				/>
			);
		else if (order === 'asc')
			return (
				<ArrowDropUpIcon
					className={classes.sortIconSelected}
					style={{
						left:
							col?.dataField === 'answers' ||
							col?.dataField === 'username' ||
							col?.dataField === 'date_time' 
								? -7
								: -4
					}}
				/>
			);
		else if (order === 'desc')
			return (
				<ArrowDropDownIcon
					className={classes.sortIconSelected}
					style={{
						left:
							col?.dataField === 'answers' ||
							col?.dataField === 'username' ||
							col?.dataField === 'date_time'
								? -7
								: -4
					}}
				/>
			);
		return null;
	};

    const data = [
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
        {
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},

        {
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
		{
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
        {
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
        {
			username: 'loremipsum',
			answers: 'Barcelona FC',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
		{
			username: 'loremipsum',
			answers: 'Real Madrid',
			date_time: '2021-11-25T17:00:08.000Z',
			
		},
		
	];
   
    const columns = [
		{
			dataField: 'username',
			text: 'USERNAME',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			formatter: (content) => {
				return <div className={classes.rowData}>{content}</div>;
			}
		},
		{
			dataField: 'answers',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'ANSWER',
			formatter: (content) => {
				 return <div className={classes.rowData}>{content}</div>;
			},
			// headerStyle: () => {
			// 	return { paddingLeft: '20px' };
			// }
		},
		{
			dataField: 'date_time',
			sort: true,
			sortCaret: sortRows,
			sortFunc: () => {},
			text: 'DATE AND TIME',
			formatter: (content) => {
				return <div className={classes.rowData}>{getDateTime(content)}</div>;
			},
			headerStyle: () => {
				return { paddingLeft: '12px' };
			}
		},
		
	];

    const tableRowEvents = {
		onClick: (e, row) => {
			// if (!edit) {
			// dispatch(getSpecificPost(row.id));
			console.log(row)
	
			
			// }
		}
	};
   


  return <div>
       
              <div className={classes.QuizQuestion}>
             Who will win El Classico? 
             </div>
             <div className={classes.QuizDetailsProgressBars}>
				 <div className={classes.progressBars}>
				 <BorderLinearProgress variant="determinate" value={33} />
				 <div  className={classes.progressbarTextBox}>
				 <div >
					 <span className={classes.leftprogressbarText}>FC Barcelona</span>
					 <span className={classes.rightProgressText}>%30 | 123 Users</span>
				 </div>
				 </div>
				
				 </div>
			
			
             </div>
			 <div className={classes.QuizDetailsProgressBars}>
				 <div className={classes.progressBars}>
				 <BorderLinearProgress variant="determinate" value={70} />
				 <div  className={classes.progressbarTextBox}>
				 <div >
					 <span className={classes.leftprogressbarText}>Real Madrid</span>
					 <span className={classes.rightProgressText}>%70 | 1234 Users</span>
				 </div>
				 </div>
				
				 </div>
			
			
             </div>
             <div className={classes.QuizDetailstextUsers}>
				 <span>1.4 K Participants</span>
                 <span>Ends 24.01.2022 </span>
                 
             </div>
             <div className={classes.QuizDetailsHeading}>
             Participants
             </div>
             <div style={{width:"416px"}}  className={classes.QuizDetailstableContainer} >
				<Table style={{width:"416px"}}   rowEvents={tableRowEvents} columns={columns} data={data} />
			</div>
            <div style={{width:"416px", paddingBottom: "10%"}}>
            <Button
										disabled={false}
										button2={ true}
										onClick={() => {
											
												console.log('delete qquiz');
												
										}}
										text={'DELETE QUIZ'}
									/>
            </div>
  
  </div>;
}
