# Komx

State management inspired by Mobx, powered by Knockout.js.

## Why?

At Conrab Opto, we have a large single page application that uses both Knockout and React.
We started out using Knockout, but have recently found React both more enjoyable and less error prone
to develop with. Komx enables us to use the same state management for the parts of our application
that uses Knockout, and those that are developed in React.

Komx is also useful if you enjoy Mobx for state management, but prefer Knockouts template based views
and two-way data binding.

## How?

Komx is a thin layer around Knockout observables that tries to mimic the api of Mobx as much as
possible. Observables and computeds are conceptually very similar between Knockout and Mobx -
Komx simply acts like a bridge between the two libraries.

## Installation

`npm install komx --save`

For react bindings, see [komx-react](https://github.com/ConrabOpto/komx-react).

## Usage

```js
import { observable, computed } from 'komx';

class Note {
    @observable message;
    @observable changed;
    @observable userName;

    @computed get changedByUser {
        return `Changed ${this.changed} by ${this.username}`;
    }

    constructor(data) {
        Object.assign(this, data);
    }
}
```

## Differences

The main difference is that Knockout lacks transactions. You can use `defer updates` to get a nice
perfomance boost similar to transactions, but it's worth noting that this makes the dependency updates
asynchronous. This can lead to some unexpected behaviour, see [this page for more information](http://knockoutjs.com/documentation/deferred-updates.html).

## Extending observables

One of the main goals of Komx is to stay as close to api of Mobx as possible. Therefore, extending
observables is not supported. If you need this, you might want to check out [knockout-decorators](https://github.com/gnaeus/knockout-decorators).

## Currently included

The following Mobx methods are supported by Komx.

`observable, computed, action, autorun, when, reaction`
