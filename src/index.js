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
    element.setAttribute(`${attr}`, `${attrs[attr]}`);
  }
  if (text) {
    element.textContent = String(text);
  }

  return element;
}

function checkDisplayName(key, value) {
  if (key === 'displayName' && value === '') return 'undefined';
  return value;
}

function addToStorage() {
  try {
    const data = Array.from(document.querySelectorAll('.input-field[name]'));
    const user = new Person(...data);
    localStorage.setItem(user.lName, JSON.stringify(user, checkDisplayName, 2));
  } catch (err) {
    console.log(err);
  }
}

// base structure
const form = addElement('form');
const heading = addElement('h1', {}, 'Create an account');
const quote = addElement(
  'p',
  {},
  'We always keep your name and email adress private.',
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

// password inputs block
const passwordContainer = addElement('div');
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
  'I am looking for a Name, Logo or Tagline for my busyness, brand or product',
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
submitBtn.addEventListener('click', addToStorage);

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
  passwordContainer,
);

nameContainer.append(fNameInput, lNameInput);
displayNameAndEmailContainer.append(displayNameInput, emailInput);
passwordContainer.append(passwordInput, passwordConfirmInput);

buyerRadioContainer.append(radioBtn1);
buyerRadioContainer.append(radioInscriptionsContainer1);
radioInscriptionsContainer1.append(radioLabel1, radioInscription1);

sellerRadioContainer.append(radioBtn2);
sellerRadioContainer.append(radioInscriptionsContainer2);
radioInscriptionsContainer2.append(radioLabel2, radioInscription2);

allowCheckboxContainer.append(allowInput, allowLabel);
