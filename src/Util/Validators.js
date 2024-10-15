export default function isValid(input) {
  // input should be of form 0000000 or 000-0000 or 0000000000 or 000000-0000
  const regex = /^(\d{3}-\d{4}|\d{7}|\d{6}-\d{4}|\d{10})$/;

  if (regex.test(input)) return true;
  return false;
}
