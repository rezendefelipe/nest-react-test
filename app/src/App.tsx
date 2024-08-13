// import { useState } from 'react'

import ChannelScreen from "./modules"
import { MantineProvider } from "@mantine/core";



function App() {
  // const [count, setCount] = useState(0)

  return (
    <MantineProvider>
      <ChannelScreen></ChannelScreen>
    </MantineProvider>
  )
}

export default App
