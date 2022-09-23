import { AutocompleteProps } from '@material-ui/lab';
import { SelectProps } from '@material-ui/core';

export type SelectOption = {
	value: string;
	label: string;
	[Key: string]: string | number | undefined | null;
};

type SelectFieldCustomProps<T> = {
	name: string;
	value: any;
	options: T[];
	label?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
};

type ModifiedSelectProps = Omit<
	SelectProps,
	| 'variant'
	| 'label'
	| 'onChange'
	| 'disableUnderline'
	| 'fullWidth'
	| 'displayEmpty'
	| 'IconComponent'
	| 'MenuProps'
	| 'inputProps'
	| 'renderValue'
>;

export type SelectFieldProps<T> =
	| (AutocompleteProps<T, undefined, undefined, undefined> &
			SelectFieldCustomProps<T> & {
				searchable: true;
				onSearchTextChange?: (value: string) => void;
				onClearText?: () => void;
				onChange?: (value: T, name: string) => void;
			})
	| (ModifiedSelectProps &
			SelectFieldCustomProps<T> & {
				searchable: false;
				onChange?: (value: string | number, name: string) => void;
			});

/**
 * The `SelectField` component is a wrapper over Mateiral UI's `Select` and `Autocomplete` components. It uses an
 * special prop `searchable` which is used to conditionally render these components. If its value is `true` then
 * Autocomplete component will render otherwise `Select` component will render. You can pass most of the `props` which
 * you can pass in `Select` and `Autocomplete` but not all as some of the `props` are used internally in this
 * component. There are also some extra `props` which are made to make the use of this component easy. You can find all
 * of the `props` definition in declaration file of this component.
 *
 * #### Following are some important extra props which you will need in this project.
 *
 * ```
 * searchable: boolean;
 * options: {value: string label: string; [Key: string]: string | number | undefined | null; }
 * onSearchTextChange?: (value: string) => void;
 * onClearText?: () => void;
 * ```
 * ### searchable:
 * Very important prop as it will be responsible for rendering `Select` or `Autocomplete` component based on its value.
 *
 * ### options:
 * `options` prop has specific shape, that is, it must have two properties `value` and `label` in each element of
 * `options` array. Other than these properties you can add any number of extra properties as well.
 *
 * ### onSearchTextChange:
 * You need to pass callback function in this prop and you will get search text field value as prop in its parameter.
 * This callback will be called when you type in `SelectField` if `searchable` prop is `true`.
 *
 * ### onClearText:
 * You need to pass callback function in this prop as well. This prop will be called when you click on `close`
 * icon in searchable `SelectField`.
 */
export default function SelectField<T extends SelectOption>(
	props: SelectFieldProps<T>
): JSX.Element;
