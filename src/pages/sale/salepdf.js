import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, pdf } from '@react-pdf/renderer';

// Import Tamil fonts (adjust paths according to your project)
import fontBold from "../../pdf/fonts/NotoSansTamil-Bold.ttf";
import fontRegular from "../../pdf/fonts/NotoSansTamil-Regular.ttf";

Font.register({
  family: 'TamilFont',
  fonts: [
    { src: fontRegular, fontWeight: 'normal' },
    { src: fontBold, fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
   headerBox: {
    border: '1pt solid black',
    borderRadius: 9,
    // Use symmetric padding for top and bottom to ensure even spacing
    padding:0,
    paddingBottom:0,
    alignItems: 'center',
   
    marginBottom: 0,
  },
  doubleLineContainer: {
    marginTop: 0,
    marginBottom: 20,  
    marginLeft: -20, 
    marginRight: -35,
  },
  lineThick: {
    borderBottom: '2pt solid black',
  },
  lineThin: {
    borderBottom: '1pt solid black',
    marginTop: 2, // Space between the two lines
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    // Removed marginBottom to keep it centered in the header box
  },
  page: {
    padding: 0,
    fontFamily: 'TamilFont',
    fontSize: 13,
  },

  outerBorder: {
    border: '2pt solid black',
    margin: 15,
    padding: 4,
    flexGrow: 1,
  },
  // innerBorder: {
  //   border: '1pt solid black',
  //   padding: 35,
  //   paddingTop: 25,
  //   height: '100%',
  //   flexDirection: 'column',
  // },
innerBorder: {
    border: '1pt solid black',
    // Change from padding: 35 to specific values
    paddingTop: 25,
    paddingBottom: 15,
    paddingRight: 35,
    paddingLeft: 20, // Reduced from 35 to 20 to move content left
    height: '100%',
    flexDirection: 'column',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 11,
    marginLeft:-10,
     marginTop:-20,
     marginRight:-20,
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    // marginBottom: 8,
  },

  address: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 15,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginLeft: -10,
  },
  label: {
    width: 80,
    fontWeight: 'bold',
  },
  dottedLine: {
    borderBottom: '1pt dotted black',
    flex: 2,
    marginLeft: 10,
    marginRight: 10,
    height: 18,
  },
leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rightSection: {
    width: 150, 
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rightValueBox: {
    borderBottom: '1pt dotted black',
    width: 100,
    textAlign: 'center',
    marginLeft: 5,
  },
  leftDottedLine: {
    borderBottom: '1pt dotted black',
    flex: 1,
    marginLeft: 5,
    marginRight: 20,
  },
 nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginLeft:-10,
  },
  nameLabel: {
    width: 70,
    fontWeight: 'bold',
  },
  nameDotted: {
    borderBottom: '1pt dotted black',
    flex: 1,
    marginLeft: 10,
    marginRight: 30,
    height: 18,
  },
  numberLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  numberValueBox: {
    borderBottom: '1pt dotted black',
    width: 90,
    height: 18,
    textAlign: 'center',
  },

  fatherRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  fatherLabel: {
    width: 180,
    fontWeight: 'bold',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 35,
  },
  dateLabel: {
    width: 60,
    fontWeight: 'bold',
  },

  // body: {
  //   fontSize: 13,
  //   lineHeight: 1.9,
  //   textAlign: 'justify',
  //   marginBottom: 50,
  // },
  body: {
    fontSize: 13,
    lineHeight: 2.5,
    textAlign: 'justify',
    marginBottom: 20,
    // Pull the text to the left
    marginLeft: -10, 
    // Ensure it doesn't hit the right border by adding right margin
    marginRight: 0,   
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom:5,
  },
  witnessSection: {
    width: 200,
  },
  witnessLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  witnessLine1: {
    borderTop: '1pt solid black',
    width: 200,
    marginBottom: 10,
  },
  witnessLine2: {
    borderTop: '1pt solid black',
    width: 200,
  },

  signatureSection: {
    width: 200,
    alignItems: 'flex-end',
  },
  signatureLabel: {
    fontWeight: 'bold',
  },
  signatureLine: {
    borderTop: '1pt solid black',
    width: 180,
    marginTop: 40,
  },
});

const SalePDF = ({ data }) => {
  // Helper to format date as DD-MM-YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Extract dynamic values from the passed data object
  const formattedDate = formatDate(data?.sale_date || data?.date);
  const saleId = data?.sale_id || "";
  const name = data?.name || "";
  const place = data?.place || "";
  const mobile = data?.mobile_number || "";
  const totalLoanAmount = data?.total_loan_amount || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* GST & Phone */}
            <View style={styles.topRow}>
              <Text>GST IN: 33EEBPM7995M1ZQ</Text>
              <Text>9159605464, 9360705455</Text>
            </View>

            {/* Title & Address */}
            <View style={styles.headerBox}>
              <Text style={styles.title}>M.K கோல்டு பைனான்ஸ்</Text>
            </View>
            
            
            <Text style={styles.address}>
              H/O:182, இரண்டாவது மாடி, AKS தியேட்டர் ரோடு, கோவில்பட்டி
            </Text>
<View style={styles.doubleLineContainer}>
              <View style={styles.lineThick} />
              <View style={styles.lineThin} />
            </View>
            {/* Dynamic Name and ID Row */}
           <View style={styles.nameRow}>
  <View style={styles.leftSection}>
    <Text style={styles.nameLabel}>பெயர் :</Text>
    <View>
      <Text>{name}</Text>
    
     </View>
  </View>
  
  <View style={styles.rightSection}>
    <Text style={styles.numberLabel}>எண்:</Text>
    <View style={styles.rightValueBox}>
      
    </View>
  </View>
</View>

{/* Row 2: முகவரி and தேதி */}
<View style={styles.nameRow}>
  <View style={styles.leftSection}>
    <Text style={styles.label}>முகவரி :</Text>
    <View >
      <Text>{place}</Text>
    </View>
  </View>

  <View style={styles.rightSection}>
    <Text style={styles.numberLabel}>தேதி:</Text>
    <View style={styles.rightValueBox}>
      <Text>{formattedDate}</Text>
    </View>
  </View>
</View>

     <View style={styles.row}>
              <Text style={styles.label}>தொலைபேசி:</Text>
              <View >
                <Text style={{ marginLeft: 30 }}>{mobile}</Text>
              </View>
            </View>


            

            {/* Main body paragraph with Dynamic Total Amount */}
            <View style={styles.body}>
              <Text>
                நான் ....................................தேதியில் ..........................யில் அடகு வைத்த நகை/அளவு ............................................................................................................{"\n"}
                M.K.கோல்டு நிறுவனத்தில் அசல் .................................... வட்டி ....................................
                தொகைகளை வாங்கி பொருட்களை திருப்பி, {""}என்னுடைய அவசர நிமித்த செலவிற்காக நகைகளை விற்பனை செய்து,
                 மீதமுள்ள தொகை ரூபாய்
               
                பணத்தை M.K.கோல்டு நிறுவனத்திலிருந்து பெற்றுக் கொண்டேன்.{""} இதில் எதுவும் வில்லங்கம் வந்தால், அதை நானே {""}என் 
                 சொந்த {""} பொறுப்பில் சரி {""}செய்து கொள்கிறேன். 
                இதைப் படித்துப் {""}பார்த்தும், படிக்கக் கேட்டும் முழுமையாகத் தெரிந்து{""} கொண்டேன்.
              </Text>
            </View>

            {/* Footer Section */}
            <View style={styles.footer}>
              <View style={styles.witnessSection}>
                <View style={styles.row}>
              <Text style={styles.dateLabel}>தேதி:</Text>
              </View>
              
                <Text style={styles.witnessLabel}>சாட்சி</Text>
               
                <Text>1.</Text>
               
             
                <Text>2.</Text>
                   
              </View>

              <View style={styles.signatureSection}>
                <Text style={styles.signatureLabel}>இப்படிக்கு</Text>
                
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