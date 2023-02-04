import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>

    </div>
  );
}

export default App;
