import {
    Box,
    Button,
    Container,
    Flex,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { Link } from "react-router-dom";

export const Header = () =>{
    return(
        <>
            <Box borderBotton={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.900")}>
                <Container>
                    <Flex>
                        <Flex>
                            <Text>
                                <Link></Link>
                            </Text>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}