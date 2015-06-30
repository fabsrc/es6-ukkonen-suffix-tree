## Ukkonen's Algorithm: On–line construction of suffix trees

JavaScript (ES6) implementation of Ukkonen's algorithm (https://www.cs.helsinki.fi/u/ukkonen/SuffixT1withFigs.pdf) for the on-line construction of suffix trees.

### Example

```js
import { SuffixTree } from './SuffixTree';

var tree = new SuffixTree();
tree.addString('MISSISSIPPI$').print();
```
**Result**

```
["MISSISSIPPI$", 0, Infinity]
["I", 1, 1]
	["SSI", 2, 4]
		["SSIPPI$", 5, Infinity]
		["PPI$", 8, Infinity]
	["PPI$", 8, Infinity]
	["$", 11, Infinity]
["S", 2, 2]
	["SI", 3, 4]
		["SSIPPI$", 5, Infinity]
		["PPI$", 8, Infinity]
	["I", 4, 4]
		["SSIPPI$", 5, Infinity]
		["PPI$", 8, Infinity]
["P", 8, 8]
	["PI$", 9, Infinity]
	["I$", 10, Infinity]
["$", 11, Infinity]
```

