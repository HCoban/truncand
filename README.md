# Truncand

Truncade and join list of strings.

# Usage

```
import truncand from 'truncand';

const list = ["Oksana", "Ada", "Marie", "Rosalind"]
const limit = 3
truncand(list, limit) // returns "Oksana, Ada, Marie and 1 more"
```

You can pass an options to truncand. The default options object is

```
{
  // whether or not add remaining count (eg. 'and 3 more')
  appendRemainingCount: true,
  descriptionPlural: 'more',
  descriptionSingular: 'more',
  oxfordComma: false,
  useAnd: true
}
```

If you want to pass a common descriptor you can do so by
```
const list = ["Oksana", "Ada", "Marie", "Rosalind"]
const limit = 2
truncand(list, limit, { descriptionSingular: "other", descriptionPlural: "others" }) // returns "Oksana, Ada and 2 others"
```
