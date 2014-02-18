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
    function setDaysByWeek(y, m){
        var list = [];

        for (var i = 1; i <= 31; i++) (function(date){
            var week = date.getDay(),
                month = date.getMonth();

            if (month !== m) return;
            if (week === selectWeek) list.push(date);
        })(new Date(y, m, i));

        // 指定された曜日の日にちを設定する
        $('#days').children().remove();
        list.forEach(
            function(v){
                $('#days').append($('<option>').val(v.getDate()).html(v.getDate()));
            }
        );
    }
});