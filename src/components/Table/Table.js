import React, {useEffect, useState} from 'react';
import {dateTemplate, causeMessageTemplate, statusDoorTemplate, typeTemplate, rowHeadTable} from "../../utils/constants";
import './Table.css'
import {useParse} from "../../utils/parseResponseServer";

// const payload = {
//     data: '0163ccb44a61e4002901000b1b381418',
//     fcnt: 900
// }

function Table({payload}) {

    const [rows, setRows] = useState([]);
    const {getValueRow} = useParse()

    useEffect(() => {
        if (payload) {
            drawTable()
        }
    }, [payload])


    function drawTable() {
        setRows(() => {
            return [getValueRow(payload)]
        })
    }

    return (
        <table>
            <thead>
                <tr>
                    {rowHeadTable.map(cell => (
                        <th key={cell.id}>{cell.value}</th>
                    ))}
                </tr>
            </thead>

            {rows &&
            <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {row.map((cell) => {
                        return  <td key={cell.id}>{cell.value}</td>
                    })}
                </tr>
            ))}
            </tbody>}
        </table>
    );
}

export default Table;