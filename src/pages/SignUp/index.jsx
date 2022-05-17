
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function SignUp(){

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}>

                <Stack spacing={8} mx={"auto"} width="500px" marginTop={20}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Cadastre-se
                        </Heading>
                    </Stack>
                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="nome" isRequired>
                                <FormLabel>Nome</FormLabel>
                                <Input type="text" />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>E-mail</FormLabel>
                                <Input type="email" />
                            </FormControl>
                            <HStack>
                                <Box width="100%">
                                    <FormControl id="dataNasc" isRequired>
                                        <FormLabel>Data de nasc.</FormLabel>
                                        <Input type="date" />
                                    </FormControl>
                                </Box>
                                <Box width="100%">
                                    <FormControl id="cpf" isRequired>
                                        <FormLabel>CPF</FormLabel>
                                        <Input
                                            as={InputMask}
                                            mask="999.999.999-99"
                                            placeholder="___.___.___-__"
                                            type="text"
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="telefone" isRequired>
                                <FormLabel>Telefone</FormLabel>
                                <Input
                                    as={InputMask}
                                    mask="(99) 99999-9999"
                                    placeholder="(11) 99999-9999"
                                    type="text"
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Cadastrar
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Já possui uma conta?{" "}
                                    <Link style={{ color: "#4299e1" }} to="/login">
                                        Acesse
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};
