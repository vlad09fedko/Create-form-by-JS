'use strict';

class Person {
  constructor(firstName, lastName, displayName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName = displayName;
    this.email = email;
  }
}

/**
 * The function creates an element with the given tag, attributes, text and classes
 * @param {string} tag
 * @param {object} attrs
 * @param {string} text
 * @param {string[]} classes
 */
function addElement(tag, attrs = {}, text = '', classes = []) {
  const element = document.createElement(tag);
  for (const attr in attrs) {
    element.setAttribute(`${attr}`, `${attrs[attr]}`);
  }
  if (text) {
    element.textContent = String(text);
  }
  element.classList.add(...classes);

  return element;
}


function addToStorage(e) {
  try {
    if (fNameInput.value === '')
      throw new Error('You must enter a first name!');
    if (lNameInput.value === '') throw new Error('You must enter a last name!');
    if (emailInput.value === '') throw new Error('You must enter an email!');
    const user = new Person(
      fNameInput.value,
      lNameInput.value,
      displayNameInput.value !== '' ? displayNameInput.value : 'undefined',
      emailInput.value,
    );
    localStorage.setItem('User', JSON.stringify(user));
  } catch (err) {
    console.log(err);
  }
}

// base structure
const form = addElement('form');
document.body.append(form);
const heading = addElement('h1', {}, 'Create an account');
const quote = addElement(
  'p',
  {},
  'We always keep your name and email adress private.',
);
const nameContainer = addElement('div');
const displayNameAndEmailContainer = addElement('div');
const passwordContainer = addElement('div');
const buyerRadioContainer = addElement('div');
const sellerRadioContainer = addElement('div');
const allowCheckboxContainer = addElement('div', {}, '', [
  'checkbox-container',
]);
const submitBtn = addElement('input', {
  type: 'submit',
  value: 'Create account',
});
form.append(
  heading,
  quote,
  nameContainer,
  displayNameAndEmailContainer,
  passwordContainer,
  buyerRadioContainer,
  sellerRadioContainer,
  allowCheckboxContainer,
  submitBtn,
);

// first inputs block
const fNameInput = addElement('input', {
  type: 'text',
  placeholder: 'First name',
  required: true,
});
const lNameInput = addElement('input', {
  type: 'text',
  placeholder: 'Last name',
  required: true,
});
nameContainer.append(fNameInput, lNameInput);

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
displayNameAndEmailContainer.append(displayNameInput, emailInput);

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
passwordContainer.append(passwordInput, passwordConfirmInput);

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
buyerRadioContainer.append(radioBtn1);
buyerRadioContainer.append(radioInscriptionsContainer1);
radioInscriptionsContainer1.append(radioLabel1, radioInscription1);

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
sellerRadioContainer.append(radioBtn2);
sellerRadioContainer.append(radioInscriptionsContainer2);
radioInscriptionsContainer2.append(radioLabel2, radioInscription2);

// checkbox container
const allowInput = addElement('input', { type: 'checkbox', id: 'allow' });
const allowLabel = addElement(
  'label',
  { for: 'allow' },
  'Allow Squadhelp to send marketing/promotional offers from time to time',
);
allowCheckboxContainer.append(allowInput, allowLabel);

// submitBtn
submitBtn.addEventListener('click', addToStorage);
