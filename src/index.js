'use strict';

/**
 * The function creates an element with the given tag, attributes, text and classes
 * @param {string} tag
 * @param {object} attrs
 * @param {string} text
 * @param {string[]} classes
 */
const addElement = (tag, attrs = {}, text = '', classes = []) => {
  const element = document.createElement(tag);
  for (const attr in attrs) {
    element.setAttribute(`${attr}`, `${attrs[attr]}`);
  }
  if (text) {
    element.textContent = String(text);
  }
  element.classList.add(...classes);

  return element;
};

function checkEmail(e) {
  try {
    const regExp1 = /^[a-zA-Z0-9._%+-]+/;
    const regExp2 = /^[a-zA-Z0-9._%+-]+@/;
    const regExp3 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
    const regExp4 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\./;
    const regExp5 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regExp5.test(e.target.value) && e.target.value !== '') {
      emailErrorMsg.classList.add('invalid-value');
      if (!regExp5.test(e.target.value)) {
        emailErrorMsg.textContent =
          'Третя частина повинна мати лише A-Z, a-z у числі від 2 символів';
      }
      if (!regExp4.test(e.target.value)) {
        emailErrorMsg.textContent = 'Після другої частини повинна бути крапка';
      }
      if (!regExp3.test(e.target.value)) {
        emailErrorMsg.textContent =
          'Після @ повинні бути лише A-z, a-z, 0-9, ., -';
      }
      if (!regExp2.test(e.target.value)) {
        emailErrorMsg.textContent =
          'Після першої частини повиннен бути символ @';
      }
      if (!regExp1.test(e.target.value)) {
        errorMsg.textContent =
          'Перша частина повинна мати лише A-Z, a-z, 0-9, ., _, %, +, -';
      }
    } else {
      emailErrorMsg.textContent = '';
      emailErrorMsg.classList.remove('invalid-value');
    }
  } catch (err) {
    console.log(err);
  }
}

function checkPassword(e) {
  try {
    if (e.target.value !== '' && !/^.{4,24}$/.test(e.target.value)) {
      passwordErrorMsg.classList.add('invalid-value');
      passwordErrorMsg.textContent =
        'Пароль повинен бути довжиної від 4 до 24 символів';
    } else {
      passwordErrorMsg.classList.remove('invalid-value');
      passwordErrorMsg.textContent = '';
    }
  } catch (err) {
    console.log(err);
  }
}

function checkConfirmPassword() {
  try {
    if (passwordInput !== '' && passwordInput.value !== passwordConfirmInput.value) {
      passwordConfirmErrorMsg.classList.add('invalid-value');
      passwordConfirmErrorMsg.textContent =
        'Паролі у полі пароля та підтвердження пароля не збігаються';
    } else {
      passwordConfirmErrorMsg.classList.remove('invalid-value');
      passwordConfirmErrorMsg.textContent = '';
    }
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
const passwordsContainer = addElement('div');
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
  passwordsContainer,
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
const lNamInput = addElement('input', {
  type: 'text',
  placeholder: 'Last name',
  required: true,
});
nameContainer.append(fNameInput, lNamInput);

// second inputs block
const displayNameInput = addElement('input', {
  type: 'text',
  placeholder: 'Display Name',
});
const emailContainer = addElement('div');
const emailInput = addElement('input', {
  type: 'email',
  placeholder: 'Email Address',
  required: true,
});
const emailErrorMsg = addElement('div');
displayNameAndEmailContainer.append(displayNameInput, emailContainer);
emailContainer.append(emailInput);
emailContainer.append(emailErrorMsg);
emailInput.addEventListener('keyup', checkEmail);

// third inputs block
const passwordContainer = addElement('div');
const passwordInput = addElement('input', {
  type: 'password',
  placeholder: 'Password',
  required: true,
});
const passwordErrorMsg = addElement('div');
const passwordConfirmContainer = addElement('div');
const passwordConfirmInput = addElement('input', {
  type: 'password',
  placeholder: 'Password Confirmation',
  required: true,
});
const passwordConfirmErrorMsg = addElement('div');
passwordsContainer.append(passwordContainer, passwordConfirmContainer);
passwordContainer.append(passwordInput, passwordErrorMsg);
passwordConfirmContainer.append(passwordConfirmInput, passwordConfirmErrorMsg);
passwordInput.addEventListener('keyup', checkPassword);

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

submitBtn.addEventListener('click', checkConfirmPassword);
