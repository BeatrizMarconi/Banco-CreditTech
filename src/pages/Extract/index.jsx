import { Box, 
    Container, 
    FormLabel, 
    Heading, 
    Select, 
    Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import TableMovements from "../../components/TableExtract";

export default function TableExtract() {

    const buscaExtratoMes = () => {

    }

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
                        <FormLabel>Buscar por mês:</FormLabel>
                        <Select onChange={buscaExtratoMes} width={200} placeholder='Escolha o mês'>
                            <option value="">Janeiro</option>
                            <option value="">Fevereiro</option>
                            <option value="">Março</option>
                            <option value="">Abril</option>
                            <option value="">Maio</option>
                            <option value="">Junho</option>
                            <option value="">Julho</option>
                            <option value="">Agosto</option>
                            <option value="">Setembro</option>
                            <option value="">Outubro</option>
                            <option value="">Novembro</option>
                            <option value="">Dezembro</option>
                        </Select>
                    </Box>

                    <Box mt={5}>
                        <Box
                            w="100%"
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            borderRadius={8}>

                            <TableMovements initialValue={0} finalValue={-1} />
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}