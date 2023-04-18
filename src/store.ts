import {initDb} from './query/init'

const state = {
    invoices : [],
    form: {
        name: '',
        phone: '',
        date: '2023/04/02',
        total: 0
    },
    formUnit: [
        {orderNo: 1, aName: '', quantity: 1, price:null},
        {orderNo: 2, aName: '', quantity: 1, price:null},
        {orderNo: 3, aName: '', quantity: 1, price:null},
    ],
}
const getters = {
    getInvoices(state:any) {
        return state.invoices
    },
    getForm(state:any) {
        return state.form;
    },
    getFormUnit(state:any) {
        return state.formUnit;
    }
}
const mutations = {
    setInvoices(state:any, payload:any) {
        state.invoices = payload.values
    },
    setFormInvoices(state:any, payload:any) {
        // state.form = payload[0].main
        state.form.name = payload[0].main.aName
        state.form.phone = payload[0].main.userNumber
        state.form.date = payload[0].main.dateG
        state.form.total = payload[0].main.amountPayed

        state.formUnit = payload[1].units  
        console.log('formunit',state.formUnit)  
    }
}
const actions = {
    async getInvoices({commit}:any) {
        try {
            const init:any = await initDb();
            const res = await init.db?.query(
              "SELECT * FROM InvoiceSell ORDER BY invoiceNo DESC;"
            )
            commit('setInvoices', res)
            // await init.sqlite.closeConnection("NoEncryption");
            return true
          }
          catch(e) {
            console.log('error get invoices ', e)
            return alert('error select invoice ')
          }
    },
    async getInvoice({commit}:any, payload:number) {
        try {
            const init:any = await initDb();
            const res:any = await init.db?.query(
              "SELECT * FROM InvoiceSell WHERE invoiceNo=?;", [payload]
            )

            const pay:any = [{main: res.values[0]}]
            // console.log({pay})
            // queryResult.value = res.values[0]
            // await init.sqilite.closeConnection("NoEncryption");
            // form.name = queryResult.value.aName
            // form.phone = queryResult.value.userNumber
            // form.date = queryResult.value.dateG
            // form.total = queryResult.value.amountPayed
        
            const resItems = await init.db?.query(
              "SELECT * FROM InvoiceSellUnit WHERE invoiceNo=?;", [payload]
            )
            pay.push({units: resItems.values})
            // console.log({pay})
            commit('setFormInvoices', pay)
            
            return true
          }
          catch(e) {
            console.log('error details ', e)
            return alert('error select details')
          }
    }
}
export default {
    namespace: true,
    state,
    getters,
	mutations,
	actions
}