import Web3 from 'web3'
import Voto from '../../../build/contracts/Voto.json'

export default {
    name: 'Voto',
    props: {
    },
    data() { 
        return {
            voto: null,
            cuenta: null,
            partidos: [],
            selectedPartido: 0,
            cargando: false,
            yaVotó: false,
        }
    },
    mounted: async function() {
        await this.cargarWeb3()
        await this.cargarInterfaz()
   },

    methods: {
        async cargarWeb3() {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
                window.ethereum.on('accountsChanged', async (cuentas) => {
                    this.cuenta = cuentas[0]
                    await this.cargarInterfaz()
                })
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider())
            } else {
                alert('No hay metamask.')
            }
        },
        async cargarContrato() {
            const web3 = window.web3
            let idRed = await web3.eth.net.getId()
            let red = Voto.networks[idRed]
            const cuentas = await web3.eth.getAccounts()
            this.cuenta = cuentas[0]
            if (red) {
                this.voto = new web3.eth.Contract(Voto.abi, red.address)
            } else {
                alert('Contrato no instalado en la red seleccionada')
            }
        },
        async cargarCandidatos() {
            this.partidos = []
            let nroPartidos = await this.voto.methods.nroPartidos().call()
            for (let i = 0; i < nroPartidos; i++) {
                let partido = await this.voto.methods.partidos(i).call()
                this.partidos.push(partido)
            }
        },
        async votar() {
            try {
                this.cargando = true
                await this.voto.methods.votar(this.selectedPartido).send({from: this.cuenta})
                this.cargando = false
                await this.cargarCandidatos()
                await this.verSiVotó()
            } catch (e) {
                this.cargando = false
            }
        },
        async verSiVotó() {
            let votó = await this.voto.methods.electores(this.cuenta).call()
            this.yaVotó = votó
        },
        async cargarInterfaz() {
            await this.cargarContrato()
            await this.verSiVotó()
            await this.cargarCandidatos()
        },
    }
}
