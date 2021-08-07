
export const getCourseStatus = (subject, coursesStatus) =>
coursesStatus.filter(c => c.courseId === subject.id)[0];

export const getCoursePrerrequisites = (courseId, prerrequisites) =>
prerrequisites.filter(p => p.courseId === courseId);

export const prerreqSatisfy = (req, statuses) => {
  const filteredStatuses = statuses.find(s =>
    s.courseId === req.prerrequisiteId &&
    s.completionId >= req.completionId
  );

  return filteredStatuses !== undefined;
}

export const hasPrerrequisites = (prerrequisites, coursesStatus) => {

  // The course has no prerrequisites.
  if(prerrequisites.length === 0)
    return true;

  return prerrequisites.every(req => prerreqSatisfy(req, coursesStatus));
}

export const getPrerreqList = (courses, prerrequisites) => {
  const idsList = prerrequisites.map(p => p.prerrequisiteId);
  const prerreqs = courses.filter(p => idsList.includes(p.id));

  return prerreqs;
}
