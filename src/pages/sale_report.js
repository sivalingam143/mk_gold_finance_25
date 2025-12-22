import React, { useState, useEffect, useMemo } from 'react';
import API_DOMAIN from '../config/config';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SaleReport.css';
import dayjs from 'dayjs';

const SaleReport = () => {
  
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Fetch data from sale.php
  const fetchReportData = async () => {
    try {
      const response = await fetch(`${API_DOMAIN}/sale.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search_text: '' }),
      });
      const responseData = await response.json();

      if (responseData.head.code === 200) {
        const data = responseData.body.sales.map((item) => ({
          date: item.sale_date ? item.sale_date : '-',
          name: item.name || '-',
          place: item.place || '-',
          mobileNumber: item.mobile_number || '-',
          bankName: item.bank_name || '-',
          bankLoanAmount: item.bank_loan_amount || '-',
          customerReceiveAmount: item.customer_receive_amount || '-',
          totalJewelWeight: item.total_jewel_weight || '0',
          totalLoanAmount: item.total_loan_amount || '0',
          tharam: item.tharam || '-',
          staffName: item.staff_name || '-',
        }));
        setReportData(data);
        applyFilters(data, fromDate, toDate, statusFilter);
      } else {
        console.error('API Error:', responseData.head.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  // Apply filters and sorting + Recalculate S.No sequentially
  const applyFilters = (data, from, to, status) => {
    let filtered = [...data];

    // Date range filter
    if (from && to) {
      const startDate = new Date(from + 'T00:00:00');
      const endDate = new Date(to + 'T23:59:59.999');
      filtered = filtered.filter((item) => {
        const recordDate = new Date(item.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    } else {
      // Default sort by date ascending
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Recalculate S.No starting from 1 for the filtered + sorted data
    const filteredWithSNo = filtered.map((item, index) => ({
      ...item,
      sNo: index + 1,
    }));

    setFilteredData(filteredWithSNo);
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    applyFilters(reportData, fromDate, toDate, statusFilter);
  };

  // Handle filter changes
  const handleFilterChange = () => {
    applyFilters(reportData, fromDate, toDate, statusFilter);
  };

  const handleClearFilters = () => {
    setFromDate('');
    setToDate('');
    setStatusFilter('All');
    applyFilters(reportData, '', '', 'All');
  };

  const exportToCSV = () => {
    const csvData = filteredData.map((row) => ({
      'S.No': Number(row.sNo),
      'Date': dayjs(row.date).format('YYYY-MM-DD'),
      'Name': row.name,
      'Place': row.place,
      'Mobile Number': row.mobileNumber ? Number(row.mobileNumber) : '',
      'Bank Name': row.bankName,
      'Bank Loan Amount': Number(row.bankLoanAmount) || 0,
      'Customer Receive Amount': Number(row.customerReceiveAmount) || 0,
      'Total Jewel Weight': Number(row.totalJewelWeight) || 0,
      'Total Loan Amount': Number(row.totalLoanAmount) || 0,
      'Tharam': row.tharam,
      'Staff Name': row.staffName,
    }));

    if (filteredData.length > 0) {
      csvData.push({
        'S.No': 'TOTAL',
        'Date': '',
        'Name': '',
        'Place': '',
        'Mobile Number': '',
        'Bank Name': '',
        'Bank Loan Amount': '',
        'Customer Receive Amount': '',
        'Total Jewel Weight': Number(totals.totalJewelWeight),
        'Total Loan Amount': Number(totals.totalLoanAmount),
        'Tharam': '',
        'Staff Name': '',
      });
    }

    const csv = Papa.unparse(csvData);
    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sale_report.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    const centerTextInMargins = (text, y, fontSize = 14, fontStyle = 'bold') => {
      doc.setFontSize(fontSize);
      doc.setFont(undefined, fontStyle);
      const textWidth = doc.getTextWidth(text);
      const x = margin + (pageWidth - 2 * margin - textWidth) / 2;
      doc.text(text, x, y);
    };

    let currentY = 20;

    centerTextInMargins('Sale Report', currentY, 20, 'bold');
    currentY += 10;

    centerTextInMargins('NITHI GOLD FINANCE', currentY, 16, 'bold');
    currentY += 15;

    if (fromDate && toDate) {
      const formattedFrom = dayjs(fromDate).format('DD-MM-YYYY');
      const formattedTo = dayjs(toDate).format('DD-MM-YYYY');
      doc.setFontSize(12);
      doc.setTextColor(80, 80, 80);
      centerTextInMargins(`From Date: ${formattedFrom}    To Date: ${formattedTo}`, currentY);
      currentY += 15;
    }

    doc.setTextColor(33, 37, 41);

    const tableData = filteredData.map((row) => [
      row.sNo,
      dayjs(row.date).isValid() ? dayjs(row.date).format('DD-MM-YYYY') : '-',
      row.name,
      row.place,
      row.mobileNumber,
      row.bankName,
      row.bankLoanAmount,
      row.customerReceiveAmount,
      row.totalJewelWeight,
      row.totalLoanAmount,
      row.tharam,
      row.staffName,
    ]);

    doc.autoTable({
      startY: currentY,
      head: [[
        'S.No', 'Date', 'Name', 'Place', 'Mobile Number',
        'Bank Name', 'Bank Loan Amount', 'Customer Receive Amount',
        'Total Jewel Weight', 'Total Loan Amount', 'Tharam', 'Staff Name'
      ]],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: {
        fillColor: [52, 58, 64],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 11,
        halign: 'center',
      },
      columnStyles: {
        6: { halign: 'right' },
        7: { halign: 'right' },
        8: { halign: 'right' },
        9: { halign: 'right' },
      },
      alternateRowStyles: { fillColor: [248, 249, 250] },
      margin: { left: margin, right: margin },
    });

    const finalY = doc.lastAutoTable.finalY;

    if (filteredData.length > 0) {
      let totalsY = finalY + 15;

      doc.setFontSize(13);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 100);

      const weightText = `Total Jewel Weight: ${parseFloat(totals.totalJewelWeight).toFixed(2)} g`;
      const loanText = `Total Loan Amount: ${parseFloat(totals.totalLoanAmount).toFixed(2)} `;

      const weightWidth = doc.getTextWidth(weightText);
      const loanWidth = doc.getTextWidth(loanText);

      const xWeight = pageWidth - margin - weightWidth;
      const xLoan = pageWidth - margin - loanWidth;

      doc.text(weightText, xWeight, totalsY);
      totalsY += 8;
      doc.text(loanText, xLoan, totalsY);
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        `Generated on: ${dayjs().format('DD-MM-YYYY HH:mm')}`, 
        margin, 
        doc.internal.pageSize.height - 10
      );
    }

    doc.save('sale_report.pdf');
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Calculate totals based on filtered data
  const totals = useMemo(() => {
    const totalWeight = filteredData.reduce((sum, item) => {
      const weight = parseFloat(item.totalJewelWeight) || 0;
      return sum + weight;
    }, 0);

    const totalLoan = filteredData.reduce((sum, item) => {
      const loan = parseFloat(item.totalLoanAmount) || 0;
      return sum + loan;
    }, 0);

    return {
      totalJewelWeight: totalWeight.toFixed(2),
      totalLoanAmount: totalLoan.toFixed(2),
    };
  }, [filteredData]);

  // Fetch data on mount
  useEffect(() => {
    fetchReportData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-3xl font-bold text-dark">Sale Report</h2>

      {/* Filters */}
      <div className="filter-card mb-4 row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label fw-semibold">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex gap-2">
          <button className="btn-cus" onClick={handleFilterChange}>
            Apply Filters
          </button>
          <button className="btn-cus" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mb-3 d-flex gap-2">
        <button onClick={exportToCSV} className="btn-cus">
          Export to CSV
        </button>
        <button onClick={exportToPDF} className="btn-cus">
          Export to PDF
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              {['sNo', 'date', 'name', 'place', 'mobileNumber', 'bankName', 'bankLoanAmount', 'customerReceiveAmount', 'totalJewelWeight', 'totalLoanAmount', 'tharam', 'staffName'].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="p-3 text-left cursor-pointer sort-header"
                  style={key === 'date' ? { minWidth: '140px' } : {}}
                >
                  {key === 'sNo' ? 'S.No' :
                   key === 'date' ? 'Date' :
                   key === 'name' ? 'Name' :
                   key === 'place' ? 'Place' :
                   key === 'mobileNumber' ? 'Mobile Number' :
                   key === 'bankName' ? 'Bank Name' :
                   key === 'bankLoanAmount' ? 'Bank Loan Amount' :
                   key === 'customerReceiveAmount' ? 'Customer Receive Amount' :
                   key === 'totalJewelWeight' ? 'Total Jewel Weight' :
                   key === 'totalLoanAmount' ? 'Total Loan Amount' :
                   key === 'tharam' ? 'Tharam' :
                   'Staff Name'}
                  {sortConfig.key === key ? (
                    <span className="ms-2">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((row) => (
                <tr key={row.sNo}>
                  <td className="p-3">{row.sNo}</td>
                  <td className="p-3">{dayjs(row.date).format('DD-MM-YYYY')}</td>
                  <td className="p-3">{row.name}</td>
                  <td className="p-3">{row.place}</td>
                  <td className="p-3">{row.mobileNumber}</td>
                  <td className="p-3">{row.bankName}</td>
                  <td className="p-3">{row.bankLoanAmount}</td>
                  <td className="p-3">{row.customerReceiveAmount}</td>
                  <td className="p-3">{row.totalJewelWeight}</td>
                  <td className="p-3">{row.totalLoanAmount}</td>
                  <td className="p-3">{row.tharam}</td>
                  <td className="p-3">{row.staffName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="p-3 text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <span className="text-muted">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length} records
        </span>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="btn-cus"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button
                  className="btn-cus"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="btn-cus"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Total Summary Cards */}
      <div className="row mt-5">
        <div className="col-md-6 mb-3">
          <div className="card border-primary shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-primary fw-bold">Total Jewel Weight</h5>
              <h3 className="text-dark fw-bold">{totals.totalJewelWeight} g</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card border-success shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-success fw-bold">Total Loan Amount</h5>
              <h3 className="text-dark fw-bold">₹ {totals.totalLoanAmount}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleReport;