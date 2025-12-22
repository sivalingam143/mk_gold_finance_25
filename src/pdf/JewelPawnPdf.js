// import React from 'react';
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Font,
//   Image,
// } from '@react-pdf/renderer';

// import fontRegular from './fonts/NotoSansTamil-Regular.ttf';
// import fontBold from "./fonts/NotoSansTamil-Bold.ttf";

// import logo from './images/logo.png'; // red logo top center
// import watermark from './images/back.png'; // background watermark

// // Register Tamil font
// Font.register({
//   family: 'NotoSansTamil',
//   src: fontRegular,
// });
// Font.register({
//   family: "fontBold",
//   fonts: [{ src: fontBold, fontStyle: "normal", fontWeight: "bold" }],
// });

// const styles = StyleSheet.create({
//   page: {
//     fontFamily: 'NotoSansTamil',
//     fontSize: 8,
//     padding: 30,
//   },
//   borderWrapper: {
//     border: '1 solid #000080',
//     padding: 4,
//     position: 'relative',
//     marginBottom: 20,
//   },
//   headerContainer: {
//     alignItems: 'center',
//     borderBottom: '1 solid #000080',
//     paddingBottom: 8,
//     marginBottom: 8,
//     position: 'relative',
//   },

//   phoneWrapper: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     padding: 4,
//   },

//   phoneText: {
//     fontSize: 8,
//     color: '#dd2b1c',
//   },

//   logoCentered: {
//     width: 70,
//     maxHeight: 70,
//     objectFit: 'contain',
//     marginBottom: 4,
//   },
//   heading: {
//     fontFamily: 'fontBold',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#000080',
//     marginBottom: 10,
//     fontSize: 10,
//     border: '1 solid #000080',
//     borderRadius: 10,
//     padding: 5,
//     alignSelf: 'center',
//   },
//   item: {
//     marginBottom: 8,
//     lineHeight: 1.5,
//     color: '#000080',
//     fontSize: 8
//   },
//   borderBox: {
//     border: '1 solid #000080',
//     padding: 15,
//     marginBottom: 20,
//   },
//   brandName: {
//     fontSize: 18,
//     fontWeight: 900, // closest to your image-bold
//     color: '#dd2b1c',
//     fontFamily: 'fontBold', // Make sure it's applied
//   },

//   subHeader: {
//     fontSize: 8,
//     color: '#000080',
//     marginTop: 2,
//   },

//   watermark: {
//     position: 'absolute',
//     top: '5%',
//     left: '17%',
//     width: 350,
//     maxHeight: 350,
//     opacity: 0.2
//   },
//   detailsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10,
//     borderBottom: '1 solid #000080',
//     paddingBottom: 6,
//   },
//   detailsCol: {
//     width: '65%',
//     paddingLeft: 20
//   },
//   detailsCol1: {
//     width: '35%',

//   },
//   pad: {
//     marginTop: 10,
//   },
//   label: {
//     fontWeight: 'bold',
//     color: '#000080',

//   },
//   tableHeader: {
//     flexDirection: 'row',

//     border: '1 solid #000080',
//     marginTop: 10,

//   },
//   th: {
//     padding: 4,
//     borderRight: '1 solid #000080',
//     fontFamily: 'fontBold',
//     fontSize: 8,
//     color: '#dd2b1c',
//     textAlign: 'center',
//   },
//   td: {
//     padding: 3,
//     borderRight: '1 solid #000080',
//     textAlign: 'center',
//   },
//   colWidths: {
//     col0: { width: '10%' },
//     col1: { width: '40%' },
//     col2: { width: '15%' },
//     col3: { width: '15%' },
//     col4: { width: '20%', borderRight: 'none' },
//   },
//   row: {
//     flexDirection: 'row',
//     borderLeft: '1 solid #000080',
//     borderRight: '1 solid #000080',
//     borderBottom: '1 solid #000080',


//   },
//   note: {
//     fontSize: 8,
//     marginTop: 10,
//     textAlign: 'left',
//     padding: 5,


//     color: '#000080',
//   },
//   signature: {
//     marginTop: 15,
//     textAlign: 'right',
//     paddingRight: 20,

//     fontSize: 8,
//     color: '#000080',
//   },
//   topRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     fontSize: 10,
//     marginBottom: 5,
//   },
//   leftText: {
//     width: '50%',
//     textAlign: 'left',
//   },
//   rightPhoneWrapper: {
//     width: '50%',
//     flexDirection: 'column',
//     textAlign: 'right',
//     alignItems: 'flex-end',
//   },
// });

// const LoanReceiptPDF = ({ data }) => {

//   const formatDate = (dateStr) => {
//     const d = new Date(dateStr);
//     const day = String(d.getDate()).padStart(2, '0');
//     const month = String(d.getMonth() + 1).padStart(2, '0');
//     const year = d.getFullYear();
//     return `${day}-${month}-${year}`;
//   };
//   const totdays = data.Jewelry_recovery_agreed_period * 30;
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.borderWrapper}>
//           <Image src={watermark} style={styles.watermark} />

//           <View style={styles.headerContainer}>
//             <View style={styles.topRow}>
//               <Text style={[styles.leftText, styles.phoneText]}>
//                 Licence No: TN-2020250508106
//               </Text>

//               <View style={styles.rightPhoneWrapper}>
//                 <Text style={styles.phoneText}> போன் நம்பர் : 04562-221465</Text>
//                 <Text style={styles.phoneText}> 8489020465</Text>
//                 <Text style={styles.phoneText}> 8667059782</Text>
//               </View>
//             </View>


//             {/* Centered Logo and Titles */}
//             <Image src={logo} style={styles.logoCentered} />

//             <Text style={styles.brandName}> MINI MERCANTILE BANKERS </Text>
//             <Text style={styles.subHeader}> (அரசு அங்கீகாரம் பெற்ற நிறுவனம்) </Text>
//             <Text style={styles.subHeader}> No.12-E, P.S.R. Road, Sivakasi - 626123 </Text>
//           </View>



//           <View style={styles.detailsRow}>
//             <View style={styles.detailsCol}>
//               <Text style={styles.pad}><Text style={styles.label}> கடன் தேதி :</Text> {formatDate(data.pawnjewelry_date)} </Text>
//               <Text style={styles.pad}><Text style={styles.label}> வாடிக்கையாளர் பெயர் :</Text> {data.name} </Text>
//               <Text style={styles.pad}><Text style={styles.label}> வாடிக்கையாளர் முகவரி :</Text> {data.customer_details} </Text>
//             </View>
//             <View style={styles.detailsCol1}>
//               <Text style={styles.pad}><Text style={styles.label}> வாடிக்கையாளர் எண் :</Text> {data.customer_no} </Text>
//               <Text style={styles.pad}><Text style={styles.label}> கடன் எண் :</Text> {data.receipt_no} </Text>
//               <Text style={styles.pad}><Text style={styles.label}> கடன் தொகை :</Text> ₹{data.original_amount} </Text>
//               <Text style={styles.pad}><Text style={styles.label}> கடன் காலம் :</Text> {data.Jewelry_recovery_agreed_period} </Text>
//             </View>
//           </View>

//           <View style={styles.tableHeader}>
//             <Text style={[styles.th, styles.colWidths.col0]}> வ.எண். </Text>
//             <Text style={[styles.th, styles.colWidths.col1]}> அடகு பொருளின் விவரம் </Text>
//             <Text style={[styles.th, styles.colWidths.col2]}> எண்ணிக்கை </Text>
//             <Text style={[styles.th, styles.colWidths.col3]}> மொத்த எடை </Text>
//             <Text style={[styles.th, styles.colWidths.col4]}> குறிப்பு </Text>
//           </View>

//           {(data.jewel_product || []).map((item, idx) => (
//             <View style={styles.row} key={idx}>
//               <Text style={[styles.td, styles.colWidths.col0]}> {idx + 1} </Text>
//               <Text style={[styles.td, styles.colWidths.col1]}> {item.JewelName} </Text>
//               <Text style={[styles.td, styles.colWidths.col2]}> {item.count} </Text>
//               <Text style={[styles.td, styles.colWidths.col3]}> {item.net} </Text>
//               <Text style={[styles.td, styles.colWidths.col4]}> {item.remark} </Text>
//             </View>
//           ))}

//           <Text style={styles.note}>
//             இந்த கடன் தொகை இன்றைய தேதியில் இருந்து {totdays} {" "} நாட்களுக்கு அல்லது நிறுவனம் கேட்டு {" "}
//             {" "}கொள்ளும் நாட்களுக்கு முன்பாக செலுத்தி விடுகிறேன் என உறுதி கூறுகிறேன்.
//           </Text>

//           <Text style={styles.signature}> கடன்தாரர் கையொப்பம் </Text>
//         </View>
//         {/* <View style={styles.borderBox}>
//           <Text style={styles.heading}> விதிமுறைகள் மற்றும் நிபந்தனைகள் </Text>

//           <Text style={styles.item}>1. குறைந்த பட்சமாக 15 நாட்களுக்கான வட்டி அல்லது ரூ.₹100 இதில் எது அதிகமோ அது வசூலிக்கப்படும். </Text>
//           <Text style={styles.item}>2. சட்ட விரோத காரியங்களுக்கு இந்த கடன் தொகை உபயோகப்படுத்தப்படமாட்டாது என்பதை கடன்தாரர் உறுதி செய்கிறார். {" "} </Text>
//           <Text style={styles.item}>3. முகவரி மாற்றத்தை எழுத்து மூலம் கொடுத்து ஒப்புகை பெற்றுக்கொள்ள வேண்டும். இல்லாத பட்சத்தில்  {" "} வாடிக்கையாளர்கள் {" "} விண்ணப்பபடிவத்தில் தெரிவித்துள்ள முகவரி மாத்திரமே அனைத்து காரியங்களுக்கும் பயன்படுத்தி கொள்ளப்படும். </Text>
//           <Text style={styles.item}>4. கடனில் பகுதி தொகை மட்டும் செலுத்தும் பட்சத்தில் முதலாவது வட்டி கழிக்கப்பட்டு எஞ்சிய தொகை மாத்திரமே {" "} அசலில் {" "} வரவு வைக்கப்படும். </Text>
//           <Text style={styles.item}>5. கடன் காலம் காலாவதியாவதற்குள் அல்லது நிறுவனம் சொன்ன தேதியிலே கடன் பெற்றவர் முழுத் தொகையும் {" "}  செலுத்த {" "} தவறினால் {" "} அடமானம் வைக்கப்ட்ட நகைகளை நிறுவனம் கடன்தாரர்க்கு 2 வார கால நோட்டீஸ் கொடுத்தபிறகு {" "} நிறுவனம் {" "} ஏலத்தில் விடும். நகை ஏலம் விட்டபின் பற்றாக்குறை இருக்குமாயின் கடன்தாரரிடமிருந்து {" "} வசூலிக்கப்டும்.{" "} </Text>
//           <Text style={styles.item}>6. தங்கநகை அதிகபட்ச விற்பனை தொகை நகைக்கடனுக்கு வரவேண்டிய அசல் வட்டி இதர தொகையை விட {" "} குறைவாக {" "} இருக்கும் பட்சத்தில் கடனுக்கு வழங்கப்பட்ட அவகாசத்திற்கு முன்னதாகவே நகைகளை ஏலத்தில் விட {" "} நிர்வாகத்திற்கு {" "} முழு அதிகாரம் உண்டு. இது சம்பந்தமாக கடன்தார்களுக்கு 10 நாட்களுக்குள் அசல் மற்றும் வட்டியினை {" "} செலுத்தும்படி {" "} அறிவுறுத்தும் கடிதம் பதிவு தபால் மூலம் அனுப்பி வைக்கப்படும். </Text>
//           <Text style={styles.item}>7. கடன்தாரர் தெரிவிக்கும் தங்கத்தின் தரத்தினைஅப்படியே ஏற்றுக் கொண்டு கடன் வழங்கப்படுகின்றது. பின்நாளில் மேற்படி நகை தரம் குறைந்தது அல்லது போலியானது என்று கண்டுபிடிக்கபட்டால் கடன்தாரர் மீது சிவில் மற்றும் கிரிமினல் {" "} வழக்கு {" "} தொடரப்பட்டு கடன் வசூலிக்கப்படும. இதற்காகும் செலவுகளுக்கெல்லாம் கடன்தாரர் பொறுப்பாவார். {" "} </Text>
//           <Text style={styles.item}>8. மேலே உள்ள அனைத்து விதி முறைகளையும் மற்றும் நிபந்தனைகளையும் நன்கு அறிந்து கொண்டேன். </Text>

//           <Text style={styles.signature}> கடன்தாரர் கையொப்பம் </Text>
//         </View> */}
//       </Page>

//     </Document>
//   );
// };

// export default LoanReceiptPDF;

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';
import logo from '../logo1.png';
import watermark from './images/back.jpg'; 

import tamilRegular from './fonts/NotoSansTamil-Regular.ttf';
import tamilBold from './fonts/NotoSansTamil-Bold.ttf';

Font.register({ family: 'NotoTamil', src: tamilRegular });
Font.register({ family: 'NotoTamil-Bold', src: tamilBold });

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 8,
    fontFamily: 'NotoTamil',
    backgroundColor: '#F9FAFB',
    position: 'relative',
  },
    watermark: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    width: 500,
    opacity: 0.06,
  },
  header: {
    alignItems: 'center',
    fontFamily :'NotoTamil-Bold'

  },
 headerLogo: {
        width: 100,
        height: 100,

    },
  title: {
    fontSize: 16,
    fontFamily: 'NotoTamil-Bold',
    color: '#dd2b1c',
  },
  subText: {
    fontSize: 8,
    color: 'black',
  },
  officeCopy: {
    fontSize: 10,
    fontFamily: 'NotoTamil-Bold',
    color: '#DC2626',
    textAlign: 'right',

  },
  section: {
    marginBottom: 15,
    //backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    border: '1px solid black',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  infoItem: {
    flexDirection: 'row',
    width: '35%',
    marginBottom: 6,
  },

  label: {
    fontFamily: 'NotoTamil-Bold',
    fontSize: 8,
    color: '#111827',
    minWidth: 40,
  },

  value: {
    fontSize: 8,
    color: '#1F2937',
    flexShrink: 1,
     fontFamily: 'NotoTamil-Bold',
  },


  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  imageBox: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    border: '1px solid #D1D5DB',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginLeft: 'auto',
    marginRight: 'auto',

  },

  boxedText: {
    // backgroundColor: '#FFFFFF',
    border: '1px solid black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    lineHeight: 1.4,
    fontSize: 8,
    color: '#1F2937',
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 3,
    //borderTop: '1px solid #E5E7EB',
  },
  signatureText: {
    fontSize: 8,
    fontFamily: 'NotoTamil-Bold',
    color: 'black',
    paddingRight: 12
  },
  loanParagraph: {
    fontSize: 8,
    fontFamily: 'NotoTamil',
    lineHeight: 1.5,
    textAlign: 'justify',
  }
  ,
  loan1Paragraph: {
    fontSize: 8,
    fontFamily: 'NotoTamil',
    lineHeight: 2,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontFamily: 'NotoTamil-Bold',

  },
  inlineText: {
    fontSize: 8,
    fontFamily: 'NotoTamil-Bold',
    color: '#111827',
  },
  column: {
    flexDirection: 'column',
  },
  subGrid: {
    flex: 1,
  },
  subColumn: {
    flex: 1,
    // paddingRight: 10,
  },
  centerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  underlineText: {
    borderBottom: '1px solid black',
    display: 'inline',
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
     fontFamily: 'NotoTamil-Bold',
  },
  fieldLabel: {
    width: '30%',
    fontWeight: 'bold',
  },
  fieldValue: {
    width: '70%',
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signatureBox: {
    border: '1px solid black',
    height: 40,
    width: 120,
    marginTop: -30
  },
  item: {
    marginBottom: 4,
    textAlign: "justify",
  },
  footer: {
    marginTop: 15,
    textAlign: "right",
    fontWeight: "bold",
  },
});

const LoanReceiptPDF = ({ data }) => {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const totdays = data.Jewelry_recovery_agreed_period * 30;
  let totalWeight = 0;
  let totalNet = 0;

  data.jewel_product.forEach(item => {
    totalWeight += parseFloat(item.weight) || 0;
    totalNet += parseFloat(item.net) || 0;
  });

  const jewelNames = data.jewel_product
    .map(item => `${item.JewelName.replace(/ /g, '\u00A0')} - ${item.count}`)
    .join(', ');


  const totalCount = data.jewel_product
    .reduce((sum, item) => sum + Number(item.count || 0), 0);



  function numberToWords(num) {
    if (!Number.isFinite(num)) return 'Zero Only';

    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
      'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
      'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
    ];
    const b = [
      '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
      'Sixty', 'Seventy', 'Eighty', 'Ninety',
    ];

    function inWords(n) {
      if ((n = n.toString()).length > 9) return 'Overflow';
      const nStr = ('000000000' + n).substr(-9).match(/(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})/);
      if (!nStr) return '';
      let str = '';
      str += (+nStr[1] ? a[+nStr[1]] + ' Crore ' : '');
      str += (+nStr[2] ? a[+nStr[2]] + ' Lakh ' : '');
      str += (+nStr[3] ?
        (+nStr[3] < 20 ? a[+nStr[3]] : b[nStr[3][0]] + a[nStr[3][1]]) + ' Thousand '
        : '');
      str += (+nStr[4] ? a[+nStr[4]] + ' Hundred ' : '');
      str += +nStr[5]
        ? (str !== '' ? 'and ' : '') +
        (nStr[5] < 20 ? a[+nStr[5]] : b[nStr[5][0]] + ' ' + a[nStr[5][1]])
        : '';
      return str.trim();
    }

    return inWords(num) + ' Only';
  }

  const loanAmount = parseFloat(data.original_amount) || 0;
  const loanAmountInWords = numberToWords(loanAmount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
            {/* <Image src={watermark} style={styles.watermark} /> */}
            <Image src={watermark} style={styles.watermark} fixed />
        <Text style={styles.officeCopy}>CUSTOMER COPY</Text>

        <View style={styles.header}>
          <Image src={logo} style={styles.headerLogo} />
          <Text style={styles.subText}> (அரசு அங்கீகாரம் பெற்ற நிறுவனம்) </Text>
          <Text style={[styles.subText]}>
            Licence No: TN-2020250508106
          </Text>
          <Text style={styles.subText}> No.12-E, P.S.R. Road, Sivakasi - 626123, Phone No : 04562-221465, 8489020465,8667059782 </Text>
        </View>



        <Text >{" "}</Text>
        <View style={styles.section}>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>தேதி : </Text>
              <Text style={styles.value}>{formatDate(data.pawnjewelry_date)} </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>கடன் எண் : </Text>
              <Text style={styles.value}>{data.receipt_no} </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}>கடன் காலம் : </Text>
              <Text style={styles.value}>{data.Jewelry_recovery_agreed_period} MONTHS </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.inlineText}>
                வாடிக்கையாளர் எண் :
              </Text>
              <Text style={styles.value}> {data.customer_no} </Text>
            </View>
            <View style={[styles.infoItem, { opacity: 0 }]}>

              <Text style={styles.label}> filler </Text>
              <Text style={styles.value}> filler </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.label}> கடன் தொகை : </Text>
              <Text style={styles.value}>  {Number(data.original_amount).toLocaleString('en-IN')}/- </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 2, alignItems: 'stretch' }}>

          {/* Content Box (80%) */}
          <View style={{ flex: 5, borderWidth: 1, borderColor: 'black', padding: 5, borderRadius: 4 }}>
            <Text style={{ fontFamily: 'NotoTamil-Bold', marginBottom: 2, padding: 0 }}>ஐயா,</Text>
            <Text style={styles.loanParagraph}>
              எனக்கு {""}சொந்தமான {totalNet} கிராம் தங்க நகையின் மீது  <Text style={{ fontFamily: 'NotoTamil-Bold' }}>
                {Number(data.original_amount).toLocaleString('en-IN')}
              </Text>
              /- ({loanAmountInWords}){" "}
              கடனாக வழங்கும்படி கேட்டுக்கொள்கிறேன். நகையில் கற்கல் பதிக்கபட்டு இருந்தால்
              அதற்க்கு மதிப்பு கிடையாது.{" "} .இந்த கடன் தொகையை இன்றைய தேதியில் இருந்து{" "}
              {totdays} {" "} நாட்களுக்குள் அல்லது நிறுவனம் கேட்டுக்கொள்ளும் நாட்களுக்கு{" "}
              முன்பாக செலுத்தி விடுகிறேன் என உறுதி கூறுகிறேன்.
            </Text>
          </View>

          {/* Stamp Placeholder Box (20%) */}
          <View style={{ flex: 0.5, borderRadius: 4, borderWidth: 1, borderColor: 'black', marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, textAlign: 'center' }}>Stamp</Text>
          </View>

        </View>

        <View>
          <Text >{" "}</Text>
          <Text style={styles.sectionTitle}>வாடிக்கையாளர் விபரம் :</Text>

          <View style={[styles.boxedText, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            {/* Column 1: Text Details */}
            <View style={[{ flex: 6, marginRight: 10,fontFamily: 'NotoTamil-Bold' }]}>
              <Text>
                பெயர்                              : {data.name ?? 'N/A'}{"\n"}
                முகவரி                           : {data.customer_details ?? 'N/A'}, {data.place ?? 'N/A'}{"\n"}
                பிறந்த தேதி                : {data.dateofbirth}{"\n"}
                தொலைபேசி எண்  : {data.mobile_number ?? 'N/A'}
              </Text>
            </View>

            {/* Column 2: Image */}
            {/* {data.proof?.[1] && (
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image src={data.proof[1]} style={styles.imageBox} />
              </View>
            )} */}
          </View>
        </View>
        <Text style={{ fontFamily: 'NotoTamil-Bold', marginBottom: 2 }}>
          நகை பற்றிய விபரம் :
        </Text>
        <View style={{
          marginTop: 2, borderWidth: 1,
          borderColor: 'black',
        }}>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              padding: 3,
            }}
          >
            {/* Left Column: Jewel Names */}
            <View style={{ flex: 1, paddingRight: 5 }}>
              <Text
                style={{
                  fontFamily: 'NotoTamil-Bold',
                  marginBottom: 2,
                  lineHeight: 1.5,
                }}
              >
                {jewelNames}
              </Text>
            </View>

            {/* Right Column: Total Count */}
            <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text
                style={{
                  fontFamily: 'NotoTamil-Bold',
                  marginBottom: 2,
                  lineHeight: 1.5,
                }}
              >
                TOTAL: {totalCount}
              </Text>
            </View>




          </View>
          <Text>
            மொத்த எடை : {totalWeight}  நிகர எடை : {totalNet}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
          {/* Column 1: Text */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 8, fontFamily: 'NotoTamil' }}>
              குறிப்பிட்ட தவணை காலத்திற்குள்ளாக கட்டப்படும் வட்டி விகிதம்
            </Text>
          </View>

          {/* Column 2: Image in Sized Box */}
          <View style={{
            width: 150,
            height: 40,
            border: '1px solid black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}>

          </View>
        </View>


        <Text> அலுவலக உபயோகத்திற்காக </Text>

        <Text>{"  "}</Text>
        <Text>மேற்சொன்ன நகைகள் எங்களால் மதிப்பீடு செய்யப்பட்டு கடன்தொகை ரூ.  <Text style={{ fontFamily: 'NotoTamil-Bold' }}>
          {Number(data.original_amount).toLocaleString('en-IN')}
        </Text>
          /-திரு {data.name ?? 'N/A'}  அவர்களுக்கு வழங்கப்பட்டது வாடிக்கையாளர் நேரடியாக வந்து தங்களது அடையாள மற்றும் விலாசத்திற்கான சான்றுகளை கொடுத்ததை நாங்கள் ஊர்ஜிதம் செய்துள்ளோம் {" "} என்று உறுதிபட {" "}கூறுகின்றோம்.  </Text>

        <View style={[styles.signatureRow, { marginTop: 4 }]}>
          {/* Row 1: Titles */}
          <View style={{ flex: 1 }}>
            <Text style={styles.signatureText}>Appraiser :</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.signatureText}>Office In-charge :</Text>
          </View>
        </View>

        <View style={[styles.signatureRow, { marginTop: 3 }]}>
          {/* Row 2: Signature placeholders */}
          <View style={{ flex: 1 }}>
            <Text style={styles.signatureText}>Signature :</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.signatureText}>Signature :</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            border: '1px solid black',
            marginTop: 10,
            width: '100%',
          }}
        >
          {/* Left cell: Text */}
          <View style={{ flex: 2, borderRight: '1px solid black', padding: 3 }}>
            <Text style={{ fontSize: 8, fontFamily: 'NotoTamil' }}>
              அனைத்து நகைகளையும் சரியாக திரும்ப பெற்றுக் கொண்டேன் {" "}
              {""}
            </Text>
            <Text style={{ fontSize: 8, fontFamily: 'NotoTamil' }}>
              தேதி
            </Text>
          </View>

          {/* Middle cell: Signature */}
          {/* <View style={{ flex: 1, borderRight: '1px solid black', padding: 5, justifyContent: 'center' }}>
    <Text style={{ fontSize: 8, fontFamily: 'NotoTamil' }}>கையொப்பம்</Text>
  </View> */}

          {/* Right cell: Date */}
          <View style={{ flex: 1, padding: 0, justifyContent: 'center' }}>
            <Text style={{ fontSize: 8, fontFamily: 'NotoTamil' }}></Text>
          </View>
        </View>
        <Text style={styles.centerText}>வாரிசு நியமனம்</Text>

        <Text style={{ marginTop: 3 }}>
          __________________________________ ஆகிய நான் மேற்கண்ட எனது நகைக்கு கீழே குறிப்பிட்ட நபரை வாரிசாக நியமனம் செய்கின்றேன். நான் மரணம் அடையும் பட்சத்தில் மேற்படி நகைகளை இறப்பு சான்றிதழ் கடன் அசல் மற்றும் வட்டியை பெற்றுக்கொண்டு கீழ்க்கண்ட நபரிடம் ஒப்படைக்க வேண்டுகிறேன். வாரிசுதாரர் பெயர் மற்றும் விலாசம்_________________________________________________ (வாரிசுதாரர் மைனராக இருக்க கூடாது) கடன்தாரருக்கு உறவுமுறை ஏதேனும் Select ______________________ வாரிசுதாரரின் வயது ________
        </Text>

        <Text style={{ marginTop: 3 }}>
          இந்த வாரிசு நியமனத்தை வேறு எந்தவகையான நியமனமோ, உயிலோ அல்லது மரண சாசனமோ கட்டுபடுத்த இயலாது. {" "} மேற்குறிப்பிட்ட வாரிசுதாரர் நிர்வாகத்திற்கு சேரவேண்டிய நிலுவை அசல் மற்றும் வட்டியை செலுத்தி நகையை பெற்றுக்கொள்ளவேண்டியது. அவ்வாறு நகையை திருப்பி கொடுக்கும் பட்சத்தில் நிர்வாகத்தின் நடவடிக்கை சரியானதாகும் என உறுதியளிக்கிறேன்.
        </Text>

        {/* Borrower Info */}
        <View style={styles.row}>
          <Text style={styles.fieldLabel}>கடன்தாரர் பெயர்</Text>
          <Text style={styles.fieldValue}>: {data.name ?? 'N/A'}{"\n"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.fieldLabel}>தேதி</Text>
          <Text style={styles.fieldValue}>: {formatDate(data.pawnjewelry_date)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginTop: 2, fontSize: 8 }}>
            (To be signed and returned at the time of closure of the loan)
          </Text>
          <View style={styles.signatureBox}></View>
        </View>



      </Page>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text>{"  "}</Text>
        <Text>{"  "}</Text>
        <Text>{"  "}</Text>
        <Text>{"  "}</Text>
        <Text>{"  "}</Text>
        <Text>{"  "}</Text>
        <Text>{"  "}</Text>
        <Text style={styles.centerText}>விதிமுறைகள் மற்றும் நிபந்தனைகள்</Text>
        <Text>{"  "}</Text>


        {/* Bullet Points */}
        <View>
          <Text style={styles.item}>
            1. கடன் 30 நாட்களுக்குள் முன்பு மூடப்பட்டது என்றால்; குறைந்தபட்ச காலம் 15 நாட்களுக்கான வட்டி வசூலிக்கப்படும். {" "}
          </Text>
          <Text style={styles.item}>
            2. பிராமிசரி நோட்டில் குறிக்கப்பட்ட வட்டி விகிதத்தையும் அவ்வப்போது நிர்வாகம் நிர்ணயிக்கின்ற மற்ற கட்டணத்தையும் {" "} கடன்தாரர் செலுத்தவேண்டும். {" "}
          </Text>
          <Text style={styles.item}>
            3. தவறும் பட்சத்தில் கடனுக்கு அடமானமாக கொடுத்த பொருளை இந்த கடனுக்கோ அல்லது கடன்தாரரிடமிருந்து {" "} நிர்வாகத்திற்கு சேரவேண்டிய மற்ற தொகைக்காகவோ தக்கவைத்துக்கொள்ள நிர்வாகத்திற்கு உரிமையுண்டு. {" "}
          </Text>
          <Text style={styles.item}>
            4.	நிர்வாகத்திற்கு சாதகமாக கடன் பெறுபவர் எழுதிக்கொடுத்த ஒப்பந்தம் மற்றும் பிற ஆவணங்களையும் எப்போது வேண்டுமானாலும், {" "} ஏனைய வங்கி மற்றும் நிதி நிறுவனங்களுக்கு மாற்றம் செய்து பணம் பெற்றுக்கொள்ள நிர்வாகத்திற்கு உரிமையுண்டு. {" "}
          </Text>
          <Text style={styles.item}>
            5.	அடமானம் பெற்ற நகைகளை நிர்வாக அலுவலர்களோ தணிக்கை அதிகாரிகளோ தரத்தை சோதித்து பார்ப்பதற்கு {" "} முழு அதிகாரம் உண்டு. {" "}
          </Text>
          <Text style={styles.item}>
            6.	நகைக்கடன் பெறுவது, வட்டி செலுத்துவது, திருப்புவது ஆகிய காரியங்களை அலுவலக வேலை நேரத்தில் மாத்திரமே செய்து {" "} கொள்ள முடியும். எந்தவொரு தவணை தேதியும் விடுமுறை நாளன்று வருமானால் விடுமுறைக்கு முந்திய வேலை நாள் தவணை {" "} தேதியாக எடுத்துக் கொள்ளப்படும். {" "}
          </Text>
          <Text style={styles.item}>
            7.	கடன் மற்றும் வட்டியை கடன்தாரரோ அல்லது அவரால் அதிகாரம் பெற்றவர்களோ திருப்பி செலுத்த முடியும். கடன்தாரரோ {" "} அல்லது அவரால் எழுத்துமூலம் அதிகாரம் பெற்றவரோ அசல் மற்றும் வட்டியை திருப்பி செலுத்தி அடகு சீட்டையும் கொடுக்கும் பட்சத்தில் {" "} நகையினை திருப்பிக்கொள்ளலாம். கடன்தாரர் வாரிசுதாரர்களை நியமிக்காதபடி இருந்தால் மேற்படி நகைகளை சட்டப்படியான {" "} உரிய தொகையை பெற்றபிற்பாடு ஒப்படைக்கப்படும். {" "}
          </Text>
          <Text style={styles.item}>
            8.	சட்ட விரோத காரியங்களுக்கு இந்த கடன் உபயோகப்படுத்தப்படமாட்டது என்பதை கடன்தாரர் உறுதி செய்கிறார். {" "}
          </Text>
          <Text style={styles.item}>
            9.	கடனில் பகுதி தொகை மட்டும் செலுத்தும்பட்சத்தில் முதலாவது வட்டி கழிக்கப்பட்டு எஞ்சிய தொகை மாத்திரமே {" "} அசலில் வரவு வைக்கப்படும். {" "}
          </Text>
          <Text style={styles.item}>
            10.	முகவரி மாற்றத்தை நிர்வாகத்திற்கு எழுத்து மூலம் {" "} கொடுத்து ஒப்புதல் {" "} பெற்றுக்கொள்ள வேண்டும். {" "} அல்லாத பட்சத்தில் வாடிக்கையாளர்கள் விண்ணப்படிவத்தில் தெரிவித்துள்ள முகவரி மாத்திரமே அனைத்து விதமான காரியங்களுக்கும் பயன்படுத்திகொள்ளப்படும். தவறும் பட்சத்தில் நிர்வாகம் பொறுப்பேற்காது. {" "}
          </Text>
          <Text style={styles.item}>
            11.	அடமானம் வைக்கப்பட்ட நகை, கடன்தாரர்க்கு சொந்தமானதாகும். மற்றவர்கள் யாரும் அதன்மீது உரிமை கொண்டாட இயலாது. {" "} இதை அடமானம் செலவு மற்றும் பின்விளைவுகளிலிருந்து பாதுகாக்க வேண்டும். {" "}
          </Text>
          <Text style={styles.item}>
            12.	பிராமிசரி நோட்டீஸ் குறிக்கப்பட்ட கடன் காலம் காலாவதியாவதற்குள் அல்லது நிர்வாக சொன்ன தேதியிலோ கடன் {" "} பெற்றவர் {" "} முழுத்தொகையும் செலுத்த தவறினால் அடமானம் வைக்கப்பட்ட நகைகளை நிர்வாகம், 2 வாரகால நோட்டீஸ் கொடுத்த பிறகு {" "} நிர்வாகம் விற்கும். நகை விற்றப்பின் பற்றாக்குறையாய் இருக்குமாயின் கடன்தாரரிடமிருந்து வசூலிக்கப்படும். உபரியாக இருக்கும் {" "} பட்சத்தில் நிர்வாகத்திற்கு சேரவேண்டிய நகைக்கடன் தொகைகளை நிர்வாகம் எடுத்துக்கொள்ளும். ஏதேணும் உபரிதொகை {" "} இருப்பின் 30 நாட்களுக்குள் {" "} வழங்கப்படும்.  {" "}
          </Text>
          <Text style={styles.item}>
            13.	தங்க நகைகள் கொடுப்பது, வட்டியுடன் வசூல்செய்வது, பிணையமாக வைக்கப்பட்டுள்ளவைகளை, விற்று பணமாக்குவது, இவற்றுக்கான செலவுகள், அரசாங்கத்திற்கு செலுத்த வேண்டிய வரி மற்றும் இதர செலவீனங்கள், நிர்வாகம் செலவு, வட்டி வரி, சேவை வரி, பத்திர செலவு, விற்பனை வரி, மதிப்புக்கூட்டும் வரி முதியவற்றை கடன்தாரர் ஏற்றுக்கொள்ள வேண்டும். அல்லது {" "} அவற்றை நிர்வாகத்திற்கு செலுத்த வேண்டும். {" "}
          </Text>
          <Text style={styles.item}>
            14.	எதிர்பாராத சூழ்நிலை காரணமாக அடமானம் வைக்கப்பட்ட நகைகளுக்கு சேதாரம் ஏற்பட்டால் அடமான ரசீதில் குறிப்பிடப்பட்ட எடைக்கு சமமான நகையை நிர்வாகம் கொடுக்கும் அல்லது அந்த எடைக்கு சமமான {" "} மார்க்கெட் நிலவர மதிப்பின் படி {" "} தொகையை கொடுக்கும். இப்படி இழப்பீட்டுத் தொகைபெறும்முன் நிர்வாகத்திற்கு {" "} சேரவேண்டிய அசல், வட்டி மற்றும் இதர செலவுகளை நேர்செய்ய வேண்டியது கட்டாயமாகும். {" "}
          </Text>
          <Text style={styles.item}>
            15.	கடன்தாரர் தெரிவிக்கும் தங்கத்தின் தரத்திணை அப்படியே ஏற்றுக்கொண்டு கடன் வழங்கப்படுகின்றது. பின்நாளில் மேற்படி நகை தரம் குறைந்தது அல்லது போலியானது என்று கண்டுபிடிக்கப்பட்டால் கடன்தாரர் மீது கிரிமினல் வழக்கு தொடரப்படும் கடன் {" "} வசூலிக்கப்படும். இதற்காகும் செலவுகளுக்கெல்லாம் கடன்தாரே பொறுப்பாவார். {" "}
          </Text>
          <Text style={styles.item}>
            16.	நிர்வாகம் கொடுத்த அடமான இரசீது தொலைந்துவிட்டாலோ அல்லது காணாமல் போனாலோ நகையை அடமானம் வைத்தவர்  உரிய மதிப்பிற்குரிய பத்திரத் தாளில் ஒப்பந்தம் எழுதிக்கொடுத்து நகையை {" "} மீட்டுக்கொள்ளலாம். {" "}
          </Text>
          <Text style={styles.item}>
            17.	நான் அடமானமாக வைக்க தங்கள் நிறுவனத்திற்கு கொண்டு வந்து இருக்கும் நகைகள் அனைத்தும் என்னுடைய {" "} சொந்த {" "} நகைகள் தான்  என்பதை உறுதியுடன் தெரிவித்துக் கொள்கிறேன். {" "}
          </Text>
          <Text style={styles.item}>
            18.	வாடிக்கையாளர்கள் தாங்கள் அடகு வைக்கும் நகைகளை வங்கி வேலை நாட்களில்  மீட்டுக் கொள்ள வேண்டும். காலை 10:30 மணி முதல் மாலை 02.30 மணிக்குள் நகைகள் திருப்பிக் கொள்ளலாம்.	{" "}
          </Text>
          <Text style={styles.item}>
            19.	நகைக்கடன் சம்பந்தமாக அதன் விதிமுறைகளைக் கூட்டவோ, மாற்றவோ, நீக்கவோ நிறுவனத்திற்கு முழு உரிமையுண்டு. {" "}
          </Text>
          <Text style={styles.item}>
            20.	பிரதி வாரம் (2) இரண்டாவது மற்றும் (4)நான்காவது சனிக்கிழமைகளில் பொருள் திருப்ப இயலாது. {" "}
          </Text>

        </View>

        {/* Footer */}
        <Text style={styles.footer}> கடன்தாரர் கையொப்பம் </Text>
      </Page>
  <Page size="A4" style={styles.page}>
  {/* Header Section */}
  <View style={styles.header}>

    <Text style={[styles.title, { fontSize: 20 }]}>நிதி கோல்டு பைனான்{""}ஸ்</Text>
    <Text style={styles.subText}> H/O:182, இரண்டாவது மாடி, AKS தியேட்டர் ரோடு, கோவில்பட்{""}டி </Text>
    <View style={{ borderBottom: '1px solid black', width: '100%', marginTop: 5, marginBottom: 5 }} />
    <Text style={[styles.centerText, { textDecoration: 'underline' }]}>உறுதிமொழி {""} படிவம்</Text>
  </View>

  {/* Details and Photo Row */}
  <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
    
    {/* Left Column: Pledge Details */}
    <View style={{ width: '70%' }}>
      <Text style={[styles.label, { marginBottom: 5 }]}>அடகு விபரம் :</Text>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.item}>அடகு எண் - {data.receipt_no}</Text>
        <Text style={styles.item}>எடை - {totalNet} கிராம்</Text>
        <Text style={styles.item}>பொருளின் விவரம் - {jewelNames}</Text>
        <Text style={styles.item}>அடகு தேதி - {formatDate(data.pawnjewelry_date)}</Text>
        <Text style={styles.item}>கடன் தொகை - {Number(data.original_amount).toLocaleString('en-IN')}/-</Text>
      </View>
    </View>

    {/* Right Column: Photo Placeholder */}
    <View style={{ width: '25%', alignItems: 'center' }}>
      <View style={{ width: 80, height: 100, border: '1px solid black', backgroundColor: '#f0f0f0', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 8 }}>PHOTO</Text>
      </View>
    </View>
  </View>

  <Text style={[styles.label, { marginTop: 15, marginBottom: 10 }]}>ஐயா / அம்மா,</Text>

  {/* Declaration Paragraph */}
  <View style={{ lineHeight: 1.8 }}>
    <Text style={styles.loan1Paragraph}>
      நான் <Text style={styles.sectionTitle}>{data.name}</Text> s/o முத்துராஜ், {data.customer_details}, {data.place} என்ற முகவரியில் வசித்து வருகிறேன். மேலும் என்னுடைய சொந்த தேவைக்காக இன்று {formatDate(data.pawnjewelry_date)} தங்களது பைனான்ஸ்-ல் என்னுடைய சொந்த நகையை மட்டுமே அடமானம் வைக்கின்றேன் என்பதை தெரிவித்து {""}கொள்கிறேன்.
    </Text>
    
    <Text style={[styles.loan1Paragraph, { marginTop: 8 }]}>
      இந்த நகை எனக்கு மட்டுமே உரிமையானது. என் குடும்பத்தினற்க்கோ அல்லது என்னை சார்ந்தவர்களுக்கோ நான் இல்லாமல் {""}நகையை திருப்பவோ அல்லது மாற்றி வைக்கவோ இயலாது என்பதை நான் {""}அறிவேன்.
    </Text>

    <Text style={[styles.loan1Paragraph, { marginTop: 8 }]}>
      நான் திருப்பும் தேதி 16-01-2026 வரும் வரை நகையினை திரும்ப பெற இயலாது என்பதை நான் அறிந்து அதற்கு முழு மனதுடன் சம்மதித்து அடகு வைக்கிறேன். நகை திருப்பும் தவணை தேதி முடிந்த பிறகும் வட்டி செலுத்தவில்லை என்றால் 1 மாதத்திற்கு ஒருமுறை 1% வட்டி விகிதம் மாறுபடும் என்பதையும் மற்றும் நகையை திருப்புவதாக இருந்தால் இரண்டு நாட்களுக்கு முன்னர் நகையின் வட்டியை செலுத்திவிட்டு பின்னர் நகையின் அசலை செலுத்தி திருப்ப இயலும் என்பதையும் நான் அறிவேன்.
    </Text>

    <Text style={[styles.loan1Paragraph, { marginTop: 8 }]}>
      இதில் கண்ட அனைத்தையும் நான் தெரிந்து கொண்டும் புரிந்து கொண்டும் இதற்கு முழு மனதுடன் சம்மதிக்கிறேன் என்பதை {""} இதன் மூலம் தெரிவித்துக்கொள்கிறேன்.
    </Text>
  </View>

  <Text style={{ textAlign: 'right', marginTop: 10, fontSize: 10 }}>நன்றி,</Text>

  {/* Footer Row */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }}>
    <View>
      <Text style={styles.value}>நாள் : {formatDate(data.pawnjewelry_date)}</Text>
      <Text style={styles.value}>இடம் : {data.place ?? '-'}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.signatureText}>இப்படிக்கு,</Text>
    </View>
  </View>
</Page>
       
        </Document>
   )}


export default LoanReceiptPDF;
