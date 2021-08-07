
const chunk = (array, n) => Array(Math.ceil(array.length / n))
  .fill().map((_, i) => array.slice(i * n, (i * n) + n));

const getYearsArray = (yearsPerTab, courses) => chunk(courses.reduce((rv, sub) => {
  // de lo contrario estariamos recreando el array en cada vuelta
  // eslint-disable-next-line no-param-reassign
  rv[sub.year] = rv[sub.year] || [];
  rv[sub.year].push(sub);
  return rv;
}, []).map((subArr, year) => ({ year, courses: subArr })).slice(1), yearsPerTab);

export default getYearsArray;
