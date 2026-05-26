import { Container, GlobalStyle } from "./components/CoreUI";
import { InventoryDiscovery } from "./InventoryDiscovery";

function App() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <InventoryDiscovery />
            </Container>
        </>
    );
}

export default App;
