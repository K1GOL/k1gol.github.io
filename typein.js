function rng(min, max) {
    return Math.random() * (max - min) + min;
}

const typeInElement = (el) => {
    let remaining = el.innerText
    el.innerText = "_"
    const i = setInterval(() => {
        let it = el.innerText

        if (remaining == "") {
            clearInterval(i)
            el.innerText = it.substring(0, it.length - 1)
            return
        }

        let substr = it.substring(0, it.length - 1)
        substr += remaining.substring(0, 1)
        substr += "_"
        el.innerText = substr
        remaining = remaining.slice(1)
    }, rng(500, 2000) / remaining.length)
}

const typeIn = () => {
    const elements = document.getElementsByClassName("js-type-in")

    for (const element of elements) {
        typeInElement(element)
    }
}