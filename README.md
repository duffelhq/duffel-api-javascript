# Duffel API Javascript Client

The Duffel JavaScript client library - sometimes known as an SDK - makes it easy to interact with the Duffel API from your server-side JavaScript applications.

## Content

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](docs/CONTRIBUTING.md)
- [Documentation](#documentation)

## Requirements

To use the Duffel JavaScript client library, you'll need to be using **Node.js v12 (LTS)** or later.

You can only use the library in **server-side** JavaScript applications developed in Node.js. It won't work in frontend applications that run in your users' browsers.

## Usage

To get started, import the `Duffel` module into your code and initialise it using your access token, which you can get from the "Access tokens" page in your [Duffel dashboard](http://app.duffel.com/):

```javascript
import { Duffel } from '@duffel/api'

const duffel = new Duffel({
  // Store your access token in an environment variable, keep it secret and only readable on your server
  token: process.env.DUFFEL_ACCESS_TOKEN,
})

// To quickly test whether your integration is working, you can get a single aircraft by its Duffel ID
const aircraft = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi')
console.log(aircraft)
```

### TypeScript

The Duffel JavaScript client library is written in TypeScript and comes with types for Duffel API objects, which you can easily import.

```javascript
import { Aircraft } from '@duffel/api'

const response = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi')
const aircraft: Aircraft = response.data
```

### Getting a single object

As a general rule, you get a single object from the API by its ID.

```javascript
const aircraft = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi')
```

Sometimes, you can pass in optional query parameters:

```javascript
duffel.offers.get(offer_id, {
  return_available_services: true,
})
```

If your request was successful, the `get` function will return the response body as an object. Inside the `data` field, you'll find the resource you requested.

```javascript
const aircraft = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi')
console.log(aircraft)
```

Expected output from `console.log(aircraft)`:

```json
{
  "data": [
    {
      "name": "Airbus Industries A380",
      "id": "arc_00009UhD4ongolulWd91Ky",
      "iata_code": "380"
    }
  ]
}
```

#### Errors

If there are any errors with your request, the client library will throw an error which you can catch. The error object will expose all of the error [information](https://duffel.com/docs/api/overview/errors) returned by the API.

You'll find information about what was wrong in the `errors` field, and useful context like the `status` and `request_id` (which you should use when contacting the Duffel support team) inside the `meta` field.

```javascript
try {
  const test = await duffel.aircraft.get('nonexistent_id')
  // The request failed, so we won't hit this
  console.log(test)
} catch (error) {
  console.log(error)
}
```

Expecting output from `console.log(error)` similar to:

```json
{
  "meta": { "status": 404, "request_id": "Fn6SwqLT_Isf3CAAAEah" },
  "errors": [
    {
      "type": "invalid_request_error",
      "title": "Not found",
      "message": "The resource you are trying to access does not exist.",
      "documentation_url": "https://duffel.com/docs/api/overview/errors",
      "code": "not_found"
    }
  ]
}
```

### Listing objects

Our "List" APIs only return a set number of results by default. You can find out more about pagination in the Duffel API in general [here](https://duffel.com/docs/api/overview/pagination). In the client library, we provide two ways to use list endpoints - one that allows you to take advantage of automatic pagination, and one that allows you to paginate manually.

#### Automatic Pagination

We recommend automatic pagination. You can use [async iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) to auto-paginate through all the results with our `listWithGenerator` method. If you're not familiar with it, you can read more about async iteration and generators [here](https://javascript.info/async-iterators-generators).

```javascript
// This is how you can iterate over all the objects using the generator
const airlines = duffel.airlines.listWithGenerator()
for await (const airline of airlines) {
  console.log(airline)
  /* Expecting output similar to:
   * {
   *   "data": {
   *     "name": "British Airways",
   *     "id": "aln_00001876aqC8c5umZmrRds",
   *     "iata_code": "BA"
   *   }
   * }
   */
}

// Alternatively, you can go through the objects one by one
const aircraft = duffel.aircraft.listWithGenerator()
const firstAircraft = await aircraft.next()
console.log(firstAircraft.value)
/* Expecting output similar to
 * {
 *   "data": {
 *     name: "Airbus Industries A380",
 *     id: "arc_00009UhD4ongolulWd91Ky",
 *     iata_code: "380"
 *   }
 * }
 */
if (!firstAircraft.done) {
  const secondAircraft = await aircraft.next()
  console.log(secondAircraft.value)
}
```

#### Manual pagination

Alternatively, you can paginate manually. The `list` method simply returns the page of the API you've requested, with the metadata that you need to then request the next (or previous) page inside `meta`.

```javascript
const firstPage = await duffel.airlines.list()
console.log(firstPage)
/* Expected output:
 * {
 *   data: [{
 *     name: "Airbus Industries A380",
 *     id: "arc_00009UhD4ongolulWd91Ky",
 *     iata_code: "380"
 *   }, ...],
 *   meta: {
 *     limit: 50,
 *     before: null,
 *     after: 'g3QAAAACZAACaWRtAAAAGmFybF8wMDAwOVZNRTdEQUdpSmp3b21odjJ6ZAAEbmFtZW0AAAAPQWJlbGFnIEF2aWF0aW9u'
 *   }
 * }
 */

// You can then manually paginate by passing in the relevant query parameters
const nextPage = await duffel.airlines.list({
  limit: firstPage.meta.limit,
  after: firstPage.meta.after,
})
console.log(nextPage)
```

### Creating objects

Typically, you'll create a resource by passing in the relevant body. In some cases, you can pass in relevant query parameters too.

```javascript
const offerRequestResponse = await duffel.offerRequests.create({
  slices: [
    {
      origin: 'NYC',
      destination: 'ATL',
      departure_date: '2021-06-21',
    },
  ],
  passengers: [{ type: 'adult' }],
  cabin_class: 'economy',
  return_offers: false,
})

console.log(offerRequestResponse.data.id)
```

### Actions

On certain endpoints you can perform actions, such as confirming an order cancellation. Usually you'll do that by just passing in the ID, but sometimes you can also pass in optional query parameters.

```javascript
const orderCancellationResponse = await duffel.orderCancellations.confirm(
  order_cancellation_id,
)
console.log(orderCancellationResponse.data.id)
```

### Update

On certain endpoints you can perform updates, such as updating an order. Usually you'll do that by passing the object ID with the object data changes.

```javascript
const orderUpdateResponse = await duffel.orders.update(
  'ord_00009hthhsUZ8W4LxQgkjo',
  {
    metadata: {
      payment_intent_id: 'pit_00009htYpSCXrwaB9DnUm2',
    },
  },
)

console.log(orderUpdateResponse.data.id)
```

And if you want to clear metadata:

```javascript
const orderUpdateResponse = await duffel.orders.update(
  'ord_00009hthhsUZ8W4LxQgkjo',
  {
    metadata: {},
  },
)

console.log(orderUpdateResponse.data.id)
```

## Configuration

### Test and live mode

To use the Duffel test mode, make sure you're using a "test" token. And for live mode, make sure to use a "live" token.

### Timeouts

In the future we plan to make timeouts configurable, but at the moment the library does not yet support that. You can read more about the API response times [here](https://duffel.com/docs/api/overview/response-times).

### Logging

We currently provide some basic logging in the library, and there are plans to add more telemetry options in the future. You can turn on `verbose` debug mode if you want to check what endpoints are being called and with what arguments.

```javascript
const duffel = new Duffel({
  // We recommend storing your access token in an environment variable for security
  token: process.env.DUFFEL_ACCESS_TOKEN,
  debug: { verbose: true },
})
```

## Documentation

You can learn more about the Duffel API and the library in our [documentation](https://duffel.com/docs).
