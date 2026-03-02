import { Basic } from './components/Basic';
//import { UseZod } from './components/UseZod';
//import { TabsDemo } from './components/TabsDemo';
import { Typography }from '@mui/material'

function App() {
  
  return (
    <>
      <Typography variant="h6" sx={{ m:3}}>Examples of individual React MUI tags can be found in the react-mui-vite-typescript repo</Typography>
       <Basic /> 
     {/*  < UseZod /> */}
      {/* < TabsDemo /> */}
    </>
  )
}

export default App
