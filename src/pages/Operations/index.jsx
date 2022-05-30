import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import InputMask from "react-input-mask";
import api from "../../services/api";
import IntlCurrencyInput from "react-intl-currency-input";
import { AppContext } from "../../context/appContext";

//config da mascara input valor
const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

export default function Operations() {

    //do chakra
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [inputMoney, setInputMoney] = useState(0)
    const { saldo, setSaldo } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigateHome = () => navigate('/dashboard');

    //guarda valor digitado na state setInputMoney.
    const handleChange = (event, value, maskedValue) => {
        setInputMoney(value)
    }
    
    // cria um objeto e valida se os dados estão de acordo e se existe o CPF na base, se sim ele leva os dados e atualiza o context do saldo.
    const getOperationData = (data) => {

        const obj = {
            remetente: user.cpf,
            destinatario: data.destinatario,
            valor: inputMoney
        }

        if (inputMoney > saldo) {
            toast({
                title: 'Saldo insuficiente!',
                status: 'error',
                duration: 6000,
                position: 'top',
                isClosable: true,
            })
        } else if (inputMoney === 0) {
            toast({
                title: 'Por favor, digite um valor!',
                status: 'error',
                duration: 6000,
                position: 'top',
                isClosable: true,
            })
            return false
        }
        else {
            api.get("/conta")
                .then((res) => {
                    const cpfValidação = res.data.find((item) => {
                        return item.cpf === data.destinatario
                    })
                    if (cpfValidação) {
                        setLoading(true);
                        api.post("/conta/operacao", obj)
                            .then(() => {
                                setLoading(false);
                                onOpen() //chama o alert de escolhas
                                api.get(`/conta/saldo/${user.cpf}`)
                                    .then((res) => {
                                        setSaldo(res.data.saldo)
                                    })
                                    .catch(() => {

                                    })
                            })
                            .catch(() => {
                                toast({
                                    title: 'Ops algo deu errado!',
                                    status: 'error',
                                    duration: 6000,
                                    position: 'top',
                                    isClosable: true,
                                })
                                setLoading(false);
                            })
                    } else {
                        toast({
                            title: 'CPF do destinatário não cadastrado!',
                            status: 'error',
                            duration: 6000,
                            position: 'top',
                            isClosable: true,
                        })
                    }
                })
        }
    }

    return (
        <>
            <Box>
                <Header />
                <Container maxW={"8xl"}>
                    <Box marginTop={20} mb={10}>
                        <Heading>Transferência</Heading>
                        <Text>Transferir valores para outras contas</Text>
                    </Box>
                    <Box>
                        <Box
                            w="100%"
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            borderRadius={8}>

                            <form onSubmit={handleSubmit(getOperationData)}>

                                <FormControl id="destinatario" isInvalid={errors.destinatario}>
                                    <FormLabel mt={7}>CPF destinatário: <span style={{ color: "#e53e3e" }}>*</span></FormLabel>
                                    <Input
                                        as={InputMask}
                                        mask="999.999.999-99"
                                        placeholder="___.___.___-__"
                                        type="text"
                                        width={'100%'}
                                        maxW={'xl'}
                                        {...register("destinatario", { required: true, pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ })} />
                                    <FormErrorMessage>Preenchimento obrigatório.</FormErrorMessage>
                                </FormControl>

                                <FormControl id="valor" isRequired>
                                    <FormLabel mt={7}>Valor:</FormLabel>
                                    <Input
                                        as={IntlCurrencyInput}
                                        placeholder="R$ 0,00"
                                        _placeholder={{ color: 'gray.500' }}
                                        type="text"
                                        width={'100%'}
                                        maxW={'xl'}
                                        currency="BRL" config={currencyConfig}
                                        onChange={handleChange} />
                                </FormControl>

                                <Stack spacing={6}>
                                    <Button
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{ bg: 'blue.500', }}
                                        mt={7}
                                        width={200}
                                        type="submit"
                                        disabled={loading}>
                                        Enviar
                                    </Button>
                                </Stack>
                            </form>
                        </Box>
                    </Box>
                </Container>
            </Box>

        {/*abre um alert para escolha*/}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Operação realizada com sucesso!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Deseja realizar uma nova transferência?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Sim
                            </Button>
                            <Button colorScheme='red' onClick={navigateHome} ml={3}>
                                Não
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}