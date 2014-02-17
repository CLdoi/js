$(document).ready(function(){
    var selectWeek = 6;//パラメータで送られてきた曜日の値
    var myWTbl = new Array("日", "月", "火","水","木","金","土");

    var today = new Date(); //今日を取得
    var myY = eval(today.getFullYear()); //今年の値 取得
    var myM = eval(today.getMonth()); //今月の値 取得

    //デフォルト値設定
    document.guildBattleForm.years.value = myY;
    document.guildBattleForm.months.value = myM+1;
    document.getElementById("week").innerHTML = '('+myWTbl[selectWeek]+'曜日)';
    setDaysByWeek(myY, myM);


    /* プルダウンが変更されたら再取得 */
    $("select:not(#days)").change(function () {
        myY = eval(document.guildBattleForm.years.value);
        myM = eval(document.guildBattleForm.months.value - 1);
        setDaysByWeek(myY, myM);
    });


    /* 計算処理（内部） */
    function setDaysByWeek(myY, myM){
        var myDate = new Date(myY, myM);//その年月の1日を取得
        var myWeek = myDate.getDay();//1日の曜日を取得

        var myMTbl= new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        //うるう年なら2月を29日にする
        if (((myY%4)==0 && (myY%100)!=0) || (myY%400)==0){
            myMTbl[1] = 29;
        }

        var tmpWeek = myWeek;//初期値は1日の曜日に設定
        var resultArray = new Array();

        for(var tmpDay=1; tmpDay<=myMTbl[myM]; tmpDay++){
            //週末（土日）なら配列に格納
            if(tmpWeek == selectWeek){
                resultArray.push(tmpDay);
            }
            //次の日へ（配列の末尾になったら0に戻す）
            tmpWeek++;
            if(tmpWeek > 6){
                tmpWeek = 0;
            }
        }
        var selObj=document.getElementById("days");
        var length=selObj.childNodes.length-1;

        if(length>0){
            /* ノード削除：プルダウン初期化 */
            /* デクリメントしながら、子ノードの末尾から削除 */
            for(var i=length; i>0; i--){
                var childObj=selObj.childNodes[i];
                if(childObj.nodeName!=undefined){
                    selObj.removeChild(childObj);
                }
            }
        }

        for(var i in resultArray){
            var optObj=document.createElement("option");
            if(navigator.userAgent.indexOf("MSIE")>-1){
                optObj.innerText=resultArray[i];
            }else{
                optObj.textContent=resultArray[i];
            }
            /* ノード追加 */
            selObj.appendChild(optObj);
        }
    }
});