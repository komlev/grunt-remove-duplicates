# grunt-remove-duplicates

> Removes scripts duplicates from HTML files

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-remove-duplicates --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-remove-duplicates');
```

## The "remove_duplicates" task

### Overview
Plugin remove "script" and "link" tags with duplicate "src" and "href" attributes
```html
<script src="1.js"></script>
<script src="2.js"></script> 
<script src="2.js"></script>
<link href="1.css" rel="stylesheet" type="text/css">
<link href="1.css" rel="stylesheet" type="text/css">
<link href="2.css" type="text/css" type="text/css">
```
will become
```html
<script src="1.js"></script>
<script src="2.js"></script> 
<link href="1.css" rel="stylesheet" type="text/css">
<link href="2.css" type="text/css" type="text/css">
```
In your project's Gruntfile, add a section named `remove_duplicates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  remove_duplicates: {
    options: {
      keepLast: false
    },
    main: {
      src: 'duplicates.html',
      dest: 'no_duplicates.html'
    }
  },
});
```

### Options

#### options.keepLast
Type: `String`
Default value: `false`

This option controls the placement of the remaining script.
If this option is set to false then first entry of the script will remain otherwise the last entry will be left

### Usage Examples

#### Default Options
In this example, the default options are used to remove duplications from file.

```js
grunt.initConfig({
  remove_duplicates: {
     main: {
      src: './test/fixtures/simple.html',
      dest: './tmp/example.html'
    }
  }
});
```

#### Multiple files and keep last entry

```js
grunt.initConfig({
  remove_duplicates: {
    custom_options: {
        options: {
          keepLast: true
        },
        files: [
          {cwd: './test/fixtures/', src: './*', dest: 'tmp/', expand: true}
        ]
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-11-05   v0.1.1   Styles duplicates removing
* 2014-10-25   v0.1.0   Initial upload
