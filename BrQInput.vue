<template>
  <q-field>
    <q-input
      v-model="value"
      :autocomplete="field.autocomplete"
      :disabled="field.disabled"
      :class="field.classes"
      :float-label="field.label"
      :maxlength="field.maxLength"
      :minlength="field.minLength"
      :placeholder="field.placeholder"
      :readonly="field.readonly"
      :type="field.component.params.type || 'text'"
      v-on="inputListeners" />
  </q-field>
</template>
<script>
/*!
 * Copyright (c) 2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {fieldMixin} from './fieldMixin.js';

export default {
  name: 'BrQInput',
  mixins: [fieldMixin]
};
</script>
<style>
</style>
