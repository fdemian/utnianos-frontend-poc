// Format date.
export const getFormattedDate = (dateSTR) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };
  const formattedDate = dateSTR.replace(" ", "T");
  const date = new Date(formattedDate);
  const storyDate = new Intl.DateTimeFormat("es", options)
                    .format(date).toString();

  return storyDate + " hs";
}

const getRelativeTime = (d1, d2 = new Date()) => {
  const units = {
    year  : 24 * 60 * 60 * 1000 * 365,
    month : 24 * 60 * 60 * 1000 * 365/12,
    day   : 24 * 60 * 60 * 1000,
    hour  : 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
  };
  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  const elapsed = d1 - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u === 'second')
      return rtf.format(Math.round(elapsed/units[u]), u)
}

export default getRelativeTime;
