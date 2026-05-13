'use strict';

// base structure
const body = document.body;
const form = document.createElement('form');
body.append(form);
const h1 = document.createElement('h1');
const p = document.createElement('p');
const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');
const div4 = document.createElement('div');
const div5 = document.createElement('div');
const div6 = document.createElement('div');
const submitBtn = document.createElement('input');
form.append(h1, p, div1, div2, div3, div4, div5, div6, submitBtn);

// inscriptions
h1.append('Create an account');
p.append('We always keep your name and email adress private.');

// first inputs block
const input1_1 = document.createElement('input');
const input1_2 = document.createElement('input');
div1.append(input1_1, input1_2);
input1_1.setAttribute('type', 'text');
input1_1.setAttribute('placeholder', 'First name');
input1_1.setAttribute('required', 'true');
input1_2.setAttribute('type', 'text');
input1_2.setAttribute('placeholder', 'Last name');
input1_2.setAttribute('required', 'true');

// second inputs block
const input2_1 = document.createElement('input');
const input2_2 = document.createElement('input');
div2.append(input2_1, input2_2);
input2_1.setAttribute('type', 'text');
input2_1.setAttribute('placeholder', 'Display Name');
input2_1.setAttribute('required', 'true');
input2_2.setAttribute('type', 'email');
input2_2.setAttribute('placeholder', 'Email Address');
input2_2.setAttribute('required', 'true');

// third inputs block
const input3_1 = document.createElement('input');
const input3_2 = document.createElement('input');
div3.append(input3_1, input3_2);
input3_1.setAttribute('type', 'password');
input3_1.setAttribute('placeholder', 'Password');
input3_1.setAttribute('required', 'true');
input3_2.setAttribute('type', 'password');
input3_2.setAttribute('placeholder', 'Password Confirmation');
input3_2.setAttribute('required', 'true');

// first radio-container
div4.classList.add('radio-container');
const inputRadio4_1 = document.createElement('input');
const div4_1 = document.createElement('div');
const label4_1 = document.createElement('label');
const p4_1 = document.createElement('p');
div4.append(inputRadio4_1);
div4.append(div4_1);
inputRadio4_1.setAttribute('type', 'radio');
inputRadio4_1.setAttribute('id', 'buyer');
inputRadio4_1.setAttribute('checked', 'true');
div4_1.append(label4_1, p4_1);
label4_1.setAttribute('for', 'buyer');
label4_1.append('Join As a Buyer');
p4_1.append(
  'I am looking for a Name, Logo or Tagline for my busyness, brand or product',
);

// second radio-container
div5.classList.add('radio-container');
const inputRadio5_1 = document.createElement('input');
const div5_1 = document.createElement('div');
const label5_1 = document.createElement('label');
const p5_1 = document.createElement('p');
div5.append(inputRadio5_1);
div5.append(div5_1);
inputRadio5_1.setAttribute('type', 'radio');
inputRadio5_1.setAttribute('id', 'buyer');
div5_1.append(label5_1, p5_1);
label5_1.setAttribute('for', 'buyer');
label5_1.append('Join As a Creative or Marketplace Seller');
p5_1.append(
  'I plan to submit name ideas, Logo designs or sell names in Domain Marketplace',
);

// checkbox container
div6.classList.add('checkbox-container');
const input6_1 = document.createElement('input');
const label6_1 = document.createElement('label');
div6.append(input6_1, label6_1);
input6_1.setAttribute('type', 'checkbox');
input6_1.setAttribute('id', 'allow');
label6_1.setAttribute('for', 'allow');
label6_1.append(
  'Allow Squadhelp to send marketing/promotional offers from time to time',
);

// submit button
submitBtn.setAttribute('type', 'submit');
submitBtn.setAttribute('value', 'Create account');