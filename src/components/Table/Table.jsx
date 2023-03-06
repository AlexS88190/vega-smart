import React, {useEffect, useState} from 'react';
import './Table.css'
import {rowHeadTable} from "../../utils/constants";
import {useParse} from "../../utils/parseResponseServer";


function Table({payload, isCollectingStatistic}) {

    const [rows, setRows] = useState([]);

    const {getValueRow} = useParse()

    useEffect(() => {
        if (!isCollectingStatistic) {
            setRows([])
        }
    }, [isCollectingStatistic])

    useEffect(() => {
        if (payload) {
            drawTable()
        }
    }, [payload])

    function drawTable() {
        if (!isCollectingStatistic) {
            setRows(() => {
                return [getValueRow(payload)]
            })
        } else {
            setRows((oldRows) => {
                return [getValueRow(payload), ...oldRows]
            })
        }
    }

    return (
        <>
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
        </>
    );
}

export default React.memo(Table);