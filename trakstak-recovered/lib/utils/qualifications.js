export const getTaskQualificationPrompt = (staffProfile, taskRequirements) => {
  return `
Staff Profile: ${JSON.stringify(staffProfile)}
Task Requirements: ${JSON.stringify(taskRequirements)}

Based on the required skills and the staff profile, is this staff member qualified to perform this task?  
If not, list the missing skills and recommend a training or supervisor action.
`.trim();
};
