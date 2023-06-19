import { Outlet } from 'react-router-dom';
import '../../components/GlobalStyle/admin.css';
import AdminNavigation from '../../components/Navigation/AdminNavigation';
import Box from '@mui/material/Box';
import AdminNavBar from '../../components/Navigation/AdminNavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: 'serif',
            textTransform: 'none',
            fontSize: 20,
        },
    },
});

function AdminLayout() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AdminNavBar />
                <div className="main">
                    <Box sx={{ display: 'flex' }}>
                        <AdminNavigation /> <Outlet />
                    </Box>
                </div>
            </ThemeProvider>
        </>
    );
}

export default AdminLayout;
