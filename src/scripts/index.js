const frm = document.querySelector("form")
const respErros = document.querySelector("#outErros")
const respChances = document.querySelector("#outChances")
const respDica = document.querySelector("#outDica")

class Sorteado {
    constructor() {
    }
     #sorteio() {
        const sorteio = Math.floor(Math.random() * 100) + 1
        return sorteio
    }

    getSorteio() {
        return this.#sorteio()
    }
}

const erros = []
const sorteioObj = new Sorteado()  
const sorteado = sorteioObj.getSorteio() 
const chances = 6

frm.addEventListener('submit', (e) => {
    e.preventDefault()
    const numero = Number(frm.inNum.value)
    if (numero == sorteado) {
        respDica.innerText = `Parabéns!! Número sorteado: ${sorteado}`
        frm.btnSubmit.disabled = true
        frm.btnNew.className = "exibe"
    } else {
        if (erros.includes(numero)) {
            const title = document.getElementById('titulo')
            title.innerText = `Você já apostou o número ${numero}. tente outro...`
            setTimeout(() => {
                title.innerText = "Acerte o Número"
            },2000)
        } else {
            erros.push(numero)
            const numErros = erros.length
            const numChances = chances - numErros
            respErros.innerText = `${numErros} (${erros.join(", ")})`
            respChances.innerText = numChances

            if ( numChances == 0) {
                alert('suas chances acabaram!')
                frm.btnSubmit.disabled = true
                frm.btnNew.className = "exibe"
                respDica.innerText = `Game Over!! Número Sorteado: ${sorteado}`
            } else {
                const dica = numero < sorteado ? "maior" : "menor"
                respDica.innerText = `Dica: tente um numero ${dica} que ${numero}`
            }
        }
    }

    frm.inNum.value = ""
    frm.inNum.focus()

})

frm.btnNew.addEventListener("click", () => {
    location.reload()
})