import { AutocompleteProps } from '@material-ui/lab';
import { SelectFieldCustomProps } from '../../SelectField';

export type FormikLabelsSelectProps = AutocompleteProps<
	T,
	undefined,
	undefined,
	undefined
> &
	SelectFieldCustomProps<T>;

/**
 * `FormikLabelsSelect` component is specifically made for labels select field. This component is not extendable as
 * it is tightly coupled with labels API.
 */
export default function FormikLabelsSelect(
	props: FormikLabelsSelectProps
): JSX.Element;
