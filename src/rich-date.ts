enum TimeUnits {
    YEARS = 'YEARS',
    MONTHS = 'MONTHS',
    DAYS = 'DAYS',
    HOURS = 'HOURS',
    MINUTES = 'MINUTES',
    SECONDS = 'SECONDS'
}

enum ChangeAction {
    ADD = 'ADD',
    SUBTRACT = 'SUBTRACT'
}

class RichDate extends Date {
    static DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

    /**
     * Transform RichDate object to string with specific pattern
     * @param outputDateFormat - specific pattern for resulting string
     * Pattern abbreviations:
     *  YYYY - years
     *  MM - months
     *  DD - days
     *  HH - hours
     *  mm - minutes
     *  ss - seconds
     */
    format(outputDateFormat: string = RichDate.DEFAULT_DATE_FORMAT): string {
        const particlesOfTime = {
            YYYY: String(this.getFullYear()),
            MM: String(this.getMonth() + 1).padStart(2, '0'),
            DD: String(this.getDate()).padStart(2, '0'),
            HH: String(this.getHours()).padStart(2, '0'),
            mm: String(this.getMinutes()).padStart(2, '0'),
            ss: String(this.getSeconds()).padStart(2, '0')
        };

        return Object.keys(particlesOfTime).reduce((resultStr: string, key: string) => {
            return resultStr.replace(key, particlesOfTime[key]);
        }, outputDateFormat);
    }
}

export function richDate(date?: string | number | Date) {
    return (date instanceof Date)
        ? new RichDate(date.getTime())
        : ((typeof date === 'string' && date !== '') || typeof date === 'number')
            ? new RichDate(date)
            : new RichDate();
}
