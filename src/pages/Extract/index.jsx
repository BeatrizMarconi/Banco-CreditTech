import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import TableMovements from "../../components/TableExtract";

export default function TableExtract() {
    return (
        <>
            <Box>
                <Header />
                <Container maxW='960px'>
                    <Box marginTop={20} mb={10}>
                        <Heading>Meu extrato</Heading>
                        <Text>Listagem com todas as movimentações</Text>
                    </Box>
                    <Box>
                        <Box
                            w="100%"
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            borderRadius={8}>

                            <TableMovements initialValue={0} finalValue={-1}/>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}