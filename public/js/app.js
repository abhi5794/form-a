loader = document.getElementsByClassName('loader')
let dateUrl = document.currentScript.getAttribute('url')

const save = document.getElementById('save')
if(save){
    save.onclick = ()=>{saveData()}
    async function saveData(){
        loader[0].className = 'loader'
        try{
            await axios({
                method:'patch',
                url:'/data/save/'+numID,
                data: myTable.getJson()
            })
            loader[0].className = 'loader hidden'
        }catch(e){
            console.log(e)
        }
    }
}

const pdf = document.getElementById('pdf')
pdf.onclick = ()=>{goToPDF()}

function goToPDF(){
    location.replace('/data/pdf')
}


const jexcel = require('jexcel')
require('./vendor.css')

async function getJson(url){
    try{
        const response = await axios.get(url)
        numID = response.data._id
        loader[0].className = 'loader hidden'
        return response.data.dataObject
    }catch(e){
        console.log(e)
    }
}

async function myTablefunction(){
    myTable = jexcel(document.getElementById('spreadsheet'),{
    data: await getJson(dateUrl),
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

myTablefunction()

