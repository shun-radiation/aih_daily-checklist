// src/types/japanese-holidays.d.ts
declare module 'japanese-holidays' {
  export function getHolidaysOf(year: number): { date: Date; name: string }[];
  //   export function isHoliday(date: Date): string | null;
}
