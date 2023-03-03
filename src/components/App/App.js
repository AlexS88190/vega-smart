import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Table from "../Table/Table";
import '../Table/Table.css';

const bodyRequestLogin = {
  cmd: 'auth_req',
  login: 'quest',
  password: 'tset',
};

const bodyRequestListData = {
  cmd: 'get_data_req',
  devEui: '353234306D307817',
  select: {
    begin_index: 0,
    limit: 1
  }
};


function App() {

  const [socketUrl, setSocketUrl] = useState('wss://admin.iotvega.com/ws');
  const [payload, setPayload] = useState(undefined);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {shouldReconnect: (closeEvent) => true});


  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      handleClickLogin()
      console.log('Залогинился')

    } else if (readyState === ReadyState.CLOSED) {
      console.log('Отвалился')
    }

  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const response = JSON.parse(lastMessage.data)
      console.log(response)
      if (response.cmd === 'get_data_resp') {
        setPayload(response.data_list[0])
      } else if (response.cmd === 'rx') {
        setPayload(response)
      }

      // setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  useEffect(() => {
    setTimeout(() => handleClickListData(), 1500);
  }, [])


  const handleClickLogin = useCallback(() => sendMessage(JSON.stringify(bodyRequestLogin)), []);
  const handleClickListData = useCallback(() => sendMessage(JSON.stringify(bodyRequestListData)), []);



  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  return (
      <div>
        <button onClick={handleClickLogin} disabled={readyState !== ReadyState.OPEN}>Войти</button>
        <span>The WebSocket is currently {connectionStatus}</span>
        <button onClick={handleClickListData}>Запрос на список Data</button>
        <Table payload={payload}/>
      </div>
  );
}

export default App;
