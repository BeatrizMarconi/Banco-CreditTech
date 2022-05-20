export default function FormatMoney(valor){
    let valorFormatado = parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}).replace(".", ",");
    console.log(valorFormatado)
}