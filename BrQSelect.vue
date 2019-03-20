<template>
  <q-select
    v-model="value"
    :autocomplete="field.autocomplete"
    :disabled="field.disabled"
    :class="field.classes"
    :label="field.label"
    :placeholder="field.placeholder"
    :readonly="field.readonly"
    :options="field.options"
    v-on="inputListeners" />
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
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
