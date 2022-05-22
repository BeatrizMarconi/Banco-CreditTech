import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Header from "../../components/Header";

export default function Dashboard(){
    return(
        <>
            <Box>
                <Header />
                <Container maxW='960px'>
                    <Box marginTop={20} mb={10}>
                        <Heading>Movimentações recentes</Heading>
                    </Box>
                    <Box>
                        <Box
                            w="100%"
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            borderRadius={8}>

                            
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}