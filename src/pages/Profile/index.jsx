import {
    Box,
    Text,
    List,
    ListItem,
    Container,
    Heading,
} from '@chakra-ui/react';
import moment from 'moment';
import { useState } from 'react';
import Header from "../../components/Header";

export default function Profile() {

    const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("user")));

    return (
        <>
            <Box>
                <Header />
                <Container maxW='960px'>
                    <Box marginTop={20} mb={10}>
                        <Heading>Meus dados</Heading>
                        <Text>Dados pessoais</Text>
                    </Box>
                    <Box>
                        <Box
                            w="100%"
                            border="1px"
                            borderColor="gray.200"
                            p={4}
                            borderRadius={8}>

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
                </Container>
            </Box>
        </>
    )
}