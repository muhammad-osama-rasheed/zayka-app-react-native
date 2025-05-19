//? SIGNUP_VALIDATOR
export const validation = () => {
  let validName = true;
  let validEmail = true;
  let validPassword = true;

  if (name === '') {
    setBadName('Please enter your name.');
    validName = false;
  } else if (name !== '' && name.length < 3) {
    setBadName('Name should be at least 3 characters long.');
    validName = false;
  } else {
    setBadName('');
    validName = true;
  }

  if (email === '') {
    setBadEmail('Please enter your email.');
    validEmail = false;
  } else if (
    email !== '' &&
    !/^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|szabist\.pk)$/.test(
      email,
    )
  ) {
    setBadEmail('Please enter a valid email.');
    validEmail = false;
  } else {
    setBadEmail('');
    validEmail = true;
  }

  if (password === '') {
    setBadPassword('Please enter your password.');
    validPassword = false;
  } else if (password.length < 6) {
    setBadPassword('Password should be at least 6 characters long.');
    validPassword = false;
  } else {
    setBadPassword('');
    validPassword = true;
  }

  return validName && validEmail && validPassword;
};
