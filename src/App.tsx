//import { Basic } from './components/Basic';
//import { UseZod } from './components/UseZod';
import { TabsDemo } from './components/TabsDemo';
//import { Split }from './components/Split'
//import { SplitZod }from './components/SplitZod'
import { Synch } from './components/Synch'


import { Typography }from '@mui/material'

function App() {
  
  return (
    <>
      <Typography variant="h6" sx={{ m:3}}>Examples of individual React MUI tags can be found in the react-mui-vite-typescript repo</Typography>
      
      {/* react mui and react hook form */}
      {/* <Basic /> */}

      {/* Uses react mui, react hook form, and zod */}
       {/* < UseZod /> */}

      {/* react mui demo */}
       {/* < TabsDemo />  */}

      {/* react hook form having child components */}
      {/* < Split />*/}

      {/*  react hook, and zod  form having child components */}
      {/* < SplitZod />  */}

      {/* Synch Tool */}
       <Synch />
    </>
  )
}

export default App
