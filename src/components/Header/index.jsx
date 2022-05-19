import React from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Container,
    Flex,
    HStack,
    IconButton,
    Stack,
    useColorModeValue,
    useDisclosure,
    Image
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { isLogged } from "../../services";
import { PrivateNav } from "../PrivateNav";

export default function Header() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const goToLogin = () => navigate(`/login`);
    // const goToProfile = () => navigate(`/perfil`);
    const [userIsLogged] = isLogged();

    const logout = () => {
        window.localStorage.setItem("token", JSON.stringify(""));
        navigate(`/`);
    };

    return (
        <>
            <Box
                px={{ base: 4, md: 4 }}
                py={{ base: 4, md: 2 }}
                alignItems="center"
                bg={useColorModeValue("white", "gray.900")}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue("gray.200", "gray.700")}
                justifyContent={{ base: "space-between", md: "flex-end" }}>

                <Container maxW={"8xl"}>
                    <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                        <IconButton
                            size={"md"}
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label={"Open Menu"}
                            display={{ md: "none" }}
                            onClick={isOpen ? onClose : onOpen} />

                        <HStack spacing={8} alignItems={"center"}>
                            <Box p={2}>
                                <Image src={logo} boxSize="70px" />
                            </Box>
                            {userIsLogged && (
                                <HStack
                                    as={"nav"}
                                    spacing={4}
                                    display={{ base: "none", md: "flex" }}
                                >
                                    <PrivateNav />
                                </HStack>
                            )}
                        </HStack>
                        <HStack spacing={{ base: "0", md: "6" }}>
                            {userIsLogged && (
                                <Flex alignItems={"center"}>
                                    <Button  onClick={logout}
                                        fontSize={"md"}
                                        fontWeight={600}
                                        color={"white"}
                                        bg={"pink.400"}
                                        padding={0}
                                        href={"#"}
                                        _hover={{
                                        bg: "pink.300",}}
                                        width="60px">
                                                Sair
                                    </Button>
                                </Flex>
                            )}
                        </HStack>
                        {!userIsLogged && (
                            <Stack
                                flex={{ base: 1, md: 0 }}
                                justify={"flex-end"}
                                direction={"row"}
                                spacing={6}
                            >
                                <Button
                                    onClick={goToLogin}
                                    padding={0}
                                    fontSize={"sm"}
                                    fontWeight={400}
                                    variant={"link"}
                                >
                                    ACESSAR
                                </Button>
                                <Button
                                    fontSize={"sm"}
                                    fontWeight={600}
                                    color={"white"}
                                    bg={"#3948a1"}
                                    padding={0}
                                    href={"#"}
                                    _hover={{bg: "pink.300",}}
                                >
                                    <Link
                                        style={{ padding: "12px 15px", }}
                                        to="/signUp"
                                    >
                                        CADASTRO
                                    </Link>
                                </Button>
                            </Stack>
                        )}
                    </Flex>

                    {isOpen ? (
                        <Box pb={4} display={{ md: "none" }}>
                            <Stack as={"nav"} spacing={4}>
                                <PrivateNav />
                            </Stack>
                        </Box>
                    ) : null}
                </Container>
            </Box>
        </>
    )
}