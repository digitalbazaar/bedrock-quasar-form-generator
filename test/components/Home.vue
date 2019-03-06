<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <div>
        <br-q-form-generator />
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrQFormGenerator} from 'bedrock-quasar-form-generator';

export default {
  name: 'Home',
  components: {BrQFormGenerator},
  data() {
    return {};
  }
};
</script>
<style>
</style>
