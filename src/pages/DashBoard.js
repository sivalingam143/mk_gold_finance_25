import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Table,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import { ClickButton } from "../components/Buttons";
import { MdOutlinePerson } from "react-icons/md";
import { AiFillGolden } from "react-icons/ai";
import { RiDeviceRecoverLine } from "react-icons/ri";
import API_DOMAIN from "../config/config";
import dayjs from "dayjs";
import "./tablecus.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Calender } from "../components/Forms";
import LoadingOverlay from "../components/LoadingOverlay";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MonthnineNoticePDF from "../pdf/notice_9month";
import MonthelevenNoticePDF from "../pdf/notice11month";


const DashBoard = () => {
  const [userecoveryData, setUserrecoveryData] = useState([]);
  const [jewelpawnData, setUserjewlpawnData] = useState([]);
  const [customerData, setcustomerData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [interestData, setInterestData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeSearchTerm, setPlaceSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [loadingPawn, setLoadingPawn] = useState(true);
  const [loadingRecovery, setLoadingRecovery] = useState(true);
  const [loadingCustomer, setLoadingCustomer] = useState(true);
  const [loadingInterest, setLoadingInterest] = useState(true);
  const [interestFromDays, setInterestFromDays] = useState("");
  const [interestToDays, setInterestToDays] = useState("");


  const parsePeriod = (periodStr) => {
    const monthsMatch = periodStr.match(/(\d+)\s*month/);
    const daysMatch = periodStr.match(/(\d+)\s*day/);
    return {
      months: monthsMatch ? parseInt(monthsMatch[1]) : 0,
      days: daysMatch ? parseInt(daysMatch[1]) : 0,
    };
  };

  const formatPeriod = (totalDays) => {
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    let result = "";
    if (months > 0) result += `${months} month${months > 1 ? "s" : ""}`;
    if (days > 0)
      result += (result ? " " : "") + `${days} day${days > 1 ? "s" : ""}`;
    return result || "0 days";
  };
  const calculateMonthDifference = (date) => {
    const startDate = new Date(date);
    const endDate = new Date();
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    return years * 12 + months;
  };

  const aggregateInterestData = (interestData) => {
    const aggregated = interestData.reduce((acc, item) => {
      const receiptNo = item.receipt_no;
      if (!acc[receiptNo]) {
        acc[receiptNo] = {
          total_interest_income: 0,
          total_days: 0,
        };
      }
      acc[receiptNo].total_interest_income += parseFloat(
        item.interest_income || 0
      );
      const { months, days } = parsePeriod(item.interest_payment_periods);
      const totalDays = months * 30 + days;
      acc[receiptNo].total_days += totalDays;
      return acc;
    }, {});
    Object.keys(aggregated).forEach((receiptNo) => {
      const { total_days } = aggregated[receiptNo];
      aggregated[receiptNo].interest_payment_periods = formatPeriod(total_days);
    });
    return aggregated;
  };

  const fetchDatajewelpawncustomer = async () => {
    setLoadingCustomer(true);
    try {
      const response = await fetch(`${API_DOMAIN}/customer.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_text: "" }),
      });
      const responseData = await response.json();
      if (responseData.head.code === 200) {
        setcustomerData(responseData.body.customer);
        setLoadingCustomer(false);
      } else {
        throw new Error(responseData.head.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingCustomer(false);
    }
  };

  const fetchDatarecovery = async () => {
    setLoadingRecovery(true);
    try {
      const response = await fetch(`${API_DOMAIN}/pawnrecovery.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_text: "" }),
      });
      const responseData = await response.json();
      if (responseData.head.code === 200) {
        let sortedData = responseData.body.pawn_recovery.map((user) => ({
          ...user,
          jewel_product: JSON.parse(user.jewel_product || "[]"),
        }));
        setUserrecoveryData(sortedData);
        setLoadingRecovery(false);
      } else {
        throw new Error(responseData.head.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoadingRecovery(false);
    }
  };

  const fetchDatajewelpawn = async () => {
    setLoadingPawn(true);
    try {
      const response = await fetch(`${API_DOMAIN}/pawnjewelry.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_text: "" }),
      });
      const responseData = await response.json();
      if (responseData.head.code === 200) {
        const sortedData = responseData.body.pawnjewelry.map((user) => ({
          ...user,
          jewel_product: JSON.parse(user.jewel_product || "[]"),
        }));
        setUserjewlpawnData(sortedData);
        setUserData(sortedData);
        setFilteredData(sortedData);
        setLoadingPawn(false);
      } else {
        throw new Error(responseData.head.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoadingPawn(false);
    }
  };

  const fetchinterestData = async () => {
    setLoadingInterest(true);
    try {
      const response = await fetch(`${API_DOMAIN}/interest.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_text: "" }),
      });
      const responseData = await response.json();
      if (responseData.head.code === 200) {
        setInterestData(responseData.body.interest);
        setLoadingInterest(false);
      } else {
        throw new Error(responseData.head.msg);
      }
    } catch (error) {
      setLoadingInterest(false);
      console.error("Error fetching data:", error.message);
    }
  };

  const calculateTotalFilterDays = () => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const handleSearch = () => {
    let filtered = userData;

    if (
      searchTerm ||
      placeSearchTerm ||
      fromDate ||
      toDate ||
      interestFromDays ||
      interestToDays
    ) {
      filtered = userData.filter((item) => {
        const matchesMobile = searchTerm
          ? item.mobile_number.toString().includes(searchTerm)
          : true;
        const matchesReceipt = searchTerm
          ? item.receipt_no.toString().includes(searchTerm)
          : true;
        const matchesCustomerno = searchTerm
          ? item.customer_no.toString().includes(searchTerm)
          : true;
        const matchesCustomerName = searchTerm
          ? (typeof item.name === "string"
            ? item.name.toLowerCase()
            : ""
          ).includes(searchTerm.toLowerCase())
          : true;
        const matchesInterestPeriod = searchTerm
          ? item.interest_payment_period &&
          item.interest_payment_period.toString().includes(searchTerm)
          : true;
        const matchesPlace = placeSearchTerm
          ? (item.place || "")
            .toString()
            .toLowerCase()
            .includes(placeSearchTerm.toLowerCase())
          : true;

        const itemDate = new Date(item.pawnjewelry_date);
        const matchesFromDate = fromDate
          ? itemDate >= new Date(fromDate)
          : true;
        const matchesToDate = toDate ? itemDate <= new Date(toDate) : true;

        const interestDays = parseInt(item.interest_payment_period || "0");
        const matchesInterestFromDays = interestFromDays
          ? interestDays >= parseInt(interestFromDays)
          : true;
        const matchesInterestToDays = interestToDays
          ? interestDays <= parseInt(interestToDays)
          : true;

        return (
          (
            matchesMobile ||
            matchesReceipt ||
            matchesCustomerName ||
            matchesCustomerno ||
            matchesInterestPeriod
          ) &&
          matchesPlace &&
          matchesFromDate &&
          matchesToDate &&
          matchesInterestFromDays &&
          matchesInterestToDays
        );
      });
    }

    setFilteredData(filtered);
  };



  const handleClear = () => {
    setSearchTerm("");
    setPlaceSearchTerm("");
    setFromDate(null);
    setToDate(null);
    setInterestFromDays("");
    setInterestToDays("");
    setFilteredData(userData);
  };


  const setDateLabel = (date, type) => {
    if (type === "fromDate") {
      setFromDate(date);
    } else if (type === "toDate") {
      setToDate(date);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, placeSearchTerm, fromDate, toDate, userData, interestFromDays, interestToDays]);

  useEffect(() => {
    fetchDatajewelpawn();
    fetchDatarecovery();
    fetchDatajewelpawncustomer();
    fetchinterestData();
  }, []);

  const aggregatedInterestData = aggregateInterestData(interestData);
  const isPageLoading =
    loadingPawn || loadingRecovery || loadingCustomer || loadingInterest;
  const fillterdate = calculateTotalFilterDays();
  return (
    <>
      <LoadingOverlay isLoading={isPageLoading} />
      <Container>
        <>
          <Row>
            <Col lg="3" md="6" xs="12" className="py-3">
              <div className="counter-card cyan">
                <span>
                  <MdOutlinePerson />
                </span>
                <span className="count-numbers plus bold">
                  {customerData.length}
                </span>
                <span className="count-name regular">Customer</span>
              </div>
            </Col>
            <Col lg="3" md="6" xs="12" className="py-3">
              <div className="counter-card blue">
                <span>
                  <AiFillGolden />
                </span>
                <span className="count-numbers plus bold">
                  {jewelpawnData.length}
                </span>
                <span className="count-name regular">Jewelry Pawn</span>
              </div>
            </Col>
            <Col lg="3" md="6" xs="12" className="py-3">
              <div className="counter-card green">
                <span>
                  <RiDeviceRecoverLine />
                </span>
                <span className="count-numbers plus bold">
                  {userecoveryData.length}
                </span>
                <span className="count-name regular">Jewelry Recovery</span>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg="12">
              <h5 className="mb-3">Jewelry Pawn Details</h5>
              <Row className="align-items-end mb-3">
                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mobile number, pawn number or customer name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>

                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Place"
                    value={placeSearchTerm}
                    onChange={(e) => setPlaceSearchTerm(e.target.value)}
                  />
                </Col>

                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <Calender
                    setLabel={(date) => setDateLabel(date, "fromDate")}
                    calenderlabel="From Date"
                    initialDate={fromDate}
                  />
                </Col>

                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <Calender
                    setLabel={(date) => setDateLabel(date, "toDate")}
                    calenderlabel="To Date"
                    initialDate={toDate}
                  />
                </Col>
                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="From Days"
                    value={interestFromDays}
                    onChange={(e) => setInterestFromDays(e.target.value)}
                  />
                </Col>

                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="To Days"
                    value={interestToDays}
                    onChange={(e) => setInterestToDays(e.target.value)}
                  />
                </Col>


                <Col lg="2" md="6" xs="12" className="mb-2 mb-lg-0">
                  <ClickButton label="Clear" onClick={handleClear} />
                </Col>
              </Row>

              <div className="balance-table-wrapper">
                {fillterdate != 0 ? (
                  <div className="d-flex justify-content-end py-3">
                    <strong>Total Filter Days: </strong>
                    {calculateTotalFilterDays()}
                  </div>
                ) : null
                }

                <Table bordered hover responsive className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Loan Number</th>
                      <th>Customer Number</th>
                      <th>Customer Name</th>
                      <th>Location</th>
                      <th>Mobile Number</th>
                      <th>Principal Amount</th>
                      <th>Interest Rate</th>
                      <th>Pawned Items</th>
                      <th>Jewelry Weight</th>
                      {/* <th>S/WGT Weight</th> */}
                      <th>Net Weight</th>
                      <th>Jewelry Value (Pawned)</th>
                      <th>Interest Outstanding</th>
                      <th>Interest Paid</th>

                      <th>Total Appraisal</th>
                      {/* <th>Current Jewelry Value</th> */}
                      {/* <th>alert</th> */}
                      <th>Status</th>
                      <th>Interest Overdue Recovery Period Months</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => {
                        const jewelList = Array.isArray(item.jewel_product)
                          ? item.jewel_product
                          : typeof item.jewel_product === "string"
                            ? JSON.parse(item.jewel_product)
                            : [];
                        const totalWeight = jewelList.reduce(
                          (sum, jewel) => sum + parseFloat(jewel.weight || 0),
                          0
                        );
                        const totalNetWeight = jewelList.reduce(
                          (sum, jewel) => sum + parseFloat(jewel.net || 0),
                          0
                        );
                        const pledgedItems = jewelList
                          .map((jewel) => jewel.JewelName)
                          .join(", ");
                        return (
                          <tr key={item.id}>
                            <td>
                              {dayjs(item.pawnjewelry_date).format(
                                "DD-MM-YYYY"
                              )}
                            </td>
                            <td>{item.receipt_no}</td>
                            <td>{item.customer_no}</td>
                            <td>{item.name}</td>
                            <td>{item.place}</td>
                            <td>{item.mobile_number}</td>
                            <td>{item.original_amount}</td>
                            <td>{item.interest_rate}</td>
                            <td>{pledgedItems}</td>
                            <td>{totalWeight.toFixed(2)}</td>
                            {/* <td>{item.net_weight}</td> */}
                            <td>{totalNetWeight.toFixed(2)}</td>
                            <td>
                              {Math.round(
                                item.original_amount / totalNetWeight
                              )}
                            </td>
                            <td>
                              <div className="dashboard">
                                <span>{item.interest_payment_period}</span>
                                <span style={{ color: "green" }}>
                                  ₹{Math.round(item.interest_payment_amount)}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="dashboard">
                                <span>
                                  {aggregatedInterestData[item.receipt_no]
                                    ?.interest_payment_periods || "N/A"}
                                </span>
                                <span style={{ color: "green" }}>
                                  ₹
                                  {Math.round(
                                    aggregatedInterestData[item.receipt_no]
                                      ?.total_interest_income || 0
                                  ).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </td>
                            <td>
                              ₹
                              {Math.round(
                                parseFloat(item.original_amount || 0) +
                                parseFloat(item.interest_payment_amount || 0)
                              ).toLocaleString("en-IN")}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <span
                                className={`badge ${item.status === "நகை மீட்கபட்டது"
                                    ? "bg-danger"
                                    : "bg-success"
                                  }`}
                                style={{
                                  minWidth: "20px",
                                  minHeight: "20px",
                                  display: "inline-block",
                                }}
                              ></span>
                            </td>
                            <td>
                              {(() => {
                                const pawnDate = new Date(
                                  item.pawnjewelry_date
                                );
                                const currentDate = new Date();
                                const yearDiff =
                                  currentDate.getFullYear() -
                                  pawnDate.getFullYear();
                                const monthDiff =
                                  currentDate.getMonth() - pawnDate.getMonth();
                                const totalMonths = yearDiff * 12 + monthDiff;
                                return totalMonths >= 4 ? (
                                  <>
                                    <br />
                                    <span
                                      className="badge bg-danger"
                                      style={{
                                        minWidth: "20px",
                                        minHeight: "20px",
                                        display: "inline-block",
                                      }}
                                    ></span>
                                    <span style={{ color: "red" }}>
                                      Notpaid
                                    </span>
                                  </>
                                ) : (
                                  "-"
                                );
                              })()}
                            </td>
                            <td>
                              {(() => {
                                const monthDiff = calculateMonthDifference(item.pawnjewelry_date);
                                const customerName = item.name || "Customer";
                                const address = item.place || "-";
                                const loanAmount = item.original_amount || 0;
                                const pawnDateFormatted = dayjs(item.pawnjewelry_date).format("DD-MM-YYYY");

                                if (monthDiff >= 11) {
                                  return (
                                    <>
                                      <PDFDownloadLink
                                        document={
                                          <MonthnineNoticePDF
                                            date={dayjs().format("DD-MM-YYYY")}
                                            customerName={customerName}
                                            address={address}
                                            loanNumber={item.receipt_no}
                                            pawnDate={pawnDateFormatted}
                                            loanAmount={loanAmount}
                                            interest={Math.round(item.interest_payment_amount)}
                                          />
                                        }
                                        fileName={`notice_9month_${item.receipt_no}.pdf`}
                                      >
                                        {({ loading }) =>
                                          loading ? "Preparing..." : <button className="notice-btn alert">9M Notice</button>
                                        }
                                      </PDFDownloadLink>
                                      <PDFDownloadLink
                                        document={
                                          <MonthelevenNoticePDF
                                            date={dayjs().format("DD-MM-YYYY")}
                                            customerName={customerName}
                                            address={address}
                                            loanNumber={item.receipt_no}
                                            pawnDate={pawnDateFormatted}
                                            loanAmount={loanAmount}
                                            interest={Math.round(item.interest_payment_amount)}
                                          />
                                        }
                                        fileName={`notice_11month_${item.receipt_no}.pdf`}
                                      >
                                        {({ loading }) =>
                                          loading ? "Preparing..." : <button className="notice-btn alert">11M Notice</button>
                                        }
                                      </PDFDownloadLink>

                                    </>
                                  );
                                } else if (monthDiff >= 9) {
                                  return (
                                    <PDFDownloadLink
                                      document={
                                        <MonthnineNoticePDF
                                          date={dayjs().format("DD-MM-YYYY")}
                                          customerName={customerName}
                                          address={address}
                                          loanNumber={item.receipt_no}
                                          pawnDate={pawnDateFormatted}
                                          loanAmount={loanAmount}
                                          interest={Math.round(item.interest_payment_amount)}
                                        />
                                      }
                                      fileName={`notice_9month_${item.receipt_no}.pdf`}
                                    >
                                      {({ loading }) =>
                                        loading ? "Preparing..." : <button className="notice-btn alert">9M Notice</button>
                                      }
                                    </PDFDownloadLink>
                                  );
                                } else {
                                  return "-";
                                }
                              })()}
                            </td>

                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="17" className="text-center">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </>
      </Container>
    </>
  );
};

export default DashBoard;
