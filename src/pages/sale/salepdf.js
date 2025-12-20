import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, pdf, Image } from '@react-pdf/renderer';
import image from "../../mklogo.png";
import fontBold from "../../pdf/fonts/NotoSansTamil-Bold.ttf";
import fontRegular from "../../pdf/fonts/NotoSansTamil-Regular.ttf";

// Register Tamil Fonts [cite: 4, 18]
Font.register({
  family: 'TamilFont',
  fonts: [
    { src: fontRegular, fontWeight: 'normal' },
    { src: fontBold, fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'TamilFont',
    fontSize: 13,
    position: 'relative', 
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: '30%', 
    left: '25%', // Centered slightly better
    width: '50%', 
    opacity: 0.12, 
    zIndex: -1,
  },
  outerBorder: {
    border: '2pt solid black',
    margin: 15,
    padding: 4,
    flexGrow: 1,
    zIndex: 1,
  },
  innerBorder: {
    border: '1pt solid black',
    paddingTop: 25,
    paddingBottom: 15,
    paddingRight: 35,
    paddingLeft: 20,
    height: '100%',
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
    marginLeft: -10,
    marginTop: -20,
    marginRight: -20,
    marginBottom: 10,
  },
  headerBox: {
    border: '1pt solid black',
    borderRadius: 9,
    padding: 2,
    alignItems: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  address: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  doubleLineContainer: {
    marginBottom: 15,
    marginLeft: -20,
    marginRight: -35,
  },
  lineThick: { borderBottom: '2pt solid black' },
  lineThin: { borderBottom: '1pt solid black', marginTop: 2 },
  
  // FIXED ALIGNMENT STYLES
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures text sits on the same line
    marginBottom: 12,
    marginLeft: -10,
  },
  
  label: { 
    width: 90, // Increased width to ensure all labels are equal
    fontWeight: 'bold',
  },
 value: {
    flex: 1,
    fontSize: 12,
  },
  rightSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    width: 150,
  },
  numberValueBox: { 
    borderBottom: '1pt dotted black', 
    width: 80, 
    textAlign: 'center',
    marginLeft: 5,
  },
  
  body: {
    fontSize: 12,
    lineHeight: 2.8,
    textAlign: 'justify',
    marginTop: 10,
    marginLeft: -10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  witnessLabel: { fontWeight: 'bold', marginBottom: 5 },
  signatureSection: { alignItems: 'flex-end' },
});

const SalePDF = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={image} style={styles.backgroundImage} />

        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            <View style={styles.topRow}>
              <Text>GST IN: {data?.gst || "33EEBPM7995M1ZQ"}</Text>
              <Text>9159605464, 9360705455</Text>
            </View>

            <View style={styles.headerBox}>
              <Text style={styles.title}>M.K கோல்டு பைனான்ஸ் </Text>
            </View>

            <Text style={styles.address}>
              H/O:182, இரண்டாவது மாடி, AKS தியேட்டர் ரோடு, {""}கோவில்பட்டி 
            </Text>

            <View style={styles.doubleLineContainer}>
              <View style={styles.lineThick} />
              <View style={styles.lineThin} />
            </View>

            {/* Adjusted Rows for Alignment [cite: 6, 8, 10, 11] */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>பெயர் :</Text>
                <Text style={styles.value}>{data?.name || "Maha"}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text>எண்:</Text>
                <View style={styles.numberValueBox}>
                  <Text>{data?.id || "12"}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>முகவரி :</Text>
                <Text style={styles.value}>{data?.place || "Vnr"}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text>தேதி:</Text>
                <View style={styles.numberValueBox}>
                  <Text>{formatDate(data?.date) || "20-12-2025"}</Text>
                </View>
              </View>
            </View>

   
     <View style={styles.infoRow}>
              <Text style={styles.label}>தொலைபேசி:</Text>
              <View >
                <Text style={{ marginLeft: 20 }} >{data?.mobile_number || "9090909090"}</Text>
              </View>
            </View>

            {/* Receipt Text [cite: 16, 17, 18] */}
            <View style={styles.body}>
              <Text>
                நான் ................................ தேதியில்  <Text>{formatDate(data?.date) || "20-12-2025"}</Text> யில் அடகு வைத்த நகை/அளவு ............................................................................................................................................{"\n"}
                M.K.கோல்டு நிறுவனத்தில் அசல் ................................ வட்டி ................................ {""}தொகைகளை வாங்கி பொருட்களை திருப்பி, என்னுடைய {""} அவசர நிமித்த {""} செலவிற்காக நகைகளை விற்பனை செய்து, மீதமுள்ள தொகை ரூபாய் ................................ பணத்தை M.K.கோல்டு நிறுவனத்திலிருந்து பெற்றுக் {""} கொண்டேன். இதில் ஏதேனும் வில்லங்கம் வந்தால், அதை நானே என்னுடைய சொந்த {""}பொறுப்பில் சரி செய்து கொடுக்கின்றேன். இதை படித்துப் பார்த்தும், படிக்கக் கேட்டும் {""} தெரிந்து {""} கொண்டேன்.
              </Text>
            </View>

            <View style={styles.footer}>
              <View>
                <Text style={{ marginBottom: 20 }}>தேதி:</Text>
                <Text style={styles.witnessLabel}>சாட்சி</Text>
                <Text>1.</Text>
                <Text>2.</Text>
              </View>
              <View style={styles.signatureSection}>
                <Text style={{ fontWeight: 'bold' }}>இப்படிக்கு</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
// Function to download the PDF
export const handleSaleDownload = async (rowData, setLoading) => {
  if (setLoading) setLoading(true);
  try {
    const blob = await pdf(<SalePDF data={rowData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sale_${rowData?.name || 'Receipt'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Error:", error);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export default SalePDF;