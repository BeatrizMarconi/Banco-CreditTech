import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const toast = useToast()

    const getUser = (email) => {
        api.get("/conta")
            .then((res) => {
                const user = res.data.find((item) => {
                    return item.email === email
                })
                if (user){
                    let token = Math.random().toString(36);
                    window.localStorage.setItem('token', JSON.stringify(token));
                    window.localStorage.setItem('user', JSON.stringify(user));
                    navigate(`/dashboard`)
                }else{
                    toast({
                        title: 'Usuário ou senha incorretos!',
                        status: 'error',
                        duration: 6000,
                        position: 'top',
                        isClosable: true,
                    })
                }

                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const goToLogin = (data) => {
        api.post("/login", data)
            .then((res) => {
                getUser(data.email)
            })
            .catch((error) => {
                toast({
                    title: 'Usuário ou senha incorretos!',
                    status: 'error',
                    duration: 6000,
                    isClosable: true,
                })
                console.log(error)
            });
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}>

            <Stack spacing={8} mx={"auto"} width="500px" py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Acesse sua conta</Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <form onSubmit={handleSubmit(goToLogin)}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Usuário</FormLabel>

                                <Input
                                    type={"email"}
                                    {...register("email", { required: true })}
                                />

                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    type="password"
                                    {...register("senha", { required: true })}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    marginTop={5}
                                    bg={"#3948a1"}
                                    color={"white"}
                                    _hover={{
                                        bg: "pink.300",
                                    }}
                                    type="submit"
                                >
                                    Acessar
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Não possui uma conta?{" "}
                                    <Link style={{ color: "#3948a1" }} to="/signUp">
                                        Cadastre-se
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};
