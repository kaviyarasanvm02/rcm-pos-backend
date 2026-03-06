var d=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ia=d((zN,Sa)=>{var cy=require("../node_modules/cors/lib/index.js"),dy=()=>{let e=[process.env.REACT_APP_URL];console.log("whitelist: "+JSON.stringify(e));let t={credentials:!0,allowedHeaders:["Content-Type","Authorization"],origin:(o,r)=>{process.env.NODE_ENV==="development"||e.indexOf(o)!==-1||!o?r(null,!0):r(new Error("Not allowed by CORS"))}};return console.log("corsOptions: ",t),cy(t)};Sa.exports=dy});var T=d((jN,Ea)=>{var uy="YYYY-MM-DD",py=["January","February","March","April","May","June","July","August","September","October","November","December"],my="FJD",yy="\\\\172.18.20.16\\rcmsapshared\\",M={USER:"User",USER_GROUP:"User Group",APPROVAL:"Approval",INVOICE:"Invoice",INCOMING_PAYMENT:"Incoming Payment",JOURNAL_ENTRY:"Journal Entry",CREDIT_MEMO:"Credit Memo",CREDIT_MEMO_REQUEST:"Credit Memo",STORE_SETUP:"Store Setup",STORE_WAREHOUSE:"Store Warehouse",STORE_COUNTER:"Store Counter",STORE_USER:"Store User",SALES_QUOTATION:"Sales Quotation",BUSINESS_PARTNER:"Business Partners",INVOICE:"Invoice",STOCK_TRANSFER_REQUEST:"Stock Transfer Request",STOCK_TRANSFER:"Stock Transfer",INVENTORY_COUNTING:"Inventory Counting",APPROVAL_STATUS_REPORT:"Approval Status Report",SALES_ORDER:"Sales Order",DELIVERY:"Delivery",ITEM:"Item",OSBS:"OSBS",ATTACHMENTS:"Attachments2"},gy={[M.INVOICE]:13,[M.CREDIT_MEMO_REQUEST]:234000031,[M.INCOMING_PAYMENT]:24,[M.SALES_ORDER]:17,[M.SALES_QUOTATION]:23,[M.STOCK_TRANSFER_REQUEST]:1250000001},Ty={[M.BUSINESS_PARTNER]:"BusinessPartners",[M.INVOICE]:"Invoices",[M.INCOMING_PAYMENT]:"IncomingPayments",[M.JOURNAL_ENTRY]:"JournalEntries",[M.SALES_QUOTATION]:"Quotations",[M.INVENTORY_COUNTING]:"InventoryCountings",[M.CREDIT_MEMO_REQUEST]:"ReturnRequest",[M.DELIVERY]:"DeliveryNotes",[M.ITEM]:"Items"},hy={STOCK_TRANSFER_REQUEST:1250000001,STOCK_TRANSFER:67,[M.DELIVERY]:15},Cy={INCOMING_PAYMENT:"INCOMING_PAYMENT",OUTGOING_PAYMENT:"OUTGOING_PAYMENT",COUNTER_TO_COUNTER:"COUNTER_TO_COUNTER",OPENING_BALANCE:"OPENING_BALANCE",CLOSING_BALANCE:"CLOSING_BALANCE"},fy=[],Sy={READ:"U_AllowRead",WRITE:"U_AllowWrite",CREATE:"U_AllowCreate",CANCEL:"U_AllowCancel"},Iy={ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER",TEMPLATE:"TEMPLATE",ADMIN:"ADMIN"},Dy={PENDING:"PENDING",APPROVED:"APPROVED",GENERATED:"GENERATED",REJECTED:"REJECTED",FAILED:"FAILED",NOT_REQUIRED:"NOT_REQUIRED",NOT_ASSIGNED:"NOT_ASSIGNED",AUTO_APPROVED:"AUTO_APPROVED"},Ey={ACTIVE:"ACTIVE",INACTIVE:"INACTIVE"},Ny={DIRECT:"direct",DRAFT:"draft"},Ay={BATCHES:"Batches",SERIAL_NUMBERS:"Serial Numbers",NORMAL:"Normal",LABOR:"Labor"},Ry={ITEM_WITHOUT_QRCODE:"ITEM_WITHOUT_QRCODE",BATCH_SERIAL_WITH_ALL_BINS:"BATCH_SERIAL_WITH_ALL_BINS",BATCH_SERIAL_IN_A_BIN:"BATCH_SERIAL_IN_A_BIN"},Da={REDIS:"REDIS",FILE:"FILE"},by=17,Oy=Da.FILE,Uy="ONE",xy="kiafn239df#@asdf$%^13423#$%@sdfgdf",wy={OK:200,CREATED:201,ACCEPTED:202,NO_CONTENT:204,BAD_REQUEST:400,UNAUTHORIZED:401,FORBIDDEN:403,NOT_FOUND:404,INTERNAL_SERVER_ERROR:500,BAD_GATEWAY:502,SERVICE_UNAVAILABLE:503};Ea.exports={enableLocationBasedCreditCardAccount:!0,dateFormat:uy,months:py,saltRounds:10,systemCurrency:my,defaultBranchId:1,portalModules:M,serviceLayerApiURIs:Ty,trxTypes:Cy,draftObjectCodes:hy,permissions:Sy,userRoles:Iy,draftStatus:Dy,recordState:Ey,recordTypes:Ny,itemTypes:Ay,requestTypes:Ry,sessionStoreTypes:Da,sessionStore:Oy,cookieName:Uy,sessionSecret:xy,sessionMaxAgeInHours:by,httpStatusCodes:wy,fircaIntegrationWaitTime:1e4,enableFircaIntegration:!0,enableStoreBasedNumbering:!0,isHomeDeliveryEnabled:!0,objectCodes:gy,attachmentPath:yy,EXCLUDED_ITEM_GROUPS:fy}});var Aa=d((VN,Na)=>{var Ly=require("../node_modules/redis/dist/index.js"),Pt=Ly.createClient({host:"localhost",port:6379});Pt.on("connect",function(e){console.log("Connected to redis successfully")});Pt.on("error",e=>{console.error("Redis connection error:",e)});var vy=(e,t)=>{Pt.set(e,t,o=>{o?console.error("Error setting value in Redis:",o):console.log("Value set in Redis:",e,t)})},_y=(e,t)=>{Pt.get(e,(o,r)=>{o?(console.error("Error getting value from Redis:",o),t(o,null)):(console.log("Value retrieved from Redis:",e,r),t(null,r))})};Na.exports={redisClient:Pt,setValue:vy,getValue:_y}});var xa=d((GN,Ua)=>{var es=require("../node_modules/express-session/index.js"),Py=require("../node_modules/connect-redis/dist/cjs/index.js"),By=require("../node_modules/session-file-store/index.js"),{sessionStoreTypes:Ra,sessionStore:ba,cookieName:My,sessionSecret:Fy,sessionMaxAgeInHours:Oa}=T(),{redisClient:Wy}=Aa(),ts="";if(ba===Ra.REDIS){let e=Py(es);ts=new e({client:Wy})}else if(ba===Ra.FILE){let e=By(es);ts=new e({ttl:60*60*parseInt(Oa)})}var $y=es({store:ts,name:My,secret:Fy,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{secure:!0,sameSite:"none",httpOnly:!0,maxAge:1e3*60*60*parseInt(Oa)}});Ua.exports=$y});var f=d((KN,wa)=>{var{draftObjectCodes:QN,draftStatus:os,recordState:YN}=T(),ky=30,m={CompanyDB:process.env.SERVICE_LAYER_COMPANYDB,UserName:process.env.SERVICE_LAYER_USERNAME,Password:process.env.SERVICE_LAYER_PASSWORD},qy={host:process.env.HANA_HOST,port:process.env.HANA_PORT,user:process.env.HANA_USER,password:process.env.HANA_PASSWORD,pooling:process.env.HANA_POOLING,maxPoolSize:process.env.HANA_MAX_POOL_SIZE,connectionLifetime:process.env.HANA_CONNECTION_LIFE_TIME},Hy=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."Fax", T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked",
    T0."U_TempPasswordFlag", T0."U_PortalUser", T0."U_PortalPassword" as "Password", T0."SalesDisc"
  FROM ${m.CompanyDB}.OUSR T0
  WHERE UPPER(T0."USER_CODE") = UPPER(?)`,Jy=`SELECT T0."INTERNAL_K" as "InternalKey", T0."U_PortalAccountLocked"
  FROM ${m.CompanyDB}.OUSR T0
WHERE T0."U_PortalUser" = 'Y'
  AND UPPER(T0."USER_CODE") = UPPER(?)
  AND UPPER(T0."E_Mail") = UPPER(?)`,zy=`SELECT T0."U_NAME" as "UserName", T0."E_Mail" "Email" FROM ${m.CompanyDB}.OUSR T0
  WHERE T0."INTERNAL_K" = ?`,jy=`SELECT DISTINCT T0."INTERNAL_K" "U_UserId", T0."U_NAME" as "UserName"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND  T1."U_GroupName" LIKE `,Vy=`SELECT DISTINCT T1."U_GroupName", T1."U_GroupId"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T0."INTERNAL_K" = ?`,Gy=`SELECT T3."U_ModuleName", T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
  ORDER BY T3."U_ModuleName" ASC`,Qy=`SELECT T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
    AND T3."U_ModuleName" IN `,Yy=`SELECT F."ExpnsCode" "FreightCode", F."ExpnsName" "FreightName"
  FROM ${m.CompanyDB}.OEXD F`,Ky=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${m.CompanyDB}."OPOR" T0, ${m.CompanyDB}."POR3" T1, ${m.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `,Xy=`SELECT T1."BPLId", T1."BPLName" FROM ${m.CompanyDB}.OBPL T1`,Zy=`SELECT T1."BPLId", T2."BPLName", T1."AcsDsbldBP"
    FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}.USR6 T1, ${m.CompanyDB}.OBPL T2
  WHERE T0."USER_CODE" = T1."UserCode"
    AND T1."BPLId" = T2."BPLId"
    AND T2."Disabled" != 'Y'
    AND T0."INTERNAL_K" = ?`,eg=`SELECT T0."ItemCode", T0."ItemName", T0."InvntryUom" FROM ${m.CompanyDB}.OITM T0
    WHERE `,tg=`SELECT 
  T0."ItemCode", 
  T0."WhsCode", 
  T0."OnHand", 
  T2."SalUnitMsr" AS "SalesUOM"
FROM 
  ${m.CompanyDB}.OITW T0
JOIN ${m.CompanyDB}.OWHS T1 ON T0."WhsCode" = T1."WhsCode"
JOIN ${m.CompanyDB}.OITM T2 ON T0."ItemCode" = T2."ItemCode"`,og=`SELECT A."ItemCode", A."ItemName", A."CodeBars", A."FrgnName", C."WhsCode", D."BinCode", D."AbsEntry" "BinAbsEntry", C."OnHandQty",
    A."ManBtchNum", A."ManSerNum", A."InvntItem",
    (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
      WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"=?) AS "Price"
  FROM ${m.CompanyDB}.OITM A, ${m.CompanyDB}.OIBQ C, ${m.CompanyDB}.OBIN D
WHERE A."ItemCode"=C."ItemCode"
  AND D."AbsEntry"=C."BinAbs"
  AND C."OnHandQty">0`,rg=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", 
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${m.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."ListNum" AS "PriceList",
    (SELECT G."ListName" FROM  ${m.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."ListNum") AS "PriceListName",
      A."U_FCCC" AS "FCCCItem",
      A."SalUnitMsr" as "SalesUOM",
      (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
        WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"= O."ListNum") AS "Price"
    FROM 
      ${m.CompanyDB}.OITM A
      LEFT JOIN ${m.CompanyDB}.OITW B on A."ItemCode"=B."ItemCode" 
      LEFT JOIN ${m.CompanyDB}.OIBQ C ON A."ItemCode"=C."ItemCode" and C."WhsCode"=B."WhsCode"   
      LEFT JOIN ${m.CompanyDB}.OBIN D ON D."AbsEntry" = C."BinAbs" 
      LEFT JOIN ${m.CompanyDB}.OCRD O ON O."CardCode" = ?
      LEFT JOIN ${m.CompanyDB}.OBCD F ON A."ItemCode" = F."ItemCode" 
  WHERE 
  1=1`,sg=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", 
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${m.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."U_PrcList" AS "PriceList",
    (SELECT G."ListName" FROM  ${m.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."U_PrcList") AS "PriceListName",
    A."U_FCCC" AS "FCCCItem",
    A."SalUnitMsr" as "SalesUOM",
      (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
        WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"= O."U_PrcList") AS "Price",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${m.CompanyDB}.SPP1 P 
          WHERE P."ItemCode" = A."ItemCode"
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode"= ? OR P."CardCode" = '*1')) 
            THEN 'Y'
    ELSE 'N'
      END AS "DiscApplied"
    FROM 
      ${m.CompanyDB}.OITM A
      LEFT JOIN ${m.CompanyDB}.OITW B on A."ItemCode"=B."ItemCode" 
      LEFT JOIN ${m.CompanyDB}.OIBQ C ON A."ItemCode"=C."ItemCode" and C."WhsCode"=B."WhsCode"   
      LEFT JOIN ${m.CompanyDB}.OBIN D ON D."AbsEntry" = C."BinAbs" 
      LEFT JOIN ${m.CompanyDB}.OBPL O ON O."BPLId" = ?
      LEFT JOIN ${m.CompanyDB}.OBCD F ON A."ItemCode" = F."ItemCode" 
  WHERE 
  1=1`,ng=`SELECT T0."AbsEntry", T0."BinCode"
  FROM ${m.CompanyDB}."OBIN" T0`,ag=`SELECT IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry"
  FROM ${m.CompanyDB}.OBIN D
    LEFT JOIN ${m.CompanyDB}.OIBQ C ON D."AbsEntry" = C."BinAbs"
  WhERE C."WhsCode" = ? AND C."ItemCode" = ?`,ig=`SELECT DISTINCT T0."ItemCode", T0."BatchNum", T0."IntrSerial", T2."WhsCode", T2."BinCode",
T2."AbsEntry" "BinAbsEntry", T0."Quantity", T0."InDate"
  FROM ${m.CompanyDB}."OIBT" T0, ${m.CompanyDB}."OIBQ" T1, ${m.CompanyDB}."OBIN" T2
WHERE T0."ItemCode"=T1."ItemCode" 
  AND T0."WhsCode"=T2."WhsCode"
  AND T1."BinAbs"=T2."AbsEntry"
  AND T0."Quantity" > 0
  AND T1."OnHandQty" > 0`,lg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "BatchNumberProperty",SUM(A."OnHandQty") "OnHandQty"
FROM ${m.CompanyDB}.OBBQ A
  INNER JOIN ${m.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode"
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,cg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "InternalSerialNumber",SUM(A."OnHandQty") "OnHandQty"
FROM ${m.CompanyDB}.OSBQ A 
  INNER JOIN ${m.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,dg=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "BatchNumberProperty",A."OnHandQty",C."BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${m.CompanyDB}.OBBQ A 
  INNER JOIN ${m.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${m.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${m.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,ug=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "InternalSerialNumber",A."OnHandQty",C."BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${m.CompanyDB}.OSBQ A 
  INNER JOIN ${m.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${m.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${m.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,pg=`SELECT DISTINCT T0."NumAtCard" as "VendorRefNo"
    FROM ${m.CompanyDB}.OPDN T0
  WHERE T0."NumAtCard" IS NOT NULL
    AND T0."CANCELED" NOT IN ('Y','C')
    AND T0."NumAtCard"=`,mg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."U_PortalGroupId", T1."U_GroupName", T0."U_PortalUser", 
    T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked"
  FROM ${m.CompanyDB}.OUSR T0
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALUSERGROUPS" T1
    ON T0."U_PortalGroupId" = T1."U_GroupId"
  WHERE T0."U_PortalUser" = ?
    AND T0."U_NAME" IS NOT NULL
  ORDER BY T0."U_PortalUser" DESC, T0."U_NAME" ASC`,yg=`SELECT T0."U_GroupId", T0."U_GroupName", T1."U_PermissionId", T1."U_ModuleId", T2."U_ModuleName", 
    T1."U_AllowRead", T1."U_AllowWrite", T1."U_AllowCancel", T1."U_AllowCreate"
  FROM ${m.CompanyDB}."@PORTALUSERGROUPS" T0
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALPERMISSIONS" T1 ON T0."U_GroupId" = T1."U_GroupId"
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALMODULES" T2 ON T1."U_ModuleId" = T2."U_ModuleId"
  WHERE T0."U_GroupName" IS NOT NULL
    ORDER BY T2."U_ModuleName" ASC, T0."U_GroupName" ASC`,gg=`SELECT T0."U_PermissionId", T0."U_GroupId", T0."U_ModuleId", T1."U_ModuleName", T0."U_AllowRead", T0."U_AllowWrite", 
    T0."U_AllowCancel", T0."U_AllowCreate"
  FROM ${m.CompanyDB}."@PORTALPERMISSIONS" T0, ${m.CompanyDB}."@PORTALMODULES" T1
  WHERE T0."U_ModuleId" = T1."U_ModuleId"
    AND T0."U_GroupId" = `,Tg=`SELECT T0."U_NAME" as "UserName", T0."U_PortalGroupId" FROM ${m.CompanyDB}.OUSR T0
    WHERE T0."U_PortalGroupId"=`,hg=`SELECT T0."U_ModuleId", T0."U_ModuleName" FROM ${m.CompanyDB}."@PORTALMODULES" T0
    ORDER BY T0."U_ModuleName"`,Cg=`SELECT T0."U_GroupId", T0."U_GroupName" FROM ${m.CompanyDB}."@PORTALUSERGROUPS" T0
    ORDER BY T0."U_GroupName"`,fg=`SELECT T0."INTERNAL_K" as "U_UserId", T0."U_NAME" as "UserName"
    FROM ${m.CompanyDB}.OUSR T0
  WHERE T0."U_PortalUser"='Y'
    ORDER BY T0."U_NAME"`,Sg=`INSERT INTO ${m.CompanyDB}."@PORTALUSERGROUPS" ("Code", "Name", "U_GroupName", "U_GroupId")
    VALUES (?, ?, ?, ?)`,Ig=`INSERT INTO ${m.CompanyDB}."@PORTALPERMISSIONS" ("Code", "Name", "U_GroupId", "U_ModuleId",
    "U_AllowRead", "U_AllowWrite", "U_AllowCancel", "U_AllowCreate", "U_PermissionId")
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,Dg=`UPDATE ${m.CompanyDB}."@PORTALUSERGROUPS"
    SET "Code"=?, "Name"=?, "U_GroupName"=?
  WHERE "U_GroupId"=?`,Eg=`UPDATE ${m.CompanyDB}.OUSR
    SET "U_PortalPassword"=?, "U_TempPasswordFlag"=?
  WHERE "INTERNAL_K"=?`,Ng=`UPDATE ${m.CompanyDB}."@PORTALPERMISSIONS"
    SET "Code"=?, "Name"=?, "U_GroupId"=?, "U_ModuleId"=?,
    "U_AllowRead"=?, "U_AllowWrite"=?, "U_AllowCancel"=?, "U_AllowCreate"=?
  WHERE "U_PermissionId"=?`,Ag=`DELETE FROM ${m.CompanyDB}."@PORTALUSERGROUPS" WHERE "U_GroupId" = `,Rg=`DELETE FROM ${m.CompanyDB}."@PORTALPERMISSIONS" WHERE "U_GroupId" = `,bg=`SELECT T0."DocEntry", T0."U_Name", T0."U_Description", T0."U_DocumentName", T0."U_Terms", 
    T0."U_NoOfApprovals", T0."U_MultiLevelApproval", T0."U_Active"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0`,Og=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId" FROM ${m.CompanyDB}."@APPROVALORIGINATOR" T0`,Ug=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId", T0."U_ApprovalLevel"
    FROM ${m.CompanyDB}."@APPROVALAPPROVER" T0`,xg=`SELECT T0."DocEntry" FROM ${m.CompanyDB}."@APPROVALHEADER" T0
    ORDER BY T0."DocEntry" ASC`,wg=`SELECT T0."LineId" FROM ${m.CompanyDB}."@APPROVALORIGINATOR" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,Lg=`SELECT T0."LineId" FROM ${m.CompanyDB}."@APPROVALAPPROVER" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,vg=`INSERT INTO ${m.CompanyDB}."@APPROVALHEADER" ("U_Name", "U_Description", "U_DocumentName", "U_Terms",
    "U_NoOfApprovals", "U_MultiLevelApproval", "U_Active", "DocEntry") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,_g=`INSERT INTO ${m.CompanyDB}."@APPROVALORIGINATOR" ("U_UserId", "DocEntry", "LineId") VALUES (?, ?, ?)`,Pg=`INSERT INTO ${m.CompanyDB}."@APPROVALAPPROVER" ("U_UserId", "U_ApprovalLevel", "DocEntry", "LineId") VALUES (?, ?, ?, ?)`,Bg=`UPDATE ${m.CompanyDB}."@APPROVALHEADER" SET "U_Name"=?, "U_Description"=?, "U_DocumentName"=?,
    "U_Terms"=?, "U_NoOfApprovals"=?, "U_MultiLevelApproval"=?, "U_Active"=? WHERE "DocEntry" = ?`,Mg=`UPDATE ${m.CompanyDB}."@APPROVALORIGINATOR" SET "U_UserId"=? WHERE "DocEntry"=? AND "LineId"=?`,Fg=`UPDATE ${m.CompanyDB}."@APPROVALAPPROVER" SET "U_UserId"=?, "U_ApprovalLevel"=? WHERE "DocEntry"=? AND "LineId"=?`,Wg=`DELETE FROM ${m.CompanyDB}."@APPROVALHEADER" WHERE "DocEntry"=?`,$g=`DELETE FROM ${m.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry" = ?`,kg=`DELETE FROM ${m.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry" = ?`,qg=`DELETE FROM ${m.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry"=? AND "LineId"=?`,Hg=`DELETE FROM ${m.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry"=? AND "LineId"=?`,Jg=`SELECT T0."U_MultiLevelApproval", T0."U_NoOfApprovals",
  T2."U_UserId" "ApproverId", T2."U_ApprovalLevel", T3."U_NAME" as "UserName", T3."E_Mail" "Email"
    FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALORIGINATOR" T1,
    ${m.CompanyDB}."@APPROVALAPPROVER" T2, ${m.CompanyDB}.OUSR T3,
    ${m.CompanyDB}."@PORTALMODULES" T4
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T0."DocEntry" = T2."DocEntry"
    AND T0."U_Active" = 'Y'
    AND T2."U_UserId" = T3."INTERNAL_K"
    AND T1."U_UserId" = ?
    AND T4."U_ModuleId" = T0."U_DocumentName"
    AND T4."U_ModuleName" = ?`,zg=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
  T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
  WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
AND T0."U_DocEntry" IN `,jg=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
  FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_DraftStatus" = ?`,Vg=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
   FROM ${m.CompanyDB}."@APPROVALSTATUS" T0
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,Gg=`SELECT T0."DocDate"
    FROM ${m.CompanyDB}.ODRF T0
  WHERE T0."DocEntry" = ?`,Qg=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS"
  SET "U_DraftStatus" = ?
WHERE "U_DocEntry" = ?
  AND "U_ApprovalLevel" = ?`,Yg=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
  FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_ApprovalLevel" = ?`,Kg=`INSERT INTO ${m.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", "U_DraftStatus",
  "U_ApproverId", "U_ApprovalLevel") VALUES (?, ?, ?, ?, ?, ?)`,Xg=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
  "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
WHERE "U_ApprovalStatusId" = ?`,Zg=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
    WHERE "U_DraftStatus" IN ('${os.PENDING}', '${os.NOT_ASSIGNED}')
  AND "U_DocEntry" = ?`,e0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
     WHERE "U_DocEntry" = ?`,t0=`SELECT T0."U_NoOfApprovals", T0."U_MultiLevelApproval"
    FROM ${m.CompanyDB}.ODRF T0
  WHERE T0."ObjType" = ?
    AND T0."DocEntry" = ?`,o0=`UPDATE ${m.CompanyDB}.ODRF T0 SET T0."U_TargetRecDocNum" = ?
  WHERE T0."DocEntry" = ?`,r0=`SELECT T0."U_DocEntry", T0."U_RejectedReason" FROM ${m.CompanyDB}."@APPROVALSTATUS" T0
    WHERE T0."U_DraftStatus" = '${os.REJECTED}'
  AND T0."U_DocEntry" IN `,s0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALAPPROVER" T1,
  ${m.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,n0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALORIGINATOR" T1,
  ${m.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,a0=`SELECT T1."U_DocEntry", T1."U_DraftStatus", T0."U_DraftStatus" "ActualStatus", T0."U_OriginatorId"
  FROM ${m.CompanyDB}.ODRF T0, ${m.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
  AND T1."U_ApproverId" = ?
  AND T0."ObjType" = ?
  AND T0."CreateDate" > TO_DATE('01/03/20', 'MM/DD/YY')`,i0=`SELECT T0."DocEntry", T0."U_DraftStatus"
  FROM ${m.CompanyDB}.ODRF T0
WHERE T0."U_OriginatorId" = ?
  AND T0."ObjType" = ?`;wa.exports={dbCreds:m,serviceLayerSessionMaxAge:ky,dbConfig:qy,validateUserLogin:Hy,validateUserEmail:Jy,getUserPermissionsForAllModules:Gy,checkUserPermission:Qy,allFreightInfo:Yy,freightInfoForPO:Ky,branch:Xy,userBranches:Zy,itemsList:eg,itemQuantityInWarehouse:tg,binsAndItemQuantityInWarehouse:og,binsAndItemQuantityInWarehouseWithPrice:rg,binsAndItemQuantityInWarehouseWithPriceList:sg,binsList:ng,selectInfoFromBatchSerialNo:ig,batchForItemAndWH:lg,serialForItemAndWH:cg,getAllBinsForBatch:dg,getAllBinsForSerial:ug,vendorRefNoQuery:pg,portalModules:hg,portalUserGroups:Cg,updatePortalPassword:Eg,portalUsers:fg,allUsers:mg,userGroupsWithPermissions:yg,userPermissionsForGivenGroup:gg,usersInGivenGroup:Tg,insertUserGroup:Sg,insertPermissions:Ig,updateUserGroup:Dg,updatePermissions:Ng,deleteUserGroup:Ag,deletePermissions:Rg,selectApprovalHeader:bg,selectApprovalOriginator:Og,selectApprovalApprover:Ug,allHeaderIds:xg,allApproverIds:Lg,allOriginatorIds:wg,insertApprovalHeader:vg,insertApprovalOriginator:_g,insertApprovalApprover:Pg,updateApprovalHeader:Bg,updateApprovalOriginator:Mg,updateApprovalApprover:Fg,deleteApprovalTemplate1:Wg,deleteApprovalTemplate2:$g,deleteApprovalTemplate3:kg,deleteApprovalOriginator:qg,deleteApprovalApprover:Hg,selectApproverForOriginator:Jg,selectUserInfo:zy,selectUsersInUserGroup:jy,selectUserGroupInUser:Vy,updateDraftTargetRecDocNum:o0,selectRejectedReason:r0,selectNoOfApprovalsForDraft:t0,selectDraftApproversList:zg,insertDraftApproversList:Kg,updateDraftApproversList:Xg,updateApprovalStatus:Zg,updateApprovalStatusRecState:e0,selectDraftApprovalStatusCount:jg,updateDraftNextApprovalLevel:Qg,selectDraftNextApproverDetails:Yg,selectDraftApprovalDate:Vg,selectDraftCreationDate:Gg,selectApproverCount:s0,selectOriginatorCount:n0,selectDraftsForApprover:a0,selectDraftsForOriginator:i0,binsListForItem:ag}});var S=d((XN,La)=>{var rs=require("../node_modules/@sap/hana-client/lib/index.js"),{dbConfig:ss}=f(),l0=(e,t)=>{let o=rs.createConnection();o.connect(ss,async r=>{r&&(console.error(r),t(r,null)),o.exec(e,(s,n)=>{s&&(console.error(s),t(s,null)),t(null,n),o.disconnect(a=>{a&&console.error(a)})})})},c0=(e,t=[])=>{Array.isArray(t)||(t=[t]);try{let o=rs.createConnection();o.connect(ss);let r=o.exec(e,t);return o.disconnect(),r}catch(o){throw console.error("executeWithValues: "+JSON.stringify(o)),o}},d0=(e,t)=>{if(t.length)try{let o=rs.createConnection();o.connect(ss);let s=o.prepare(e).execBatch(t);return o.disconnect(),s}catch(o){throw console.error("executeWithValues: "+JSON.stringify(o)),o}else return 0};La.exports={executeQuery:l0,executeWithValues:c0,executeBatchInsertUpdate:d0}});var ns=d((eA,_a)=>{var{dbCreds:fe}=f(),{draftObjectCodes:va,recordState:ZN}=T(),u0=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName"
    FROM ${fe.CompanyDB}.ODRF T0, ${fe.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${va.STOCK_TRANSFER_REQUEST}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,p0=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode"
  FROM ${fe.CompanyDB}.ODRF T0, ${fe.CompanyDB}.OUSR TOR, ${fe.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${va.STOCK_TRANSFER_REQUEST}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,m0=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${fe.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,y0=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
  T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
  T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
    FROM ${fe.CompanyDB}.OWTQ T0
  LEFT OUTER JOIN ${fe.CompanyDB}.OUSR TOR ON T0."U_OriginatorId" = TOR."INTERNAL_K"
  WHERE T0."DocStatus" = 'O'`,g0=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation", T1."U_FromBinLoc"
 FROM ${fe.CompanyDB}.WTQ1 T1
   WHERE T1."DocEntry" IN `;_a.exports={selectStockTransRequestDrafts:u0,selectStockTransRequestDraftsWithMultiApprover:p0,selectApprovedSTR:y0,selectItemDetailsForSTRDrafts:m0,selectItemDetailsForSTRs:g0}});var as=d((tA,Ba)=>{var{dbCreds:ye}=f(),{draftObjectCodes:Pa}=T(),T0=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."U_TargetRecDocNum",
  T0."U_ToBinLocation", T0."BPLName"
    FROM ${ye.CompanyDB}.ODRF T0, ${ye.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${Pa.STOCK_TRANSFER}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,h0=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName"
  FROM ${ye.CompanyDB}.ODRF T0, ${ye.CompanyDB}.OUSR TOR, ${ye.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${Pa.STOCK_TRANSFER}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,C0=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", TRW."unitMsr" AS "InvntryUom",
  TRW."WhsCode", TRW."FromWhsCod" as "FromWarehouse", "U_FromBinLoc", TRW."U_ToBinLocation"
FROM ${ye.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,f0=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
 T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
 T0."U_ToBinLocation", T0."BPLName"
    FROM ${ye.CompanyDB}.OWTR T0, ${ye.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."U_DraftStatus" = 'AUTO_APPROVED'`,S0=`SELECT T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
 FROM ${ye.CompanyDB}.WTR1 T1
   WHERE T1."DocEntry" IN `,I0=`SELECT T0."DocEntry", T0."DocNum"
   FROM ${ye.CompanyDB}.OWTR T0
 WHERE T0."DocNum" = ?`;Ba.exports={selectStockTransDrafts:T0,selectStockTransDraftsWithMultiApprover:h0,selectApprovedSTs:f0,selectItemDetailsForSTDrafts:C0,selectItemDetailsForSTs:S0,selectSTDocEntry:I0}});var is=d((oA,Fa)=>{var Bt=S(),D0=f(),tt=ns(),{userRoles:et,draftStatus:E0}=T(),Ma=' ORDER BY T0."DocEntry" ASC',N0=(e,t)=>{console.log("*** getTransferRequestRecords - req.query: "+JSON.stringify(e.query)),console.log("*** getTransferRequestRecords - req.params: "+JSON.stringify(e.params));let o=[],r=[],s=[],n=[],a=[],i=[],{userId:c}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let l;e.params.recordType==="direct"?l=tt.selectItemDetailsForSTRs:e.params.recordType==="draft"&&(l=tt.selectItemDetailsForSTRDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=Bt.executeWithValues(l+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&c){let l,u="";if(e.query.userRole==et.APPROVER?l=tt.selectStockTransRequestDraftsWithMultiApprover:e.query.userRole==et.ORIGINATOR&&(l=tt.selectStockTransRequestDrafts,u=` AND T0."U_OriginatorId" = ? ${Ma}`,i=Uo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+u,[c])),e.query.userRole==et.ADMIN){let p=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                        AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,g=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(p=p+' AND T0."U_DraftStatus" IN (?)',g.push(e.query.status)),i=Uo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+p,g),p=p+Ma,o=Bt.executeWithValues(tt.selectStockTransRequestDrafts+p,g)}else o=Bt.executeWithValues(l+u,[c]);Array.isArray(o)&&o.length&&(o.forEach(p=>{r.push(p.DocEntry)}),Array.isArray(r)&&r.length&&(e.query.userRole==et.ORIGINATOR||e.query.userRole==et.ADMIN||e.query.userRole==et.APPROVER)&&(s=Bt.executeWithValues(D0.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),Array.isArray(s)&&s.length&&o.forEach(p=>{n=[],s.forEach(g=>{p.DocEntry==g.U_DocEntry&&n.push(g)}),p.approvers=n}))),t.send([...o,...i])}else e.query.requestStatus===E0.APPROVED&&(console.log("***** getApprovedSTRRecords"),i=Uo(),t.send(i))}catch(l){console.log("getTransferRequestRecords - controller - error: "+JSON.stringify(l)),t.status(500).send({message:l.message})}},Uo=(e="",t=[])=>{let o=[];try{return o=Bt.executeWithValues(tt.selectApprovedSTR+e,t),o}catch(r){throw r}};Fa.exports={getTransferRequestRecords:N0,getApprovedSTRRecords:Uo}});var $a=d((rA,Wa)=>{var A0=require("../node_modules/nodemailer/lib/nodemailer.js"),R0=A0.createTransport({host:process.env.SMTP_SERVER,port:25,secure:!1,auth:{user:process.env.SMTP_USERNAME,pass:process.env.SMTP_PASSWORD},tls:{rejectUnauthorized:!1}});Wa.exports={transporter:R0}});var ge=d((sA,qa)=>{var ka=require("path"),{transporter:b0}=$a(),O0=async(e,t,o)=>{let r={from:process.env.SMTP_USERNAME,to:e,subject:t,html:o,attachments:[{filename:"logo.png",path:ka.join(__dirname,"../assets/img/client-logo.png"),cid:"client_logo_pic"},{filename:"n-app-logo.png",path:ka.join(__dirname,"../assets/img/n-app-logo.png"),cid:"app_logo_pic"}]};console.log("__dirname: "+__dirname);try{console.log("Sending mail....");let s=await b0.sendMail(r);return console.log("Email sent: "+s.response),!0}catch(s){return console.log("sendMail: "+JSON.stringify(s)),!1}};qa.exports={sendMail:O0}});var cs=d((lA,Ja)=>{var rt=S(),U0=f(),We=as(),{sendMail:nA}=ge(),{userRoles:ot,portalModules:aA,draftStatus:iA}=T(),Ha=' ORDER BY T0."DocEntry" ASC',x0=(e,t)=>{console.log("### getTransferRecords - req.query: "+JSON.stringify(e.query));let o=[],r=[],s=[],n=[],a=[],i=[],{userId:c}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let l;e.params.recordType==="direct"?l=We.selectItemDetailsForSTs:e.params.recordType==="draft"&&(l=We.selectItemDetailsForSTDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=rt.executeWithValues(l+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&c){let l,u="";if(e.query.userRole==ot.APPROVER?l=We.selectStockTransDraftsWithMultiApprover:e.query.userRole==ot.ORIGINATOR&&(l=We.selectStockTransDrafts,u=` AND T0."U_OriginatorId" = ? ${Ha}`,i=ls(u,[c])),e.query.userRole==ot.ADMIN){let p=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                      AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,g=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(p=p+' AND T0."U_DraftStatus" IN (?)',g.push(e.query.status)),p=p+Ha,o=rt.executeWithValues(We.selectStockTransDrafts+p,g),i=ls(p,g)}else o=rt.executeWithValues(l+u,[c]);if(Array.isArray(o)&&o.length&&(o.forEach(p=>{r.push(p.DocEntry)}),Array.isArray(r)&&r.length)){(e.query.userRole==ot.ORIGINATOR||e.query.userRole==ot.ADMIN||e.query.userRole==ot.APPROVER)&&(s=rt.executeWithValues(U0.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),console.log("allApprovers: "+JSON.stringify(s)),Array.isArray(s)&&s.length&&o.forEach(g=>{n=[],s.forEach(y=>{g.DocEntry==y.U_DocEntry&&n.push(y)}),g.approvers=n}));let p=rt.executeWithValues(We.selectItemDetailsForSTDrafts+`(${r})`);if(Array.isArray(p)&&p.length){let g;o.forEach(y=>{a=[],p.forEach(C=>{y.DocEntry===C.DocEntry&&a.push(C),g||(g=C.FromWhsCod)}),y.itemList=a,y.FromWhsCod=g})}}t.send([...o,...i])}}catch(l){console.log("getTransferRecords - controller - error: "+JSON.stringify(l)),t.status(500).send({message})}},ls=(e="",t=[])=>{let o=[0],r=[],s=[];try{return s=rt.executeWithValues(We.selectApprovedSTs+e,t),console.log("reqsCreatedByApprover: "+JSON.stringify(s)),s}catch(n){throw n}};Ja.exports={getTransferRecords:x0,getApprovedSTRecords:ls}});var Va=d((cA,ja)=>{var{dbCreds:za}=f(),w0=`UPDATE ${za.CompanyDB}.OBTN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`,L0=`UPDATE ${za.CompanyDB}.OSRN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`;ja.exports={updateReservedCustForBatch:w0,updateReservedCustForSerial:L0}});var Qa=d((dA,Ga)=>{var{dbCreds:oe}=f(),v0=`SELECT T0."ItemCode", T0."DistNumber" As "U_Batch", T0."U_Width" As "U_Width", T0."U_Height" As "U_Height", 
    T0."U_Length" As "U_Length", 0 AS "U_NoOfPcs",
    (IFNULL(T1."Quantity",0)-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
    0 AS "U_SelQty",
   (IFNULL(T1."Quantity", 0) - IFNULL(T1."CommitQty", 0)) / 
    ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") AS "U_AvlPcs",
    0 AS "U_BalPcs",
    0 AS "U_BalAvlQty"
  FROM ${oe.CompanyDB}.OBTN T0
    INNER JOIN ${oe.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
  WHERE 1=1`,_0=`SELECT DISTINCT T0."ItemCode", T0."DistNumber" AS "U_Batch", T0."U_Width" As "U_Width", 
      T0."U_Height" As "U_Height", 
      T0."U_Length" As "U_Length", 
      0 AS "U_NoOfPcs",
      (IFNULL(T1."Quantity",0)-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
      0 AS "U_SelQty",
      (IFNULL(T1."Quantity", 0) - IFNULL(T1."CommitQty", 0)) / 
        ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") AS "U_AvlPcs",
      0 AS "U_BalPcs",
      0 AS "U_BalAvlQty"
    FROM ${oe.CompanyDB}.OBTN T0
      LEFT JOIN ${oe.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    WHERE 1=1`,P0=`SELECT DISTINCT T0."ItemCode", '' AS "U_Batch", T0."U_Width" As "U_Width", 
      T0."U_Height" As "U_Height", 
      T0."U_Length" As "U_Length", 
      0 AS "U_NoOfPcs",
      (IFNULL(T1."Quantity",0)-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
      0 AS "U_SelQty",
      (IFNULL(T1."Quantity", 0) - IFNULL(T1."CommitQty", 0)) / 
        ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") AS "U_AvlPcs",
      0 AS "U_BalPcs",
      0 AS "U_BalAvlQty"
    FROM ${oe.CompanyDB}.OBTN T0
      LEFT JOIN ${oe.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    WHERE 1=1`,B0=`SELECT T0."ItemCode",
        T0."DistNumber" AS "U_Batch",
        T0."U_Width",
        T0."U_Height",
        T0."U_Length",
        0 AS "U_NoOfPcs",
        (IFNULL(T1."Quantity",0)-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
        0 AS "U_SelQty",
        ROUND((IFNULL(T1."Quantity",0)-IFNULL(T1."CommitQty",0)) / 
          ((T0."U_Height"/1000) * (T0."U_Width"/1000) * T0."U_Length"),5) AS "U_AvlPcs",
        0 AS "U_BalPcs",
        0 AS "U_BalAvlQty"
      FROM ${oe.CompanyDB}."OBTN" T0
      LEFT JOIN ${oe.CompanyDB}."OBTQ" T1
        ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
      WHERE 1=1`,M0=`SELECT DISTINCT T0."ItemCode",
       '' AS "U_Batch",
       T0."U_Width",
       T0."U_Height",
       T0."U_Length",
       0 AS "U_NoOfPcs",
       0 AS "U_AvlQty",
       0 AS "U_SelQty",
       0 AS "U_AvlPcs",
       0 AS "U_BalPcs",
       0 AS "U_BalAvlQty"
    FROM ${oe.CompanyDB}."OBTN" T0
    LEFT JOIN ${oe.CompanyDB}."OBTQ" T1
      ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
    WHERE 1=1`,F0=`SELECT 1
      FROM ${oe.CompanyDB}."OBTN" S0
    INNER JOIN ${oe.CompanyDB}."OBTQ" S1
      ON S0."SysNumber"=S1."SysNumber" AND S0."ItemCode"=S1."ItemCode"
      WHERE S0."U_Width"  = T0."U_Width"
        AND S0."U_Height" = T0."U_Height"
        AND S0."U_Length" = T0."U_Length"`;Ga.exports={selectTimYardItemInfo:v0,selectTimYardItemInitialInfo1:_0,selectTimYardItemInitialInfo2:P0,selectTimyardItemInitialInfo3:B0,selectTimyardItemInitialInfo4:M0,selectTimYardItemExistsCheck:F0}});var x=d((uA,Xa)=>{var Ya=["January","February","March","April","May","June","July","August","September","October","November","December"],Ka=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],W0=async e=>{let t=require("dns"),o=e.connection.remoteAddress;return o==="127.0.0.1"||o==="::1"?"localhost":new Promise((r,s)=>{t.reverse(o,(n,a)=>{if(n)console.error(n),r(o);else{let i=a[0]||o;r(i)}})})},$0=(e,t)=>{try{let o=e.getTime(),r=t.getTime();return Math.abs(o-r)/(1e3*60)}catch(o){return console.log(o),0}},k0=(e,t)=>{e=new Date(e);let o="NA";if(e!="Invalid Date"){let r=e.getDate().toString().padStart(2,"0"),s=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getFullYear(),a=e.toLocaleString("default",{month:"short"});if(t.includes("MMMM D, YYYY")?o=`${Ya[e.getMonth()]} ${e.getDate()}, ${n}`:t.includes("MMM D, YYYY")?o=`${Ya[e.getMonth()].substr(0,3)} ${e.getDate()}, ${n}`:t.includes("YYYY-MM-DD")?o=n+"-"+s+"-"+r:t.includes("YYYY/MM/DD")?o=n+"/"+s+"/"+r:t==="DD/MM/YYYY"?o=r+"/"+s+"/"+n:t==="DD/MM/YY"?o=r+"/"+s+"/"+n.toString().substr(-2):t==="DDMMM"?o=r+a:["DDMM","ddmm"].includes(t)&&(o=r+s),t.includes("hh:mm")){let i=parseInt(e.getHours(),10);console.log("hour: "+i);let c="AM";i>12?(i-=12,c="PM"):i===0&&(i=12),o=`${o} ${i}:${e.getMinutes().toString().padStart(2,"0")} ${c}`}else t.includes("HH24:MI:SS.FF2")?o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}.00`:t.includes("HH24:MI:SS")&&(o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`)}return o},q0=e=>{let t=new Date(e);return t instanceof Date&&!isNaN(t)},H0=()=>{let e=new Date().getTime(),t=Math.floor(Math.random()*Math.pow(10,15)),o=Math.floor(Math.random()*Math.pow(10,15));console.log("random1: "+t+" random2: "+o+" millisec: "+e);let r=(e+t+o).toString();return r.slice(r.length-9)},J0=(e,t,o,r,s,n)=>{let a=month=dow="*";if(console.log(`cycle: ${e}, dayOfWeek: ${t}, dayOfMonth: ${o}, hour: ${r}, minute: ${s}, amPm: ${n}`),r=parseInt(r),n==="PM"&&r<12?r+=12:n==="AM"&&r===12&&(r=0),e==="Weekly")for(let i=0;i<Ka.length;i++)Ka[i]===t&&(dow=i);else e==="Monthly"&&(a=o);return[s,r,a,month,dow].join(" ")};Xa.exports={formatDate:k0,getRandomNo:H0,getCronExpression:J0,getClientHostname:W0,getTimeDifference:$0,isValidDate:q0}});var Se=d(v=>{var{isValidDate:Za}=x(),z0=50;v.buildHeaderRecQuery=(e,t,o=null,r="DocDate")=>{let s="",n="";if(t.searchKey){let c=['T0."DocNum"','T0."NumAtCard"','T0."Comments"'];o&&c.push(...o),s+=v.buildWildCardSearchCondition(c,t.searchKey),n=v.buildLimitOffset(1,z0)}else{let c=v.buildHeaderRecFilterConditions(t,r);s=c.filter,n=c.limitOffset}t.IsHomeDelivery&&(s+=v.buildEqualCondition('T0."U_IsHomeDelivery"',t.IsHomeDelivery),t.userId&&(s+=v.buildEqualCondition('T0."U_DeliveryAgentId"',t.userId)));let a=' ORDER BY T0."DocNum" ASC';return e+s+a+n};v.buildRowLevelQuery=(e,t)=>{let o="";t.lineStatus&&(o+=v.buildEqualCondition('T1."LineStatus"',t.lineStatus));let r=' ORDER BY T1."LineNum" ASC';return e+`(${t.docNum.toString()})`+o+r};v.buildHeaderRecFilterConditions=(e,t)=>{let o="",r="";return e.fromDate&&e.toDate&&(o+=v.buildDateRangeCondition(`T0."${t}"`,e.fromDate,e.toDate)),e.cardCode&&(o+=v.buildEqualCondition('T0."CardCode"',e.cardCode)),e.docStatus&&(o+=v.buildEqualCondition('T0."DocStatus"',e.docStatus)),e.locationName&&(o+=v.buildEqualCondition('T0."U_Location"',e.locationName)),e.salesEmployeeCode&&(o+=v.buildEqualCondition('T0."SlpCode"',e.salesEmployeeCode)),e.pageNum&&e.pageSize&&(r=v.buildLimitOffset(e.pageNum,e.pageSize)),{filter:o,limitOffset:r}};v.buildLimitOffset=(e=1,t)=>{let o="";if(!isNaN(e)&&!isNaN(t)&&t>0){let r=(e-1)*t,s=e*t;o=` LIMIT ${t} OFFSET ${r} `}return o};v.buildDateRangeCondition=(e,t,o)=>{let r="";return Za(t)&&Za(o)&&(r=` AND ${e} BETWEEN TO_DATE('${t}') AND TO_DATE('${o}') `),r};v.buildEqualCondition=(e,t)=>{let o="";return e&&t&&(o=` AND ${e} = '${t}' `),o};v.buildWildCardSearchCondition=(e,t)=>{let o="";if(t)return isNaN(t)&&(t=t.toUpperCase()),o=` AND ( ${e.map(s=>`UPPER(${s}) LIKE '%${t}%'`).join(" OR ")} ) `,o}});var ds=d((yA,ri)=>{var re=f(),ei=Va(),Mt=Qa(),se=S(),{buildLimitOffset:j0,buildWildCardSearchCondition:V0}=Se(),{itemTypes:st,requestTypes:ti,EXCLUDED_ITEM_GROUPS:mA}=T(),G0=e=>{console.log("*** req.query: "+JSON.stringify(e.query));let t="",o=[],r="",s="";e.pageNum&&e.pageSize&&(t=j0(e.pageNum,e.pageSize)),e.searchKey&&(r=V0(['T0."ItemCode"','T0."ItemName"','T0."FrgnName"'],e.searchKey));let n=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."InvntryUom",
             T0."ManBtchNum", T0."ManSerNum", T0."InvntItem",
             T0."CodeBars", T0."AvgPrice", T0."SpcialDisc" "Discount",
             (SELECT MAX(A."Price") FROM  ${re.dbCreds.CompanyDB}.ITM1 A 
                WHERE A."ItemCode"=T0."ItemCode" AND A."PriceList"='1') AS "Price"
              FROM ${re.dbCreds.CompanyDB}.OITM T0
             WHERE T0."frozenFor" = 'N'`;if(e.itemType){let a="",i="";e.itemCodes&&(a=e.itemCodes,Array.isArray(a)?a="'"+a.join("','")+"'":a="'"+a+"'",i=` AND T0."ItemCode" IN (${a})`),console.log("** itemCodes: "+a),e.itemType===st.NORMAL?n=`SELECT T0."ItemCode"
              FROM ${re.dbCreds.CompanyDB}.OITM T0
            WHERE T0."ManBtchNum" ='N' AND T0."ManSerNum" ='N' AND T0."frozenFor" = 'N'
              ${i}`:e.itemType===st.LABOR&&(n=`SELECT T0."ItemCode"
              FROM ${re.dbCreds.CompanyDB}.OITM T0
            WHERE T0."InvntItem" ='N' AND T0."frozenFor" = 'N'
              ${i}`)}s=' ORDER BY T0."ItemCode" ASC';try{console.log("getItems - sql+filter+orderBy+limitOffset: ",n+r+s+t),console.log("getItems - values: ",o);let a=se.executeWithValues(n+r+s+t,o),i=[];return e.query&&(e.itemType===st.NORMAL||e.itemType===st.LABOR)?(a.forEach(c=>{i.push(c.ItemCode)}),console.log("getItems - itemCodes - %s",JSON.stringify(i)),i):(console.log("getItems - rows - %s",JSON.stringify(a)),a)}catch(a){throw console.log("getItems - helper - error: "+JSON.stringify(a)),a}},Q0=async e=>{let t,o=[],r="";if(console.log("filter.itemAndWHCodes: "+e.itemAndWHCodes),e.type===ti.BATCH_SERIAL_IN_A_BIN)try{let s=await oi(e.itemType,e.itemCode,e.warehouseCode,e.binCode);return console.log("getBatchSerialInfo: "+JSON.stringify(s)),s}catch(s){throw s}else if(e.type===ti.BATCH_SERIAL_WITH_ALL_BINS)try{let s,n,a=[],i=[],c=xo(e.itemAndWHCodes,"A");if(r=c.where+' GROUP BY A."ItemCode", C."BinCode", C."AbsEntry", A."WhsCode",B."DistNumber"',o=c.values,console.log("BATCH_SERIAL_WITH_ALL_BINS - values: "+o.toString()),s=se.executeWithValues(re.batchForItemAndWH+r,o),n=se.executeWithValues(re.serialForItemAndWH+r,o),Array.isArray(s)&&s.length>0){let l=xo(s,"A");r=l.where,o=l.values,a=se.executeWithValues(re.getAllBinsForBatch+r,o)}if(Array.isArray(n)&&n.length>0){let l=xo(n,"A");r=l.where,o=l.values,console.log("binsListForSerial - values: "+o.toString()),i=se.executeWithValues(re.getAllBinsForSerial+r,o),console.log("binsListForSerial - result: "+JSON.stringify(i))}if(Array.isArray(a)&&a.length>0){let l=[];s.forEach(u=>{a.forEach(p=>{u.ItemCode===p.ItemCode&&u.WhsCode===p.WhsCode&&u.BatchNumberProperty===p.BatchNumberProperty&&l.push({BatchNumberProperty:p.BatchNumberProperty,BinCode:p.BinCode,BinAbsEntry:p.BinAbsEntry,OnHandQty:p.OnHandQty})}),u.DocumentLinesBinAllocations=l,l=[]})}if(Array.isArray(i)&&i.length>0){let l=[];n.forEach(u=>{i.forEach(p=>{u.ItemCode===p.ItemCode&&u.WhsCode===p.WhsCode&&u.InternalSerialNumber===p.InternalSerialNumber&&l.push({InternalSerialNumber:p.InternalSerialNumber,BinCode:p.BinCode,BinAbsEntry:p.BinAbsEntry,OnHandQty:p.OnHandQty})}),u.DocumentLinesBinAllocations=l,l=[]})}return[...s,...n]}catch(s){throw s}else{if(console.log("filter: "+e),e.batchSerialNo&&e.binCode)r=' AND B."DistNumber" = ? AND C."BinCode" = ?',o=[e.batchSerialNo,e.binCode];else if(e.batchSerialNo)r=' AND B."DistNumber" = ?',o=[e.batchSerialNo];else if(e.warehouseCode)r+=' AND A."WhsCode" = ?',o=[e.warehouseCode],e.binCode&&(r+=' AND C."BinCode" = ?',o.push(e.binCode));else if(e.itemAndWHCodes){let s=xo(e.itemAndWHCodes,"A");r=s.where,o=s.values}e.itemCode&&(r=' AND A."ItemCode" = ?',o=[e.itemCode]);try{console.log("getBatchSerialInfo - values: "+o.toString());let s=se.executeWithValues(re.getAllBinsForBatch+r,o),n=se.executeWithValues(re.getAllBinsForSerial+r,o);return[...s,...n]}catch(s){throw s}}},oi=(e,t,o,r)=>{let s=[],n,a;e===st.BATCHES?a=re.getAllBinsForBatch:e===st.SERIAL_NUMBERS&&(a=re.getAllBinsForSerial),t&&s.push(`A."ItemCode" IN ('${t}')`),o&&s.push(`A."WhsCode" IN ('${o}')`),r&&s.push(`C."BinCode" IN ('${r}')`),s.length&&(a=`${a} AND ${s.join(" AND ")}`);try{return n=se.executeWithValues(a),console.log("getBatchSerialRecords - result: "+JSON.stringify(n)),n}catch(i){throw i}},Y0=(e,t,o)=>{let r=[],s,n;e?n=ei.updateReservedCustForBatch:t&&(n=ei.updateReservedCustForSerial);try{return s=se.executeWithValues(n,o),console.log("setBatchSerialReservedCust - result: "+JSON.stringify(s)),s}catch(a){throw a}},xo=(e,t)=>{let o=[],r="";return Array.isArray(e)&&e.length&&(e.forEach(s=>{r?r+=" OR ":r+=" AND (",!s.BatchNumberProperty&&!s.InternalSerialNumber&&(s=JSON.parse(s)),s.BatchNumberProperty||s.InternalSerialNumber?(r+=`(B."DistNumber"=? AND ${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.BatchNumberProperty?s.BatchNumberProperty:s.InternalSerialNumber),o.push(s.ItemCode),o.push(s.WhsCode)):(r+=`(${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.itemCode),o.push(s.warehouseCode))}),r+=")"),{where:r,values:o}},K0=e=>{let t=[],o,r;r=Mt.selectTimYardItemInfo,e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItems - Query: "+r);try{return o=se.executeWithValues(r),console.log("getTimYardItemRecords - result: "+JSON.stringify(o)),o}catch(s){throw s}},X0=e=>{let t=[],o,r;r=Mt.selectTimYardItemInitialInfo1,e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItemInitial1Records - Query: "+r);try{return o=se.executeWithValues(r),o}catch(s){throw s}},Z0=e=>{let t=[],o,r,s,n;r=Mt.selectTimyardItemInitialInfo3,e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),s=Mt.selectTimyardItemInitialInfo4,t=[],e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(s=`${s} AND ${t.join(" AND ")}`),n=Mt.selectTimYardItemExistsCheck,t=[],e.itemCode&&t.push(`S0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`S1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(n=`${n} AND ${t.join(" AND ")}`),r=r+" UNION "+s+" AND NOT EXISTS ("+n+" )",console.log("getTimYardItemInitialRecords - Query: "+r);try{o=se.executeWithValues(r);let a=o.map(i=>{if(i.U_Batch&&i.U_Batch.trim()!=="")return i;let c=i.ItemCode.toString().slice(-6),l="";i.U_Length!==void 0&&i.U_Length!==null&&(l=parseFloat(i.U_Length));let u=l!==""?`SC${e.warehouseCode}${c}_${l}`:`SC${e.warehouseCode}${c}`;return{...i,U_Batch:u}});return console.log("getTimYardItemInitialRecords - enriched: "+JSON.stringify(a)),a}catch(a){throw a}};ri.exports={getItems:G0,getBatchSerialInfo:Q0,getBatchSerialRecords:oi,setBatchSerialReservedCust:Y0,getTimYardItemRecords:K0,getTimYardItemInitial1Records:X0,getTimYardItemInitial3Records:Z0}});var ai=d((fA,ni)=>{var Ie=S(),le=f(),gA=ns(),si=as(),{getApprovedSTRRecords:eT}=is(),{getApprovedSTRecords:tT}=cs(),{getBatchSerialInfo:oT,getItems:rT,getTimYardItemRecords:sT,getTimYardItemInitial1Records:TA,getTimYardItemInitial2Records:hA,getTimYardItemInitial3Records:nT}=ds(),{portalModules:Ft,draftObjectCodes:us,draftStatus:$e,itemTypes:CA}=T(),aT=(e,t)=>{let o;e.query.moduleName===Ft.STOCK_TRANSFER&&(o=si.selectSTDocEntry);try{let r=Ie.executeWithValues(o,[e.query.docNum]);console.log("getDocEntry: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getDocEntry - controller - error: "+JSON.stringify(r.message)),t.status(500).send({message:r.message})}},iT=(e,t)=>{try{t.send({serverDateTime:new Date})}catch(o){console.log("err: "+JSON.stringify(o)),t.status(500).send({message:JSON.stringify(o)})}},lT=(e,t)=>{try{let o=Ie.executeWithValues(le.userBranches,[e.session.userId]);console.log("getUserBranches- branchList: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},cT=(e,t)=>{try{let o=Ie.executeWithValues(le.allFreightInfo,[]);console.log("getFreightList- allFreightInfo: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},dT=(e,t)=>{console.log("*** req.query: "+JSON.stringify(e.query));try{let o=rT(e.query);t.send(o)}catch(o){console.log("getItemsList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},uT=(e,t)=>{try{Ie.executeQuery(le.portalModules,(o,r)=>{if(o)throw o;console.log("getPortalModules %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalModules - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},pT=(e,t)=>{let o,r=0,s=0,n=0,a=0,i=0,c=0,l,u,{userId:p}=e.session;console.log("getDraftsCount - req.session.userId: ",p);let g=[p];if(e.query.moduleName){if(e.query.moduleName==Ft.STOCK_TRANSFER_REQUEST){o=us.STOCK_TRANSFER_REQUEST;let y=eT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[p]);Array.isArray(y)&&y.length>0&&(s=s+y.length,i=i+y.length)}else if(e.query.moduleName==Ft.STOCK_TRANSFER){o=us.STOCK_TRANSFER;let y=tT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[p]);Array.isArray(y)&&y.length>0&&(s=s+y.length,i=i+y.length)}else e.query.moduleName==Ft.DELIVERY&&(o=us[Ft.DELIVERY],l=si.selectApprovedSTs+' AND T0."U_OriginatorId" = ?');o&&g.push(o);try{let y=Ie.executeWithValues(le.selectDraftsForApprover,g),C=Ie.executeWithValues(le.selectDraftsForOriginator,g);Array.isArray(y)&&y.length&&y.forEach(h=>{h.U_DraftStatus===$e.PENDING&&h.ActualStatus!==$e.APPROVED?r++:h.U_DraftStatus===$e.APPROVED?s++:h.U_DraftStatus===$e.REJECTED&&n++}),Array.isArray(C)&&C.length&&C.forEach(h=>{h.U_DraftStatus===$e.PENDING?a++:h.U_DraftStatus===$e.APPROVED?i++:h.U_DraftStatus===$e.REJECTED&&c++}),t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:i,originatorRejected:c})}catch(y){t.status(500).send({message:y.message})}}else t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:i,originatorRejected:c})},mT=(e,t)=>{let o=e.query.itemCode;Array.isArray(o)?o="'"+o.join("','")+"'":o="'"+o+"'",console.log("** itemCodes: "+o);let r=le.itemQuantityInWarehouse,s=[],n=[];e.query.itemCode&&s.push(`T0."ItemCode" IN (${o})`),e.query.warehouseCode&&s.push(`T0."WhsCode" IN (${e.query.warehouseCode})`),s.length&&(r=`${r} AND ${s.join(" AND ")} ORDER BY T0."OnHand" DESC`),console.log("getItemCountInWarehouse - sql: "+r);try{n=Ie.executeWithValues(r),console.log("getItemCountInWarehouse - result: "+JSON.stringify(n)),t.send(n)}catch(a){t.status(500).send({message:a.message})}},yT=(e,t)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));let o="",r=[],s="",n="";e.query.searchKey&&(s=` AND (
                UPPER(A."ItemCode") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."ItemName") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."FrgnName") LIKE '%${e.query.searchKey}%' ) `);let a,i=e.query.itemCode,c=e.query.warehouseCode,l=e.query.binCode,u=e.query.barCode,p=e.query.cardCode,g=e.query.branch;if(e.params.type==="available-item-qty"){a=le.binsAndItemQuantityInWarehouse,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),e.session?.userSessionLog?.storeLocation==="Labasa"?r.push("2"):r.push("1");let y=[];i&&y.push(`A."ItemCode" IN ('${i}')`),u&&y.push(`A."CodeBars" IN ('${u}')`),c&&y.push(`C."WhsCode" IN ('${c}')`),l&&y.push(`D."BinCode" IN ('${l}')`),y.length&&(a=`${a} AND ${y.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',a=a+s+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+a)}else if(e.params.type==="available-item-qty-price"){a=le.binsAndItemQuantityInWarehouseWithPrice,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(p);let y=[];i&&y.push(`A."ItemCode" IN ('${i}')`),u&&y.push(`F."BcdCode" IN ('${u}')`),c&&y.push(`B."WhsCode" IN ('${c}')`),l&&y.push(`D."BinCode" IN ('${l}')`),y.length&&(a=`${a} AND ${y.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',a=a+s+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+a)}else if(e.params.type==="available-item-qty-price-with-pricelist"){a=le.binsAndItemQuantityInWarehouseWithPriceList,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(p),r.push(g);let y=[];i&&y.push(`A."ItemCode" IN ('${i}')`),u&&y.push(`F."BcdCode" IN ('${u}')`),c&&y.push(`B."WhsCode" IN ('${c}')`),l&&y.push(`D."BinCode" IN ('${l}')`),y.length&&(a=`${a} AND ${y.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',a=a+s+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+a)}else{a=le.binsList;let y=[];c&&y.push(`T0."WhsCode" IN ('${c}')`),y.length&&(a=`${a} WHERE ${y.join(" AND ")} ORDER BY T0."BinCode" ASC`)}if(e.query.pageNum&&e.query.pageSize){let y=e.query.pageNum,C=e.query.pageSize,h=(y-1)*C,B=y*C;o=" LIMIT ? OFFSET ? ",r=[C,h]}try{let y=Ie.executeWithValues(a,r);t.send(y)}catch(y){t.status(500).send({message:y.message})}},gT=async(e,t)=>{try{let o=await oT(e.query);t.send(o)}catch(o){t.status(500).send({message:o.message})}},TT=async(e,t)=>{try{console.log("getTimYardItemInfo: ",e.query);let o=[];e.query.isStockCounter==="true"?o=await nT(e.query):o=await sT(e.query),console.log("getTimYardItemInfo: "+JSON.stringify(o)),t.send(o)}catch(o){t.status(500).send({message:o.message})}},hT=async(e,t)=>{console.log("req.query"+JSON.stringify(e.query));try{let o=Ie.executeWithValues(le.binsListForItem,[e.query.warehouseCode,e.query.itemCode]);t.send(o)}catch(o){console.log("getBins - error: "+JSON.stringify(o.message)),next(o)}};ni.exports={getDocEntry:aT,getServerDateTime:iT,getUserBranches:lT,getFreightList:cT,getItemsList:dT,getPortalModules:uT,getDraftsCount:pT,getItemCountInWarehouse:mT,getBinsAndItemQtyForWarehouse:yT,getBatchSerialNoInfo:gT,getTimYardItemInfo:TT,getBinListbyItem:hT}});var ps=d((SA,ii)=>{var CT="Temporary password",fT=e=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Forgot Password</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                    
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
    padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                      <a class="" href="https://www.client.com/" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
    #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="73" />
                                    </a>
                                  </td>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
    padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                      <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="130" />
                           </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>Forgot your password?</span></h1>
  
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
   padding-bottom: 9px; padding-left: 18px;' valign="top">
    Not to worry, we got you! Here is your temporary password, you will be prompted to change it when signing in.
                                    <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">${e}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
    padding-right:48px; padding-bottom:24px; padding-left:48px; text-align: center" valign="middle">
                    Log into <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
   0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Didn't request this change?</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
   If you didn't request a new password please contact your administrator
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;ii.exports={subject:CT,getMailBody:fT}});var wo=d((IA,li)=>{var ms=require("../node_modules/bcrypt/bcrypt.js"),ST=async e=>{try{let o=await ms.genSalt(10);return await ms.hash(e,o)}catch(o){throw o}},IT=async(e,t)=>{let o=!1;try{o=await ms.compare(e,t)}catch(r){console.log("Bcrypt error - comparePassword: "+r)}finally{return o}};li.exports={generateHash:ST,comparePassword:IT}});var ys=d((DA,ci)=>{var DT=()=>{let t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";let o="";for(let r=0;r<8;r++)o+=t.charAt(Math.floor(Math.random()*t.length));return o};ci.exports={generatePassword:DT}});var pi=d(ui=>{var{dbCreds:di}=f();ui.selectSalesEmployeeForUser=`SELECT T0."USER_CODE", T1."SalePerson" "SlpCode"
  FROM ${di.CompanyDB}.OUSR T0, ${di.CompanyDB}.OUDG T1
WHERE T0."DfltsGroup" = T1."Code"
  AND T0."INTERNAL_K" = ?`});var Wt=d((NA,mi)=>{var ke=S(),nt=f(),{generatePassword:ET}=ys(),{generateHash:NT}=wo(),{selectSalesEmployeeForUser:AT}=pi(),RT=e=>{try{return ke.executeWithValues(AT,[e])}catch(t){throw console.log("getSalesEmployeeForUser - controller - error: "+JSON.stringify(t.message)),t}},gs=e=>{let t=`${nt.selectUsersInUserGroup} '%${e}%' ORDER BY T0."U_NAME" ASC`;try{let o=ke.executeWithValues(t);return Array.isArray(o)&&o.length>0?o:void 0}catch(o){throw o}},bT=e=>{try{let t=ke.executeWithValues(nt.selectUserGroupInUser,e);return console.log("getUserGroupByUser- rows: "+JSON.stringify(t)),Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},OT=e=>{try{let t=gs(e);if(console.log("userRC: ",JSON.stringify(t)),Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.U_UserId)}),o}return}catch(t){throw t}},UT=e=>{try{let t=gs(e);if(Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.UserName)}),o}return}catch(t){throw t}},xT=e=>{try{let t=ke.executeWithValues(nt.selectUserInfo,e);return Array.isArray(t)&&t.length>0?t[0]:void 0}catch(t){throw t}},wT=e=>{try{let t=ke.executeWithValues(nt.getUserPermissionsForAllModules,e);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},LT=(e,t)=>{try{let o=ke.executeWithValues(nt.validateUserEmail,[e,t]);return Array.isArray(o)&&o.length>0?o[0]:void 0}catch(o){throw o}},vT=async e=>{try{let t=ET(),o=await NT(t);return ke.executeWithValues(nt.updatePortalPassword,[o,"Y",e])>0?t:void 0}catch(t){throw t}};mi.exports={getUserInfo:xT,getUserPermissions:wT,getUsersByUserGroup:gs,getUserGroupByUser:bT,getUserIDsByUserGroup:OT,getUserNamesByUserGroup:UT,getUserInfoWithUserNameMail:LT,setTemporaryPassword:vT,getSalesEmployeeForUser:RT}});var Lo=d((AA,yi)=>{var{EntitySchema:_T}=require("../node_modules/typeorm/index.js");yi.exports=new _T({name:"StoreCounters",tableName:"StoreCounters",columns:{storeCounterId:{name:"StoreCounterId",primary:!0,type:"int",generated:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,unique:!1,nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,unique:!0,nullable:!1},userId:{name:"UserId",type:"int",nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",default:()=>"CURRENT_TIMESTAMP"},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeCounters"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"storeCounters"}}})});var vo=d((RA,gi)=>{var{EntitySchema:PT}=require("../node_modules/typeorm/index.js");gi.exports=new PT({name:"Stores",tableName:"Stores",columns:{storeId:{name:"StoreId",primary:!0,type:"int",generated:!0},storeName:{name:"StoreName",type:"nvarchar",length:200,unique:!0,nullable:!1},storeCode:{name:"StoreCode",type:"nvarchar",length:100,unique:!0,nullable:!0},location:{name:"Location",type:"nvarchar",length:400,unique:!1,nullable:!1},locationCode:{name:"LocationCode",type:"nvarchar",length:100,unique:!1,nullable:!0},defaultWarehouseCode:{name:"DefaultWarehouseCode",type:"nvarchar",length:100,unique:!1,nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}},relations:{storeWarehouses:{type:"one-to-many",target:"StoreWarehouses",inverseSide:"stores"},storeCounters:{type:"one-to-many",target:"StoreCounters",inverseSide:"stores"},storeUsers:{type:"one-to-many",target:"StoreUsers",inverseSide:"stores"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"stores"}}})});var Ts=d((bA,Ti)=>{var{EntitySchema:BT}=require("../node_modules/typeorm/index.js");Ti.exports=new BT({name:"CashDenominations",tableName:"CashDenominations",columns:{cashDenominationId:{name:"CashDenominationId",primary:!0,type:"int",generated:!0},storeId:{name:"StoreId",type:"int",nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},trxNumber:{name:"TrxNumber",type:"int",unique:!0,nullable:!0},trxType:{name:"TrxType",type:"nvarchar",length:100,unique:!1,nullable:!1},dateTime:{name:"DateTime",type:"timestamp",nullable:!0},_5cCoin:{name:"5cCoin",type:"int",default:0},_10cCoin:{name:"10cCoin",type:"int",default:0},_20cCoin:{name:"20cCoin",type:"int",default:0},_50cCoin:{name:"50cCoin",type:"int",default:0},_1$Coin:{name:"1DollarCoin",type:"int",default:0},_2$Coin:{name:"2DollarCoin",type:"int",default:0},_5$Note:{name:"5DollarNote",type:"int",default:0},_10$Note:{name:"10DollarNote",type:"int",default:0},_20$Note:{name:"20DollarNote",type:"int",default:0},_50$Note:{name:"50DollarNote",type:"int",default:0},_100$Note:{name:"100DollarNote",type:"int",default:0}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"cashDenominations"},storeCounters:{type:"many-to-one",target:"StoreCounters",joinColumn:{name:"StoreCounterId"},inverseSide:"cashDenominations"}}})});var hs=d((UA,hi)=>{var{recordState:OA}=T(),{EntitySchema:MT}=require("../node_modules/typeorm/index.js");hi.exports=new MT({name:"ParkedTransactions",tableName:"ParkedTransactions",columns:{parkedTransactionId:{name:"ParkedTransactionsId",primary:!0,type:"int",generated:!0},transactionType:{name:"TransactionType",type:"nvarchar",length:50},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!1},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!1},transactionRefNum:{name:"TransactionRefNum",type:"nvarchar",length:"100"},nextRefNum:{name:"NextRefNum",type:"int"},data:{name:"Data",type:"nclob",nullable:!1},parkedDateTime:{name:"ParkedDateTime",type:"timestamp"}}})});var Cs=d((xA,Ci)=>{var{EntitySchema:FT}=require("../node_modules/typeorm/index.js");Ci.exports=new FT({name:"QCItemGroup",tableName:"QCItemGroup",columns:{itemGroupId:{name:"ItemGroupId",primary:!0,type:"int",generated:!0},groupName:{name:"GroupName",type:"varchar",length:100,unique:!0,nullable:!1},description:{name:"Description",type:"varchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0}},relations:{itemGroupMembers:{type:"one-to-many",target:"QCItemGroupMembers",inverseSide:"itemGroup"}}})});var fs=d((wA,fi)=>{var{EntitySchema:WT}=require("../node_modules/typeorm/index.js");fi.exports=new WT({name:"QCItemGroupMembers",tableName:"QCItemGroupMembers",columns:{itemGroupMemberId:{name:"ItemGroupMemberId",primary:!0,type:"int",generated:!0},itemCode:{name:"ItemCode",type:"varchar",length:100,unique:!0},itemName:{name:"ItemName",type:"varchar",length:400,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0},itemGroupId:{name:"ItemGroupId",type:"int"}},relations:{itemGroup:{type:"many-to-one",target:"QCItemGroup",onDelete:"CASCADE",joinColumn:{name:"ItemGroupId"},inverseSide:"itemGroupMembers"}}})});var _o=d((LA,Si)=>{var{EntitySchema:$T}=require("../node_modules/typeorm/index.js");Si.exports=new $T({name:"StoreUsers",tableName:"StoreUsers",columns:{storeUserId:{name:"storeUserId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int",nullable:!1},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeUsers"}}})});var Ss=d((vA,Ii)=>{var{EntitySchema:kT}=require("../node_modules/typeorm/index.js");Ii.exports=new kT({name:"StoreWarehouses",tableName:"StoreWarehouses",columns:{storeWarehouseId:{name:"StoreWarehouseId",primary:!0,type:"int",generated:!0},warehouseCode:{name:"WarehouseCode",type:"nvarchar",length:100,unique:!1},warehouseName:{name:"WarehouseName",type:"nvarchar",length:400,unique:!1,nullable:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeWarehouses"}}})});var Is=d((_A,Di)=>{var{EntitySchema:qT}=require("../node_modules/typeorm/index.js");Di.exports=new qT({name:"UserGroups",tableName:"UserGroups",columns:{userGroupId:{name:"UserGroupId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},groupId:{name:"GroupId",type:"int"},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}}})});var Po=d((PA,Ei)=>{var{recordState:HT}=T(),{EntitySchema:JT}=require("../node_modules/typeorm/index.js");Ei.exports=new JT({name:"UserSessionLog",tableName:"UserSessionLog",columns:{userSessionLogId:{name:"UserSessionLogId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,nullable:!0},clientIp:{name:"ClientIp",type:"varchar",length:"100"},sessionStatus:{name:"SessionStatus",type:"nvarchar",length:50,default:HT.ACTIVE,unique:!1,nullable:!1},loginTime:{name:"LoginTime",type:"timestamp"},logoutTime:{name:"LogoutTime",type:"timestamp",default:"",nullable:!0}}})});var J=d((BA,Ai)=>{var zT=require("../node_modules/typeorm/index.js"),jT=Lo(),VT=vo(),GT=Ts(),QT=hs(),YT=Cs(),KT=fs(),XT=_o(),ZT=Ss(),eh=Is(),th=Po(),Ni=new zT.DataSource({type:process.env.TYPEORM_TYPE,host:process.env.HANA_HOST,port:process.env.HANA_PORT,username:process.env.HANA_USER,password:process.env.HANA_PASSWORD,schema:process.env.SERVICE_LAYER_COMPANYDB,synchronize:!0,logging:["query"],entities:[jT,VT,GT,QT,YT,KT,XT,ZT,eh,th]});console.log("Before typeORM initializes...");Ni.initialize().then(()=>{console.info("Database has been initialized by TypeORM!")}).catch(e=>{console.error("Failed to initialize db using TypeORM!"),console.log(e)});Ai.exports={dataSource:Ni}});var kt=d($t=>{var{dataSource:Bo}=J(),Mo=Po(),at="userSessionLogId",oh="loginTime",{recordState:MA}=T();$t.createUserSessionLog=async e=>{try{return await Bo.getRepository(Mo).save(e)}catch(t){throw t}};$t.getUserSessionLog=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[at]=e.id,delete e.id);try{let o=Bo.getRepository(Mo);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[oh]:"DESC"}})}catch(o){throw o}};$t.updateUserSessionLog=async(e,t)=>{try{let o=Bo.getRepository(Mo);t[at]&&(e||(e=t[at]),delete t[at]);let r={};return Object.keys(t).length>0&&(r=await o.update({[at]:e},t)),r}catch(o){throw o}};$t.deleteUserSessionLog=async e=>{try{return await Bo.getRepository(Mo).delete({[at]:e})}catch(t){throw t}}});var qe=d(Ue=>{var{dataSource:Fo}=J(),Wo=Ss(),rh="storeWarehouseId",sh="warehouseCode";Ue.parentPrimaryKey="storeId";Ue.createStoreWarehouse=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[Ue.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[Ue.parentPrimaryKey]:t,createdBy:o,createdAt:r},await Fo.getRepository(Wo).save(s)}catch(s){throw s}};Ue.getStoreWarehouse=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[rh]=e.id,delete e.id);try{let o=Fo.getRepository(Wo);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[sh]:"ASC"}})}catch(o){throw o}};Ue.updateStoreWarehouse=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await Fo.getRepository(Wo).save(r)}catch(r){throw r}};Ue.deleteStoreWarehouse=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await Fo.getRepository(Wo).delete(t)}catch(o){throw o}}});var qo=d(qt=>{var{dataSource:$o}=J(),{createStoreWarehouse:bi,updateStoreWarehouse:nh}=qe(),ko=vo(),it="storeId",ah="storeName",Ri="storeWarehouseId,";qt.createStore=async e=>{try{let o=await $o.getRepository(ko).save(e);if(e.warehouses){let r=await bi(e.warehouses,o[it]);o.warehouses=r}return o}catch(t){throw t}};qt.getStore=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[it]=e.id,delete e.id);try{let o=$o.getRepository(ko);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[ah]:"ASC"}})}catch(o){throw o}};qt.updateStore=async(e,t)=>{try{let o=$o.getRepository(ko);t[it]&&delete t[it];let r;t.warehouses&&(r=t.warehouses,delete t.warehouses);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[it]:e},t)),r){let n=[];if(r.forEach(async a=>{a[Ri]?await nh(a[Ri],a):n.push(a)}),n.length>0){let a=await bi(n,e);s.warehouses=a}}return s}catch(o){throw o}};qt.deleteStore=async e=>{try{return await $o.getRepository(ko).delete({[it]:e})}catch(t){throw t}}});var Ds=d(xe=>{var{dataSource:Ho}=J(),Jo=Lo(),ih="storeCounterId",lh="counterName";xe.parentPrimaryKey="storeId";xe.createStoreCounter=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[xe.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[xe.parentPrimaryKey]:t,createdBy:o,createdAt:r},await Ho.getRepository(Jo).save(s)}catch(s){throw s}};xe.getStoreCounter=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[ih]=e.id,delete e.id);try{let o=Ho.getRepository(Jo);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[lh]:"ASC"}})}catch(o){throw o}};xe.updateStoreCounter=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await Ho.getRepository(Jo).save(r)}catch(r){throw r}};xe.deleteStoreCounter=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await Ho.getRepository(Jo).delete(t)}catch(o){throw o}}});var Es=d(we=>{var{dataSource:zo}=J(),jo=_o(),ch="storeUserId",dh="userName";we.parentPrimaryKey="storeId";we.createStoreUser=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[we.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[we.parentPrimaryKey]:t,createdBy:o,createdAt:r},await zo.getRepository(jo).save(s)}catch(s){throw s}};we.getStoreUser=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[ch]=e.id,delete e.id);try{let o=zo.getRepository(jo);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[dh]:"ASC"}})}catch(o){throw o}};we.updateStoreUser=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await zo.getRepository(jo).save(r)}catch(r){throw r}};we.deleteStoreUser=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await zo.getRepository(jo).delete(t)}catch(o){throw o}}});var Ns=d(Oi=>{var uh=qo(),ph=qe(),mh=Ds(),yh=Es();Oi.getUserStoreInfo=async e=>{try{let t=null,o=null,r="";counterName="";let s="",n="",a="",i=await mh.getStoreCounter({userId:e});if(Array.isArray(i)&&i.length>0&&(t=i[0].storeId,o=i[0].storeCounterId,r=i[0].counterCode,counterName=i[0].counterName),!t){let c=await yh.getStoreUser({userId:e});Array.isArray(c)&&c.length>0&&(t=c[0].storeId)}if(t){let c=await uh.getStore({storeId:t});if(Array.isArray(c)&&c.length>0){s=c[0].locationCode,n=c[0].location;let l=await ph.getStoreWarehouse({storeId:t});Array.isArray(l)&&l.length>0&&(a=l[0].warehouseCode)}}return{storeId:t,storeCounterId:o,counterCode:r,counterName,locationCode:s,storeLocation:n,storeWHCode:a}}catch(t){throw t}}});var xi=d(Ui=>{var{dataSource:gh}=J(),Th=vo(),JA=Lo(),zA=_o();Ui.isUserAssignedToCounter=async(e,t)=>{try{let r=await gh.getRepository(Th).createQueryBuilder("store").innerJoin("store.storeUsers","user").innerJoin("store.storeCounters","counter").where("user.userId = :userId",{userId:e}).andWhere("counter.storeCounterId = :counterId",{counterId:t}).getOne();return console.log("isUserAssignedToCounter - result: ",r),!!r}catch(o){throw o}}});var Li=d(wi=>{var{Between:hh}=require("../node_modules/typeorm/index.js"),{dataSource:Ch}=J(),fh=Po(),{recordState:Sh}=T();wi.isCounterOccupied=async e=>{let t=Ch.getRepository(fh),o=new Date;o.setUTCHours(0,0,0,0);let r=new Date;r.setUTCHours(23,59,59,999);let s=await t.findOne({where:{storeCounterId:e,loginTime:hh(o.toISOString(),r.toISOString()),sessionStatus:Sh.ACTIVE}});return console.log("isCounterOccupied - existingSession: ",s),!!s}});var Vo=d(vi=>{var{isUserAssignedToCounter:Ih}=xi(),{isCounterOccupied:Dh}=Li();vi.canAssignUserToCounter=async(e,t)=>{try{if(await Ih(e,t)){if(await Dh(t))throw new Error("Counter already occupied by another user. Make sure you have selected the correct counter!");return!0}else throw new Error("User doesnt have access to this Counter. Please contact Admin!")}catch(o){throw o}}});var _i=d(Rs=>{var{dbCreds:As}=f();Rs.selectLocations=`SELECT T0."Code", T0."Location" FROM ${As.CompanyDB}.OLCT T0`;Rs.locationDefaults=`SELECT T0."Code" AS "Location", T0."U_AccountCode" AS "AccountCode", T0."U_OTCCardCode", T0."U_CODCardCode",
    T0."U_LocName", T0."U_LocAddress", T0."U_Store", T0."U_Phone", T0."U_Website", T0."U_Email", T1."U_Branch" AS "Branch"
    FROM ${As.CompanyDB}."@LOCACCOUNTMAPPING" T0
    INNER JOIN ${As.CompanyDB}."OLCT" T1 ON T0."Code" = T1."Location"
  WHERE UPPER(T0."Code") = UPPER(?)`});var Ht=d(bs=>{var Pi=S(),Bi=_i();bs.getLocations=()=>{try{return Pi.executeWithValues(Bi.selectLocations)}catch(e){throw console.log("getLocations - controller - error: "+JSON.stringify(e.message)),e}};bs.getLocationDefaults=e=>{try{let t=Pi.executeWithValues(Bi.locationDefaults,[e]);return console.log("getLocationDefaults- rows: "+JSON.stringify(t)),t}catch(t){throw console.log("getLocationDefaults - controller - error: "+JSON.stringify(t.message)),t}}});var qi=d((XA,ki)=>{var z=S(),q=f(),{getRandomNo:Mi,formatDate:Eh,getClientHostname:Nh}=x(),Go=ps(),{sendMail:Fi}=ge(),{generateHash:Ah,comparePassword:Wi}=wo(),Te=Wt(),{createUserSessionLog:Rh}=kt(),{getUserStoreInfo:bh}=Ns(),{canAssignUserToCounter:KA}=Vo(),{getLocationDefaults:Oh}=Ht(),Uh=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=z.executeWithValues(q.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length){if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else if(console.log("rows[0].Password: "+s[0].Password),r=await Wi(e.body.password,s[0].Password),console.log("isUserAuthenticated: "+r),r)if(s[0].U_TempPasswordFlag==="Y")t.send({tempPasswordFlag:!0,UserName:s[0].UserName});else{let n=s[0].InternalKey,{storeId:a,storeCounterId:i,counterCode:c,counterName:l,locationCode:u,storeLocation:p,storeWHCode:g}=await bh(n);e.session.userId=n,e.session.userName=process.env.SERVICE_LAYER_USERNAME,e.session.password=process.env.SERVICE_LAYER_PASSWORD,e.session.slCookie="",e.session.slLoginTime="",e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName;let y=await Nh(e);console.log("validateUserLogin SL - req.connection.remoteAddress: ",e.connection.remoteAddress),console.log("validateUserLogin SL - clientHost: ",y);let C="",h=await Te.getSalesEmployeeForUser(n);Array.isArray(h)&&h.length>0&&(C=h[0].SlpCode);let B="";if(p){let Q=await Oh(p);Array.isArray(Q)&&Q.length>0&&(B=Q[0])}let D="",Oe=await Te.getUserGroupByUser(n);Array.isArray(Oe)&&Oe.length>0&&(D=Oe[0].U_GroupName);let vt={userId:n,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:C,storeId:a||null,storeCounterId:i||null,counterCode:c,counterName:l,locationCode:u,storeLocation:p,locationDefaults:B,clientIp:y,loginTime:Eh(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},Oo=await Rh(vt);e.session.userSessionLog=Oo,e.session.storeWHCode=g,e.session.userSessionLog.locationCode=u;let _t={InternalKey:n,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:Oo,storeWHCode:g,userGroup:D,permissions:[]};try{let Q=Te.getUserPermissions(s[0].InternalKey);Q&&(e.session.permissions=Q,_t.permissions=Q),t.send(_t)}catch(Q){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(Q)),t.status(500).send({message:Q.message+". Unable to get User Permissions"})}}}r||(console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"}))}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}},xh=async(e,t,o)=>{try{let r=Te.getUserInfo(e.body.internalKey);if(r){let s=await Te.setTemporaryPassword(e.body.internalKey);if(s){let n=Go.getMailBody(s);await Fi(r.Email,Go.subject,n)?console.log("Temporary password has been sent to the mailid"):console.log("Unable to send temporary password to the mailid!"),t.status(200).send({tempPassword:s})}else t.status(500).send({message:"Unable to set temp password!"})}else console.log("Invalid user details!"),t.status(500).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("generateTempPassword - controller - error: "+JSON.stringify(r)),o(r)}},wh=async(e,t,o)=>{try{let r=Te.getUserInfoWithUserNameMail(e.body.userName,e.body.mailId);if(console.log("handleForgotPassword %s",JSON.stringify(r)),r)if(r.U_PortalAccountLocked==="Y")console.log("userRec.U_PortalAccountLocked: "+r.U_PortalAccountLocked),t.status(401).send({message:"Your account is locked. Please contact Admin!"});else{let s=await Te.setTemporaryPassword(r.InternalKey);if(s){let n=Go.getMailBody(s);await Fi(e.body.mailId,Go.subject,n)?t.status(200).send({message:"Temporary password has been sent to your email"}):t.status(200).send({message:"Unable to send temporary password to your mail. Please contact Admin!"})}}else console.log("Invalid user details!"),t.status(401).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("handleForgotPassword - controller - error: "+JSON.stringify(r)),t.status(500).send({message:r.message})}},Lh=async(e,t)=>{let o={},r=!1,s=await Ah(e.body.newPassword);try{let n=z.executeWithValues(q.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(n)),Array.isArray(n)&&n.length&&(r=await Wi(e.body.password,n[0].Password),r))try{let a=z.executeWithValues(q.updatePortalPassword,[s,"N",n[0].InternalKey]);if(console.log("updatePortalPassword %s",JSON.stringify(a)),a>0)if(e.body.screen&&e.body.screen==="Login"){e.session.userName=n[0].UserName,e.session.userId=n[0].InternalKey,o={InternalKey:n[0].InternalKey,UserName:n[0].UserName,permissions:[]};try{let i=Te.getUserPermissions(n[0].InternalKey);console.log("validateUserLogin - getUserPermissionsForAllModules %s",i),i&&(e.session.permissions=i,o.permissions=i),t.send(o)}catch(i){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(i)),t.status(500).send({message:i.message+". Unable to get User Permissions"})}}else t.status(200).send({message:"Password updated successfully"})}catch(a){console.log("updatePortalPassword - error: "+JSON.stringify(a)),t.status(500).send({message:"Password update failed!"})}r||(console.log("Invalid username/password!"),t.status(401).send({message:"Invalid username/password!"}))}catch(n){console.log("validateUserLogin - controller - error: "+JSON.stringify(n)),t.status(500).send({message:n.message})}},vh=(e,t)=>{try{let o=z.executeWithValues(q.allUsers,[e.query.isPortalUser]);t.send(o)}catch(o){console.log("getAllUsers - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},_h=(e,t)=>{try{let o=Te.getUsersByUserGroup(e.params.groupName);t.send(o)}catch(o){console.log("getUsersByUserGroup - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},Ph=(e,t)=>{try{z.executeQuery(q.portalUsers,(o,r)=>{if(o)throw o;console.log("getPortalUsersList %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUsersList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},Bh=(e,t)=>{try{z.executeQuery(q.portalUserGroups,(o,r)=>{if(o)throw o;console.log("getAllPortalGroups %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getAllPortalGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},Mh=(e,t)=>{try{$i(o=>{console.log("getPortalUserGroups - userGroups: "+JSON.stringify(o)),t.send(o)})}catch(o){console.log("getPortalUserGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},$i=e=>{try{z.executeQuery(q.userGroupsWithPermissions,(t,o)=>{if(t)throw t;e(o)})}catch(t){throw console.log("getAllUserGroupsWithPermissions - controller - error: "+JSON.stringify(t)),t}},Fh=(e,t,o)=>{try{let r=Te.getUserPermissions(e.params.userId);t.send(r)}catch(r){console.log("getUserPermissions - controller - error: "+JSON.stringify(r)),o(r)}},Wh=(e,t)=>{console.log("req.params: %s",JSON.stringify(e.params));try{z.executeQuery(`${q.userPermissionsForGivenGroup}'${e.params.id}'`,(o,r)=>{if(o)throw o;console.log("getPortalUserPermissions %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUserPermissions - controller - error: "+JSON.stringify(o)),next(o)}},$h=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s=0,n=[],a=[],i=q.updateUserGroup,c=e.body.U_GroupId;c||(c=parseInt(Mi()),i=q.insertUserGroup);let l=[c,e.body.U_GroupName,e.body.U_GroupName,c];console.log("userGroupValues: "+l),e.body.permissionsList.forEach(u=>{r=u.U_PermissionId,r?a.push([r,r,c,u.U_ModuleId,u.U_AllowRead,u.U_AllowWrite,u.U_AllowCancel,u.U_AllowCreate,r]):(r=parseInt(Mi()),n.push([r,r,c,u.U_ModuleId,u.U_AllowRead,u.U_AllowWrite,u.U_AllowCancel,u.U_AllowCreate,r]))});try{if(z.executeWithValues(i,l)){let p=z.executeBatchInsertUpdate(q.insertPermissions,n);s+=p,console.log("insertPermissions insertRows: "+p);let g=z.executeBatchInsertUpdate(q.updatePermissions,a);s+=g,console.log("updatePermissions updateRows: "+g),console.log("createUpdateUserGroupWithPermissions result: "+s),s>0?$i(y=>{t.send(y)}):t.status(201).send({})}else console.log("createUpdateUserGroupWithPermissions -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"})}catch(u){console.log("createUpdateUserGroupWithPermissions - controller - error: "+JSON.stringify(u)),o(u)}},kh=(e,t,o)=>{console.log("req.param.id: %s",e.params.id);try{z.executeQuery(`${q.usersInGivenGroup}'${e.params.id}'`,(r,s)=>{if(r)throw r;if(Array.isArray(s)&&s.length){let n=s.map(a=>a.UserName);t.status(400).send({users:n,error:"Please remove the users from this Group to delete it"})}else z.executeQuery(`${q.deletePermissions}'${e.params.id}'`,(n,a)=>{if(n)throw n;console.log("deletePermission rows: "+a),z.executeQuery(`${q.deleteUserGroup}'${e.params.id}'`,(i,c)=>{i?t.status(500).send({err:i}):c>0?t.status(200).send("Success!"):(console.log("deletePortalUserGroup %s",c),t.status(201).send({rows:c}))})})})}catch(r){console.log("deletePortalUserGroup - controller - error: "+JSON.stringify(r)),t.status(500).send({error:r.message})}};ki.exports={validateUserLogin:Uh,generateTempPassword:xh,updatePortalPassword:Lh,handleForgotPassword:wh,getAllUsers:vh,getUsersByUserGroup:_h,getAllPortalGroups:Bh,getPortalUserGroups:Mh,getPortalUserPermissions:Wh,getUserPermissions:Fh,getPortalUsersList:Ph,createUpdateUserGroupWithPermissions:$h,deletePortalUserGroup:kh}});var Ji=d(Hi=>{var{setBatchSerialReservedCust:qh}=ds();Hi.patch=(e,t)=>{console.log("*** setBatchSerialReservedCust - req.params: "+JSON.stringify(e.params));try{let o=qh(e.params.batchNumber,e.params.serialNumber,e.params.customerCode);console.log("setBatchSerialReservedCust %s",JSON.stringify(o)),t.send(o)}catch(o){console.log("setBatchSerialReservedCust - controller - error: "+JSON.stringify(o));let r="Something went wrong. Please try again or contact your administrator";o.message&&(r=o.message),t.status(500).send({message:r})}}});var ji=d((tR,zi)=>{var $=S(),F=f(),{getRandomNo:eR}=x(),H={TEMPLATE:"TEMPLATE",ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER"},He=[],Le=[],Os=(e,t)=>{console.log("BEFORE: approverPrimaryKeyList: "+JSON.stringify(Le)),console.log("docEntry: "+t);let o,r=[],s=1,n="LineId";e===H.TEMPLATE?(o=F.allHeaderIds,n="DocEntry"):e===H.APPROVER?o=F.allApproverIds:e===H.ORIGINATOR&&(o=F.allOriginatorIds);try{if(e===H.ORIGINATOR)if(He.length>0)r=He;else if(r=$.executeWithValues(o,t),r.length>0)He=r;else return He.push({LineId:s}),s;else if(e===H.APPROVER)if(Le.length>0)r=Le;else if(r=$.executeWithValues(o,t),r.length>0)Le=r;else return Le.push({LineId:s}),s;else r=$.executeWithValues(o,t);console.log("primaryKeyList %s",JSON.stringify(r));let a=r.length;if(a){if(r[a-1][n]===a)s=a+1,e===H.ORIGINATOR?He.push({LineId:s}):e===H.APPROVER&&Le.push({LineId:s});else if(a>0){for(let i=0;i<r[a-1][n];i++)if(r[i][n]!=i+1){s=i+1,e===H.ORIGINATOR?He.splice(i,0,{LineId:s}):e===H.APPROVER&&Le.splice(i,0,{LineId:s});break}}}return console.log("AFTER: approverPrimaryKeyList: "+JSON.stringify(Le)),console.log("primaryKey: "+s),s}catch(a){throw a}},Us=()=>{let e=[],t=[],o=[];try{if(e=$.executeWithValues(F.selectApprovalHeader),console.log("approvalHeaderList %s",JSON.stringify(e)),e.length){let r=[],s=[];t=$.executeWithValues(F.selectApprovalOriginator),console.log("approvalOriginatorList.length: "+t.length),o=$.executeWithValues(F.selectApprovalApprover),console.log("approvalApproverList.length: "+o.length),e.forEach(n=>{r=[],s=[],t.forEach(a=>{n.DocEntry===a.DocEntry&&r.push(a)}),n.Originator=r,o.forEach(a=>{n.DocEntry===a.DocEntry&&s.push(a)}),n.Approver=s})}}catch(r){throw r}finally{return e}},Hh=(e,t)=>{try{t.send(Us())}catch(o){console.log("getApprovalTemplates - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},Jh=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s,n=[],a=[],i=[],c=[],l=F.updateApprovalHeader,u=e.body.activeApprovalTemplateId;u||(u=Os(H.TEMPLATE),l=F.insertApprovalHeader);let p=[e.body.templateName,e.body.description,e.body.moduleId,e.body.terms,e.body.noOfApprovals,e.body.multiLevelApproval,e.body.isActive,u];console.log("approvalHeaderValues: "+p);let g;e.body.activeApprovalApproverList.forEach(y=>{r=y.LineId,g=isNaN(parseInt(y.U_ApprovalLevel,10))?null:parseInt(y.U_ApprovalLevel,10),r?(a.push([y.U_UserId,g,u,r]),console.log("approverValuesForUpdate: "+a)):(r=Os(H.APPROVER,u),n.push([y.U_UserId,g,u,r]),console.log("approverValuesForInsert: "+n))}),e.body.activeApprovalOriginatorList.forEach(y=>{s=y.LineId,s?(c.push([y.U_UserId,u,s]),console.log("originatorValuesForUpdate: "+c)):(s=Os(H.ORIGINATOR,u),i.push([y.U_UserId,u,s]),console.log("originatorValuesForInsert: "+i))});try{let y=$.executeWithValues(l,p),C=0,h=0,B=0,D=0;y?(n.length>0&&(C=$.executeBatchInsertUpdate(F.insertApprovalApprover,n)),console.log("insertApproverRows: "+C),a.length>0&&(h=$.executeBatchInsertUpdate(F.updateApprovalApprover,a)),console.log("updateApproverRows: "+h),i.length>0&&(B=$.executeBatchInsertUpdate(F.insertApprovalOriginator,i)),console.log("insertOriginatorRows: "+B),c.length>0&&(D=$.executeBatchInsertUpdate(F.updateApprovalOriginator,c)),console.log("updateOriginatorRows: "+D),C+h+B+D>0?t.status(200).send(Us()):t.status(201).send({})):(console.log("createUpdateApprovalTemplate -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"}))}catch(y){console.log("createUpdateApprovalTemplate - controller - error: "+y.message),t.status(500).send({message:y.message})}finally{He=[]}},zh=(e,t,o)=>{console.log("req.param.templateId: %s",e.params.templateId),console.log("req.param.lineId: %s",e.params.lineId),console.log("req.param.recordType: %s",e.params.recordType);let r=0,s=0,n=0;try{e.params.recordType==H.TEMPLATE?(r=$.executeWithValues(F.deleteApprovalTemplate3,e.params.templateId),s=$.executeWithValues(F.deleteApprovalTemplate2,e.params.templateId),n=$.executeWithValues(F.deleteApprovalTemplate1,e.params.templateId)):e.params.recordType==H.APPROVER?s=$.executeWithValues(F.deleteApprovalApprover,[e.params.templateId,e.params.lineId]):e.params.recordType==H.ORIGINATOR&&(r=$.executeWithValues(F.deleteApprovalOriginator,[e.params.templateId,e.params.lineId])),console.log("templateRows: "+n+" originatorRows: "+r+"approverRows: "+s),n>0||r>0||s>0?t.status(200).send(Us()):t.status(201).send({})}catch(a){console.log("deleteApprovalTemplate - controller - error: "+JSON.stringify(a)),t.status(500).send({message:a.message})}};zi.exports={getApprovalTemplates:Hh,createUpdateApprovalTemplate:Jh,deleteApprovalTemplate:zh}});var N=d((rR,Vi)=>{var{httpStatusCodes:xs}=T(),{formatDate:oR}=x(),jh=(e,t,o)=>{let{permissions:r,userName:s,userId:n}=e.session;!e.url.endsWith("/login")&&!e.url.endsWith("/update-password")&&!e.url.endsWith("/forgot-password")&&(!s||!n||!Array.isArray(r)||r.length===0)?(console.log("sessionValidator - session is INVALID"),t.status(xs.UNAUTHORIZED).json({message:"Invalid session. Login to continue!"})):(console.log("sessionValidator - session is VALID!"),o())},Vh=(e,t)=>[(o,r,s)=>{Array.isArray(e)||(e=[e]);try{let n=!1,{permissions:a}=o.session;Array.isArray(a)&&a.length&&a.find(i=>e.includes(i.U_ModuleName)&&i[t]==="Y")&&(n=!0),n?s():r.status(xs.FORBIDDEN).send({message:"User unauthorized to perform the operation"})}catch(n){console.log("checkUserPermission - controller - error: "+JSON.stringify(n)),r.status(xs.INTERNAL_SERVER_ERROR).send({message:n.message})}}];Vi.exports={sessionValidator:jh,checkUserPermission:Vh}});var Qi=d((sR,Gi)=>{var Gh=require("../node_modules/express/index.js"),ne=ai(),Y=qi(),Qh=Ji(),Qo=ji(),Yh=is(),Kh=cs(),{portalModules:ce,permissions:de}=T(),{checkUserPermission:ue}=N(),A=new Gh.Router;A.route("/server-date").get(ne.getServerDateTime);A.route("/get-docentry").get(ne.getDocEntry);A.route("/login").post(Y.validateUserLogin);A.route("/forgot-password").post(Y.handleForgotPassword);A.route("/update-password").patch(Y.updatePortalPassword);A.route("/temp-password").post(Y.generateTempPassword);A.route("/branch").get(ne.getUserBranches);A.route("/freights").get(ne.getFreightList);A.route("/item").get(ne.getItemsList);A.route("/item-qty-in-warehouse").get(ne.getItemCountInWarehouse);A.route("/bin-location/:type?").get(ne.getBinsAndItemQtyForWarehouse);A.route("/modules").get(ne.getPortalModules);A.route("/approval-template/:recordType?/:templateId?/:lineId?").get(ue(ce.APPROVAL,de.READ),Qo.getApprovalTemplates).put(ue(ce.APPROVAL,de.WRITE),Qo.createUpdateApprovalTemplate).post(ue(ce.APPROVAL,de.CREATE),Qo.createUpdateApprovalTemplate).delete(Qo.deleteApprovalTemplate);A.route("/users").get(Y.getAllUsers);A.route("/portal-users").get(Y.getPortalUsersList);A.route("/user-groups/:id?").get(ue(ce.USER_GROUP,de.READ),Y.getAllPortalGroups).put(ue(ce.USER_GROUP,de.WRITE),Y.createUpdateUserGroupWithPermissions).post(ue(ce.USER_GROUP,de.CREATE),Y.createUpdateUserGroupWithPermissions).delete(ue(ce.USER_GROUP,de.CANCEL),Y.deletePortalUserGroup);A.route("/user-groups/:id?/permissions").get(ue(ce.USER_GROUP,de.READ),Y.getPortalUserPermissions);A.get("/user-groups/:groupName/user",Y.getUsersByUserGroup);A.get("/user/:userId/permissions",Y.getUserPermissions);A.route("/stock-transfer-request/:type?/:recordType?/:docEntry?").get(ue(ce.STOCK_TRANSFER_REQUEST,de.READ)||ue(ce.STOCK_TRANSFER,de.CREATE),Yh.getTransferRequestRecords);A.route("/stock-transfer/:type?/:recordType?/:docEntry?").get(ue(ce.STOCK_TRANSFER,de.READ),Kh.getTransferRecords);A.route("/count").get(ne.getDraftsCount);A.route("/batch-serial-info").get(ne.getBatchSerialNoInfo).patch(Qh.patch);A.route("/tim-yard-items").get(ne.getTimYardItemInfo);A.route("/bincode-info").get(ne.getBinListbyItem);Gi.exports=A});var k=d((nR,Ki)=>{var Xh=require("../node_modules/axios/index.js"),Zh=require("../node_modules/axios-retry/dist/cjs/index.js").default,eC=require("https"),Yi=Xh.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new eC.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}});Zh(Yi,{retries:3});Ki.exports={serviceLayerAPI:Yi}});var j=d((aR,ol)=>{var{serviceLayerAPI:el}=k(),{dbCreds:Ko,serviceLayerSessionMaxAge:Xi}=f(),{getTimeDifference:Zi}=x(),Yo=null,Jt=null,tC=async e=>{try{if(Yo&&Jt){let o=Zi(new Date,new Date(Jt));if(console.log(`*** getSLConnection - in-memory cookie exists, age: ${o} min`),o<Xi)return console.log("*** getSLConnection - returning IN-MEMORY CACHED SL cookie"),Yo}if(e.session.slCookie&&e.session.slLoginTime){let o=Zi(new Date,new Date(e.session.slLoginTime));if(console.log(`*** getSLConnection - session cookie exists, age: ${o} min`),o<Xi)return console.log("*** getSLConnection - returning SESSION CACHED SL cookie"),Yo=e.session.slCookie,Jt=e.session.slLoginTime,e.session.slCookie}console.log("*** getSLConnection - NO cached cookie or expired, RE-AUTHENTICATING with dbCreds...");let t=await tl(Ko.UserName,Ko.Password);return Yo=t,Jt=new Date().toISOString(),e.session.slCookie=t,e.session.slLoginTime=Jt,t}catch(t){throw t}},tl=async(e,t)=>{let o=null;try{let r=await el.post("Login?prefer=return-no-content",{CompanyDB:Ko.CompanyDB,UserName:e,Password:t});return console.log(`***Login - openSLConnection - response: ${r}`),o=r.headers["set-cookie"],console.log("cookie: "+o),console.log("response.data.SessionId: "+r.data.SessionId),o}catch(r){throw console.log("openSLConnection - error:",r?.response?.data||r.message),r}},oC=async()=>{let e=null;try{let t=await el.post("Login?prefer=return-no-content",Ko);return console.log(`***Login - openDBConnection - response: ${t}`),e=t.headers["set-cookie"],console.log("cookie: "+e),console.log("response.data.SessionId: "+t.data.SessionId),e}catch(t){throw console.log("openDBConnection - error:",t?.response?.data||t.message),t}};ol.exports={openDBConnection:oC,openSLConnection:tl,getSLConnection:tC}});var ws=d((iR,rl)=>{var rC="POS - Welcome mail",sC=(e,t,o)=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome email</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
    padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                      <a class="" href="https://www.client.com/" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
    #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="73" />
                                    </a>
                                  </td>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
    padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                      <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="130" />
                           </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>Welcome ${t}!</span></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
    <b>${e}</b> has invited you to POS, a Point of Sale app to streamline your tasks. Please use the below temporary password to sign in. 
                                      <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">${o}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
    padding-right:48px; padding-bottom:24px; padding-left:48px; text-align: center" valign="middle">
                    Log into <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
    0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Change the password</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
    You will be prompted to change the password when you sign in.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;rl.exports={subject:rC,getMailBody:sC}});var il=d((lR,al)=>{var{serviceLayerAPI:sl}=k(),{getSLConnection:nC}=j(),{generatePassword:aC}=ys(),{sendMail:iC}=ge(),nl=ws(),lC=async(e,t,o)=>{console.log(`updateUserDetails - req.body: ${JSON.stringify(e.body)}`);let r,s={eMail:e.body.eMail,MobilePhoneNumber:e.body.MobilePhoneNumber,U_PortalUser:e.body.U_PortalUser,U_PortalGroupId:e.body.U_PortalGroupId,U_PortalAccountLocked:e.body.U_PortalAccountLocked,U_PortalBadLoginCount:e.body.U_PortalBadLoginCount};e.body.isNewUser&&(r=aC(),s.U_TempPasswordFlag="Y");let n;try{n=await nC(e)}catch(a){console.log("updateUserDetails: "+JSON.stringify(a)),o(a)}if(n){sl.defaults.headers.Cookie=n;let a="";try{let i=await sl.patch(`Users(${e.body.InternalKey})`,s);if(i.status=="200"||i.status=="201"||i.status=="204"){if(e.body.isNewUser){let c=nl.getMailBody(e.body.adminUser,e.body.userName,r);await iC(e.body.eMail,nl.subject,c)?a="Portal access invite has been sent to user's email":a="Portal access has been given, but unable to send temporary password to user's mail. Please share it manually."}else a="User details updated successfully";t.status(200).send({message:a})}else t.status(500).send({message:"Update failed!"})}catch(i){console.log("Update User Details - Error: "+i),o(i)}}};al.exports={updateUserDetails:lC}});var dl=d((cR,cl)=>{var{dbCreds:V}=f(),{draftStatus:ll}=T(),cC=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
   T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
 FROM ${V.CompanyDB}."@APPROVALSTATUS" T0, ${V.CompanyDB}.OUSR TAP
   WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
 AND T0."U_DocEntry" IN `,dC=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
   FROM ${V.CompanyDB}."@APPROVALSTATUS" T0, ${V.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,uC=`SELECT T0."U_ApproverId"
   FROM ${V.CompanyDB}."@APPROVALSTATUS" T0, ${V.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,pC=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
    FROM ${V.CompanyDB}."@APPROVALSTATUS" T0
  WHERE T0."U_DocEntry" = ?
    AND T0."U_ApprovalLevel" = ?`,mC=`UPDATE ${V.CompanyDB}."@APPROVALSTATUS" T0
   SET T0."U_DraftStatus" = ?
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,yC=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
   FROM ${V.CompanyDB}."@APPROVALSTATUS" T0, ${V.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,gC=`INSERT INTO ${V.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", 
  "U_DraftStatus", "U_ApproverId", "U_ApprovalLevel", "U_ModuleName") VALUES (?, ?, ?, ?, ?, ?, ?)`,TC=`UPDATE ${V.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
   "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
 WHERE "U_ApprovalStatusId" = ?`,hC=`UPDATE ${V.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
     WHERE "U_DraftStatus" IN ('${ll.PENDING}', '${ll.NOT_ASSIGNED}')
   AND "U_DocEntry" = ?`,CC=`UPDATE ${V.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
      WHERE "U_DocEntry" = ?`;cl.exports={selectDraftApproversList:cC,insertDraftApproversList:gC,updateDraftApproversList:TC,updateApprovalStatus:hC,updateApprovalStatusRecState:CC,selectDraftApprovalStatusCount:dC,selectDraftApprovalRecords:uC,updateDraftNextApprovalLevel:mC,selectDraftNextApproverDetails:yC,selectDraftApprovalDate:pC}});var lt=d((uR,ul)=>{var{portalModules:dR}=T(),fC="Approval request",SC=(e,t,o)=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${e} notification</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
      padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                        <a class="" href="https://www.client.com/" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
      #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                          <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="73" />
                                      </a>
                                    </td>
                                    <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
      padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="130" />
                             </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>${e}</span></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
    <b>${t}</b> has submitted a ${e}.
    Please review and provide your approval. <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">Request no.: ${o}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 10px; padding-top:10px;
    padding-right:48px; padding-bottom:14px; padding-left:48px; text-align: center" valign="middle">
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
    0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Pending Approvals</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
    Log into
    <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
    to review the requests that are awaiting you approval.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;ul.exports={subject:fC,getMailBody:SC}});var dt=d((mR,ml)=>{var ct=S(),Xo=f(),Ls=dl(),{draftStatus:Je,portalModules:pR}=T(),{getRandomNo:IC}=x(),{sendMail:DC}=ge(),pl=lt(),EC=(e,t=0,o,r)=>{let s,n=100,a,i=[],c=new ProductionDraftQueries(r);t=parseInt(t),t===1||o==="N"?(a=Xo.selectDraftCreationDate,i=[e]):(a=Ls.selectDraftApprovalDate,i=[e,t-1]),console.log("sql: "+a);try{let l=ct.executeWithValues(a,i);console.log("getApprovalInternalInDays %s",JSON.stringify(l)),Array.isArray(l)&&l.length&&(s=l[0].DocDate)}catch(l){console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(l))}if(s){let l=Math.abs(new Date-new Date(s));n=Math.ceil(l/(1e3*60*60*24))-1}return n},NC=(e,t,o)=>{let r;e===Je.APPROVED?r=Je.GENERATED:e===Je.REJECTED&&(r=Je.NOT_REQUIRED);try{let s=Ls.updateApprovalStatus,n=[r,t],a=ct.executeWithValues(s,n);return console.log("setApprovalStatus %s",JSON.stringify(a)),!0}catch(s){return console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(s)),!1}},AC=(e,t)=>{try{let o=ct.executeWithValues(Xo.selectApproverForOriginator,[e,t]);return console.log("result: "+JSON.stringify(o)),o}catch(o){throw o}},RC=e=>{try{let t=ct.executeWithValues(Xo.selectDraftApproversList+`(${e}) ORDER BY T0."U_ApprovalLevel" ASC`,[]);return console.log("result: "+JSON.stringify(t)),t}catch(t){throw t}},bC=(e,t,o)=>{try{let r=Ls.updateApprovalStatusRecState,s=[t,e],n=ct.executeWithValues(r,s);return console.log("draftApproverRec: "+JSON.stringify(n)),!0}catch(r){throw r}},OC=async(e,t,o)=>{let r=[],s=[],n,a;try{t.map(l=>{n=0,a=IC(),l.U_MultiLevelApproval==="Y"?(n=l.U_ApprovalLevel,l.U_ApprovalLevel==1?(s.push({UserName:l.UserName,Email:l.Email}),r.push([a,a,e,Je.PENDING,l.ApproverId,n])):r.push([a,a,e,Je.NOT_ASSIGNED,l.ApproverId,n])):(s.push({UserName:l.UserName,Email:l.Email}),r.push([a,a,e,Je.PENDING,l.ApproverId,n]))});let i=Xo.insertDraftApproversList;console.log("multiApproverList: "+r),console.log("mailingList: "+s);let c=ct.executeBatchInsertUpdate(i,r);return console.log("draftApproverRec: "+JSON.stringify(c)),{draftApproverRec:c,mailingList:s}}catch(i){throw i}},UC=async(e,t,o,r)=>{try{let s=pl.getMailBody(e,t,o);r.forEach(async n=>{await DC(n.Email,pl.subject,s)})}catch(s){throw s}};ml.exports={getApprovalInternalInDays:EC,setApprovalStatus:NC,getApprovers:AC,getApproversForDraft:RC,updateDraftApprovers:bC,createApproversForDraft:OC,notifyApprovers:UC}});var Zo=d((gR,yl)=>{var{portalModules:yR}=T(),xC="Request status update",wC=(e,t,o,r,s)=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Goods Receipt PO request notification</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
      padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                        <a class="" href="https://www.client.com/" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
      #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                          <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="73" />
                                      </a>
                                    </td>
                                    <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
      padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="130" />
                             </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>${e} </span></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
    Hi ${t}, <br /><br />
    Your ${e} has been ${s} by <b>${o}</b>. Please find below next recommended action.
    <br /><br />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">Request# ${r}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 10px; padding-top:10px;
    padding-right:48px; padding-bottom:14px; padding-left:48px; text-align: center" valign="middle">
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
    0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>
    Next Action - 
    ${s==="APPROVED"?"Review":"Review and resubmit your request"}</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
    Log into
    <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
    ${s==="APPROVED"?"":"to review the 'Rejection Reason' posted by your approver, modify the request and resubmit it"}.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;yl.exports={subject:xC,getMailBody:wC}});var Tl=d(gl=>{var{dbCreds:LC}=f();gl.numberingSeries=`SELECT T0."Series", T0."SeriesName", T0."InitialNum"
    FROM ${LC.CompanyDB}.NNM1 T0
  WHERE T0."ObjectCode" = ?
        AND LOWER(T0."Remark") = ?`});var zt=d(hl=>{var vC=S(),_C=Tl();hl.getNumberingSeries=(e,t)=>{try{let o=vC.executeWithValues(_C.numberingSeries,[e,t.toLowerCase()]);return Array.isArray(o)&&o.length>0?o[0]:null}catch(o){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(o.message)),o}}});var Dl=d((SR,Il)=>{var PC=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:De}=k(),{getSLConnection:fl}=j(),{sendMail:Ps}=ge(),vs=dt(),er=lt(),Cl=Zo(),pe=S(),me=f(),{portalModules:jt,draftObjectCodes:Sl,draftStatus:w,systemCurrency:CR,objectCodes:BC,enableStoreBasedNumbering:MC}=T(),{getRandomNo:FC,formatDate:WC}=x(),fR=S(),{getNumberingSeries:$C}=zt(),kC=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await fl(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,De.defaults.headers.Cookie=r;try{let n=pe.executeWithValues(me.selectApproverForOriginator,[s,jt.STOCK_TRANSFER_REQUEST]);console.log("approverRec: "+JSON.stringify(n));let a=pe.executeWithValues(me.selectUserInfo,s),i=PC(e.body);if(i.branchId&&(i.BPLID=i.branchId,delete i.branchId),i.U_OriginatorId=s,delete i.userId,Array.isArray(n)&&n.length){i.DocObjectCode=Sl.STOCK_TRANSFER_REQUEST,i.U_DraftStatus=w.PENDING,i.U_MultiLevelApproval=n[0].U_MultiLevelApproval,i.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createSTR Draft - request: "+JSON.stringify(i));let c=await De.post("StockTransferDrafts",i);if(console.log("*** DRAFTS response: "+c),c.data){let l=[];n.forEach(h=>{l.push(h.UserName)}),t.status(200).send({draftNum:c.data.DocEntry,approverName:l.join(", "),response:c.data});let u=[],p=[],g,y;n.map(h=>{g=0,y=FC(),h.U_MultiLevelApproval==="Y"?(g=h.U_ApprovalLevel,h.U_ApprovalLevel==1?(p.push({UserName:h.UserName,Email:h.Email}),u.push([y,y,c.data.DocEntry,w.PENDING,h.ApproverId,g])):u.push([y,y,c.data.DocEntry,w.NOT_ASSIGNED,h.ApproverId,g])):(p.push({UserName:h.UserName,Email:h.Email}),u.push([y,y,c.data.DocEntry,w.PENDING,h.ApproverId,g]))}),console.log("multiApproverList: "+u),console.log("mailingList: "+p);let C=pe.executeBatchInsertUpdate(me.insertDraftApproversList,u);if(console.log("draftApproverRec: "+JSON.stringify(C)),C){let h=er.getMailBody(jt.STOCK_TRANSFER_REQUEST,a[0].UserName,c.data.DocEntry);p.forEach(async B=>{await Ps(B.Email,er.subject,h)})}}}else{let c=[...e.body.StockTransferLines];c.forEach(p=>{p.FromWarehouseCode=p.U_FromWarehouse,delete p.availableQuantity,delete p.U_FromWarehouse}),console.log("stockTransferLines: "+JSON.stringify(c));let l={FromWarehouse:e.body.FromWarehouse,U_FromBinLoc:e.body.U_FromBinLoc,ToWarehouse:e.body.ToWarehouse,U_ToBinLocation:e.body.U_ToBinLocation,Comments:e.body.Comments,SalesPersonCode:e.body.SalesPersonCode,U_DraftStatus:w.AUTO_APPROVED,StockTransferLines:c,U_OriginatorId:s};if(MC){let p=await $C(BC[jt.STOCK_TRANSFER_REQUEST],e.session.userSessionLog.storeLocation);p&&(console.log("seriesResponse series:",p.Series),l.Series=p.Series)}console.log("InventoryTransferRequests - request: "+JSON.stringify(l));let u=await De.post("InventoryTransferRequests",l);u.data?t.status(200).send({stockTransferRequestNum:u.data.DocNum}):(console.log("Create Stock Transfer Request failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}}catch(n){console.log("Create Stock Transfer Request error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},_s=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await De.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==w.APPROVED)try{let a=await De.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let i=[],c={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(u=>{c={LineNum:u.LineNum,ItemCode:u.ItemCode,Quantity:u.Quantity,MeasureUnit:u.MeasureUnit,WarehouseCode:u.WarehouseCode,FromWarehouseCode:u.U_FromWarehouse,U_ToBinLocation:u.U_ToBinLocation},i.push(c)}),i.sort((u,p)=>u.BaseLine-p.BaseLine);let l={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:i};a.BPLID&&(l.BPLID=a.BPLID),console.log("InventoryTransferRequests - request: "+JSON.stringify(l)),s=await De.post("InventoryTransferRequests",l)}catch(a){let i=await De.patch(`Drafts(${e.DocEntry})`,{U_DraftStatus:w.PENDING});throw console.log("resetDraftStatus - response.data: "+i),a}if(n||s){let a=pe.executeWithValues(me.updateDraftApproversList,[o,e.U_RejectedReason,WC(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===w.REJECTED&&vs.setApprovalStatus(o,e.DocEntry),s){let p=await De.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&vs.setApprovalStatus(w.APPROVED,e.DocEntry)}let i=pe.executeWithValues(me.selectUserInfo,e.U_OriginatorId),c=pe.executeWithValues(me.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(i)),console.log("approverRec: "+JSON.stringify(c));let l;if([w.APPROVED,w.PENDING].includes(e.U_DraftStatus)?l=w.APPROVED:l=e.U_DraftStatus,Array.isArray(c)&&c.length&&Array.isArray(i)&&i.length){let p=Cl.getMailBody(jt.STOCK_TRANSFER_REQUEST,i[0].UserName,c[0].UserName,e.DocEntry,l);await Ps(i[0].Email,Cl.subject,p)}let u;o===w.APPROVED&&(u=vs.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:l,noOfDays:u})}}catch(s){next(s)}},qC=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await fl(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){De.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==w.APPROVED){let a=pe.executeWithValues(me.selectNoOfApprovalsForDraft,[Sl.STOCK_TRANSFER_REQUEST,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let i=0,c;if(Array.isArray(a)&&a.length&&(i=parseInt(a[0].U_NoOfApprovals,10),c=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+i),c==="Y"){if(parseInt(s.U_ApprovalLevel)==i?s.U_DraftStatus=w.APPROVED:parseInt(s.U_ApprovalLevel)<i&&(s.U_DraftStatus=w.PENDING),await _s(s,t,n,c),s.U_DraftStatus==w.PENDING){let l=parseInt(s.U_ApprovalLevel)+1,u=pe.executeWithValues(me.updateDraftNextApprovalLevel,[w.PENDING,s.DocEntry,l]);console.log("setNextApprovalStatus: "+JSON.stringify(u));let p=pe.executeWithValues(me.selectUserInfo,s.U_OriginatorId),g=pe.executeWithValues(me.selectDraftNextApproverDetails,[s.DocEntry,l]);if(console.log("nextApproverDetails: "+JSON.stringify(g)),Array.isArray(g)&&g.length&&p.length){let y=er.getMailBody(jt.STOCK_TRANSFER_REQUEST,p[0].UserName,s.DocEntry);await Ps(g[0].Email,er.subject,y)}}}else{let l=pe.executeWithValues(me.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(l));let u=0;Array.isArray(l)&&l.length&&(u=l[0].Count),console.log("noOfApprovalsReceived: "+u),parseInt(u,10)+1>=parseInt(i,10)?(s.U_DraftStatus=w.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=w.PENDING,console.log("****PENDING")),await _s(s,t,n,c)}}else s.U_DraftStatus==w.REJECTED&&(console.log("****REJECTED"),await _s(s,t,n))}catch(n){console.log("Stock Transfer Request Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};Il.exports={createStockTransferRequest:kC,updateDraft:qC}});var Ul=d((DR,Ol)=>{var Rl=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:Ee}=k(),{getSLConnection:bl}=j(),{sendMail:Fs}=ge(),Bs=dt(),tr=lt(),El=Zo(),ae=S(),ie=f(),{portalModules:or,draftObjectCodes:Ws,draftStatus:L,systemCurrency:IR}=T(),{getRandomNo:HC,formatDate:JC}=x(),Nl=async(e,t,o)=>{try{e.requestType==="BIN_TO_BIN"?(e.U_DraftStatus="BIN_TO_BIN",delete e.requestType):e.U_DraftStatus=L.AUTO_APPROVED,console.log("StockTransfers - request: "+JSON.stringify(e));let r=await Ee.post("StockTransfers",e);r.data?t.status(200).send({stockTransferRequestNum:r.data.DocNum}):(console.log("Create Stock Transfer failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}catch(r){throw r}},zC=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await bl(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,Ee.defaults.headers.Cookie=r;try{let n=ae.executeWithValues(ie.selectApproverForOriginator,[s,or.STOCK_TRANSFER]);console.log("approverRec: "+JSON.stringify(n));let a=ae.executeWithValues(ie.selectUserInfo,s),i=[],c={},l=Rl(e.body);if(l.branchId&&(l.BPLID=l.branchId,delete l.branchId),delete l.userId,l.U_OriginatorId=s,l.StockTransferLines.forEach(u=>{c={LineNum:u.LineNum,ItemCode:u.ItemCode,Quantity:u.Quantity,BaseType:u.BaseType,BaseEntry:u.BaseEntry,BaseLine:u.BaseLine,MeasureUnit:u.MeasureUnit,WarehouseCode:u.WarehouseCode,FromWarehouseCode:u.U_FromWarehouse,U_ToBinLocation:u.U_ToBinLocation,BatchNumbers:u.BatchNumbers,SerialNumbers:u.SerialNumbers,StockTransferLinesBinAllocations:jC(u.StockTransferLinesBinAllocations)},i.push(c),c={}}),delete l.StockTransferLines,l.StockTransferLines=i,l.requestType==="BIN_TO_BIN")await Nl(l,t);else if(Array.isArray(n)&&n.length){l.DocObjectCode=Ws.STOCK_TRANSFER,l.U_DraftStatus=L.PENDING,l.U_MultiLevelApproval=n[0].U_MultiLevelApproval,l.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createST Draft - request: "+JSON.stringify(l));let u=await Ee.post("StockTransferDrafts",l);if(console.log("*** DRAFTS response: "+u),u.data){let p=[];n.forEach(D=>{p.push(D.UserName)}),t.status(200).send({draftNum:u.data.DocEntry,approverName:p.join(", "),response:u.data});let g=[],y=[],C,h;n.map(D=>{C=0,h=HC(),D.U_MultiLevelApproval==="Y"?(C=D.U_ApprovalLevel,D.U_ApprovalLevel==1?(y.push({UserName:D.UserName,Email:D.Email}),g.push([h,h,u.data.DocEntry,L.PENDING,D.ApproverId,C])):g.push([h,h,u.data.DocEntry,L.NOT_ASSIGNED,D.ApproverId,C])):(y.push({UserName:D.UserName,Email:D.Email}),g.push([h,h,u.data.DocEntry,L.PENDING,D.ApproverId,C]))}),console.log("multiApproverList: "+g),console.log("mailingList: "+y);let B=ae.executeBatchInsertUpdate(ie.insertDraftApproversList,g);if(console.log("draftApproverRec: "+JSON.stringify(B)),B){let D=tr.getMailBody(or.STOCK_TRANSFER,a[0].UserName,u.data.DocEntry);y.forEach(async Oe=>{await Fs(Oe.Email,tr.subject,D)})}}}else await Nl(l,t)}catch(n){console.log("Create Stock Transfer error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},Al=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o},jC=e=>{let t=[];return Array.isArray(e)&&e.length>0&&e.forEach(o=>{o.ToBinLoc?t.push({BinAbsEntry:VC(o.ToBinLoc),Quantity:o.Quantity,AllowNegativeQuantity:o.AllowNegativeQuantity,SerialAndBatchNumbersBaseLine:o.SerialAndBatchNumbersBaseLine,BinActionType:o.BinActionType,BaseLineNumber:o.BaseLineNumber}):t.push(o)}),t},VC=e=>{try{let t=ae.executeWithValues(ie.binsList+' WHERE T0."BinCode" = ?',e);return console.log("getBinAbsEntry - result: "+JSON.stringify(t)),t[0].AbsEntry}catch(t){return console.log(`Error getting AbsEntry for BinCode - ${e} ERROR: ${t}`),0}},Ms=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await Ee.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==L.APPROVED)try{let a=await Ee.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let i=[],c={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(u=>{c={LineNum:u.LineNum,ItemCode:u.ItemCode,Quantity:u.Quantity,BaseType:Ws.STOCK_TRANSFER_REQUEST,BaseEntry:u.BaseEntry,BaseLine:u.BaseLine,MeasureUnit:u.MeasureUnit,WarehouseCode:u.WarehouseCode,FromWarehouseCode:u.FromWarehouseCode,U_ToBinLocation:u.U_ToBinLocation},c.BatchNumbers=Al("Batch",u.BatchNumbers),c.SerialNumbers=Al("Serial",u.SerialNumbers),c.StockTransferLinesBinAllocations=Rl(u.StockTransferLinesBinAllocations),i.push(c)}),i.sort((u,p)=>u.BaseLine-p.BaseLine);let l={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:i};a.BPLID&&(l.BPLID=a.BPLID),console.log("StockTransfers - request: "+JSON.stringify(l)),s=await Ee.post("StockTransfers",l)}catch(a){let i=await Ee.patch(`StockTransferDrafts(${e.DocEntry})`,{U_DraftStatus:L.PENDING});throw console.log("resetDraftStatus - response.data: "+i),a}if(n||s){let a=ae.executeWithValues(ie.updateDraftApproversList,[o,e.U_RejectedReason,JC(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===L.REJECTED&&Bs.setApprovalStatus(o,e.DocEntry),s){let p=await Ee.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&Bs.setApprovalStatus(L.APPROVED,e.DocEntry)}let i=ae.executeWithValues(ie.selectUserInfo,e.U_OriginatorId),c=ae.executeWithValues(ie.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(i)),console.log("approverRec: "+JSON.stringify(c));let l;if([L.APPROVED,L.PENDING].includes(e.U_DraftStatus)?l=L.APPROVED:l=e.U_DraftStatus,Array.isArray(c)&&c.length&&Array.isArray(i)&&i.length){let p=El.getMailBody(or.STOCK_TRANSFER,i[0].UserName,c[0].UserName,e.DocEntry,l);await Fs(i[0].Email,El.subject,p)}let u;o===L.APPROVED&&(u=Bs.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:l,noOfDays:u})}}catch(s){next(s)}},GC=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await bl(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){Ee.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==L.APPROVED){let a=ae.executeWithValues(ie.selectNoOfApprovalsForDraft,[Ws.STOCK_TRANSFER,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let i=0,c;if(Array.isArray(a)&&a.length&&(i=parseInt(a[0].U_NoOfApprovals,10),c=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+i),c==="Y"){if(parseInt(s.U_ApprovalLevel)==i?s.U_DraftStatus=L.APPROVED:parseInt(s.U_ApprovalLevel)<i&&(s.U_DraftStatus=L.PENDING),await Ms(s,t,n,c),s.U_DraftStatus==L.PENDING){let l=parseInt(s.U_ApprovalLevel)+1,u=ae.executeWithValues(ie.updateDraftNextApprovalLevel,[L.PENDING,s.DocEntry,l]);console.log("setNextApprovalStatus: "+JSON.stringify(u));let p=ae.executeWithValues(ie.selectUserInfo,s.U_OriginatorId),g=ae.executeWithValues(ie.selectDraftNextApproverDetails,[s.DocEntry,l]);if(console.log("nextApproverDetails: "+JSON.stringify(g)),Array.isArray(g)&&g.length&&p.length){let y=tr.getMailBody(or.STOCK_TRANSFER,p[0].UserName,s.DocEntry);await Fs(g[0].Email,tr.subject,y)}}}else{let l=ae.executeWithValues(ie.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(l));let u=0;Array.isArray(l)&&l.length&&(u=l[0].Count),console.log("noOfApprovalsReceived: "+u),parseInt(u,10)+1>=parseInt(i,10)?(s.U_DraftStatus=L.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=L.PENDING,console.log("****PENDING")),await Ms(s,t,n,c)}}else s.U_DraftStatus==L.REJECTED&&(console.log("****REJECTED"),await Ms(s,t,n))}catch(n){console.log("Stock Transfer Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};Ol.exports={createStockTransfer:zC,updateDraft:GC}});var wl=d(xl=>{var QC=S(),YC=f(),{getRandomNo:ER,formatDate:KC,getClientHostname:XC}=x(),NR=ps(),{sendMail:AR}=ge(),{generateHash:RR,comparePassword:bR}=wo(),$s=Wt(),{openSLConnection:ZC}=j(),{createUserSessionLog:ef}=kt(),{getUserStoreInfo:tf}=Ns(),{canAssignUserToCounter:OR}=Vo(),{getLocationDefaults:of}=Ht();xl.validateUserLogin=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=QC.executeWithValues(YC.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{let n=await ZC(e.body.userName,e.body.password);if(console.log("slCookie: "+n),n){let a=s[0].InternalKey,{storeId:i,storeCounterId:c,counterCode:l,counterName:u,locationCode:p,storeLocation:g,storeWHCode:y}=await tf(a);r=!0,e.session.userId=a,e.session.userName=e.body.userName,e.session.password=e.body.password,e.session.slCookie=n,e.session.slLoginTime=new Date,e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,await new Promise((te,ly)=>{e.session.save(Zr=>{Zr?(console.log("Session save error:",Zr),ly(Zr)):(console.log("Session saved successfully with slCookie"),te())})});let C=await XC(e);console.log("validateUserLogin SL - req.connection.remoteAddress: ",e.connection.remoteAddress),console.log("validateUserLogin SL - clientHost: ",C);let h="",B=await $s.getSalesEmployeeForUser(a);Array.isArray(B)&&B.length>0&&(h=B[0].SlpCode);let D="";if(g){let te=await of(g);Array.isArray(te)&&te.length>0&&(D=te[0])}let Oe="",vt=await $s.getUserGroupByUser(a);Array.isArray(vt)&&vt.length>0&&(Oe=vt.U_GroupName);let Oo={userId:a,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:h,storeId:i||null,storeCounterId:c||null,counterCode:l,counterName:u,locationCode:p,storeLocation:g,locationDefaults:D,clientIp:C,loginTime:KC(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},_t=await ef(Oo);e.session.userSessionLog=_t,e.session.storeWHCode=y,e.session.userSessionLog.locationCode=p;let Q={InternalKey:a,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:_t,storeWHCode:y,userGroup:Oe,permissions:[]};try{let te=$s.getUserPermissions(a);te&&(e.session.permissions=te,Q.permissions=te),t.send(Q)}catch(te){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(te)),t.status(500).send({message:te.message+". Unable to get User Permissions"})}}}else console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"})}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}}});var _l=d((wR,vl)=>{var rf=require("../node_modules/express/index.js"),sf=il(),Ll=Dl(),xR=Ul(),nf=wl(),{portalModules:ks,permissions:qs}=T(),{checkUserPermission:Hs}=N(),rr=new rf.Router;rr.route("/login").post(nf.validateUserLogin);rr.route("/users").patch(Hs(ks.USER,qs.WRITE),sf.updateUserDetails);rr.route("/stock-transfer-request").post(Hs(ks.STOCK_TRANSFER_REQUEST,qs.CREATE),Ll.createStockTransferRequest).patch(Hs(ks.STOCK_TRANSFER_REQUEST,qs.WRITE),Ll.updateDraft);vl.exports=rr});var zs=d((LR,Pl)=>{var Js=require("../node_modules/bunyan/lib/bunyan.js"),af=require("path"),{formatDate:lf}=x(),cf=()=>{let e=af.resolve(__dirname,"../../logs/pos.json"),t=process.env.NODE_ENV||"production",o=Js.createLogger({dateTime:lf(new Date,"YYYY-MM-DD HH24:MI:SS"),name:"POS",streams:[{level:Js.INFO,stream:process.stdout},{level:Js.ERROR,type:"rotating-file",path:e,period:"1d",count:5}]});return console.log("Bunyan logger initialized.."),o},df=e=>{try{cf().error(e)}catch(t){console.log("Error initializing Bunyan Logger: ",JSON.stringify(t))}};Pl.exports={logError:df}});var Fl=d((vR,Ml)=>{var{httpStatusCodes:Bl}=T(),uf=e=>{let t=Bl.INTERNAL_SERVER_ERROR,o="Unexpected error! Contact Admin.";return e.response?(console.log("error.response.data"+JSON.stringify(e.response.data)),console.log("error.response.status:"+e.response.status),console.log("error.response.headers: "+JSON.stringify(e.response.headers)),e.response.status&&(t=e.response.status,o=e.response.data.error.message.value)):e.message?o=e.message:e.request?console.log("error.request: "+JSON.stringify(e.request)):console.log("Catch else - Error",e.message),e.code&&(t=e.code>=300?e.code:Bl.INTERNAL_SERVER_ERROR),{statusCode:t,message:o}};Ml.exports={serviceLayerErrorHandler:uf}});var $l=d((_R,Wl)=>{var{logError:pf}=zs(),{serviceLayerErrorHandler:mf}=Fl(),{httpStatusCodes:yf}=T(),gf=(e,t,o,r)=>{console.error(e);let{statusCode:s,message:n}=mf(e);s||(s=e.statusCode||yf.INTERNAL_SERVER_ERROR),n||(n=e.detail?e.detail:e.message?e.message:e),pf({method:t.method,url:t.url,statusCode:s,message:n,stack:e.stack,requestBody:t.body,requestParams:t.params,requestQuery:t.query}),o.status(s).json({message:n})};Wl.exports=gf});var Hl=d(ql=>{var{serviceLayerAPI:kl}=k(),{portalModules:Tf,serviceLayerApiURIs:hf}=T(),Cf=Tf.BUSINESS_PARTNER,ff=hf[Cf];ql.createBusinessPartner=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** BusinessPartner request: "+JSON.stringify(e)),kl.defaults.headers.Cookie=t;let o=await kl.post(ff,e);return o.data?o.data:void 0}catch(o){throw console.log("Create BusinessPartner error: "+o),o}}});var zl=d((BR,Jl)=>{var{getSLConnection:Sf}=j(),If=Hl(),Df=async(e,t,o)=>{try{let r=await Sf(e),s=await If.createBusinessPartner(e.body,r);t.status(200).send({CardCode:s.CardCode})}catch(r){console.log("create Biz Partner: "+JSON.stringify(r)),o(r)}};Jl.exports={create:Df}});var Gl=d((MR,Vl)=>{var Ef=require("../node_modules/express/index.js"),Nf=zl(),{portalModules:Af,permissions:Rf}=T(),{checkUserPermission:bf}=N(),jl=new Ef.Router;jl.route("/").post(bf([Af.INVOICE],Rf.CREATE),Nf.create);Vl.exports=jl});var Gs=d(sr=>{var{dataSource:js}=J(),Vs=Ts(),Ql="cashDenominationId",Of="dateTime";sr.createCashDenomination=async e=>{try{return await js.getRepository(Vs).save(e)}catch(t){throw t}};sr.getCashDenominations=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ql]=e.id,delete e.id);try{let o=js.getRepository(Vs);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Of]:"ASC"}})}catch(o){throw o}};sr.deleteCashDenominations=async e=>{try{return await js.getRepository(Vs).delete({[Ql]:e})}catch(t){throw t}}});var Yl=d(nr=>{var Qs=Gs(),Uf="trxType";nr.create=async(e,t,o)=>{if(!e.body||!e.body[Uf]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await Qs.createCashDenomination(e.body);t.send(r)}catch(r){console.error("Error creating CashDenomination!"),o(r)}};nr.findAll=async(e,t,o)=>{try{let r=await Qs.getCashDenominations(e.query);t.send(r)}catch(r){console.error("Error getting CashDenomination!"),o(r)}};nr.delete=async(e,t,o)=>{try{let r=await Qs.deleteCashDenominations(e.params.id);t.send(r)}catch(r){console.error("Error deleting CashDenomination!"),o(r)}}});var Xl=d(($R,Kl)=>{var xf=require("../node_modules/express/index.js"),Ys=Yl(),{portalModules:Ks,permissions:Xs}=T(),{checkUserPermission:Zs}=N(),ar=new xf.Router;ar.post("/",Zs(Ks.INVOICE,Xs.CREATE),Ys.create);ar.get("/",Zs(Ks.INVOICE,Xs.READ),Ys.findAll);ar.delete("/:id",Zs(Ks.INVOICE,Xs.CANCEL),Ys.delete);Kl.exports=ar});var ec=d(Zl=>{var{dbCreds:wf}=f();Zl.creditCards=`SELECT T0."CreditCard", T0."CardName", T0."AcctCode", T0."CompanyId" "SurchargeAccount",
    T0."Phone" "SurchargePercentage"
  FROM ${wf.CompanyDB}.OCRC T0`});var oc=d(tc=>{var Lf=S(),vf=ec();tc.getCreditCards=()=>{try{return Lf.executeWithValues(vf.creditCards)}catch(e){throw console.log("getCreditCards - controller - error: "+JSON.stringify(e.message)),e}}});var sc=d(rc=>{var{enableLocationBasedCreditCardAccount:_f}=T(),Pf=oc(),{getLocationDefaults:Bf}=Ht();rc.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Pf.getCreditCards();if(_f&&e.query.location){let s=Bf(e.query.location);r&&Array.isArray(s)&&s.length>0&&r.forEach(n=>{n.AcctCode=s[0].AccountCode})}t.send(r)}catch(r){console.log("Credit Card - controller - error: "+JSON.stringify(r.message)),o(r)}}});var ic=d((JR,ac)=>{var Mf=require("../node_modules/express/index.js"),nc=new Mf.Router,Ff=sc(),{checkUserPermission:Wf}=N(),{portalModules:$f,permissions:kf}=T();nc.route("/").get(Wf($f.INVOICE,kf.READ),Ff.get);ac.exports=nc});var lc=d(K=>{var{dbCreds:I}=f();K.invoice=`SELECT DISTINCT T0."DocNum", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocDueDate", T0."BPLId" AS "branch",
    T0."CardCode", T0."CardName", T2."Cellular", T0."NumAtCard", T2."LicTradNum", T4."U_Change" as "Change",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."U_PaymentType", T0."SlpCode" "SalesPersonCode",
    T5."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location", T0."U_IsReprinted",
    T0."U_AmtTender"
      FROM ${I.CompanyDB}.OINV T0
      INNER JOIN ${I.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
      LEFT JOIN ${I.CompanyDB}.OCRD T2 ON T0."CardCode" = T2."CardCode"
      LEFT JOIN ${I.CompanyDB}.RCT2 T3 ON T0."DocEntry" = T3."DocEntry"
      LEFT JOIN ${I.CompanyDB}.ORCT T4 ON T3."DocNum" = T4."DocEntry"
      LEFT JOIN ${I.CompanyDB}.OSLP T5 ON T0."SlpCode" = T5."SlpCode"
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"`;K.itemListForInvoice=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceAfVAT" as "NetUnitPrice", T1."PriceBefDi" "PriceBeforDiscount",
    (SELECT E."ItmsGrpNam" FROM  ${I.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod",
    IFNULL((SELECT SUM(S1."U_NoOfPcs") FROM  ${I.CompanyDB}."@OSBS" S0
        INNER JOIN  ${I.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Pcs", T1."CogsOcrCod" AS "COGSBranch",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
        FROM ${I.CompanyDB}.SPP1 P WHERE P."ItemCode" = ITM."ItemCode" 
          AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied",
      T0."U_IsReprinted"
  FROM ${I.CompanyDB}.OINV T0
    INNER JOIN ${I.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${I.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;K.invoiceFircaURL=`SELECT T0."DocNum", T0."U_VerifyURL"
    FROM ${I.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;K.invoiceAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${I.CompanyDB}.OINV T0
  WHERE T0."DocEntry" = ?`;K.invoiceUDFData=`SELECT T0."DocNum", T0."U_InvCount", T0."U_SDCTime", T0."U_SDCInvNum", T0."U_VehicleNo"
    FROM ${I.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;K.updateTransRef=`UPDATE ${I.CompanyDB}.OCRH T0
    SET T0."TransRef" = ? 
      WHERE T0."RctAbs" = ?;`;K.updateInvoiceItem=`UPDATE ${I.CompanyDB}.INV1 T1 SET
    T1."U_ReturnedQty" = ?, T1."U_RemainingOpenQty" = ?
  WHERE T1."DocEntry" = ? AND T1."LineNum" = ?`;K.updateInvoiceReprintStatus=`UPDATE ${I.CompanyDB}.OINV T0 SET
    T0."U_IsReprinted" = 'Y'
  WHERE T0."DocEntry" = ?`;K.invoiceDeliveyCodeData=`SELECT T0."DeliveryCode", T0."DocNum",
    FROM ${I.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;K.updateSalesBatchSelectionDocNum=`UPDATE ${I.CompanyDB}.INV1 T1 SET
    T1."U_DocNum" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ?`;K.getUniqueId=`SELECT T0."DocNum", T0."DocEntry"
    FROM ${I.CompanyDB}.OINV T0
  WHERE T0."U_Unique" = ?`;K.getTimberItems=`SELECT DISTINCT I1."ItemCode", I1."WhsCode", I1."LineNum" + 1 AS "SNo", T9."BatchNum", 
    T9."Quantity" AS "SelectedQty", T25."U_Length", T25."U_Height", T25."U_Width",
    (T9."Quantity" / ((T25."U_Height" / 1000) * (T25."U_Width" / 1000) * T25."U_Length")) AS "NoofPieces",
    ITM."ItemName" AS "Description", T10."WhsName", T10."Street", T10."Block", T10."City"
      FROM ${I.CompanyDB}."IBT1" T9
      INNER JOIN ${I.CompanyDB}."OIBT" T25 
          ON T9."BatchNum" = T25."BatchNum" AND T25."ItemCode" = T9."ItemCode"
      LEFT JOIN ${I.CompanyDB}."@SBS1" SBS1 
          ON SBS1."U_Batch" = T25."BatchNum"
      INNER JOIN ${I.CompanyDB}."INV1" I1 
          ON I1."DocEntry" = T9."BaseEntry" AND I1."ItemCode" = T9."ItemCode"
      INNER JOIN ${I.CompanyDB}."OINV" I0 
          ON I1."DocEntry" = I0."DocEntry"
      LEFT JOIN ${I.CompanyDB}."OITM" ITM 
          ON ITM."ItemCode" = I1."ItemCode"
      LEFT JOIN ${I.CompanyDB}."OWHS" T10 
          ON I1."WhsCode" = T10."WhsCode"
      WHERE 
          I0."DocEntry" = ?
          AND ITM."ItmsGrpCod" = '156'`});var dc=d(cc=>{var qf=require("../node_modules/axios/index.js");cc.getQRCodeDataURI=async e=>{try{let t="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",o=await qf.get(`${t}${encodeURIComponent(e)}`,{responseType:"arraybuffer"});return`data:image/png;base64,${Buffer.from(o.data,"binary").toString("base64")}`}catch(t){throw t}}});var ze=d(_=>{var X=S(),{buildHeaderRecQuery:Hf,buildRowLevelQuery:Jf}=Se(),Z=lc(),{getQRCodeDataURI:zf}=dc();_.getInvoices=e=>{try{let t=Hf(Z.invoice,e,['T0."U_CODCntName"']);return console.log("getSalesQuotation- sql: ",t),X.executeWithValues(t)}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};_.updateInvoiceReprintStatus=e=>{try{let t=X.executeWithValues(Z.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};_.getItemDetails=e=>{try{let t=Jf(Z.itemListForInvoice,e);return{itemsList:X.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};_.getTimberItemDetails=e=>{try{let t=Z.getTimberItems;return{itemsList:X.executeWithValues(t,[e])}}catch(t){throw console.log("getTimberItemDetails - controller - error: "+JSON.stringify(t.message)),t}};_.getAttachmentEntry=e=>{try{let t=X.executeWithValues(Z.invoiceAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};_.getFircaInfo=e=>{try{let t=X.executeWithValues(Z.invoiceFircaURL,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getFircaInfo - controller - error: "+JSON.stringify(t.message)),t}};_.getDeliveryInfo=e=>{try{let t=X.executeWithValues(Z.invoiceDeliveyCodeData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getDeliveryInfo - controller - error: "+JSON.stringify(t.message)),t}};_.getUDFInfo=e=>{try{let t=X.executeWithValues(Z.invoiceUDFData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUDFInfo - controller - error: "+JSON.stringify(t.message)),t}};_.updateTransRef=(e,t)=>{try{return X.executeWithValues(Z.updateTransRef,[t,e])}catch(o){throw console.log("updateTransRef - controller - error: "+JSON.stringify(o.message)),o}};_.getFircaQRCodeDataURI=async e=>{try{let t=_.getFircaInfo(e);console.log("getFircaQRCode - url: "+JSON.stringify(t));let o;return t&&t.U_VerifyURL&&(o=await zf(t.U_VerifyURL)),o}catch(t){throw console.log("getFircaQRCode - helper: "+JSON.stringify(t.message)),t}};_.getDeliveryCode=async e=>{try{let t=_.getDeliveryInfo(e);return console.log("get Delivery Code: "+JSON.stringify(t)),t}catch(t){throw console.log("getDeliveryCode - helper: "+JSON.stringify(t.message)),t}};_.getUDFData=async e=>{try{let t=_.getUDFInfo(e);return console.log("get UDF Data: "+JSON.stringify(t)),t}catch(t){throw console.log("get UDF Data - helper: "+JSON.stringify(t.message)),t}};_.updateRemainingQuantity=e=>{try{if(Array.isArray(e)&&e.length>0){let t=e.map(r=>[r.U_ReturnedQty,r.U_RemainingOpenQty,r.DocEntry,r.LineNum]);console.log("updateRemainingQuantity- updateRequest: "+JSON.stringify(t));let o=X.executeBatchInsertUpdate(Z.updateInvoiceItem,t);return console.log("updateRemainingQuantity- response: "+JSON.stringify(o)),o}return null}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};_.updateReprint=e=>{try{if(e){let t=X.executeWithValues(Z.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(t.message)),t}};_.updateSalesBatchSelection=(e,t)=>{try{if(console.log("updateSalesBatchSelection %s",e.DocNum,t,e.U_ItemCode),e){let o=X.executeWithValues(Z.updateSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode]);return console.log("updateSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(o.message)),o}};_.getUniqueId=e=>{try{let t=X.executeWithValues(Z.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(t.message)),t}}});var uc=d(je=>{var ut=ze();je.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=ut.getInvoices(e.query);t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};je.updateReprint=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));let{DocEntry:r,U_IsReprinted:s}=e.body;try{let n=ut.updateInvoiceReprintStatus(r,s);t.send({message:"Invoice Reprint Status Updated Successfully",success:!0})}catch(n){console.log("getInvoice - controller - error: "+JSON.stringify(n.message)),o(n)}};je.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=ut.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};je.getFircaQRCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await ut.getFircaQRCodeDataURI(e.query.docNum);t.send(r)}catch(r){console.log("getFircaCode - controller - error: "+JSON.stringify(r.message)),o(r)}};je.getDeliveryCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await ut.getDeliveryCode(e.query.docNum);console.log("getDeliveryCode - Response: "+JSON.stringify(r)),t.send({DeliveryCode:r.DeliveryCode})}catch(r){console.log("getDeliveryCode - controller - error: "+JSON.stringify(r.message)),o(r)}};je.checkDeliveryConfirmation=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.body));try{let r=!1,s=await ut.getDeliveryCode(e.body.docNum);console.log("checkDeliveryConfirmation - Response: "+JSON.stringify(s)),e.body.DeliveryCode===s.DeliveryCode&&(r=!0),t.send({isValid:r})}catch(r){console.log("checkDeliveryConfirmation - controller - error: "+JSON.stringify(r.message)),o(r)}}});var mc=d((QR,pc)=>{var jf=require("../node_modules/express/index.js"),Ve=new jf.Router,pt=uc(),{checkUserPermission:mt}=N(),{portalModules:yt,permissions:gt}=T();Ve.route("/").get(mt(yt.INVOICE,gt.READ),pt.get);Ve.route("/reprint").patch(mt(yt.INVOICE,gt.READ),pt.updateReprint);Ve.route("/items").get(mt(yt.INVOICE,gt.READ),pt.getItems);Ve.route("/firca-code").get(mt(yt.INVOICE,gt.READ),pt.getFircaQRCode);Ve.route("/delivery-code").get(mt(yt.INVOICE,gt.READ),pt.getDeliveryCode);Ve.route("/delivery-confirmation").post(mt(yt.INVOICE,gt.READ),pt.checkDeliveryConfirmation);pc.exports=Ve});var ir=d(yc=>{var Vf=require("../node_modules/axios/index.js"),Gf=require("https");yc.submitInvoicetoFirca=async(e,t,o)=>{try{let r="";o=="Invoice"?r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_INVOICE_URI:r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_SALES_QUOTATION_URI;let s={DocEntry:e,CompanyCode:t},n=await Vf.post(r,s,{httpsAgent:new Gf.Agent({rejectUnauthorized:!1}),auth:{username:process.env.FIRCA_USERNAME,password:process.env.FIRCA_PASSWORD}});return console.log("submitInvoicetoFirca - response: "+JSON.stringify(n.data)),n.data.statusCode===1}catch(r){throw r}}});var Tc=d(gc=>{var{enableFircaIntegration:Qf}=T(),{submitInvoicetoFirca:Yf}=ir(),{getFircaQRCodeDataURI:Kf,getUDFData:Xf,updateReprint:Zf,getTimberItemDetails:eS}=ze();gc.createFirca=async(e,t,o)=>{try{if(e.body.invoice){let r={},s=e.body.invoice;console.log("req.query"+JSON.stringify(e.body.invoice));let n=s.CompanyCode?s.CompanyCode:"",a=s.DocEntry?s.DocEntry:"",i=s.DocNum?s.DocNum:"";if(Qf&&await Yf(a,n,"Invoice")){let u=await Kf(i);console.log("qrCodeDataURI",u),r.qrCode=u}let c=await Xf(i);if(c&&(r.InvCount=c.U_InvCount,r.SDCTime=c.U_SDCTime,r.SDCInvNum=c.U_SDCInvNum,r.VehicleNo=c.U_VehicleNo,Zf(a)&&console.log("Reprint Updated Successfully!")),a){let l=eS(a);r.timItemList=l}t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'Firca' property!"})}catch(r){console.log("create Invoice: "+JSON.stringify(r)),o(r)}}});var fc=d((XR,Cc)=>{var tS=require("../node_modules/express/index.js"),hc=new tS.Router,oS=Tc(),{checkUserPermission:rS}=N(),{portalModules:sS,permissions:nS}=T();hc.route("/").post(rS(sS.INVOICE,nS.READ),oS.createFirca);Cc.exports=hc});var on=d((cr,Ec)=>{var{serviceLayerAPI:ve}=k(),{portalModules:Ic,serviceLayerApiURIs:aS,attachmentPath:iS}=T(),lS=ze(),cS=Ic.INVOICE,tn=aS[cS],Sc=Ic.ATTACHMENTS,en=require("fs"),lr=require("path"),ZR=require("../node_modules/pdfkit/js/pdfkit.js"),Dc=require("../node_modules/multer/index.js"),dS=Dc.memoryStorage(),uS=Dc({storage:dS});cr.createInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),ve.defaults.headers.Cookie=t;let o=await ve.post(tn,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Invoice error: "+o),o}};cr.updateInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),ve.defaults.headers.Cookie=t;let o=await ve.patch(`${tn}(${e.DocEntry})`,e);return o&&o.status===204?(console.log("*** Invoice updated successfully. No content in response."),{message:"Invoice updated successfully.",status:200}):(console.warn("*** Unexpected response status:",o.status),{message:"Unexpected response from server.",status:o.status})}catch(o){throw console.error("Create Invoice error:",o.message),console.error(o.stack),o}};cr.updateInvoiceAttachment=async(e,t)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),ve.defaults.headers.Cookie=t;let o=e.file.buffer,r=e.file.originalname,s=lr.extname(r).replace(".",""),n=lr.basename(r,"."+s),a=r,i=lr.join(iS,"assets/attachment");en.existsSync(i)||en.mkdirSync(i,{recursive:!0});let c=lr.join(i,r);console.log("fullFilePath: *** "+c+" = "+o),en.writeFileSync(c,o),console.log(`*** File saved successfully at ${c}`);let l={Attachments2_Lines:[{FileExtension:s,SourcePath:i.replace(/\\/g,"/"),UserID:e.session.userId,FileName:n}]},u={},p,g={Accept:"application/json","Content-Type":"application/json"},y=await lS.getAttachmentEntry(e.body.DocEntry);if(console.log("Invoice response",JSON.stringify(y)),y&&y?.AtcEntry!==null){if(p=y?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(p)),u=await ve.patch(`${Sc}(${p})`,l),u&&u.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),u=await ve.post(Sc,l,{headers:g}),console.log("Attachment Post API Called"),u.data){console.log("Attachment Post Response:"+JSON.stringify(u.data)),p=u.data.AbsoluteEntry;let C={AttachmentEntry:p},h=await ve.patch(`${tn}(${e.body.DocEntry})`,C);if(h&&h.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",u.status),{message:"Unexpected response from server.",status:u.status}}catch(o){console.error("Invoice Attachment upload error:",o.response?.data||o.message),console.error(o.stack)}};Ec.exports.upload=uS});var Rc=d(Ac=>{var{serviceLayerAPI:Nc}=k(),{portalModules:pS,serviceLayerApiURIs:mS}=T(),yS=pS.INCOMING_PAYMENT,gS=mS[yS];Ac.createIncomingPayment=async(e,t)=>{try{e.DocObjectCode="bopot_IncomingPayments",console.log("*** IncomingPayment request: "+JSON.stringify(e)),Nc.defaults.headers.Cookie=t;let o=await Nc.post(gS,e);return console.log(`Create IncomingPayment response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create IncomingPayment error: "+o),o}}});var Vt=d(dr=>{var{serviceLayerAPI:Tt}=k(),{portalModules:TS,serviceLayerApiURIs:tb}=T(),rn=TS.OSBS;dr.getSalesBatchSelection=async(e,t,o)=>{try{Tt.defaults.headers.Cookie=o;let r=await Tt.get(`${rn}?$filter=U_InvNo eq '${e}' and U_ItemCode eq '${t}'`);return Array.isArray(r?.data?.value)&&r.data.value.length>0?r.data.value[0]:null}catch(r){throw console.log("Get SalesBatchSelection error: "+r),r}};dr.updateSalesBatchSelection=async(e,t)=>{try{return Tt.defaults.headers.Cookie=t,(await Tt.patch(`${rn}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update SalesBatchSelection error: "+o),o}};dr.createSalesBatchSelection=async(e,t,o,r)=>{console.log("*** SalesBatchSelection request: "+JSON.stringify(e));let s=Array.isArray(e)?e:[e],n=[];for(let a of s)try{Tt.defaults.headers.Cookie=r,a.U_InvNo=o;let i=await Tt.post(rn,a),{DocNum:c,LineNum:l,U_ItemCode:u}=i.data;console.log("*** SalesBatchSelection response:**** "+JSON.stringify(i.data)),n.push({DocNum:c,LineNum:l,U_ItemCode:u})}catch(i){console.error(`Error creating OSBS record for item ${a.ItemCode}:`,i.response?.data?.error?.message?.value)}return n}});var Uc=d(Oc=>{var{serviceLayerAPI:bc}=k(),{portalModules:hS,serviceLayerApiURIs:CS}=T(),fS=hS.JOURNAL_ENTRY,SS=CS[fS];Oc.createJournalEntry=async(e,t)=>{try{console.log("*** JournalEntry request: "+JSON.stringify(e)),bc.defaults.headers.Cookie=t;let o=await bc.post(SS,e);return o.data?o.data:void 0}catch(o){throw console.log("Create JournalEntry error: "+o),o}}});var Fc=d((lb,Mc)=>{var{getSLConnection:_c}=j(),sn=on(),IS=Rc(),DS=Vt(),ES=Uc(),sb=Gs(),{formatDate:Pc}=x(),{trxTypes:nb,defaultBranchId:ab,fircaIntegrationWaitTime:ib,enableFircaIntegration:NS,objectCodes:xc,portalModules:wc,enableStoreBasedNumbering:Lc,isHomeDeliveryEnabled:AS}=T(),{submitInvoicetoFirca:RS}=ir(),{getFircaQRCodeDataURI:bS,getUDFData:OS,updateSalesBatchSelection:US,updateTransRef:xS,getUniqueId:wS}=ze(),{getNumberingSeries:vc}=zt(),{getItemDetails:LS,getTimberItemDetails:vS}=ze(),_S=async(e,t,o)=>{try{if(e.body.invoice){let r={},s="",n={},a=await _c(e),i,c=e.body.invoice,l=c.CompanyCode?c.CompanyCode:"";if(AS&&c.U_IsHomeDelivery==="Y"&&(i=Math.floor(1e5+Math.random()*9e5),c.U_DeliveryCode=i),Lc){let p=await vc(xc[wc.INVOICE],e.session.userSessionLog.storeLocation);p&&(console.log("seriesResponse series:",p.Series),c.Series=p.Series)}let u=await wS(c.Unique);if(u?.DocNum)console.log("uniqueResponse unique:",u?.DocNum),r.DocNum=n.DocNum,r.DocEntry=n.DocEntry,r.isExist=!0;else{let p=await sn.createInvoice(c,a);if(p.DocEntry){if(r.DocNum=p.DocNum,r.DocEntry=p.DocEntry,r.isExist=!1,e.body.incomingPayment){if(Lc){let C=await vc(xc[wc.INCOMING_PAYMENT],e.session.userSessionLog.storeLocation);C&&(console.log("seriesResponse series:",C.Series),e.body.incomingPayment.Series=C.Series)}let y=await PS(p.DocEntry,e.body.incomingPayment,a);if(y&&(r.IncomingPaymentDocNum=y.DocNum,s=y.DocEntry,e.body?.journalEntry)){let C=await BS(e.body.journalEntry,p.DocNum,y.DocNum,a);r.JournalEntryDocNum=C?.JdtNum}}if(NS&&await RS(p.DocEntry,l,"Invoice")){let C=await bS(p.DocNum);console.log("qrCodeDataURI",C),r.qrCode=C}let g=await OS(p.DocNum);g&&(r.InvCount=g.U_InvCount,r.SDCTime=g.U_SDCTime,r.SDCInvNum=g.U_SDCInvNum,r.VehicleNo=g.U_VehicleNo)}}if(console.log("*************invoiceSalesBatchResponse start************ "),e.body.salesBatchSelection.length>0){let p=await MS(r.DocEntry,r.DocNum,e.body.salesBatchSelection,a);console.log("*************invoiceSalesBatchResponse************: ",p)}if(console.log("*************invoiceSalesBatchResponse end************ "),e.body.invoice.U_PaymentType==="Card"){if(console.log("*************CreditCard Management referenece start************ "),e.body.incomingPayment?.TransferReference&&e.body.incomingPayment?.TransferReference!==""){console.log("*************CreditCard Management referenece************: ",s+" - "+e.body.incomingPayment.TransferReference);let p=await xS(s,e.body.incomingPayment?.TransferReference);console.log("*************CreditCard Management referenece************: ",p)}console.log("*************CreditCard Management referenece end************ ")}if(r.DocNum){let p=LS({docNum:r.DocNum});r.itemList=p}if(r.DocEntry){let p=vS(r.DocEntry);r.timItemList=p}t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(r){console.log("create Invoice: ",r?.response?.data||r.message),o(r)}},PS=async(e,t,o)=>{try{return t.PaymentInvoices[0].DocEntry=e,Array.isArray(t.PaymentChecks)&&t.PaymentChecks.length>0&&(t.PaymentChecks[0].DueDate=Pc(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")),await IS.createIncomingPayment(t,o)}catch(r){throw r}},BS=async(e,t,o,r)=>{let s=Pc(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{return e.Reference=t,e.Reference2=o,e.TaxDate=s,e.DueDate=s,e.ReferenceDate=s,await ES.createJournalEntry(e,r)}catch(n){throw n}},MS=async(e,t,o,r)=>{try{let s=[];console.log("********* createSalesBatchSelection ****request: ",o);let n=await DS.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let i=await US(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create Invoice: ",s?.response?.data||s.message),s}},FS=async(e,t,o)=>{try{if(e.body){let r={},s=await _c(e),n,a=e.body;a.U_DeliveryStatus=a.U_DeliveryStatus||"DELIVERED",a.U_IsPaymentReceived=a.U_IsPaymentReceived||"Y",console.log("*************request: ",a);let i=await sn.updateInvoice(a,s);(!i||i.status===200||i.DocEntry)&&(r.DocNum=a.DocNum,r.DocEntry=a.DocEntry,r.message=i.message,await Bc(e,s)&&console.log("Attachment updated")),t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(r){console.log("create Invoice: ",r?.response?.data||r.message),o(r)}},Bc=async(e,t)=>{try{let o={};return console.log("attchment request body data: ",JSON.stringify(e.body)),console.log("attchment request: ",e.file.Attachment),o=await sn.updateInvoiceAttachment(e,t),console.log("attchment Response: ",o),o}catch(o){console.log("create Invoice: ",o?.response?.data||o.message)}};Mc.exports={create:_S,update:FS,updateAttach:Bc}});var kc=d((cb,$c)=>{var WS=require("../node_modules/express/index.js"),nn=Fc(),{portalModules:an,permissions:ln}=T(),{checkUserPermission:cn}=N(),$S=on(),ur=new WS.Router,{upload:Wc}=$S;ur.route("/").post(cn([an.INVOICE],ln.CREATE),nn.create);ur.route("/").patch(cn([an.INVOICE],ln.WRITE),Wc.single("Attachment"),nn.update);ur.route("/attachment").patch(cn([an.INVOICE],ln.WRITE),Wc.single("Attachment"),nn.updateAttach);$c.exports=ur});var Jc=d(Hc=>{var{serviceLayerAPI:qc}=k(),{portalModules:kS,serviceLayerApiURIs:qS}=T(),HS=kS.ITEM,JS=qS[HS];Hc.createItem=async(e,t)=>{try{qc.defaults.headers.Cookie=t;let o=await qc.post(JS,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Item Helper error: "+o),o}}});var jc=d((ub,zc)=>{var{getSLConnection:zS}=j(),jS=Jc(),VS=async(e,t,o)=>{try{let r=await zS(e);console.log("*** Item request: "+JSON.stringify(e.body));let s=await jS.createItem(e.body,r);t.status(200).send({ItemCode:s.ItemCode})}catch(r){console.log("create Item: "+JSON.stringify(r)),o(r)}};zc.exports={create:VS}});var Qc=d((gb,Gc)=>{var GS=require("../node_modules/express/index.js"),QS=jc(),{portalModules:pb,permissions:mb}=T(),{checkUserPermission:yb}=N(),Vc=new GS.Router;Vc.route("/").post(QS.create);Gc.exports=Vc});var Yc=d(Gt=>{var{dbCreds:pr}=f();Gt.items=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."ItmsGrpCod", T0."ChapterID", T0."validFor",
    T0."ManBtchNum", T0."SellItem", T0."InvntItem",
    T0."PrchseItem", T0."OnHand", T0."IsCommited", T0."OnOrder", T0."SalUnitMsr", T0."BuyUnitMsr",
    T0."IUoMEntry", T0."PrdStdCst", T0."UserText", T0."InvntryUom",
    T0."U_SG1", T0."U_SG2", T0."U_SG3"
  FROM ${pr.CompanyDB}.OITM T0
    WHERE 1 = 1`;Gt.itemGroups=`SELECT T0."ItmsGrpCod" "ItemGroupCode", T0."ItmsGrpNam" "ItemGroupName"
    FROM ${pr.CompanyDB}.OITB T0`;Gt.itemSubGroups=`SELECT "FieldID", "FldValue" as "Value", "Descr" as "Description"
    FROM ${pr.CompanyDB}."UFD1"
  WHERE "TableID"='OITM'
    AND "FieldID" = ?`;Gt.itemMaxSequenceNo=`SELECT MAX(T0."U_SEQ") as "MaxNo" FROM ${pr.CompanyDB}.OITM T0`});var Kc=d(Qt=>{var mr=S(),yr=Yc();Qt.getItems=e=>{try{let t="",o=[],r="",s="";if(e?.pageNum&&e?.pageSize){let i=e.pageNum,c=e.pageSize,l=(i-1)*c,u=i*c;t=" LIMIT ? OFFSET ? ",o=[c,l]}if(e?.searchKey){let{searchKey:i}=e;isNaN(i)&&(i=i.toUpperCase()),r=` AND (
                  UPPER(T0."ItemCode") LIKE '%${i}%'
                    OR UPPER(T0."ItemName") LIKE '%${i}%'
                    OR UPPER(T0."FrgnName") LIKE '%${i}%' ) `}let n=yr.items+r+s+t;return mr.executeWithValues(n,o)}catch(t){throw console.log("getItems - controller - error: "+JSON.stringify(t.message)),t}};Qt.getItemGroups=()=>{try{return mr.executeWithValues(yr.itemGroups,[])}catch(e){throw console.log("getItemGroups - controller - error: "+JSON.stringify(e.message)),e}};Qt.getItemSubGroups=e=>{try{return mr.executeWithValues(yr.itemSubGroups,[e])}catch(t){throw console.log("getItemSubGroups - controller - error: "+JSON.stringify(t.message)),t}};Qt.getMaxSequenceNo=()=>{try{let e=mr.executeWithValues(yr.itemMaxSequenceNo,[]);return console.log("getItemGroups-: "+JSON.stringify(e)),Array.isArray(e)&&e.length>0?e[0].MaxNo:0}catch(e){throw console.log("getMaxSequenceNo - controller - error: "+JSON.stringify(e.message)),e}}});var Xc=d(Yt=>{var gr=Kc();Yt.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=gr.getItems(e.query);t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};Yt.getGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=gr.getItemGroups();t.send(r)}catch(r){console.log("getGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};Yt.getSubGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params.subGroupId));try{let r=gr.getItemSubGroups(e.params.subGroupId);t.send(r)}catch(r){console.log("getSubGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};Yt.getNextNo=(e,t,o)=>{try{let r=1,s=gr.getMaxSequenceNo();isNaN(parseInt(s))||(r=parseInt(s)+1),t.send({nextNumber:r})}catch(r){console.log("getNextNo - controller - error: "+JSON.stringify(r.message)),o(r)}}});var ed=d((Db,Zc)=>{var YS=require("../node_modules/express/index.js"),Kt=new YS.Router,Tr=Xc(),{checkUserPermission:fb}=N(),{portalModules:Sb,permissions:Ib}=T();Kt.route("/").get(Tr.get);Kt.route("/next-number").get(Tr.getNextNo);Kt.route("/groups").get(Tr.getGroups);Kt.route("/sub-groups/:subGroupId").get(Tr.getSubGroups);Zc.exports=Kt});var td=d(dn=>{var{dbCreds:hr}=f();dn.stockTransferRequest=`SELECT T0."DocNum", T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
    T0."U_DraftStatus", T0."U_OriginatorId", T1."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
    T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
      FROM ${hr.CompanyDB}.OWTQ T0, ${hr.CompanyDB}.OUSR T1
    WHERE T0."UserSign" = T1."USERID"`;dn.itemListForSTR=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity",
    T1."unitMsr" AS "InvntryUom", T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation",
    T1."U_FromBinLoc"
  FROM ${hr.CompanyDB}.WTQ1 T1, ${hr.CompanyDB}.OWTQ T0
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `});var sd=d(un=>{var od=S(),{buildHeaderRecQuery:KS,buildRowLevelQuery:XS}=Se(),rd=td();un.getStockTransferRequest=e=>{try{let t=KS(rd.stockTransferRequest,e);return console.log("getStockTransferRequest- sql: ",t),od.executeWithValues(t)}catch(t){throw console.log("getStockTransferRequest - controller - error: "+JSON.stringify(t.message)),t}};un.getItemDetails=e=>{try{let t=XS(rd.itemListForSTR,e);return{itemsList:od.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var ad=d(pn=>{var nd=sd();pn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=nd.getStockTransferRequest(e.query);t.send(r)}catch(r){console.log("getStockTransferRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};pn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=nd.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var cd=d((Rb,ld)=>{var ZS=require("../node_modules/express/index.js"),mn=new ZS.Router,id=ad(),{checkUserPermission:Cr}=N(),{portalModules:fr,permissions:Sr}=T();mn.route("/").get(Cr(fr.STOCK_TRANSFER_REQUEST,Sr.READ)||Cr(fr.STOCK_TRANSFER,Sr.CREATE),id.get);mn.route("/items").get(Cr(fr.STOCK_TRANSFER_REQUEST,Sr.READ)||Cr(fr.STOCK_TRANSFER,Sr.CREATE),id.getItems);ld.exports=mn});var dd=d(Ir=>{var{dbCreds:Ne}=f();Ir.salesQuotationQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocDueDate",
    T0."CardCode", T0."CardName", T0."NumAtCard",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."SlpCode" "SalesPersonCode",
    T2."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location",
    T0."CntctCode" "ContactPersonCode"
      FROM ${Ne.CompanyDB}.OQUT T0, ${Ne.CompanyDB}.QUT1 T1, ${Ne.CompanyDB}.OSLP T2
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;Ir.itemListForSalesQuotation=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."FreeTxt" "FreeText",
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceBefDi" "PriceBeforDiscount",
    (SELECT E."ItmsGrpNam" FROM  ${Ne.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod", ITM."ManSerNum", ITM."ManBtchNum",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${Ne.CompanyDB}.SPP1 P WHERE P."ItemCode" = T1."ItemCode" 
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
              AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied"
  FROM ${Ne.CompanyDB}.OQUT T0
    INNER JOIN ${Ne.CompanyDB}.QUT1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Ne.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;Ir.updateSQSalesBatchSelectionDocNum=`UPDATE ${Ne.CompanyDB}.QUT1 T1 SET
    T1."U_DocNum" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ?`});var Tn=d(Dr=>{var yn=S(),{buildHeaderRecQuery:eI,buildRowLevelQuery:tI}=Se(),gn=dd();Dr.getSalesQuotation=e=>{try{let t=eI(gn.salesQuotationQuery,e);return console.log("getSalesQuotation- sql: ",t),yn.executeWithValues(t)}catch(t){throw console.log("getSalesQuotation - controller - error: "+JSON.stringify(t.message)),t}};Dr.getItemDetails=e=>{try{let t=tI(gn.itemListForSalesQuotation,e);return{itemsList:yn.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};Dr.updateSQSalesBatchSelection=(e,t)=>{try{if(console.log("updateSQSalesBatchSelection %s",e.DocNum,t,e.U_ItemCode),e){let o=yn.executeWithValues(gn.updateSQSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode]);return console.log("updateSQSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("updateSQSalesBatchSelection - helper - error: "+JSON.stringify(o.message)),o}}});var pd=d(hn=>{var ud=Tn();hn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=ud.getSalesQuotation(e.query);t.send(r)}catch(r){console.log("getSalesQuotation - controller - error: "+JSON.stringify(r.message)),o(r)}};hn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=ud.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Cd=d((xb,hd)=>{var oI=require("../node_modules/express/index.js"),Cn=new oI.Router,md=pd(),{checkUserPermission:yd}=N(),{portalModules:gd,permissions:Td}=T();Cn.route("/").get(yd(gd.SALES_QUOTATION,Td.READ),md.get);Cn.route("/items").get(yd(gd.SALES_QUOTATION,Td.READ),md.getItems);hd.exports=Cn});var fd=d(Xt=>{var{serviceLayerAPI:_e}=k(),{portalModules:rI,serviceLayerApiURIs:sI}=T(),nI=rI.SALES_QUOTATION,Er=sI[nI];Xt.createSalesQuotation=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** SalesQuotation request: "+JSON.stringify(e)),_e.defaults.headers.Cookie=t;let o=await _e.post(Er,e);return console.log(`Create SalesQuotation response: ${JSON.stringify(o.data.DocNum)}`),o.data?o.data:void 0}catch(o){throw console.log("Create SalesQuotation error: "+o),o}};Xt.updateSalesQuotation=async(e,t)=>{try{return console.log("*** SalesQuotation update request: "+JSON.stringify(e)),_e.defaults.headers.Cookie=t,!!await _e.patch(`${Er}(${e.DocEntry})`,e)}catch(o){throw console.log("update SalesQuotation error: "+o),o}};Xt.getSalesQuotation=async(e,t)=>{try{console.log("*** SalesQuotation get request: "+JSON.stringify(e)),_e.defaults.headers.Cookie=t;let o=await _e.get(`${Er}(${e})`);return o?o.data:null}catch(o){throw console.log("get SalesQuotation error: "+o),o}};Xt.putSalesQuotation=async(e,t,o)=>{try{return console.log("*** SalesQuotation put request: "+JSON.stringify(t)),_e.defaults.headers.Cookie=o,!!await _e.put(`${Er}(${e})`,t)}catch(r){throw console.log("put SalesQuotation error: "+r),r}}});var Dd=d((Lb,Id)=>{var{getSLConnection:Sd}=j(),Nr=fd(),fn=Vt(),{enableFircaIntegration:aI,objectCodes:iI,portalModules:lI,enableStoreBasedNumbering:cI}=T(),{submitInvoicetoFirca:dI}=ir(),{updateSQSalesBatchSelection:uI}=Tn(),{getNumberingSeries:pI}=zt(),mI=async(e,t,o)=>{try{let r="",s=e.body.CompanyCode?e.body.CompanyCode:"";if(cI){let i=await pI(iI[lI.SALES_QUOTATION],e.session.userSessionLog.storeLocation);i&&(console.log("seriesResponse series:",i.Series),e.body.Series=i.Series)}let n=await Sd(e),a=await Nr.createSalesQuotation(e.body,n);if(a.DocNum&&(r=a.DocNum,aI)){let i=await dI(a.DocEntry,s,"SalesQuotation")}if(Array.isArray(e.body.salesBatchSelection)&&e.body.salesBatchSelection.length>0){let i=await yI(a.DocEntry,a.DocNum,e.body.salesBatchSelection,n)}t.status(200).send({docNum:r})}catch(r){console.log("create SalesQuotation Controller: ",r?.response?.data||r.message),o(r)}},yI=async(e,t,o,r)=>{try{let s=[],n=await fn.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let i=await uI(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create SalesQuotation SalesBatchSelection: ",s?.response?.data||s.message),s}},gI=async(e,t,o)=>{try{let r=await Sd(e);if(e.body.ItemsDeleted&&e.body.ItemsDeleted.length>0)try{console.log("Sales Quotation delete in Service Layer.",e.body.ItemsDeleted);let{DocEntry:n}=e.body;console.log(`Processing deletion of line items from Quotation ${n}:`,JSON.stringify(e.body.ItemsDeleted));let a=await Nr.getSalesQuotation(n,r);if(console.log("Fetched Quotation for update:",JSON.stringify(a)),!a||!a.DocumentLines)throw console.log("Fetched Quotation Error: ",JSON.stringify(a)),new Error("Quotation not found or invalid structure");let i=e.body.ItemsDeleted.map(l=>l.LineNum);a.DocumentLines=a.DocumentLines.filter(l=>!i.includes(l.LineNum)),console.log("Quotation after removing deleted lines:",JSON.stringify(a));let c=await Nr.putSalesQuotation(n,a,r);if(console.log("PUT Result after deleting lines:",c),!c)throw new Error("Failed to update quotation after deleting lines");console.log(`Deleted line items [${i}] successfully from Quotation ${n}`)}catch(n){throw console.error("Error while deleting line items:",n.message),n}if(console.log("Performing Sales Quotation Patch operation."),await Nr.updateSalesQuotation(e.body,r)){let{salesBatchSelection:n}=e.body;if(Array.isArray(n)&&n.length>0){let a=await Promise.all(n.map(i=>i.DocEntry?fn.updateSalesBatchSelection(i,r):fn.createSalesBatchSelection(i,"",e.body.DocNum,r)))}t.status(200).send({docNum:e.body.DocNum})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("Update SalesQuotation Controller: ",r?.response?.data||r.message),o(r)}};Id.exports={create:mI,update:gI}});var Od=d((vb,bd)=>{var TI=require("../node_modules/express/index.js"),Ed=Dd(),{portalModules:Nd,permissions:Ad}=T(),{checkUserPermission:Rd}=N(),Sn=new TI.Router;Sn.route("/").post(Rd([Nd.SALES_QUOTATION],Ad.CREATE),Ed.create);Sn.route("/").patch(Rd(Nd.SALES_QUOTATION,Ad.WRITE),Ed.update);bd.exports=Sn});var Ud=d(Ar=>{var{dbCreds:Pe}=f(),{draftObjectCodes:_b}=T();Ar.saleOrderQuery=`SELECT DISTINCT T0."BPLId", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocType", 
    T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
      FROM ${Pe.CompanyDB}.ORDR T0, ${Pe.CompanyDB}.RDR1 T1
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"`;Ar.itemListForSaleOrder=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."PriceBefDi" "UnitPrice",
    T1."OpenCreQty" as "Quantity", T1."OpenQty", T1."WhsCode", T1."unitMsr" "UomCode",
    ITM."ManBtchNum", ITM."ManSerNum",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."Project"
  FROM ${Pe.CompanyDB}.ORDR T0
    INNER JOIN ${Pe.CompanyDB}.RDR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Pe.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;Ar.freightInfo=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${Pe.CompanyDB}."ORDR" T0, ${Pe.CompanyDB}."RDR3" T1, ${Pe.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `});var xd=d(En=>{var In=S(),{buildHeaderRecQuery:hI,buildRowLevelQuery:CI}=Se(),Dn=Ud();En.getSaleOrders=e=>{try{let t=hI(Dn.saleOrderQuery,e);return console.log("getSalesQuotation- sql: ",t),In.executeWithValues(t)}catch(t){throw console.log("getSaleOrders - controller - error: "+JSON.stringify(t.message)),t}};En.getItemDetails=e=>{try{let t=CI(Dn.itemListForSaleOrder,e),o=In.executeWithValues(t),r=In.executeWithValues(Dn.freightInfo+`(${docNum})`,[]);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o,freightInfo:r}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var Ld=d(Nn=>{var wd=xd();Nn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=wd.getSaleOrders(e.query);t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};Nn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=wd.getItemDetails(e.query);console.log("getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Pd=d((Fb,_d)=>{var fI=require("../node_modules/express/index.js"),An=new fI.Router,vd=Ld();An.route("/").get(vd.get);An.route("/items").get(vd.getItems);_d.exports=An});var eo=d(Zt=>{var{dbCreds:Rr}=f();Zt.selectTaxInfo=`SELECT "Name", "Code", "Rate" FROM ${Rr.CompanyDB}.OVTG
WHERE "Inactive" = 'N'`;Zt.selectSalesEmployees=`SELECT T0."SlpCode", T0."SlpName", T0."Active" 
    FROM ${Rr.CompanyDB}.OSLP T0 WHERE T0."Active" ='Y'`;Zt.selectPaymentTerms=`SELECT T0."GroupNum" "PaymentTermCode", T0."PymntGroup" FROM ${Rr.CompanyDB}.OCTG T0`;Zt.selectBankInfo=`SELECT T0."BankCode", T0."BankName" FROM ${Rr.CompanyDB}.ODSC T0 WHERE T0."CountryCod" ='FJ'`});var Md=d(Bd=>{var SI=S(),II=eo();Bd.getTaxDefinition=()=>{try{return SI.executeWithValues(II.selectTaxInfo)}catch(e){throw console.log("getTaxDefinition - controller - error: "+JSON.stringify(e.message)),e}}});var Wd=d(Fd=>{var DI=Md();Fd.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=DI.getTaxDefinition();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var qd=d((zb,kd)=>{var EI=require("../node_modules/express/index.js"),$d=new EI.Router,NI=Wd(),{checkUserPermission:qb}=N(),{portalModules:Hb,permissions:Jb}=T();$d.route("/").get(NI.get);kd.exports=$d});var Jd=d(Hd=>{var AI=S(),RI=eo();Hd.getSalesEmployees=(e,t)=>{try{let o;return o=RI.selectSalesEmployees,e&&(o=o+`AND T0."Fax" IN ('${e}')`),t&&(o=o+`AND UPPER(T0."U_POSUser") IN  (UPPER('${t}'))`),console.log("Sql:",o),AI.executeWithValues(o)}catch(o){throw console.log("getSalesEmployees - controller - error: "+JSON.stringify(o.message)),o}}});var Vd=d(jd=>{var zd=Jd();jd.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r,s;r=e.query.userCode??"",s=e.query.storeLocation??"";let n=[];n=zd.getSalesEmployees(s,r),Array.isArray(n)&&n.length===0&&(n=zd.getSalesEmployees(s,"")),t.send(n)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Yd=d((Gb,Qd)=>{var bI=require("../node_modules/express/index.js"),Gd=new bI.Router,OI=Vd();Gd.route("/").get(OI.get);Qd.exports=Gd});var Xd=d(Kd=>{var UI=Wt();Kd.getSalesEmployee=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=UI.getSalesEmployeeForUser(e.query.userId);t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var tu=d((Yb,eu)=>{var xI=require("../node_modules/express/index.js"),Zd=new xI.Router,wI=Xd();Zd.route("/sales-employee").get(wI.getSalesEmployee);eu.exports=Zd});var ru=d(ou=>{var LI=S(),vI=eo();ou.getPaymentTerms=()=>{try{return LI.executeWithValues(vI.selectPaymentTerms)}catch(e){throw console.log("getPaymentTerms - controller - error: "+JSON.stringify(e.message)),e}}});var nu=d(su=>{var _I=ru();su.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=_I.getPaymentTerms();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var lu=d((Zb,iu)=>{var PI=require("../node_modules/express/index.js"),au=new PI.Router,BI=nu();au.route("/").get(BI.get);iu.exports=au});var du=d(cu=>{var MI=S(),FI=eo();cu.getBanks=()=>{try{return MI.executeWithValues(FI.selectBankInfo)}catch(e){throw console.log("getBanks - controller - error: "+JSON.stringify(e.message)),e}}});var pu=d(uu=>{var WI=du();uu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=WI.getBanks();t.send(r)}catch(r){console.log("get Banks - controller - error: "+JSON.stringify(r.message)),o(r)}}});var gu=d((oO,yu)=>{var $I=require("../node_modules/express/index.js"),mu=new $I.Router,kI=pu();mu.route("/").get(kI.get);yu.exports=mu});var hu=d(Tu=>{var qI=Ht();Tu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=qI.getLocations();t.send(r)}catch(r){console.log("get Locations - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Su=d((sO,fu)=>{var HI=require("../node_modules/express/index.js"),Cu=new HI.Router,JI=hu();Cu.route("/").get(JI.get);fu.exports=Cu});var Du=d(Iu=>{var zI=S(),{dbCreds:br}=f();Iu.getWarehouses=e=>{try{let t=[],o=`SELECT T0."WhsCode", T0."WhsName", T1."BinCode", T0."Location" "LocationCode",
        T2."Location" "LocationName", T0."U_GITWH" "GitWHCode"
      FROM ${br.CompanyDB}.OWHS T0
        LEFT OUTER JOIN ${br.CompanyDB}.OBIN T1 ON T0."DftBinAbs" = T1."AbsEntry"
        INNER JOIN ${br.CompanyDB}.OLCT T2 ON T0."Location" = T2."Code"`,r=` WHERE T0."Inactive" ='N'`;e.branchId&&(o=o+` INNER JOIN ${br.CompanyDB}.OBPL T3 ON T0."BPLid" = T3."BPLId"`,r=r+' AND T0."BPLid" = ?',t.push(e.branchId)),e.locationCode&&(r=r+' AND T0."Location" = ?',t.push(e.locationCode));let s=' ORDER BY T0."WhsCode"';return zI.executeWithValues(o+r+s,t)}catch(t){throw console.log("getWarehouses - error: "+JSON.stringify(t)),t}}});var Nu=d(Eu=>{var jI=Du();Eu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=jI.getWarehouses(e.query);t.send(r)}catch(r){console.log("get WHs - controller - error: "+JSON.stringify(r.message)),o(r)}}});var bu=d((iO,Ru)=>{var VI=require("../node_modules/express/index.js"),Au=new VI.Router,GI=Nu();Au.route("/").get(GI.get);Ru.exports=Au});var Uu=d((lO,Ou)=>{var{dbCreds:W}=f(),QI=`SELECT T0."CardCode", T0."CardName", T0."Cellular", T0."U_OneTimeCustomer", T0."U_COD", T0."U_Fin_Status",
    T0."U_CustomerType",
    T0."CreditLine" as "CreditLimit", T0."CreditLine" - (T0."Balance" + T0."DNotesBal") as "AvailableBalance",
    T0."SlpCode" "SalesEmployeeCode", T0."LicTradNum"
  FROM ${W.CompanyDB}.OCRD T0
WHERE T0."CardType" ='C'`,YI=`SELECT T0."CardCode", T1."AdresType", T1."Address", T1."Building", T1."Street",
  T1."City", T1."LicTradNum", T1."Block"
FROM ${W.CompanyDB}.OCRD T0
  INNER JOIN ${W.CompanyDB}.CRD1 T1 ON T0."CardCode" = T1."CardCode"
WHERE T1."AdresType" = 'S'
  AND T0."CardCode" = ?`,KI=`SELECT T0."CardCode", T0."Name", T0."CntctCode" AS "ContactCode" FROM ${W.CompanyDB}.OCPR T0
  WHERE T0."CardCode" = ?`,XI=`SELECT "Price", "FromDate", "ToDate"
  FROM ${W.CompanyDB}.SPP1
  WHERE "ItemCode" = ?
    AND "CardCode" = ?
    AND "FromDate" <= CURRENT_DATE
    AND IFNULL("ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,ZI=`SELECT B."Price", A."FromDate", A."ToDate"
  FROM ${W.CompanyDB}.SPP1 A
  INNER JOIN ${W.CompanyDB}."ITM1" B
    ON A."ItemCode" = B."ItemCode"
            AND A."ListNum" = B."PriceList"
  WHERE A."ItemCode" = ?
    AND A."CardCode" = '*1'
    AND A."FromDate" <= CURRENT_DATE
    AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,eD=`SELECT T2."Price", CURRENT_DATE as "FromDate", CURRENT_DATE as "ToDate"
  FROM ${W.CompanyDB}."OWHS" T0
    INNER JOIN ${W.CompanyDB}."OBPL" T1
      ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${W.CompanyDB}."ITM1" T2
      ON T1."U_PrcList" = T2."PriceList"
    WHERE T0."WhsCode" = ?
      AND T2."ItemCode" = ?
  LIMIT 1`,tD=`SELECT "Price", "ItemCode", "CardCode", "WhsCode"
FROM (
    SELECT S1."Price", S1."ItemCode", S1."CardCode", 'S101' AS "WhsCode", 1 AS "Priority"
    FROM ${W.CompanyDB}."SPP1" S1
    WHERE S1."FromDate" <= CURRENT_DATE AND IFNULL(S1."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT B."Price", A."ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 2 AS "Priority"
    FROM ${W.CompanyDB}."SPP1" A
    INNER JOIN ${W.CompanyDB}."ITM1" B ON A."ItemCode" = B."ItemCode" AND A."ListNum" = B."PriceList"
    WHERE A."CardCode" = '*1' AND A."FromDate" <= CURRENT_DATE AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT T2."Price", T2."ItemCode", 'C4290' AS "CardCode", T0."WhsCode", 3 AS "Priority"
    FROM ${W.CompanyDB}."OWHS" T0
    INNER JOIN ${W.CompanyDB}."OBPL" T1 ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${W.CompanyDB}."ITM1" T2 ON T1."U_PrcList" = T2."PriceList"
    
    UNION ALL
    
    SELECT "Price", "ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 4 AS "Priority"
    FROM ${W.CompanyDB}."ITM1"
    WHERE "PriceList" = 1
)
WHERE "ItemCode" = ? 
  AND "CardCode" = ?
  AND "WhsCode" = ?
ORDER BY "Priority" ASC
LIMIT 1`;Ou.exports={selectCustomerInfo:QI,selectCustomerAddress:YI,selectCustomerContactPerson:KI,selectCustomerSpecialPrice1:XI,selectCustomerSpecialPrice2:ZI,selectCustomerSpecialPrice3:eD,selectCustomerSpecialPriceNew:tD}});var xu=d(to=>{var ht=S(),Ct=Uu();to.getCustomerInfo=e=>{let t=Ct.selectCustomerInfo;e?.searchKey&&(t+=` AND (UPPER(T0."CardCode") LIKE UPPER('%${e.searchKey}%')
             OR UPPER(T0."CardName") LIKE UPPER('%${e.searchKey}%')
             OR T0."Cellular" LIKE '%${e.searchKey}%')`),e?.oneTimeCustomer==="Y"&&(t+=` AND T0."U_OneTimeCustomer" = 'Y'`);try{let o=ht.executeWithValues(t,[]);return Array.isArray(o)&&o.length>0?e?.oneTimeCustomer==="Y"?o[0]:o:[]}catch(o){throw o}};to.getCustomerAddress=e=>{try{let t=ht.executeWithValues(Ct.selectCustomerAddress,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};to.getCustomerContactPerson=e=>{try{let t=ht.executeWithValues(Ct.selectCustomerContactPerson,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};to.getCustomerSpecialPrice=(e,t,o)=>{try{let r=ht.executeWithValues(Ct.selectCustomerSpecialPrice1,[t,e]);if(Array.isArray(r)&&r.length>0)return r[0];let s=ht.executeWithValues(Ct.selectCustomerSpecialPrice2,[t]);if(Array.isArray(s)&&s.length>0)return s[0];let n=ht.executeWithValues(Ct.selectCustomerSpecialPrice3,[o,t]);return Array.isArray(n)&&n.length>0?n[0]:""}catch(r){throw r}}});var wu=d(oo=>{var{getCustomerInfo:oD,getCustomerAddress:rD,getCustomerContactPerson:sD,getCustomerSpecialPrice:nD}=xu();oo.get=(e,t,o)=>{console.log("*** getCustomerInfo - req.query: "+JSON.stringify(e.query));try{let r=oD(e.query);console.log("getCustomerInfo %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getCustomerInfo - controller - error: "+JSON.stringify(r)),o(r)}};oo.getAddress=(e,t,o)=>{console.log("*** getAddress - req.params: "+JSON.stringify(e.params));try{let r=rD(e.params.cardCode);t.send(r)}catch(r){console.log("getAddress - controller - error: "+JSON.stringify(r)),o(r)}};oo.getContactPerson=(e,t,o)=>{console.log("*** getContactPerson - req.params: "+JSON.stringify(e.params));try{let r=sD(e.params.cardCode);console.log("getContactPerson %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getContactPerson - controller - error: "+JSON.stringify(r)),o(r)}};oo.getSpecialPrice=(e,t,o)=>{console.log("*** getSpecialPrice - req.params: "+JSON.stringify(e.params)),console.log("*** getSpecialPrice - req.query: "+JSON.stringify(e.query));try{let r=nD(e.params.cardCode,e.query.itemCode,e.query.warehouseCode);console.log("getSpecialPrice %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getSpecialPrice - controller - error: "+JSON.stringify(r)),o(r)}}});var vu=d((uO,Lu)=>{var aD=require("../node_modules/express/index.js"),ro=new aD.Router,Or=wu();ro.route("/").get(Or.get);ro.route("/:cardCode/address").get(Or.getAddress);ro.route("/:cardCode/contact-person").get(Or.getContactPerson);ro.route("/:cardCode/special-price").get(Or.getSpecialPrice);Lu.exports=ro});var _u=d(Rn=>{var{dbCreds:ft}=f();Rn.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${ft.CompanyDB}.ORIN T0, ${ft.CompanyDB}.RIN1 T1, ${ft.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;Rn.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal"
  FROM ${ft.CompanyDB}.ORIN T0
    INNER JOIN ${ft.CompanyDB}.RIN1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${ft.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `});var Mu=d(bn=>{var Pu=S(),{buildHeaderRecQuery:iD,buildRowLevelQuery:lD}=Se(),Bu=_u();bn.getCreditMemo=e=>{try{let t=iD(Bu.creditMemoQuery,e);return console.log("getCreditMemo- sql: ",t),Pu.executeWithValues(t)}catch(t){throw console.log("getCreditMemo - controller - error: "+JSON.stringify(t.message)),t}};bn.getItemDetails=e=>{try{let t=lD(Bu.itemListForCreditMemo,e),o=Pu.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var Wu=d(On=>{var Fu=Mu();On.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Fu.getCreditMemo(e.query);t.send(r)}catch(r){console.log("get CreditMemo - controller - error: "+JSON.stringify(r.message)),o(r)}};On.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Fu.getItemDetails(e.query);console.log("getItems-CreditMemo controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var zu=d((gO,Ju)=>{var cD=require("../node_modules/express/index.js"),Un=new cD.Router,$u=Wu(),{checkUserPermission:ku}=N(),{portalModules:qu,permissions:Hu}=T();Un.route("/").get(ku(qu.CREDIT_MEMO,Hu.READ),$u.get);Un.route("/items").get(ku(qu.CREDIT_MEMO,Hu.READ),$u.getItems);Ju.exports=Un});var Gu=d(Vu=>{var{serviceLayerAPI:ju}=k(),{portalModules:dD,serviceLayerApiURIs:uD}=T(),pD=dD.CREDIT_MEMO,mD=uD[pD];Vu.createCreditMemo=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemo request: "+JSON.stringify(e)),ju.defaults.headers.Cookie=t;let o=await ju.post(mD,e);return console.log(`Create CreditMemo response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemo error: "+o),o}}});var Yu=d((hO,Qu)=>{var{getSLConnection:yD}=j(),gD=Gu(),TD=async(e,t,o)=>{try{let r=await yD(e),s=await gD.createCreditMemo(e.body,r);t.status(200).send({DocNum:s.DocNum})}catch(r){console.log("create CreditMemo Controller: "+JSON.stringify(r)),o(r)}};Qu.exports={create:TD}});var Zu=d((CO,Xu)=>{var hD=require("../node_modules/express/index.js"),CD=Yu(),{portalModules:fD,permissions:SD}=T(),{checkUserPermission:ID}=N(),Ku=new hD.Router;Ku.route("/").post(ID([fD.CREDIT_MEMO],SD.CREATE),CD.create);Xu.exports=Ku});var ep=d(so=>{var{dbCreds:Be}=f();so.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${Be.CompanyDB}.ORRR T0, ${Be.CompanyDB}.RRR1 T1, ${Be.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;so.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal",
    T1."U_ReturnedInvoiceNos", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."U_ReturnReason"
  FROM ${Be.CompanyDB}.ORRR T0
    INNER JOIN ${Be.CompanyDB}.RRR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Be.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;so.creditMemoAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${Be.CompanyDB}.ORRR T0
  WHERE T0."DocEntry" = ?`;so.AttachmentPath=`SELECT T0."AttachPath"
    FROM ${Be.CompanyDB}.OADP T0`});var xn=d(no=>{var Ur=S(),{buildHeaderRecQuery:DD,buildRowLevelQuery:ED}=Se(),xr=ep();no.getCreditMemoRequest=e=>{try{let t=DD(xr.creditMemoQuery,e,['T0."U_CODCntName"']);return console.log("getCreditMemoRequest- sql: ",t),Ur.executeWithValues(t)}catch(t){throw console.log("getCreditMemoRequest - controller - error: "+JSON.stringify(t.message)),t}};no.getItemDetails=e=>{try{let t=ED(xr.itemListForCreditMemo,e),o=Ur.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};no.getAttachmentEntry=e=>{try{let t=Ur.executeWithValues(xr.creditMemoAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};no.getAttachmentPath=()=>{try{let e=Ur.executeWithValues(xr.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(e.message)),e}}});var op=d(wn=>{var tp=xn();wn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=tp.getCreditMemoRequest(e.query);t.send(r)}catch(r){console.log("get CreditMemoRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};wn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=tp.getItemDetails(e.query);console.log("getItems-CreditMemoRequest controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var lp=d((DO,ip)=>{var ND=require("../node_modules/express/index.js"),Ln=new ND.Router,rp=op(),{checkUserPermission:sp}=N(),{portalModules:np,permissions:ap}=T();Ln.route("/").get(sp(np.CREDIT_MEMO_REQUEST,ap.READ),rp.get);Ln.route("/items").get(sp(np.CREDIT_MEMO_REQUEST,ap.READ),rp.getItems);ip.exports=Ln});var Pn=d((_n,yp)=>{var{serviceLayerAPI:St}=k(),{portalModules:up,serviceLayerApiURIs:AD}=T(),cp=xn(),RD=up.CREDIT_MEMO_REQUEST,pp=AD[RD],dp=up.ATTACHMENTS,bD=require("fs"),vn=require("path"),EO=require("../node_modules/pdfkit/js/pdfkit.js"),mp=require("../node_modules/multer/index.js"),OD=mp.memoryStorage(),UD=mp({storage:OD});_n.createCreditMemoRequest=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemoRequest request: "+JSON.stringify(e)),St.defaults.headers.Cookie=t;let o=await St.post(pp,e);return console.log(`Create CreditMemoRequest response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemoRequest error: "+o),o}};_n.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),St.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=vn.extname(s).replace(".",""),a=vn.basename(s,"."+n),i=s,l=(await cp.getAttachmentPath()).AttachPath;console.log("source_dir",l);let u=vn.join(l,s);console.log("fullFilePath: *** "+u+" = "+r),bD.writeFileSync(u,r),console.log(`*** File saved successfully at ${u}`);let p={Attachments2_Lines:[{FileExtension:n,SourcePath:l,FileName:a}]},g={},y,C={Accept:"application/json","Content-Type":"application/json"};console.log("att_pdf",p);let h=await cp.getAttachmentEntry(t);if(console.log("Invoice response",JSON.stringify(h)),h&&h?.AtcEntry!==null){if(y=h?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(y)),g=await St.patch(`${dp}(${y})`,p),g&&g.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),g=await St.post(dp,p,{headers:C}),console.log("Attachment Post API Called"),g.data){console.log("Attachment Post Response:"+JSON.stringify(g.data)),y=g.data.AbsoluteEntry;let B={AttachmentEntry:y},D=await St.patch(`${pp}(${t})`,B);if(D&&D.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",g.status),{message:"Unexpected response from server.",status:g.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};yp.exports.upload=UD});var hp=d((NO,Tp)=>{var{getSLConnection:xD}=j(),gp=Pn(),wD=ze(),{getNumberingSeries:LD}=zt(),{objectCodes:vD,portalModules:_D,enableStoreBasedNumbering:PD}=T(),BD=async(e,t,o)=>{try{let r={},s={},n=JSON.parse(e.body.salesReturnData);console.log("req.body.salesReturnData",n),Array.isArray(n)&&n.length>0&&(r=n[0],s=n[1]);let a=e.file;if(console.log("request Data",a),PD){let l=await LD(vD[_D.CREDIT_MEMO_REQUEST],e.session.userSessionLog.storeLocation);l&&(console.log("seriesResponse series:",l.Series),r.Series=l.Series)}let i=await xD(e),c=await gp.createCreditMemoRequest(r,i);if(s){let l=wD.updateRemainingQuantity(s)}console.log("attachmentFile",a),a&&await MD(e,c.DocEntry,i)&&console.log("Attachment updated"),t.status(200).send({DocNum:c.DocNum,DocEntry:c.DocEntry})}catch(r){console.log("create CreditMemoRequest Controller: "+JSON.stringify(r)),o(r)}},MD=async(e,t,o)=>{try{let r={};return r=await gp.updateInvoiceAttachment(e,t,o),r}catch(r){console.log("create Invoice: "+JSON.stringify(r))}};Tp.exports={create:BD}});var Sp=d((AO,fp)=>{var FD=require("../node_modules/express/index.js"),WD=hp(),{portalModules:$D,permissions:kD}=T(),{checkUserPermission:qD}=N(),Cp=new FD.Router,HD=Pn(),{upload:JD}=HD;Cp.route("/").post(qD([$D.CREDIT_MEMO_REQUEST],kD.CREATE),JD.single("attachment"),WD.create);fp.exports=Cp});var Ip=d(Bn=>{var{dbCreds:he}=f();Bn.inventoryCounting=`SELECT T0."DocNum", T0."DocEntry", T0."CountDate", T0."Time", T0."Status", T0."Remarks", T0."BPLId", T0."BPLName",
  T0."U_Location"
    FROM ${he.CompanyDB}.OINC T0
    JOIN ${he.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
  WHERE T0."Status" = 'O'
  AND T3."CounterId" = ?`;Bn.itemListForInventoryCounting=`SELECT T1."ItemCode", T1."ItemDesc", T1."LineNum", T1."WhsCode", T4."BinCode", T1."CountQty", 
    T1."CountDate", T1."CountTime",T2."TotalQty", 
    (SELECT STRING_AGG(F."BcdCode", ', ') FROM  ${he.CompanyDB}.OBCD F
        WHERE F."ItemCode" = ITM."ItemCode") AS "CodeBars",  
    (SELECT E."ItmsGrpNam" FROM  ${he.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod" = ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod"
  FROM ${he.CompanyDB}.OINC T0
    INNER JOIN ${he.CompanyDB}.INC1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${he.CompanyDB}.INC9 T2 ON T0."DocEntry" = T2."DocEntry" 
    INNER JOIN ${he.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
    LEFT JOIN ${he.CompanyDB}.OBIN T4 ON T1."BinEntry" = T4."AbsEntry"
    INNER JOIN ${he.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T1."LineNum" = T2."LineNum" 
    AND T2."CounterNum" = T3."CounterNum"
    AND T0."DocNum" = ?
    AND T3."CounterId" = ?`});var Np=d(Mn=>{var Dp=S(),{buildHeaderRecQuery:zD,buildRowLevelQuery:bO}=Se(),Ep=Ip();Mn.getInventoryCounting=e=>{try{let t=zD(Ep.inventoryCounting,e,null,"CountDate");return console.log("getInventoryCounting- sql: ",t),Dp.executeWithValues(t,[e.counterId])}catch(t){throw console.log("getInventoryCounting - controller - error: "+JSON.stringify(t.message)),t}};Mn.getItemDetails=e=>{try{return{itemsList:Dp.executeWithValues(Ep.itemListForInventoryCounting,[e.docNum,e.counterId])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var Rp=d(Fn=>{var Ap=Np();Fn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Ap.getInventoryCounting(e.query);t.send(r)}catch(r){console.log("get - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}};Fn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Ap.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Up=d((vO,Op)=>{var jD=require("../node_modules/express/index.js"),Wn=new jD.Router,bp=Rp(),{checkUserPermission:xO}=N(),{portalModules:wO,permissions:LO}=T();Wn.route("/").get(bp.get);Wn.route("/items").get(bp.getItems);Op.exports=Wn});var wp=d($n=>{var{serviceLayerAPI:wr}=k(),{portalModules:VD,serviceLayerApiURIs:GD}=T(),QD=VD.INVENTORY_COUNTING,xp=GD[QD];$n.createInventoryCounting=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** InventoryCounting request: "+JSON.stringify(e)),wr.defaults.headers.Cookie=t;let o=await wr.post(xp,e);return console.log(`Create InventoryCounting response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create InventoryCounting error: "+o),o}};$n.updateInventoryCounting=async(e,t)=>{try{return console.log("*** InventoryCounting update request: "+JSON.stringify(e)),wr.defaults.headers.Cookie=t,!!await wr.patch(`${xp}(${e.DocumentEntry})`,e)}catch(o){throw console.log("Create InventoryCounting error: "+o),o}}});var Pp=d(kn=>{var{getSLConnection:vp}=j(),_p=wp(),Lp=Vt();kn.create=async(e,t,o)=>{try{let r=await vp(e),s=await _p.createInventoryCounting(e.body,r),n="";s&&(n=s.DocumentNumber),t.status(200).send({docNum:n})}catch(r){console.log("create InventoryCounting Controller: "+JSON.stringify(r)),o(r)}};kn.update=async(e,t,o)=>{try{let r=await vp(e),{SalesBatchSelection:s}=e.body,n=e.body.DocNum;if(delete e.body.SalesBatchSelection,delete e.body.DocNum,console.log("Update InventoryCounting request: "+JSON.stringify(e.body)),await _p.updateInventoryCounting(e.body,r)){if(Array.isArray(s)&&s.length>0){let i=await Promise.all(s.map(c=>c.DocEntry?(console.log("Update SBS -------->"),Lp.updateSalesBatchSelection(c,r)):Lp.createSalesBatchSelection(c,"",n,r)))}t.status(200).send({success:!0,message:"Success"})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("update InventoryCounting Controller: "+JSON.stringify(r)),o(r)}}});var Fp=d((WO,Mp)=>{var YD=require("../node_modules/express/index.js"),Bp=Pp(),{portalModules:BO,permissions:MO}=T(),{checkUserPermission:FO}=N(),qn=new YD.Router;qn.route("/").post(Bp.create);qn.route("/").patch(Bp.update);Mp.exports=qn});var Wp=d(ao=>{var{dataSource:Lr}=J(),vr=Is(),Hn="userGroupId";ao.createUserGroup=async e=>{try{return await Lr.getRepository(vr).save(e)}catch(t){throw t}};ao.getUserGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Hn]=e.id,delete e.id);try{let o=Lr.getRepository(vr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupId:"ASC"}})}catch(o){throw o}};ao.updateUserGroup=async(e,t)=>{try{let o=Lr.getRepository(vr),r={};return console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(r=await o.update({[Hn]:e},t)),r}catch(o){throw o}};ao.deleteUserGroup=async e=>{try{return await Lr.getRepository(vr).delete({[Hn]:e})}catch(t){throw t}}});var $p=d(It=>{var io=Wp();It.create=async(e,t,o)=>{if(!e.body||!e.session.userId||!e.body.groupId){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await io.createUserGroup(e.body);t.send(r)}catch(r){console.error("Error creating UserGroup!"),o(r)}};It.findAll=async(e,t,o)=>{try{let r=await io.getUserGroup(e.query);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};It.findOne=async(e,t,o)=>{try{let r=await io.getUserGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};It.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await io.updateUserGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating UserGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};It.delete=async(e,t,o)=>{try{let r=await io.deleteUserGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserGroup!"),o(r)}}});var qp=d((qO,kp)=>{var KD=require("../node_modules/express/index.js"),lo=$p(),Dt=new KD.Router;Dt.post("/",lo.create);Dt.get("/",lo.findAll);Dt.get("/:id",lo.findOne);Dt.put("/:id",lo.update);Dt.delete("/:id",lo.delete);kp.exports=Dt});var Jp=d(Et=>{var co=qo(),{formatDate:Hp}=x(),XD="storeName";Et.create=async(e,t,o)=>{if(!e.body||!e.body[XD]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body),e.body.createdBy=e.session.userId,e.body.createdAt=Hp(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await co.createStore(e.body);t.send(r)}catch(r){console.error("Error creating Store!"),o(r)}};Et.findAll=async(e,t,o)=>{try{let r=await co.getStore(e.query);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};Et.findOne=async(e,t,o)=>{try{let r=await co.getStore(e.params,1);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};Et.update=async(e,t,o)=>{if(e.params.id&&e.body){e.body.modifiedBy=e.session.userId,e.body.modifiedAt=Hp(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await co.updateStore(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating Store!"),o(r)}}else t.status(400).send({message:"Invalid request!"})};Et.delete=async(e,t,o)=>{try{let r=await co.deleteStore(e.params.id);t.send(r)}catch(r){console.error("Error deleting Store!"),o(r)}}});var Gp=d(Ge=>{var{createStoreWarehouse:ZD,getStoreWarehouse:zp,updateStoreWarehouse:eE,deleteStoreWarehouse:jp,parentPrimaryKey:Jn}=qe(),{formatDate:Vp}=x();Ge.create=async(e,t,o)=>{if(console.log("Create StoreWarehouse - req.body: ",e.body),console.log("Create StoreWarehouse - req.params: ",e.params),!e.body||!e.params[Jn]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Vp(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await ZD(e.body,e.params[Jn],r,s);t.send(n)}catch(n){console.error("Error creating StoreWarehouse!"),o(n)}};Ge.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await zp(r);t.send(s)}catch(s){console.error("Error getting StoreWarehouse!"),o(s)}};Ge.findOne=async(e,t,o)=>{try{let r=await zp(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreWarehouse!"),o(r)}};Ge.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Vp(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await eE(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreWarehouse!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Ge.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await jp(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}};Ge.deleteAll=async(e,t,o)=>{if(!e.params[Jn]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await jp(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}}});var Xp=d(Qe=>{var{createStoreCounter:tE,getStoreCounter:Qp,updateStoreCounter:oE,deleteStoreCounter:Yp,parentPrimaryKey:zn}=Ds(),{formatDate:Kp}=x();Qe.create=async(e,t,o)=>{if(console.log("Create StoreCounter - req.body: ",e.body),console.log("Create StoreCounter - req.params: ",e.params),!e.body||!e.params[zn]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Kp(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await tE(e.body,e.params[zn],r,s);t.send(n)}catch(n){console.error("Error creating StoreCounter!"),o(n)}};Qe.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Qp(r);t.send(s)}catch(s){console.error("Error getting StoreCounter!"),o(s)}};Qe.findOne=async(e,t,o)=>{try{let r=await Qp(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreCounter!"),o(r)}};Qe.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Kp(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await oE(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreCounter!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Qe.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Yp(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}};Qe.deleteAll=async(e,t,o)=>{if(!e.params[zn]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Yp(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}}});var om=d(Ye=>{var{createStoreUser:rE,getStoreUser:Zp,updateStoreUser:sE,deleteStoreUser:em,parentPrimaryKey:jn}=Es(),{formatDate:tm}=x();Ye.create=async(e,t,o)=>{if(console.log("Create StoreUser - req.body: ",e.body),console.log("Create StoreUser - req.params: ",e.params),!e.body||!e.params[jn]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=tm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await rE(e.body,e.params[jn],r,s);t.send(n)}catch(n){console.error("Error creating StoreUser!"),o(n)}};Ye.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Zp(r);t.send(s)}catch(s){console.error("Error getting StoreUser!"),o(s)}};Ye.findOne=async(e,t,o)=>{try{let r=await Zp(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreUser!"),o(r)}};Ye.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=tm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await sE(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreUser!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Ye.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await em(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}};Ye.deleteAll=async(e,t,o)=>{if(!e.params[jn]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await em(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}}});var sm=d((VO,rm)=>{var nE=require("../node_modules/express/index.js"),uo=Jp(),Nt=Gp(),At=Xp(),Rt=om(),{parentPrimaryKey:bt}=qe(),{portalModules:R,permissions:O}=T(),{checkUserPermission:U}=N(),b=new nE.Router;b.post("/",U(R.STORE_SETUP,O.CREATE),uo.create);b.get("/",U(R.STORE_SETUP,O.READ),uo.findAll);b.get("/:id",U(R.STORE_SETUP,O.READ),uo.findOne);b.put("/:id",U(R.STORE_SETUP,O.WRITE),uo.update);b.delete("/:id",U(R.STORE_SETUP,O.CANCEL),uo.delete);b.post(`/:${bt}/warehouse/`,U(R.STORE_WAREHOUSE,O.CREATE),Nt.create);b.get(`/:${bt}/warehouse/`,U([R.STORE_WAREHOUSE,R.INVOICE],O.READ),Nt.findAll);b.get("/warehouse/find",U(R.STORE_WAREHOUSE,O.READ),Nt.findAll);b.get("/warehouse/:id",U(R.STORE_WAREHOUSE,O.READ),Nt.findOne);b.put("/warehouse/:id",U(R.STORE_WAREHOUSE,O.WRITE),Nt.update);b.delete("/warehouse/:id",U(R.STORE_WAREHOUSE,O.CANCEL),Nt.delete);b.post(`/:${bt}/counter/`,U(R.STORE_COUNTER,O.CREATE),At.create);b.get(`/:${bt}/counter/`,U(R.STORE_COUNTER,O.READ),At.findAll);b.get("/counter/find",U(R.STORE_COUNTER,O.READ),At.findAll);b.get("/counter/:id",U(R.STORE_COUNTER,O.READ),At.findOne);b.put("/counter/:id",U(R.STORE_COUNTER,O.WRITE),At.update);b.delete("/counter/:id",U(R.STORE_COUNTER,O.CANCEL),At.delete);b.post(`/:${bt}/user/`,U(R.STORE_USER,O.CREATE),Rt.create);b.get(`/:${bt}/user/`,U(R.STORE_USER,O.READ),Rt.findAll);b.get("/user/find",U(R.STORE_USER,O.READ),Rt.findAll);b.get("/user/:id",U(R.STORE_USER,O.READ),Rt.findOne);b.put("/user/:id",U(R.STORE_USER,O.WRITE),Rt.update);b.delete("/user/:id",U(R.STORE_USER,O.CANCEL),Rt.delete);rm.exports=b});var am=d(po=>{var{dataSource:_r}=J(),Pr=hs(),nm="parkedTransactionId",aE="parkedDateTime",iE="ASC",{getStoreWarehouse:lE}=qe();po.createParkedTransaction=async e=>{try{return await _r.getRepository(Pr).save(e)}catch(t){throw t}};po.getParkedTransaction=async(e,t,o=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[nm]=e.id,delete e.id);try{let r=_r.getRepository(Pr),s;if(o===1?s=await r.findOneBy(e):s=await r.find({where:e,order:{[aE]:iE}}),!s)return[];let n=[];for(let a of s){let{data:i}=a,c;try{c=JSON.parse(i)}catch(p){console.error(`Error parsing data for record with storeId ${t}:`,p);continue}console.log("ParsedData",c);let l=[];try{l=(await lE({storeId:t})).map(g=>g.warehouseCode)}catch(p){console.error(`Error fetching warehouse list for storeId ${t}:`,p);continue}console.log("WarehouseList",l);let u=c.salesItems.every(p=>{let g=l.includes(p.WhsCode);return g||console.error(`Invalid WhsCode: ${p.WhsCode}, WarehouseList: ${l}`),g});console.log("allWhsCodesValid",u),u&&n.push(a)}return n}catch(r){throw r}};po.getLatestNextRefNum=async()=>{try{let t=await _r.getRepository(Pr).find({order:{nextRefNum:"DESC"},take:1});return t.length===0?1:t[0].nextRefNum}catch(e){throw e}};po.deleteParkedTransaction=async e=>{try{return await _r.getRepository(Pr).delete({[nm]:e})}catch(t){throw t}}});var lm=d(yo=>{var mo=am(),{formatDate:im}=x();yo.create=async(e,t,o)=>{if(!e.body||!e.body.transactionType||!e.body.data){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let{userSessionLog:r}=e.session;e.body.userId=r.userId,e.body.userName=r.userName,e.body.storeId=r.storeId,e.body.storeLocation=r.storeLocation,e.body.storeCounterId=r.storeCounterId,e.body.counterCode=r.counterCode,e.body.parkedDateTime=im(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let{data:s}=e.body;s&&typeof s=="object"&&!Array.isArray(s)&&(s=JSON.stringify(s),e.body.data=s);let n=await mo.getLatestNextRefNum();e.body.transactionRefNum=`${n}-${im(new Date,"ddmm")}`,e.body.nextRefNum=n+1;let a=await mo.createParkedTransaction(e.body);t.send({id:a.parkedTransactionId})}catch(r){console.error("Error creating ParkedTransaction!"),o(r)}};yo.findAll=async(e,t,o)=>{try{storeId=e.session.userSessionLog.storeId;let r=await mo.getParkedTransaction(e.query,storeId);t.send(r)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};yo.findOne=async(e,t,o)=>{try{let r=await mo.getParkedTransaction(e.params,1);t.send(r)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};yo.delete=async(e,t,o)=>{try{let r=await mo.deleteParkedTransaction(e.params.id);t.send(r)}catch(r){console.error("Error deleting ParkedTransaction!"),o(r)}}});var dm=d((YO,cm)=>{var cE=require("../node_modules/express/index.js"),Br=lm(),go=new cE.Router;go.post("/",Br.create);go.get("/",Br.findAll);go.get("/:id",Br.findOne);go.delete("/:id",Br.delete);cm.exports=go});var um=d(Vn=>{var{cookieName:dE,httpStatusCodes:uE,recordState:pE}=T(),{formatDate:mE}=x(),{updateUserSessionLog:yE}=kt();Vn.get=async(e,t,o)=>{try{let{permissions:r,userName:s,userId:n,userSessionLog:a,storeWHCode:i,userTIN:c}=e.session;t.send({permissions:r,userName:s,userId:n,userSessionLog:a,storeWHCode:i,userTIN:c})}catch(r){console.error("Error getting Session data!"),o(r)}};Vn.delete=async(e,t,o)=>{console.log("Destroying session!");try{if(e.session&&e.session.cookie){if(e.session.userSessionLog&&e.session.userSessionLog.userSessionLogId){let r={sessionStatus:pE.INACTIVE,logoutTime:mE(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")};await yE(e.session.userSessionLog.userSessionLogId,r)}t.clearCookie(dE,{path:"/"}),e.session.destroy(r=>{if(r)throw r})}t.status(uE.OK).json({message:"Logged out successfully!"})}catch(r){console.error("Error destroying session!"),o(r)}}});var ym=d((XO,mm)=>{var pm=um(),gE=require("../node_modules/express/index.js"),Gn=new gE.Router;Gn.get("/",pm.get);Gn.delete("/logout",pm.delete);mm.exports=Gn});var Tm=d(Ot=>{var To=kt(),TE=qe(),hE=qo(),{formatDate:CE}=x(),{canAssignUserToCounter:gm}=Vo();Ot.create=async(e,t,o)=>{if(!e.body){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=!0;if(e.body.storeCounterId&&(r=await gm(e.session.userId,e.body.storeCounterId)),r){e.body.loginTime=CE(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let s=await To.createUserSessionLog(e.body);t.send(s)}}catch(r){console.error("Error creating UserSessionLog!"),o(r)}};Ot.findAll=async(e,t,o)=>{try{let r=await To.getUserSessionLog(e.query);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};Ot.findOne=async(e,t,o)=>{try{let r=await To.getUserSessionLog(e.params,1);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};Ot.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=!0;if(e.body.storeCounterId&&(r=await gm(e.session.userId,e.body.storeCounterId)),r){let s="",n="";if(e.body.storeId){let c=await hE.getStore({storeId:e.body.storeId});console.log("store: ",c[0]),Array.isArray(c)&&c.length>0&&(n=c[0].locationCode,s=c[0].location,e.body.storeLocation=s,e.session.userSessionLog.storeLocation=s,e.session.userSessionLog.locationCode=n)}let a=await To.updateUserSessionLog(e.params.id,e.body);console.log("user-session-log.controller - update - response: ",a);let i="";if(e.body.storeId&&e.body.storeCounterId&&e.body.counterCode){e.session.userSessionLog.storeId=e.body.storeId,e.session.userSessionLog.storeCounterId=e.body.storeCounterId,e.session.userSessionLog.counterCode=e.body.counterCode,e.session.userSessionLog.counterName=counterName;let c=await TE.getStoreWarehouse({storeId:e.body.storeId});console.log("storeWarehouse: ",c[0]),Array.isArray(c)&&c.length>0&&(i=c[0].warehouseCode,e.session.storeWHCode=i)}t.send({...a,storeWHCode:i,storeLocation:s,locationCode:n})}}catch(r){console.error("Error updating UserSessionLog!"),e.session.userSessionLog.storeId="",e.session.userSessionLog.storeCounterId="",e.session.userSessionLog.counterCode="",e.session.storeWHCode="",o(r)}else t.status(400).send({message:"Invalid request!"})};Ot.delete=async(e,t,o)=>{try{let r=await To.deleteUserSessionLog(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserSessionLog!"),o(r)}}});var Cm=d((eU,hm)=>{var fE=require("../node_modules/express/index.js"),ho=Tm(),Ut=new fE.Router;Ut.post("/",ho.create);Ut.get("/",ho.findAll);Ut.get("/:id",ho.findOne);Ut.put("/:id",ho.update);Ut.delete("/:id",ho.delete);hm.exports=Ut});var Wr=d(Me=>{var{dataSource:Mr}=J(),Fr=fs(),Co="itemGroupMemberId";Me.parentPrimaryKey="itemGroupId";Me.createQCItemGroupMember=async(e,t)=>{try{let o;return Array.isArray(e)?o=e.map(s=>({...s,[Me.parentPrimaryKey]:t})):o={...e,[Me.parentPrimaryKey]:t},await Mr.getRepository(Fr).save(o)}catch(o){throw o}};Me.getQCItemGroupMember=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Co]=e.id,delete e.id);try{let o=Mr.getRepository(Fr);return t===1?await o.findOneBy(e):await o.findBy(e)}catch(o){throw o}};Me.updateQCItemGroupMember=async(e,t)=>{try{let o=Mr.getRepository(Fr);return t[Co]&&delete t[Co],await o.update({[Co]:e},t)}catch(o){throw o}};Me.deleteQCItemGroupMember=async e=>{e.id&&(e[Co]=e.id,delete e.id);try{return await Mr.getRepository(Fr).delete(e)}catch(t){throw t}}});var Im=d(fo=>{var{dataSource:$r}=J(),{createQCItemGroupMember:Sm,updateQCItemGroupMember:SE}=Wr(),kr=Cs(),qr="itemGroupId",fm="itemGroupMemberId";fo.createQCItemGroup=async e=>{try{let o=await $r.getRepository(kr).save(e);if(e.items){let r=await Sm(e.items,o[qr]);o.items=r}return o}catch(t){throw t}};fo.getQCItemGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[qr]=e.id,delete e.id);try{let o=$r.getRepository(kr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupName:"ASC"}})}catch(o){throw o}};fo.updateQCItemGroup=async(e,t)=>{try{let o=$r.getRepository(kr),r;t.items&&(r=t.items,delete t.items);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[qr]:e},t)),r){let n=[];if(r.forEach(async a=>{a[fm]?await SE(a[fm],a):n.push(a)}),n.length>0){let a=await Sm(n,e);s.items=a}}return s}catch(o){throw o}};fo.deleteQCItemGroup=async e=>{try{return await $r.getRepository(kr).delete({[qr]:e})}catch(t){throw t}}});var Dm=d(xt=>{var So=Im();xt.create=async(e,t,o)=>{if(!e.body||!e.body.groupName){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await So.createQCItemGroup(e.body);t.send(r)}catch(r){console.error("Error creating QCItemGroup!"),o(r)}};xt.findAll=async(e,t,o)=>{try{let r=await So.getQCItemGroup(e.query);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};xt.findOne=async(e,t,o)=>{try{let r=await So.getQCItemGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};xt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await So.updateQCItemGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};xt.delete=async(e,t,o)=>{try{let r=await So.deleteQCItemGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting QCItemGroup!"),o(r)}}});var Am=d(Ke=>{var{createQCItemGroupMember:IE,getQCItemGroupMember:Em,updateQCItemGroupMember:DE,deleteQCItemGroupMember:Nm,parentPrimaryKey:Qn}=Wr();Ke.create=async(e,t,o)=>{if(console.log("Create QCItemGroupMember - req.body: ",e.body),console.log("Create QCItemGroupMember - req.params: ",e.params),!e.body||!e.params[Qn]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await IE(e.body,e.params[Qn]);t.send(r)}catch(r){console.error("Error creating QCItemGroupMembers!"),o(r)}};Ke.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Em(r);t.send(s)}catch(s){console.error("Error getting QCItemGroupMembers!"),o(s)}};Ke.findOne=async(e,t,o)=>{try{let r=await Em(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroupMembers!"),o(r)}};Ke.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await DE(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroupMembers!"),o(r)}else t.status(400).send({message:"Invalid request!"})};Ke.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Nm(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}};Ke.deleteAll=async(e,t,o)=>{if(!e.params[Qn]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Nm(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}}});var bm=d((nU,Rm)=>{var EE=require("../node_modules/express/index.js"),Io=Dm(),Xe=Am(),{parentPrimaryKey:Yn}=Wr(),ee=new EE.Router;ee.post("/",Io.create);ee.get("/",Io.findAll);ee.get("/:id",Io.findOne);ee.put("/:id",Io.update);ee.delete("/:id",Io.delete);ee.post(`/:${Yn}/item/`,Xe.create);ee.get(`/:${Yn}/item/`,Xe.findAll);ee.get("/item/find",Xe.findAll);ee.get("/item/:id",Xe.findOne);ee.put("/item/:id",Xe.update);ee.delete("/item/:id",Xe.delete);ee.delete(`/:${Yn}/item`,Xe.deleteAll);Rm.exports=ee});var Kn=d(Do=>{var{dbCreds:Ze}=f(),{draftObjectCodes:aU}=T();Do.selectApprovedDeliveries=`SELECT T0."DocNum", T0."DocStatus", T0."CANCELED", T0."ObjType", T0."DocDate", T0."DocTime", 
  T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal", T0."DocTotalFC", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."U_DraftDocEntry",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
  T0."BPLName"
     FROM ${Ze.CompanyDB}.ODLN T0, ${Ze.CompanyDB}.OUSR TOR
   WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
     AND T0."U_DraftStatus" = 'AUTO_APPROVED'`;Do.selectItemDetails=`SELECT T1."LineNum", T1."LineStatus", T0."DocNum", T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
    T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
  FROM ${Ze.CompanyDB}.ODLN T0, ${Ze.CompanyDB}.DLN1 T1
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `;Do.selectTaxTotal=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
    FROM ${Ze.CompanyDB}.ODLN T0
  LEFT JOIN ${Ze.CompanyDB}.DLN4 T1 ON T0."DocEntry" = T1."DocEntry"
    WHERE T0."DocNum" = ?`;Do.selectDeliveryWithCustomerRefNoQuery=`SELECT DISTINCT T0."NumAtCard" as "CustomerRefNo"
  FROM ${Ze.CompanyDB}.ODLN T0
WHERE T0."NumAtCard" IS NOT NULL
  AND T0."CANCELED" NOT IN ('Y','C')
  AND T0."NumAtCard" = ?`});var Um=d((dU,Om)=>{var{dbCreds:Ae}=f(),{draftObjectCodes:lU,recordState:cU}=T(),NE=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
    FROM ${Ae.CompanyDB}.ODRF T0, ${Ae.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."ObjType" = ?`,AE=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName",
T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
  FROM ${Ae.CompanyDB}.ODRF T0, ${Ae.CompanyDB}.OUSR TOR, ${Ae.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ?
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,RE=`SELECT TRW."LineNum", TRW."LineStatus", TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${Ae.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,bE=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
  FROM ${Ae.CompanyDB}.ODRF T0
LEFT JOIN ${Ae.CompanyDB}.DRF4 T1 ON T0."DocEntry" = T1."DocEntry"
  WHERE T0."DocEntry" IN `,OE=`UPDATE ${Ae.CompanyDB}.ODRF T0 SET `;Om.exports={selectDrafts:NE,selectDraftsWithMultiApprover:AE,selectItemDetailsForDrafts:RE,selectDraftTaxTotal:bE,updateDraft:OE}});var Hr=d(wt=>{var Eo=S(),{userRoles:uU,draftStatus:pU,portalModules:mU}=T(),No=Um(),UE=' ORDER BY T0."DocEntry" ASC';wt.getDrafts=(e="",t=[])=>{try{let o=No.selectDrafts,r=Eo.executeWithValues(o+e+UE,t);return console.log("getDraftItems: "+JSON.stringify(r)),r}catch(o){throw o}};wt.getDraftsForApprover=(e,t)=>{try{let o=Eo.executeWithValues(No.selectDraftsWithMultiApprover,[e,t]);return console.log("getDraftItems: "+JSON.stringify(o)),o}catch(o){throw o}};wt.getDraftItems=e=>{try{let t=Eo.executeWithValues(No.selectItemDetailsForDrafts+`(${e})`,[]);return console.log("getDraftItems: "+JSON.stringify(t)),t}catch(t){throw t}};wt.getDraftTax=e=>{try{let t=Eo.executeWithValues(No.selectDraftTaxTotal+`(${e})`,[]);return console.log("getDraftTax: "+JSON.stringify(t)),t}catch(t){throw t}};wt.updateDraft=(e,t)=>{let o=[],r=[],s=" WHERE ";e.U_TargetRecDocNum&&(o.push('T0."U_TargetRecDocNum" = ?'),r.push(e.U_TargetRecDocNum)),e.U_DraftStatus&&(o.push('T0."U_DraftStatus" = ?'),r.push(e.U_DraftStatus)),t.DocEntry?(s=s+'T0."DocEntry" = ?',r.push(t.DocEntry)):t.DocNum&&(s=s+'T0."DocNum" = ?',r.push(t.DocNum));try{let n=No.updateDraft+o.join()+s;console.log("updateDraft - sql: ",n),console.log("updateDraft - values: ",r.join());let a=Eo.executeWithValues(n,r);return Array.isArray(a)&&a.length>0?a:void 0}catch(n){throw n}}});var wm=d(Ao=>{var Jr=S(),{itemTypes:gU,draftStatus:TU,userRoles:Xn,draftObjectCodes:xE,portalModules:wE}=T(),zr=Kn(),LE=dt(),Zn=Hr(),vE=wE.DELIVERY;Ao.getDeliveryWithCustomerRefNo=e=>{try{let t=Jr.executeWithValues(zr.selectDeliveryWithCustomerRefNoQuery,[e]);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}};Ao.getItemDetails=e=>{try{console.log("docNum:"+e);let t=Jr.executeWithValues(zr.selectItemDetails+`(${e})`,[]);return console.log("Delivery - getItemDetails: "+JSON.stringify(t)),t}catch(t){throw t}};Ao.getTaxDetails=e=>{try{console.log("docNum:"+e);let t=Jr.executeWithValues(zr.selectTaxTotal,[e]);return console.log("Delivery - getTaxDetails: "+JSON.stringify(t)),t}catch(t){throw t}};Ao.getDeliveryRecords=e=>{console.log("### getDeliveryRecords - filter: "+JSON.stringify(e));try{let t=[],o=[],r=xE[vE];if(e.userRole==Xn.APPROVER)t=Zn.getDraftsForApprover(r,e.userId);else if(e.userRole==Xn.ORIGINATOR){let s=' AND T0."U_OriginatorId" = ?';t=Zn.getDrafts(s,[r,e.userId]),o=xm(s,[e.userId])}else if(e.userRole==Xn.ADMIN){let s=[],n=` AND T0."U_OriginatorId" IN (${e.originatorIds})
                    AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`;s.push(e.fromDate,e.toDate),e.status&&e.status!=="ALL"&&(n=n+' AND T0."U_DraftStatus" IN (?)',s.push(e.status)),t=Zn.getDrafts(n,[r,...s]),o=xm(n,s)}if(Array.isArray(t)&&t.length){let s=[];if(t.forEach(n=>{s.push(n.DocEntry)}),Array.isArray(s)&&s.length){let n=LE.getApproversForDraft(s);if(console.log("allApprovers: "+JSON.stringify(n)),Array.isArray(n)&&n.length){let a=[];t.forEach(i=>{n.forEach(c=>{i.DocEntry==c.U_DocEntry&&a.push(c)}),i.approvers=a,a=[]})}}}return[...t,...o]}catch(t){throw console.log("getDeliveryRecords - controller - error: "+JSON.stringify(t)),t}};var xm=(e="",t=[])=>{let o=' ORDER BY T0."DocEntry" ASC';try{let r=Jr.executeWithValues(zr.selectApprovedDeliveries+e+o,t);return console.log("getAutoApprovedRecords: "+JSON.stringify(r)),r}catch(r){throw r}}});var vm=d(Gr=>{var jr=wm(),Lm=Hr(),{recordTypes:Vr}=T();Gr.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=[];e.query.customerRefNo?r=jr.getDeliveryWithCustomerRefNo(e.query.customerRefNo):e.query.userRole&&(r=jr.getDeliveryRecords(e.query)),t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};Gr.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Vr.DIRECT?r=jr.getItemDetails(e.query.docNum):e.params.recordType===Vr.DRAFT&&(r=Lm.getDraftItems(e.query.docEntry)),console.log("Delivery - getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}};Gr.getTax=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Vr.DIRECT?r=jr.getTaxDetails(e.query.docNum):e.params.recordType===Vr.DRAFT&&(r=Lm.getDraftTax(e.query.docEntry)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Fm=d((fU,Mm)=>{var _E=require("../node_modules/express/index.js"),Qr=new _E.Router,{checkUserPermission:_m}=N(),ea=vm(),{portalModules:Pm,permissions:Bm}=T();Qr.route("/").get(_m(Pm.DELIVERY,Bm.READ),ea.get);Qr.route("/items/:recordType?").get(_m(Pm.DELIVERY,Bm.READ),ea.getItems);Qr.route("/tax/:recordType?").get(ea.getTax);Mm.exports=Qr});var $m=d(Wm=>{var SU=S(),{itemTypes:IU,draftStatus:DU,portalModules:EU}=T();Wm.getDraft=async(e,t=null)=>{try{return(await t.get(`Drafts(${e})`)).data}catch(o){throw o}}});var Gm=d(Fe=>{var PE=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:G}=k(),{sendMail:jm}=ge(),ta=dt(),AU=ws(),km=lt(),qm=Zo(),Re=S(),be=f(),RU=Kn(),{portalModules:BE,draftStatus:P,draftObjectCodes:Vm,systemCurrency:Hm,serviceLayerApiURIs:ME,recordTypes:Jm}=T(),{getRandomNo:bU,formatDate:FE}=x(),WE=Hr(),$E=$m(),Ro=BE.DELIVERY,ra=ME[Ro];Fe.createDeliveryDraft=async(e,t,o)=>{if(console.log(`request: ${JSON.stringify(e)}`),o){G.defaults.headers.Cookie=o;try{if(e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,Array.isArray(t)&&t.length){e.DocObjectCode=Vm[Ro],e.U_DraftStatus||(e.U_DraftStatus=P.PENDING),e.U_MultiLevelApproval=t?t[0].U_MultiLevelApproval:"",e.U_NoOfApprovals=t?parseInt(t[0].U_NoOfApprovals,10):0,console.log("*** DRAFTS request: "+JSON.stringify(e));let r=await G.post("Drafts",e);return console.log("*** DRAFTS response: "+r),r.data?{draftNum:r.data.DocEntry}:void 0}else{e.U_DraftStatus=P.AUTO_APPROVED;let r=await Fe.createDelivery(e,o);return r?{docNum:r.data.DocNum}:void 0}}catch(r){throw console.log("Create Delivery error: "+r),r}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Fe.createDelivery=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{G.defaults.headers.Cookie=t,e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,e.U_DraftStatus=P.AUTO_APPROVED,console.log("*** Delivery request: "+JSON.stringify(e));let o=await G.post(ra,e);return console.log(`Create Delivery response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create Delivery error: "+o),o}};var zm=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o};Fe.createDeliveryFromDraft=async(e,t,o)=>{G.defaults.headers.Cookie=o;try{console.log("draft: "+JSON.stringify(e));let r=[],s={},n=[],a=e.DocCurrency;Array.isArray(e.DocumentLines)&&e.DocumentLines.length&&e.DocumentLines.forEach(l=>{s={LineNum:l.LineNum,LocationCode:l.LocationCode,ItemCode:l.ItemCode,Quantity:l.Quantity,BaseType:l.BaseType,BaseEntry:l.BaseEntry,BaseLine:l.BaseLine,MeasureUnit:l.MeasureUnit,WarehouseCode:l.WarehouseCode},s.BatchNumbers=zm("Batch",l.BatchNumbers),s.SerialNumbers=zm("Serial",l.SerialNumbers),s.DocumentLinesBinAllocations=PE(l.DocumentLinesBinAllocations.sort((u,p)=>u.SerialAndBatchNumbersBaseLine-p.SerialAndBatchNumbersBaseLine)),r.push(s)}),r.sort((l,u)=>l.BaseLine-u.BaseLine),Array.isArray(e.DocumentAdditionalExpenses)&&e.DocumentAdditionalExpenses.length&&e.DocumentAdditionalExpenses.forEach(l=>{n.push({LineNum:l.LineNum,ExpenseCode:l.ExpenseCode,LineTotal:a===Hm?l.LineTotal:l.LineTotalFC})});let i={DocDate:e.DocDate,DocDueDate:e.DocDueDate,CardCode:e.CardCode,CardName:e.CardName,Address:e.Address,NumAtCard:e.NumAtCard,DocCurrency:a,DocRate:e.DocRate,Reference1:e.Reference1,Reference2:e.Reference2,Comments:e.Comments,DocObjectCode:e.DocObjectCode,CreationDate:e.CreationDate,DocTime:e.DocTime,UpdateDate:e.UpdateDate,UpdateTime:e.UpdateTime,VatPercent:e.VatPercent,VatSum:e.VatSum,DiscountPercent:e.DiscountPercent,TotalDiscount:a===Hm?e.TotalDiscount:e.TotalDiscountFC,U_OriginatorId:e.U_OriginatorId,U_ApproverId:e.U_ApproverId,U_DraftStatus:e.U_DraftStatus,U_MultiLevelApproval:e.U_MultiLevelApproval,U_NoOfApprovals:parseInt(e.U_NoOfApprovals,10),U_DraftDocEntry:t,DocumentLines:r,DocumentAdditionalExpenses:n};return e.BPL_IDAssignedToInvoice&&(i.BPL_IDAssignedToInvoice=e.BPL_IDAssignedToInvoice),console.log("***deliveryRequest: "+JSON.stringify(i)),await G.post(ra,i)}catch(r){let s=P.PENDING,n=await G.patch(`Drafts(${t})`,{U_DraftStatus:s});throw console.log("resetDraftStatus - response.data: "+n),r}};var oa=async(e,t,o,r)=>{let s=isNaN(e.U_ApprovalLevel)?0:parseInt(e.U_ApprovalLevel);try{let n=e.DocEntry;console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let a;G.defaults.headers.Cookie=o;let i=await G.patch(`Drafts(${n})`,{Comments:e.Comments,U_DraftStatus:e.U_DraftStatus});if(console.log("PATCH Draft - response.data: "+JSON.stringify(i.data)),e.U_DraftStatus==P.APPROVED){let c=await $E.getDraft(n,G);c&&(a=Fe.createDeliveryFromDraft(c,n,o))}if(i||a){let c=Re.executeWithValues(be.updateDraftApproversList,[t,e.U_RejectedReason,FE(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(t===P.REJECTED&&ta.setApprovalStatus(t,n),a){console.log("deliveryResponse.data.DocNum: "+a.data.DocNum),console.log("deliveryResponse.data.DocumentLines: "+JSON.stringify(a.data.DocumentLines));let y=WE.updateDraft({U_TargetRecDocNum:a.data.DocNum},{DocEntry:n});r!=="Y"&&ta.setApprovalStatus(P.APPROVED,n)}let l=Re.executeWithValues(be.selectUserInfo,e.U_OriginatorId),u=Re.executeWithValues(be.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(l)),console.log("approverRec: "+JSON.stringify(u));let p;if([P.APPROVED,P.PENDING].includes(e.U_DraftStatus)?p=P.APPROVED:p=e.U_DraftStatus,Array.isArray(u)&&u.length&&Array.isArray(l)&&l.length){let y=qm.getMailBody(Ro,l[0].UserName,u[0].UserName,n,p);jm(l[0].Email,qm.subject,y)}let g;return t===P.APPROVED&&(g=ta.getApprovalInternalInDays(n,e.U_ApprovalLevel,r)),{draftStatus:p,noOfDays:g}}}catch(n){throw n}};Fe.updateDeliveryDraft=async(e,t)=>{if(console.log(`request: ${JSON.stringify(e)}`),t){G.defaults.headers.Cookie=t;try{let o=e.U_DraftStatus;if(e.U_DraftStatus==P.APPROVED){let r=Re.executeWithValues(be.selectNoOfApprovalsForDraft,[Vm[Ro],e.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(r));let s=0,n;if(Array.isArray(r)&&r.length&&(s=parseInt(r[0].U_NoOfApprovals,10),n=r[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+s),n==="Y"){parseInt(e.U_ApprovalLevel)==s?e.U_DraftStatus=P.APPROVED:parseInt(e.U_ApprovalLevel)<s&&(e.U_DraftStatus=P.PENDING);let a=await oa(e,o,t,n);if(e.U_DraftStatus==P.PENDING){let i=parseInt(e.U_ApprovalLevel)+1,c=Re.executeWithValues(be.updateDraftNextApprovalLevel,[P.PENDING,e.DocEntry,i]);console.log("setNextApprovalStatus: "+JSON.stringify(c));let l=Re.executeWithValues(be.selectUserInfo,e.U_OriginatorId),u=Re.executeWithValues(be.selectDraftNextApproverDetails,[e.DocEntry,i]);if(console.log("nextApproverDetails: "+JSON.stringify(u)),Array.isArray(u)&&u.length&&l.length){let p=km.getMailBody(Ro,l[0].UserName,e.DocEntry);jm(u[0].Email,km.subject,p)}}return a}else{let a=Re.executeWithValues(be.selectDraftApprovalStatusCount,[e.DocEntry,e.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(a));let i=0;return Array.isArray(a)&&a.length&&(i=a[0].Count),console.log("noOfApprovalsReceived: "+i),parseInt(i,10)+1>=parseInt(s,10)?(e.U_DraftStatus=P.APPROVED,console.log("****APPROVED")):(e.U_DraftStatus=P.PENDING,console.log("****PENDING")),await oa(e,o,t,n)}}else if(e.U_DraftStatus==P.REJECTED)return console.log("****REJECTED"),await oa(e,o,t)}catch(o){throw console.log("Delivery Draft error: "+o),o}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Fe.getDeliveryDraft=async(e,t,o,r=!0)=>{if(o){G.defaults.headers.Cookie=o;try{let s;if(e===Jm.DRAFT?s=await G.get(`Drafts(${t.docEntry})`):e===Jm.DIRECT&&(s=await G.get(`${ra}(${t.docNum})`)),r){console.log("response.data: "+JSON.stringify(s.data));let n=Re.executeWithValues(be.allFreightInfo,[]),a=s.data.DocumentAdditionalExpenses.slice();if(Array.isArray(a)&&a.length&&n.forEach(i=>{a.forEach(c=>{i.FreightCode==c.ExpenseCode&&(c.FreightName=i.FreightName)})}),s.data)return{draft:s.data,draftStatus:s.data.U_DraftStatus,freightInfoForDraft:a,DocTotal:s.data.DocTotal,DocTotalFc:s.data.DocTotalFc};console.log("Failed to get Delivery Request details!.. Error-500");return}else return s.data}catch(s){throw console.log("Delivery Draft error: "+s),s}}else throw{message:"Unable to connect to the server. Please contact Administrator!"}}});var Ym=d((WU,Qm)=>{var{In:UU}=require("../node_modules/typeorm/index.js"),{getSLConnection:aa}=j(),{sendMail:xU}=ge(),wU=lt(),LU=S(),vU=f(),{portalModules:kE,draftStatus:_U,draftObjectCodes:PU}=T(),{getRandomNo:BU,formatDate:MU}=x(),Yr=Gm(),qE=Wt(),{logger:FU}=zs(),sa=dt(),na=kE.DELIVERY,HE=async(e,t,o)=>{try{let r=e.session.userId;e.body.userId=e.session.userId;let s=sa.getApprovers(r,na),n=await aa(e);if(Array.isArray(s)&&s.length>0){let a=await JE(e.body,s,n);t.status(200).send(a)}else{let a=await Yr.createDelivery(e.body,n);t.status(200).send({docNum:a.DocNum})}}catch(r){console.log("create Delivery: "+JSON.stringify(r)),o(r)}},JE=async(e,t=[],o)=>{try{let r=e.userId,s=await Yr.createDeliveryDraft(e,t,o);if(s.draftNum){let n=[];if(t.forEach(a=>{n.push(a.UserName)}),n.length>0){let{draftApproverRec:a,mailingList:i}=await sa.createApproversForDraft(s.draftNum,t,na);if(a){let c=qE.getUserInfo(r);await sa.notifyApprovers(na,c.UserName,s.draftNum,i)}}return{draftNum:s.draftNum,approverName:n.length>0?n.join(", "):""}}return}catch(r){throw r}},zE=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;try{let r=await aa(e),{draftStatus:s,noOfDays:n}=await Yr.updateDeliveryDraft(e.body,r);t.status(200).send({draftStatus:s,noOfDays:n})}catch(r){console.log("Delivery Draft error: "+r),o(r)}},jE=async(e,t,o)=>{if(console.log(`get Delivery - req.params: ${JSON.stringify(e.params)}`),e.query.docEntry||e.query.docNum)try{let r=await aa(e),s=await Yr.getDeliveryDraft(e.params.type,e.query,r);s?t.send(s):t.status(500).json({message:"Failed to get Delivery Request details!"})}catch(r){console.log("Delivery Draft error: "+r),o(r)}else t.status(500).send({error:"Invalid DocEntry!"})};Qm.exports={create:HE,update:zE,get:jE}});var Xm=d(($U,Km)=>{var VE=require("../node_modules/express/index.js"),ia=Ym(),{portalModules:la,permissions:ca}=T(),{checkUserPermission:da}=N(),Kr=new VE.Router;Kr.route("/").post(da(la.DELIVERY,ca.CREATE),ia.create);Kr.route("/draft").patch(da(la.DELIVERY,ca.WRITE),ia.update);Kr.route("/items/:recordType?").get(da(la.DELIVERY,ca.READ),ia.get);Km.exports=Kr});var ey=d((kU,Zm)=>{var{getSLConnection:ua}=j(),pa=Vt(),GE=async(e,t,o)=>{try{let r=await ua(e),s=await pa.createSalesBatchSelection(e.body,e.body.invoiceDocEntry,e.body.invoiceDocNum,r);t.status(200).send(s)}catch(r){console.log("create SalesBatchSelection Controller: "+JSON.stringify(r)),o(r)}},QE=async(e,t,o)=>{try{if(!e.body||!Array.isArray(e.body)||e.body.length===0)throw new Error("Request body cannot be empty and must be an array");let r=await ua(e),s=await Promise.all(e.body.map(n=>pa.updateSalesBatchSelection(n,r)));t.status(200).send(s)}catch(r){console.log("Update Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}},YE=async(e,t,o)=>{try{let r=await ua(e),{docNum:s,itemCodes:n}=e.body;if(!s||!n||!Array.isArray(n)||n.length===0)throw new Error("docNum and itemCodes are required, and itemCodes must be a non-empty array");let a=await Promise.all(n.map(i=>pa.getSalesBatchSelection(s,i,r)));t.status(200).send(a)}catch(r){console.log("Get Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}};Zm.exports={create:GE,update:QE,get:YE}});var oy=d((qU,ty)=>{var KE=require("../node_modules/express/index.js"),ma=ey(),{portalModules:ya,permissions:ga}=T(),{checkUserPermission:Ta}=N(),ha=new KE.Router;ha.route("/").post(Ta([ya.INVOICE],ga.CREATE),ma.create).put(Ta(ya.INVOICE,ga.WRITE),ma.update);ha.route("/get").post(Ta([ya.INVOICE],ga.READ),ma.get);ty.exports=ha});var ay=d((jU,ny)=>{var bo=require("../node_modules/express/index.js"),XE=require("https"),HU=require("../node_modules/http-proxy/index.js"),ZE=require("../node_modules/cookie-parser/index.js"),JU=require("../node_modules/morgan/index.js"),Lt=require("path"),zU=require("../node_modules/rotating-file-stream/index.js"),Xr=require("cluster"),ry=require("os").cpus().length,eN=Ia(),tN=xa(),oN=Qi(),rN=_l(),sN=$l(),{sessionValidator:nN}=N(),aN=Gl(),iN=Xl(),lN=ic(),cN=mc(),dN=fc(),uN=kc(),pN=Qc(),mN=ed(),yN=cd(),gN=Cd(),TN=Od(),hN=Pd(),CN=qd(),fN=Yd(),SN=tu(),IN=lu(),DN=gu(),EN=Su(),NN=bu(),AN=vu(),RN=zu(),bN=Zu(),ON=lp(),UN=Sp(),xN=Up(),wN=Fp(),LN=qp(),vN=sm(),_N=dm(),PN=ym(),BN=Cm(),MN=bm(),FN=Fm(),WN=Xm(),$N=oy(),Ca,Ce="/api/v1/service",E="/api/v1/custom",kN=async()=>{if(process.env.NODE_ENV==="development")await sy();else if(Xr.isMaster){console.log(`Number of CPUs is ${ry}`),console.log(`Master ${process.pid} is running`);for(let e=0;e<ry;e++)Xr.fork();Xr.on("exit",(e,t,o)=>{console.log(`worker ${e.process.pid} died`),console.log("Let's fork another worker!"),Xr.fork()})}else await sy()},sy=()=>new Promise((e,t)=>{let o=bo(),r=require("fs"),s=process.env.HOST;process.env.NODE_ENV==="development"?(o.use(bo.static(Lt.join(__dirname,"../../","build"))),o.get("/",(i,c)=>{c.sendFile(Lt.join(__dirname,"../../","build","index.html"))})):(o.use(bo.static(Lt.join(__dirname,"../../../","UI"))),o.get("/",(i,c)=>{c.sendFile(Lt.join(__dirname,"../../../","UI","index.html"))}));let n={cert:r.readFileSync(Lt.join(__dirname,"../../",process.env.SSL_CRT_FILE),"utf8"),key:r.readFileSync(Lt.join(__dirname,"../../",process.env.SSL_KEY_FILE),"utf8")},a=process.env.API_PORT||2020;Ca=XE.createServer(n,o),o.use(eN()),o.use(ZE()),o.use(bo.json()),o.use(bo.urlencoded({extended:!0})),o.use(tN),o.use(nN),o.use(Ce,rN),o.use(`${Ce}/business-partner`,aN),o.use(`${Ce}/invoice`,uN),o.use(`${Ce}/sales-quotation`,TN),o.use(`${Ce}/credit-memo`,bN),o.use(`${Ce}/credit-memo-request`,UN),o.use(`${Ce}/inventory-counting`,wN),o.use(`${Ce}/item`,pN),o.use(`${Ce}/sales-batch-selection`,$N),o.use(`${Ce}/delivery`,WN),o.use(E,oN),o.use(`${E}/user/group`,LN),o.use(`${E}/store`,vN),o.use(`${E}/parked-transaction`,_N),o.use(`${E}/user-session-log`,BN),o.use(`${E}/session`,PN),o.use(`${E}/invoice`,cN),o.use(`${E}/firca`,dN),o.use(`${E}/cash-denomination`,iN),o.use(`${E}/credit-card`,lN),o.use(`${E}/stock-transfer-request-new`,yN),o.use(`${E}/sales-quotation`,gN),o.use(`${E}/sale-order`,hN),o.use(`${E}/customer`,AN),o.use(`${E}/tax`,CN),o.use(`${E}/sales-employees`,fN),o.use(`${E}/payment-terms`,IN),o.use(`${E}/user`,SN),o.use(`${E}/banks`,DN),o.use(`${E}/locations`,EN),o.use(`${E}/warehouse`,NN),o.use(`${E}/credit-memo`,RN),o.use(`${E}/credit-memo-request`,ON),o.use(`${E}/inventory-counting`,xN),o.use(`${E}/item-master`,mN),o.use(`${E}/delivery`,FN),o.use(`${E}/qc-item-group`,MN),o.use(sN),Ca.listen(a,s).on("listening",()=>{console.log(`Web server listening on ${a}`),e()}).on("error",i=>{t(i)})}),qN=()=>new Promise((e,t)=>{Ca.close(o=>{if(o){t(o);return}e()})});ny.exports={initialize:kN,close:qN}});require("../node_modules/dotenv/lib/main.js").config();var iy=ay(),VU=J(),HN=async()=>{try{console.log("Initializing Web server"),await iy.initialize()}catch(e){console.error(e),process.exit(1)}};HN();var fa=async e=>{let t=e;console.log("Shutting down...");try{console.log("Closing Web server"),await iy.close()}catch(o){console.log("Encountered error when closing Web server",o),t=t||o}console.log("Exiting process"),t?process.exit(1):process.exit(0)};process.on("SIGTERM",()=>{console.log("Received SIGTERM"),fa()});process.on("SIGINT",()=>{console.log("Received SIGINT"),fa()});process.on("uncaughtException",e=>{console.log("Uncaught exception"),console.error(e),fa(e)});
//!@#$%^&*()-+<>
