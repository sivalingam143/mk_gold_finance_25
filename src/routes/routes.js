// src/routesConfig.js
/////////////////////// creations///////////////////////////////////
import CompanyCreation from "../pages/company/CompanyCreation";
import JewelPawningCreation from "../pages/jewelpawn/JewelPawningCreation";
import UserCreation from "../pages/users/UserCreation";
import JewelRecoveryCreation from "../pages/recovery/JewelRecoveryCreation";
import JewelRecoveryGCreation from "../pages/jewelpawng/JewelPawnGCreation";
import JewelEstimateCreation from "../pages/estimate/JewelEstimateCreation";
import GroupCreation from "../pages/group/GroupCreation";
import InterestCreation from "../pages/interst/InterestCreation";
import CustomerCreations from "../pages/customer/CustomerCreations";
import SaleCreations from "../pages/sale/SaleCreations";
import PawnJewelryUpload from "../pages/jewelpawn/PawnJewelryUpload";
///////////////////// Pdf preview /////////////////////////////
import JewelPawnPreview from "../pdf/JewelPawnPreview";

import JewelPawngPreview from "../pdf/JewelPawngPreview";
import JewelPawnRecoverPreview from "../pdf/jewelPawnRecoverPreview";
import JewelInterestPreview from "../pdf/jewelInterestPreview";
/////////////////////////// reports///////////////////////////////////
import OldRecord from "../pages/oldrecord/OldRecord";
import PawnGReport from "../pages/jewelpawng/PawnGReport";
import OverallReport from "../pages/OverallReport";
import BalanceSheet from "../pages/jewelpawn/balancesheetreport";
import RecoveryReport from "../pages/recovery/RecoveryReport";
import InterstReport from "../pages/interst/InterstReport";

/////////////////////////////// list ///////////////////////////////
import DashBoard from "../pages/DashBoard";
import User from "../pages/users/User";
import Company from "../pages/company/Company";
import Group from "../pages/group/Group";
import JewelPawning from "../pages/jewelpawn/JewelPawning";
import JewelRecovery from "../pages/recovery/JewelRecovery";
import JewelRecoveryG from "../pages/jewelpawng/JewelRecoveryG";
import JewelPawnG from "../pages/jewelpawng/JewelPawnG";
import JewelEstimate from "../pages/estimate/JewelEstimate";
import Interest from "../pages/interst/Interest";
import Customer from "../pages/customer/Customer";
import Sale from "../pages/sale/sale";
import OldData from "../pages/oldrecord/OldData";
import CustomerDetails from "../pages/customer/CustomerDetails";
import SaleDetails from "../pages/sale/SaleDetails";
import Products from "../pages/products/Products";
import ProductsCreation from "../pages/products/ProductsCreation";
import Street from "../pages/street/Street";
import StreetCreation from "../pages/street/StreetCreation";
import ExpenseEntry from "../pages/expense/expense";
import ExpenseCreation from "../pages/expense/expenseCreation";
import AdvanceReport from "../pages/advance_report";
import JewelPawnofficePreview from "../pdf/jewelpawnofficepreview"
import BankPledgeReport from "../pages/bledge_report";
import SaleReport from "../pages/sale_report";
import { SalePDFView } from "../pages/sale/salepdf";

const routes = [
  { path: "/console/dashboard", element: <DashBoard /> },
  { path: "/console/user", element: <User /> },
  { path: "/console/user/create", element: <UserCreation /> },
  { path: "/console/olddata", element: <OldData /> },
  { path: "/console/company", element: <Company /> },
  { path: "/console/company/create", element: <CompanyCreation /> },
  { path: "/console/pawn/jewelpawning", element: <JewelPawning /> },
  {
    path: "/console/pawn/jewelpawning/create",
    element: <JewelPawningCreation />,
  },
  {
    path: "/console/pawn/jewelpawning/create/excel",
    element: <PawnJewelryUpload />,
  },

  { path: "/console/pawn/jewelpawng", element: <JewelPawnG /> },
  {
    path: "/console/pawn/jewelpawng/create",
    element: <JewelPawningCreation />,
  },
  { path: "/console/interest", element: <Interest /> },
  { path: "/console/interest/create", element: <InterestCreation /> },
  { path: "/console/master/jewelrecovery", element: <JewelRecovery /> },
  {
    path: "/console/master/jewelrecovery/create",
    element: <JewelRecoveryCreation />,
  },
  { path: "/console/master/jewelrecoveryg", element: <JewelRecoveryG /> },
  {
    path: "/console/master/jewelrecoveryg/create",
    element: <JewelRecoveryGCreation />,
  },
  { path: "/console/master/jewelestimate", element: <JewelEstimate /> },
  {
    path: "/console/master/jewelestimate/create",
    element: <JewelEstimateCreation />,
  },
  { path: "/console/master/group", element: <Group /> },
  { path: "/console/master/group/create", element: <GroupCreation /> },
  { path: "/console/master/customer", element: <Customer /> },
  { path: "/console/master/customerdetails", element: <CustomerDetails /> },
    { path: "/console/master/sale", element: <Sale /> },
  { path: "/console/master/saledetails", element: <SaleDetails /> },
  { path: "/console/report/overall", element: <OverallReport /> },
  { path: "/console/report/balancesheet", element: <BalanceSheet /> },
  { path: "/console/report/pawng", element: <PawnGReport /> },
  { path: "/console/report/recovery", element: <RecoveryReport /> },
  { path: "/console/report/interst", element: <InterstReport /> },
  { path: "/console/report/oldrecord", element: <OldRecord /> },
  { path: "/console/jewelpawn", element: <JewelPawnPreview /> },
  { path: "/console/jewelpawnoffice", element: <JewelPawnofficePreview /> },
  {path : "/console/jewelpawnrevery", element:<JewelPawnRecoverPreview/>},
  { path: "/console/jewelpawng", element: <JewelPawngPreview /> },
  { path: "/console/interest/preview", element: <JewelInterestPreview/> },
  {path: "/console/transaction" ,element:<ExpenseEntry/>},
  {path: "/console/transaction/create" ,element:<ExpenseCreation/>},
  { path: "/console/master/customer/create", element: <CustomerCreations /> },
    { path: "/console/master/sale/create", element: <SaleCreations /> },
  { path: "/console/master/products", element: <Products /> },
  { path: "/console/master/products/create", element: <ProductsCreation /> },
  { path: "/console/master/street", element: <Street /> },
  { path: "/console/master/street/create", element: <StreetCreation /> },
  {path: "/console/advancereport/pawn", element:<AdvanceReport/>},
   {path: "/console/report/bledge", element:<BankPledgeReport/>},
  {path: "/console/report/sale",element:<SaleReport/>},
  { path: "/console/salecustomer", element: <SalePDFView copyType="customer" /> },
  { path: "/console/saleoffice", element: <SalePDFView copyType="office" /> },
];

export default routes;
