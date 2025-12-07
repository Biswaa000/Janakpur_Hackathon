export const validateReportForm = (form) => {
  const errors = {};
  if (!form.incidentTitle) errors.incidentTitle = 'Incident Title is required';
  if (!form.description) errors.description = 'Description is required';
  if (!form.dateTime) errors.dateTime = 'Date & Time is required';
  if (!form.location) errors.location = 'Location is required';
  if (!form.victimPhoneNumber) errors.victimPhoneNumber = 'Phone number is required';
  return errors;
};
