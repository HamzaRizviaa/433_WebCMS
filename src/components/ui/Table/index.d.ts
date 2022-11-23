export interface TableProps {
	data: Array<any>;
	columns: Array<any>;
	totalRecords: number;
	onRowClick: () => void;
	isLoading: boolean;
	noDataText: string;
	formTable?: boolean;
	customSortBy?: string;
	customOrderType?: 'asc' | 'desc';
	onSort: (sortOrder: 'asc' | 'desc', sortField: string) => void;
}

/**
 * This `Table` component will be used in place for both the table and the pagination components.
 * It takes data, columns (array of objects), an onRowClick function that needs to be called in the
 * specific libraries.
 */
export default function Table(props: TableProps): JSX.Element;
