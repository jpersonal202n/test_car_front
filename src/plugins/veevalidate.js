import Vue from 'vue';

import { ValidationProvider } from 'vee-validate';
import {  ValidationObserver } from 'vee-validate';

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

import { extend } from 'vee-validate';
import { required , email } from "vee-validate/dist/rules";

extend('email',email);
extend('required',required);

