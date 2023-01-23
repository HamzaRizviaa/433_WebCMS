import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { isEmpty, compact } from 'lodash';
import { useElementsStyles } from '../elements.styles';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';
import { getTeamOptions, getMatchName } from '../../../../../../data/utils';
import { ARTICLE_ELEMENTS_TYPES } from '../../../../../../data/helpers';

const MatchElement = ({
	isEdit,
	index,
	item,
	data,
	isPublished,
	required = false,
	handleRemoveElement,
	readOnly
}) => {
	const classes = useElementsStyles();
	const [leagues, setLeagues] = useState([]);
	const [teams, setTeams] = useState([]);
	const [matches, setMatches] = useState([]);

	const isItemCreated = !isEmpty(item.id);

	const { values, setFieldValue } = useFormikContext();

	const removeAddedMatches = (matches) => {
		const addedMatchesIds = compact(
			values.elements.map((elem) =>
				elem.element_type === ARTICLE_ELEMENTS_TYPES.MATCH
					? elem.match_id
					: undefined
			)
		);

		if (addedMatchesIds.length === 0) {
			return matches;
		}

		const selectedMatch = matches.find((m) => m._id === item.match_id);
		const filteredMatches = matches.filter((match) => {
			const foundedMatch = addedMatchesIds.find(
				(matchId) => matchId === match._id
			);
			return foundedMatch ? false : true;
		});

		return !isEmpty(selectedMatch)
			? [selectedMatch, ...filteredMatches]
			: filteredMatches;
	};

	useEffect(() => {
		data && setLeagues(data);

		if ((isEdit && data) || (values.template_name && data)) {
			const teams = data.find(
				(value) => value.name === item.league_name
			)?.teams;
			const matches = teams
				? teams.find((value) => value.name === item.team_name)?.matches
				: [];
			const mappedMatches = matches?.map((match) => ({
				...match,
				name: getMatchName(match.startdate, match.name)
			}));

			setTeams(teams || []);
			setMatches(removeAddedMatches(mappedMatches || []));
		}
	}, [data]);

	const resetTeamValueInFormik = () => {
		setFieldValue(`elements.${index}.team_name`, '');
	};

	const resetMatchValueInFormik = () => {
		setFieldValue(`elements.${index}.match_title`, '');
		setFieldValue(`elements.${index}.match_id`, '');
		setFieldValue(`elements.${index}.match`, {});
	};

	const handleLeagueChange = (val) => {
		const leagueTeams = getTeamOptions(leagues, val);
		setTeams(leagueTeams);
		setMatches([]);
		resetTeamValueInFormik();
		resetMatchValueInFormik();
	};

	const handleTeamChange = (val) => {
		const teamMatches = teams.find((value) => value.name === val)?.matches;
		const mappedMatches = teamMatches?.map((match) => ({
			...match,
			name: getMatchName(match.startdate, match.name)
		}));
		setMatches(removeAddedMatches(mappedMatches));
		resetMatchValueInFormik();
	};

	const handleMatchChange = (val) => {
		const match = matches.find((value) => value.name === val);
		setFieldValue(`elements.${index}.match_id`, match?._id || '');
		setFieldValue(`elements.${index}.match`, match);
	};

	return (
		<DraggableCardLayout
			title={`Add Match`}
			key={index}
			index={index}
			item={item}
			onDeleteIconClick={handleRemoveElement}
			disableActions={readOnly}
		>
			<div className={classes.matchFieldContainer}>
				<FormikSelect
					name={`elements.${index}.league_name`}
					placeholder='Please select'
					label='SELECT LEAGUE'
					options={leagues}
					mapOptions={{ labelKey: 'name', valueKey: 'name' }}
					disabled={isPublished && isItemCreated}
					onChange={handleLeagueChange}
					required={required}
					readOnly={readOnly}
				/>
			</div>
			<div className={classes.matchFieldContainer}>
				<FormikSelect
					name={`elements.${index}.team_name`}
					placeholder='Please select'
					label='SELECT TEAM'
					options={teams}
					mapOptions={{ labelKey: 'name', valueKey: 'name' }}
					disabled={(isPublished && isItemCreated) || isEmpty(item.league_name)}
					onChange={handleTeamChange}
					required={required}
					readOnly={readOnly}
				/>
			</div>
			<div className={classes.matchFieldContainer}>
				<FormikSelect
					name={`elements.${index}.match_title`}
					placeholder='Please select'
					label='SELECT MATCH'
					options={matches}
					mapOptions={{ labelKey: 'name', valueKey: 'name' }}
					disabled={(isPublished && isItemCreated) || isEmpty(item.team_name)}
					onChange={handleMatchChange}
					required={required}
					readOnly={readOnly}
				/>
			</div>
		</DraggableCardLayout>
	);
};

MatchElement.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	isPublished: PropTypes.bool,
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	data: PropTypes.array,
	required: PropTypes.bool,
	handleRemoveElement: PropTypes.func,
	readOnly: PropTypes.bool
};

export default MatchElement;
