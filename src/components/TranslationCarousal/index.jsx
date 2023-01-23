import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { useStyles } from './index.style';

const TranslationCarousal = ({ lang, setLang }) => {
	const [slide, setSlide] = useState(0);

	const languages = [
		{
			id: 1,
			name: 'German',
			prefix: 'GER',
			shortName: 'de'
		},
		{
			id: 2,
			name: 'Spanish',
			prefix: 'ESP',
			shortName: 'es'
		},
		{
			id: 3,
			name: 'French',
			prefix: 'FRA',
			shortName: 'fr'
		},
		{
			id: 4,
			name: 'Italian',
			prefix: 'ITA',
			shortName: 'it'
		},
		{
			id: 5,
			name: 'Dutch',
			prefix: 'NLD',
			shortName: 'nl'
		},
		{
			id: 6,
			name: 'Indonesia',
			prefix: 'IDN',
			shortName: 'ind'
		},
		{
			id: 7,
			name: 'Portuguese',
			prefix: 'PRT',
			shortName: 'pt'
		},
		{
			id: 8,
			name: 'Portuguese (Brazilian)',
			prefix: 'BRA',
			shortName: 'pt_br'
		},
		{
			id: 9,
			name: 'Russian',
			prefix: 'RUS',
			shortName: 'ru'
		},
		{
			id: 10,
			name: 'Turkish',
			prefix: 'TUR',
			shortName: 'tr'
		}
	];

	const classes = useStyles({ slide, isEnglish: lang?.shortName === 'en' });

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
					className={classes.langChip}
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
					className={classes.divider}
				/>
				<div className={classes.allChips}>
					<NavigateBeforeIcon
						fontSize='large'
						onClick={() =>
							setSlide((prev) => {
								return slide < 0 && prev + 55;
							})
						}
					/>
					<div className={classes.carousalChips}>
						{languages?.length > 0 &&
							languages.map((data, index) => {
								return (
									<Chip
										key={index}
										label={data?.prefix}
										variant='outlined'
										onClick={() => handleClick(data)}
										className={
											lang?.shortName === data?.shortName
												? classes.activeChip
												: classes.singleChip
										}
									/>
								);
							})}
					</div>
					<NavigateNextIcon
						fontSize='large'
						onClick={() =>
							setSlide((prev) => {
								if (slide < -250) {
									return 0;
								} else {
									return prev + -55;
								}
								// return slide > -250 && prev + -55;
							})
						}
					/>
				</div>
			</div>
		</>
	);
};

TranslationCarousal.propTypes = {
	lang: PropTypes.object.isRequired,
	setLang: PropTypes.func.isRequired
};

export default TranslationCarousal;
