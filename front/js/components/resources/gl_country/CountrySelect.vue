<template>
  <v-select
    :elid="elid"
    :readonly="readonly"
    :disabled="disabled"
    :name="name ? name : 'gl_country_id'"
    :value="value"
    :required="required"
    :options="options"
    :extraparams="extraparams"
    :placeholder="placeholder"
    :mapResult="mapResult"
    url="/api/admin/gl_country"
    @onOpen="$emit('onOpen')"
    @onClose="$emit('onClose')"
    @onSelect="$emit('onSelect', $event)"
    @onUnselect="$emit('onUnselect', $event)"
    @input="$emit('input', $event)"
    @onChange="$emit('onChange', $event)"
  ></v-select>
</template>

<script>
  import vSelect from '@libComponents/form/Select2.vue';

  export default {
    props: [
      'elid',
      'readonly',
      'disabled',
      'name',
      'required',
      'url',
      'value',
      'options',
      'extraparams',
      'placeholder',
    ],
    components: {
      'v-select': vSelect,
    },
    methods: {
      mapResult(value, index) {
        if (value.code) {
          value.text = `${value.name} - ${value.code}`;
        } else {
          value.text = value.name;
        }
        return value;
      },
    },
  };
</script>

<style scoped></style>
