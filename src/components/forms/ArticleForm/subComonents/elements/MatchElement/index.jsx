import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import FormikSelect from '../../../../../ui/inputs/formik/FormikSelect';
import { getTeamOptions, getMatchName } from '../../../../../../data/utils';
import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';

const MatchElement = ({
	isEdit,
	index,
	item,
	initialData,
	data,
	isPublished,
	handleRemoveElement
}) => {
	const [leagues, setLeagues] = useState([]);
	const [teams, setTeams] = useState([]);
	const [matches, setMatches] = useState([]);

	const { setFieldValue } = useFormikContext();

	useEffect(() => {
		if (isPublished) {
			setLeagues([
				{ name: initialData?.league_name, id: initialData?.league_name }
			]);
			return;
		}
		data && setLeagues(data);

		if (isEdit && data) {
			const teams = data.find(
				(value) => value.name === item.league_name
			)?.teams;
			const matches = teams.find(
				(value) => value.name === item.team_name
			)?.matches;
			const mappedMatches = matches?.map((match) => ({
				...match,
				name: getMatchName(match.startdate, match.name)
			}));

			setTeams(teams || []);
			setMatches(mappedMatches || []);
		}
	}, [data]);

	const resetTeamValueInFormik = () => {
		setFieldValue(`elements.${index}.team_name`, '');
	};

	const resetMatchValueInFormik = () => {
		setFieldValue(`elements.${index}.match_title`, '');
		setFieldValue(`elements.${index}.match_id`, '');
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
		setMatches(mappedMatches);
		resetMatchValueInFormik();
	};

	const handleMatchChange = (val) => {
		const { _id } = matches.find((value) => value.name === val);
		setFieldValue(`elements.${index}.match_id`, _id);
	};

	return (
		<DraggableLayoutWrapper>
			<DraggableCardLayout
				title={`Add Match`}
				key={index}
				index={index}
				item={item}
				onDeleteIconClick={handleRemoveElement}
			>
				<FormikSelect
					name={`elements.${index}.league_name`}
					placeholder='SELECT LEAGUE'
					options={leagues}
					mapOptions={{ labelKey: 'name', valueKey: 'name' }}
					disabled={isPublished}
					onChange={handleLeagueChange}
				/>
				<FormikSelect
					name={`elements.${index}.team_name`}
					placeholder='SELECT TEAM'
					options={teams}
					mapOptions={{ labelKey: 'name', valueKey: 'name' }}
					disabled={isPublished || teams?.length === 0}
					onChange={handleTeamChange}
				/>
				<FormikSelect
					name={`elements.${index}.match_title`}
					placeholder='SELECT MATCH'
					options={matches}
					mapOptions={{ labelKey: 'name', valueKey: 'name' }}
					disabled={isPublished || matches?.length === 0}
					onChange={handleMatchChange}
				/>
			</DraggableCardLayout>
		</DraggableLayoutWrapper>
	);
};

MatchElement.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	item: PropTypes.object,
	initialData: PropTypes.object,
	data: PropTypes.array,
	isPublished: PropTypes.bool,
	handleRemoveElement: PropTypes.func
};

export default MatchElement;
