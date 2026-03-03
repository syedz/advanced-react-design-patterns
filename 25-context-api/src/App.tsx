import { useContext } from 'react'
import './App.css'
import ColorSelect from './components/color-selector/color-select';
import { ColorContext } from './context/context';
import SetColors from './components/set-colors';
import ColorGroups from './components/color-group';
import SavedColors from './components/saved-colors';

function App() {
  const { hexColor, dispatch } = useContext(ColorContext);

  return (
    <div className="grid">
      <ColorSelect
        hexColor={hexColor}
        onChange={(e) =>
          dispatch({
            type: "update-hex",
            payload: { hexColor: e.target.value },
          })
        }
      />
      <SetColors dispatch={dispatch} hexColor={hexColor} />
      <ColorGroups hexColor={hexColor} />
      <SavedColors hexColor={hexColor} dispatch={dispatch} />
    </div>
  );
}

export default App
