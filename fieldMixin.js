/*!
  * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
  */
'use strict';

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
    }
  }
};
