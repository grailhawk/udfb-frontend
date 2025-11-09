import { useState } from 'react'
import { Button, Segment, Sidebar, SidebarPushable, SidebarPusher } from 'semantic-ui-react'

import './App.css'
import FieldSelector from './components/FieldSelector/FieldSelector'

const VerticalSpaceTesting = () => {
  return <><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></>
}

function App() {
  const [showFieldSelector, setShowFieldSelector] = useState(true)


  return (
    <div>
      <SidebarPushable as={Segment}>
        <Sidebar as={Segment} animation='uncover' visible={showFieldSelector} onHide={() => setShowFieldSelector(false)}>
          <FieldSelector />
        </Sidebar>
        <SidebarPusher>
          <Button
            onClick={() => {
              setShowFieldSelector(!showFieldSelector)
            }}>toggle
          </Button>          
        </SidebarPusher>
      </SidebarPushable>
    </div>
  )
}

export default App
