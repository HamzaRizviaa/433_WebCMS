import { AutocompleteProps } from '@material-ui/lab';
import { SelectProps, TextFieldProps } from '@material-ui/core';

export type SelectOption = {
	[Key: string]: string | number | undefined | null;
};

type MapOptions<T> = {
	labelKey: keyof T;
	valueKey: keyof T;
};

export type SelectFieldCustomProps<T> = {
	name: string;
	value: any;
	options: T[];
	mapOptions: MapOptions<T>;
	searchable?: boolean;
	label?: string;
	isLoading?: boolean;
	rightLabel?: string;
	placeholder?: string;
	required?: boolean;
	error?: string;
	noOptionsText?: string;
	size?: 'small' | 'medium' | 'large';
	onSearchTextChange?: (value: string) => void;
	onClearText?: () => void;
	searchBarProps?: TextFieldProps;
	readOnly?: boolean;
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
				onChange?: (value: T) => void;
			})
	| (ModifiedSelectProps &
			SelectFieldCustomProps<T> & {
				searchable: false;
				onChange?: (value: string | number, metaData?: T) => void;
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
 * `options` prop must be an array of object with N number of key value pairs.
 *
 * ### mapOptions:
 * if you don't have `label` and `value` key in your options object then this prop is required. You need to pass
 * `labelKey` and `valueKey` in this object.
 *
 * **labelKey:** The key in your option which you want to show as label.
 *
 * **valueKey:** The key in your options object which you want to use as value.
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
