import { Box, 
    Container, 
    FormLabel, 
    Heading, 
    Select, 
    Text } from "@chakra-ui/react";
import { useContext } from "react";
import Header from "../../components/Header";
import TableMovements from "../../components/TableExtract";
import { AppContext } from "../../context/appContext";

export default function TableExtract() {

    const {monthSelect, setMonthSelect} = useContext(AppContext);

    const buscaExtratoMes = (e) => {
        setMonthSelect(e.target.value)
    }

    return (
        <>
            <Box>
                <Header />
                <Container maxW={"8xl"}>
                    <Box marginTop={20} mb={10}>
                        <Heading>Meu extrato</Heading>
                        <Text>Listagem com todas as movimentações</Text>
                    </Box>

                    <Box>
                        <FormLabel>Buscar por mês:</FormLabel>
                        <Select onChange={buscaExtratoMes} width={200} placeholder='Escolha o mês'>
                            <option value="01">Janeiro</option>
                            <option value="02">Fevereiro</option>
                            <option value="03">Março</option>
                            <option value="04">Abril</option>
                            <option value="05">Maio</option>
                            <option value="06">Junho</option>
                            <option value="07">Julho</option>
                            <option value="08">Agosto</option>
                            <option value="09">Setembro</option>
                            <option value="10">Outubro</option>
                            <option value="11">Novembro</option>
                            <option value="12">Dezembro</option>
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