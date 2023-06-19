import { Box, Typography } from "@mui/material";

import AdminList from "./AdminList";

function Admin() {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <AdminList />
        </Box>
    );
}

export default Admin;