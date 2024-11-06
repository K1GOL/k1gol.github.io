# /ipfs-checker

Tool for checking availability of content on different IPFS gateways.

[https://k1gol.github.io/ipfs-checker](https://k1gol.github.io/ipfs-checker)

# /nbody
Simple n-body gravity simulation. Not particularly accurate, useful, or beautiful for that matter, just something fun to look at.

[https://k1gol.github.io/nbody](https://k1gol.github.io/nbody)

## Usage

Download project and open `index.html` in a browser.

Default scenario is Jupiter and the Galielan moons with a spacecraft.

Value inputs support scientific notation (for example `4.5e6` will become `4500000`).

In addition, you can use the following strings to automatically substitute their appropriate values into inputs when creating a new body:

`minute, hour, day, kilometer, earthRadius, moonRadius, jupiterRadius, sunRadius, astronomicalUnit, moonMass, earthMass, jupiterMass, sunMass`

# /pay

Watch the money roll in. Generate pay data at [`/pay/encode`](https://k1gol.github.io/pay/encode) and pass that as the URL fragment, like so:

```json
{
  "segments": [
    {
      "start": {
        "h": 10,
        "m": 0
      },
      "end": {
        "h": 11,
        "m": 0
      },
      "pay": 13.37,
      "mult": 1
    },
    {
      "start": {
        "h": 11,
        "m": 0
      },
      "end": {
        "h": 12,
        "m": 30
      },
      "pay": 13.37,
      "mult": 1.5
    },
    {
      "start": {
        ...
```

This turns into a base64-encoded URL fragment:
`/pay#eyAgICJ...`

[https://k1gol.github.io/pay](https://k1gol.github.io/pay)
