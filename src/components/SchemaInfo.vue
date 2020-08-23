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
      <tr>
        <td>
          <code>title</code>
        </td>
        <td>
          The title of a given card.{{" "}}
          Shown in bold at the top of the card's front content.
        </td>
      </tr>
      <tr>
        <td>
          <code>body</code>
        </td>
        <td>
          The body text of a card.{{" "}}
          Shown in the card's front content, below the title.{{" "}}
          (This field supports Markdown!)
        </td>
      </tr>
      <tr>
        <td>
          <code>backText</code>
        </td>
        <td>
          The text to display on the back of the card.{{" "}}
          Rendered in large lettering{{" "}}
          (so be judicious about how much text you put here).{{" "}}
          Useful for identifying which deck a card belongs to{{" "}}
          (for games that have multiple decks).
        </td>
      </tr>
      <tr>
        <td>
          <code>frontColor</code>
        </td>
        <td>
          The color of the front of the card.{{" "}}
          Must be a valid CSS color (e.g.{{" "}}
          <code>#FFA500</code>{{" "}}
          or{{" "}}
          <code>lightblue</code>).
        </td>
      </tr>
      <tr>
        <td>
          <code>backColor</code>
        </td>
        <td>
          The color of the back of the card.{{" "}}
          Must be a valid CSS color.
        </td>
      </tr>
      <tr>
        <td>
          <code>quantity</code>
        </td>
        <td>
          How many copies of this card should be included in the deck.{{" "}}
          Must be a number literal, e.g.{{" "}}
          <code>10</code>
        </td>
      </tr>
    </tbody>
  </table>
  </details>
</template>