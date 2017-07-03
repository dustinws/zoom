# Zoom . js

[![CircleCI](https://circleci.com/gh/dustinws/zoom/tree/master.svg?style=shield)](https://circleci.com/gh/dustinws/zoom/tree/master)
[![npm version](https://badge.fury.io/js/%40dustinws%2Fzoom.svg)](https://badge.fury.io/js/%40dustinws%2Fzoom)
[![deps](https://david-dm.org/dustinws/zoom.svg)](https://david-dm.org/dustinws/zoom.svg)

---
### Overview

Zoom is a suite of libraries that work together to encourage a safer way to write javascript.

###### Zoom <3's [Fantasy Land JS](https://github.com/fantasyland/fantasy-land).
<small><em>It's our only dependency!</em></small>

*A brief note ~*

> If you are looking for a large community or a focus on performance, you should check out the more "tried and true" libraries like `Ramda` or `lodash`. Perhaps one day this library will have a larger community, but right now it's really just a glorified junk drawer for utilities used in my personal projects.


###### I'm still here, but why would I use this?
*Because i'm lazy.*

Unlike lodash, Zoom puts a strong focus on stateless, immutable operations. Nothing in Zoom mutates user data, and it will always be that way. `Ramda` is a wonderful library that has this same goal, but it doesn't provide any implementations for fantasy land types. This project includes stable implementations for multiple types, and a potentially overwhelming number of utilities that can be used to operate on them. This is my beloved junk drawer with pretty documentation, and we can share it if you help make make it better.

###### Bundler Friendly
Use direct require / import statements to only require the code that you need.

---
### Documentation
Pretty docs can be found [here](https://dustinws.github.io/zoom/).

---
### Installation

##### npm
`$ npm install --save @dustinws/zoom`

##### bower
`$ bower --save install zoom`

##### wget
`$ wget https://raw.githubusercontent.com/dustinws/zoom/master/dist/zoom.min.js`

##### curl
`$ curl https://raw.githubusercontent.com/dustinws/zoom/master/dist/zoom.min.js > zoom.min.js`
