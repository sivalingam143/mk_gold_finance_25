import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TextInputForm } from "../../components/Forms";
import { ClickButton, ChooseButton } from "../../components/ClickButton";
import PageNav from "../../components/PageNav";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API_DOMAIN from "../../config/config";
import "react-toastify/dist/ReactToastify.css";

const SaleCreations = () => {
  const location = useLocation();
  const { type, rowData } = location.state || {};
  const navigate = useNavigate();

  const customerPicInputRef = useRef(null);
  const idPicInputRef = useRef(null);
  const jewelPicInputRef = useRef(null);

  const [previewFile, setPreviewFile] = useState(null);

  const tharamOptions = [
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "22CD", label: "22CD" },
    { value: "916", label: "916" },
  ];
  const getTodayDate = () => new Date().toISOString().split('T')[0];
// Replace the initialState definition in SaleCreations.js
const initialState =
  type === "edit" || type === "view"
    ? {
        ...rowData,
        date: rowData.date || getTodayDate(),
        tharam: rowData.tharam || "",
        customer_pic: Array.isArray(rowData.customer_pic) 
          ? rowData.customer_pic.map((url) => ({
              name: url.split('/').pop(),
              data: url, // Use the full URL directly
              type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
              isExisting: true
            })) 
          : [],
        id_pic: Array.isArray(rowData.id_pic) 
          ? rowData.id_pic.map((url) => ({
              name: url.split('/').pop(),
              data: url,
              type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
              isExisting: true
            })) 
          : [],
        jewel_pic: Array.isArray(rowData.jewel_pic) 
          ? rowData.jewel_pic.map((url) => ({
              name: url.split('/').pop(),
              data: url,
              type: /\.(pdf)$/i.test(url) ? "pdf" : "image",
              isExisting: true
            })) 
          : [],
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
      };
  const [formData, setFormData] = useState(initialState);
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

const handleChange = (e, field) => {
    const value = e.target ? e.target.value : e.value;

    setFormData((prev) => {
      // Create the updated state for the field being changed
      const updatedData = { ...prev, [field]: value };

      // Check if we are editing one of the two source fields
      if (field === "bank_loan_amount" || field === "customer_receive_amount") {
        // Parse values as numbers, defaulting to 0 if empty or invalid
        const bankAmt = parseFloat(updatedData.bank_loan_amount) || 0;
        const customerAmt = parseFloat(updatedData.customer_receive_amount) || 0;
        
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

  const handleSubmit = async () => {
    const required = ["name", "mobile_number", "bank_name", "staff_name"];
    for (const key of required) {
      if (!formData[key]) {
        toast.error(`${key.replace(/_/g, " ")} is required!`);
        return;
      }
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

  try {
    const payload = {
      edit_sale_id: rowData.sale_id,
      ...formData,
      sale_date: formData.date || getTodayDate(),
      customer_pic: prepareFiles(formData.customer_pic),
      id_pic: prepareFiles(formData.id_pic),
      jewel_pic: prepareFiles(formData.jewel_pic),
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
            <PageNav pagetitle={`${type === "edit" ? "Edit" : type === "view" ? "View" : "Create"} Sale`} />
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
            <TextInputForm labelname="Name" value={formData.name} onChange={(e) => handleChange(e, "name")} disabled={type === "view"} />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm labelname="Place" value={formData.place} onChange={(e) => handleChange(e, "place")} disabled={type === "view"} />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm labelname="Mobile Number" value={formData.mobile_number} onChange={(e) => handleChange(e, "mobile_number")} disabled={type === "view"} />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm labelname="Bank Name" value={formData.bank_name} onChange={(e) => handleChange(e, "bank_name")} disabled={type === "view"} />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm labelname="Bank Loan Amount" value={formData.bank_loan_amount} onChange={(e) => handleChange(e, "bank_loan_amount")} disabled={type === "view"} />
          </Col>
          <Col lg="3" className="py-3">
            <TextInputForm labelname="Customer Receive Amount" value={formData.customer_receive_amount} onChange={(e) => handleChange(e, "customer_receive_amount")} disabled={type === "view"} />
          </Col>
         <Col lg="3" className="py-3">
  <label className="form-label">தரம்</label>
  <select 
    className="form-select"  // Changed from form-control to form-select
    value={formData.tharam} 
    onChange={(e) => handleChange(e, "tharam")}
    disabled={type === "view"}
  >
    <option value="">Select தரம்</option>
    {tharamOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
</Col>
           <Col lg="3" className="py-3">
            <TextInputForm labelname="Total Jewel Weight" value={formData.total_jewel_weight} onChange={(e) => handleChange(e, "total_jewel_weight")} disabled={type === "view"} />
          </Col>
           <Col lg="3" className="py-3">
  <TextInputForm 
    labelname="Total Loan Amount" 
    value={formData.total_loan_amount} 
    onChange={(e) => handleChange(e, "total_loan_amount")} 
    disabled={true} // Set to true since it's auto-calculated
  />
</Col>
          <Col lg="3" className="py-3">
            <TextInputForm labelname="Staff Name" value={formData.staff_name} onChange={(e) => handleChange(e, "staff_name")} disabled={type === "view"} />
          </Col>

          {/* Customer Photo */}
          <Col lg="4" className="py-5">
            <div className="file-upload">
              <label>Customer Photo</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                ref={customerPicInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e.target.files, "customer_pic")}
              />
              <ChooseButton label="Choose File" onClick={() => customerPicInputRef.current?.click()} />
              {formData.customer_pic.map((file, i) => (
                <div key={i} className="file-item d-flex align-items-center mb-2 mt-2">
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      style={{ width: 100, height: 100, objectFit: "cover", marginRight: 10, borderRadius: 5 }}
                    />
                  ) : (
                    <span style={{ marginRight: 10 }}>{file.name}</span>
                  )}
                  <ChooseButton label="Preview" className="btn btn-primary btn-sm me-2" onClick={() => handlePreview(file)} />
                  <ChooseButton label="Delete" className="btn btn-danger btn-sm" onClick={() => handleImageDelete(i, "customer_pic")} />
                </div>
              ))}
            </div>
          </Col>

          {/* ID Proof */}
          <Col lg="4" className="py-5">
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
              <ChooseButton label="Choose File" onClick={() => idPicInputRef.current?.click()} />
              {formData.id_pic.map((file, i) => (
                <div key={i} className="file-item d-flex align-items-center mb-2 mt-2">
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      style={{ width: 100, height: 100, objectFit: "cover", marginRight: 10, borderRadius: 5 }}
                    />
                  ) : (
                    <span style={{ marginRight: 10 }}>{file.name}</span>
                  )}
                  <ChooseButton label="Preview" className="btn btn-primary btn-sm me-2" onClick={() => handlePreview(file)} />
                  <ChooseButton label="Delete" className="btn btn-danger btn-sm" onClick={() => handleImageDelete(i, "id_pic")} />
                </div>
              ))}
            </div>
          </Col>

          {/* Jewel Photo */}
          <Col lg="4" className="py-5">
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
              <ChooseButton label="Choose File" onClick={() => jewelPicInputRef.current?.click()} />
              {formData.jewel_pic.map((file, i) => (
                <div key={i} className="file-item d-flex align-items-center mb-2 mt-2">
                  {file.type === "image" ? (
                    <img
                      src={file.data}
                      alt="preview"
                      style={{ width: 100, height: 100, objectFit: "cover", marginRight: 10, borderRadius: 5 }}
                    />
                  ) : (
                    <span style={{ marginRight: 10 }}>{file.name}</span>
                  )}
                  <ChooseButton label="Preview" className="btn btn-primary btn-sm me-2" onClick={() => handlePreview(file)} />
                  <ChooseButton label="Delete" className="btn btn-danger btn-sm" onClick={() => handleImageDelete(i, "jewel_pic")} />
                </div>
              ))}
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
          <div style={{ position: "relative", background: "#fff", padding: 20, borderRadius: 8 }}>
            <button
              onClick={() => setPreviewFile(null)}
              style={{ position: "absolute", top: 5, right: 10, fontSize: 24, background: "none", border: "none", cursor: "pointer" }}
            >
              ×
            </button>
            {previewFile.type === "image" ? (
              <img src={previewFile.data} alt="Preview" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }} />
            ) : (
              <iframe src={previewFile.data} style={{ width: "80vw", height: "80vh" }} title="PDF Preview" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleCreations;