/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const TranslationCarousal = () => {
	const classes = useStyles();
	const [next, setNext] = useState(false);
	const [prev, setPrev] = useState(false);
	const [lang, setLang] = useState({
		id: 0,
		name: 'English', //language name
		prefix: 'ENG', // figma
		shortName: 'en' //api
	});
	const [language, setLanguage] = useState([
		{
			id: 0,
			name: 'Indonesia',
			prefix: 'IDN',
			shortName: 'ind'
		},
		{
			id: 1,
			name: 'Italian',
			prefix: 'ITA',
			shortName: 'it'
		},
		{
			id: 2,
			name: 'Portuguese',
			prefix: 'PRT',
			shortName: 'pt'
		},
		{
			id: 3,
			name: 'Portuguese (Brazilian)',
			prefix: 'BRA',
			shortName: 'pt-br'
		},

		{
			id: 4,
			name: 'Russian',
			prefix: 'RUS',
			shortName: 'ru'
		},
		{
			id: 5,
			name: 'Turkish',
			prefix: 'TUR',
			shortName: 'tr'
		},
		{
			id: 6,
			name: 'Spanish',
			prefix: 'ESP',
			shortName: 'es'
		},
		{
			id: 7,
			name: 'French',
			prefix: 'FRA',
			shortName: 'fr'
		},
		{
			id: 8,
			name: 'German',
			prefix: 'GER',
			shortName: 'DE'
		},
		{
			id: 9,
			name: 'DUTCH',
			prefix: 'NLD',
			shortName: 'nl'
		}
	]);

	const handleClick = (data) => {
		setLang({
			name: data.name,
			prefix: data.prefix,
			shortName: data.shortName
		});
	};

	return (
		<>
			<div className={classes.translationCarousal}>
				<Chip
					label='ENG'
					variant='outlined'
					sx={{
						border:
							lang?.shortName === 'en'
								? '1px solid yellow !important'
								: '1px solid grey !important',
						color:
							lang?.shortName === 'en' ? 'white !important' : 'grey !important'
					}}
					onClick={() =>
						handleClick({
							name: 'English',
							prefix: 'ENG',
							shortName: 'en'
						})
					}
				/>
				<Divider
					orientation='vertical'
					flexItem
					color={'grey'}
					sx={{ ml: '8px', mr: '6px' }}
				/>
				<div className={classes.allChips}>
					<NavigateBeforeIcon fontSize='large' onClick={() => setPrev(!prev)} />
					<div className={classes.carousalChips}>
						{language?.length > 0 &&
							language.map((data, index) => {
								return (
									<Chip
										sx={{
											border:
												lang?.shortName === data?.shortName
													? '1px solid yellow !important'
													: '1px solid grey !important',
											color:
												lang?.shortName === data?.shortName
													? 'white !important'
													: 'grey !important'
										}}
										key={index}
										label={data?.prefix}
										variant='outlined'
										onClick={() => handleClick(data)}
									/>
								);
							})}
					</div>
					<NavigateNextIcon fontSize='large' onClick={() => setNext(!next)} />
				</div>
			</div>
		</>
	);
};
export default TranslationCarousal;
