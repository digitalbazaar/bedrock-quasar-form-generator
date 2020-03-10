# bedrock-quasar-form-generator
Vue.js + quasar framework form generator
BrQFormGenerator takes in a value, a vocab, and a schema as props
and then computes the fields and uses a dynamic vue component
to layout the form. The form can contain boolean, text, masked,
email, url, enum, or custom components.


### Install

```
npm i --save bedrock-quasar-form-generator
```

### Usage

```
<br-q-form-generator v-model="foo" :vocab="vocab" :schema="schema" />
```
