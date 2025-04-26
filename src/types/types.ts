export interface InspectionItem {
  label: string;
  frequency:
    | 'daily_weekdays'
    | 'first-WeekdayOfWeek'
    | 'last-WeekdayOfWeek'
    | 'every-Wednesday'
    | 'monthly_first'
    | 'monthly_last'
    | 'flexible';
}

export interface InspectionCategory {
  category: string[];
  items: InspectionItem[];
}

export interface DeviceInspection {
  deviceId: string;
  deviceName: string;
  inspections: InspectionCategory[];
}
