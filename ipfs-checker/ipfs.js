/* eslint-disable no-unused-vars */

const D = document

const gateways = [
  'https://flk-ipfs.xyz/ipfs',
  'https://gateway.pinata.cloud/ipfs',
  'https://4everland.io/ipfs',
  'https://storry.tv/ipfs',
  'https://ipfs.io/ipfs',
  'https://w3s.link/ipfs',
  'https://dweb.link/ipfs',
  'https://trustless-gateway.link/ipfs',
  'https://nftstorage.link/ipfs',
  'https://ipfs.cyou/ipfs',
  'https://dlunar.net/ipfs',
  'https://hardbin.com/ipfs',
  'https://ipfs.runfission.com/ipfs',
  'https://ipfs.eth.aragon.network/ipfs'
]

const state = {
  table: D.getElementById('resultsTable'),
  input: D.getElementById('input')
}

function onload () {
  for (const g of gateways) {
    state.table.appendChild(makeRow(g, 'Unknown'))
  }

  state.input.addEventListener('keydown', e => {
    if (e.code === 'Enter') query()
  })
}

function makeRow (gateway, status) {
  const row = D.createElement('tr')
  const g = D.createElement('td')
  const s = D.createElement('td')

  const link = D.createElement('a')
  link.appendChild(D.createTextNode(gateway))
  link.href = gateway
  g.classList.add('gatewayLink')
  g.appendChild(link)

  status = D.createTextNode(makeStatus(status))
  s.appendChild(status)

  state[gateway] = {
    link,
    status
  }
  row.appendChild(g)
  row.appendChild(s)
  return row
}

function makeStatus (status) {
  if (status === 200) {
    return '✅ 200'
  } else if (status >= 400 && status < 500 && status !== 410) {
    return `❓ ${status}`
  } else if (status === 'Unavailable') {
    return '☠️ Unavailable'
  } else if (status === 'Unknown') {
    return '❔ Unknown'
  } else if (status === 'Checking') {
    return '🔎 Checking...'
  } else {
    return `❌ ${status}`
  }
}

async function query () {
  const cid = state.input.value
  for (const g of gateways) {
    updateUi(g, cid)
  }
}

async function updateUi (gateway, cid) {
  state[gateway].status.textContent = makeStatus('Checking')
  const status = await testGateway(gateway, cid)

  state[gateway].status.textContent = makeStatus(status)
  state[gateway].link.href = `${gateway}/${cid}`
}

async function testGateway (gateway, cid) {
  return fetch(`${gateway}/${cid}`)
    .then(r => r.status)
    .catch(r => { console.log('whoops!'); console.log(r); return 'Unavailable' })
}

onload()
