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
    value: {
      required: true
    }
  },
  computed: {
    inputListeners: function() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event)
      };
    }
  }
};
