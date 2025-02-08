import { ChakraProvider, Box, Heading} from "@chakra-ui/react";
import ChatBox from "./components/ChatBox";


function App() {
  return (
    <ChakraProvider>
      <Box p={5}>
        <Heading as={hi} mb={6} >
          Khatt
        </Heading>
        <ChatBox />
      </Box>
    </ChakraProvider>
  )

};

export default App;


