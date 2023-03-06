import React, {useEffect, useState} from 'react';
import {rowHeadTable, doorStatusMap} from "../../utils/constants";
import './Table.css'
import {useParse} from "../../utils/parseResponseServer";


function Table({payload, isCollectingStatistic}) {

    const [rows, setRows] = useState([]);

    const {getValueRow} = useParse()

    useEffect(() => {
        if (payload) {
            setRows([])
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


    console.log('render Table')
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