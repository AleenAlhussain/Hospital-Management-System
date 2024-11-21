import { createSelector } from '@reduxjs/toolkit';

const selectNurses = (state) => state.nurse.nurses;
const selectStaffSchedules = (state) => state.staffSchedule.staffSchedules;

export const selectNursesWithSchedules = createSelector(
  [selectNurses, selectStaffSchedules],
  (nurses, staffSchedules) => {
    return nurses.map((nurse) => {
      const schedules = staffSchedules.filter(
        (sched) => sched.Nurse_id === nurse.id
      );
      return { ...nurse, schedules };
    });
  }
);
