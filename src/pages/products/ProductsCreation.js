import React, { useState } from "react";
import { Col, Container, Row, Alert } from "react-bootstrap";
import { TextInputForm } from "../../components/Forms";
import { ClickButton } from "../../components/ClickButton";
import PageNav from "../../components/PageNav";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API_DOMAIN from "../../config/config";
import "react-toastify/dist/ReactToastify.css";

const ProductsCreation = () => {
  const location = useLocation();
  const { type, rowData } = location.state || {};
  const navigate = useNavigate();

  // Initial state setup
  const initialState =
    type === "edit" ? { ...rowData } : { product_eng: "", product_tam: "" };
  const [formData, setFormData] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    // Auto-convert to Tamil when English is typed
    if (fieldName === "product_eng") {
      fetchTamilTranslation(value);
    }
  };

  const fetchTamilTranslation = async (text) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(
          text
        )}`
      );
      const result = await response.json();
      const translatedText = result[0][0][0]; // Extract translated text
      setFormData((prevData) => ({
        ...prevData,
        product_tam: translatedText,
      }));
    } catch (error) {
      console.error("Error in translation:", error);
    }
  };

  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error(`${key.replace("_", " ")} cannot be empty!`, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_DOMAIN}/product.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData.head.code === 200) {
        toast.success(responseData.head.msg, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        setTimeout(() => navigate("/console/master/products"), 1000);
      } else {
        toast.error(responseData.head.msg, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_DOMAIN}/product.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          edit_product_id: rowData.product_id,
          ...formData,
        }),
      });

      const responseData = await response.json();
      if (responseData.head.code === 200) {
        toast.success(responseData.head.msg, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
        setTimeout(() => navigate("/console/master/products"), 1000);
      } else {
        toast.error(responseData.head.msg, {
          position: "top-center",
          autoClose: 2000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while updating the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg="12" className="py-3">
          <PageNav
            pagetitle={`${type === "edit" ? "Edit Product" : "Create Product"}`}
          />
        </Col>

        <Col lg="4" md="6" xs="12" className="py-3">
          <TextInputForm
            placeholder="Product Name (English)"
            labelname="Product Name (English)"
            name="product_eng"
            value={formData.product_eng}
            onChange={(e) => handleChange(e, "product_eng")}
          />
        </Col>

        <Col lg="4" md="6" xs="12" className="py-3">
          <TextInputForm
            placeholder="Product Name (Tamil)"
            labelname="Product Name (Tamil)"
            name="product_tam"
            value={formData.product_tam}
            onChange={(e) => handleChange(e, "product_tam")}
            readOnly // Make this field non-editable as it's auto-translated
          />
        </Col>

        <Col
          lg="12"
          className="py-3 text-center d-flex flex-row justify-content-center gap-3"
        >
          {type === "edit" ? (
            <ClickButton
              label="Update"
              onClick={handleUpdateSubmit}
              disabled={loading}
            />
          ) : (
            <ClickButton
              label="Submit"
              onClick={handleSubmit}
              disabled={loading}
            />
          )}
          <ClickButton
            label="Cancel"
            onClick={() => navigate("/console/master/products")}
          />
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <ToastContainer />
    </Container>
  );
};

export default ProductsCreation;
