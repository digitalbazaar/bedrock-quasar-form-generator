<template>
  <q-checkbox
    v-model="value"
    :disabled="field.disabled"
    :class="field.classes"
    :label="field.label"
    :readonly="field.readonly"
    v-on="inputListeners" />
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {fieldMixin} from './fieldMixin.js';

export default {
  name: 'BrQCheckbox',
  mixins: [fieldMixin]
};
</script>
<style>
</style>
