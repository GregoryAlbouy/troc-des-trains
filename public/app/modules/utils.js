export class Utils
{
    static datetime(stringDate, stringDateStart)
    {
        const datetime = new Date(Date.parse(stringDate))
        const datetimeStart = stringDateStart ? new Date(Date.parse(stringDateStart)) : null

        const formatNumber = (n) => n <= 9 ? `0${n}` : `${n}`

        const getFormattedNumbers = (datetime) => {
            return {
                YYYY: datetime.getFullYear(),
                MM: formatNumber(datetime.getMonth() + 1),
                dd: formatNumber(datetime.getDate()),
                hh: datetime.getUTCHours(),
                mm: formatNumber(datetime.getMinutes())
            }
        }

        const formatDate = (d) => `${d.dd}/${d.MM}/${d.YYYY}`
        const formatTime = (d) => `${d.hh}:${d.mm}`
        const formatDuration = (d) => `${d.hh}h${d.mm}`

        const getDuration = (datetime, datetimeStart) => {
            const datediff = new Date(Date.parse(datetime) - Date.parse(datetimeStart))
            return formatDuration(getFormattedNumbers(datediff))
        }

        return {
            toDate: () => formatDate(getFormattedNumbers(datetime)),
            toTime: () => formatTime(getFormattedNumbers(datetime)),
            toDuration: () => getDuration(datetime, datetimeStart)
        }
    }
}