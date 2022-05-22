import { Badge, Box, Container, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import Header from "../Header";

export default function TableExtract() {
    return (
        <>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Data</Th>
                            <Th>Valor</Th>
                            <Th>Operação</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        
                            <Tr>
                                <Td></Td>
                                <Td>R$ </Td>
                                <Td>
                                    <Badge></Badge>
                                </Td>
                            </Tr>

                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}