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
        v-on="inputListeners" />
    </div>
  </div>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import BrQCheckbox from './BrQCheckbox.vue';
import BrQInput from './BrQInput.vue';
import BrQSelect from './BrQSelect.vue';

export default {
  name: 'BrQFormGenerator',
  components: {BrQCheckbox, BrQInput, BrQSelect},
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
        masked: {name: 'br-q-input', params: {type: 'password'}},
        email: {name: 'br-q-input', params: {type: 'email'}},
        enum: 'br-q-select'
      })
    }
  },
  computed: {
    fields() {
      const {value, vocab, schema, inputTypeMap} = this;
      const fields = [];
      for(const key in value) {
        if(!(key in schema)) {
          continue;
        }
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
