const express = require('express');
const parser = require('xml-js');
const request = require('request');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
// for angular sserver connection

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.post('/login', (req, res) => {
    uname = req.body.username.toUpperCase();
    pass = req.body.password.toUpperCase();
//   const uname = '0000007005';
//    const pass = '1234567890';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZLOGIN_MAT_FM>
          <!--You may enter the following 2 items in any order-->
          <I_PASSWD>`+pass+`</I_PASSWD>
          <I_USNAME>${uname}</I_USNAME>
       </urn:ZLOGIN_MAT_FM>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_LOGIN_MAT&interfaceNamespace=http://mathesh_login.com',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
            result1 = JSON.parse(result1);
            var resp = result1['SOAP:Envelope']['SOAP:Body']['ns0:ZLOGIN_MAT_FM.Response']['E_SUCC'];
            res.send(resp);
            // res.send(result1);
        }
    })
});
app.post('/profile', (req, res) => {

  uname = req.body.username.toUpperCase();
  // pass = req.body.password.toUpperCase();
//   const uname = '0000007007';
 // const pass = '1234567890';
  const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZPROFILE_MAT_FM>
        <I_CUSID>`+uname+`</I_CUSID>
     </urn:ZPROFILE_MAT_FM>
  </soapenv:Body>
</soapenv:Envelope>`;
  var options = {
      url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_PROFILE_MAT&interfaceNamespace=http://custprofile_mat.com',
      headers: {
          'Content-Type': 'application/xml',
          'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
      },
      body: postData
  }
  request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
          result2 = JSON.parse(result2);
          var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPROFILE_MAT_FM.Response']['E_CUSDETAILS'];
          res.send(resp);
         // res.send(result2);
      }
  })
});
app.post('/updprofile', (req, res) => {
   // uname = req.body.username;
   city = req.body.City;
   country = req.body.Country;
   district = req.body.District;
   name1 = req.body.Name1;
   name2 = req.body.Name2;
   pincode = req.body.Pcode;
   state = req.body.State;
   street = req.body.Street;
   telephone = req.body.Phone_number;
    // pass = req.body.password.toUpperCase();
   // const uname = '6';
  //  const name1 = 'john';
  //  const name2 = 'snow';
  //  const street = 'redkeep';
  //  const city = 'winterfell';
  //  const district = 'winterfell';
  //  const state = 'Got';
  //  const country = 'got';
  //  const pincode = '626118';
  //  const telephone = '1122334455';

   // const pass = '1234567890';
    const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZUPDPROFILE_MAT_FM>
          <!--You may enter the following 10 items in any order-->
          <I_CITY>`+city+`</I_CITY>
          <I_COUNTRY>`+country+`</I_COUNTRY>
          <I_DISTRICT>`+district+`</I_DISTRICT>
          <I_KUNNR>`+uname+`</I_KUNNR>
          <I_NAME_1>`+name1+`</I_NAME_1>
          <I_NAME_2>`+name2+`</I_NAME_2>
          <I_PS_CODE>`+pincode+`</I_PS_CODE>
          <I_STATE>`+state+`</I_STATE>
          <I_STREET>`+street+`</I_STREET>
          <I_TELE_NUM>`+telephone+`</I_TELE_NUM>
       </urn:ZUPDPROFILE_MAT_FM>
    </soapenv:Body>
 </soapenv:Envelope>`;
    var options = {
        url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_PROUPDATE_MAT&interfaceNamespace=http://tprofileupd_mat.com',
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: postData
    }
    request.post(options, function (error, response, body) { 
        if (!error && response.statusCode == 200) {
            var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
            result2 = JSON.parse(result2);
            var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZUPDPROFILE_MAT_FM.Response'];
            res.send(resp);
           // res.send(result2);
        }
    })
  });
app.post('/deliverylist', (req, res) => {

  uname = req.body.username.toUpperCase();

     //const uname = '0000000006';

     const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZSD_DELIVERY_MAT_FM>
           <!--You may enter the following 2 items in any order-->
           <I_CUSID>`+uname+`</I_CUSID>
           <!--Optional:-->
           <IT_DELIVERY>
              <!--Zero or more repetitions:-->
              <item>
                 <!--Optional:-->
                 <KUNNR></KUNNR>
                 <!--Optional:-->
                 <KUNAG></KUNAG>
                 <!--Optional:-->
                 <VBELN></VBELN>
                 <!--Optional:-->
                 <ERZET></ERZET>
                 <!--Optional:-->
                 <ERDAT></ERDAT>
                 <!--Optional:-->
                 <VKORG></VKORG>
                 <!--Optional:-->
                 <LFART></LFART>
                 <!--Optional:-->
                 <LFDAT_V></LFDAT_V>
                 <!--Optional:-->
                 <INCO2></INCO2>
                 <!--Optional:-->
                 <LFUHR></LFUHR>
                 <!--Optional:-->
                 <MATNR></MATNR>
                 <!--Optional:-->
                 <POSNR></POSNR>
                 <!--Optional:-->
                 <ARKTX></ARKTX>
              </item>
           </IT_DELIVERY>
        </urn:ZSD_DELIVERY_MAT_FM>
     </soapenv:Body>
  </soapenv:Envelope>`;
     var options = {
         url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_DELIVERY_MAT&interfaceNamespace=http://delivery_mat.com',
         headers: {
             'Content-Type': 'application/xml',
             'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
         },
         body: postData
     }
     request.post(options, function (error, response, body) {
         if (!error && response.statusCode == 200) {
             var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
             result2 = JSON.parse(result2);
             var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_DELIVERY_MAT_FM.Response']['IT_DELIVERY'];
             res.send(resp);
            // res.send(result2);
         }
     })
   });
app.post('/salesorder', (req, res) => {

    uname = req.body.username.toUpperCase();

   //    const uname = '0000000006';

       const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
       <soapenv:Header/>
       <soapenv:Body>
          <urn:ZSD_SALESORDER_DETAILS_MAT_FM>
             <!--You may enter the following 8 items in any order-->
             <I_CUSID>`+uname+`</I_CUSID>
             <!--Optional:-->
             <I_DOCDATE_FROM></I_DOCDATE_FROM>
             <!--Optional:-->
             <I_DOCDATE_TO></I_DOCDATE_TO>
             <!--Optional:-->
             <I_EXMATNR>
                <!--Optional:-->
                <MATERIAL_EXT></MATERIAL_EXT>
                <!--Optional:-->
                <MATERIAL_VERS></MATERIAL_VERS>
                <!--Optional:-->
                <MATERIAL_GUID></MATERIAL_GUID>
             </I_EXMATNR>
             <!--Optional:-->
             <I_MATNR></I_MATNR>
             <!--Optional:-->
             <I_PURORDER></I_PURORDER>
             <!--Optional:-->
             <I_PURORDER_NUM></I_PURORDER_NUM>
             <I_SALESORG></I_SALESORG>
          </urn:ZSD_SALESORDER_DETAILS_MAT_FM>
       </soapenv:Body>
    </soapenv:Envelope>`;
       var options = {
           url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_SALESORD_MAT&interfaceNamespace=http://salesorder_mat.com',
           headers: {
               'Content-Type': 'application/xml',
               'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
           },
           body: postData
       }
       request.post(options, function (error, response, body) {
           if (!error && response.statusCode == 200) {
               var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
               result2 = JSON.parse(result2);
               var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_SALESORDER_DETAILS_MAT_FM.Response']['E_SALESORDER'];
               res.send(resp);
              // res.send(result2);
           }
       })
     });
app.post('/credit', (req, res) => {

    uname = req.body.username.toUpperCase();

     // const uname = '0000000006';

       const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
       <soapenv:Header/>
       <soapenv:Body>
          <urn:ZFI_CREDIT_DEBIT_MT_FM>
             <!--You may enter the following 3 items in any order-->
             <I_CUSID>`+uname+`</I_CUSID>
             <IT_CRE>
                <!--Zero or more repetitions:-->
                <item>
                   <!--Optional:-->
                   <GJAHR></GJAHR>
                   <!--Optional:-->
                   <AUGDT></AUGDT>
                   <!--Optional:-->
                   <AUGBL></AUGBL>
                   <!--Optional:-->
                   <PSWBT></PSWBT>
                   <!--Optional:-->
                   <PSWSL></PSWSL>
                </item>
             </IT_CRE>
             <IT_DEB>
                <!--Zero or more repetitions:-->
                <item>
                   <!--Optional:-->
                   <GJAHR></GJAHR>
                   <!--Optional:-->
                   <AUGDT></AUGDT>
                   <!--Optional:-->
                   <AUGBL></AUGBL>
                   <!--Optional:-->
                   <PSWBT></PSWBT>
                   <!--Optional:-->
                   <PSWSL></PSWSL>
                </item>
             </IT_DEB>
          </urn:ZFI_CREDIT_DEBIT_MT_FM>
       </soapenv:Body>
    </soapenv:Envelope>`;
       var options = {
           url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_CREDIT_DEBIT_MAT&interfaceNamespace=http://credit_debit.com',
           headers: {
               'Content-Type': 'application/xml',
               'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
           },
           body: postData
       }
       request.post(options, function (error, response, body) {
           if (!error && response.statusCode == 200) {
               var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
               result2 = JSON.parse(result2);

               var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_CREDIT_DEBIT_MT_FM.Response']['IT_CRE'];
               res.send(resp);



              // res.send(result2);
           }
       })
     });
app.post('/debit', (req, res) => {

      uname = req.body.username.toUpperCase();

      //  const uname = '0000000006';

         const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
         <soapenv:Header/>
         <soapenv:Body>
            <urn:ZFI_CREDIT_DEBIT_MT_FM>
               <!--You may enter the following 3 items in any order-->
               <I_CUSID>`+uname+`</I_CUSID>
               <IT_CRE>
                  <!--Zero or more repetitions:-->
                  <item>
                     <!--Optional:-->
                     <GJAHR></GJAHR>
                     <!--Optional:-->
                     <AUGDT></AUGDT>
                     <!--Optional:-->
                     <AUGBL></AUGBL>
                     <!--Optional:-->
                     <PSWBT></PSWBT>
                     <!--Optional:-->
                     <PSWSL></PSWSL>
                  </item>
               </IT_CRE>
               <IT_DEB>
                  <!--Zero or more repetitions:-->
                  <item>
                     <!--Optional:-->
                     <GJAHR></GJAHR>
                     <!--Optional:-->
                     <AUGDT></AUGDT>
                     <!--Optional:-->
                     <AUGBL></AUGBL>
                     <!--Optional:-->
                     <PSWBT></PSWBT>
                     <!--Optional:-->
                     <PSWSL></PSWSL>
                  </item>
               </IT_DEB>
            </urn:ZFI_CREDIT_DEBIT_MT_FM>
         </soapenv:Body>
      </soapenv:Envelope>`;
         var options = {
             url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_CREDIT_DEBIT_MAT&interfaceNamespace=http://credit_debit.com',
             headers: {
                 'Content-Type': 'application/xml',
                 'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
             },
             body: postData
         }
         request.post(options, function (error, response, body) {
             if (!error && response.statusCode == 200) {
                 var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                 result2 = JSON.parse(result2);

                 var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_CREDIT_DEBIT_MT_FM.Response']['IT_DEB'];
                 res.send(resp);



                // res.send(result2);
             }
         })
       });
app.post('/payment', (req, res) => {

        uname = req.body.username.toUpperCase();

         // const uname = '0000000006';
      // const code = "SA01";
           const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
           <soapenv:Header/>
           <soapenv:Body>
              <urn:ZFI_PAYMENT_MAT>
                 <!--You may enter the following 3 items in any order-->
                 <!--Optional:-->
                 <COMCODE></COMCODE>
                 <CUSID>`+uname+`</CUSID>
                 <!--Optional:-->
                 <IT_DET>
                    <!--Zero or more repetitions:-->
                    <item>
                       <!--Optional:-->
                       <COMP_CODE></COMP_CODE>
                       <!--Optional:-->
                       <CUSTOMER></CUSTOMER>
                       <!--Optional:-->
                       <ALLOC_NMBR></ALLOC_NMBR>
                       <!--Optional:-->
                       <FISC_YEAR></FISC_YEAR>
                       <!--Optional:-->
                       <ITEM_NUM></ITEM_NUM>
                       <!--Optional:-->
                       <PSTNG_DATE></PSTNG_DATE>
                       <!--Optional:-->
                       <BLINE_DATE></BLINE_DATE>
                       <!--Optional:-->
                       <DOC_DATE></DOC_DATE>
                       <!--Optional:-->
                       <ENTRY_DATE></ENTRY_DATE>
                       <!--Optional:-->
                       <AMT_DOCCUR></AMT_DOCCUR>
                       <!--Optional:-->
                       <LC_TAX></LC_TAX>
                       <!--Optional:-->
                       <DISC_BASE></DISC_BASE>
                       <!--Optional:-->
                       <DOC_TYPE></DOC_TYPE>
                       <!--Optional:-->
                       <FIS_PERIOD></FIS_PERIOD>
                       <!--Optional:-->
                       <POST_KEY></POST_KEY>
                       <!--Optional:-->
                       <DB_CR_IND></DB_CR_IND>
                       <!--Optional:-->
                       <DISCT_DAYS></DISCT_DAYS>
                    </item>
                 </IT_DET>
              </urn:ZFI_PAYMENT_MAT>
           </soapenv:Body>
        </soapenv:Envelope>`;
           var options = {
               url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_PAYMENT_MAT&interfaceNamespace=http://payment_mat.com',
               headers: {
                   'Content-Type': 'application/xml',
                   'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
               },
               body: postData
           }
           request.post(options, function (error, response, body) {
               if (!error && response.statusCode == 200) {
                   var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                   result2 = JSON.parse(result2);
                   var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_PAYMENT_MAT.Response']['IT_DET'];
                   res.send(resp);
                  // res.send(result2);
               }
           })
         });
app.post('/masterdata', (req, res) => {

   city = req.body.city;
   console.log(city)
   country = req.body.country;
   console.log(country)
   country_iso = req.body.country_iso;
   console.log(country_iso)
   currency = req.body.currency;
   console.log(currency)
   dist= req.body.distchannel;
   console.log(dist)
   divison = req.body.divison;
   console.log(divison)
   first_name = req.body.first_name;
   console.log(first_name)
   language = req.body.language;
   console.log(language)
   last_name = req.body.last_name;
   console.log(last_name)
   postal_code = req.body.postal_code;
   console.log(postal_code)
   ref_customer = req.body.ref_customer;
   console.log(ref_customer)
   sales_org = req.body.sales_org;
   console.log(sales_org)
   street = req.body.street;
   console.log(street)
   telephone = req.body.telephone;
   console.log(telephone)
//   const city = 'winterfell';
//   const country = 'IN';
//   const country_iso = 'INR';
//   const currency = 'INR';
//   const dist = 'S1';
//   const divison = 'S1';
//   const first_name = 'JHON';
//   const language = 'EN';;
//   const last_name = 'SNOW';
//   const postal_code = '123456';
//   const ref_customer = '0000900614';
//   const sales_org = 'SA01';
//   const street = 'RED';
//   const telephone = '123456789';

  const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
               <soapenv:Header/>
               <soapenv:Body>
                  <urn:ZSD_MASTERDATA_MAT>
                     <!--You may enter the following 14 items in any order-->
                     <I_CITY>`+city+`</I_CITY>
                     <I_COUNTRY>`+country+`</I_COUNTRY>
                     <I_COUNTRY_ISO>`+country_iso+`</I_COUNTRY_ISO>
                     <I_CURRENCY_ISO>`+currency+`</I_CURRENCY_ISO>
                     <I_DISTCHANNEL>`+dist+`</I_DISTCHANNEL>
                     <I_DIVISION>`+divison+`</I_DIVISION>
                     <I_FIRSTNAME>`+first_name+`</I_FIRSTNAME>
                     <I_LANGUAGE_CODE>`+language+`</I_LANGUAGE_CODE>
                     <I_LASTNAME>`+last_name+`</I_LASTNAME>
                     <I_PS_CODE>`+postal_code+`</I_PS_CODE>
                     <I_REF_CUSTOMER>`+ref_customer+`</I_REF_CUSTOMER>
                     <I_SALESORG>`+sales_org+`</I_SALESORG>
                     <I_STREET>`+street+`</I_STREET>
                     <I_TELE_PHONE>`+telephone+`</I_TELE_PHONE>
                  </urn:ZSD_MASTERDATA_MAT>
               </soapenv:Body>
            </soapenv:Envelope>`;
               var options = {
                   url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_MASTER_MAT&interfaceNamespace=http://master_mat.com',
                   headers: {
                       'Content-Type': 'application/xml',
                       'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                   },
                   body: postData
               }
               request.post(options, function (error, response, body) {
                   if (!error && response.statusCode == 200) {
                       var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                       result2 = JSON.parse(result2);
                       var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_MASTERDATA_MAT.Response']['E_CUSID'];
                       console.log("customer id created =" + resp['_text']);
                       res.send(resp);
                       
                   }
               })
             });
app.post('/inquiry', (req, res) => {

  

//   uname = req.body.username.toUpperCase();

   const uname = '18';
            
              const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
              <soapenv:Header/>
              <soapenv:Body>
                 <urn:ZSD_INQUIRY_MAT_FM>
                    <!--You may enter the following 2 items in any order-->
                    <I_CUSID>`+uname+`</I_CUSID>
                    <!--Optional:-->
                    <ZSD_INQ>
                       <!--Zero or more repetitions:-->
                       <item>
                         
            
                       </item>
                    </ZSD_INQ>
                 </urn:ZSD_INQUIRY_MAT_FM>
              </soapenv:Body>
           </soapenv:Envelope>`;
                           var options = {
                               url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_INQUIRY_MAT&interfaceNamespace=http://inquiry_mat.com',
                               headers: {
                                   'Content-Type': 'application/xml',
                                   'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                               },
                               body: postData
                           }
                           request.post(options, function (error, response, body) {
                               if (!error && response.statusCode == 200) {
                                   var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                   result2 = JSON.parse(result2);
                                   var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZSD_INQUIRY_MAT_FM.Response']['ZSD_INQ'];
                                   console.log("customer id created =" + resp['_text']);
                                   res.send(resp);
                                   
                               }
                           })
                         });
app.post('/vendlogin', (req, res) => {
                           uname = req.body.username.toUpperCase();
                           pass = req.body.password.toUpperCase();
                        //  const uname = 'SA1000';
                        //   const pass = '1016101610';
                           const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                           <soapenv:Header/>
                           <soapenv:Body>
                              <urn:ZVEND_LOGIN_MAT>
                                 <!--You may enter the following 2 items in any order-->
                                 <PASS>`+pass+`</PASS>
                                 <UNAME>`+uname+`</UNAME>
                              </urn:ZVEND_LOGIN_MAT>
                           </soapenv:Body>
                        </soapenv:Envelope>`;
                           var options = {
                               url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDLOGIN_MAT&interfaceNamespace=http://vendorportal_mat.com',
                               headers: {
                                   'Content-Type': 'application/xml',
                                   'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                               },
                               body: postData
                           }
                           request.post(options, function (error, response, body) {
                               if (!error && response.statusCode == 200) {
                                   var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
                                   result1 = JSON.parse(result1);
                                   var resp = result1['SOAP:Envelope']['SOAP:Body']['ns0:ZVEND_LOGIN_MAT.Response']['RES'];
                                   res.send(resp);
                                   // res.send(result1);
                               }
                           })
                       });
app.post('/vendprofile', (req, res) => {

                         uname = req.body.username.toUpperCase();
                        
                        //const uname = '6';
                       // const pass = '1234567890';
                        const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                           <urn:ZVENDOR_PROFILE_MAT>
                              <I_LIFNR>`+uname+`</I_LIFNR>
                           </urn:ZVENDOR_PROFILE_MAT>
                        </soapenv:Body>
                     </soapenv:Envelope>`;
                        var options = {
                            url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDPROFILE_MAT&interfaceNamespace=http://vendorportal_mat.com',
                            headers: {
                                'Content-Type': 'application/xml',
                                'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                            },
                            body: postData
                        }
                        request.post(options, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                result2 = JSON.parse(result2);
                                var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZVENDOR_PROFILE_MAT.Response']['E_DETAILS'];
                                res.send(resp);
                               // res.send(result2);
                            }
                        })
                      });
app.post('/vendupdprofile', (req, res) => {
                      
   
                        name1 = req.body.Name1;
                        name2 = req.body.Name2;
                       
                        street = req.body.Street;
                        city = req.body.City;   
                        district = req.body.District;
                        country = req.body.Country;
                     
                        
                        pincode = req.body.Pcode;
                       // state = req.body.State;
                       
                        telephone = req.body.Phone_number;
                  
  
                        //const uname = '6';
                        // const name1 = 'john';
                        // const name2 = 'snow';
                        // const street = 'redkeep';
                        // const city = 'winterfell';
                        // const district = 'winterfell';
                        // const state = 'Got';
                        // const country = 'got';
                        // const pincode = '626118';
                        // const telephone = '1122334455';
                     
                        // const pass = '1234567890';
                         const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                         <soapenv:Header/>
                         <soapenv:Body>
                            <urn:ZVENDOR_UPDPROFILE_MAT>
                               <!--You may enter the following 9 items in any order-->
                               <!--Optional:-->
                               <ADDRESS>`+street+`</ADDRESS>
                               <!--Optional:-->
                               <CITY>`+city+`</CITY>
                               <!--Optional:-->
                               <COUNTRY>`+country+`</COUNTRY>
                               <!--Optional:-->
                               <DISTRICT>`+district+`</DISTRICT>
                               <!--Optional:-->
                               <F_NAME>`+name1+`</F_NAME>
                               <!--Optional:-->
                               <L_NAME>`+name2+`</L_NAME>
                               <!--Optional:-->
                               <P_CODE>`+pincode+`</P_CODE>
                               <!--Optional:-->
                               <TELEPHONE>`+telephone+`</TELEPHONE>
                               <VEND_ID>`+uname+`</VEND_ID>
                            </urn:ZVENDOR_UPDPROFILE_MAT>
                         </soapenv:Body>
                      </soapenv:Envelope>`;
                         var options = {
                             url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDUPDPROFILE_MAT&interfaceNamespace=http://vendorportal_mat.com',
                             headers: {
                                 'Content-Type': 'application/xml',
                                 'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                             },
                             body: postData
                         }
                         request.post(options, function (error, response, body) { 
                             if (!error && response.statusCode == 200) {
                                 var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                 result2 = JSON.parse(result2);
                                 var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZVENDOR_UPDPROFILE_MAT.Response'];
                                 res.send(resp);
                                // res.send(result2);
                             }
                         })
                       });
app.post('/vendrfq', (req, res) => {

                       
                          //const uname = 'SA1000';
                            uname = req.body.username.toUpperCase();
                           const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                           <soapenv:Header/>
                           <soapenv:Body>
                              <urn:ZMM_RFQ_MAT>
                                 <!--You may enter the following 4 items in any order-->
                                 <VEND_ID>`+uname+`</VEND_ID>
                                 <T_OUT>
                                    <!--Zero or more repetitions:-->
                                    <item>
                                  
                                    </item>
                                 </T_OUT>
                                 <T_RFQ_HEAD>
                                    <!--Zero or more repetitions:-->
                                    <item>
                                       
                                    </item>
                                 </T_RFQ_HEAD>
                                 <T_RFQ_VALUES>
                                    <!--Zero or more repetitions:-->
                                    <item>
                                      
                                    </item>
                                 </T_RFQ_VALUES>
                              </urn:ZMM_RFQ_MAT>
                           </soapenv:Body>
                        </soapenv:Envelope>`;
                           var options = {
                               url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDRFQ_MAT&interfaceNamespace=http://vendorportal_mat.com',
                               headers: {
                                   'Content-Type': 'application/xml',
                                   'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                               },
                               body: postData
                           }
                           request.post(options, function (error, response, body) {
                               if (!error && response.statusCode == 200) {
                                   var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                   result2 = JSON.parse(result2);
                                   var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_RFQ_MAT.Response'];
                                
                                  res.send(resp);
                                  
                                 
                               }
                           })
                         });
app.post('/vendpurord', (req, res) => {
                           // const uname = '6';
                            uname = req.body.username.toUpperCase();
                            const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                            <soapenv:Header/>
                            <soapenv:Body>
                               <urn:ZMM_PURORD_MAT>
                                  <!--You may enter the following 4 items in any order-->
                                  <VEND_ID>`+uname+`</VEND_ID>
                                  <T_OUT>
                                     <!--Zero or more repetitions:-->
                                     <item>
                                        <!--Optional:-->
                                        <TYPE></TYPE>
                                        <!--Optional:-->
                                        <CODE></CODE>
                                        <!--Optional:-->
                                        <MESSAGE></MESSAGE>
                                        <!--Optional:-->
                                        <LOG_NO></LOG_NO>
                                        <!--Optional:-->
                                        <LOG_MSG_NO></LOG_MSG_NO>
                                        <!--Optional:-->
                                        <MESSAGE_V1></MESSAGE_V1>
                                        <!--Optional:-->
                                        <MESSAGE_V2></MESSAGE_V2>
                                        <!--Optional:-->
                                        <MESSAGE_V3></MESSAGE_V3>
                                        <!--Optional:-->
                                        <MESSAGE_V4></MESSAGE_V4>
                                     </item>
                                  </T_OUT>
                                  <T_PURORD_HEAD>
                                     <!--Zero or more repetitions:-->
                                     <item>
                                        <!--Optional:-->
                                        <PO_NUMBER></PO_NUMBER>
                                        <!--Optional:-->
                                        <CO_CODE></CO_CODE>
                                        <!--Optional:-->
                                        <DOC_CAT></DOC_CAT>
                                        <!--Optional:-->
                                        <DOC_TYPE></DOC_TYPE>
                                        <!--Optional:-->
                                        <CNTRL_IND></CNTRL_IND>
                                        <!--Optional:-->
                                        <DELETE_IND></DELETE_IND>
                                        <!--Optional:-->
                                        <STATUS></STATUS>
                                        <!--Optional:-->
                                        <CREATED_ON></CREATED_ON>
                                        <!--Optional:-->
                                        <CREATED_BY></CREATED_BY>
                                        <!--Optional:-->
                                        <ITEM_INTVL></ITEM_INTVL>
                                        <!--Optional:-->
                                        <LAST_ITEM></LAST_ITEM>
                                        <!--Optional:-->
                                        <VENDOR></VENDOR>
                                        <!--Optional:-->
                                        <LANGUAGE></LANGUAGE>
                                        <!--Optional:-->
                                        <PMNTTRMS></PMNTTRMS>
                                        <!--Optional:-->
                                        <DSCNT1_TO></DSCNT1_TO>
                                        <!--Optional:-->
                                        <DSCNT2_TO></DSCNT2_TO>
                                        <!--Optional:-->
                                        <DSCNT3_TO></DSCNT3_TO>
                                        <!--Optional:-->
                                        <CASH_DISC1></CASH_DISC1>
                                        <!--Optional:-->
                                        <CASH_DISC2></CASH_DISC2>
                                        <!--Optional:-->
                                        <PURCH_ORG></PURCH_ORG>
                                        <!--Optional:-->
                                        <PUR_GROUP></PUR_GROUP>
                                        <!--Optional:-->
                                        <CURRENCY></CURRENCY>
                                        <!--Optional:-->
                                        <EXCH_RATE></EXCH_RATE>
                                        <!--Optional:-->
                                        <EX_RATE_FX></EX_RATE_FX>
                                        <!--Optional:-->
                                        <DOC_DATE></DOC_DATE>
                                        <!--Optional:-->
                                        <VPER_START></VPER_START>
                                        <!--Optional:-->
                                        <VPER_END></VPER_END>
                                        <!--Optional:-->
                                        <APPLIC_BY></APPLIC_BY>
                                        <!--Optional:-->
                                        <QUOT_DEAD></QUOT_DEAD>
                                        <!--Optional:-->
                                        <BINDG_PER></BINDG_PER>
                                        <!--Optional:-->
                                        <WARRANTY></WARRANTY>
                                        <!--Optional:-->
                                        <BIDINV_NO></BIDINV_NO>
                                        <!--Optional:-->
                                        <QUOTATION></QUOTATION>
                                        <!--Optional:-->
                                        <QUOT_DATE></QUOT_DATE>
                                        <!--Optional:-->
                                        <REF_1></REF_1>
                                        <!--Optional:-->
                                        <SALES_PERS></SALES_PERS>
                                        <!--Optional:-->
                                        <TELEPHONE></TELEPHONE>
                                        <!--Optional:-->
                                        <SUPPL_VEND></SUPPL_VEND>
                                        <!--Optional:-->
                                        <CUSTOMER></CUSTOMER>
                                        <!--Optional:-->
                                        <AGREEMENT></AGREEMENT>
                                        <!--Optional:-->
                                        <REJ_REASON></REJ_REASON>
                                        <!--Optional:-->
                                        <COMPL_DLV></COMPL_DLV>
                                        <!--Optional:-->
                                        <GR_MESSAGE></GR_MESSAGE>
                                        <!--Optional:-->
                                        <SUPPL_PLNT></SUPPL_PLNT>
                                        <!--Optional:-->
                                        <RCVG_VEND></RCVG_VEND>
                                        <!--Optional:-->
                                        <INCOTERMS1></INCOTERMS1>
                                        <!--Optional:-->
                                        <INCOTERMS2></INCOTERMS2>
                                        <!--Optional:-->
                                        <TARGET_VAL></TARGET_VAL>
                                        <!--Optional:-->
                                        <COLL_NO></COLL_NO>
                                        <!--Optional:-->
                                        <DOC_COND></DOC_COND>
                                        <!--Optional:-->
                                        <PROCEDURE></PROCEDURE>
                                        <!--Optional:-->
                                        <UPDATE_GRP></UPDATE_GRP>
                                        <!--Optional:-->
                                        <DIFF_INV></DIFF_INV>
                                        <!--Optional:-->
                                        <EXPORT_NO></EXPORT_NO>
                                        <!--Optional:-->
                                        <OUR_REF></OUR_REF>
                                        <!--Optional:-->
                                        <LOGSYSTEM></LOGSYSTEM>
                                        <!--Optional:-->
                                        <SUBITEMINT></SUBITEMINT>
                                        <!--Optional:-->
                                        <MAST_COND></MAST_COND>
                                        <!--Optional:-->
                                        <REL_GROUP></REL_GROUP>
                                        <!--Optional:-->
                                        <REL_STRAT></REL_STRAT>
                                        <!--Optional:-->
                                        <REL_IND></REL_IND>
                                        <!--Optional:-->
                                        <REL_STATUS></REL_STATUS>
                                        <!--Optional:-->
                                        <SUBJ_TO_R></SUBJ_TO_R>
                                        <!--Optional:-->
                                        <TAXR_CNTRY></TAXR_CNTRY>
                                        <!--Optional:-->
                                        <SCHED_IND></SCHED_IND>
                                        <!--Optional:-->
                                        <VEND_NAME></VEND_NAME>
                                        <!--Optional:-->
                                        <CURRENCY_ISO></CURRENCY_ISO>
                                        <!--Optional:-->
                                        <EXCH_RATE_CM></EXCH_RATE_CM>
                                        <!--Optional:-->
                                        <HOLD></HOLD>
                                     </item>
                                  </T_PURORD_HEAD>
                                  <T_PURORD_VALUES>
                                     <!--Zero or more repetitions:-->
                                     <item>
                                        <!--Optional:-->
                                        <PO_NUMBER></PO_NUMBER>
                                        <!--Optional:-->
                                        <PO_ITEM></PO_ITEM>
                                        <!--Optional:-->
                                        <DELETE_IND></DELETE_IND>
                                        <!--Optional:-->
                                        <STATUS></STATUS>
                                        <!--Optional:-->
                                        <CHANGED_ON></CHANGED_ON>
                                        <!--Optional:-->
                                        <SHORT_TEXT></SHORT_TEXT>
                                        <!--Optional:-->
                                        <MATERIAL></MATERIAL>
                                        <!--Optional:-->
                                        <PUR_MAT></PUR_MAT>
                                        <!--Optional:-->
                                        <CO_CODE></CO_CODE>
                                        <!--Optional:-->
                                        <PLANT></PLANT>
                                        <!--Optional:-->
                                        <STORE_LOC></STORE_LOC>
                                        <!--Optional:-->
                                        <TRACKINGNO></TRACKINGNO>
                                        <!--Optional:-->
                                        <MAT_GRP></MAT_GRP>
                                        <!--Optional:-->
                                        <INFO_REC></INFO_REC>
                                        <!--Optional:-->
                                        <VEND_MAT></VEND_MAT>
                                        <!--Optional:-->
                                        <TARGET_QTY></TARGET_QTY>
                                        <!--Optional:-->
                                        <QUANTITY></QUANTITY>
                                        <!--Optional:-->
                                        <UNIT></UNIT>
                                        <!--Optional:-->
                                        <ORDERPR_UN></ORDERPR_UN>
                                        <!--Optional:-->
                                        <CONV_NUM1></CONV_NUM1>
                                        <!--Optional:-->
                                        <CONV_DEN1></CONV_DEN1>
                                        <!--Optional:-->
                                        <CONV_NUM2></CONV_NUM2>
                                        <!--Optional:-->
                                        <CONV_DEN2></CONV_DEN2>
                                        <!--Optional:-->
                                        <NET_PRICE></NET_PRICE>
                                        <!--Optional:-->
                                        <PRICE_UNIT></PRICE_UNIT>
                                        <!--Optional:-->
                                        <NET_VALUE></NET_VALUE>
                                        <!--Optional:-->
                                        <GROS_VALUE></GROS_VALUE>
                                        <!--Optional:-->
                                        <QUOT_DEAD></QUOT_DEAD>
                                        <!--Optional:-->
                                        <GR_PR_TIME></GR_PR_TIME>
                                        <!--Optional:-->
                                        <TAX_CODE></TAX_CODE>
                                        <!--Optional:-->
                                        <SETT_GRP1></SETT_GRP1>
                                        <!--Optional:-->
                                        <QUAL_INSP></QUAL_INSP>
                                        <!--Optional:-->
                                        <INFO_UPD></INFO_UPD>
                                        <!--Optional:-->
                                        <PRNT_PRICE></PRNT_PRICE>
                                        <!--Optional:-->
                                        <EST_PRICE></EST_PRICE>
                                        <!--Optional:-->
                                        <NUM_REMIND></NUM_REMIND>
                                        <!--Optional:-->
                                        <REMINDER1></REMINDER1>
                                        <!--Optional:-->
                                        <REMINDER2></REMINDER2>
                                        <!--Optional:-->
                                        <REMINDER3></REMINDER3>
                                        <!--Optional:-->
                                        <OVERDELTOL></OVERDELTOL>
                                        <!--Optional:-->
                                        <UNLIMITED></UNLIMITED>
                                        <!--Optional:-->
                                        <UNDER_TOL></UNDER_TOL>
                                        <!--Optional:-->
                                        <VAL_TYPE></VAL_TYPE>
                                        <!--Optional:-->
                                        <VAL_CAT></VAL_CAT>
                                        <!--Optional:-->
                                        <REJ_IND></REJ_IND>
                                        <!--Optional:-->
                                        <COMMENT></COMMENT>
                                        <!--Optional:-->
                                        <DEL_COMPL></DEL_COMPL>
                                        <!--Optional:-->
                                        <FINAL_INV></FINAL_INV>
                                        <!--Optional:-->
                                        <ITEM_CAT></ITEM_CAT>
                                        <!--Optional:-->
                                        <ACCTASSCAT></ACCTASSCAT>
                                        <!--Optional:-->
                                        <CONSUMPT></CONSUMPT>
                                        <!--Optional:-->
                                        <DISTRIB></DISTRIB>
                                        <!--Optional:-->
                                        <PART_INV></PART_INV>
                                        <!--Optional:-->
                                        <GR_IND></GR_IND>
                                        <!--Optional:-->
                                        <GR_NON_VAL></GR_NON_VAL>
                                        <!--Optional:-->
                                        <IR_IND></IR_IND>
                                        <!--Optional:-->
                                        <GR_BASEDIV></GR_BASEDIV>
                                        <!--Optional:-->
                                        <ACKN_REQD></ACKN_REQD>
                                        <!--Optional:-->
                                        <ACKNOWL_NO></ACKNOWL_NO>
                                        <!--Optional:-->
                                        <AGREEMENT></AGREEMENT>
                                        <!--Optional:-->
                                        <AGMT_ITEM></AGMT_ITEM>
                                        <!--Optional:-->
                                        <RECON_DATE></RECON_DATE>
                                        <!--Optional:-->
                                        <AGRCUMQTY></AGRCUMQTY>
                                        <!--Optional:-->
                                        <FIRM_ZONE></FIRM_ZONE>
                                        <!--Optional:-->
                                        <TRADE_OFF></TRADE_OFF>
                                        <!--Optional:-->
                                        <BOM_EXPL></BOM_EXPL>
                                        <!--Optional:-->
                                        <EXCLUSION></EXCLUSION>
                                        <!--Optional:-->
                                        <BASE_UNIT></BASE_UNIT>
                                        <!--Optional:-->
                                        <SHIPPING></SHIPPING>
                                        <!--Optional:-->
                                        <OUTL_TARGV></OUTL_TARGV>
                                        <!--Optional:-->
                                        <NOND_ITAX></NOND_ITAX>
                                        <!--Optional:-->
                                        <RELORD_QTY></RELORD_QTY>
                                        <!--Optional:-->
                                        <PRICE_DATE></PRICE_DATE>
                                        <!--Optional:-->
                                        <DOC_CAT></DOC_CAT>
                                        <!--Optional:-->
                                        <EFF_VALUE></EFF_VALUE>
                                        <!--Optional:-->
                                        <COMMITMENT></COMMITMENT>
                                        <!--Optional:-->
                                        <CUSTOMER></CUSTOMER>
                                        <!--Optional:-->
                                        <ADDRESS></ADDRESS>
                                        <!--Optional:-->
                                        <COND_GROUP></COND_GROUP>
                                        <!--Optional:-->
                                        <NO_C_DISC></NO_C_DISC>
                                        <!--Optional:-->
                                        <UPDATE_GRP></UPDATE_GRP>
                                        <!--Optional:-->
                                        <PLAN_DEL></PLAN_DEL>
                                        <!--Optional:-->
                                        <NET_WEIGHT></NET_WEIGHT>
                                        <!--Optional:-->
                                        <WEIGHTUNIT></WEIGHTUNIT>
                                        <!--Optional:-->
                                        <TAX_JUR_CD></TAX_JUR_CD>
                                        <!--Optional:-->
                                        <PRINT_REL></PRINT_REL>
                                        <!--Optional:-->
                                        <SPEC_STOCK></SPEC_STOCK>
                                        <!--Optional:-->
                                        <SETRESERNO></SETRESERNO>
                                        <!--Optional:-->
                                        <SETTLITMNO></SETTLITMNO>
                                        <!--Optional:-->
                                        <NOT_CHGBL></NOT_CHGBL>
                                        <!--Optional:-->
                                        <CTR_KEY_QM></CTR_KEY_QM>
                                        <!--Optional:-->
                                        <CERT_TYPE></CERT_TYPE>
                                        <!--Optional:-->
                                        <EAN_UPC></EAN_UPC>
                                        <!--Optional:-->
                                        <CONF_CTRL></CONF_CTRL>
                                        <!--Optional:-->
                                        <REV_LEV></REV_LEV>
                                        <!--Optional:-->
                                        <FUND></FUND>
                                        <!--Optional:-->
                                        <FUNDS_CTR></FUNDS_CTR>
                                        <!--Optional:-->
                                        <CMMT_ITEM></CMMT_ITEM>
                                        <!--Optional:-->
                                        <BA_PARTNER></BA_PARTNER>
                                        <!--Optional:-->
                                        <PTR_ASS_BA></PTR_ASS_BA>
                                        <!--Optional:-->
                                        <PROFIT_CTR></PROFIT_CTR>
                                        <!--Optional:-->
                                        <PARTNER_PC></PARTNER_PC>
                                        <!--Optional:-->
                                        <PRICE_CTR></PRICE_CTR>
                                        <!--Optional:-->
                                        <GROSS_WGHT></GROSS_WGHT>
                                        <!--Optional:-->
                                        <VOLUME></VOLUME>
                                        <!--Optional:-->
                                        <VOLUMEUNIT></VOLUMEUNIT>
                                        <!--Optional:-->
                                        <INCOTERMS1></INCOTERMS1>
                                        <!--Optional:-->
                                        <INCOTERMS2></INCOTERMS2>
                                        <!--Optional:-->
                                        <ADVANCE></ADVANCE>
                                        <!--Optional:-->
                                        <PRIOR_VEND></PRIOR_VEND>
                                        <!--Optional:-->
                                        <SUB_RANGE></SUB_RANGE>
                                        <!--Optional:-->
                                        <PCKG_NO></PCKG_NO>
                                        <!--Optional:-->
                                        <STATISTIC></STATISTIC>
                                        <!--Optional:-->
                                        <HL_ITEM></HL_ITEM>
                                        <!--Optional:-->
                                        <GR_TO_DATE></GR_TO_DATE>
                                        <!--Optional:-->
                                        <SUPPL_VEND></SUPPL_VEND>
                                        <!--Optional:-->
                                        <SC_VENDOR></SC_VENDOR>
                                        <!--Optional:-->
                                        <CONF_MATL></CONF_MATL>
                                        <!--Optional:-->
                                        <MAT_CAT></MAT_CAT>
                                        <!--Optional:-->
                                        <KANBAN_IND></KANBAN_IND>
                                        <!--Optional:-->
                                        <ADDRESS2></ADDRESS2>
                                        <!--Optional:-->
                                        <INT_OBJ_NO></INT_OBJ_NO>
                                        <!--Optional:-->
                                        <ERS></ERS>
                                        <!--Optional:-->
                                        <GRSETTFROM></GRSETTFROM>
                                        <!--Optional:-->
                                        <LAST_TRANS></LAST_TRANS>
                                        <!--Optional:-->
                                        <TRANS_TIME></TRANS_TIME>
                                        <!--Optional:-->
                                        <SER_NO></SER_NO>
                                        <!--Optional:-->
                                        <PROMOTION></PROMOTION>
                                        <!--Optional:-->
                                        <ALLOC_TBL></ALLOC_TBL>
                                        <!--Optional:-->
                                        <AT_ITEM></AT_ITEM>
                                        <!--Optional:-->
                                        <POINTS></POINTS>
                                        <!--Optional:-->
                                        <POINTS_UN></POINTS_UN>
                                        <!--Optional:-->
                                        <SEASON_TY></SEASON_TY>
                                        <!--Optional:-->
                                        <SEASON_YR></SEASON_YR>
                                        <!--Optional:-->
                                        <SETT_GRP_2></SETT_GRP_2>
                                        <!--Optional:-->
                                        <SETT_GRP_3></SETT_GRP_3>
                                        <!--Optional:-->
                                        <SETT_ITEM></SETT_ITEM>
                                        <!--Optional:-->
                                        <ML_AKT></ML_AKT>
                                        <!--Optional:-->
                                        <REMSHLIFE></REMSHLIFE>
                                        <!--Optional:-->
                                        <RFQ></RFQ>
                                        <!--Optional:-->
                                        <RFQ_ITEM></RFQ_ITEM>
                                        <!--Optional:-->
                                        <CONFIG_ORG></CONFIG_ORG>
                                        <!--Optional:-->
                                        <QUOTAUSAGE></QUOTAUSAGE>
                                        <!--Optional:-->
                                        <SPSTCK_PHY></SPSTCK_PHY>
                                        <!--Optional:-->
                                        <PREQ_NO></PREQ_NO>
                                        <!--Optional:-->
                                        <PREQ_ITEM></PREQ_ITEM>
                                        <!--Optional:-->
                                        <MAT_TYPE></MAT_TYPE>
                                        <!--Optional:-->
                                        <SI_CAT></SI_CAT>
                                        <!--Optional:-->
                                        <SUB_ITEMS></SUB_ITEMS>
                                        <!--Optional:-->
                                        <SUBTOTAL_1></SUBTOTAL_1>
                                        <!--Optional:-->
                                        <SUBTOTAL_2></SUBTOTAL_2>
                                        <!--Optional:-->
                                        <SUBTOTAL_3></SUBTOTAL_3>
                                        <!--Optional:-->
                                        <SUBTOTAL_4></SUBTOTAL_4>
                                        <!--Optional:-->
                                        <SUBTOTAL_5></SUBTOTAL_5>
                                        <!--Optional:-->
                                        <SUBTOTAL_6></SUBTOTAL_6>
                                        <!--Optional:-->
                                        <SUBITM_KEY></SUBITM_KEY>
                                        <!--Optional:-->
                                        <MAX_CMG></MAX_CMG>
                                        <!--Optional:-->
                                        <MAX_CPGO></MAX_CPGO>
                                        <!--Optional:-->
                                        <RET_ITEM></RET_ITEM>
                                        <!--Optional:-->
                                        <AT_RELEV></AT_RELEV>
                                        <!--Optional:-->
                                        <ORD_REAS></ORD_REAS>
                                        <!--Optional:-->
                                        <DEL_TYP_RT></DEL_TYP_RT>
                                        <!--Optional:-->
                                        <PRDTE_CTRL></PRDTE_CTRL>
                                        <!--Optional:-->
                                        <MANUF_PROF></MANUF_PROF>
                                        <!--Optional:-->
                                        <MANU_MAT></MANU_MAT>
                                        <!--Optional:-->
                                        <MFR_NO></MFR_NO>
                                        <!--Optional:-->
                                        <MFR_NO_EXT></MFR_NO_EXT>
                                        <!--Optional:-->
                                        <ITEM_CAT_EXT></ITEM_CAT_EXT>
                                        <!--Optional:-->
                                        <PO_UNIT_ISO></PO_UNIT_ISO>
                                        <!--Optional:-->
                                        <ORDERPR_UN_ISO></ORDERPR_UN_ISO>
                                        <!--Optional:-->
                                        <BASE_UOM_ISO></BASE_UOM_ISO>
                                        <!--Optional:-->
                                        <WEIGHTUNIT_ISO></WEIGHTUNIT_ISO>
                                        <!--Optional:-->
                                        <VOLUMEUNIT_ISO></VOLUMEUNIT_ISO>
                                        <!--Optional:-->
                                        <POINTS_UN_ISO></POINTS_UN_ISO>
                                        <!--Optional:-->
                                        <CONF_MATL_EXTERNAL></CONF_MATL_EXTERNAL>
                                        <!--Optional:-->
                                        <CONF_MATL_GUID></CONF_MATL_GUID>
                                        <!--Optional:-->
                                        <CONF_MATL_VERSION></CONF_MATL_VERSION>
                                        <!--Optional:-->
                                        <MATERIAL_EXTERNAL></MATERIAL_EXTERNAL>
                                        <!--Optional:-->
                                        <MATERIAL_GUID></MATERIAL_GUID>
                                        <!--Optional:-->
                                        <MATERIAL_VERSION></MATERIAL_VERSION>
                                        <!--Optional:-->
                                        <PUR_MAT_EXTERNAL></PUR_MAT_EXTERNAL>
                                        <!--Optional:-->
                                        <PUR_MAT_GUID></PUR_MAT_GUID>
                                        <!--Optional:-->
                                        <PUR_MAT_VERSION></PUR_MAT_VERSION>
                                        <!--Optional:-->
                                        <GRANT_NBR></GRANT_NBR>
                                        <!--Optional:-->
                                        <CMMT_ITEM_LONG></CMMT_ITEM_LONG>
                                        <!--Optional:-->
                                        <FUNC_AREA_LONG></FUNC_AREA_LONG>
                                        <!--Optional:-->
                                        <BUDGET_PERIOD></BUDGET_PERIOD>
                                     </item>
                                  </T_PURORD_VALUES>
                               </urn:ZMM_PURORD_MAT>
                            </soapenv:Body>
                         </soapenv:Envelope>`;
                            var options = {
                                url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDPURORD_MAT&interfaceNamespace=http://vendorportal_mat.com',
                                headers: {
                                    'Content-Type': 'application/xml',
                                    'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                },
                                body: postData
                            }
                            request.post(options, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                    result2 = JSON.parse(result2);
                                    var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_PURORD_MAT.Response'];
                                 
                                   res.send(resp);
                                   
                                  
                                }
                            })
                          });
app.post('/vendgoods', (req, res) => {
                          //const uname = '6';
                            uname = req.body.username.toUpperCase();
                            const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                            <soapenv:Header/>
                            <soapenv:Body>
                               <urn:ZMM_GOODS_RECIPT_MAT>
                                  <!--You may enter the following 4 items in any order-->
                                  <VEND_ID>`+uname+`</VEND_ID>
                                  <T_GOODS_HEAD>
                                     <!--Zero or more repetitions:-->
                                     <item>
                                        <!--Optional:-->
                                        <MAT_DOC></MAT_DOC>
                                        <!--Optional:-->
                                        <DOC_YEAR></DOC_YEAR>
                                        <!--Optional:-->
                                        <TR_EV_TYPE></TR_EV_TYPE>
                                        <!--Optional:-->
                                        <DOC_DATE></DOC_DATE>
                                        <!--Optional:-->
                                        <PSTNG_DATE></PSTNG_DATE>
                                        <!--Optional:-->
                                        <ENTRY_DATE></ENTRY_DATE>
                                        <!--Optional:-->
                                        <ENTRY_TIME></ENTRY_TIME>
                                        <!--Optional:-->
                                        <USERNAME></USERNAME>
                                        <!--Optional:-->
                                        <VER_GR_GI_SLIP></VER_GR_GI_SLIP>
                                        <!--Optional:-->
                                        <EXPIMP_NO></EXPIMP_NO>
                                        <!--Optional:-->
                                        <REF_DOC_NO></REF_DOC_NO>
                                        <!--Optional:-->
                                        <HEADER_TXT></HEADER_TXT>
                                        <!--Optional:-->
                                        <REF_DOC_NO_LONG></REF_DOC_NO_LONG>
                                     </item>
                                  </T_GOODS_HEAD>
                                  <T_GOODS_VALUES>
                                     <!--Zero or more repetitions:-->
                                     <item>
                                        <!--Optional:-->
                                        <MAT_DOC></MAT_DOC>
                                        <!--Optional:-->
                                        <DOC_YEAR></DOC_YEAR>
                                        <!--Optional:-->
                                        <MATDOC_ITM></MATDOC_ITM>
                                        <!--Optional:-->
                                        <MATERIAL></MATERIAL>
                                        <!--Optional:-->
                                        <PLANT></PLANT>
                                        <!--Optional:-->
                                        <STGE_LOC></STGE_LOC>
                                        <!--Optional:-->
                                        <BATCH></BATCH>
                                        <!--Optional:-->
                                        <MOVE_TYPE></MOVE_TYPE>
                                        <!--Optional:-->
                                        <STCK_TYPE></STCK_TYPE>
                                        <!--Optional:-->
                                        <SPEC_STOCK></SPEC_STOCK>
                                        <!--Optional:-->
                                        <VENDOR></VENDOR>
                                        <!--Optional:-->
                                        <CUSTOMER></CUSTOMER>
                                        <!--Optional:-->
                                        <SALES_ORD></SALES_ORD>
                                        <!--Optional:-->
                                        <S_ORD_ITEM></S_ORD_ITEM>
                                        <!--Optional:-->
                                        <SCHED_LINE></SCHED_LINE>
                                        <!--Optional:-->
                                        <VAL_TYPE></VAL_TYPE>
                                        <!--Optional:-->
                                        <ENTRY_QNT></ENTRY_QNT>
                                        <!--Optional:-->
                                        <ENTRY_UOM></ENTRY_UOM>
                                        <!--Optional:-->
                                        <ENTRY_UOM_ISO></ENTRY_UOM_ISO>
                                        <!--Optional:-->
                                        <PO_PR_QNT></PO_PR_QNT>
                                        <!--Optional:-->
                                        <ORDERPR_UN></ORDERPR_UN>
                                        <!--Optional:-->
                                        <ORDERPR_UN_ISO></ORDERPR_UN_ISO>
                                        <!--Optional:-->
                                        <PO_NUMBER></PO_NUMBER>
                                        <!--Optional:-->
                                        <PO_ITEM></PO_ITEM>
                                        <!--Optional:-->
                                        <SHIPPING></SHIPPING>
                                        <!--Optional:-->
                                        <COMP_SHIP></COMP_SHIP>
                                        <!--Optional:-->
                                        <NO_MORE_GR></NO_MORE_GR>
                                        <!--Optional:-->
                                        <ITEM_TEXT></ITEM_TEXT>
                                        <!--Optional:-->
                                        <GR_RCPT></GR_RCPT>
                                        <!--Optional:-->
                                        <UNLOAD_PT></UNLOAD_PT>
                                        <!--Optional:-->
                                        <COSTCENTER></COSTCENTER>
                                        <!--Optional:-->
                                        <ORDERID></ORDERID>
                                        <!--Optional:-->
                                        <ORDER_ITNO></ORDER_ITNO>
                                        <!--Optional:-->
                                        <CALC_MOTIVE></CALC_MOTIVE>
                                        <!--Optional:-->
                                        <ASSET_NO></ASSET_NO>
                                        <!--Optional:-->
                                        <SUB_NUMBER></SUB_NUMBER>
                                        <!--Optional:-->
                                        <RESERV_NO></RESERV_NO>
                                        <!--Optional:-->
                                        <RES_ITEM></RES_ITEM>
                                        <!--Optional:-->
                                        <RES_TYPE></RES_TYPE>
                                        <!--Optional:-->
                                        <WITHDRAWN></WITHDRAWN>
                                        <!--Optional:-->
                                        <MOVE_MAT></MOVE_MAT>
                                        <!--Optional:-->
                                        <MOVE_PLANT></MOVE_PLANT>
                                        <!--Optional:-->
                                        <MOVE_STLOC></MOVE_STLOC>
                                        <!--Optional:-->
                                        <MOVE_BATCH></MOVE_BATCH>
                                        <!--Optional:-->
                                        <MOVE_VAL_TYPE></MOVE_VAL_TYPE>
                                        <!--Optional:-->
                                        <MVT_IND></MVT_IND>
                                        <!--Optional:-->
                                        <MOVE_REAS></MOVE_REAS>
                                        <!--Optional:-->
                                        <RL_EST_KEY></RL_EST_KEY>
                                        <!--Optional:-->
                                        <REF_DATE></REF_DATE>
                                        <!--Optional:-->
                                        <COST_OBJ></COST_OBJ>
                                        <!--Optional:-->
                                        <PROFIT_SEGM_NO></PROFIT_SEGM_NO>
                                        <!--Optional:-->
                                        <PROFIT_CTR></PROFIT_CTR>
                                        <!--Optional:-->
                                        <WBS_ELEM></WBS_ELEM>
                                        <!--Optional:-->
                                        <NETWORK></NETWORK>
                                        <!--Optional:-->
                                        <ACTIVITY></ACTIVITY>
                                        <!--Optional:-->
                                        <PART_ACCT></PART_ACCT>
                                        <!--Optional:-->
                                        <AMOUNT_LC></AMOUNT_LC>
                                        <!--Optional:-->
                                        <AMOUNT_SV></AMOUNT_SV>
                                        <!--Optional:-->
                                        <CURRENCY></CURRENCY>
                                        <!--Optional:-->
                                        <CURRENCY_ISO></CURRENCY_ISO>
                                        <!--Optional:-->
                                        <REF_DOC_YR></REF_DOC_YR>
                                        <!--Optional:-->
                                        <REF_DOC></REF_DOC>
                                        <!--Optional:-->
                                        <REF_DOC_IT></REF_DOC_IT>
                                        <!--Optional:-->
                                        <EXPIRYDATE></EXPIRYDATE>
                                        <!--Optional:-->
                                        <PROD_DATE></PROD_DATE>
                                        <!--Optional:-->
                                        <FUND></FUND>
                                        <!--Optional:-->
                                        <FUNDS_CTR></FUNDS_CTR>
                                        <!--Optional:-->
                                        <CMMT_ITEM></CMMT_ITEM>
                                        <!--Optional:-->
                                        <VAL_SALES_ORD></VAL_SALES_ORD>
                                        <!--Optional:-->
                                        <VAL_S_ORD_ITEM></VAL_S_ORD_ITEM>
                                        <!--Optional:-->
                                        <VAL_WBS_ELEM></VAL_WBS_ELEM>
                                        <!--Optional:-->
                                        <CO_BUSPROC></CO_BUSPROC>
                                        <!--Optional:-->
                                        <ACTTYPE></ACTTYPE>
                                        <!--Optional:-->
                                        <SUPPL_VEND></SUPPL_VEND>
                                        <!--Optional:-->
                                        <X_AUTO_CRE></X_AUTO_CRE>
                                        <!--Optional:-->
                                        <MATERIAL_EXTERNAL></MATERIAL_EXTERNAL>
                                        <!--Optional:-->
                                        <MATERIAL_GUID></MATERIAL_GUID>
                                        <!--Optional:-->
                                        <MATERIAL_VERSION></MATERIAL_VERSION>
                                        <!--Optional:-->
                                        <MOVE_MAT_EXTERNAL></MOVE_MAT_EXTERNAL>
                                        <!--Optional:-->
                                        <MOVE_MAT_GUID></MOVE_MAT_GUID>
                                        <!--Optional:-->
                                        <MOVE_MAT_VERSION></MOVE_MAT_VERSION>
                                        <!--Optional:-->
                                        <GRANT_NBR></GRANT_NBR>
                                        <!--Optional:-->
                                        <CMMT_ITEM_LONG></CMMT_ITEM_LONG>
                                        <!--Optional:-->
                                        <FUNC_AREA_LONG></FUNC_AREA_LONG>
                                        <!--Optional:-->
                                        <LINE_ID></LINE_ID>
                                        <!--Optional:-->
                                        <PARENT_ID></PARENT_ID>
                                        <!--Optional:-->
                                        <LINE_DEPTH></LINE_DEPTH>
                                        <!--Optional:-->
                                        <BUDGET_PERIOD></BUDGET_PERIOD>
                                        <!--Optional:-->
                                        <EARMARKED_NUMBER></EARMARKED_NUMBER>
                                        <!--Optional:-->
                                        <EARMARKED_ITEM></EARMARKED_ITEM>
                                        <!--Optional:-->
                                        <STK_SEGMENT></STK_SEGMENT>
                                     </item>
                                  </T_GOODS_VALUES>
                                  <T_OUT>
                                     <!--Zero or more repetitions:-->
                                     <item>
                                        <!--Optional:-->
                                        <TYPE></TYPE>
                                        <!--Optional:-->
                                        <ID></ID>
                                        <!--Optional:-->
                                        <NUMBER></NUMBER>
                                        <!--Optional:-->
                                        <MESSAGE></MESSAGE>
                                        <!--Optional:-->
                                        <LOG_NO></LOG_NO>
                                        <!--Optional:-->
                                        <LOG_MSG_NO></LOG_MSG_NO>
                                        <!--Optional:-->
                                        <MESSAGE_V1></MESSAGE_V1>
                                        <!--Optional:-->
                                        <MESSAGE_V2></MESSAGE_V2>
                                        <!--Optional:-->
                                        <MESSAGE_V3></MESSAGE_V3>
                                        <!--Optional:-->
                                        <MESSAGE_V4></MESSAGE_V4>
                                        <!--Optional:-->
                                        <PARAMETER></PARAMETER>
                                        <!--Optional:-->
                                        <ROW></ROW>
                                        <!--Optional:-->
                                        <FIELD></FIELD>
                                        <!--Optional:-->
                                        <SYSTEM></SYSTEM>
                                     </item>
                                  </T_OUT>
                               </urn:ZMM_GOODS_RECIPT_MAT>
                            </soapenv:Body>
                         </soapenv:Envelope>`;
                            var options = {
                                url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDGOODS_MAT&interfaceNamespace=http://vendorportal_mat.com',
                                headers: {
                                    'Content-Type': 'application/xml',
                                    'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                },
                                body: postData
                            }
                            request.post(options, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                    result2 = JSON.parse(result2);
                                    var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZMM_GOODS_RECIPT_MAT.Response'];
                                 
                                   res.send(resp);
                                   
                                  
                                }
                            })
                          });
app.post('/vendpayment', (req, res) => {
                           const C_COD = 'SA01';
                           uname = req.body.username.toUpperCase();
                             const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                             <soapenv:Header/>
                             <soapenv:Body>
                                <urn:ZFI_VEND_PAY_AGING_MAT>
                                   <!--You may enter the following 6 items in any order-->
                                   <CO_CODE>`+C_COD+`</CO_CODE>
                                   <!--Optional:-->
                                   <FROM_DATE></FROM_DATE>
                                   <!--Optional:-->
                                   <TO_DATE></TO_DATE>
                                   <VEND_ID>`+uname+`</VEND_ID>
                                   <T_CLOSE>
                                      <!--Zero or more repetitions:-->
                                      <item>
                                         <!--Optional:-->
                                         <COMP_CODE></COMP_CODE>
                                         <!--Optional:-->
                                         <VENDOR></VENDOR>
                                         <!--Optional:-->
                                         <SP_GL_IND></SP_GL_IND>
                                         <!--Optional:-->
                                         <CLEAR_DATE></CLEAR_DATE>
                                         <!--Optional:-->
                                         <CLR_DOC_NO></CLR_DOC_NO>
                                         <!--Optional:-->
                                         <ALLOC_NMBR></ALLOC_NMBR>
                                         <!--Optional:-->
                                         <FISC_YEAR></FISC_YEAR>
                                         <!--Optional:-->
                                         <DOC_NO></DOC_NO>
                                         <!--Optional:-->
                                         <ITEM_NUM></ITEM_NUM>
                                         <!--Optional:-->
                                         <PSTNG_DATE></PSTNG_DATE>
                                         <!--Optional:-->
                                         <DOC_DATE></DOC_DATE>
                                         <!--Optional:-->
                                         <ENTRY_DATE></ENTRY_DATE>
                                         <!--Optional:-->
                                         <CURRENCY></CURRENCY>
                                         <!--Optional:-->
                                         <LOC_CURRCY></LOC_CURRCY>
                                         <!--Optional:-->
                                         <REF_DOC_NO></REF_DOC_NO>
                                         <!--Optional:-->
                                         <DOC_TYPE></DOC_TYPE>
                                         <!--Optional:-->
                                         <FIS_PERIOD></FIS_PERIOD>
                                         <!--Optional:-->
                                         <POST_KEY></POST_KEY>
                                         <!--Optional:-->
                                         <DB_CR_IND></DB_CR_IND>
                                         <!--Optional:-->
                                         <BUS_AREA></BUS_AREA>
                                         <!--Optional:-->
                                         <TAX_CODE></TAX_CODE>
                                         <!--Optional:-->
                                         <LC_AMOUNT></LC_AMOUNT>
                                         <!--Optional:-->
                                         <AMT_DOCCUR></AMT_DOCCUR>
                                         <!--Optional:-->
                                         <LC_TAX></LC_TAX>
                                         <!--Optional:-->
                                         <TX_DOC_CUR></TX_DOC_CUR>
                                         <!--Optional:-->
                                         <ITEM_TEXT></ITEM_TEXT>
                                         <!--Optional:-->
                                         <BRANCH></BRANCH>
                                         <!--Optional:-->
                                         <BLINE_DATE></BLINE_DATE>
                                         <!--Optional:-->
                                         <PMNTTRMS></PMNTTRMS>
                                         <!--Optional:-->
                                         <DSCT_DAYS1></DSCT_DAYS1>
                                         <!--Optional:-->
                                         <DSCT_DAYS2></DSCT_DAYS2>
                                         <!--Optional:-->
                                         <NETTERMS></NETTERMS>
                                         <!--Optional:-->
                                         <DSCT_PCT1></DSCT_PCT1>
                                         <!--Optional:-->
                                         <DSCT_PCT2></DSCT_PCT2>
                                         <!--Optional:-->
                                         <DISC_BASE></DISC_BASE>
                                         <!--Optional:-->
                                         <DSC_AMT_LC></DSC_AMT_LC>
                                         <!--Optional:-->
                                         <DSC_AMT_DC></DSC_AMT_DC>
                                         <!--Optional:-->
                                         <PYMT_METH></PYMT_METH>
                                         <!--Optional:-->
                                         <PMNT_BLOCK></PMNT_BLOCK>
                                         <!--Optional:-->
                                         <FIXEDTERMS></FIXEDTERMS>
                                         <!--Optional:-->
                                         <INV_REF></INV_REF>
                                         <!--Optional:-->
                                         <INV_YEAR></INV_YEAR>
                                         <!--Optional:-->
                                         <INV_ITEM></INV_ITEM>
                                         <!--Optional:-->
                                         <DUNN_BLOCK></DUNN_BLOCK>
                                         <!--Optional:-->
                                         <DUNN_KEY></DUNN_KEY>
                                         <!--Optional:-->
                                         <LAST_DUNN></LAST_DUNN>
                                         <!--Optional:-->
                                         <DUNN_LEVEL></DUNN_LEVEL>
                                         <!--Optional:-->
                                         <DUNN_AREA></DUNN_AREA>
                                         <!--Optional:-->
                                         <W_TAX_CODE></W_TAX_CODE>
                                         <!--Optional:-->
                                         <W_TAX_BASE></W_TAX_BASE>
                                         <!--Optional:-->
                                         <WI_TAX_AMT></WI_TAX_AMT>
                                         <!--Optional:-->
                                         <DOC_STATUS></DOC_STATUS>
                                         <!--Optional:-->
                                         <NXT_DOCTYP></NXT_DOCTYP>
                                         <!--Optional:-->
                                         <VAT_REG_NO></VAT_REG_NO>
                                         <!--Optional:-->
                                         <EXEMPT_NO></EXEMPT_NO>
                                         <!--Optional:-->
                                         <W_TAX_EXPT></W_TAX_EXPT>
                                         <!--Optional:-->
                                         <REASON_CDE></REASON_CDE>
                                         <!--Optional:-->
                                         <PMTMTHSUPL></PMTMTHSUPL>
                                         <!--Optional:-->
                                         <REF_KEY_1></REF_KEY_1>
                                         <!--Optional:-->
                                         <REF_KEY_2></REF_KEY_2>
                                         <!--Optional:-->
                                         <T_CURRENCY></T_CURRENCY>
                                         <!--Optional:-->
                                         <AMOUNT></AMOUNT>
                                         <!--Optional:-->
                                         <NET_AMOUNT></NET_AMOUNT>
                                         <!--Optional:-->
                                         <NAME></NAME>
                                         <!--Optional:-->
                                         <NAME_2></NAME_2>
                                         <!--Optional:-->
                                         <NAME_3></NAME_3>
                                         <!--Optional:-->
                                         <NAME_4></NAME_4>
                                         <!--Optional:-->
                                         <POSTL_CODE></POSTL_CODE>
                                         <!--Optional:-->
                                         <CITY></CITY>
                                         <!--Optional:-->
                                         <COUNTRY></COUNTRY>
                                         <!--Optional:-->
                                         <STREET></STREET>
                                         <!--Optional:-->
                                         <PO_BOX></PO_BOX>
                                         <!--Optional:-->
                                         <POBX_PCD></POBX_PCD>
                                         <!--Optional:-->
                                         <POBK_CURAC></POBK_CURAC>
                                         <!--Optional:-->
                                         <BANK_ACCT></BANK_ACCT>
                                         <!--Optional:-->
                                         <BANK_KEY></BANK_KEY>
                                         <!--Optional:-->
                                         <BANK_CTRY></BANK_CTRY>
                                         <!--Optional:-->
                                         <TAX_NO_1></TAX_NO_1>
                                         <!--Optional:-->
                                         <TAX_NO_2></TAX_NO_2>
                                         <!--Optional:-->
                                         <TAX></TAX>
                                         <!--Optional:-->
                                         <EQUAL_TAX></EQUAL_TAX>
                                         <!--Optional:-->
                                         <REGION></REGION>
                                         <!--Optional:-->
                                         <CTRL_KEY></CTRL_KEY>
                                         <!--Optional:-->
                                         <INSTR_KEY></INSTR_KEY>
                                         <!--Optional:-->
                                         <PAYEE_CODE></PAYEE_CODE>
                                         <!--Optional:-->
                                         <LANGU></LANGU>
                                         <!--Optional:-->
                                         <BILL_LIFE></BILL_LIFE>
                                         <!--Optional:-->
                                         <BE_TAXCODE></BE_TAXCODE>
                                         <!--Optional:-->
                                         <BILLTAX_LC></BILLTAX_LC>
                                         <!--Optional:-->
                                         <BILLTAX_FC></BILLTAX_FC>
                                         <!--Optional:-->
                                         <LC_COL_CHG></LC_COL_CHG>
                                         <!--Optional:-->
                                         <COLL_CHARG></COLL_CHARG>
                                         <!--Optional:-->
                                         <CHGS_TX_CD></CHGS_TX_CD>
                                         <!--Optional:-->
                                         <ISSUE_DATE></ISSUE_DATE>
                                         <!--Optional:-->
                                         <USAGEDATE></USAGEDATE>
                                         <!--Optional:-->
                                         <BILL_USAGE></BILL_USAGE>
                                         <!--Optional:-->
                                         <DOMICILE></DOMICILE>
                                         <!--Optional:-->
                                         <DRAWER></DRAWER>
                                         <!--Optional:-->
                                         <CTRBNK_LOC></CTRBNK_LOC>
                                         <!--Optional:-->
                                         <DRAW_CITY1></DRAW_CITY1>
                                         <!--Optional:-->
                                         <DRAWEE></DRAWEE>
                                         <!--Optional:-->
                                         <DRAW_CITY2></DRAW_CITY2>
                                         <!--Optional:-->
                                         <DISCT_DAYS></DISCT_DAYS>
                                         <!--Optional:-->
                                         <DISCT_RATE></DISCT_RATE>
                                         <!--Optional:-->
                                         <ACCEPTED></ACCEPTED>
                                         <!--Optional:-->
                                         <BILLSTATUS></BILLSTATUS>
                                         <!--Optional:-->
                                         <PRTEST_IND></PRTEST_IND>
                                         <!--Optional:-->
                                         <BE_DEMAND></BE_DEMAND>
                                         <!--Optional:-->
                                         <OBJ_TYPE></OBJ_TYPE>
                                         <!--Optional:-->
                                         <REF_DOC></REF_DOC>
                                         <!--Optional:-->
                                         <REF_ORG_UN></REF_ORG_UN>
                                         <!--Optional:-->
                                         <REVERSAL_DOC></REVERSAL_DOC>
                                         <!--Optional:-->
                                         <SP_GL_TYPE></SP_GL_TYPE>
                                         <!--Optional:-->
                                         <NEG_POSTNG></NEG_POSTNG>
                                         <!--Optional:-->
                                         <REF_DOC_NO_LONG></REF_DOC_NO_LONG>
                                      </item>
                                   </T_CLOSE>
                                   <T_OPEN>
                                      <!--Zero or more repetitions:-->
                                      <item>
                                         <!--Optional:-->
                                         <COMP_CODE></COMP_CODE>
                                         <!--Optional:-->
                                         <VENDOR></VENDOR>
                                         <!--Optional:-->
                                         <SP_GL_IND></SP_GL_IND>
                                         <!--Optional:-->
                                         <CLEAR_DATE></CLEAR_DATE>
                                         <!--Optional:-->
                                         <CLR_DOC_NO></CLR_DOC_NO>
                                         <!--Optional:-->
                                         <ALLOC_NMBR></ALLOC_NMBR>
                                         <!--Optional:-->
                                         <FISC_YEAR></FISC_YEAR>
                                         <!--Optional:-->
                                         <DOC_NO></DOC_NO>
                                         <!--Optional:-->
                                         <ITEM_NUM></ITEM_NUM>
                                         <!--Optional:-->
                                         <PSTNG_DATE></PSTNG_DATE>
                                         <!--Optional:-->
                                         <DOC_DATE></DOC_DATE>
                                         <!--Optional:-->
                                         <ENTRY_DATE></ENTRY_DATE>
                                         <!--Optional:-->
                                         <CURRENCY></CURRENCY>
                                         <!--Optional:-->
                                         <LOC_CURRCY></LOC_CURRCY>
                                         <!--Optional:-->
                                         <REF_DOC_NO></REF_DOC_NO>
                                         <!--Optional:-->
                                         <DOC_TYPE></DOC_TYPE>
                                         <!--Optional:-->
                                         <FIS_PERIOD></FIS_PERIOD>
                                         <!--Optional:-->
                                         <POST_KEY></POST_KEY>
                                         <!--Optional:-->
                                         <DB_CR_IND></DB_CR_IND>
                                         <!--Optional:-->
                                         <BUS_AREA></BUS_AREA>
                                         <!--Optional:-->
                                         <TAX_CODE></TAX_CODE>
                                         <!--Optional:-->
                                         <LC_AMOUNT></LC_AMOUNT>
                                         <!--Optional:-->
                                         <AMT_DOCCUR></AMT_DOCCUR>
                                         <!--Optional:-->
                                         <LC_TAX></LC_TAX>
                                         <!--Optional:-->
                                         <TX_DOC_CUR></TX_DOC_CUR>
                                         <!--Optional:-->
                                         <ITEM_TEXT></ITEM_TEXT>
                                         <!--Optional:-->
                                         <BRANCH></BRANCH>
                                         <!--Optional:-->
                                         <BLINE_DATE></BLINE_DATE>
                                         <!--Optional:-->
                                         <PMNTTRMS></PMNTTRMS>
                                         <!--Optional:-->
                                         <DSCT_DAYS1></DSCT_DAYS1>
                                         <!--Optional:-->
                                         <DSCT_DAYS2></DSCT_DAYS2>
                                         <!--Optional:-->
                                         <NETTERMS></NETTERMS>
                                         <!--Optional:-->
                                         <DSCT_PCT1></DSCT_PCT1>
                                         <!--Optional:-->
                                         <DSCT_PCT2></DSCT_PCT2>
                                         <!--Optional:-->
                                         <DISC_BASE></DISC_BASE>
                                         <!--Optional:-->
                                         <DSC_AMT_LC></DSC_AMT_LC>
                                         <!--Optional:-->
                                         <DSC_AMT_DC></DSC_AMT_DC>
                                         <!--Optional:-->
                                         <PYMT_METH></PYMT_METH>
                                         <!--Optional:-->
                                         <PMNT_BLOCK></PMNT_BLOCK>
                                         <!--Optional:-->
                                         <FIXEDTERMS></FIXEDTERMS>
                                         <!--Optional:-->
                                         <INV_REF></INV_REF>
                                         <!--Optional:-->
                                         <INV_YEAR></INV_YEAR>
                                         <!--Optional:-->
                                         <INV_ITEM></INV_ITEM>
                                         <!--Optional:-->
                                         <DUNN_BLOCK></DUNN_BLOCK>
                                         <!--Optional:-->
                                         <DUNN_KEY></DUNN_KEY>
                                         <!--Optional:-->
                                         <LAST_DUNN></LAST_DUNN>
                                         <!--Optional:-->
                                         <DUNN_LEVEL></DUNN_LEVEL>
                                         <!--Optional:-->
                                         <DUNN_AREA></DUNN_AREA>
                                         <!--Optional:-->
                                         <W_TAX_CODE></W_TAX_CODE>
                                         <!--Optional:-->
                                         <W_TAX_BASE></W_TAX_BASE>
                                         <!--Optional:-->
                                         <WI_TAX_AMT></WI_TAX_AMT>
                                         <!--Optional:-->
                                         <DOC_STATUS></DOC_STATUS>
                                         <!--Optional:-->
                                         <NXT_DOCTYP></NXT_DOCTYP>
                                         <!--Optional:-->
                                         <VAT_REG_NO></VAT_REG_NO>
                                         <!--Optional:-->
                                         <EXEMPT_NO></EXEMPT_NO>
                                         <!--Optional:-->
                                         <W_TAX_EXPT></W_TAX_EXPT>
                                         <!--Optional:-->
                                         <REASON_CDE></REASON_CDE>
                                         <!--Optional:-->
                                         <PMTMTHSUPL></PMTMTHSUPL>
                                         <!--Optional:-->
                                         <REF_KEY_1></REF_KEY_1>
                                         <!--Optional:-->
                                         <REF_KEY_2></REF_KEY_2>
                                         <!--Optional:-->
                                         <T_CURRENCY></T_CURRENCY>
                                         <!--Optional:-->
                                         <AMOUNT></AMOUNT>
                                         <!--Optional:-->
                                         <NET_AMOUNT></NET_AMOUNT>
                                         <!--Optional:-->
                                         <NAME></NAME>
                                         <!--Optional:-->
                                         <NAME_2></NAME_2>
                                         <!--Optional:-->
                                         <NAME_3></NAME_3>
                                         <!--Optional:-->
                                         <NAME_4></NAME_4>
                                         <!--Optional:-->
                                         <POSTL_CODE></POSTL_CODE>
                                         <!--Optional:-->
                                         <CITY></CITY>
                                         <!--Optional:-->
                                         <COUNTRY></COUNTRY>
                                         <!--Optional:-->
                                         <STREET></STREET>
                                         <!--Optional:-->
                                         <PO_BOX></PO_BOX>
                                         <!--Optional:-->
                                         <POBX_PCD></POBX_PCD>
                                         <!--Optional:-->
                                         <POBK_CURAC></POBK_CURAC>
                                         <!--Optional:-->
                                         <BANK_ACCT></BANK_ACCT>
                                         <!--Optional:-->
                                         <BANK_KEY></BANK_KEY>
                                         <!--Optional:-->
                                         <BANK_CTRY></BANK_CTRY>
                                         <!--Optional:-->
                                         <TAX_NO_1></TAX_NO_1>
                                         <!--Optional:-->
                                         <TAX_NO_2></TAX_NO_2>
                                         <!--Optional:-->
                                         <TAX></TAX>
                                         <!--Optional:-->
                                         <EQUAL_TAX></EQUAL_TAX>
                                         <!--Optional:-->
                                         <REGION></REGION>
                                         <!--Optional:-->
                                         <CTRL_KEY></CTRL_KEY>
                                         <!--Optional:-->
                                         <INSTR_KEY></INSTR_KEY>
                                         <!--Optional:-->
                                         <PAYEE_CODE></PAYEE_CODE>
                                         <!--Optional:-->
                                         <LANGU></LANGU>
                                         <!--Optional:-->
                                         <BILL_LIFE></BILL_LIFE>
                                         <!--Optional:-->
                                         <BE_TAXCODE></BE_TAXCODE>
                                         <!--Optional:-->
                                         <BILLTAX_LC></BILLTAX_LC>
                                         <!--Optional:-->
                                         <BILLTAX_FC></BILLTAX_FC>
                                         <!--Optional:-->
                                         <LC_COL_CHG></LC_COL_CHG>
                                         <!--Optional:-->
                                         <COLL_CHARG></COLL_CHARG>
                                         <!--Optional:-->
                                         <CHGS_TX_CD></CHGS_TX_CD>
                                         <!--Optional:-->
                                         <ISSUE_DATE></ISSUE_DATE>
                                         <!--Optional:-->
                                         <USAGEDATE></USAGEDATE>
                                         <!--Optional:-->
                                         <BILL_USAGE></BILL_USAGE>
                                         <!--Optional:-->
                                         <DOMICILE></DOMICILE>
                                         <!--Optional:-->
                                         <DRAWER></DRAWER>
                                         <!--Optional:-->
                                         <CTRBNK_LOC></CTRBNK_LOC>
                                         <!--Optional:-->
                                         <DRAW_CITY1></DRAW_CITY1>
                                         <!--Optional:-->
                                         <DRAWEE></DRAWEE>
                                         <!--Optional:-->
                                         <DRAW_CITY2></DRAW_CITY2>
                                         <!--Optional:-->
                                         <DISCT_DAYS></DISCT_DAYS>
                                         <!--Optional:-->
                                         <DISCT_RATE></DISCT_RATE>
                                         <!--Optional:-->
                                         <ACCEPTED></ACCEPTED>
                                         <!--Optional:-->
                                         <BILLSTATUS></BILLSTATUS>
                                         <!--Optional:-->
                                         <PRTEST_IND></PRTEST_IND>
                                         <!--Optional:-->
                                         <BE_DEMAND></BE_DEMAND>
                                         <!--Optional:-->
                                         <OBJ_TYPE></OBJ_TYPE>
                                         <!--Optional:-->
                                         <REF_DOC></REF_DOC>
                                         <!--Optional:-->
                                         <REF_ORG_UN></REF_ORG_UN>
                                         <!--Optional:-->
                                         <REVERSAL_DOC></REVERSAL_DOC>
                                         <!--Optional:-->
                                         <SP_GL_TYPE></SP_GL_TYPE>
                                         <!--Optional:-->
                                         <NEG_POSTNG></NEG_POSTNG>
                                         <!--Optional:-->
                                         <REF_DOC_NO_LONG></REF_DOC_NO_LONG>
                                      </item>
                                   </T_OPEN>
                                </urn:ZFI_VEND_PAY_AGING_MAT>
                             </soapenv:Body>
                          </soapenv:Envelope>`;
                             var options = {
                                 url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDPAYMENT_MAT&interfaceNamespace=http://vendorportal_mat.com',
                                 headers: {
                                     'Content-Type': 'application/xml',
                                     'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                 },
                                 body: postData
                             }
                             request.post(options, function (error, response, body) {
                                 if (!error && response.statusCode == 200) {
                                     var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                     result2 = JSON.parse(result2);
                                     var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_VEND_PAY_AGING_MAT.Response'];
                                  
                                    res.send(resp);
                                    
                                   
                                 }
                             })
                           });
app.post('/vendcre_deb', (req, res) => {
                              //const uname = '6';
                              uname = req.body.username.toUpperCase();
                                const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                                <soapenv:Header/>
                                <soapenv:Body>
                                   <urn:ZFI_VEND_CREDIT_DEBIT_MAT>
                                      <!--You may enter the following 3 items in any order-->
                                      <VEND_ID>`+uname+`</VEND_ID>
                                      <T_CRE>
                                         <!--Zero or more repetitions:-->
                                         <item>
                                            <!--Optional:-->
                                            <KUNNR></KUNNR>
                                            <!--Optional:-->
                                            <MATNR></MATNR>
                                            <!--Optional:-->
                                            <WERKS></WERKS>
                                            <!--Optional:-->
                                            <MENGE></MENGE>
                                            <!--Optional:-->
                                            <MEINS></MEINS>
                                            <!--Optional:-->
                                            <BUKRS></BUKRS>
                                            <!--Optional:-->
                                            <BELNR></BELNR>
                                            <!--Optional:-->
                                            <GJAHR></GJAHR>
                                            <!--Optional:-->
                                            <BUZEI></BUZEI>
                                            <!--Optional:-->
                                            <AUGDT></AUGDT>
                                            <!--Optional:-->
                                            <KOART></KOART>
                                            <!--Optional:-->
                                            <DMBTR></DMBTR>
                                            <!--Optional:-->
                                            <BDIFF></BDIFF>
                                            <!--Optional:-->
                                            <XBILK></XBILK>
                                            <!--Optional:-->
                                            <LIFNR></LIFNR>
                                         </item>
                                      </T_CRE>
                                      <T_DEB>
                                         <!--Zero or more repetitions:-->
                                         <item>
                                            <!--Optional:-->
                                            <KUNNR></KUNNR>
                                            <!--Optional:-->
                                            <MATNR></MATNR>
                                            <!--Optional:-->
                                            <WERKS></WERKS>
                                            <!--Optional:-->
                                            <MENGE></MENGE>
                                            <!--Optional:-->
                                            <MEINS></MEINS>
                                            <!--Optional:-->
                                            <BUKRS></BUKRS>
                                            <!--Optional:-->
                                            <BELNR></BELNR>
                                            <!--Optional:-->
                                            <GJAHR></GJAHR>
                                            <!--Optional:-->
                                            <BUZEI></BUZEI>
                                            <!--Optional:-->
                                            <AUGDT></AUGDT>
                                            <!--Optional:-->
                                            <KOART></KOART>
                                            <!--Optional:-->
                                            <DMBTR></DMBTR>
                                            <!--Optional:-->
                                            <BDIFF></BDIFF>
                                            <!--Optional:-->
                                            <XBILK></XBILK>
                                            <!--Optional:-->
                                            <LIFNR></LIFNR>
                                         </item>
                                      </T_DEB>
                                   </urn:ZFI_VEND_CREDIT_DEBIT_MAT>
                                </soapenv:Body>
                             </soapenv:Envelope>`;
                                var options = {
                                    url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDCRE_DEB_MAT&interfaceNamespace=http://vendorportal_mat.com',
                                    headers: {
                                        'Content-Type': 'application/xml',
                                        'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                    },
                                    body: postData
                                }
                                request.post(options, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                        result2 = JSON.parse(result2);
                                        var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_VEND_CREDIT_DEBIT_MAT.Response'];
                                     
                                       res.send(resp);
                                       
                                      
                                    }
                                })
                              });
app.post('/vendinvoice', (req, res) => {
                           // const invo_no = '5105600761';
                           // const year = '2015';
                           //uname = req.body.username.toUpperCase();
                            invo_no = req.body.ir;
                            year = req.body.fyear;
                             const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                             <soapenv:Header/>
                             <soapenv:Body>
                                <urn:ZFI_VEND_INVOICE_PDF_MAT>
                                   <!--You may enter the following 3 items in any order-->
                                   <FISC_YR>`+year+`</FISC_YR>
                                   <INV_NO>`+invo_no+`</INV_NO>
                                   <RETURN>
                                      <!--Zero or more repetitions:-->
                                      <item>
                                         
                                      </item>
                                   </RETURN>
                                </urn:ZFI_VEND_INVOICE_PDF_MAT>
                             </soapenv:Body>
                          </soapenv:Envelope>`;
                             var options = {
                                 url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_VENDINVOICE_MAT&interfaceNamespace=http://vendorportal_mat.com',
                                 headers: {
                                     'Content-Type': 'application/xml', 
                                     'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                 },
                                 body: postData
                             }
                             request.post(options, function (error, response, body) {
                                 if (!error && response.statusCode == 200) {
                                     var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                     result2 = JSON.parse(result2);
                                     var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_VEND_INVOICE_PDF_MAT.Response'];                               
                                    res.send(resp);
                                    
                                   
                                 }
                             })
                           });
app.post('/emplogin', (req, res) => {
                              uname = req.body.username.toUpperCase();
                              pass = req.body.password.toUpperCase();
                           //  const uname = '5016';
                           //   const pass = '1016101610';
                              const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                              <soapenv:Header/>
                              <soapenv:Body>
                                 <urn:ZHR_EMP_LOGIN_MAT>
                                    <!--You may enter the following 2 items in any order-->
                                    <I_EMPID>`+uname+`</I_EMPID>
                                    <I_PASS>`+pass+`</I_PASS>
                                 </urn:ZHR_EMP_LOGIN_MAT>
                              </soapenv:Body>
                           </soapenv:Envelope>`;
                              var options = {
                                  url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMPLOGIN_MAT&interfaceNamespace=http://employee_portal.com',
                                  headers: {
                                      'Content-Type': 'application/xml',
                                      'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                  },
                                  body: postData
                              }
                              request.post(options, function (error, response, body) {
                                  if (!error && response.statusCode == 200) {
                                      var result1 = parser.xml2json(body, { compact: true, spaces: 4 });
                                      result1 = JSON.parse(result1);
                                      var resp = result1['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LOGIN_MAT.Response']['E_NAME'];
                                      res.send(resp);
                                      // res.send(result1);
                                  }
                              })
                          });
app.post('/empprofile', (req, res) => {
   
                            uname = req.body.username.toUpperCase();
                           // const uname = '5016';
                          // const pass = '1234567890';
                           const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                           <soapenv:Header/>
                           <soapenv:Body>
                              <urn:ZHR_EMP_PROFILE_MAT>
                                 <!--You may enter the following 2 items in any order-->
                                 <I_EMPID>`+uname+`</I_EMPID>
                                 <COMP_DATA>
                                    <!--Zero or more repetitions:-->
                                    <item>
                                       
                                    </item>
                                 </COMP_DATA>
                              </urn:ZHR_EMP_PROFILE_MAT>
                           </soapenv:Body>
                        </soapenv:Envelope>`;
                           var options = {
                               url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMPPROFILE_MAT&interfaceNamespace=http://employee_portal.com',
                               headers: {
                                   'Content-Type': 'application/xml',
                                   'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                               },
                               body: postData
                           }
                           request.post(options, function (error, response, body) {
                               if (!error && response.statusCode == 200) {
                                   var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                   result2 = JSON.parse(result2);
                                   var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_PROFILE_MAT.Response']['EMP_DATA'];
                                   res.send(resp);
                                  // res.send(result2);
                               }
                           })
                         });
app.post('/empupdprofile', (req, res) => {
                         
                        //   uname = req.body.username;
                           name1 = req.body.Name1;
                           name2 = req.body.Name2;
                           street = req.body.Street;
                           city = req.body.City;
                           country = req.body.Country;
                           Pcode = req.body.Pcode;                         
                           phone = req.body.Phone_number;
                           dob = req.body.District;
     
                            const uname = '5016';
                           // const name1 = 'danerys';
                           // const name2 = 'stormborn';
                           // const street = 'redkeep';
                           // const city = 'winterfell';
                           // const dob = '1999-12-10'
                         
                           // const country = 'got';
                           // const Pcode = '626118';
                           // const phone = '1122334455';
                        
                           // const pass = '1234567890';
                            const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                            <soapenv:Header/>
                            <soapenv:Body>
                               <urn:ZHR_EMP_PROUPDATE_MAT>
                                  <!--You may enter the following 9 items in any order-->
                                  <I_BIRTHDATE>`+dob+`</I_BIRTHDATE>
                                  <I_CITY>`+city+`</I_CITY>
                                  <I_COUNTRY>`+country+`</I_COUNTRY>
                                  <I_EMP_ID>`+uname+`</I_EMP_ID>
                                  <I_MOBILE>`+phone+`</I_MOBILE>
                                  <I_NAME1>`+name1+`</I_NAME1>
                                  <I_NAME2>`+name2+`</I_NAME2>
                                  <I_PSCODE>`+Pcode+`</I_PSCODE>
                                  <I_STREET>`+street+`</I_STREET>
                               </urn:ZHR_EMP_PROUPDATE_MAT>
                            </soapenv:Body>
                         </soapenv:Envelope>`;
                            var options = {
                                url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMPUPDPROFILE_MAT&interfaceNamespace=http://employee_portal.com',
                                headers: {
                                    'Content-Type': 'application/xml',
                                    'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                },
                                body: postData
                            }
                            request.post(options, function (error, response, body) { 
                                if (!error && response.statusCode == 200) {
                                    var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                    result2 = JSON.parse(result2);
                                    var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_PROUPDATE_MAT.Response']['E_RETURN']['TYPE'];
                                    res.send(resp);
                                   // res.send(result2);
                                }
                            })
                          });
app.post('/empleavereq', (req, res) => {

                              //  uname = req.body.username.toUpperCase();
                               uname = req.body.username;
                              // const start = '2023-12-10';
                              // const end = '2023-12-16';
                              // const type = '1001';
                              start = req.body.start;
                              end = req.body.end;
                              type = req.body.type;
                              starttime = req.body.stime;
                              endtime = req.body.etime;
                              const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                              <soapenv:Header/>
                              <soapenv:Body>
                                 <urn:ZHR_EMP_LEAVE_REQUEST_MAT>
                                    <!--You may enter the following 7 items in any order-->
                                    <I_EMPID>${uname}</I_EMPID>
                                    <I_END_DATE>`+end+`</I_END_DATE>
                                    <!--Optional:-->
                                    <I_END_TIME></I_END_TIME>
                                    <I_LEAVE_TYPE>`+type+`</I_LEAVE_TYPE>
                                    <I_START_DATE>`+start+`</I_START_DATE>
                                    <!--Optional:-->
                                    <I_START_TIME></I_START_TIME>
                                    <!--Optional:-->
                                    <I_TOTAL_HOURS></I_TOTAL_HOURS>
                                 </urn:ZHR_EMP_LEAVE_REQUEST_MAT>
                              </soapenv:Body>
                           </soapenv:Envelope>`;
                              var options = {
                                  url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMPLEAVE_REQ_MAT&interfaceNamespace=http://employee_portal.com',
                                  headers: {
                                      'Content-Type': 'application/xml',
                                      'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                  },
                                  body: postData
                              }
                              request.post(options, function (error, response, body) {
                                  if (!error && response.statusCode == 200) {
                                      var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                      result2 = JSON.parse(result2);
                                      var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_REQUEST_MAT.Response']['E_STATUS'];
                                   
                                     res.send(resp);
                                     
                                    
                                  }
                              })
                            });
app.post('/empleavedet', (req, res) => {
                              const uname = '5016';
                              //  uname = req.body.username.toUpperCase();
                               const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                               <soapenv:Header/>
                               <soapenv:Body>
                                  <urn:ZHR_EMP_LEAVE_DETAILS_MAT>
                                     <!--You may enter the following 3 items in any order-->
                                     <I_EMPID>`+uname+`</I_EMPID>
                                     <T_LEAVE>
                                        <!--Zero or more repetitions:-->
                                        <item>
                                       
                                        </item>
                                     </T_LEAVE>
                                     <T_REMAINING>
                                        <!--Zero or more repetitions:-->
                                        <item>
                                        
                                        </item>
                                     </T_REMAINING>
                                  </urn:ZHR_EMP_LEAVE_DETAILS_MAT>
                               </soapenv:Body>
                            </soapenv:Envelope>`;
                               var options = {
                                   url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMPLEAVE_DET_MAT&interfaceNamespace=http://employee_portal.com',
                                   headers: {
                                       'Content-Type': 'application/xml',
                                       'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                   },
                                   body: postData
                               }
                               request.post(options, function (error, response, body) {
                                   if (!error && response.statusCode == 200) {
                                       var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                       result2 = JSON.parse(result2);
                                       var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZHR_EMP_LEAVE_DETAILS_MAT.Response']['T_LEAVE'];
                                    
                                      res.send(resp);
                                      
                                     
                                   }
                               })
                             });
app.post('/emppayrep', (req, res) => {
                              //  const uname = '5016';
                              //  const seq = '1';
                               uname = req.body.username.toUpperCase();
                               
                               seq = req.body.seqno;
                               const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                               <soapenv:Header/>
                               <soapenv:Body>
                                  <urn:ZFI_EMP_PAYSLIP_REPORT_MAT>
                                     <!--You may enter the following 4 items in any order-->
                                     <I_EMPID>`+uname+`</I_EMPID>
                                     <I_SEQUENCE_NO>`+seq+`</I_SEQUENCE_NO>
                                     <T_PAYSLIP_DATAOUT>
                                        <!--Zero or more repetitions:-->
                                        <item>
                                           <!--Optional:-->
                                           <FORMAT_COL></FORMAT_COL>
                                           <!--Optional:-->
                                           <TEXT_COL></TEXT_COL>
                                        </item>
                                     </T_PAYSLIP_DATAOUT>
                                     <T_PAYSLIP_HTMLOUT>
                                        <!--Zero or more repetitions:-->
                                        <item>
                                           <!--Optional:-->
                                           <LINE></LINE>
                                        </item>
                                     </T_PAYSLIP_HTMLOUT>
                                  </urn:ZFI_EMP_PAYSLIP_REPORT_MAT>
                               </soapenv:Body>
                            </soapenv:Envelope>`;
                               var options = {
                                   url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMP_PAYREP_MAT&interfaceNamespace=http://employee_portal.com',
                                   headers: {
                                       'Content-Type': 'application/xml',
                                       'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                   },
                                   body: postData
                               }
                               request.post(options, function (error, response, body) {
                                   if (!error && response.statusCode == 200) {
                                       var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                       result2 = JSON.parse(result2);
                                       var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_PAYSLIP_REPORT_MAT.Response'];
                                    
                                      res.send(resp);
                                      
                                     
                                   }
                               })
                             });
app.post('/emppaydet', (req, res) => {
                              
                              // const uname = '5016';
                              uname = req.body.username.toUpperCase();
                                const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                                <soapenv:Header/>
                                <soapenv:Body>
                                   <urn:ZFI_EMP_PAYSLIP_DETAILS_MAT>
                                      <!--You may enter the following 2 items in any order-->
                                      <I_EMPID>`+uname+`</I_EMPID>
                                      <!--Optional:-->
                                      <T_PAYSLIP>
                                         <!--Zero or more repetitions:-->
                                         <item>
                                            
                                         </item>
                                      </T_PAYSLIP>
                                   </urn:ZFI_EMP_PAYSLIP_DETAILS_MAT>
                                </soapenv:Body>
                             </soapenv:Envelope>`;
                                var options = {
                                    url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMP_PAYDET_MAT&interfaceNamespace=http://employee_portal.com',
                                    headers: {
                                        'Content-Type': 'application/xml',
                                        'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                    },
                                    body: postData
                                }
                                request.post(options, function (error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                        result2 = JSON.parse(result2);
                                        var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_PAYSLIP_DETAILS_MAT.Response']['T_PAYSLIP'];
                                     
                                       res.send(resp);
                                       
                                      
                                    }
                                })
                              });
app.post('/empsettle', (req, res) => {
                                 // const uname = '5016';
                                 uname = req.body.username.toUpperCase();
                                 reqtype = req.body.password.toUpperCase();
                                 

                                   const postData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                                   <soapenv:Header/>
                                   <soapenv:Body>
                                      <urn:ZFI_EMP_FINAL_SETTLE_MAT>
                                         <!--You may enter the following 5 items in any order-->
                                         <I_EID>`+uname+`</I_EID>
                                         <REQ_TYPE>`+reqtype+`</REQ_TYPE>
                                         <BASICPAY>
                                            <!--Zero or more repetitions:-->
                                            <item>
                                         
                                            </item>
                                         </BASICPAY>
                                         <COMPANYDETAILS>
                                            <!--Zero or more repetitions:-->
                                            <item>
                                               
                                            </item>
                                         </COMPANYDETAILS>
                                         <WAGETYPES>
                                            <!--Zero or more repetitions:-->
                                            <item>
                                             
                                            </item>
                                         </WAGETYPES>
                                      </urn:ZFI_EMP_FINAL_SETTLE_MAT>
                                   </soapenv:Body>
                                </soapenv:Envelope>`;
                                   var options = {
                                       url: 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_MAT_PORTAL&receiverParty=&receiverService=&interface=SI_EMP_SETTLE_MAT&interfaceNamespace=http://employee_portal.com',
                                       headers: {
                                           'Content-Type': 'application/xml',
                                           'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
                                       },
                                       body: postData
                                   }
                                   request.post(options, function (error, response, body) {
                                       if (!error && response.statusCode == 200) {
                                           var result2 = parser.xml2json(body, { compact: true, spaces: 4 });
                                           result2 = JSON.parse(result2);
                                           var resp = result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFI_EMP_FINAL_SETTLE_MAT.Response'];
                                        
                                          res.send(resp);
                                          
                                         
                                       }
                                   })
                                 });
   

app.listen(3000, () => {
    console.log("server is running on port 3000");
})