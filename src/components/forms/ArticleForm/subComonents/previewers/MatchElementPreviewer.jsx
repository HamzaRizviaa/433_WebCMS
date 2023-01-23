import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Button from '../../../../ui/Button';
import { useStyles } from './elementPreviewers.styles';
import { matchElementDataFormatter } from '../../../../../data/helpers/articleHelpers/index';

const MatchElementPreviewer = ({ item }) => {
	// formatted data for match element
	const data = matchElementDataFormatter(item);

	/// classes and dynamic stylings
	const classes = useStyles({
		team1Color: data?.Team_1?.Team_Color, //|| 'white',
		team2Color: data?.Team_2?.Team_Color //|| 'white'
	});

	return (
		<Box className={classes.MatchContainer}>
			<Box py={2} mb={2} className={classes.matchDiv}>
				<Box className={classes.matchBox}>
					<Box className={classes.teamBox}>
						<img src={data.Team_1.Logo} className={classes.teamLogo} />
						<div>{data?.Team_1?.Name}</div>
					</Box>
					<Box className={classes.matchDetails}>
						<div>{data?.Day}</div>
						<div className={classes.time}>{data?.Time}</div>
					</Box>
					<Box className={classes.teamBox}>
						<img src={data.Team_2.Logo} className={classes.teamLogo} />
						<div>{data?.Team_2?.Name}</div>
					</Box>
				</Box>
			</Box>
			<Button
				className={classes.matchButton}
				onClick={() => {}}
				fullWidth
				size='large'
			>
				FOLLOW MATCH
			</Button>
		</Box>
	);
};

export default MatchElementPreviewer;

MatchElementPreviewer.propTypes = {
	item: PropTypes.object.isRequired
};
