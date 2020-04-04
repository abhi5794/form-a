

function getJson(url){
    return $.ajax({
        type:'GET',
        url,
        async:false,
        global:false,
        datatype:'json',
        success: (r)=>{
            return r
        }
    }).responseText
}

//to fetch the data
const data = JSON.parse(getJson('/data'))

const myTable = jexcel(document.getElementById('spreadsheet'),{
        data,
        search:true,
        tableOverflow: true,
        //pagination:20,
        rowResize:true,
        lazyLoading:true,
        defaultColAlign:'left',
        allowInsertColumn:false,
        allowManualInsertColumn:false,
        allowDeleteColumn:false,
        wordWrap:true,
        allowRenameColumn:false,
        columns: [
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

//to post the data
function readData(){
    $.ajax({
        type:"POST",
        url:"/save",
        data: JSON.stringify(myTable.getJson()),
        success : ()=>{
            console.log('success')
        },
        contentType:"application/json"
    })
    location.replace('/pdf')
}

function Logout(){
    $.ajax({
        type:"POST",
        url:"/users/logout",
        success : ()=>{
            console.log('success')
        },
    })
    location.replace('/users/login')
}