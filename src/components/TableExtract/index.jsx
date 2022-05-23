import { Badge, Box, Container, Heading, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../../services/api";
import moment from 'moment';

export default function TableExtract() {

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [extrato, setExtrato] = useState(0);
    
    

    useEffect(() => {
        api.get(`/conta/extrato/${user.cpf}`)
            .then((res) => {
                // const listaRecentes = res.data.operacoes.sort((a, b) => {
                //     return a.data - b.data;
                // });
                setExtrato(res.data.operacoes)
        
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
                        {extrato === 0 ? (
                            <Tr>
                                <Td><Spinner /></Td>
                            </Tr>)
                            :
                            (
                                extrato.map((listaExtrato, index) => (

                                <Tr key={index}>
                                    <Td>{moment(listaExtrato.data).format('DD/MM/YYYY - HH:mm:ss')}</Td>
                                    <Td>R$ {Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(listaExtrato.valor)}</Td>
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