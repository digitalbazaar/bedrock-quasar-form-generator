/*!
  * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
  */
'use strict';

import quasar from 'quasar';

const DEFAULT_ICONS = {
  'fontawesome-v5': {
    showField: 'fas fa-eye-slash',
    hideField: 'fas fa-eye'
  },
  'material-icons': {
    showField: 'visibility',
    hideField: 'visibility_off'
  }
};

export const fieldMixin = {
  props: {
    field: {
      type: Object,
      required: true
    },
    validation: {
      type: Object,
      required: true
    },
    value: {
      required: true
    }
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event)
      };
    },
    errorMessage() {
      if(!(this.field.validation && this.field.validation.errors)) {
        return '';
      }
      // select error message from most specific to least specific
      const {validation: {errors}} = this.field;
      for(const key in this.validation) {
        if(key.startsWith('$')) {
          // ignore special keys
          continue;
        }
        if(this.validation[key]) {
          // value is valid, continue
          continue;
        }
        if(key in errors) {
          return errors[key];
        }
      }
      return errors.invalid || errors.error || '';
    },
    hideIcon() {
      return this.$q.iconSet.passwordField.hideField;
    },
    showIcon() {
      return this.$q.iconSet.passwordField.showField;
    },
  },
  beforeCreate() {
    // set default icons
    const defaultIcons = DEFAULT_ICONS[quasar.iconSet.name] ||
      DEFAULT_ICONS['fontawesome-v5'];
    if(!this.$q.iconSet.passwordField) {
      this.$q.iconSet.passwordField = {};
    }
    const {passwordField: icons} = this.$q.iconSet;
    for(const name in defaultIcons) {
      if(!icons[name]) {
        icons[name] = defaultIcons[name];
      }
    }
  }
};
