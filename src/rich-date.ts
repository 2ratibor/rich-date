export enum TimeUnits {
    YEARS = 'YEARS',
    MONTHS = 'MONTHS',
    DAYS = 'DAYS',
    HOURS = 'HOURS',
    MINUTES = 'MINUTES',
    SECONDS = 'SECONDS'
}

export enum DateFormats {
    'DD.MM.YYYY' = 'DD.MM.YYYY',
    'DD-MM-YYYY' = 'DD-MM-YYYY',
    'DD.MM.YYYY HH:mm:ss' = 'DD.MM.YYYY HH:mm:ss',
    'DD-MM-YYYY HH:mm:ss' = 'DD-MM-YYYY HH:mm:ss'
}

enum ChangeActions {
    ADD = 'ADD',
    SUBTRACT = 'SUBTRACT'
}

class RichDate extends Date {
    /**
     * Transform RichDate object to string with specific pattern
     * @param outputDateFormat - specific pattern for resulting string.
     * Pattern abbreviations:
     *  YYYY - years,
     *  MM - months,
     *  DD - days,
     *  HH - hours,
     *  mm - minutes,
     *  ss - seconds
     */
    format(outputDateFormat: DateFormats | string = DateFormats['DD.MM.YYYY']): string {
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

    /**
     * Get the difference between RichDate and date from "dateForComparing" parameter, in required units
     * @param dateForComparing - date to compare with RichDate
     * @param timeUnits - units for result value. Possible values: 'YEARS', 'MONTHS' or 'DAYS'
     * @param useDecimal - default value FALSE. If you set TRUE, you will receive more precise result
     */
    diff(dateForComparing: RichDate | Date, timeUnits: TimeUnits | string = TimeUnits.YEARS, useDecimal: boolean = false): number {
        switch (timeUnits) {
            case TimeUnits.YEARS:
                let differenceInYears: number = (this.getFullYear() - dateForComparing.getFullYear());

                if (useDecimal) {
                    const timeSinceDateAYearBeginning: number
                        = this.getTime() - (new Date(this.getFullYear(), 0, 1).getTime());

                    const timeSinceDateBYearBeginning: number
                        = dateForComparing.getTime() - (new Date(dateForComparing.getFullYear(), 0, 1).getTime());

                    differenceInYears
                        = differenceInYears + ((timeSinceDateAYearBeginning - timeSinceDateBYearBeginning) / (1000 * 60 * 60 * 24 * 365));
                }

                return differenceInYears;
            case TimeUnits.MONTHS:
                let differenceInMonths: number
                    = ((this.getFullYear() - dateForComparing.getFullYear()) * 12) + (this.getMonth() - dateForComparing.getMonth());

                if (useDecimal) {
                    const timeSinceDateAMonthBeginning: number
                        = this.getTime() - (new Date(this.getFullYear(), this.getMonth(), 1).getTime());

                    const timeSinceDateBMonthBeginning: number
                        = dateForComparing.getTime() - (new Date(dateForComparing.getFullYear(), dateForComparing.getMonth(), 1).getTime());

                    differenceInMonths
                        = differenceInMonths + ((timeSinceDateAMonthBeginning - timeSinceDateBMonthBeginning) / ((1000 * 60 * 60 * 24 * 365) / 12));
                }

                return differenceInMonths;
            case TimeUnits.DAYS:
                let differenceInDays: number = (this.getTime() - dateForComparing.getTime()) / (1000 * 60 * 60 * 24);

                if (!useDecimal) {
                    differenceInDays = Math.trunc(differenceInDays);
                }

                return differenceInDays;
            default:
                throw new Error('Unfortunately, method "diff" does not support such time unit. Please use "YEARS", "MONTHS" or "DAYS" as "timeUnits" parameter!!!');
        }
    }

    /**
     * Check that RichDate happened before date from "dateForComparing" parameter
     * @param dateForComparing - date to compare with RichDate
     */
    isBefore(dateForComparing: RichDate | Date): boolean {
        return (this.getTime() < dateForComparing.getTime());
    }

    /**
     * Check that RichDate happened after date from "dateForComparing" parameter
     * @param dateForComparing - date to compare with RichDate
     */
    isAfter(dateForComparing: RichDate | Date): boolean {
        return (dateForComparing.getTime() < this.getTime());
    }

    /**
     * Check that RichDate happened between two dates from parameters
     * @param dateA - first date to compare with RichDate
     * @param dateB - second date to compare with RichDate
     * @param betweenOrEqual - default value FALSE. If you set TRUE, you will receive positive result even if dateA or dateB is equal RichDate
     */
    isBetween(dateA: RichDate | Date, dateB: RichDate | Date, betweenOrEqual: boolean = false): boolean {
        let earlierDate: RichDate | Date;
        let laterDate: RichDate | Date;

        if (dateA.getTime() < dateB.getTime()) {
            earlierDate = dateA;
            laterDate = dateB;
        } else {
            earlierDate = dateB;
            laterDate = dateA;
        }

        if (betweenOrEqual) {
            return (this.getTime() >= earlierDate.getTime()
                && this.getTime() <= laterDate.getTime());
        } else {
            return (this.getTime() > earlierDate.getTime()
                && this.getTime() < laterDate.getTime());
        }
    }

    /**
     * Add to RichDate some amount of time
     * @param amountOfTime - the amount of time to add
     * @param timeUnits - the units of added time
     */
    add(amountOfTime: number, timeUnits: TimeUnits | string = TimeUnits.YEARS): RichDate {
        return this.change(ChangeActions.ADD, amountOfTime, timeUnits);
    }

    /**
     * Subtract from RichDate some amount of time
     * @param amountOfTime - the amount of time to subtract
     * @param timeUnits - the units of subtracted time
     */
    subtract(amountOfTime: number, timeUnits: TimeUnits | string = TimeUnits.YEARS): RichDate {
        return this.change(ChangeActions.SUBTRACT, amountOfTime, timeUnits);
    }

    private change(action: ChangeActions, amountOfTime: number, timeUnits: TimeUnits | string): RichDate {
        switch (timeUnits) {
            case TimeUnits.YEARS:
                if (action === ChangeActions.ADD) {
                    this.setFullYear(this.getFullYear() + amountOfTime);
                } else if (action === ChangeActions.SUBTRACT) {
                    this.setFullYear(this.getFullYear() - amountOfTime);
                }
                return this;
            case TimeUnits.MONTHS:
                if (action === ChangeActions.ADD) {
                    this.setMonth(this.getMonth() + amountOfTime);
                } else if (action === ChangeActions.SUBTRACT) {
                    this.setMonth(this.getMonth() - amountOfTime);
                }
                return this;
            case TimeUnits.DAYS:
                if (action === ChangeActions.ADD) {
                    this.setDate(this.getDate() + amountOfTime);
                } else if (action === ChangeActions.SUBTRACT) {
                    this.setDate(this.getDate() - amountOfTime);
                }
                return this;
            case TimeUnits.HOURS:
                if (action === ChangeActions.ADD) {
                    this.setHours(this.getHours() + amountOfTime);
                } else if (action === ChangeActions.SUBTRACT) {
                    this.setHours(this.getHours() - amountOfTime);
                }
                return this;
            case TimeUnits.MINUTES:
                if (action === ChangeActions.ADD) {
                    this.setMinutes(this.getMinutes() + amountOfTime);
                } else if (action === ChangeActions.SUBTRACT) {
                    this.setMinutes(this.getMinutes() - amountOfTime);
                }
                return this;
            case TimeUnits.SECONDS:
                if (action === ChangeActions.ADD) {
                    this.setSeconds(this.getSeconds() + amountOfTime);
                } else if (action === ChangeActions.SUBTRACT) {
                    this.setSeconds(this.getSeconds() - amountOfTime);
                }
                return this;
            default:
                throw new Error(`Unfortunately, method "${(action === ChangeActions.ADD) ? 'add' : 'subtract'}" does not support such time unit. Please use "YEARS", "MONTHS", "DAYS", "HOURS", "MINUTES" or "SECONDS" as "timeUnits" parameter!!!`);
        }
    }
}

export function richDate(date?: string | number | Date) {
    return (date instanceof Date)
        ? new RichDate(date.getTime())
        : ((typeof date === 'string' && date !== '') || typeof date === 'number')
            ? new RichDate(date)
            : new RichDate();
}
