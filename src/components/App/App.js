import React, { useState, useEffect } from "react";
import { getOrders } from "../../apiCalls";
import "./App.css";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data.orders));
  }, []);

  return (
    <div>
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm setOrders={setOrders}/>
      </header>
      <Orders orders={orders} />
    </div>
  );
};

export default App;
