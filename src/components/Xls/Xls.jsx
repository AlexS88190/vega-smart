import React, {useEffect, useState} from "react";
import ReactExport from "react-export-excel-xlsx-fix";
import {useParse} from "../../utils/parseResponseServer";
import dayjs from "dayjs";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

// const data = [
//     {
//         name: "Johson",
//         amount: 30000,
//         sex: 'M',
//         is_married: true
//     },
//     {
//         name: "Monika",
//         amount: 355000,
//         sex: 'F',
//         is_married: false
//     },
//     {
//         name: "John",
//         amount: 250000,
//         sex: 'M',
//         is_married: false
//     },
//     {
//         name: "Josef",
//         amount: 450500,
//         sex: 'M',
//         is_married: true
//     }
// ];

const Xls = ({handleListData, downloadList, valueFrom, valueTo}) => {
    const [data, setData] = useState(undefined);
    const {getValueRow} = useParse()

    // useEffect(() => {
    //     if (data.length) {
    //         ExcelFile()
    //     }
    // }, data)

    function handleClickListData() {
        handleListData()
    }

    function convertDateToUtc(date) {
        const dateFull = new Date(date)
        const dateNow = new Date()
        return dateNow.setTime(dateFull.getTime())
    }



    function parseResponse(response) {
        response.data_list.forEach((item) => {

        })
    }

    function downloadFile () {
        setData(    [{
                date: "Johson",
            causeMessage: 30000,
            batteryCharge: 2342
            },
            {
                date: "Carl",
                causeMessage: 125,
                batteryCharge: 23234,
            },
            {
                date: "Monika",
                causeMessage: 888,
                batteryCharge: 80,
            }])
    }

    console.log(data)
    // console.log(valueFrom.$d)
    // console.log(valueTo.$d)

    return (
        <>
        <ExcelFile element={<button style={{margin: 30}} onClick={() => {downloadFile()}}>Download</button>}  filename={'statistic'}>
            <ExcelSheet data={data} name="Employees">
                <ExcelColumn label="Время" value="date"/>
                <ExcelColumn label="Причина передачи сообщения" value="causeMessage"/>
                <ExcelColumn label="Заряд батареи, %" value="batteryCharge"/>
                {/*<ExcelColumn label="Температура, С" value="temp"/>*/}
                {/*<ExcelColumn label="Влажность, %" value="humidity"/>*/}
                {/*<ExcelColumn label="Состояние двери (датчик №2)" value="doorStatus"/>*/}
                {/*<ExcelColumn label="Угол отклонения от вертикали, град." value="deflectionAngle"/>*/}
                {/*<ExcelColumn label="fcnt" value="fcnt"/>*/}
            </ExcelSheet>
        </ExcelFile>
        <button onClick={downloadFile}></button>
        </>
    )
}

export default Xls;