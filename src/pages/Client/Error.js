import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <>

            <div className="not">
                <div className="number">404</div>
                <div className="text">
                    <span>Ooops...</span>
                    <br />
                    page not found
                </div>
                <Link to="/">Home</Link>
            </div>
        </>
    );
}

export default Error;
