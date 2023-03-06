import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Switcher({handleStatistic}) {

    return (
        <div>
            {/*<Switch {...label} defaultChecked />*/}
            <Switch {...label} onChange={handleStatistic} />
            {/*<Switch {...label} disabled defaultChecked />*/}
            {/*<Switch {...label} disabled />*/}
        </div>
    );
}