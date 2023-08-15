import { format } from 'date-fns';
import enUs from 'date-fns/locale/en-us';

export function formatValueToLocaleCurrency(value: number) {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export function formatDateToLocale(date: string) {
    return format(new Date(date), "MM/dd/yyyy, hh:mm aa", {
        locale: enUs,
    })
}