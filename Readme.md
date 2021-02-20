<div align="center">
<h1>NodeJS Stock Info</h1>

[![Build Status](https://travis-ci.com/paul-shuvo/nodejs-stock-info.svg?branch=main)](https://travis-ci.com/paul-shuvo/nodejs-stock-info) [![Known Vulnerabilities](https://snyk.io/test/github/paul-shuvo/nodejs-stock-info/badge.svg?targetFile=package.json)](https://snyk.io/test/github/paul-shuvo/nodejs-stock-info?targetFile=package.json) [![codecov](https://codecov.io/gh/paul-shuvo/nodejs-stock-info/branch/main/graph/badge.svg)](https://codecov.io/gh/paul-shuvo/nodejs-stock-info)
 ![license: MIT](https://img.shields.io/npm/l/vue.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/b512e403dfc172ee3b0d/maintainability)](https://codeclimate.com/github/paul-shuvo/nodejs-stock-info/maintainability) 
 
 [![npm version](https://badge.fury.io/js/stock-info.svg)](https://badge.fury.io/js/stock-info ![npm](https://img.shields.io/npm/dm/stock-info)

<p>A minimal NodeJS library to fetch stock info.</p>
</div>

__Disclaimer:__ This package fetch the result from finance.yahoo.com using web scrapping. Owner will not be responsible for any misuse of this package. This is solely for the purpose of learning.

## Getting started

### Installation

This package can be installed using `npm`

```bash
npm install stock-info
```

or, `yarn`

```bash
yarn add stock-info
```

### Usage

Import `stock-info`.

```javascript
const SI = require('stock-info')
```

Then instantiate with either the empty constructor

```javascript
let stockInfo = new SI()
```

Or, with a string or list of strings corresponding to the stock e.g. `"amzn"` or `["amzn", "aapl"]`

```javascript
let stockInfo = new SI("amzn")
// or
let stockInfo = new SI(["amzn", "aapl"])
```

The `getStockInfo` method will return the latest stock information and can be used as a promise.

```javascript
stockInfo.getStockInfo().then((response) => {
    console.log(response) //or do something else
})
```

Chaining is also supported.

```javascript
stockInfo.setStocks("tsla").getStockInfo().then((response) => {
    console.log(response) //or do something else
})
```



## Issues

If any issues are found, they can be reported [here](https://github.com/paul-shuvo/nodejs-stock-info/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
