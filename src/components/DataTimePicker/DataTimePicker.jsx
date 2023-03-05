import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import ReactExport from "react-export-excel-xlsx-fix";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useEffect, useState} from "react";
import {useParse} from "../../utils/parseResponseServer";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



function DateTimePickerValue({ downloadList, getStatisticDownload }) {
    const [valueFrom, setValueFrom] = React.useState(dayjs(''));
    const [valueTo, setValueTo] = React.useState(dayjs(''));

    const [data, setData] = useState([]);

    const [isDisableButton, setIsDisableButton] = useState(true)

    const {getValueRow} = useParse()

    useEffect(() => {
        if (valueFrom.$L !== 'en' && valueTo.$L !== 'en') {
            const loadDayFrom = convertDateToUtc(valueFrom.$d)
            const loadDayTo = convertDateToUtc(valueTo.$d)

            getStatisticDownload(loadDayFrom, loadDayTo)
        }
    }, [valueFrom, valueTo])

    useEffect(() => {
        if (data.length) {
            setIsDisableButton(false)
        }
    }, [data])

    const isButtonActivate = () => {
        setData([])
        setIsDisableButton(true)
        setValueFrom(dayjs(''))
        setValueTo(dayjs(''))
    }

    const convertDateToUtc = (time) => {
        const dateFull = new Date(time)
        const dateNow = new Date()
        return dateNow.setTime(dateFull.getTime())
    }


    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="От"
                        value={valueFrom}
                        onChange={(newValue) => setValueFrom(newValue)}
                        sx={{ width: '20%' }}
                    />
                    <DateTimePicker
                        label="До"
                        value={valueTo}
                        onChange={(newValue) => setValueTo(newValue)}
                        sx={{ width: '20%' }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            {/*<Xls handleListData={handleListData} downloadList={downloadList} valueFrom={valueFrom} valueTo={valueTo}/>*/}
            <ExcelFile element={<button style={{margin: 30}} disabled= {isDisableButton} onClick={isButtonActivate}>Download</button>}  filename={'statistic'}>
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
        </>
    );
}

export default DateTimePickerValue;