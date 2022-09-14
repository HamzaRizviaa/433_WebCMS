import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    tableContainer: {
        "& .table": {
            width: '100%',
            borderCollapse: 'seperate',
            borderSpacing: '0px 10px',
            "& tr th": {
                position: 'relative'
            },
            "& thead": {
                display: 'table',
                width: '98.7%',
                tableLayout: 'fixed',
                "& .sortable": {
                    paddingLeft: '1.5rem'
                }
            },
            "& tbody": {
                display: 'block',
                maxHeight: 'calc(100vh - 200px)',
                minHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                "& tr": {
                    display: 'table',
                    width: '100%',
                    tableLayout: 'fixed',
                    cursor: 'pointer',
                    "& td": {
                        borderBottom: '1px solid #404040'
                    }
                }
            }
        }
    },
    tableHeader: {
        "& .table-header": {
            "& th": {
                fontSize: '1rem',
                fontWeight: 'bold',
                letterSpacing: '0.03rem',
                textAlign: 'initial',
                textTransform: 'uppercase'
            }
        }
    }
}))