export interface InspectionItem {
  label: string;
  frequency:
    | 'daily_weekdays'
    | 'weekly_friday'
    | 'monthly_first'
    | 'monthly_last'
    | 'flexible';
}

export interface InspectionCategory {
  category: string;
  items: InspectionItem[];
}

export interface DeviceInspection {
  deviceId: string;
  deviceName: string;
  inspections: InspectionCategory[];
}
