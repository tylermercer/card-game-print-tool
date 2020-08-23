<template>
  <details>
    <summary>CSV Schema Details</summary>
  <table class="lined">
    <thead>
      <tr>
        <th>Field</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="[field, description] in Object.entries(schema)" :key="field">
        <td>
          <code>{{field}}</code>
        </td>
        <td v-html="md.render(description)"></td>
      </tr>
    </tbody>
  </table>
  </details>
</template>

<script>
import schema from '@/assets/csv-schema.json';
import MarkdownIt from 'markdown-it';

export default {
  data() {
    return {
      schema,
      md: new MarkdownIt()
    }
  }
}
</script>