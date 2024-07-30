import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import Header from './Component/header';
import Layout from './Component/layout';
import Footer from './Component/footer';
import { store } from './store';

function App() {
  return (
    <div className="App">
       <Provider store={store}>
        <BrowserRouter >
         <Header></Header>
         <Layout></Layout>
         <Footer></Footer>
        </BrowserRouter>
       </Provider>
    </div>
  );
}

export default App;
