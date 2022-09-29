export interface TableProps {
    data: array,
    columns: array,
    totalRecords: number,
    onRowClick: function,
    onDataReload: function
}

/* The Table component renders the table and pagination with the specified props */

export default function Table(props: TableProps): JSX.Element