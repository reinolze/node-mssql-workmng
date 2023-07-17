 var OrderSeq = new URLSearchParams(location.search).get('Doc')
 var WorkerSeq = new URLSearchParams(location.search).get('Worker')

 if (WorkerSeq == null){ WorkerSeq = 0 } 
//  console.log(OrderSeq);
//  console.log(WorkerSeq);
// //console.log(`http://localhost:3000/WorkerChk?Doc=${OrderSeq}&Worker=${WorkerSeq}`);

// var OrderMst_4WorkerChk = new getOrderMst_4WorkerChk();
function getOrderMst_4WorkerChk() {       
    fetch(`http://localhost:3000/WorkerChk?Doc=${OrderSeq}&Worker=${WorkerSeq}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            try {
                
                chkMyStat(data[0].ChkStatus);
                document.getElementById(`OrderName`).innerText = data[0].OrderName;
                document.getElementById(`OrderDate`).innerText = getMyDate(data[0].OrderDate);
                document.getElementById(`OrderLocation`).innerText = data[0].OrderLocation;
                document.getElementById(`OrderComment`).innerText = data[0].OrderComment;
                
                const OrderView = document.getElementById("OrderView")
                //OrderView.setAttribute('onclick',`location.href="./OrderView.html?Doc=${OrderSeq}"`)
                OrderView.setAttribute('href',`./OrderView.html?Doc=${OrderSeq}`)

                document.getElementById(`OrderComment`).innerText = data[0].OrderComment;
                document.getElementById(`workName`).innerText = ' ' + data[0].OrderManName;
            } catch (error) {
                console.log(error);
            }
        });
    }
    
function getOrderMst_4OrderView() {       
    fetch(`http://localhost:3000/WorkerChk?Doc=${OrderSeq}&Worker=${WorkerSeq}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            try {
                
                document.getElementById(`OrderName`).innerText = data[0].OrderName;
                document.getElementById(`OrderDate`).innerText = getMyDate(data[0].OrderDate);
                document.getElementById(`OrderLocation`).innerText = data[0].OrderLocation;
                document.getElementById(`OrderComment`).innerText = data[0].OrderComment;
                
                //const OrderView = document.getElementById("OrderView")
                //OrderView.setAttribute('onclick',`location.href="./OrderView.html?Doc=${OrderSeq}"`)
                //OrderView.setAttribute('href',`./OrderView.html?Doc=${OrderSeq}`)

                document.getElementById(`OrderComment`).innerText = data[0].OrderComment;
                //document.getElementById(`workName`).innerText = ' ' + data[0].OrderManName;
            } catch (error) {
                console.log(error);
            }
        });
    }

function getOrderRisk_4OrderView() {       
    fetch(`http://localhost:3000/OrderView/Risk/${OrderSeq}`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            //console.log(data.length);
             try {
                const box = document.getElementById("risk");                
                    for(var i=0; i<data.length; i++ ){
                        //console.log(i,data[i].ChkDiv);                        
                        const newtr = document.createElement('tr');
                         newtr.innerHTML = "<td width='10%' align='center' vertical-align='middle'><input type='checkbox' disabled></td><td width='20%' align='center' vertical-align='middle'></td><td width='70%' align='left' vertical-align='middle' style='font-size: 12px;'></td><td style='display: none;'>0</td>";
                        //newtr.innerHTML = "<td width='10%' align='center' vertical-align='middle'><input type='checkbox' disabled></td><td width='20%' align='center' vertical-align='middle'></td><td width='70%' align='left' vertical-align='middle'></td><td>0</td>";

                        box.appendChild(newtr);
                        //console.log(newtr.childNodes[1],data[i].ChkDiv);                        
                        if(data[i].Chked==true){                        
                            newtr.childNodes[0].childNodes[0].checked=true;
                            newtr.style.backgroundColor='#81DAF5'
                        } else {
                            newtr.childNodes[0].childNodes[0].checked=false;
                            newtr.style.backgroundColor='white'
                        }                        
                        newtr.childNodes[1].innerText=data[i].ChkDiv;
                        newtr.childNodes[2].innerText=data[i].Contant;
                        newtr.childNodes[3].innerText=data[i].OrderRiskSeq;
                    }
             } catch (error) {
                 console.log(error);
             }
        });
    }

function getOrderCar_4OrderView() {       
    fetch(`http://localhost:3000/OrderView/Car/${OrderSeq}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            // console.log(data.length);
            document.getElementById("OrderCar").innerText='■ 작업 투입 차량(' + data.length + '대)'
            
                try {
                const box = document.getElementById("Car");                
                    for(var i=0; i<data.length; i++ ){
                        const newtr = document.createElement('tr');
                        newtr.innerHTML = "<td width='100%' align='center' vertical-align='middle'></td>";

                        box.appendChild(newtr);
                        //console.log(newtr.childNodes[0],data[i].carName);                        
                      
                         newtr.childNodes[0].innerText=data[i].carName;
                    }
                } catch (error) {
                    console.log(error);
                }
        });
    } 
    
function getOrderMan_4OrderView() {       
    fetch(`http://localhost:3000/OrderView/Man/${OrderSeq}`)
        .then((response) => response.json())
        .then((data) => {
             //console.log(data);
            // console.log(data.length);
            document.getElementById("OrderMan").innerText='■ 작업 투입 인원(' + data.length + '명)'
            
                try {
                const box = document.getElementById("Man");                
                    for(var i=0; i<data.length; i++ ){
                        const newtr = document.createElement('tr');
                        newtr.innerHTML = "<td width='40%' align='center' vertical-align='middle'></td><td width='60%' align='center' vertical-align='middle'></td>";

                        box.appendChild(newtr);
                        // console.log(newtr.childNodes[0],data[i].carName);                        
                        
                        newtr.childNodes[0].innerText=data[i].ManName;
                        if (data[i].OrderManSign == null){
                            newtr.childNodes[1].innerText="";
                            newtr.style.backgroundColor='white'
                        } else {
                            newtr.childNodes[1].innerText=getMyDate2(data[i].OrderManSign);
                            newtr.style.backgroundColor='#81DAF5';
                        }
                        
                    }
                } catch (error) {
                    console.log(error);
                }
        });
    }  
    
    function getOrderRiskComm_4OrderView() {    
        
        const Comm = document.getElementById("comment");


        for (var i=Comm.childElementCount; i >= 2; i--){
    
            Comm.childNodes[i].remove();
        }
        fetch(`http://localhost:3000/OrderView/Comm/${OrderSeq}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // console.log(data.length);
                document.getElementById("RiskComm").innerText='■ 근로자 참여 위험성 평가(' + data.length + '건)'
                
                    try {
                    const box = document.getElementById("comment");                
                        for(var i=0; i<data.length; i++ ){
                            const newtr = document.createElement('tr');
                            //  newtr.innerHTML = "<td width='20%' align='center' vertical-align='middle'></td><td width='35%' align='left' vertical-align='middle'><input type='text' disabled></td><td width='35%' align='left' vertical-align='middle'><input type='text' disabled></td><td width='10%' align='center' vertical-align='middle'><input type='checkbox' disabled></td>";
                             newtr.innerHTML = "<td width='20%' align='center' vertical-align='middle' style='font-size: small;'></td><td width='35%' align='left' vertical-align='middle' style='font-size: small;'></td><td width='35%' align='left' vertical-align='middle' style='font-size: small;'></td><td width='10%' align='center' vertical-align='middle'><input type='checkbox' disabled></td>";
    
                            box.appendChild(newtr);
                            console.log(newtr.childNodes[1].childNodes[0]);                        
                            
                             newtr.childNodes[0].innerText=data[i].ManName;
                            //  newtr.childNodes[1].childNodes[0].value=data[i].Comment;
                            //  newtr.childNodes[2].childNodes[0].value=data[i].Solution;

                             newtr.childNodes[1].innerText=data[i].Comment;
                             newtr.childNodes[2].innerText=data[i].Solution;

                             if(data[i].isStop==true){                        
                                newtr.childNodes[3].childNodes[0].checked=true;
                                newtr.style.backgroundColor='lightpink'
                            } else {
                                newtr.childNodes[3].childNodes[0].checked=false;
                                newtr.style.backgroundColor='white'
                            }
                    //         if (data[i].OrderManSign == null){
                    //             newtr.childNodes[1].innerText="";
                    //             newtr.style.backgroundColor='white'
                    //         } else {
                    //             newtr.childNodes[1].innerText=getMyDate2(data[i].OrderManSign);
                    //             newtr.style.backgroundColor='#81DAF5';
                    //         }
                            
                        }
                    } catch (error) {
                        console.log(error);
                    }
            });
        }   

const add_textbox = () => {
    const box = document.getElementById("comment");
    const newtr = document.createElement('tr');
      
    newtr.innerHTML = "<td width='10%' align='center' vertical-align='middle'><input type='button' value=' - ' class='buttonM' onclick='remove(this)'></td><td width='40%' align='center' vertical-align='middle'><input type='text' onchange='Update_Comm(this)'></td><td width='40%' align='center' vertical-align='middle'><input type='text' onchange='Update_Comm(this)'></td><td width='10%' align='center' vertical-align='middle'><input type='checkbox' onchange='Update_Comm(this)'></td><td style='display: none;'><input type='text'>0</td>";
  
    box.appendChild(newtr);
}

 const Get_WorkerComm = () => {
    RemoveAllComm();

    const Comm = document.getElementById("comment");

    fetch(`http://localhost:3000/WorkerChk/Comm/${OrderSeq}/${WorkerSeq}`)
        .then((response) => response.json())
        .then((data) => {
            
            try {
                for (var i = 0; i <= Object.keys(data).length -1; i++){
                    add_textbox();

                    Comm.childNodes[i + 2].childNodes[1].childNodes[0].value=data[i].Comment;
                    Comm.childNodes[i + 2].childNodes[2].childNodes[0].value=data[i].Solution;

                    if(data[i].isStop==true){                        
                        Comm.childNodes[i + 2].childNodes[3].childNodes[0].checked=true;
                    } else {
                        Comm.childNodes[i + 2].childNodes[3].childNodes[0].checked=false;
                    }
                    chkStop(Comm.childNodes[i + 2].childNodes[3].childNodes[0]);
                   
                    Comm.childNodes[i + 2].childNodes[4].innerText=data[i].OrderRiskCommSeq;
                }
            } catch (error) {
                console.log(error);
            }
        });



 }
 const chkStop = (obj) => {


    if(obj.checked==true){
        obj.parentNode.parentNode.style.backgroundColor='lightpink'
        obj.parentNode.parentNode.childNodes[0].childNodes[0].style.backgroundColor='lightpink'
        obj.parentNode.parentNode.childNodes[1].childNodes[0].style.backgroundColor='lightpink'
        obj.parentNode.parentNode.childNodes[2].childNodes[0].style.backgroundColor='lightpink'
    } else {
        obj.parentNode.parentNode.style.backgroundColor='white'
        obj.parentNode.parentNode.childNodes[0].childNodes[0].style.backgroundColor='white'
        obj.parentNode.parentNode.childNodes[1].childNodes[0].style.backgroundColor='white'
        obj.parentNode.parentNode.childNodes[2].childNodes[0].style.backgroundColor='white'
    }

}

const RemoveAllComm = () =>{
    const Comm = document.getElementById("comment");


    for (var i=Comm.childElementCount; i >= 2; i--){

        Comm.childNodes[i].remove();
    }
}

const remove = (obj) => {
    //console.log(obj.parentNode.parentNode)
    //obj.parentNode.parentNode.innerHTML="" //내용을 지우니까...remove가 안됨;;
    console.log(obj.parentNode.parentNode.childNodes[4].innerText)
    
     if(obj.parentNode.parentNode.childNodes[4].innerText > 0){
        var answer = confirm('DB에 저장되어있는 내용입니다.\n삭제 할까요?')
        if (answer) {
            var OrderRiskCommSeq = parseInt(obj.parentNode.parentNode.childNodes[4].innerText);
            var DelMan = parseInt(WorkerSeq);

            var strQuery={OrderRiskCommSeq,DelMan,}
            var strJson = JSON.stringify(strQuery);

            fetch(`http://localhost:3000/WorkerChk/Comm/Delete`,{
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method: "POST",
                body: strJson
            })
            .then((res) => res.text())
            obj.parentNode.parentNode.remove();
        } 

        
     } else {
        obj.parentNode.parentNode.remove();
     }
    
    Get_WorkerComm();
}



const get_OrderNo = () =>{
    var DocNumber = new URLSearchParams(location.search).get('Doc')
    console.log(DocNumber);

    document.getElementById('orderNo').innerText='■ 작업지시서(OrderNo : ' + DocNumber + ')';

}
const Update_Comm = (obj) => {

    try{
        const CommRow = obj.parentNode.parentNode;

        var OrderRiskCommSeq = parseInt(CommRow.childNodes[4].innerText);
        var OrderNo = parseInt(OrderSeq);
        var CommMan = parseInt(WorkerSeq);
        var Comment = CommRow.childNodes[1].childNodes[0].value;
        var Solution = CommRow.childNodes[2].childNodes[0].value;
        var isStop=0
        
        if (CommRow.childNodes[3].childNodes[0].checked==true) {
            isStop= -1;
        } else {
            isStop= 0;
        }; 
        //chkStop(CommRow.childNodes[3].childNodes[0]);
           
        var strQuery={OrderRiskCommSeq,OrderNo,CommMan,Comment,Solution,isStop}
        var strJson = JSON.stringify(strQuery);
    
        console.log(strJson);
        fetch(`http://localhost:3000/WorkerChk/Comm/Update`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: strJson
        })    
    } catch (error) {
        console.log(error);
    }


    Get_WorkerComm();
}


const get_DocNumber = () =>{
    var DocNumber = new URLSearchParams(location.search).get('Doc')

    document.getElementById('orderNo').value='작업지시서(' + DocNumber + ') >>';

}

const chk_Worker =() =>{
    var WorkerNumber = new URLSearchParams(location.search).get('Worker')

    document.getElementById('workName').innerText='작업자 : ' + WorkerNumber;
}


function lPad(value){
    if (value >= 10){
        return value;
    }
    return `0${value}`;
}

function getToday(){
    const today = new Date;    
    return today.getFullYear() + '-'+ lPad(today.getMonth() + 1) + '-'+ lPad(today.getDate()) + ' ' + lPad(today.getHours()) + ':' + lPad(today.getMinutes()) + ':' + lPad(today.getSeconds()); 
}

function getMyDate(strdate){
    let yyyy = strdate.substring(0,4);
    let mm = strdate.substring(5,7);
    let dd = strdate.substring(8,10);

    let strNewDate = new Date(yyyy,mm,dd)

    return strNewDate.getFullYear() + '-'+ lPad(strNewDate.getMonth()) + '-'+ lPad(strNewDate.getDate());
}  
function getMyDate2(strdate){   
    let yyyy = strdate.substring(0,4);
    let mm = strdate.substring(5,7);
    let dd = strdate.substring(8,10);
    let hour  = strdate.substring(11,13);
    let minute  = strdate.substring(14,16);
    let second  = strdate.substring(17,19);

    let strNewDate = new Date(yyyy,mm,dd,hour,minute,second)

    return strNewDate.getFullYear() + '-'+ lPad(strNewDate.getMonth()) + '-'+ lPad(strNewDate.getDate()) + ' ' + lPad(strNewDate.getHours()) + ':' + lPad(strNewDate.getMinutes()) + ':' + lPad(strNewDate.getSeconds());
}   
function chkMyStat(MyStat){
    //받아온 Status 상태에 따라 화면구성 바꿔줘야함.
    //console.log(MyStat);
    switch(MyStat){
        case -1:
            document.getElementById(`chkStat`).innerText="위험성평가 확인 대상이 아닙니다."
            document.getElementById(`chkStat`).style.visibility='visible'
            document.getElementById(`submit`).style.visibility='hidden'

            break;
        case 0:
            document.getElementById(`chkStat`).style.visibility='visible'
            document.getElementById(`submit`).style.visibility='visible'

            break;
        case 1:
            document.getElementById(`chkStat`).innerText="근로자가 위험성평가 확인 완료한 작업입니다."
            document.getElementById(`chkStat`).style.visibility='visible'
            document.getElementById(`submit`).style.visibility='hidden'
    }

}

const isMobile = () =>{
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

}
function chkOrientation(){
    console.log(navigator.userAgent);
    console.log(screen.orientation.type);

    document.getElementById(`docNumber`).innerText=isMobile() + ', ' + screen.orientation.type + ', ' + screen.orientation.angle;


    
    
}

window.addEventListener( "load", function() {
    this.setTimeout(this.scrollTo,0,0,1);
}, false);

window.addEventListener( "orientationchange", function() {

    if (isMobile()==true){
//        setTimeout( function() {
            //this.window.scrollTo(0,1);
            document.getElementById(`docrotet`).innerText='rotate(-' + screen.orientation.angle + 'deg)';
            document.getElementById(`myForm`).style.transform='rotate(-' + screen.orientation.angle + 'deg)';
//        }, 200 )

        chkOrientation();        
    }
  } )



