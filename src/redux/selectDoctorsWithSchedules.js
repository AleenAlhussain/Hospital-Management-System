// src/redux/selectors.js
import { createSelector } from '@reduxjs/toolkit';

const selectDoctors = (state) => state.doctor.doctors;
const selectStaffSchedules = (state) => state.staffSchedule.staffSchedules;

export const selectDoctorsWithSchedules = createSelector(
  [selectDoctors, selectStaffSchedules],
  (doctors, staffSchedules) => {
    return doctors.map((doctor) => {
      const schedules = staffSchedules.filter(
        (sched) => sched.doctor_id === doctor.id
      );
      return { ...doctor, schedules };
    });
  }
);
