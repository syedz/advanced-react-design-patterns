import './App.css'
import Ingredients from './components/ingredients'
import IngredientsInfoHelper from './components/ingredients-info-helper'

function App() {
  return (
    <>
      <Ingredients helper={<IngredientsInfoHelper />} />
    </>
  )
}

export default App
