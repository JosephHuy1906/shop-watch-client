import { Box, Typography } from '@mui/material';
import ProductList from './ProductList';

function ProductAd() {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ProductList />
        </Box>
    );
}

export default ProductAd;
