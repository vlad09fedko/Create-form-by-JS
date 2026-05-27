'use strict';

class Person {
  constructor(...args) {
    args.forEach(({ name, value }) => (this[name] = value));
  }
}

/** The function creates an element with the given tag, attributes, and text
 * @param {string} tag
 * @param {object} attrs
 * @param {string} text
 */
function addElement(tag, attrs = {}, text = '') {
  const element = document.createElement(tag);
  for (const attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }
  if (text) {
    element.textContent = String(text);
  }

  return element;
}

/** The function adds data from all inputs (except passwords, radio buttons and checkboxes) and outputs them to local storage. */
function addToStorage(e) {
  e.preventDefault();
  if (!submitBtn.hasAttribute('disabled')) {
    const data = document.querySelectorAll('.input-field[name]');
    const user = new Person(...data);
    localStorage.setItem(
      user.lName,
      JSON.stringify(
        user,
        (key, value) =>
          key === 'displayName' && value === '' ? 'undefined' : value,
        2,
      ),
    );
  }
}

/** Checks whether the form can be submitted. */
function updateSubmitBtn() {
  const isValid = !(checkEmail() && checkPassword() && checkConfirmPassword());

  submitBtn.classList.toggle('not-working-btn', isValid);
  submitBtn.toggleAttribute('disabled', isValid);
}

/** The function checks the email entered against a regular expression and displays an error in the UI. */
function checkEmail() {
  if (!emailInput.value) {
    toggleError(emailErrorMsg);
    return false;
  }
  if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)
  ) {
    toggleError(emailErrorMsg, 'Email is nod valid!');
    return false;
  }
  toggleError(emailErrorMsg);
  return true;
}

/** The function checks the password against a regular expression and displays an error in the UI. */
function checkPassword() {
  if (!passwordInput.value) {
    toggleError(passwordErrorMsg);
    return false;
  }
  if (!/^.{4,24}$/.test(passwordInput.value)) {
    toggleError(
      passwordErrorMsg,
      'The password must be between 4 and 24 characters long!',
    );
    return false;
  }
  toggleError(passwordErrorMsg);
  return true;
}

/** The function checks the password against the password confirmation and displays an error in the UI. */
function checkConfirmPassword() {
  if (!passwordInput.value || !passwordConfirmInput.value) {
    toggleError(passwordConfirmErrorMsg);
    return false;
  }
  if (passwordInput.value !== passwordConfirmInput.value) {
    toggleError(
      passwordConfirmErrorMsg,
      'The passwords in the password and confirmation password fields do not match!',
    );
    return false;
  }
  toggleError(passwordConfirmErrorMsg);
  return true;
}

/** The function changes the class and text in case of error.
 * @param {obj} errorField
 * @param {string} errorText
 */
function toggleError(errorField, errorText = '') {
  errorField.classList.toggle('error-msg', !!errorText);
  errorField.textContent = errorText;
}

// base structure
const form = addElement('form');
const heading = addElement('h1', {}, 'Create an account');
const quote = addElement(
  'p',
  {},
  'We always keep your name and email address private.',
);
const inputsContainer = addElement('div', { class: 'inputs-container' });
const buyerRadioContainer = addElement('div');
const sellerRadioContainer = addElement('div');
const allowCheckboxContainer = addElement(
  'div',
  { class: 'checkbox-container' },
  '',
);
const submitBtn = addElement('input', {
  class: 'button not-working-btn',
  type: 'submit',
  value: 'Create account',
  disabled: true,
});

// name inputs block
const nameContainer = addElement('div');
const fNameInput = addElement(
  'input',
  {
    class: 'input-field',
    type: 'text',
    placeholder: 'First name',
    required: true,
    name: 'fName',
  },
  '',
);
const lNameInput = addElement(
  'input',
  {
    class: 'input-field',
    type: 'text',
    placeholder: 'Last name',
    required: true,
    name: 'lName',
  },
  '',
);

// display name and email inputs block
const displayNameAndEmailContainer = addElement('div');
const displayNameInput = addElement(
  'input',
  {
    class: 'input-field',
    type: 'text',
    placeholder: 'Display Name',
    name: 'displayName',
  },
  '',
);
const emailContainer = addElement('div', { class: 'input-container' });
const emailInput = addElement(
  'input',
  {
    class: 'input-field',
    type: 'email',
    placeholder: 'Email Address',
    required: true,
    name: 'email',
  },
  '',
);
const emailErrorMsg = addElement('div');
emailInput.addEventListener('input', updateSubmitBtn);

// password inputs block
const passwordsContainer = addElement('div');
const passwordContainer = addElement('div', { class: 'input-container' });
const passwordInput = addElement(
  'input',
  {
    class: 'input-field',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
  '',
);
const passwordErrorMsg = addElement('div');
const passwordConfirmContainer = addElement('div', {
  class: 'input-container',
});
const passwordConfirmInput = addElement(
  'input',
  {
    class: 'input-field',
    type: 'password',
    placeholder: 'Password Confirmation',
    required: true,
  },
  '',
);
const passwordConfirmErrorMsg = addElement('div');
passwordInput.addEventListener('input', updateSubmitBtn);
passwordConfirmInput.addEventListener('input', updateSubmitBtn);

// first radio-container
buyerRadioContainer.classList.add('radio-container');
const radioBtn1 = addElement('input', {
  type: 'radio',
  name: 'radio',
  id: 'buyer',
  required: true,
});
const radioInscriptionsContainer1 = addElement('div');
const radioLabel1 = addElement('label', { for: 'buyer' }, 'Join As a Buyer');
const radioInscription1 = addElement(
  'p',
  {},
  'I am looking for a Name, Logo or Tagline for my business, brand or product',
);

// second radio-container
sellerRadioContainer.classList.add('radio-container');
const radioBtn2 = addElement('input', {
  type: 'radio',
  name: 'radio',
  id: 'seller',
});
const radioInscriptionsContainer2 = addElement('div');
const radioLabel2 = addElement(
  'label',
  { for: 'seller' },
  'Join As a Creative or Marketplace Seller',
);
const radioInscription2 = addElement(
  'p',
  {},
  'I plan to submit name ideas, Logo designs or sell names in Domain Marketplace',
);

// checkbox container
const allowInput = addElement('input', {
  type: 'checkbox',
  id: 'allow',
});
const allowLabel = addElement(
  'label',
  { for: 'allow' },
  'Allow Squadhelp to send marketing/promotional offers from time to time',
);

// submitBtn
form.addEventListener('submit', addToStorage);

// appending
document.body.append(form);
form.append(
  heading,
  quote,
  inputsContainer,
  buyerRadioContainer,
  sellerRadioContainer,
  allowCheckboxContainer,
  submitBtn,
);

inputsContainer.append(
  nameContainer,
  displayNameAndEmailContainer,
  passwordsContainer,
);

nameContainer.append(fNameInput, lNameInput);

displayNameAndEmailContainer.append(displayNameInput, emailContainer);
emailContainer.append(emailInput, emailErrorMsg);

passwordsContainer.append(passwordContainer, passwordConfirmContainer);
passwordContainer.append(passwordInput, passwordErrorMsg);
passwordConfirmContainer.append(passwordConfirmInput, passwordConfirmErrorMsg);

buyerRadioContainer.append(radioBtn1);
buyerRadioContainer.append(radioInscriptionsContainer1);
radioInscriptionsContainer1.append(radioLabel1, radioInscription1);

sellerRadioContainer.append(radioBtn2);
sellerRadioContainer.append(radioInscriptionsContainer2);
radioInscriptionsContainer2.append(radioLabel2, radioInscription2);

allowCheckboxContainer.append(allowInput, allowLabel);
