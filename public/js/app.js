const para1 = document.getElementById('p1')
// async function getJson(url){
//     try{
//         const response = await axios.get(url)
//         return response.data
//     }catch(e){
//         alert(e)
//     }
// }

async function datePicker(){
    dateInputString = prompt('Enter the date, ex: 2012.12').replace('.',',')
    if(dateInputString.length!==7 || dateInputString.length===0){
        alert('Enter a valid date')
        throw new Error('Enter a valid date')

    }
    else{// when its a valid date
        const url = '/data/fetch/'+ dateInputString
        let dateParsed = dateInputString.split(',').map((x)=>parseInt(x))
        let period = new Date(dateParsed[0],dateParsed[1])
        const response = await axios.get(url)
        if(response.data==='no data found'){
            alert('No data found, entry will be created')
            axios({
                method:'post',
                url:'/data/save/new',
                data: {"dataObject":[
                    { "UnitRefDate": 'Starter kit',"BillofEntryNo": 1, "CustomsStation": 2, "Code": 3,
                 "NameAddress":4, "Others":5, "DetailsB17":6,"Description":7, "InvoiceNo":8, "ProcCert":9,
                  "UnitWeight":10, "ValueReceipt":11, "Duty":12, "Registration":13, "DateReceipt":14, "DateRemoval":15,
                "QuantityCleared":16, "ValueRemoval":17, "DutyInvolved":18,"Remarks":19,"PuposeofRemoval":20,"DateRemovals":21,
                "QuantityRemoval":22,"ValueRemovals":23,"DutyRemovals":24,"DetailsDemovals":25,"PurposeReturns":26,"DateReturns":27,
                "QuantityReturns":28,"ValueReturns":29,"DutyReturns":30,"DetailsReturns":31,"BalanceQuantity":32,"BalanceValue":33,"EndRemarks":34}
                ],
                "periodString":dateInputString,
                "period": period
                }
            })
            location.replace('/data/fetch/link/'+dateInputString)
        }
        else{
            dataFetched = response.data
            myTablefunction(dataFetched) //create the table
        }
    }
}

//to post the data,SAVE button : POST/save
async function readData(){
    para1.textContent = 'Loading...'
    document.getElementById('pdf').style.visibility='hidden'
    try{
        axios({
            method:'post',
            url:'/data/save',
            data: myTable.getJson() //fetched the current table data
        })
        para1.textContent = ''
        document.getElementById('pdf').style.visibility='visible'
    }catch(e){
        alert(e)
    }
}

//PDF button, go to PDF page
function goToPDF(){
    location.replace('/data/pdf')
}

//LOGOUT button : POST/users/logout
async function Logout(){
    try{
        axios({
            method:'post',
            url:'/users/logout'
        })
        location.replace('/users/login') //after logout go to login page
    }catch(e){
        console.log(e)
    }
}

//generate the PDF
async function myTablefunction(inputData){ //async function because axios is async
    myTable = jexcel(document.getElementById('spreadsheet'),{//myTable needs to be global
        data: inputData,
        search:true,
        tableWidth:"1300px",
        pagination:20,
        tableOverflow:true,
        rowResize:true,
        defaultColAlign:'left',
        allowInsertColumn:false,
        allowManualInsertColumn:false,
        allowDeleteColumn:false,
        wordWrap:true,
        allowRenameColumn:false,
        columns: [
            { title:'Unit Ref. & date', type:'text', width:120, wordWrap: true},
            { title:'Bill of Entry No.', type:'text', width:120, wordWrap: true},
            { title: 'Customs Station of import', type:'text', width:150 },
            { title: 'Code warehouse', type:'text', width:120 },
            { title: 'EoU Name Addr', type:'text', width:100 },
            { title: 'Others', type:'text', width:100 },
            { title: 'B-17 Bond Amt', type:'text', width:100 },
            { title: 'Description goods', type:'text', width:100 },
            { title: 'Invoice No.', type:'text', width:100 },
            { title: 'Proc Cert No./date', type:'text', width:100 },
            { title: 'Unit,weight & quantity', type:'text', width:100 },
            { title: 'Value', type:'text', width:100 },
            { title: 'Duty assessed', type:'text', width:100 },
            { title: 'Reg. no. means of transport', type:'text', width:100 },
            { title: 'Date & time of receipt', type:'text', width:100 },
            { title: 'Date and time of removal', type:'text', width:100 },
            { title: 'Quantity cleared', type:'text', width:100 },
            { title: 'Value', type:'text', width:100 },
            { title: 'Duty involved', type:'text', width:100 },
            { title: ' ', type:'text', width:100 },
            { title: 'Purpose of removal', type:'text', width:100 },
            { title: 'Date & Time', type:'text', width:100 },
            { title: 'Quantity', type:'text', width:100 },
            { title: 'Value', type:'text', width:100 },
            { title: 'Duty', type:'text', width:100 },
            { title: 'Details of document', type:'text', width:100 },
            { title: 'Purpose of return', type:'text', width:100 },
            { title: 'Date & time', type:'text', width:100 },
            { title: 'Quantity', type:'text', width:100 },
            { title: 'Value', type:'text', width:100 },
            { title: 'Duty involved', type:'text', width:100 },
            { title: 'Details', type:'text', width:100 },
            { title: 'Quantity', type:'text', width:100 },
            { title: 'Value', type:'text', width:100 },
            { title: ' ', type:'text', width:100 }
        ],
        nestedHeaders:[
            [
                { title:' ',colspan:2 }, { title:'Receipts', colspan:12 }, {title:'Removal of processing', colspan: 4},{title:'Remarks', colspan:1},
                {title:'Other removals', colspan:6}, {title:'Returns to unit', colspan:6}, {title:'Balance in stock',colspan:2},{title:'Remarks',colspan:1}
            ]
                
        ]
    })
}