<template>
  <q-input
    v-model="value"
    bottom-slots
    :error="validation.$error"
    :error-message="errorMessage"
    :autocomplete="field.autocomplete"
    :disabled="field.disabled"
    :class="field.classes"
    :label="field.label"
    :maxlength="field.maxLength"
    :minlength="field.minLength"
    :placeholder="field.placeholder"
    :readonly="field.readonly"
    :type="field.component.params.type || 'text'"
    @blur="validation.$touch"
    v-on="inputListeners" />
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
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
