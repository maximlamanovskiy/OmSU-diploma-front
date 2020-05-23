const millisecondsInWeek = 6.048e8;

export const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const intervalsValue = ['NONE', 'EVERY_WEEK', 'EACH_EVEN_WEEK', 'EACH_ODD_WEEK'];

export function isWeekEven(date) {
  return Math.floor((date.getTime() / millisecondsInWeek) % 2) === 0;
}
