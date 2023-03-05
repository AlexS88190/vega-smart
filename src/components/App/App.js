import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Table from "../Table/Table";
import '../Table/Table.css';
import DataTimePicker from "../DataTimePicker/DataTimePicker";

const bodyRequestLogin = {
  cmd: 'auth_req',
  login: 'quest',
  password: 'tset',
};

const bodyRequestLastData = {
  cmd: 'get_data_req',
  devEui: '353234306D307817',
  select: {
    begin_index: 0,
    limit: 1
  }
};

// const bodyRequestListDat =
//   {
//   cmd: 'get_data_req',
//   devEui: '353234306D307817',
//   select: {
//       date_from: 1677603600000,
//       date_to: 1677690000000
//   }
// };


function App() {

  const [socketUrl, setSocketUrl] = useState('wss://admin.iotvega.com/ws');
  const [payload, setPayload] = useState(undefined);
  const [downloadList, setDownloadList] = useState([]);

  const [bodyRequestListData, setBodyRequestListData] = useState({})
  const [bodyRequestToken, setBodyRequestToken] = useState({})

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {shouldReconnect: (closeEvent) => true});


  useEffect(() => {

      handleClickLogin()
      console.log('Залогинился')
      setTimeout(() => handleClickLastData(), 1800);


  }, []);

  useEffect(() => {
    if (bodyRequestListData.cmd) {
      handleListData()
      console.log('Запросил статистику')
    }

  }, [bodyRequestListData])

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      if (localStorage.getItem('token')) {
        handleSendToken()
        console.log('Токен отправлен')
      }

    } else if (readyState === ReadyState.CLOSED) {
      console.log('Отвалился по токену')
    }

  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const response = JSON.parse(lastMessage.data)
      console.log(response)
      if (response.cmd === 'auth_resp' && response.token !== localStorage.getItem('token')) {
        localStorage.setItem('token', response.token);
        console.log('токен записан в Storage')
        setBodyRequestToken({
          cmd: 'token_auth_req',
          token: response.token
        })

      } else if (response.cmd === 'get_data_resp' && response.data_list.length === 1) {
        setPayload(response.data_list[0])
      } else if (response.cmd === 'rx') {
        setPayload(response)
      } else if (response.cmd === 'get_data_resp' && response.data_list.length > 1) {
          setDownloadList(response.data_list)
          console.log('Запросил')
      }

    }
  }, [lastMessage]);


  function getStatisticDownload(loadDayFrom, loadDayTo) {
    setBodyRequestListData( {
      cmd: 'get_data_req',
      devEui: '353234306D307817',
      select: {
          date_from: loadDayFrom,
          date_to: loadDayTo
      }
    })
  }

  const handleClickLogin = useCallback(() => sendMessage(JSON.stringify(bodyRequestLogin)), []);
  const handleClickLastData = useCallback(() => sendMessage(JSON.stringify(bodyRequestLastData)), []);

  const handleListData = useCallback(() => sendMessage(JSON.stringify(bodyRequestListData)), [bodyRequestListData])

  const handleSendToken = useCallback(() => sendMessage(JSON.stringify(bodyRequestToken)), [bodyRequestToken]);


  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  // console.log(downloadList)

  return (
      <div>
        <span>The WebSocket is currently {connectionStatus}</span>
        <DataTimePicker downloadList={downloadList} getStatisticDownload={getStatisticDownload} />
        <Table payload={payload}/>

      </div>
  );
}

export default App;


