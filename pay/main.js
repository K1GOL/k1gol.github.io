function calculatePay (time, data) {
  let sum = 0.0
  data.segments.forEach(s => {
    const start = new Date()
    const end = new Date()
    start.setHours(s.start.h)
    start.setMinutes(s.start.m)
    start.setSeconds(0)
    end.setHours(s.end.h)
    end.setMinutes(s.end.m)
    end.setSeconds(0)

    const diff = time.getTime() - start.getTime()

    if (diff > 0) {
      const len = end.getTime() - start.getTime()
      const ppms = s.pay * s.mult / 60 / 60 / 1000
      if (diff > len) {
        sum += len * ppms
      } else {
        sum += diff * ppms
      }
    }
  })
  return sum
}

function decodeJson () {
  if (!window.location.hash) return {}
  return JSON.parse(new TextDecoder().decode(base64ToBytes(window.location.hash.slice(1))))
}

function encodeJson (str) {
  return bytesToBase64(new TextEncoder().encode(str))
}

function base64ToBytes (base64) {
  const binString = atob(base64)
  return Uint8Array.from(binString, (m) => m.codePointAt(0))
}

function bytesToBase64 (bytes) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte)
  ).join('')
  return btoa(binString)
}

function update (data) {
  const main = document.getElementById('main')
  const sub1 = document.getElementById('sub1')
  const sub2 = document.getElementById('sub2')
  const progress = Array.from(document.getElementsByClassName('progress'))

  const payNow = calculatePay(new Date(), data)
  main.innerHTML = `${(payNow).toFixed(2)}€`

  const hourAgo = new Date().getTime() - 1000 * 60 * 60
  const payHourAgo = calculatePay(new Date(hourAgo), data)
  sub1.innerHTML = `${(payNow - payHourAgo).toFixed(2)}€/h`

  const endH = data.segments[data.segments.length - 1].end.h
  const endM = data.segments[data.segments.length - 1].end.m
  const final = new Date()
  final.setHours(endH)
  final.setMinutes(endM)
  final.setSeconds(0)

  const finalPay = calculatePay(final, data)
  sub2.innerHTML = `${(finalPay - payNow).toFixed(2)}€ remaining`

  const prog = payNow / finalPay

  progress.forEach(e => {
    e.style = `width: ${Math.round(prog * 100)}vw`
  })
}

if (!window.location.href.includes('encoder')) {
  const decoded = decodeJson()
  setInterval(() => {
    update(decoded)
  }, 250)
}

