import {
    Box,
    Text,
    Stack,
    Container,
    Heading,
    Image,
} from "@chakra-ui/react";
import Header from "../../components/Header";

export default function Home() {

    return (
        <>
            <Header />
            <Box>
                <Container maxW={"8xl"}>
                    <Stack
                        textAlign={"center"}
                        align={"center"}
                        spacing={{ base: 8, md: 10 }}
                        marginTop={20}
                        marginBottom={10}
                    >
                        <Heading
                            fontWeight={600}
                            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                            lineHeight={"110%"}
                        >
                            <Text as={"span"} color={"#3948a1"}>
                            CreditTech
                            </Text>
                            ,o banco do futuro{" "}
                        </Heading>
                        <Text color={"gray.500"} maxW={"3xl"}>
                            Nossa missão é promover a melhoria da qualidade de vida, atuando em microfinanças como agente de inclusão, desenvolvimento e transformação social trazendo para todos uma tecnologia inovadora.
                        </Text>
                    </Stack>
                    <Stack
                        textAlign={"center"}
                        align={"center"}
                    >
                        <Image
                            width={800}
                            alt={"Login Image"}
                            objectFit={"cover"}
                            src={
                                "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            }
                        />
                    </Stack>
                </Container>
            </Box>

        </>
    )
};    