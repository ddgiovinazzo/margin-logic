import { Container, GlobalStyle } from "./components/CoreUI";
import { Header } from "./components/Header";
import { InventoryDiscovery } from "./components/InventoryDiscovery";

function App() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <Header />
                <InventoryDiscovery />
            </Container>
        </>
    );
}

export default App;
