import React, { FC } from 'react';
import { DeviceInspection, InspectionCategory } from '../../types';
import { TableRow } from '@mui/material';

type ListItemsProps = {
  inspectionData: DeviceInspection;
  StyledTableCell: React.ElementType;
  checkItemHight: number;
  daysInMonth: number;
  dailyChecklistYear: number;
  dailyChecklistMonth: number;
  getDayInfo: (
    year: number,
    month: number,
    day: number
  ) => {
    label: number;
    weekday: string;
    dayOfWeek: number;
  };
  hasWhiteCellInSection: (section: InspectionCategory, day: number) => boolean;
  shouldRenderCell: (day: number, frequency: string) => boolean;
};

const DailyCheckListItems: FC<ListItemsProps> = ({
  inspectionData,
  StyledTableCell,
  checkItemHight,
  daysInMonth,
  dailyChecklistYear,
  dailyChecklistMonth,
  getDayInfo,
  hasWhiteCellInSection,
  shouldRenderCell,
}) => {
  return (
    <>
      {inspectionData.inspections.map((section, sectionIndex) => {
        return section.items.map((item, itemIndex) => {
          const isFirst = itemIndex === 0;
          return (
            <TableRow key={`${sectionIndex}-${itemIndex}`}>
              {isFirst && (
                <StyledTableCell
                  rowSpan={section.items.length}
                  sx={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    fontWeight: 'bold',
                    backgroundColor: '#f0f0f0',
                    border: '3px solid black',
                  }}
                >
                  {section.category}
                </StyledTableCell>
              )}

              <StyledTableCell
                sx={{
                  borderRight: '3px solid black',
                  borderTop:
                    itemIndex === 0 ? '3px solid black' : '1px solid black',
                  width: '25%',
                  height: `${checkItemHight}mm`,
                  textAlign:
                    item.label !== '実施者サイン' &&
                    item.label !== '画質確認者サイン'
                      ? 'left'
                      : 'right',
                  px: 2,
                }}
              >
                {item.label}
              </StyledTableCell>
              {[...Array(daysInMonth)].map((_, dayIndex) => {
                const dayInfo = getDayInfo(
                  dailyChecklistYear,
                  dailyChecklistMonth,
                  dayIndex + 1
                );
                return (
                  dayInfo.weekday !== '日' &&
                  dayInfo.weekday !== '土' && (
                    <StyledTableCell
                      key={dayIndex}
                      sx={{
                        height: `${checkItemHight}mm`,
                        borderTop:
                          itemIndex === 0
                            ? '3px solid black'
                            : '1px solid black',
                        backgroundColor:
                          item.frequency === 'flexible'
                            ? hasWhiteCellInSection(section, dayIndex + 1)
                              ? 'white'
                              : 'lightblue'
                            : shouldRenderCell(dayIndex + 1, item.frequency)
                            ? 'white'
                            : 'lightblue',
                        borderRight:
                          dayInfo.weekday === '金' ||
                          dayIndex + 1 === daysInMonth
                            ? '3px solid black'
                            : '1px solid black',
                      }}
                    >
                      &nbsp;
                    </StyledTableCell>
                  )
                );
              })}
            </TableRow>
          );
        });
      })}
    </>
  );
};

export default DailyCheckListItems;
