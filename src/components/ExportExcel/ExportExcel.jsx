import React from 'react';
import dayjs from 'dayjs';
import './ExportExcel.css'
import logo from "../../images/logo.png";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {Link} from "react-router-dom";
import ReactExport from "react-export-excel-xlsx-fix";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useEffect, useState} from "react";
import {useParse} from "../../utils/parseResponseServer";
import Switcher from "../Switcher/Switcher";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportExcel({ downloadList, getStatisticDownload, handleLogout, handleStatistic, dropDownloadList }) {
    const [valueFrom, setValueFrom] = React.useState(dayjs(''));
    const [valueTo, setValueTo] = React.useState(dayjs(''));
    const [data, setData] = useState([]);
    const [isDisableButton, setIsDisableButton] = useState(true)

    const {getValueRow, convertValueDate} = useParse()

    useEffect(() => {
        if (valueFrom.$L !== 'en' && valueTo.$L !== 'en') {
            const loadDayFrom = convertDateToUtc(valueFrom.$d)
            const loadDayTo = convertDateToUtc(valueTo.$d)
            getStatisticDownload(loadDayFrom, loadDayTo)
        }
    }, [valueFrom, valueTo])

    useEffect(() => {
        parseDownloadList(downloadList)
    }, [downloadList])

    useEffect(() => {
        if (data.length) {
            setIsDisableButton(false)
        }
    }, [data])


    const parseDownloadList = (downloadList) => {
        const listRowsExcel = downloadList.map((oldRow) => {
            const listParseOldRows = getValueRow(oldRow)
            const timeServer = convertValueDate(oldRow.ts)
            const rowExcel = {}
            listParseOldRows.forEach((oldCell) => {
                if (oldCell.type === 'date') {
                    rowExcel.date = timeServer
                } else {
                    rowExcel[oldCell.type] = oldCell.value
                }
            })
           return rowExcel
        })
       setData(listRowsExcel)
    }

    const isButtonActivate = () => {
        setData([])
        setIsDisableButton(true)
        setValueFrom(dayjs(''))
        setValueTo(dayjs(''))
        dropDownloadList()
    }

    const convertDateToUtc = (time) => {
        const dateFull = new Date(time)
        const dateNow = new Date()
        return dateNow.setTime(dateFull.getTime())
    }
    return (
     <div className='export-excel'>
        <div className='export-excel__content'>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label="????"
                        value={valueFrom}
                        onChange={(newValue) => setValueFrom(newValue)}
                        sx={{ width: '20%' }}
                    />
                    <DateTimePicker
                        label="????"
                        value={valueTo}
                        onChange={(newValue) => setValueTo(newValue)}
                        sx={{ width: '20%' }}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <ExcelFile element=
                           {<button className={`${isDisableButton ? "export-excel__button export-excel__button_disable" : "export-excel__button export-excel__button_load"}`}
                            style={{margin: 30}} disabled= {isDisableButton} onClick={isButtonActivate}>Download</button>} filename={'statistic'}>
                <ExcelSheet data={data} name="Statistic">
                    <ExcelColumn label="??????????" value="date"/>
                    <ExcelColumn label="?????????????? ???????????????? ??????????????????" value="causeMessage"/>
                    <ExcelColumn label="?????????? ??????????????, %" value="batteryCharge"/>
                    <ExcelColumn label="??????????????????????, ??" value="temp"/>
                    <ExcelColumn label="??????????????????, %" value="humidity"/>
                    <ExcelColumn label="?????????????????? ?????????? (???????????? ???2)" value="doorStatus"/>
                    <ExcelColumn label="???????? ???????????????????? ???? ??????????????????, ????????." value="deflectionAngle"/>
                    <ExcelColumn label="fcnt" value="fcnt"/>
                </ExcelSheet>
            </ExcelFile>
        </div>
         <div className="export-excel__button-container">
             <Link className="link" to='/map'>
                 <p className="link__title">??????????</p>
             </Link>
             <button className="export-excel__button export-excel__button_Logout" onClick={handleLogout}>??????????</button>
             <Switcher handleStatistic={handleStatistic}/>
             <p>???????????????????? ???????????????????? ?? online ????????????</p>
         </div>
         <img src={logo} alt="??????????????" className="export-excel__logo"/>
     </div>
    );
}

export default React.memo(ExportExcel);