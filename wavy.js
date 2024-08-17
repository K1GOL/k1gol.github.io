/* eslint-disable no-unused-vars */
const wavy = (canvas) => {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  // Start by drawing a constant spaced grid of dots on the canvas.
  const dots = []
  const ratio = canvas.width / canvas.height
  const dW = canvas.width / 75 / ratio
  const dH = canvas.height / 75
  for (let x = 0; x < canvas.width; x += dW) {
    for (let y = 0; y < canvas.height; y += dH) {
      dots.push({
        anchorX: x,
        anchorY: y,
        x,
        y
      })
    }
  }
  const drawFrame = () => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dots.forEach((dot) => {
      ctx.beginPath()
      ctx.arc(dot.x + 0.5, dot.y + 0.5, 1, 1, 2 * Math.PI)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fill()
    })
  }

  const waves = []
  // Create a wave with
  // eqX : equation for X coordinate shift.
  // eqY : equation for Y coordinate shift.
  // eqTx : equation for X coordinate based time delay.
  // eqTy : equation for Y coordinate based time delay.
  const createWave = (eqX, eqY, eqTx, eqTy) => {
    const wave = {
      eqX,
      eqY,
      eqTx,
      eqTy
    }
    waves.push(wave)
  }

  let time = 0
  const animate = (t) => {
    dots.forEach((dot) => {
      let dX = 0
      let dY = 0
      waves.forEach((wave) => {
        dX += wave.eqX(t + wave.eqTx(dot.anchorX) + wave.eqTy(dot.anchorY))
        dY += wave.eqY(t + wave.eqTy(dot.anchorY) + wave.eqTx(dot.anchorX))
      })
      dot.x = dot.anchorX + dX
      dot.y = dot.anchorY + dY
    })
  }

  setInterval(() => {
    time += 0.05
    drawFrame()
    animate(time)
  }, 50)

  return { createWave }
}
