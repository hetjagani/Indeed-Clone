export default function changeDateFormat(inputDate) { // expects Y-m-d
  const splitDate = inputDate.split('-');
  if (splitDate.count === 0) {
    return null;
  }

  const year = splitDate[0];
  const month = splitDate[1];
  const day = splitDate[2];

  return `${month}/${day}/${year}`;
}
