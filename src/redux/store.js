import { configureStore } from '@reduxjs/toolkit';
import departmentReducer from './departmentSlice';
import roomReducer from './roomSlice';
import doctorReducer from './doctorSlice';
import authReducer from './authSlice'
import serviceReducer from './serviceSlice';
import patientReducer from './patientSlice';
import nurseReducer from './nurseSlice';
import medicalRecordReducer from './medicalRecordSlice';
import receptionistReducer from './receptionistSlice';
import surgicalOperationReducer from './surgicalOperationSlice';
import patientServiceReducer from './patientServiceSlice';
import AdmissionReducer from './admissionSlice';
import roomAvailabilityReducer from './roomAvailabilitySlice';
import staffReducer from './staffScheduleSlice';
import shiftReducer from './shiftSlice';
import appointmentReducer from './appointmentSlice';
export const store = configureStore({
  reducer: {
     department: departmentReducer,
    room: roomReducer,
    doctor: doctorReducer,
    auth: authReducer,
    services: serviceReducer,
    patients: patientReducer,
    nurse: nurseReducer,
    medicalRecord: medicalRecordReducer,
    receptionist: receptionistReducer,
    surgicalOperation: surgicalOperationReducer,
    patientService: patientServiceReducer,
    admission: AdmissionReducer,
    roomAvailability: roomAvailabilityReducer,
    staffSchedule : staffReducer,
    shift: shiftReducer,
    appointment: appointmentReducer,
  },
});

