'use strict';

/**
 * The function creates an element with the given tag, attributes and text
 * @param {string} tag
 * @param {object} attrs
 * @param {string} text
 */
const addElement = (tag, attrs = {}, text = '') => {
  const element = document.createElement(tag);
  for (const attr in attrs) {
    element.setAttribute(`${attr}`, `${attrs[attr]}`);
  }
  if (text) {
    element.textContent = String(text);
  }

  return element;
};

// base structure
const form = addElement('form');
document.body.append(form);
const heading = addElement('h1', {}, 'Create an account');
const quote = addElement(
  'p',
  {},
  'We always keep your name and email adress private.',
);
const inputContainer1 = addElement('div');
const inputContainer2 = addElement('div');
const inputContainer3 = addElement('div');
const radioContainer1 = addElement('div');
const radioContainer2 = addElement('div');
const checkboxContainer = addElement('div');
const submitBtn = addElement('input', {
  type: 'submit',
  value: 'Create account',
});
form.append(
  heading,
  quote,
  inputContainer1,
  inputContainer2,
  inputContainer3,
  radioContainer1,
  radioContainer2,
  checkboxContainer,
  submitBtn,
);

// first inputs block
const fNameInput = addElement('input', {
  type: 'text',
  placeholder: 'First name',
  required: true,
});
const lNamInput = addElement('input', {
  type: 'text',
  placeholder: 'Last name',
  required: true,
});
inputContainer1.append(fNameInput, lNamInput);

// second inputs block
const displayNameInput = addElement('input', {
  type: 'text',
  placeholder: 'Display Name',
});
const emailInput = addElement('input', {
  type: 'email',
  placeholder: 'Email Address',
  required: true,
});
inputContainer2.append(displayNameInput, emailInput);

// third inputs block
const passwordInput = addElement('input', {
  type: 'password',
  placeholder: 'Password',
  required: true,
});
const passwordConfirmInput = addElement('input', {
  type: 'password',
  placeholder: 'Password Confirmation',
  required: true,
});
inputContainer3.append(passwordInput, passwordConfirmInput);

// first radio-container
radioContainer1.classList.add('radio-container');
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
radioContainer1.append(radioBtn1);
radioContainer1.append(radioInscriptionsContainer1);
radioInscriptionsContainer1.append(radioLabel1, radioInscription1);

// second radio-container
radioContainer2.classList.add('radio-container');
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
radioContainer2.append(radioBtn2);
radioContainer2.append(radioInscriptionsContainer2);
radioInscriptionsContainer2.append(radioLabel2, radioInscription2);

// checkbox container
checkboxContainer.classList.add('checkbox-container');
const checkboxInput = addElement('input', { type: 'checkbox', id: 'allow' });
const checkboxLabel = addElement(
  'label',
  { for: 'allow' },
  'Allow Squadhelp to send marketing/promotional offers from time to time',
);
checkboxContainer.append(checkboxInput, checkboxLabel);
