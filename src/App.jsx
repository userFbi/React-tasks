import RickMortyApi from './ApiCall/RickMortyApi';
import './App.css';
import CartData from './CartData/CartData';
import ProductCards from './ProductCards/ProductCards';
import CrudResult from './ResultCrud/CrudResult';
// import StudentResult from './useStateResulte/Student';

function App() {
  return (
    <div className="App">
      {/* <StudentResult/> */}
      {/* <CrudResult /> */}
      {/* <CartData /> */}
      {/* <ProductCards/> */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <RickMortyApi />
      </div>
    </div>
  );
}

export default App;
