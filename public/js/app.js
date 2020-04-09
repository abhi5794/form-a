
const para1 = document.getElementById('p1')
//to fetch the data : GET/data/fetch
async function getJson(url){
    try{
        const response = await axios.get(url)
        return response.data
    }catch(e){
        console.log(e)
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
            data: myTable.getJson()
        })
        para1.textContent = ''
        document.getElementById('pdf').style.visibility='visible'
    }catch(e){
        console.log(e)
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
async function myTablefunction(){
    myTable = jexcel(document.getElementById('spreadsheet'),{//myTable needs to be global
        data: await getJson('/data/fetch'),
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
            { title: 'Customs Station of import', type:'text', width:150 }, //{ title:'Date', width:100, type:'calendar', options: { format:'DD/MM/YYYY' } },
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

myTablefunction() //async function is defined as axios is async

