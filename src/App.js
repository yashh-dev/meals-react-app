import './App.css'
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'
import { useGlobalContext } from './context'

export default function App() {
  const {showModal} = useGlobalContext();
  return (
    <main>
      <Search/>
      {/*<Favorites/>*/}
      <Meals className='container-fluid' />
      {showModal && <Modal />}
    </main>
  )
}

