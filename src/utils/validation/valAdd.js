  import Swal from 'sweetalert2';
  import dayjs from 'dayjs'
  export const validateUsername = (username) => {
    const trimmedUsername = username.trim();
    return trimmedUsername.length >= 8 && trimmedUsername.length <= 20;
  };

  export const validatePassword = (password) => {
    const trimmedPassword = password.trim();
    return trimmedPassword.length >= 8 && trimmedPassword.length <= 20;
  };

  export const validateFirstname = (firstname) => {
    return firstname.trim().length >0 && firstname.trim().length <= 20;
  };

  export const validateLastname = (lastname) => {
    return lastname.trim().length >0  && lastname.trim().length <= 20;
  };
  export const validatePhoneNumber = (phoneNumber) => {
    const trimmedPhoneNumber = phoneNumber.trim();
    const phoneNumberPattern = /^\d{10}$/; // Ensure the phone number is exactly 10 digits
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
      showAlert('Error!', 'First name must bebettwen 0 and 20 characters.', 'error');
      return false;
    }

    if (!validateLastname(lastname)) {
      showAlert('Error!', 'Last name must be between 0 and  20 characters.', 'error');
      return false;
    }

    return true;
  };
  export const validateEditForm = (password , firstname, lastname ,phoneNumber, address ) => { 
    if (!validatePassword(password)) {
      showAlert('Error!', 'Password must be between 8 and 20 characters.', 'error');
      return false;
    }

    if (!validateFirstname(firstname)) {
      showAlert('Error!', 'First name must bebettwen 0 and 20 characters.', 'error');
      return false;
    }

    if (!validateLastname(lastname)) {
      showAlert('Error!', 'Last name must be between 0 and  20 characters.', 'error');
      return false;
    }
    if(!validatePhoneNumber(phoneNumber)){
      showAlert('Error','phone number must be 10 digit ','error');
      return false;
    }
 
    if(!validateAddress(address)){
      showAlert('Error','Addres must be betweenn 1 and 50 character ','error');
      return false;
    }
    return true ;
  };
  export const formattedDate2 = (date2) => {
    const shortDateFormat = dayjs(date2).format("YYYY-MM-DD");
    return shortDateFormat;
  }
