'use strict';

class Person {
  constructor(...args) {
    args.forEach(({ name, value }) => (this[name] = value));
  }
}

/**
 * The function creates an element with the given tag, attributes, and text
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
/**
 * The function changes the displayName field to undefined if the field is empty. Used as a replacer in the .stringify() method.
 */
function checkDisplayName(key, value) {
  if (key === 'displayName' && value === '') return 'undefined';
  return value;
}

/**
 * The function adds data from all inputs (except passwords, radio buttons and checkboxes) and outputs them to local storage.
 */
function addToStorage(e) {
  try {
    e.preventDefault();
    if (!submitBtn.hasAttribute('disabled')) {
      // ?
      const data = document.querySelectorAll('.input-field[name]');
      const user = new Person(...data);
      localStorage.setItem(
        user.lName,
        JSON.stringify(user, checkDisplayName, 2),
      );
    } else {
      throw new Error('You have an error!');
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * The function checks the email entered against a regular expression and displays an error in the UI.
 */
function checkEmail() {
  try {
    // ~~~~~~~~~~~~ My decision ~~~~~~~~~~~~
    // const regExp1 = /^[a-zA-Z0-9._%+-]+/;
    // const regExp2 = /^[a-zA-Z0-9._%+-]+@/;
    // const regExp3 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
    // const regExp4 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\./;
    // const regExp5 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (e.target.value !== '' && !regExp5.test(e.target.value)) {
    //   emailErrorMsg.classList.add('invalid-value');
    //   emailErrorMsg.textContent =
    //     'The third part should have only A-Z, a-z in the number of 2 characters or more';
    //   if (!regExp1.test(e.target.value)) {
    //     emailErrorMsg.textContent =
    //       'The first part should only have A-Z, a-z, 0-9, ., _, %, +, -';
    //   } else if (!regExp2.test(e.target.value)) {
    //     emailErrorMsg.textContent =
    //       'The first part must be followed by the @ symbol';
    //   } else if (!regExp3.test(e.target.value)) {
    //     emailErrorMsg.textContent =
    //       'After @ should be only A-z, a-z, 0-9, ., -';
    //   } else if (!regExp4.test(e.target.value)) {
    //     emailErrorMsg.textContent = 'There should be a . after the second part';
    //   }
    //   return false;
    // } else {
    //   removeError(emailErrorMsg);
    //   return true;
    // }

    // ~~~~~~~~~~~~ AI decision ~~~~~~~~~~~~
    const value = emailInput.value;

    const part1 = '[a-zA-Z0-9._%+-]+';
    const part2 = '[a-zA-Z0-9.-]+';
    const part3 = '[a-zA-Z]{2,}';
    const validationSteps = [
      {
        pattern: new RegExp(`^${part1}`),
        msg: 'The first part should only have A-Z, a-z, 0-9, ., _, %, +, -',
      },
      {
        pattern: new RegExp(`^${part1}@`),
        msg: 'The first part must be followed by the @ symbol',
      },
      {
        pattern: new RegExp(`^${part1}@${part2}`),
        msg: 'After @ should be only A-z, a-z, 0-9, ., -',
      },
      {
        pattern: new RegExp(`^${part1}@${part2}\\.`),
        msg: 'There should be a . after the second part',
      },
      {
        pattern: new RegExp(`^${part1}@${part2}\\.${part3}$`),
        msg: 'The third part should have only A-Z, a-z in the number of 2 characters or more',
      },
    ];

    const failedStep = validationSteps.find(step => !step.pattern.test(value));

    removeError(emailErrorMsg);
    if (failedStep && value !== '') {
      addError(emailErrorMsg, failedStep.msg);
      return false;
    } else {
      removeError(emailErrorMsg);
      return true;
    }
    if (value === '') {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * The function checks the password against a regular expression and displays an error in the UI.
 */
function checkPassword() {
  try {
    const value = passwordInput.value;
    if (value !== '' && !/^.{4,24}$/.test(value)) {
      addError(
        passwordErrorMsg,
        'The password must be between 4 and 24 characters long',
      );
      return false;
    } else {
      removeError(passwordErrorMsg);
      return true;
    }
    if (value === '') {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * The function checks the password against the password confirmation and displays an error in the UI.
 */
function checkConfirmPassword() {
  try {
    if (passwordInput.value === '' || passwordConfirmInput.value === '') {
      removeError(passwordConfirmErrorMsg);
      return false;
    } else if (passwordInput.value !== passwordConfirmInput.value) {
      addError(
        passwordConfirmErrorMsg,
        'The passwords in the password and confirmation password fields do not match',
      );
      return false;
    } else {
      removeError(passwordConfirmErrorMsg);
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * The function adds the passed error to the passed field.
 * @param {obj} errorField
 * @param {string} errorText
 */
function addError(errorField, errorText) {
  errorField.classList.add('error-msg');
  errorField.textContent = errorText;
}

/**
 * The function removes the error from the passed field.
 * @param {obj} errorField
 */
function removeError(errorField) {
  errorField.classList.remove('error-msg');
  errorField.textContent = '';
}

/**
 * Adds the ability to submit a form.
 */
function addSending() {
  submitBtn.classList.remove('not-working-btn');
  submitBtn.removeAttribute('disabled');
}

/**
 * Removes the ability to submit a form.
 */
function removeSending() {
  submitBtn.classList.add('not-working-btn');
  submitBtn.setAttribute('disabled', 'true');
}

/**
 * Checks whether the form can be submitted.
 */
function updateSubmitBtn() {
  if (checkEmail() && checkPassword() && checkConfirmPassword()) {
    addSending();
  } else {
    removeSending();
  }
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
  class: 'button',
  type: 'submit',
  value: 'Create account',
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
removeSending();
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
