import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import TableExtract from "../../components/TableExtract";
import { MdAttachMoney } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/appContext";

export default function Dashboard() {

    const navigate = useNavigate();
    const goToExtract = () => navigate(`/extract`);
    const goToOperations = () => navigate(`/operations`);
    const {monthSelect, setMonthSelect} = useContext(AppContext);

    useEffect(()=>{
        setMonthSelect(null)
    },[])

    return (
        <>
            <Box>
                <Header />
                <Container maxW={"8xl"}>
                    <Box marginTop={20} mb={10}>
                        <Heading>Movimentações recentes</Heading>
                    </Box>

                    <Box>
                        <Flex
                            w="100%"
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            borderRadius={8}>

                            <Box
                                w="70%"
                                border="1px"
                                borderColor="gray.200"
                                p={4}
                                borderRadius={8}
                                m={2}
                            >
                                <TableExtract initialValue={0} finalValue={6} />

                            </Box>
                            <Box width="30%">
                                <Box>
                                    <Box
                                        onClick={goToExtract}
                                        width="100%"
                                        border="1px"
                                        borderColor="gray.200"
                                        p={4}
                                        borderRadius={8}
                                        m={2}
                                        cursor="pointer"
                                        _hover={{
                                            boxShadow: "lg",
                                        }}
                                    >
                                        <Box>
                                            <HStack
                                                borderBottom="1px"
                                                borderColor="gray.200"
                                                pb={1}
                                                mb={4}
                                            >
                                                <MdAttachMoney fontSize={20} />
                                                <Heading fontSize={20}>Ver meu extrato</Heading>
                                            </HStack>
                                            <Text fontSize={14} color={"gray.500"}>
                                                Clique aqui e veja os detalhes de todas as movimentações na sua conta.
                                            </Text>
                                        </Box>
                                    </Box>
                                    <Box
                                        onClick={goToOperations}
                                        width="100%"
                                        border="1px"
                                        borderColor="gray.200"
                                        p={4}
                                        borderRadius={8}
                                        m={2}
                                        mt={4}
                                        cursor="pointer"
                                        _hover={{
                                            boxShadow: "lg",
                                        }}
                                    >
                                        <Box>
                                            <HStack
                                                borderBottom="1px"
                                                borderColor="gray.200"
                                                pb={1}
                                                mb={4}
                                            >
                                                <FaExchangeAlt fontSize={20} />
                                                <Heading fontSize={20}>Tansferência</Heading>
                                            </HStack>
                                            <Text fontSize={14} color={"gray.500"}>
                                                Envie dados de sua conta para conta de terceiros usando o modo de transferência de valores.
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Flex>
                    </Box>
                </Container>
            </Box>
        </>
    )
}