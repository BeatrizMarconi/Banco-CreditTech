
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
    FormErrorMessage,
    useToast,
    Spinner
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api"

export default function SignUp() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast()
    const [loading, setLoading] = useState(false);


    const goToSignUp = (data) => {
        api.get("/conta")
            .then((res) => {
                const user = res.data.find((item) => {
                    return item.email === data.email || item.cpf === data.cpf
                })
                if (user) {
                    toast({
                        title: 'Esse cadastro ja existe!',
                        status: 'error',
                        duration: 6000,
                        position: 'top',
                        isClosable: true,
                    })
                } else {
                    setLoading(true);
                    api.post("/conta", data)
                        .then((res) => {
                            toast({
                                title: 'Usuário cadastrado com sucesso!',
                                status: 'success',
                                duration: 4000,
                                position: 'top',
                                isClosable: true,
                            })
                            navigate(`/login`)
                            setLoading(false);
                        })
                        .catch((error) => {
                            toast({
                                title: 'Erro ao cadastrar usuário!',
                                status: 'error',
                                duration: 6000,
                                position: 'top',
                                isClosable: true,
                            })
                            setLoading(false);
                        });
                }

            })

    }

    return (
        <>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}>

                <Stack spacing={8} mx={"auto"} width="500px">
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Cadastre-se
                        </Heading>
                    </Stack>
                    <form onSubmit={handleSubmit(goToSignUp)}>
                        <Box
                            rounded={"lg"}
                            bg={useColorModeValue("white", "gray.700")}
                            boxShadow={"lg"}
                            p={8}
                        >
                            <Stack spacing={4}>
                                <FormControl id="nome" isRequired>
                                    <FormLabel>Nome</FormLabel>
                                    <Input type="text" {...register("nome", { required: true })} />

                                </FormControl>
                                <FormControl id="email" isRequired>
                                    <FormLabel>E-mail</FormLabel>
                                    <Input type="email" {...register("email", { required: true })} />

                                </FormControl>
                                <HStack alignItems="flex-start">
                                    <Box width="100%">
                                        <FormControl id="dataNasc" isRequired>
                                            <FormLabel>Data de nasc.</FormLabel>
                                            <Input type="date" {...register("dataNascimento", { required: true })} />

                                        </FormControl>
                                    </Box>
                                    <Box width="100%">
                                        <FormControl id="cpf" isInvalid={errors.cpf}>
                                            <FormLabel>CPF <span style={{ color: "#e53e3e" }}>*</span></FormLabel>
                                            <Input
                                                as={InputMask}
                                                mask="999.999.999-99"
                                                placeholder="___.___.___-__"
                                                type="text"
                                                {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ })} />
                                            <FormErrorMessage>Preenchimento obrigatório.</FormErrorMessage>

                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl id="telefone" isInvalid={errors.telefone}>
                                    <FormLabel>Telefone <span style={{ color: "#e53e3e" }}>*</span></FormLabel>
                                    <Input
                                        as={InputMask}
                                        mask="(99) 99999-9999"
                                        placeholder="(11) 99999-9999"
                                        type="text"
                                        {...register("telefone", { required: true, pattern: /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/ })} />
                                    <FormErrorMessage>Preenchimento obrigatório.</FormErrorMessage>

                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Senha</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? "text" : "password"}
                                            {...register("senha", { required: true })} />

                                        <InputRightElement h={"full"}>
                                            <Button
                                                variant={"ghost"}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)}>
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        loadingText="Submitting"
                                        size="lg"
                                        bg={"#3948a1"}
                                        color={"white"}
                                        _hover={{ bg: "pink.300" }}
                                        type="submit"
                                        disabled={loading}>
                                        {loading ? <Spinner/> : 'Cadastrar'}
                                    </Button>
                                </Stack>
                                <Stack pt={6}>
                                    <Text align={"center"}>
                                        Já possui uma conta?{" "}
                                        <Link style={{ color: "#3948a1" }} to="/login">
                                            Acesse
                                        </Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                    </form>
                </Stack>
            </Flex>
        </>
    );
};
