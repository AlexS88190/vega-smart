import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonLogin ({handleLogin}) {
    return (
        <Stack spacing={2} direction="row">
            <Button onClick={handleLogin} variant="contained" size={"large"}>Войти</Button>
        </Stack>
    );
}
