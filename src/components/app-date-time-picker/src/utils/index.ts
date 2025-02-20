import { getDaysInMonth, addMonths, addDays, set } from 'date-fns';
import { regexpValidator } from '@/utils/regexpValidator';
import { AppDateTimePickerType } from '../enums/dateTimePickerType';
import { timeFormatRegex } from '@/const/timeRegexp.const';
import { AppDateTimePickerMode } from '../enums/dateTimePickerMode';

export function setTime(
  date: Date,
  time: string | string[] = '',
  index?: number
) {
  const timeValue =
    Array.isArray(time) && !isNaN(Number(index))
      ? time[index as number]
      : (time as string);
  const [hours, minutes, seconds] = (
    typeof timeValue === 'string' ? timeValue : ''
  )
    .split(':')
    .map(Number);

  return set(date, {
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: seconds || 0,
    milliseconds: 0,
  });
}

export function isDisabledMonth(date: Date, fn?: (val: Date) => boolean) {
  if (fn) {
    const daysInMonth = getDaysInMonth(date);
    for (let day = 0; day <= daysInMonth; day++) {
      const chekingDate = addDays(date, day);
      if (!fn(chekingDate)) {
        return false;
      } else {
        return true;
      }
    }
  }

  return false;
}

export function isDisabledYear(date: Date, fn?: (val: Date) => boolean) {
  if (fn) {
    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(addMonths(date, month));

      for (let day = 0; day <= daysInMonth; day++) {
        const chekingDate = addDays(date, day);
        if (!fn(chekingDate)) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  return false;
}

export function isValidType(value: unknown) {
  if (typeof value !== 'string') return false;

  return Object.values(AppDateTimePickerType).includes(
    value as AppDateTimePickerType
  );
}

export function isValidFirstDayOfWeek(value: unknown) {
  if (typeof value !== 'number') return false;

  return [1, 2, 3, 4, 5, 6, 7].includes(value);
}

export function isValidDefaultTime(value: unknown) {
  if (Array.isArray(value) && value.length) {
    return value.every(time => regexpValidator(time, timeFormatRegex));
  }

  return regexpValidator(value, timeFormatRegex);
}

export function isValidWeekdayFormat(value: unknown) {
  if (typeof value !== 'string') return false;

  return ['long', 'short', 'narrow'].includes(value);
}

export function isValidMonthFormat(value: unknown) {
  if (typeof value !== 'string') return false;

  return ['long', 'short', 'narrow', 'numeric', '2-digit'].includes(value);
}

export function isValidMode(value: unknown) {
  if (typeof value !== 'string') return false;

  return Object.values(AppDateTimePickerMode).includes(
    value as AppDateTimePickerMode
  );
}
