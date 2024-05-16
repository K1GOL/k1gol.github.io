# /nbody
Simple n-body gravity simulation. Not particularly accurate, useful, or beautiful for that matter, just something fun to look at.

## Usage

Download project and open `index.html` in a browser.

Default scenario is Jupiter and the Galielan moons with a spacecraft.

Value inputs support scientific notation (for example `4.5e6` will become `4500000`).

In addition, you can use the following strings to automatically substitute their appropriate values into inputs when creating a new body:

`minute, hour, day, kilometer, earthRadius, moonRadius, jupiterRadius, sunRadius, astronomicalUnit, moonMass, earthMass, jupiterMass, sunMass`

# /pay

Watch the money roll in. Generate pay data at `/pay/encode` and pass that as the URL fragment, like so:

```json
{
  "segments": [
    {
      "start": {
        "h": 18,
        "m": 0
      },
      "end": {
        "h": 19,
        "m": 0
      },
      "pay": 15.50,
      "mult": 1
    },
    {
      "start": {
        "h": 19,
        "m": 0
      },
      "end": {
        "h": 21,
        "m": 0
      },
      "pay": 15.50,
      "mult": 1.15
    },
    {
      "start": {
        ...
```

This turns into:
`/pay#eyAgICJzZWdtZW50cyI6IFsgICAgIHsgICAgICAgInN0YXJ0IjogeyAgICA...`
