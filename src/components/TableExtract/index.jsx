import { Badge, Box, Container, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import moment from 'moment';
import formatMoney from "../../helpers/formatMoney";

export default function TableExtract({initialValue, finalValue}) {

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [extrato, setExtrato] = useState(0);
    const [ExtratoLoad, setExtratoLoad] = useState(true);
    
    

    useEffect(() => {
        api.get(`/conta/extrato/${user.cpf}`)
            .then((res) => {
                let listaRecentes = null;
                
                if(finalValue > 0){
                    listaRecentes = res.data.operacoes
                    .sort((a, b) => new Date(b.data)- new Date(a.data))
                    .slice(initialValue, finalValue)
                }else{
                    listaRecentes = res.data.operacoes
                    .sort((a, b) => new Date(b.data) - new Date(a.data))
                }


                setExtrato(listaRecentes)
                setExtratoLoad(false)
        
            })
            .catch(() => {
                console.log("vish deu ruim")
            })

    }, [])

  

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
                        {ExtratoLoad ? (
                            <Tr>
                                <Td><Spinner /></Td>
                            </Tr>)
                            :
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
                            )}

                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}