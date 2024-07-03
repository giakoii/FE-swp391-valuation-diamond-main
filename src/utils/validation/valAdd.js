import Swal from 'sweetalert2';
import dayjs from 'dayjs';

export const validateUsername = (username) => {
  const trimmedUsername = username.trim();
  return trimmedUsername.length >= 8 && trimmedUsername.length <= 20;
};

export const validatePassword = (password) => {
  const trimmedPassword = password.trim();
  return trimmedPassword.length >= 8 && trimmedPassword.length <= 20;
};

export const validateFirstname = (firstname) => {
  const trimmedFirstname = firstname.trim();
  const namePattern = /^[A-Za-z]+$/; // Only alphabetic characters
  return namePattern.test(trimmedFirstname) && trimmedFirstname.length > 0 && trimmedFirstname.length <= 20;
};

export const validateLastname = (lastname) => {
  const trimmedLastname = lastname.trim();
  const namePattern = /^[A-Za-z]+$/; // Only alphabetic characters
  return namePattern.test(trimmedLastname) && trimmedLastname.length > 0 && trimmedLastname.length <= 20;
};

export const validatePhoneNumber = (phoneNumber) => {
  const trimmedPhoneNumber = phoneNumber.trim();
  const phoneNumberPattern = /^0\d{9}$/; // Ensure the phone number starts with 0 and is exactly 10 digits
  return phoneNumberPattern.test(trimmedPhoneNumber);
};

export const validateAddress = (address) => {
  return address.trim().length > 0 && address.length <= 50;
};

export const showAlert = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
  });
};

export const validateForm = (username, password, confirmPassword, firstname, lastname) => {
  if (password !== confirmPassword) {
    showAlert('Error!', 'Confirm Password failed.', 'error');
    return false;
  }

  if (!validateUsername(username)) {
    showAlert('Error!', 'Username must be between 8 and 20 characters.', 'error');
    return false;
  }

  if (!validatePassword(password)) {
    showAlert('Error!', 'Password must be between 8 and 20 characters.', 'error');
    return false;
  }

  if (!validateFirstname(firstname)) {
    showAlert('Error!', 'First name must be between 1 and 20 characters and contain only letters.', 'error');
    return false;
  }

  if (!validateLastname(lastname)) {
    showAlert('Error!', 'Last name must be between 1 and 20 characters and contain only letters.', 'error');
    return false;
  }

  return true;
};

export const validateEditForm = (password, firstname, lastname, phoneNumber, address) => {
  if (!validatePassword(password)) {
    showAlert('Error!', 'Password must be between 8 and 20 characters.', 'error');
    return false;
  }

  if (!validateFirstname(firstname)) {
    showAlert('Error!', 'First name must be between 1 and 20 characters and contain only letters.', 'error');
    return false;
  }

  if (!validateLastname(lastname)) {
    showAlert('Error!', 'Last name must be between 1 and 20 characters and contain only letters.', 'error');
    return false;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    showAlert('Error', 'Phone number must be 10 digits and start with 0.', 'error');
    return false;
  }

  if (!validateAddress(address)) {
    showAlert('Error', 'Address must be between 1 and 50 characters.', 'error');
    return false;
  }

  return true;
};

export const formattedDate2 = (date2) => {
  const shortDateFormat = dayjs(date2).format("YYYY-MM-DD");
  return shortDateFormat;
};
