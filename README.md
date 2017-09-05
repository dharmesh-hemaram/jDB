# xDB

Wrapper for Indexeddb


Js Version: ES6
NPM support?
Github
Example

TEST
* Qunit
* Karma Jasmine

### Constraints
* nullable
* unique
* multivalue
* foreignKey
* defualt
* auto Increment


### DB operation
* config
* open
* delete
* createObjectStore
* deleteObejctStore
* export

### Store Opertaion
* add [pass primaryKey]
* bulkAdd
* update
* delete
* get [with primary key]
* getAll [start:end]
* count
* clear
* orderBy
* groupBy

### Index Operation
* get
* getAll
* like
* startsWith
* endsWith



### Number
* greaterThan
* lesserThan
* greaterThanOrEqual
* lesserThanOrEqual
* between
* in

* sum
* avg
* min
* max
* push
and * addToSet.

### Cursor
* direction

### Operation
* and
* union [means different table]
* or

### Collection
* Reverse
* and
* or
* not
* nor
* eq
* ne
* gt
* gte
* lt
* lte
* in
* nin
* elemMatch and * exists.


Basic useful feature list:

 * Ctrl+S / Cmd+S to save the file
 * Ctrl+Shift+S / Cmd+Shift+S to choose to save as Markdown or HTML
 * Drag and drop a file into here to load it
 * File contents are saved in the URL so you can share files


I'm no good at writing sample / filler text
so go write something yourself.

Look
a list!

 * foo
 * bar
 * baz

And here's some code! :+1:

```javascript
* (function(){
  * ('div').html('I am a div.');
});
```

This is [on GitHub](https://github.com/jbt/markdown-editor) so let me know if I've b0rked it somewhere.


Props to Mr. Doob and his [code editor](http://mrdoob.com/projects/code-editor/)
from which
the inspiration to this
and some handy implementation hints
came.

### Stuff used to make this:

 * [markdown-it](https://github.com/markdown-it/markdown-it) for Markdown parsing
 * [CodeMirror](http://codemirror.net/) for the awesome syntax-highlighted editor
 * [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) for syntax highlighting in output code blocks
 * [js-deflate](https://github.com/dankogai/js-deflate) for gzipping of data to make it fit in URLs
