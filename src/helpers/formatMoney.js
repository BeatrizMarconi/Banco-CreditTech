export default function formatMoney (value){
    return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
}