import React, {useEffect, useState} from 'react';
import {dateTemplate, causeMessageTemplate, statusDoorTemplate, typeTemplate, rowHeadTable} from "../../utils/constants";
import './Table.css'

// const payload = {
//     data: '0163ccb44a61e4002901000b1b381418',
//     fcnt: 900
// }

function Table({payload}) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (payload) {
            getValueRow(payload)
        }
    }, [payload])

    function getDecimalValue(hexValue) {
        let decValue = ''
        if (hexValue.length >= 4) {
            let hexValueLittleEndian = ''
            const hexValueReverse = hexValue.split('').reverse().join('');
            let i = 0
            while (i <= hexValueReverse.length - 2) {
                hexValueLittleEndian = hexValueLittleEndian + hexValueReverse[i + 1] + hexValueReverse[i]
                i = i + 2
            }
            hexValue = hexValueLittleEndian
        }
        const hexToDecimal = hex => parseInt(hex, 16);
        decValue = hexToDecimal(hexValue);

        return decValue
    }

    function parseData(payload) {
        const data = payload.data
        const fcnt = payload.fcnt
            let listValuesData = []
            let i = 0
            while (i <= data.length - 1) {
                let item
                if (i === 4) {
                    item = data.slice(i, i + 8)
                    i = i + 8
                } else if (i === 12) {
                    item = data.slice(i, i + 4)
                    i = i + 4
                } else {
                    item = data[i] + data[i + 1]
                    i = i + 2
                }
                listValuesData.push(item)
            }
            let listValuesDataDecimal = listValuesData.map(hex => getDecimalValue(hex))
            listValuesDataDecimal = [
                listValuesDataDecimal[2],
                listValuesDataDecimal[0],
                listValuesDataDecimal[1],
                listValuesDataDecimal[3],
                listValuesDataDecimal[4],
                listValuesDataDecimal[6],
                listValuesDataDecimal[7],
                fcnt
            ]
        return listValuesDataDecimal
    }

    function convertValueDate(value) {
        const dateFull = new Date(value * 1000)
        const listItemDateFull = dateFull.toString().split(' ').slice(1, 5);
        let listItemDate = []
        let buff
        for (let i = 0; i < listItemDateFull.length; i ++) {
            if (i === 0) {
                buff = listItemDateFull[i]
                listItemDateFull[i] =  listItemDateFull[i + 1]
                listItemDateFull[i + 1] = buff
            } else if (i === 1) {
                listItemDateFull[i] = dateTemplate[listItemDateFull[i]]
            }
            else if (i === 3) {
                listItemDateFull[i] = listItemDateFull[i].slice(0, 5)
            }
            listItemDate.push(listItemDateFull[i])
        }
        return listItemDate.join(' ')
    }

    function getValueRow(payload) {
        const listValueCells = parseData(payload);
        let row = []
        for (let i = 0; i < listValueCells.length; i ++) {
            if (i === 0) {
                listValueCells[i] = convertValueDate(listValueCells[i])
            } else if (i === 1) {
                listValueCells[i] = causeMessageTemplate[listValueCells[i]]
            } else if (i === 3) {
                listValueCells[i] = listValueCells[i]/10
            } else if (i === 5) {
                listValueCells[i] = statusDoorTemplate[listValueCells[i]]
            }
            row.push({id: i + 1, value: listValueCells[i], type: typeTemplate[String(i + 1)]})
        }
        setRows(() => {
            return [row]
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