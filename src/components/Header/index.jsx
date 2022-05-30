import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FiChevronDown } from "react-icons/fi";
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
    Image,
    Text,
    Menu,
    MenuButton,
    VStack,
    MenuList,
    MenuItem,
    MenuDivider,
    Spinner,

} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { isLogged } from "../../services/auth";
import { PrivateNav } from "../PrivateNav";
import api from "../../services/api";
import { AppContext } from "../../context/appContext";
import formatMoney from "../../helpers/formatMoney";
import getFirstName from "../../helpers/getFirstName";


export default function Header() {

    //useDisclosure do chakra 
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();
    const goToLogin = () => navigate(`/login`);
    const goToProfile = () => navigate(`/profile`);
    const [userIsLogged] = isLogged();
    const {saldo, setSaldo} = useContext(AppContext);
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user"))); //guarda o usuário salvo no localStorage.
    const [saldoLoad, setSaldoLoad] = useState(true);


    // Função para limpar o localStorage e navegar para home.
    const logout = () => {
        window.localStorage.clear();
        navigate(`/`);
    };

    //traz o saldo e atualiza o context.
    useEffect(() => {
        if (user) {
            api.get(`/conta/saldo/${user.cpf}`)
                .then((res) => {
                    setSaldo(res.data.saldo)
                    setSaldoLoad(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [])

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
                            {userIsLogged && ( //se tiver algo dentro de userIsLogged executa.
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
                            {userIsLogged && ( //se tiver algo dentro de userIsLogged executa.
                                <Flex alignItems={"center"}>
                                    <Box
                                        marginRight={8}
                                        borderRight="1px"
                                        borderColor={"gray.200"}
                                        paddingRight={8}
                                    >
                                        <Text>Saldo</Text>

                                        <Text fontWeight={700} fontSize={"18px"}
                                        color={saldo < 0  ? 'red' : '#000'}>
                                            {saldoLoad ? (<Spinner />) : (<>{formatMoney(saldo)}</>)}
                                        </Text>
                                    </Box>
                                    <Menu>
                                        <MenuButton
                                            py={2}
                                            transition="all 0.3s"
                                            _focus={{ boxShadow: "none" }}
                                        >
                                            <HStack>
                                                <VStack
                                                    display={{ base: "none", md: "flex" }}
                                                    alignItems="flex-start"
                                                    spacing="1px"
                                                    ml="2"
                                                >
                                                    <Text fontSize="sm">OLÁ, {getFirstName(user.nome)}</Text>
                                                </VStack>
                                                <Box display={{ base: "none", md: "flex" }}>
                                                    <FiChevronDown />
                                                </Box>
                                            </HStack>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={goToProfile}>
                                                Meu perfil
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem onClick={logout}>Sair</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            )}
                        </HStack>
                        {!userIsLogged && ( //se não tiver nada em userIsLogged
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
                                    _hover={{ bg: "pink.300", }}
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