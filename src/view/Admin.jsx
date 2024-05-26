import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Modal from "react-bootstrap/Modal";
import "./Admin.css";
import { useEffect, useState, useRef } from "react";
import useApi from "../utils/http";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Popconfirm } from "antd";
import { message } from "antd";
import { FileUpload } from "primereact/fileupload";

const images = import.meta.env.VITE_IMAGES;

const Admin = (setMenuVisible) => {
  const api = useApi();
  const toast = useRef(null);
  const filed = useRef(null);
  const allProducts = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [modalData, setModalData] = useState("");
  const [show, setShow] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productUsage, setProductUsage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleTwo, setIsVisibleTwo] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usage, setUsage] = useState("");

  useEffect(() => {
    setIsVisible(true);
    setIsVisibleTwo(false);
    getProduct();
    return () => {};
  }, []);

  async function getProduct() {
    const { data } = await api.get("/products");
    setFile(data);
  }

  function adminShowProduct(e) {
    e.preventDefault();
    setIsVisible(true);
    setIsVisibleTwo(false);
    getProduct();
  }

  function handleShow(data) {
    setShow(true);
    setModalData(data);
  }

  function handleClose() {
    setShow(false);
  }

  async function updateProduct(file) {
    const id = file.id;

    try {
      const body = {
        name: productName,
        category: productCategory,
        details: productDetails,
        quantity: productQuantity,
        price: productPrice,
        usage: productUsage,
      };

      const { data } = await api.put(`/product/${id}`, body);
      getProduct();
      setProductName("");
      setProductCategory("");
      setProductDetails("");
      setProductQuantity("");
      setProductPrice("");
      setProductUsage("");
      navigate("/admin");
      setShow(false);

      toast.current.show({
        severity: "success",
        summary: "MESSAGE",
        detail: "Product Updated",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  }

  async function handleDelete(product) {
    const id = product.id;

    const { data } = await api.delete(`/product/${id}`);
    getProduct();
  }

  async function confirm(product) {
    const id = product.id;

    const { data } = await api.delete(`/product/${id}`);
    getProduct();
  }

  async function adminAddProduct() {
    if (allProducts.current) {
      setIsVisible(false);
      setIsVisibleTwo(true);
    }
  }

  async function uploadImage(file) {
    try {
      let image = null;

      if (file) {
        const form = new FormData();
        form.append("image", file);

        const { data } = await api.post("/upload-images", form);
        image = data.image;
      }
      const body = {
        name: name,
        category: category,
        details: detail,
        price: price,
        quantity: quantity,
        image: image,
        usage: usage,
      };

      const { data } = await api.post("/products", body);

      toast.current.show({
        severity: "success",
        summary: "MESSAGE",
        detail: "Product Created",
      });

      getProduct();
      // setIsVisible(true);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  }

  function handleCreate(e) {
    e.preventDefault();

    uploadImage(filed.current.getFiles()[0]);
    setName("");
    setCategory("");
    setDetail("");
    setPrice("");
    setQuantity("");
    setUsage("");
    filed.current.clear();
  }

  function headerTemplate(options) {
    const { className, chooseButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {cancelButton}
      </div>
    );
  }
  function adminLogOut() {
    navigate("/");
    window.location.reload();
    setMenuVisible(true);
  }

  return (
    <>
      <Toast ref={toast} />
      {contextHolder}
      <Container className="p-5">
        <Row>
          <Col className="navBarz"></Col>
        </Row>
        <Row>
          <Col
            md={2}
            className="productNav d-flex flex-column align-items-start p-3 gap-3"
          >
            <Button
              variant="link"
              className="adminBtn"
              onClick={adminShowProduct}
            >
              All Products
            </Button>
            <Button
              variant="link"
              className="adminBtn"
              onClick={adminAddProduct}
            >
              Add Products
            </Button>
            <Button className="adminBtnLog mt-3" onClick={adminLogOut}>
              Sign Out
            </Button>
          </Col>
          {isVisible && (
            <Col md={10} ref={allProducts}>
              {file.map((detail, i) => {
                return (
                  <section className="adminProductSection p-3" key={i}>
                    <Row className="adminBottomLine">
                      <Col md={3} className="adminImgBox">
                        <img src={`${images}/${detail.image}`} alt="" />
                      </Col>
                      <Col md={9}>
                        <form>
                          <p>
                            Product Name: <b>{detail.name}</b>
                          </p>
                          <p>
                            Category: <b>{detail.category}</b>
                          </p>
                          <p>
                            Details: <b>{detail.details}</b>
                          </p>
                          <p>
                            Quantity: <b>{detail.quantity}</b>
                          </p>
                          <p>
                            Price: <b>{detail.price}</b>
                          </p>
                          <div className="d-flex gap-2 my-3 mt-4">
                            <Popover content="Update">
                              <EditOutlined
                                className="adminIcons bg-warning p-1"
                                onClick={() => handleShow(detail)}
                              />
                            </Popover>

                            <Popconfirm
                              title={detail.name}
                              description="Delete this product?"
                              onConfirm={() => confirm(detail)}
                            >
                              <DeleteOutlined className="adminIcons bg-danger p-1" />
                            </Popconfirm>
                          </div>
                        </form>
                      </Col>
                    </Row>
                  </section>
                );
              })}
            </Col>
          )}
          {isVisibleTwo && (
            <Col md={10}>
              <form className="adminProductSection p-3" onSubmit={handleCreate}>
                <div className="d-flex flex-column mb-3">
                  <label className="mb-2 fw-bold">Product Name:</label>
                  <input
                    type="text"
                    className="px-2 py-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label className="mb-2 fw-bold">Product Category:</label>
                  <input
                    type="text"
                    className="px-2 py-1"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label className="mb-2 fw-bold">Product Details:</label>
                  <input
                    type="text"
                    className="px-2 py-1"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label className="mb-2 fw-bold">Product Price:</label>
                  <input
                    type="text"
                    className="px-2 py-1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label className="mb-2 fw-bold">Product Quantity:</label>
                  <input
                    type="text"
                    className="px-2 py-1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <label className="mb-2 fw-bold">Product Usage:</label>
                  <input
                    type="text"
                    className="px-2 py-1"
                    value={usage}
                    onChange={(e) => setUsage(e.target.value)}
                  />
                </div>
                <FileUpload
                  name="file[]"
                  headerTemplate={headerTemplate}
                  multiple
                  accept="image/*"
                  ref={filed}
                />
                <Button
                  className="mt-5 w-100 bg-dark fw-bold fs-5"
                  type="submit"
                >
                  POST
                </Button>
              </form>
            </Col>
          )}
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="modalAdmin"
      >
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title className="text-white"> Latest Update </Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body className="d-flex flex-column gap-3">
            <div className="d-flex gap-2 align-items-center mt-3">
              <label className="modalLabel">Product Name:</label>
              <input
                type="text"
                className="modalInput px-3 py-1"
                placeholder={modalData.name}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <label className="modalLabel">Product Category:</label>
              <input
                type="text"
                className="modalInput px-3 py-1"
                placeholder={modalData.category}
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <label className="modalLabel">Product Details:</label>
              <input
                type="text"
                className="modalInput px-3 py-1"
                placeholder={modalData.details}
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <label className="modalLabel">Product Quantity:</label>
              <input
                type="text"
                className="modalInput px-3 py-1"
                placeholder={modalData.quantity}
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <label className="modalLabel">Product Price:</label>
              <input
                type="text"
                className="modalInput px-3 py-1"
                placeholder={modalData.price}
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <label className="modalLabel">Product Usage:</label>
              <input
                type="text"
                className="modalInput px-3 py-1"
                placeholder={modalData.usage}
                value={productUsage}
                onChange={(e) => setProductUsage(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="link"
              className="text-decoration-none text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              className="modalButton"
              onClick={() => updateProduct(modalData)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Admin;
