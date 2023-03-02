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
        value: 'Состояние двери (датчик №2)',
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
    '1': 'Текущее состояие устройства',
    '2': 'Сработал датчик №1 открытия двери',
    '3': 'Сработал датчик №2 открытия двери',
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