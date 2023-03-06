class Api {
    constructor(baseUrl) {
        this._baseUrl = baseUrl
    }

    authorize = () => {
        return {
            cmd: 'auth_req',
            login: 'quest',
            password: 'tset',
        }
    }

    getLastData = () => {
        return {
            cmd: 'get_data_req',
            devEui: '353234306D307817',
            select: {
                begin_index: 0,
                limit: 1
            }
        }
    }

    getJvtToken = (jwt) => {
        return {
            cmd: 'token_auth_req',
            token: jwt
        }
    }

    getListData = (loadDayFrom, loadDayTo) => {
        return {
            cmd: 'get_data_req',
            devEui: '353234306D307817',
            select: {
                date_from: loadDayFrom,
                date_to: loadDayTo
            }
        }
    }
}

const api = new Api('wss://admin.iotvega.com/ws');

export {api}