<template>
  <q-input
    v-model="value"
    bottom-slots
    input-class="text-subtitle1"
    :type="visible ? 'text' : 'password'"
    :autocomplete="field.autocomplete"
    :disabled="field.disabled"
    :class="field.classes"
    :error="validation.$error"
    :error-message="errorMessage"
    :label="field.label"
    :maxlength="field.maxLength"
    :minlength="field.minLength"
    :placeholder="field.placeholder"
    :readonly="field.readonly"
    @blur="validation.$touch"
    v-on="inputListeners">
    <template v-slot:append>
      <q-icon
        :name="visible ? hideIcon : showIcon"
        class="cursor-pointer toggle-icon"
        @click="visible = !visible" />
    </template>
  </q-input>
</template>

<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {fieldMixin} from './fieldMixin.js';

export default {
  name: 'BrQPassword',
  mixins: [fieldMixin],
  data() {
    return {
      visible: false
    };
  }
};
</script>

<style scoped>

.toggle-icon {
    margin-left: 10px;
}

</style>
