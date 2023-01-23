import { useFormikContext } from 'formik';
import dayjs from 'dayjs';

function useSchedulerHandlers({ onSubmitHandler, closeSchedulerModal }) {
	const formikContext = useFormikContext();

	const { values, submitForm, setFieldValue } = formikContext;

	const handleScheduleConfirm = (values) => {
		closeSchedulerModal();

		const { date, hour, min } = values.startStamp;

		const selectedDate = dayjs(date).format('YYYY-MM-DD');
		const selectedTime = `${hour}:${min.length === 1 ? '0' : ''}${min}`;
		const selectedDateTime = `${selectedDate}T${selectedTime}`;

		setFieldValue('schedule_date', new Date(selectedDateTime).toISOString());
		setFieldValue('save_draft', true);
		setFieldValue('is_scheduled', true);
		submitForm();
	};

	const handleRemoveSchedule = () => {
		setFieldValue('is_scheduled', false);
		setFieldValue('schedule_date', null);
		setFieldValue('save_draft', true);
		submitForm();
	};

	const handleDraftClick = () => {
		setFieldValue('save_draft', true);
		onSubmitHandler(values, formikContext);
	};

	const handlePublishClick = () => {
		setFieldValue('save_draft', false);
		setFieldValue('is_scheduled', false);
		setFieldValue('schedule_date', null);
	};

	const handleSaveChangesClick = () => {
		setFieldValue('save_draft', true);
	};

	return {
		handleDraftClick,
		handlePublishClick,
		handleRemoveSchedule,
		handleSaveChangesClick,
		handleScheduleConfirm
	};
}

export default useSchedulerHandlers;
