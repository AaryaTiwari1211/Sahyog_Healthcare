import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
// import { ProvideAuth } from "@arcana/auth-react";
// import { AuthProvider, CHAIN } from "@arcana/auth";
// import { InteractionProvider } from './components/contract/Interaction';

// const appID = "xar_test_96ae703cb1c7d6a2ef5238f4a1901f22f153a836";

// export const ArcanaProvider = new AuthProvider(appID, {
//   network: "testnet", //defaults to 'testnet'
//   position: "right", //defaults to right
//   theme: "light", //defaults to dark
//   alwaysVisible: true, //defaults to true which is Full UI mode
//   chainConfig: {
//     chainId: CHAIN.POLYGON_MUMBAI_TESTNET, //defaults to CHAIN.ETHEREUM_MAINNET
//     rpcUrl: "https://polygon-rpc.com", //defaults to 'https://rpc.ankr.com/eth'
//   },
// });

function App() {

  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
