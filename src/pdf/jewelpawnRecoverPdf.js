import React, { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import fontBold from "./fonts/NotoSansTamil-Bold.ttf";
import fontRegular from "./fonts/NotoSansTamil-Regular.ttf";
import { BsTransparency } from "react-icons/bs";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

Font.register({
  family: "fontBold",
  fonts: [{ src: fontBold, fontStyle: "normal", fontWeight: "bold" }],
});
Font.register({
  family: "fontRegular",
  fonts: [{ src: fontRegular, fontStyle: "normal", fontWeight: "normal" }],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
  },
  halfPage: {
    width: "50%",
    padding: 5,
  },
  dupe: {
    //flexGrow: 1,
    border: 1,
    borderColor: "#4535C1",
    letterSpacing: 0.5,
    color: "#4535C1",
    borderBottomWidth: 1,
    minHeight: "50%",
  },
  normalText: {
    fontFamily: "fontRegular",
    fontWeight: "normal",
    fontSize: 8,
    margin: 8,
  },
  boldText: {
    fontFamily: "fontBold",
    fontWeight: "bold",
    fontSize: 10,
    textAlign: "left",
  },
  boldTextone: {
    fontFamily: "fontBold",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  table: {
    display: "table",
    fontFamily: "fontRegular",
    flexDirection: "column",
    width: "100%",
    borderBottom: 1,
    borderTop: 1,
    fontSize: 8,
    borderColor: "#4535C1",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tableRow1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 8,
  },
  company: {
    width: "100%",
    fontFamily: "fontRegular",
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  dateCell: {
    width: "100%",
    padding: 5,
    fontSize: 8,
  },
  pad: {
    paddingVertical: 3,
  },
  customerdetail: {
    paddingTop: 8,
    paddingHorizontal: 8,
    display: "flex",
    fontSize: 8,
  },
  details: {
    paddingVertical: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  state: {
    width: "40%",
    fontFamily: "fontBold",
    fontWeight: "bold",
    fontSize: 8,
  },
  storename: {
    textAlign: "center",
    fontFamily: "fontBold",
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  tamilTable: {
    margin: 15,
    border: "1pt solid #4535C1",
  },
  tamilTableRowHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #4535C1",
    paddingVertical: 5,
  },
  tamilTableRow: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  tamilTableRowTotal: {
    flexDirection: "row",
    borderTop: "1pt solid #4535C1",
    paddingVertical: 5,
    marginTop: 4,
    paddingTop: 3,
  },
  tamilCellLeft: {
    width: "50%",
    fontSize: 8,
    paddingLeft: 5,
    textAlign: "left",
  },
  tamilCellRight: {
    width: "50%",
    textAlign: "right",
    fontSize: 8,
    paddingRight: 5,
  },
  tamilCellLeftBold: {
    width: "50%",
    fontSize: 8,
    fontWeight: "bold",
    paddingLeft: 5,
    textAlign: "left",
  },
  tamilCellRightBold: {
    width: "50%",
    textAlign: "right",
    fontSize: 8,
    fontWeight: "bold",
    paddingRight: 5,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  logoImage: {
    width: 60,
    maxHeight: 50,
  },
  tableCell: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#4535C1",
  },
  footer: {
    display: "flex",
    fontFamily: "fontRegular",
    flexDirection: "row",
    color: "#4535C1",
    marginTop: "auto",
    padding: 10,
  },
  time: {
    width: "50%",
    alignItems: "flex-start",
    fontSize: 8,
    fontFamily: "fontRegular",
  },
  phone: {
    width: "50%",
    alignItems: "flex-end",
    fontSize: 8,
    fontFamily: "fontRegular",
  },
  termpoint: {
    paddingVertical: 8,
  },
  headdivright: {
    fontSize: 8,
    textAlign: "right",
  },
  headright: {
    paddingLeft: 22,
  },
});

const Receipt = ({ data }) => {
  const formattedDate = formatDate(data.pawnjewelry_recovery_date);

  return (
    <View style={styles.dupe}>
      <View style={styles.font}>
        <View style={styles.table}>
          <View style={styles.tableCell}>
            <Text style={styles.pad}>
              <Text style={styles.normalText}>Licence No:TN-2020250508106</Text>
            </Text>
            <View style={styles.headdivright}>
              <Text> Ph : 04562-221465 </Text>
              <Text style={styles.headright}> 84890 20465</Text>
              <Text style={styles.headright}> 8667059782</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.company}>
              <View style={styles.logoContainer}>
                <Image src="/logo192.png" style={styles.logoImage} />
              </View>
              <Text style={styles.storename}>NITHI GOLD FINANCE </Text>
              <Text style={{ marginTop: 3, fontSize: 8 }}>
                              No.12-E, P.S.R. Road, Sivakasi - 626123.
                            </Text>
              <Text></Text>
              <Text></Text>
              <Text style={styles.boldText}>
                                (அரசு அங்கீகாரம் பெற்ற நிறுவனம்)
                            </Text>
              <Text style={styles.boldTextone}>Loan Closure receipt</Text>
            </View>
          </View>         
        </View>
        <View style={styles.customerdetail}>
          <View style={styles.details}>
            <Text style={styles.state}>1.customer number: </Text>
            <Text> {data.customer_no} </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.state}>2.loan number: </Text>
            <Text> {data.receipt_no} </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.state}>3.Name : </Text>
            <Text> {data.name} </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.state}>4.Loan Closing Date :</Text>
            <Text> {formattedDate} </Text>
          </View>

        </View>
        <View style={styles.tamilTable}>
          <View style={styles.tamilTableRowHeader}>
            <Text style={[styles.tamilCellLeft, styles.boldText]}>Particulars</Text>
            <Text style={[styles.tamilCellRight, styles.boldText]}>Amount</Text>
          </View>
          <View style={styles.tamilTableRow}>
            <Text style={styles.tamilCellLeft}>Principal Receive</Text>
            <Text style={styles.tamilCellRight}>{data.refund_amount}</Text>
          </View>
          <View style={styles.tamilTableRow}>
            <Text style={styles.tamilCellLeft}>Interest Receive</Text>
            <Text style={styles.tamilCellRight}>{data.interest_income}</Text>
          </View>
          <View style={styles.tamilTableRow}>
            <Text style={styles.tamilCellLeft}>Others Charges</Text>
            <Text style={styles.tamilCellRight}>{data.other_amount}</Text>
          </View>

          <View style={styles.tamilTableRowTotal}>
            <Text style={[styles.tamilCellLeftBold, styles.boldText]}>Total Amount</Text>
            <Text style={[styles.tamilCellRightBold, styles.boldText]}>{parseFloat(data.refund_amount) + parseFloat(data.interest_income) + parseFloat(data.other_amount)}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.time}>
            <View style={styles.termpoint}>
              <Text style={styles.boldText}>Payer's signature </Text>
            </View>
          </View>
          <View style={styles.phone}>
            <View style={styles.termpoint}>
              <Text style={styles.boldText}>For NITHI GOLD FINANCE</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
};

const RecoveryConfirmationPage = ({ data }) => {
  const recoveryDate = formatDate(data.pawnjewelry_recovery_date);
  const pawnDate = formatDate(data.pawnjewelry_date);
// 1. Check if it's already an object; if not, parse it.
const jewels = typeof data.jewel_product === 'string' 
  ? JSON.parse(data.jewel_product) 
  : (data.jewel_product || []);

// 2. Sum the weight (checking for both 'weight' and 'Weight')
const totalWeight = jewels.reduce((sum, item) => sum + parseFloat(item.weight || item.Weight || 0), 0);
  return (
    <View style={{ padding: 40, fontFamily: "fontRegular", color: "#000" }}>
      <View style={{ textAlign: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontFamily: "fontBold" }}>நிதி கோல்டு பைனான்{""}ஸ்</Text>
        <Text style={{ fontSize: 10, marginTop: 5 }}>H/O:182, இரண்டாவது மாடி, AKS தியேட்டர் ரோடு, கோவில்பட்{""}டி </Text>
        <View style={{ borderBottomWidth: 1, marginTop: 10, borderColor: "#000" }} />
      </View>

      <Text style={{ textAlign: "center", fontSize: 14, fontFamily: "fontBold", marginBottom: 15 }}>
        நகை மீட்பு உறுதிமொழி படிவ{""}ம்
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "60%", fontSize: 10, lineHeight: 1.8 }}>
          <Text>அடகு விபரம் :</Text>
          <Text>அடகு நம்பர் - {data.receipt_no}</Text>
        <Text>எடை - {totalWeight} கிராம்</Text>
          <Text>பொருளின் விவரம் - {data.item_description || "செயின் ஒன்று"}</Text>
          <Text>அடகு தேதி - {pawnDate}</Text>
          <Text>கடன் தொகை - {data.refund_amount}/-</Text>
          <Text>நகை மீட்கப்பட்ட தேதி - {recoveryDate}</Text>
          <Text>நகை மீட்கப்பட்ட தொகை - {data.refund_amount}/-</Text>
          <Text>வட்டி வரவு தொகை - {data.interest_income}/-</Text>
        </View>
        <View style={{ width: 110, height: 110, border: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 9 }}>புகைப்படம் இல்லை</Text>
        </View>
      </View>

      <View style={{ marginTop: 30, fontSize: 11, lineHeight: 1.6 }}>
        <Text>ஐயா / அம்மா ,</Text>
        <Text style={{ marginTop: 10, textIndent: 30, textAlign: "justify" }}>
          வணக்கம், நான் நிதி கோல்டு பைனான்ஸ் மற்றும் பேரையூர் சக்தி பைனான்ஸ் என்ற
          நிறுவனத்தில் எனது சொந்த நகையான {totalWeight} கிராம் நகையை {pawnDate} தேதியன்று PAWN NO 
          {data.receipt_no} ல் அடகு வைத்தேன் அதற்கு இன்று {recoveryDate} அதற்கான அசலையும்
          வட்டியையும் செலுத்தி எனது நகையை நல்ல நிலையில் பெறுகிறேன் என்பதை
          தெரிவித்துக்கொள்கிறேன்.
        </Text>
        <Text style={{ textAlign: "center", marginTop: 20 }}>நன்றி,</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 50, fontSize: 10 }}>
        <View>
          <Text style={{  fontFamily: "fontBold" }}>நாள் : {recoveryDate}</Text>
          <Text style={{  fontFamily: "fontBold" }}>இடம் : {data.place || "-"}</Text>
        </View>
        <View>
          <Text style={{  fontFamily: "fontBold" }}>இப்படிக்கு,</Text>
        </View>
      </View>
    </View>
  );
};

const JewelryRecoveryPDF = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.halfPage}>
          <Receipt data={data} />
        </View>
        <View style={styles.dividerLine} />
        <View style={styles.halfPage}>
          <Receipt data={data} />
        </View>
      </Page>
      <Page size="A4">
        <RecoveryConfirmationPage data={data} />
      </Page>
    </Document>
  );
};

export default JewelryRecoveryPDF;