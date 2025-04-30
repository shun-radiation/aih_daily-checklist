export interface InspectionItem {
  label: string | string[];
  frequency:
    | 'every-day'
    | 'daily_weekdays'
    | 'daily_nextdayOfWeekdays'
    | 'first-WeekdayOfWeek'
    | 'last-WeekdayOfWeek'
    | 'every-Wednesday'
    | 'every-Thursday'
    | 'daily_Holidays'
    | 'monthly_first'
    | 'monthly_last'
    | 'quarterly'
    | 'feb_and_aug'
    | 'flexible';
}

export interface InspectionCategory {
  category: string[];
  items: InspectionItem[];
}

export interface DeviceInspection {
  deviceId?: string;
  deviceName?: string;
  inspections: InspectionCategory[];
}
