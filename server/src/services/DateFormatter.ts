import * as moment from 'moment'

export const isValidISOString = (isoString?: string): boolean => {
    return !isNaN(Date.parse(isoString))
}

export const getCurrentISOStringDate = (): string => {
    return moment().toISOString()
}

export const getISOStringFromDate = (date?: Date): string | null => {
    if (date instanceof Date) {
        return date.toISOString()
    }

    return null
}

export const getDateFromISOString = (isoString?: string): Date | null => {
    if (typeof isoString === 'undefined' || isoString === null || !isValidISOString(isoString)) {
        return null
    }

    const date = new Date(isoString)

    return date
}
