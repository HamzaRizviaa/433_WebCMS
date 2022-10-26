export interface PaginationProps {
	totalRecords: number;
}

/**
 * This component renders the pagination below the table.
 * It is used with the Table component. The Table component recieves the totalRecords
 * and pass it to the Pagination component that needs it to show the total number of records
 * brought by the API
 */

export default function Pagination(props: PaginationProps): JSX.Element;
