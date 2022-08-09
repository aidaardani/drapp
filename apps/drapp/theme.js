import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    direction: 'rtl',
    status: {
        danger: '#f44336'
    },
    palette: {
        primary: {
            main: '#3861fb'
        },
        secondary: {
            main: '#ff9800'
        }
    },
    typography: {
        fontFamily: '"iransans", "Helvetica", "Arial", sans-serif'
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '7px',
                    padding: '11px 16px',
                    fontSize: '0.85rem'
                }
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#000'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontSize: '0.9rem',
                    fontWeight: '500'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingRight: '1.5rem',
                    paddingLeft: '1.5rem'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#000'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    paddingRight: '7px',
                    borderRadius: '9px'
                },
                notchedOutline: {
                    borderColor: '#e1e4e6'
                },
                input: {
                    padding: '16.5px 14px'
                }
            }
        }
    }
});

export default theme;
