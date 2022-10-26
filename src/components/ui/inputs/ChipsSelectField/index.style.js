import { makeStyles } from "@material-ui/core";

export const useChipSelectStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 'calc(100% - 10px)'
    },
    errorState: {
		color: theme.palette.red
	},
	noErrorState: {
		color: theme.palette.white
	},
    paperBody: {
        marginTop: '12px',
        border: '1px solid #404040',
        boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
        borderRadius: '8px',
        background: 'black'
    },
    listClassname:{
        display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '14px',
        padding: '8px 8px 8px 12px',
        '&:hover': {
            color: '#ffff00',
            cursor: 'pointer'
        }
    },
    textFieldAuto: {
        width: '100%',
        color: '#ffffff !important',
        '&input': {
            color: '#ffffff !important',
            fontSize: '14px'
        }
    },
    autoComplete: {
        padding: '7px 16px',
        color: 'white !important',
        border: '1px solid #404040',
        fontSize: '1.4rem !important',
        lineHeight: '1.6 !important',
        borderRadius: '22px !important',
        marginBottom: '1rem !important',
        '& .MuiInput-input': {
            padding: '1rem 0rem 1rem 1rem',
            color: '#ffffff !important'
        },
        '& svg': {
            color: '#ffff00',
            right: '5rem !important',
            top: '0rem !important',
            fontSize: '3rem'
        },
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
    },
    liAutocompleteWithButton: {
        display: flex,
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontSize: '14px',
        padding: '8px 8px 8px 12px'
    },
    liAutocomplete: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: '14px',
        padding: '8px 8px 8px 12px',
        '&:hover': {
            color: '#ffff00',
            cursor: 'pointer'
        }
    },
    tagYellow: {
        backgroundColor: '#ffff00 !important',
        fontFamily: 'Poppins !important',
        fontStyle: 'normal !important',
        fontWeight: 'bold !important',
        fontSize: '12px !important',
        lineHeight: '24px !important',
        padding: '4px 6px !important',
        marginRight: '3px !important',
        marginLeft: '3px !important',
        marginTop: '2px !important',
        marginBottom: '2px !important',
        '& svg': {
            backgroundColor: '#ffff00 !important', // news library issue
            color: 'black !important',
            fontSize: '20px !important'
        }
    }
}))