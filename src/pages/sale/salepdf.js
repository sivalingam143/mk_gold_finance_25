import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, pdf, Image } from '@react-pdf/renderer';
import image from "../../mklogo.png";
import fontBold from "../../pdf/fonts/NotoSansTamil-Bold.ttf";
import fontRegular from "../../pdf/fonts/NotoSansTamil-Regular.ttf";

// Register Tamil Fonts
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
    fontSize: 12, // Slightly reduced base font for A5
    position: 'relative', 
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
   dottedLine: {
    borderBottom: '1pt dotted black',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 18,
  },
  backgroundImage: {
    position: 'absolute',
    top: '30%', 
    left: '25%', 
    width: '50%', 
    opacity: 0.12, 
    zIndex: -1,
  },
  outerBorder: {
    border: '2pt solid black',
    margin: 10, // Reduced from 15 to fit A5
    padding: 3,
    flexGrow: 1,
    zIndex: 1,
  },
  innerBorder: {
    border: '1pt solid black',
    paddingTop: 20, // Reduced from 25
    paddingBottom: 10,
    paddingRight: 30, // Reduced from 35
    paddingLeft: 20,
    flexGrow: 1, // Changed from height 100% to prevent page overflow
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    marginLeft: -10,
    marginTop: -15, // Adjusted for A5
    marginRight: -30,
    marginBottom: 8,
  },
  headerBox: {
    border: '1pt solid black',
    borderRadius: 9,
    padding: 2,
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20, // Slightly reduced for A5
    fontWeight: 'bold',
    textAlign: 'center',
  },
  address: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 5,
  },
  doubleLineContainer: {
    marginBottom: 12,
    marginLeft: -20,
    marginRight: -30,
  },
  lineThick: { borderBottom: '2pt solid black' },
  lineThin: { borderBottom: '1pt solid black', marginTop: 2 },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Reduced from 12
    marginLeft: -10,
  },
  
  label: { 
    width: 80, 
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 11,
  },
  rightSection: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',
    width: 140,
  },
  numberValueBox: { 
    width: 70, 
    textAlign: 'center',
    marginLeft: 5,
  },
  
  body: {
    fontSize: 11,
    lineHeight: 2, // Slightly tighter line height
    // textAlign: 'justify',
    marginTop: 8,
    marginLeft: -10,
  },
  phoneContainer: {
    flexDirection: 'row',
   
    // justifyContent: 'flex-end',
  },
  phoneIcon: {
    width: 10,
    height: 10,
  marginRight:4, 
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15, // Changed from auto to fixed margin
  },
  witnessLabel: { fontWeight: 'bold', marginBottom: 5 },

  signatureSection: { alignItems: 'flex-end' },
});

const SalePDF = ({ data }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
// This defines the variable to fix the ESLint 'no-undef' error
const phoneIcon = "https://cdn-icons-png.flaticon.com/512/455/455705.png";
  const formattedDate = formatDate(data?.sale_date || data?.date);
  const id = data?.id || "";
  const name = data?.name || "";
  const place = data?.place || "";
  const mobile = data?.mobile_number || "";

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <Image src={image} style={styles.backgroundImage} />

        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            <View style={styles.topRow}>
              <Text>GST IN: {data?.gst || "33EEBPM7995M1ZQ"}</Text>
              <Text>உ</Text>
              <View style={styles.phoneContainer}>
              <Image src={phoneIcon} style={styles.phoneIcon} />
              <Text>9159605464, 9360705455</Text>
              </View>
            </View>

            <View style={styles.headerBox}>
              <Text style={styles.title}>M.K கோல்டு பைனான்ஸ் </Text>
            </View>

            <Text style={styles.address}>
              H/O:182, இரண்டாவது மாடி, AKS தியேட்டர் ரோடு, கோவில்பட்{""}டி 
            </Text>

            <View style={styles.doubleLineContainer}>
              <View style={styles.lineThick} />
              <View style={styles.lineThin} />
            </View>

            <View style={styles.infoRow}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>பெயர் :</Text>
                <Text style={styles.value}>{name}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text>எண்:</Text>
                <View style={styles.numberValueBox}>
                  <Text>{id}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>முகவரி :</Text>
                <Text style={styles.value}>{place}</Text>
              </View>
              <View style={styles.rightSection}>
                <Text>தேதி:</Text>
                <View style={styles.numberValueBox}>
                  <Text>{formattedDate}</Text>
                </View>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>தொலைபேசி</Text>
              <View>
                <Text style={{ marginLeft: 20 }}>{mobile}</Text>
              </View>
            </View>

            <View style={styles.body}>
              <Text>
                நான்  {formattedDate}{""} தேதியில் ................................................... {""} யில் அடகு வைத்த நகை/அளவு{""} ........................................................{"\n"}
                M.K.கோல்டு நிறுவனத்தில் அசல் ................................ வட்டி ................................ {""}தொகைகளை வாங்கி {""} பொருட்களை திருப்பி, என்னுடைய {""} அவசர நிமித்த {""} செலவிற்காக நகைகளை விற்பனை செய்து, மீதமுள்ள தொகை ரூபாய் ..........................பணத்தை M.K.கோல்டு நிறுவனத்திலிருந்து பெற்றுக் {""} கொண்டேன். இதில் ஏதேனும் வில்லங்கம் வந்தால், அதை நானே என்னுடைய சொந்த {""}பொறுப்பில் சரி செய்து கொடுக்கின்றேன்.{""} இதை படித்துப் பார்த்தும், படிக்கக் கேட்டும் {""} தெரிந்து {""} கொண்டேன்.
              </Text>
            </View>

            <View style={styles.footer}>
              <View>
                <Text style={{fontWeight: 'bold', marginBottom: 15,marginTop:10 }}>தேதி:</Text>
                <Text style={styles.witnessLabel}>சாட்சி</Text>
                <Text >1.</Text>
                <Text style={{ marginTop:2 }}>2.</Text>
              </View>
              <View style={styles.signatureSection}>
                <Text style={{ fontWeight: 'bold',marginTop:6 }}>இப்படிக்கு</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

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