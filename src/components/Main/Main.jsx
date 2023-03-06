import ExportExcel from "../ExportExcel/ExportExcel";
import Table from "../Table/Table"
import {useState} from "react";


function Main({payload, downloadList, getStatisticDownload, handleLogout, handleClickLastData}) {

    const [isCollectingStatistic, setCollectingStatistic] = useState(false)

    function handleStatistic() {
        setCollectingStatistic(!isCollectingStatistic)
        if (isCollectingStatistic) {
            handleClickLastData()
        }

    }
    return (
        <>
            <ExportExcel downloadList={downloadList} getStatisticDownload={getStatisticDownload} handleLogout={handleLogout} handleStatistic={handleStatistic}/>
            <Table payload={payload} isCollectingStatistic={isCollectingStatistic}/>
        </>
    )
}

export default Main;