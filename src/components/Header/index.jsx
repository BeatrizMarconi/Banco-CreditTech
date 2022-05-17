import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { isLogged } from "../../services";

export default function Header() {

    const [userIsLogged] = isLogged();
    return (
        <>
            <Box
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
            >
                <Container maxW={"8xl"}>
                    <Flex
                        bg={useColorModeValue("white", "gray.800")}
                        color={useColorModeValue("gray.600", "white")}
                        minH={"60px"}
                        py={{ base: 2 }}
                        px={{ base: 4 }}
                        align={"center"}
                    >
                        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
                            <Text
                                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                                fontFamily={"heading"}
                                color={useColorModeValue("gray.800", "white")}
                            >
                                <Link to="/"><Image src={logo} boxSize='80px' /></Link>
                            </Text>
                        </Flex>

                        {userIsLogged !== '' ?
                            <Stack
                                flex={{ base: 1, md: 0 }}
                                justify={"flex-end"}
                                direction={"row"}
                                spacing={6}>

                                <Button fontSize={"sm"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"pink.400"}
                                    href={"#"}
                                    _hover={{
                                        bg: "pink.300",
                                    }}>

                                </Button>
                            </Stack>
                            :
                            <Stack
                                flex={{ base: 1, md: 0 }}
                                justify={"flex-end"}
                                direction={"row"}
                                spacing={6}>

                                <Button
                                    as={"a"}
                                    padding={0}
                                    fontSize={"sm"}
                                    fontWeight={400}
                                    variant={"link"}
                                    href={"#"}>

                                    <Link style={{padding: "12px 15px"}} to="/login">Acessar</Link>

                                </Button>

                            </Stack>
                        }
                    </Flex>
                </Container>
            </Box>
        </>
    )
}