import React, { useState, useCallback, useEffect } from 'react';
import './App.css'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Login from "../Login/Login";
import YandexMap from "../YandexMap/YandexMap";
import {basePath, doorStatusMap, jwt} from "../../utils/constants";
import {api} from "../../utils/api";

function App() {

  const [payload, setPayload] = useState(undefined);
  const [downloadList, setDownloadList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const [bodyRequestListData, setBodyRequestListData] = useState({})
  const [bodyRequestToken, setBodyRequestToken] = useState({})
  const [isStateDoorSoldering, setStateDoorSoldering] = useState(undefined)

  const { sendMessage, lastMessage, readyState } = useWebSocket(basePath, {shouldReconnect: (closeEvent) => true});
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      setLoggedIn(true)
      setBodyRequestToken(
          api.getJvtToken(jwt)
      )
      console.log('Токен отправлен 1 use')
    }

  }, [])

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])

  useEffect(() => {
    if (bodyRequestListData.cmd) {
      handleListData()
      console.log('Запросил статистику')
    }

  }, [bodyRequestListData])

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      if (jwt) {
        handleSendToken()
        console.log('Токен отправлен 2 use')
      }
    } else if (readyState === ReadyState.CLOSED) {
      console.log('Отвалился по токену')
    }
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      const response = JSON.parse(lastMessage.data)
      console.log(response)
      const availabilityJwt = response.cmd === 'auth_resp' && response.token !== jwt
      if (availabilityJwt) {
        setLoggedIn(true)
        localStorage.setItem('jwt', response.token);
        console.log('токен записан в Storage')
        setBodyRequestToken(
            api.getJvtToken(response.token)
        )

      } else if (response.cmd === 'get_data_resp' && response.data_list.length === 1) {
        setPayload(response.data_list[0])
        getStateDoor(response.data_list[0])
      } else if (response.cmd === 'rx') {
        setPayload(response)
      } else if (response.cmd === 'get_data_resp' && response.data_list.length > 1) {
          setDownloadList(response.data_list)
          console.log('Запросил')
      }
    }
  }, [lastMessage]);

  function getStatisticDownload(loadDayFrom, loadDayTo) {
    setBodyRequestListData(
        api.getListData(loadDayFrom, loadDayTo)
    )
  }

  function getStateDoor(payload) {
    const stateDoorHex = payload.data.slice(20, 22)
    if (stateDoorHex === doorStatusMap.open) {
      setStateDoorSoldering(true)
    } else if (stateDoorHex === doorStatusMap.close) {
      setStateDoorSoldering(false)
    }
  }

  function handleLogin() {
    handleClickLogin()
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    navigate('/login');
  }

  const handleClickLogin = useCallback(() => sendMessage(JSON.stringify(api.authorize())), []);
  const handleClickLastData = useCallback(() => sendMessage(JSON.stringify(api.getLastData())), []);
  const handleListData = useCallback(() => sendMessage(JSON.stringify(bodyRequestListData)), [bodyRequestListData])
  const handleSendToken = useCallback(() => sendMessage(JSON.stringify(bodyRequestToken)), [bodyRequestToken]);

  return (
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
                path='/login'
                element={
                  <Login handleLogin={handleLogin}/>
                }
            />
            <Route
                path='/'
                element={
                  <ProtectedRoute path='/' loggedIn={loggedIn}>
                    <Main
                        downloadList={downloadList}
                        getStatisticDownload={getStatisticDownload}
                        payload={payload}
                        handleLogout={handleLogout}
                        handleClickLastData={handleClickLastData}
                    />
                  </ProtectedRoute>
                }
            />
            <Route
                path='/map'
                element={
                <ProtectedRoute path='/map' loggedIn={loggedIn}>
                  <YandexMap isStateDoorSoldering={isStateDoorSoldering}/>
                </ProtectedRoute>
                }
            />
            <Route path='*'
                   element={loggedIn ? <Navigate to='/'/> : <Navigate to='/login' />}/>
          </Routes>

        </div>
      </div>
  );
}

export default App;


