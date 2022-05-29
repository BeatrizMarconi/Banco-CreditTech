import { Badge, 
        Spinner, 
        Table, 
        TableContainer, 
        Tbody, 
        Td, 
        Text, 
        Th, 
        Thead, 
        Tr } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import moment from 'moment';
import formatMoney from "../../helpers/formatMoney";
import { AppContext } from "../../context/appContext";

export default function TableExtract({ initialValue, finalValue }) {

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [extrato, setExtrato] = useState(0);
    const [ExtratoLoad, setExtratoLoad] = useState(true);
    const { monthSelect, setMonthSelect } = useContext(AppContext);


    //traz o extrato normal ou por mês se o componente extrato mudar o monthSelect que está no context.
    useEffect(() => {
        const query = `?mes=${monthSelect}`;

        api.get(`/conta/extrato/${user.cpf}${(monthSelect) ? query : ''}`)
            .then((res) => {
                let listaRecentes = null;

                if (finalValue > 0) { // traz extrato e ordena do mais no para o mais velho e limita a lista 
                    listaRecentes = res.data.operacoes
                        .sort((a, b) => new Date(b.data) - new Date(a.data)) 
                        .slice(initialValue, finalValue)
                } else { // traz extrato e ordena do mais no para o mais velho
                    listaRecentes = res.data.operacoes
                        .sort((a, b) => new Date(b.data) - new Date(a.data)) 
                }


                setExtrato(listaRecentes)
                setExtratoLoad(false)

            })
            .catch((error) => {
                console.log(error);
            })

    }, [monthSelect])



    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Data/Hora</Th>
                            <Th>Valor</Th>
                            <Th>Operação</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ExtratoLoad && <Tr><Td colSpan={3} textAlign="center" py={10}><Spinner /></Td></Tr>} 
                        {!ExtratoLoad &&
                            <>
                                {extrato.length > 0 ? // lista for maior que 0 ele faz o map e retorna os valores
                                    (
                                        extrato.map((listaExtrato, index) => (

                                            <Tr key={index}>
                                                <Td>{moment(listaExtrato.data).format('DD/MM/YYYY - HH:mm:ss')}</Td>

                                                <Td color={listaExtrato.tipo === 'SAIDA' ? 'red' : '#000'}>{listaExtrato.tipo === 'SAIDA' ? (<Text>-{formatMoney(listaExtrato.valor)}</Text>) : (<Text>{formatMoney(listaExtrato.valor)}</Text>)}</Td>

                                                <Td>
                                                    <Badge colorScheme={(listaExtrato.tipo === 'SAIDA') ? 'red' : 'green'}>{listaExtrato.tipo}</Badge>
                                                </Td>
                                            </Tr>

                                        ))
                                    ) :
                                    ( // se não for mostra a mensagem
                                        <Tr>
                                            <Td colSpan={3} textAlign="center" py={10}><Text>Nenhum dado encontrado.</Text></Td>
                                        </Tr>
                                    )
                                }

                            </>
                        }

                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}