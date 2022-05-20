import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import Header from "../../components/Header";

export default function Profile() {

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));

    return (
        <>
            <Header />
            <Center py={6}>
                <Box
                    maxW={'500px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                        textAlign={'center'}
                        p={6}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Text
                            fontSize={30}
                            fontWeight={500}
                            p={2}
                            px={3}
                            color={'#3948a1'}
                            rounded={'full'}>
                            Meus dados
                        </Text>
                    </Stack>

                    <Box  px={6} py={10}>
                        <List spacing={3}>
                            <ListItem display={'flex'} alignItems={'end'}>
                                <Text fontSize={20} color={'#3948a1'} fontWeight={500} mr={3}>Nome:</Text>
                                <Text fontSize={17}>{user.nome}</Text>
                            </ListItem>

                            <ListItem display={'flex'} alignItems={'end'}>
                                <Text fontSize={20} color={'#3948a1'} fontWeight={500} mr={3}>CPF:</Text>
                                <Text fontSize={17}>{user.cpf}</Text>
                            </ListItem>

                            <ListItem display={'flex'} alignItems={'end'}>
                                <Text fontSize={20} color={'#3948a1'} fontWeight={500} mr={3}>Data de nascimento:</Text>
                                <Text fontSize={17}>{moment(user.dataNascimento).format('DD/MM/YYYY')}</Text> 
                            </ListItem>

                            <ListItem display={'flex'} alignItems={'end'}>
                                <Text fontSize={20} color={'#3948a1'} fontWeight={500} mr={3}>Telefone:</Text>
                                <Text fontSize={17}>{user.telefone}</Text>
                            </ListItem>

                            <ListItem display={'flex'} alignItems={'end'}>
                                <Text fontSize={20} color={'#3948a1'} fontWeight={500} mr={3}>Email:</Text>
                                <Text fontSize={17}>{user.email}</Text>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </Center>
        </>
    )
}