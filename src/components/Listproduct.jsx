import { useEffect, useState } from "react";
import { Button, Card, Modal, Pagination, Spinner, Table } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addProducts, getProducts } from "../redux/products/productSlice";
import ProductService from "../services/ProductService";
import Productdetail from "./Productdetail";

const Listproduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  const notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const dispatch = useDispatch();

  useEffect(() => {
    // const getOneP = async () => {

    //   const response = await ProductService.getOneProduct(1001);
    //   console.log(response.data);
    // };
    async function fetchData() {
      setLoading(true);
      const response = ProductService.getProducts();
      return response;
    }
    fetchData().then((res) => {
      setProducts(res.data);
      setLoading(false);
      dispatch(addProducts(res.data));
    });
    fetchData().catch((err) => console.log(err));
  }, []);

  const deleteProduct = (id) => {
    setProducts(products.filter((element) => element.id !== id));
    notify();
  };

  return (
    <>
      <Card className="mt-3">
        <Card.Header>Product edition </Card.Header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Image</th>
              <th>Category</th>
              <th>Available?</th>
              <th></th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <th colSpan={9}>
                  <Spinner
                    animation="border"
                    className="offset-5"
                    variant="info"
                  />
                </th>
              </tr>
            </tbody>
          )}
          {!loading && products && (
            <tbody>
              {products.map((element, idx) => (
                <tr key={element.id}>
                  <Productdetail
                    deleteProduct={deleteProduct}
                    products={products}
                    setProducts={setProducts}
                    product={element}
                    idx={idx}
                  />
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Pagination className="offset-3">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Card>
    </>
  );
};

export default Listproduct;
