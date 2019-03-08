<template>
  <q-page
    class="column gutter-md"
    padding>
    <div class="column items-center">
      <div
        class="column"
        style="max-width: 400px">
        <p>Form:</p>
        <form style="width: 400px">
          <br-q-form-generator
            v-model="model"
            :vocab="vocab"
            :schema="schema"
            @input="onInput()" />
        </form>
        <p style="padding-top: 50px">
          Model:
        </p>
        <pre>{{model}}</pre>
      </div>
    </div>
  </q-page>
</template>
<script>
/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {BrAddressForm} from 'bedrock-vue-address-form';
import {BrQFormGenerator} from 'bedrock-quasar-form-generator';
import {minLength, required} from 'vuelidate/lib/validators';
import Vue from 'vue';

Vue.component('br-address-form', BrAddressForm);

export default {
  name: 'Home',
  components: {BrQFormGenerator},
  /*mounted() {
    setInterval(() => {
      console.log('model', this.model);
    }, 3000);
  },*/
  data() {
    return {
      model: {
        // `id` intentionally not in form as it is not in the schema
        id: 'urn:uuid:123-123-123',
        name: 'Jane Doe',
        password: 'J8nED03!x4',
        email: 'jane.doe@example.com',
        status: null,
        happy: false,
        testReadOnly: 'readonly',
        testDisabled: 'disabled',
        address: {
          addressCountry: '',
          addressLocality: '',
          addressRegion: '',
          postalCode: '',
          streetAddress: ''
        }
      },
      vocab: {
        name: {
          range: 'string',
          label: 'Name',
          inputType: 'text'
        },
        password: {
          range: 'string',
          label: 'Password',
          inputType: 'masked'
        },
        email: {
          range: 'string',
          label: 'Email',
          inputType: 'email'
        },
        age: {
          range: 'integer',
          label: 'Age',
          inputType: 'text'
        },
        status: {
          range: 'string',
          label: 'Status',
          inputType: 'enum'
        },
        address: {
          range: 'PostalAddress',
          label: 'Address'
        }
      },
      schema: {
        name: {
          placeholder: 'Your name'
        },
        password: {
          hint: 'Minimum 6 characters',
          validation: {
            value: {
              minLength: minLength(6),
              required
            }
          }
        },
        email: {
          //component: 'SomeCustomComponent',
          placeholder: 'Your email address'
        },
        status: {
          placeholder: 'Your status...',
          options: [{
            label: 'Active',
            value: 'active'
          }, {
            label: 'Deleted',
            value: 'deleted'
          }]
        },
        happy: {
          label: 'Happy',
          inputType: 'boolean'
        },
        testDisabled: {
          label: 'Disabled',
          inputType: 'text',
          disabled: true
        },
        testReadonly: {
          label: 'Readonly',
          inputType: 'text',
          readonly: true
        },
        address: {
          component: 'br-address-form'
        }
      }
    };
  },
  methods: {
    onInput() {
      console.log('onInput', this.model);
    }
  }
};
</script>
<style>
</style>
