
export const getCourseStatus = (subject, coursesStatus) =>
coursesStatus.filter(c => c.courseCode === subject.code)[0];

export const getCoursePrerrequisites = (courseCode, prerrequisites) =>
prerrequisites.filter(p => p.courseCode === courseCode);

const courseReqSatisfy = (statusCode, requiredStatus) => {
    if(requiredStatus === "F")
      return statusCode === "F";

    return (statusCode === "C" || statusCode === "F");
}

export const prerreqSatisfy = (req, statuses) => {

  const filteredStatuses = statuses.find(s =>
    s.courseCode === req.prerrequisiteCode &&
    courseReqSatisfy(s.completionCode, req.completionCode)
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
  const idsList = prerrequisites.map(p => p.prerrequisiteCode);
  const prerreqs = courses.filter(p => idsList.includes(p.code));

  return prerreqs;
}
