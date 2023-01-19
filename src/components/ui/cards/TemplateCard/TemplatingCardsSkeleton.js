import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { useStyles } from './index.style';

const TemplatingCardsSkeleton = () => {
	const classes = useStyles();

	return (
		<Grid container>
			<Grid item md={4}>
				<div className={classes.skeletonCards}>
					<Skeleton variant='rect' animation='wave' height={180} />
				</div>
			</Grid>
			<Grid item md={4}>
				<div className={classes.skeletonCards}>
					<Skeleton variant='rect' animation='wave' height={180} />
				</div>
			</Grid>
			<Grid item md={4}>
				<div className={classes.skeletonCards}>
					<Skeleton variant='rect' animation='wave' height={180} />
				</div>
			</Grid>
		</Grid>
	);
};

export default TemplatingCardsSkeleton;
