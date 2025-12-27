import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextInputForm } from "../../components/Forms";
import { ClickButton, ChooseButton } from "../../components/ClickButton";
import PageNav from "../../components/PageNav";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API_DOMAIN from "../../config/config";
import { SignatureCanvas } from "react-signature-canvas";
import "react-toastify/dist/ReactToastify.css";

const SaleCreations = () => {
  const location = useLocation();
  const { type, rowData } = location.state || {};
  const navigate = useNavigate();

  const customerPicInputRef = useRef(null);
  const idPicInputRef = useRef(null);
  const jewelPicInputRef = useRef(null);
  const proofPicInputRef = useRef(null);
  const sigCustomerRef = useRef();
  const sigStaffRef = useRef();

  const [previewFile, setPreviewFile] = useState(null);

  const tharamOptions = [
    { value: "18", label: "18k" },
    { value: "20", label: "20k" },
    { value: "22", label: "22k" },
    { value: "24", label: "24k" },
  ];
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  // Replace the initialState definition in SaleCreations.js
  const initialState =
    type === "edit" || type === "view"
      ? {
          ...rowData,
          date: rowData.date || getTodayDate(),
          tharam: rowData.tharam || "",
          customer_pic: Array.isArray(rowData.customer_pic)
            ? rowData.customer_pic.map((url) => ({
                name: url.split("/").pop(),
                data: url, // Use the full URL directly
                type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
                isExisting: true,
              }))
            : [],
          id_pic: Array.isArray(rowData.id_pic)
            ? rowData.id_pic.map((url) => ({
                name: url.split("/").pop(),
                data: url,
                type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
                isExisting: true,
              }))
            : [],
          jewel_pic: Array.isArray(rowData.jewel_pic)
            ? rowData.jewel_pic.map((url) => ({
                name: url.split("/").pop(),
                data: url,
                type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
                isExisting: true,
              }))
            : [],
          proof_pic: Array.isArray(rowData.proof_pic)
            ? rowData.proof_pic.map((url) => ({
                name: url.split("/").pop(),
                data: url,
                type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
                isExisting: true,
              }))
            : [],
          staff_sign_pic: Array.isArray(rowData.staff_sign_pic)
            ? rowData.staff_sign_pic.map((url) => ({
                name: url.split("/").pop(),
                data: url,
                type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
                isExisting: true,
              }))
            : [],
          customer_sign_pic: Array.isArray(rowData.customer_sign_pic)
            ? rowData.customer_sign_pic.map((url) => ({
                name: url.split("/").pop(),
                data: url,
                type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
                isExisting: true,
              }))
            : [],
            latitude: rowData.latitude || "",
        longitude: rowData.longitude || "",
        }
      : {
          // ... (keep your create initialState as is)
          date: getTodayDate(),
          sale_id: "",
          name: "",
          place: "",
          mobile_number: "",
          bank_name: "",
          bank_loan_amount: "",
          customer_receive_amount: "",
          total_jewel_weight: "",
          total_loan_amount: "",
          tharam: "",
          staff_name: "",
          customer_pic: [],
          id_pic: [],
          jewel_pic: [],
          proof_pic: [],
          staff_sign_pic: [],
          customer_sign_pic: [],
          latitude: "",
        longitude: "",
        };
  const [formData, setFormData] = useState(initialState);
  console.log(formData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type !== "edit" && type !== "view") {
      const fetchSales = async () => {
        try {
          const response = await fetch(`${API_DOMAIN}/sale.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ search_text: "" }),
          });
          const data = await response.json();
          if (data.head.code === 200 && data.body.sales?.length > 0) {
            const maxId = Math.max(
              ...data.body.sales.map((s) => {
                const num = parseInt(s.sale_id.replace(/\D/g, ""), 10);
                return isNaN(num) ? 0 : num;
              })
            );
            const nextId = "SALE" + String(maxId + 1).padStart(4, "0");
            setFormData((prev) => ({ ...prev, sale_id: nextId }));
          } else {
            setFormData((prev) => ({ ...prev, sale_id: "SALE0001" }));
          }
        } catch (err) {
          setFormData((prev) => ({ ...prev, sale_id: "SALE0001" }));
        }
      };
      fetchSales();
    }
  }, [type]);
const getPreciseLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported in this environment.");
      return;
    }

    const options = {
      enableHighAccuracy: true,     // forces GPS when available
      timeout: 15000,               // more tolerance for accurate lock
      maximumAge: 0,                // no cached location
    };

    let fallbackWatcher = null;
    let didResolve = false;

    const successHandler = (pos) => {
      if (didResolve) return;
      didResolve = true;

      if (fallbackWatcher !== null) {
        navigator.geolocation.clearWatch(fallbackWatcher);
      }

      resolve({
        latitude: pos.coords.latitude.toFixed(7),
        longitude: pos.coords.longitude.toFixed(7),
        accuracy: pos.coords.accuracy,
        timestamp: pos.timestamp,
      });
    };

    const errorHandler = (err) => {
      // If initial attempt fails, try watchPosition to stabilize
      if (!didResolve && err.code !== err.PERMISSION_DENIED) {
        fallbackWatcher = navigator.geolocation.watchPosition(
          successHandler,
          (watchErr) => reject(watchErr.message || "Location acquisition failed"),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
        );
      } else {
        reject(err.message || "Location acquisition blocked");
      }
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
  });
};

const handleGetCurrentLocation = async () => {
  try {
    toast.info("Optimizing location acquisition…");

    const permission = await navigator.permissions?.query({ name: "geolocation" }).catch(() => null);

    if (permission?.state === "denied") {
      toast.error("Location permission blocked. Enable it in browser/site settings.");
      return;
    }

    const loc = await getPreciseLocation();

    setFormData(prev => ({
      ...prev,
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));

    toast.success(
      `High-accuracy location captured.
Lat: ${loc.latitude} | Long: ${loc.longitude}
Accuracy: ±${loc.accuracy}m`
    );
  } catch (e) {
    toast.error(e || "Unable to capture accurate location.");
  }
};

  const handleChange = (e, field) => {
    const value = e.target ? e.target.value : e.value;

    setFormData((prev) => {
      // Create the updated state for the field being changed
      const updatedData = { ...prev, [field]: value };

      // Check if we are editing one of the two source fields
      if (field === "bank_loan_amount" || field === "customer_receive_amount") {
        // Parse values as numbers, defaulting to 0 if empty or invalid
        const bankAmt = parseFloat(updatedData.bank_loan_amount) || 0;
        const customerAmt =
          parseFloat(updatedData.customer_receive_amount) || 0;

        // Update the total field automatically
        updatedData.total_loan_amount = (bankAmt + customerAmt).toString();
      }

      return updatedData;
    });
  };

  const handleFileChange = (files, field) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const maxSize = 5 * 1024 * 1024; // 5MB

    fileArray.forEach((file) => {
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return;
      }

      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        toast.error(`Only images and PDFs are allowed for ${file.name}`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: [
            ...prev[field],
            {
              name: file.name,
              data: reader.result,
              type: file.type.startsWith("image/") ? "image" : "pdf",
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    });

    toast.success("File(s) uploaded successfully!");
  };

  const handleImageDelete = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
    toast.info("File removed");
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
  };

  const handleSaveCustomerSign = () => {
    if (sigCustomerRef.current.isEmpty()) {
      toast.error("Please provide customer signature first!");
      return;
    }
    const dataUrl = sigCustomerRef.current.toDataURL("image/png");
    setFormData((prev) => ({
      ...prev,
      customer_sign_pic: [
        {
          name: "customer_sign.png",
          data: dataUrl,
          type: "image",
          isExisting: false,
        },
      ],
    }));
    toast.success("Customer signature saved!");
  };

  const handleClearCustomerSign = () => {
    if (sigCustomerRef.current) {
      sigCustomerRef.current.clear();
    }
    setFormData((prev) => ({
      ...prev,
      customer_sign_pic: [],
    }));
    toast.info("Customer signature cleared");
  };

  const handleSaveStaffSign = () => {
    if (sigStaffRef.current.isEmpty()) {
      toast.error("Please provide staff signature first!");
      return;
    }
    const dataUrl = sigStaffRef.current.toDataURL("image/png");
    setFormData((prev) => ({
      ...prev,
      staff_sign_pic: [
        {
          name: "staff_sign.png",
          data: dataUrl,
          type: "image",
          isExisting: false,
        },
      ],
    }));
    toast.success("Staff signature saved!");
  };

  const handleClearStaffSign = () => {
    if (sigStaffRef.current) {
      sigStaffRef.current.clear();
    }
    setFormData((prev) => ({
      ...prev,
      staff_sign_pic: [],
    }));
    toast.info("Staff signature cleared");
  };

  const handleSubmit = async () => {
    const required = ["name", "mobile_number", "bank_name", "staff_name"];
    for (const key of required) {
      if (!formData[key]) {
        toast.error(`${key.replace(/_/g, " ")} is required!`);
        return;
      }
    }

    if (
      formData.customer_sign_pic.length === 0 ||
      formData.staff_sign_pic.length === 0
    ) {
      toast.error("Both customer and staff signatures are required!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        sale_date: formData.date || getTodayDate(),
        name: formData.name,
        place: formData.place || "",
        mobile_number: formData.mobile_number,
        bank_name: formData.bank_name,
        bank_loan_amount: formData.bank_loan_amount || "0",
        customer_receive_amount: formData.customer_receive_amount || "0",
        total_jewel_weight: formData.total_jewel_weight || "0",
        total_loan_amount: formData.total_loan_amount || "0",
        tharam: formData.tharam || "",
        staff_name: formData.staff_name,
        customer_pic: formData.customer_pic.map((f) => ({ data: f.data })),
        id_pic: formData.id_pic.map((f) => ({ data: f.data })),
        jewel_pic: formData.jewel_pic.map((f) => ({ data: f.data })),
        proof_pic: formData.proof_pic.map((f) => ({ data: f.data })),
        staff_sign_pic: formData.staff_sign_pic.map((f) => ({ data: f.data })),
        customer_sign_pic: formData.customer_sign_pic.map((f) => ({
          data: f.data,
        })),
        latitude: formData.latitude || "",
  longitude: formData.longitude || "",
      };

      const response = await fetch(`${API_DOMAIN}/sale.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.head.code === 200) {
        toast.success("Sale created successfully!");
        setTimeout(() => navigate("/console/master/sale"), 1000);
      } else {
        toast.error(result.head.msg || "Failed to create sale");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async () => {
    setLoading(true);

    const prepareFiles = (files) =>
      files.map((file) => {
        if (file.isExisting) {
          // Just send the path back to keep it in the DB
          return { data: file.data, isExisting: true };
        }
        return { data: file.data, isExisting: false };
      });

    // For signatures, if they were cleared or re-signed, handle accordingly
    const prepareSignatures = (files) => {
      if (files.length === 0) {
        return []; // Empty if cleared
      }
      return files.map((file) => ({
        data: file.data,
        isExisting: file.isExisting || false,
      }));
    };

    try {
      const payload = {
        edit_sale_id: rowData.sale_id,
        sale_date: formData.date || getTodayDate(),
        name: formData.name,
        place: formData.place || "",
        mobile_number: formData.mobile_number,
        bank_name: formData.bank_name,
        bank_loan_amount: formData.bank_loan_amount || "0",
        customer_receive_amount: formData.customer_receive_amount || "0",
        total_jewel_weight: formData.total_jewel_weight || "0",
        total_loan_amount: formData.total_loan_amount || "0",
        tharam: formData.tharam || "",
        staff_name: formData.staff_name,
        customer_pic: prepareFiles(formData.customer_pic),
        id_pic: prepareFiles(formData.id_pic),
        jewel_pic: prepareFiles(formData.jewel_pic),
        proof_pic: prepareFiles(formData.proof_pic),
        staff_sign_pic: prepareSignatures(formData.staff_sign_pic),
        customer_sign_pic: prepareSignatures(formData.customer_sign_pic),
        latitude: formData.latitude || "",
  longitude: formData.longitude || "",
      };

      const response = await fetch(`${API_DOMAIN}/sale.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.head.code === 200) {
        toast.success("Updated successfully");
        setTimeout(() => {
          navigate("/console/master/sale");
        }, 1200);
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <Row className="regular">
          <Col lg="12" className="py-3">
            <PageNav
              pagetitle={`${
                type === "edit" ? "Edit" : type === "view" ? "View" : "Create"
              } Sale`}
            />
          </Col>
          <Col lg="3" className="py-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.date}
              onChange={(e) => handleChange(e, "date")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Name"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Place"
              value={formData.place}
              onChange={(e) => handleChange(e, "place")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Mobile Number"
              value={formData.mobile_number}
              onChange={(e) => handleChange(e, "mobile_number")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Bank Name"
              value={formData.bank_name}
              onChange={(e) => handleChange(e, "bank_name")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Bank Loan Amount"
              value={formData.bank_loan_amount}
              onChange={(e) => handleChange(e, "bank_loan_amount")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Customer Receive Amount"
              value={formData.customer_receive_amount}
              onChange={(e) => handleChange(e, "customer_receive_amount")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <label className="form-label">தரம்</label>
            <select
              className="form-select" // Changed from form-control to form-select
              value={formData.tharam}
              onChange={(e) => handleChange(e, "tharam")}
              disabled={type === "view"}
            >
              <option value="">Select தரம்</option>
              {tharamOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Total Jewel Weight"
              value={formData.total_jewel_weight}
              onChange={(e) => handleChange(e, "total_jewel_weight")}
              disabled={type === "view"}
            />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Total Loan Amount"
              value={formData.total_loan_amount}
              onChange={(e) => handleChange(e, "total_loan_amount")}
              disabled={true} // Set to true since it's auto-calculated
            />
          </Col>
          <Col lg="12" className="py-3">
            <h5>Customer, ID Proof and Jewel Images</h5>
          </Col>

          {/* Customer Photo */}
          <Col lg="6" className="py-5">
            <div className="file-upload">
              <label>Customer Photo</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                ref={customerPicInputRef}
                style={{ display: "none" }}
                onChange={(e) =>
                  handleFileChange(e.target.files, "customer_pic")
                }
              />
              <ChooseButton
                label="Choose File"
                onClick={() => customerPicInputRef.current?.click()}
              />
              {formData.customer_pic.map((file, i) => (
                <div
                  key={i}
                  className="file-item d-flex flex-column flex-md-row align-items-md-center mb-2 mt-2 gap-2"
                >
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      className="img-fluid"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {file.name}
                    </span>
                  )}
                  <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto">
                    <ChooseButton
                      label="Preview"
                      className="btn btn-primary btn-sm w-100 w-md-auto"
                      onClick={() => handlePreview(file)}
                    />
                    <ChooseButton
                      label="Delete"
                      className="btn btn-danger btn-sm w-100 w-md-auto"
                      onClick={() => handleImageDelete(i, "customer_pic")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* ID Proof */}
          <Col lg="6" className="py-5">
            <div className="file-upload">
              <label>ID Proof</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                ref={idPicInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files, "id_pic")}
              />
              <ChooseButton
                label="Choose File"
                onClick={() => idPicInputRef.current?.click()}
              />
              {formData.id_pic.map((file, i) => (
                <div
                  key={i}
                  className="file-item d-flex flex-column flex-md-row align-items-md-center mb-2 mt-2 gap-2"
                >
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      className="img-fluid"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {file.name}
                    </span>
                  )}
                  <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto">
                    <ChooseButton
                      label="Preview"
                      className="btn btn-primary btn-sm w-100 w-md-auto"
                      onClick={() => handlePreview(file)}
                    />
                    <ChooseButton
                      label="Delete"
                      className="btn btn-danger btn-sm w-100 w-md-auto"
                      onClick={() => handleImageDelete(i, "id_pic")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* Jewel Photo */}
          <Col lg="6" className="py-5">
            <div className="file-upload">
              <label>Jewel Photo</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                ref={jewelPicInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files, "jewel_pic")}
              />
              <ChooseButton
                label="Choose File"
                onClick={() => jewelPicInputRef.current?.click()}
              />
              {formData.jewel_pic.map((file, i) => (
                <div
                  key={i}
                  className="file-item d-flex flex-column flex-md-row align-items-md-center mb-2 mt-2 gap-2"
                >
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      className="img-fluid"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {file.name}
                    </span>
                  )}
                  <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto">
                    <ChooseButton
                      label="Preview"
                      className="btn btn-primary btn-sm w-100 w-md-auto"
                      onClick={() => handlePreview(file)}
                    />
                    <ChooseButton
                      label="Delete"
                      className="btn btn-danger btn-sm w-100 w-md-auto"
                      onClick={() => handleImageDelete(i, "jewel_pic")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>
          {/* Proof Pic */}
          <Col lg="6" className="py-5">
            <div className="file-upload">
              <label>Proof Pic</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                ref={proofPicInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files, "proof_pic")}
              />
              <ChooseButton
                label="Choose File"
                onClick={() => proofPicInputRef.current?.click()}
              />
              {formData.proof_pic.map((file, i) => (
                <div
                  key={i}
                  className="file-item d-flex flex-column flex-md-row align-items-md-center mb-2 mt-2 gap-2"
                >
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      className="img-fluid"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {file.name}
                    </span>
                  )}
                  <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto">
                    <ChooseButton
                      label="Preview"
                      className="btn btn-primary btn-sm w-100 w-md-auto"
                      onClick={() => handlePreview(file)}
                    />
                    <ChooseButton
                      label="Delete"
                      className="btn btn-danger btn-sm w-100 w-md-auto"
                      onClick={() => handleImageDelete(i, "proof_pic")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Col>
          {/* Staff Name - Moved and aligned to full width */}
          <Col lg="3" className="py-3">
            <TextInputForm
              labelname="Staff Name"
              value={formData.staff_name}
              onChange={(e) => handleChange(e, "staff_name")}
              disabled={type === "view"}
            />
          </Col>
{/* Current Location Section - Place after Staff Name */}
<Col lg="12" className="py-3">
  <h5>Current Location</h5>
</Col>

<Col lg="4" className="py-3">
  <label className="form-label">Latitude</label>
  <input
    type="text"
    className="form-control"
    value={formData.latitude}
    disabled
    placeholder="Click button to fetch"
  />
</Col>

<Col lg="4" className="py-3">
  <label className="form-label">Longitude</label>
  <input
    type="text"
    className="form-control"
    value={formData.longitude}
    disabled
    placeholder="Click button to fetch"
  />
</Col>

<Col lg="4" className="py-3 d-flex align-items-end">
  <ClickButton
    label="Get Current Location"
    onClick={handleGetCurrentLocation}
    disabled={type === "view"}
    className="btn btn-info w-100"
  />
</Col>
          {/* Signs Heading */}
          <Col lg="12" className="py-3">
            <h5>Customer Sign and Staff Sign</h5>
          </Col>

          {/* Customer Sign */}
          <Col lg="6" className="py-5">
            <div className="file-upload position-relative">
              <label>Customer Sign</label>
              <input
                type="checkbox"
                className="position-absolute top-0 end-0 mt-1 me-1 form-check-input"
                checked={formData.customer_sign_pic.length > 0}
                disabled
              />
              {(type === "edit" || type === "view") &&
              formData.customer_sign_pic.length > 0 ? (
                <img
                  src={formData.customer_sign_pic[0].data}
                  alt="Customer Signature"
                  className="img-fluid w-100"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: 5,
                    background: "#fff",
                  }}
                />
              ) : (
                <SignatureCanvas
                  ref={sigCustomerRef}
                  canvasProps={{
                    className: "sigCanvas border rounded w-100",
                    style: { width: "100%", height: "200px" },
                  }}
                />
              )}

              <div className="d-flex justify-content-center gap-2 mt-2">
                <ClickButton
                  label="Submit Signature"
                  onClick={handleSaveCustomerSign}
                  className="btn btn-success btn-sm"
                  disabled={type === "view"}
                />
                <ClickButton
                  label="Clear"
                  onClick={handleClearCustomerSign}
                  className="btn btn-secondary btn-sm"
                  disabled={type === "view"}
                />
              </div>
            </div>
          </Col>

          {/* Staff Sign */}
          <Col lg="6" className="py-5">
            <div className="file-upload position-relative">
              <label>Staff Sign</label>
              <input
                type="checkbox"
                className="position-absolute top-0 end-0 mt-1 me-1 form-check-input"
                checked={formData.staff_sign_pic.length > 0}
                disabled
              />
              {(type === "edit" || type === "view") &&
              formData.staff_sign_pic.length > 0 ? (
                <img
                  src={formData.staff_sign_pic[0].data}
                  alt="Staff Signature"
                  className="img-fluid w-100"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    border: "1px solid #ccc",
                    borderRadius: 5,
                    background: "#fff",
                  }}
                />
              ) : (
                <SignatureCanvas
                  ref={sigStaffRef}
                  canvasProps={{
                    className: "sigCanvas border rounded w-100",
                    style: { width: "100%", height: "200px" },
                  }}
                />
              )}

              <div className="d-flex justify-content-center gap-2 mt-2">
                <ClickButton
                  label="Submit Signature"
                  onClick={handleSaveStaffSign}
                  className="btn btn-success btn-sm"
                  disabled={type === "view"}
                />
                <ClickButton
                  label="Clear"
                  onClick={handleClearStaffSign}
                  className="btn btn-secondary btn-sm"
                  disabled={type === "view"}
                />
              </div>
            </div>
          </Col>
          <Col lg="12" className="text-center py-5">
            {type === "view" ? (
              <ClickButton
                label="Back"
                onClick={() => navigate("/console/master/sale")}
              />
            ) : type === "edit" ? (
              <div className="d-flex justify-content-center gap-3">
                <ClickButton
                  label={loading ? "Updating..." : "Update"}
                  onClick={handleUpdateSubmit}
                  disabled={loading}
                />
                <ClickButton
                  label="Cancel"
                  onClick={() => navigate("/console/master/sale")}
                />
              </div>
            ) : (
              <div className="d-flex justify-content-center gap-3">
                <ClickButton
                  label={loading ? "Submitting..." : "Submit"}
                  onClick={handleSubmit}
                  disabled={loading}
                />
                <ClickButton
                  label="Cancel"
                  onClick={() => navigate("/console/master/sale")}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-center" theme="colored" />

      {/* Preview Modal */}
      {previewFile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              background: "#fff",
              padding: 20,
              borderRadius: 8,
            }}
          >
            <button
              onClick={() => setPreviewFile(null)}
              style={{
                position: "absolute",
                top: 5,
                right: 10,
                fontSize: 24,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            {previewFile.type === "image" ? (
              <img
                src={previewFile.data}
                alt="Preview"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  objectFit: "contain",
                }}
              />
            ) : (
              <iframe
                src={previewFile.data}
                style={{ width: "80vw", height: "80vh" }}
                title="PDF Preview"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleCreations;
