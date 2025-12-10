import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MobileView from "../../components/MobileView";
import TableUI from "../../components/Table";
import { TextInputForm } from "../../components/Forms";
import { ClickButton } from "../../components/ClickButton";
import API_DOMAIN from "../../config/config";
import { useMediaQuery } from "react-responsive";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay";

const Customer = () => {
  const navigate = useNavigate();
  const CustomerTablehead = [
    "No",
    "customer No",
    "Customer Name",
    "Mobile No.",
    "Action",
  ];
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const [customerData, setcustomerData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const fetchDatajewelpawncustomer = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_DOMAIN}/customer.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_text: searchText,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
      setLoading(false);
      if (responseData.head.code === 200) {
        setcustomerData(responseData.body.customer);
        setLoading(false);
      } else {
        throw new Error(responseData.head.msg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    fetchDatajewelpawncustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);
  const handleSearch = (value) => {
    setSearchText(value);
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col lg="7" md="4" xs="6">
            <div className="page-nav py-3">
              <span class="nav-list">Customer</span>
            </div>
          </Col>
          <Col lg="5" md="3" xs="6" className="align-self-center text-end">
            <ClickButton
              label={<>Add New</>}
              onClick={() => navigate("/console/master/customer/create")}
            />
          </Col>

          <Col lg="3" md="5" xs="12" className="py-1">
            <TextInputForm
              placeholder={"Name, mobile number"}
              onChange={(e) => handleSearch(e.target.value)}
              prefix_icon={<FaMagnifyingGlass />}
            >
              {" "}
            </TextInputForm>
          </Col>

          {loading ? (
            <LoadingOverlay isLoading={loading} />
          ) : (
            <>
              <Col lg="12" md="12" xs="12" className="px-0">
                <div className="py-1">
                  {isMobile &&
                    customerData.map((user, index) => (
                      <MobileView
                        key={index}
                        sno={user.id}
                        name={user.customer_name}
                        subname={user.mobile_number}
                      />
                    ))}
                  <TableUI
                    headers={CustomerTablehead}
                    body={customerData}
                    type="customer"
                    pageview={"yes"}
                  />
                </div>
              </Col>
            </>
          )}
        </Row>

      </Container>
    </div>
  );
};

export default Customer;
