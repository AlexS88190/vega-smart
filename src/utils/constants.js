export const rowHeadTable = [
    {   id: 1,
        value: 'Время'
    },
    {
        id: 2,
        value: 'Причина передачи сообщения'
    },
    {
        id: 3,
        value: 'Заряд батареи, %'
    },
    {
        id: 4,
        value: 'Температура, С'
    },
    {
        id: 5,
        value: 'Влажность, %'
    },
    {
        id: 6,
        value: 'Состояние двери (по датчику №2)',
    },
    {
        id: 7,
        value: 'Угол отклонения от вертикали, град.',
    },
    {
        id: 8,
        value: 'fcnt',
    }
]


export const dateTemplate = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December'
}

export const causeMessageTemplate = {
    '1': 'Текущее состояние устройства',
    '2': 'Сработал датчик открытия №1',
    '3': 'Сработал датчик открытия №2',
    '4': 'Сработал акселерометр',
    '5': 'Выход влажности за установленные пределы',
    '6': 'Выход температуры за установленные пределы'
}

export const statusDoorTemplate = {
    '0': 'Дверь открыта',
    '1': 'Дверь закрыта'
}

export const typeTemplate = {
    '1': 'date',
    '2': 'causeMessage',
    '3': 'batteryCharge',
    '4': 'temp',
    '5': 'humidity',
    '6': 'doorStatus',
    '7': 'deflectionAngle',
    '8': 'fcnt'
}

export const doorStatusMap = {
    open: '00',
    close: '01'
}

export const jwt = localStorage.getItem('jwt');

export const basePath = 'wss://admin.iotvega.com/ws'