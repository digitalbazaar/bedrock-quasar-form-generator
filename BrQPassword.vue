<template>
  <q-input
    v-model="value"
    :type="visible ? 'text' : 'password'"
    :autocomplete="field.autocomplete"
    :disabled="field.disabled"
    :class="field.classes"
    :label="field.label"
    :maxlength="field.maxLength"
    :minlength="field.minLength"
    :placeholder="field.placeholder"
    :readonly="field.readonly"
    v-on="inputListeners">
    <template v-slot:append>
      <q-icon
        :name="visible ? 'visibility' : 'visibility_off'"
        class="cursor-pointer"
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
</style>
