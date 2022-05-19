
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
    FormErrorMessage
} from "@chakra-ui/react";
import InputMask from "react-input-mask";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    // const [error, setError] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const goToSignUp = (data) => {
        console.log(data)
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
                                    <Input type="email" {...register("email", { required: true })}/>
                                    
                                </FormControl>
                                <HStack alignItems="flex-start">
                                    <Box width="100%">
                                        <FormControl id="dataNasc" isRequired>
                                            <FormLabel>Data de nasc.</FormLabel>
                                            <Input type="date" {...register("dataNascimento", { required: true })}/>

                                        </FormControl>
                                    </Box>
                                    <Box width="100%">
                                        <FormControl id="cpf" isInvalid={errors.cpf}>
                                            <FormLabel>CPF <span style={{color:"#e53e3e"}}>*</span></FormLabel>
                                            <Input
                                                as={InputMask}
                                                mask="999.999.999-99"
                                                placeholder="___.___.___-__"
                                                type="text"
                                                {...register("cpf", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/})}/>
                                                <FormErrorMessage>Preenchimento obrigatório.</FormErrorMessage>
                                                
                                        </FormControl>
                                    </Box>
                                </HStack>
                                <FormControl id="telefone" isInvalid={errors.telefone}>
                                    <FormLabel>Telefone <span style={{color:"#e53e3e"}}>*</span></FormLabel>
                                    <Input
                                        as={InputMask}
                                        mask="(99) 99999-9999"
                                        placeholder="(11) 99999-9999"
                                        type="text"
                                        {...register("telefone", { required: true, pattern: /^(\(11\) (9\d{4})-\d{4})|((\(1[2-9]{1}\)|\([2-9]{1}\d{1}\)) [5-9]\d{3}-\d{4})$/ })}/>
                                        <FormErrorMessage>Preenchimento obrigatório.</FormErrorMessage>
                                    
                                </FormControl>
                                <FormControl id="password" isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? "text" : "password"} 
                                        {...register("password", { required: true })}/>
                                        
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
                                        bg={"blue.400"}
                                        color={"white"}
                                        _hover={{ bg: "blue.500" }}
                                        type="submit"
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
                    </form>
                </Stack>
            </Flex>
        </>
    );
};
