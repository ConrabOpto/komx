# Komx

State management inspired by Mobx, powered by Knockout.js.

## Why?

At Conrab Opto, we have a large single page application that uses both Knockout and React.
We started out using Knockout, but have recently found React both more enjoyable and less error prone to develop with.
Komx enables us to use the same state management for the parts of our application that uses Knockout, and those that are
developed in React.

This is of course not the only way to use Komx. You can also use it if you enjoy Mobx for state management, but prefer
Knockouts template based views and two-way data binding.

However, if you are only using React there's really no reason to use Komx over Mobx.

## How?

Komx is a thin layer around Knockout observables that tries to mimic the Mobx api as much as possible. Things like
observables and computeds are conceptually very similar between Knockout and Mobx, and this library simply acts
like a bridge between them.

## Installation

`npm install komx --save`

For react bindings, see `komx-react`.

## Usage

```js
import { observable, computed } from 'komx';


```

