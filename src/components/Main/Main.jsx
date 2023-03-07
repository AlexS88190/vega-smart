import ExportExcel from "../ExportExcel/ExportExcel";
import Table from "../Table/Table"
import React, {useEffect, useState} from "react";


function Main({payload, downloadList, getStatisticDownload, handleLogout, handleClickLastData, dropDownloadList}) {
    const [isCollectingStatistic, setCollectingStatistic] = useState(false)

    useEffect(() => {
        setTimeout(() => handleClickLastData(), 1000);
    }, []);

    function handleStatistic() {
        setCollectingStatistic(!isCollectingStatistic)
        if (isCollectingStatistic) {
            handleClickLastData()
        }

    }
    return (
        <>
            <ExportExcel downloadList={downloadList} getStatisticDownload={getStatisticDownload} handleLogout={handleLogout} handleStatistic={handleStatistic} dropDownloadList={dropDownloadList}/>
            <Table payload={payload} isCollectingStatistic={isCollectingStatistic}/>
        </>
    )
}

export default React.memo(Main);