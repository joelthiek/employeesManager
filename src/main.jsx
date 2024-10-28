import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { ChakraProvider } from "@chakra-ui/react"
import "./index.css"
import Container from "./components/container/Container.jsx"
import { BrowserRouter as Router } from "react-router-dom"
import AuthProvider from "./utils/firebase/authContext/AuthContext.jsx"
import store from "./redux/store.js"
import {Provider} from "react-redux"
import theme from "./utils/theme/theme.js"

createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Container>
            <App />
          </Container>
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  </Router>
)
