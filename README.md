[![Travis CI Build Status](https://api.travis-ci.org/ransico/grunt-apiblueprint-springmvc.svg?branch=master)](https://travis-ci.org/ransico/grunt-apiblueprint-springmvc)

# grunt-apiblueprint-springmvc

> Allows execution of the [apiblueprint-springmvc](https://github.com/ransico/apiblueprint-springmvc) generator, to generate SpringMVC source files from an apiblueprint specification.

## Getting Started
This plugin requires Grunt. It also assumes that you have an understanding of [API Blueprint](https://apiblueprint.org), so that you can write apib files for this plugin to process!

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-apiblueprint-springmvc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-apiblueprint-springmvc');
```

## The "apiblueprint_springmvc" task

### Overview
In your project's Gruntfile, add a section named `apiblueprint_springmvc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  apiblueprint_springmvc: {
    options: {
      // Your options options go here.
    },
    files: {
      'destinationPath': ['src/*.apib']
    }
  }
});
```

### Options

#### options.includePath
Default: process.cwd()

If your apib files use the aglio [include](https://github.com/danielgtaylor/aglio#including-files) directive, files will be included relative to this path.

#### options.filterInput
Default: true

If true, tabs will be replaced with 4 spaces prior to processing, and windows newlines converted to linux (required, since APIB doesn't support tabs or windows).

#### options.encoding
Default: utf8

The encoding of input .apib files.

#### options.packagePrefix
Default: api

The java package that will be inserted to the top of each java file.

#### options.extraImports
Default: []

An array of strings, which will be inserted at the top of the java Controllers and Service Interface. Each string should be a full java class name, or other valid value for an import statement.

Example: ['api.rest.model.response.*','api.rest.model.request.*']

#### options.skipModelNames
Default: []

An array of model names that should not have java files created for them, in the models directory. This is useful if you do not want to generate files for some types that are defined in the apib (foe example, they are defined already in the java project elsewhere)

#### options.flattenParentClasses
Default: false

If true, instead of using class inheritance, models will be flattened to contain all parent model fields.

#### options.resourceModifiers
Default: []

An array of objects that you can use to add extra annotations, or parameters to a controller method.

Each array entry contains a matching rule (exact match or regular expression) to determine which controller methods should have the modifier applied. The method name against which the rule matches is in the format _ControllerName.methodName_

The modifier itself can apply an annotation to the method itself, or add (optionally) annotated parameters to the method signature (either at the beginning, or end, of the parameter list.)

The modifier definition is as follows: 

```javascript
{
    pattern: /MyController\..+/,
    methodAnnotations: ['@AnnoOne', '@AnnoTwo("someArg")'],
    prependedParameters: [ { type: 'HttpServletRequest', name: 'prefixedParam' } ],
    appendedParameters: [ { annotation: '@NotNull', type: 'HttpServletResponse', name: 'suffixedParam' } ]
}
```

This would result in the following output (assuming it matched a method with a single parameter, _original_)

```java
@AnnoOne
@AnnoTwo("someArg")
@RequestMapping("/someMethod{original}")
public ReturnObject someMethod(HttpServletRequest prefixedParam, @PathVariable String original, @NotNull HttpServletResponse suffixedParam) {
    return delegateService.someMethod(prefixedParam, original, suffixedParam);
}
```

_pattern_ is either a string (for exact match) or a regular expression.

_methodAnnotations_ contains a list of strings; each which is inserted verbatim above the method definiton.

_prependedParameters_ contains a list of objects. Mandatory fields are _type_ and _name_ ; however annotation is optional.

_appendedParameters_ contains a list of objects. Mandatory fields are _type_ and _name_ ; however annotation is optional.


### Usage Examples

#### Default Options
In this example, the most commonly used options are specified. This will 

```js
grunt.initConfig({
  apiblueprint_springmvc: {
    options: {
      includePath: 'src',
      packagePrefix: 'my.package.rest',
      extraImports: ['my.package.rest.model.response.*','my.package.rest.model.request.*'],
      skipModelNames: ['ReadSingleResponse', 'ReadListResponse', 'OperationResponse', 'FilterableRequest']
    },
    files: {
      'destinationPath': ['src/*.apib']
    },
  },
})
```

## Roadmap
Some things I would like to add

* Hook the generator into the grunt logger

## Contributing
Pull requests are welcome!

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Lewis Weaver. Licensed under the MIT license.
