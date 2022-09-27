export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response);
      }
    })
    .catch((err) => console.error("Error fetching:", err));
};
