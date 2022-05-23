import { Box, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Header from "../../components/Header";
import TableExtract from "../../components/TableExtract";
import { MdAttachMoney } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";

export default function Dashboard() {
    return (
        <>
            <Box>
                <Header />
                <Container maxW={"8xl"}>
                    <Box marginTop={20} mb={10}>
                        <Heading>Movimentações recentes</Heading>
                    </Box>
                    {/* cola o codigo aqui */}
                </Container>
            </Box>
        </>
    )
}