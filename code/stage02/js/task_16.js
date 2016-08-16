window.onload = function () {
    var aqiData = {};


    function addAqiData() {
        var city = document.getElementById('aqi-city-input').value.trim();
        var value = document.getElementById('aqi-value-input').value.trim();
        var info1 = document.getElementById('warning1');
        var info2 = document.getElementById('warning2');


        if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
            info1.style.display = 'block';
            return;
        }

        if (!value.match(/^\d+$/)) {
            info2.style.display = 'block';
            return;
        }

        aqiData[city] = value;
    }


    function renderAqiList() {
        var table = document.getElementById('aqi-table');
        table.innerHTML = '';
        for (var city in aqiData) {
            if (table.children.length === 0) {
                table.innerHTML = '<tr><td>城市</td> <td>空气质量</td> <td>操作</td></tr>'
            }

            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.innerHTML = city;
            tr.appendChild(td1);

            var td2 = document.createElement('td');
            td2.innerHTML = aqiData[city];
            tr.appendChild(td2);

            var td3 = document.createElement('td');
            td3.innerHTML = '<button class="del-btn">删除</button>';
            tr.appendChild(td3);
            table.appendChild(tr);
        }
    }


    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }


    function delBtnHandle(target) {
        var tr = target.parentElement.parentElement;
        var strCity = tr.children[0].innerHTML;
        delete aqiData[strCity];
        renderAqiList();
    }

    function init() {

        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var btnAdd = document.getElementById("add-btn");
        btnAdd.onclick = addBtnHandle;

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var table = document.getElementById("aqi-table");
        var arrBtnDel = table.getElementsByClassName("del-btn");

        table.addEventListener("click", function (e) {
            if (e.target && e.target.nodeName === "BUTTON") {
                delBtnHandle(e.target);
            }
        })
    }

    init();

}