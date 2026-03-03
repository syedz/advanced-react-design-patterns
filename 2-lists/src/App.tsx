import './App.css'

import { LargeAuthorListItems } from './components/authors/LargeAuthorListItems'
import { SmallAuthorListItems } from './components/authors/SmallAuthorListItems'

import { LargeBookListItem } from './components/books/LargeBookListItems'
import { SmallBookListItem } from './components/books/SmallBookListItems'
import { NumberedList } from './components/lists/Numbered'

import { RegularList } from './components/lists/Regular'
import { Modal } from './components/Modal'

import { authors } from './data/authors'
import { books } from './data/books'

function App() {

  return (
    <>
      {/* Rendering the Small Version */}
      {/* <RegularList
        items={authors}
        sourceName={"author"}
        ItemComponent={SmallAuthorListItems}
      /> */}
      
      {/* Rendering the Large Version using the same List component */}
      {/* <RegularList
        items={authors}
        sourceName={"author"}
        ItemComponent={LargeAuthorListItems}
      /> */}

      {/* Rendering the Small Version */}
      {/* <RegularList
        items={books}
        sourceName={"book"}
        ItemComponent={SmallBookListItem}
      /> */}
      
      {/* Rendering the Large Version using the same List component */}
      <RegularList
        items={books}
        sourceName={"book"}
        ItemComponent={LargeBookListItem}
      />

      {/* <NumberedList
        items={authors}
        sourceName={"author"}
        ItemComponent={LargeAuthorListItems}
      />
      <NumberedList
        items={books}
        sourceName={"book"}
        ItemComponent={SmallBookListItem}
      /> */}
      <Modal>
        <LargeBookListItem book={books[0]} />
      </Modal>
    </>
  )
}

export default App
