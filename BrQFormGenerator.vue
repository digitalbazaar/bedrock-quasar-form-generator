<template>
  <div class="br-q-form-generator">
    <div
      v-for="field in fields"
      :key="field.id"
      class="br-q-form-generator-field">
      <component
        :is="field.component.name"
        v-model="value[field.id]"
        :field="field"
        :validation="$v.value[field.id] || {}"
        v-on="inputListeners" />
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrQCheckbox from './BrQCheckbox.vue';
import BrQInput from './BrQInput.vue';
import BrQPassword from './BrQPassword.vue';
import BrQSelect from './BrQSelect.vue';
import * as validators from 'vuelidate/lib/validators';
const {helpers} = validators;

export default {
  name: 'BrQFormGenerator',
  components: {BrQCheckbox, BrQInput, BrQPassword, BrQSelect},
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({})
    },
    vocab: {
      type: Object,
      required: true,
      default: () => ({})
    },
    schema: {
      type: Object,
      required: true,
      default: () => ({})
    },
    inputTypeMap: {
      type: Object,
      required: true,
      default: () => ({
        boolean: 'br-q-checkbox',
        text: 'br-q-input',
        masked: {name: 'br-q-password', params: {type: 'password'}},
        email: {name: 'br-q-input', params: {type: 'email'}},
        enum: 'br-q-select'
      })
    }
  },
  computed: {
    fields() {
      const {vocab, schema, inputTypeMap} = this;
      const fields = [];
      for(const key in schema) {
        const v = vocab[key] || {};
        const s = schema[key] || {};
        const field = {id: key, ...v, ...s};
        field.component = _getComponent({inputTypeMap, field});
        fields.push(field);
      }
      return fields;
    },
    inputListeners: function() {
      return {
        ...this.$listeners,
        input: () => {
          this.$emit('input', this.value);
        }
      };
    }
  },
  validations() {
    const validations = {};
    const value = validations.value = {};
    for(const field of this.fields) {
      const {validation} = field;
      if(!validation) {
        continue;
      }
      const fieldValidators = value[field.id] = {};
      for(const name in validation) {
        if(name === 'errors') {
          // `errors` is for error messages
          continue;
        }
        let params = validation[name];
        // check for validator name in vuelidate validators
        const validator = validators[name];
        if(validator) {
          if(params === true) {
            // no parameters, just use validator directly
            fieldValidators[name] = validator;
          } else {
            // pass parameters to validator factory
            if(!Array.isArray(params)) {
              params = [params];
            }
            fieldValidators[name] = validators[name](...params);
          }
        } else if(name === 'match') {
          // special custom validator for matching other fields
          fieldValidators[name] = () => {
            return this.value[field.id] === this.value[params];
          };
        } else if(name === 'regex') {
          // special custom validator for regex
          if(!Array.isArray(params)) {
            params = [params];
          }
          params = params.map(p => new RegExp(p));
          fieldValidators[name] = helpers.regex('regex', ...params);
        } else {
          // unknown validator, ignore
          console.warn(
            `Unknown validator "${name}" for field "${field.id}".`);
        }
      }
    }
    return validations;
  }
};

function _getComponent({inputTypeMap, field}) {
  let component;
  if(field.component) {
    component = field.component;
  } else {
    let {inputType} = field;
    if(!inputType) {
      switch(field.range) {
        // TODO: add other defaults
        default:
          inputType = 'text';
      }
    }
    component = inputTypeMap[inputType];
  }
  if(typeof component !== 'string') {
    return component;
  }
  return {name: component, params: {}};
}
</script>
<style lang="scss">
.br-q-form-generator-field {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
