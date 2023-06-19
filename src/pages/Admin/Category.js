import { Box, Typography } from "@mui/material";
import CateList from "./CateList";

function Category() {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <CateList />
        </Box>
    );
}

export default Category;