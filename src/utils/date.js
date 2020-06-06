export const millisecondsInWeek = 6.048e8;
export const millisecondsInDay = 8.64e7;

export const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export const intervalsValue = ['NONE', 'EVERY_WEEK', 'EACH_EVEN_WEEK', 'EACH_ODD_WEEK'];

export function isOccupiedFunc(item) {
  return item.timeBlock.id === this.id;
}

export function isWeekEven(date) {
  return Math.floor((date.getTime() / millisecondsInWeek) % 2) === 0;
}

export const convertPeriods = dates => period => {
  if (period.interval === intervalsValue[0]) {
    dates.push({
      eventPeriodId: period.id,
      date: period.dateFrom,
      classroom: period.classroom.classroomNumber,
      classroomId: period.classroom.id,
      timeBlockId: period.timeBlock.id,
      timeFrom: period.timeBlock.timeFrom,
      timeTo: period.timeBlock.timeTo,
    });
    return;
  }
  const startDate = new Date(period.dateFrom);
  const endDate = new Date(period.dateTo);
  const intervalOfPeriod = period.interval === intervalsValue[1] ? 7 : 14;
  if (
    (period.interval === intervalsValue[2] && !isWeekEven(startDate)) ||
    (period.interval === intervalsValue[3] && isWeekEven(startDate))
  ) {
    startDate.setDate(startDate.getDate() + 7);
  }
  while (endDate.getTime() - startDate.getTime() >= 0) {
    dates.push({
      eventPeriodId: period.id,
      date: startDate.toISOString().slice(0, 10),
      classroom: period.classroom.classroomNumber,
      timeFrom: period.timeBlock.timeFrom,
      timeTo: period.timeBlock.timeTo,
    });
    startDate.setDate(startDate.getDate() + intervalOfPeriod);
  }
};
