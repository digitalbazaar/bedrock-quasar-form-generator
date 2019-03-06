<template>
  <q-field>
    <q-select
      v-model="value"
      :autocomplete="field.autocomplete"
      :disabled="field.disabled"
      :class="field.classes"
      :float-label="field.label"
      :placeholder="field.placeholder"
      :readonly="field.readonly"
      :options="field.options"
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
  name: 'BrQSelect',
  mixins: [fieldMixin]
};
</script>
<style>
</style>
