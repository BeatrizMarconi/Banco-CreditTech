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
    Alert,
    AlertIcon,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { auth } from "../../services/auth"
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(true);

    const {register,handleSubmit} = useForm();

    //função recebe dados input e manda pra auth verificar e guardar no user o retorno (true ou false)
    const goToLogin = (data) => {
        const user = auth(data);

        if (user) {
            navigate(`/dashboard`);
        } else {
            setError(user);
        }
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
                            {!error && (
                                <Alert status="error">
                                    <AlertIcon />
                                    Usuário ou senha incorretos
                                </Alert>
                            )}
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
                                    {...register("password", { required: true })}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    marginTop={5}
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                    type="submit"
                                >
                                    Acessar
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Não possui uma conta?{" "}
                                    <Link style={{ color: "#4299e1" }} to="/signUp">
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
