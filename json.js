let data = [];
const viewData = () => {
    document.getElementById('editbtn').style.display = "none";
    document.getElementById('addbtn').style.display = "block";
    let record = JSON.parse(localStorage.getItem('user'));
    let val = (record == null) ? [] : record;
    let tbl = "";
    val.map((v) => {
        const { userid, email } = v;
        tbl += `
                <tr>
                    <td>${email}</td>
                       <td>
                            <button onclick="deleteData(${userid})">Delete</button>
                            <button onclick="editData(${userid})">Edit</button>
                        </td>
                </tr>
               `
    })
    document.getElementById('record').innerHTML = tbl;
}
viewData();
const save = (id) => {
    let userid = document.getElementById('editid').value;
    if (userid) {
        let alldata = JSON.parse(localStorage.getItem('user'));
        alldata.map((val) => {
            if (val.userid == userid) {
                val.email = document.getElementById('email').value;
            }
            return val;
        });
        localStorage.setItem('user', JSON.stringify(alldata));
        alert('User successfully updated');
        viewData();
        document.getElementById('editid').value = '';
    } else {
        let email = document.getElementById('email').value;
        let obj = {
            userid: Math.floor(Math.random() * 100000),
            email: email,
        }
        if (localStorage.getItem('user') === null || localStorage.getItem('user') === undefined) {
            data.push(obj);
            localStorage.setItem('user', JSON.stringify(data));
        } else {
            let val = JSON.parse(localStorage.getItem('user'));
            val.push(obj);
            localStorage.setItem('user', JSON.stringify(val));
        }
        viewData();
    }
    document.getElementById('email').value = "";
}
const deleteData = (id) => {
    let alldata = JSON.parse(localStorage.getItem('user'));
    let ans = alldata.filter((val) => {
        return val.userid != id
    });
    alert("User succfully delete");
    localStorage.setItem('user', JSON.stringify(ans));
    viewData();
}
const editData = (id) => {
    document.getElementById('addbtn').style.display = "none";
    document.getElementById('editbtn').style.display = "block";
    document.getElementById('editid').value = id;
    let val = JSON.parse(localStorage.getItem('user'));
    let ans = val.filter((v) => {
        return v.userid == id;
    });
    document.getElementById('email').value = ans[0].email;
}
const clearalldata = (id) => {
    let alldata = JSON.parse(localStorage.getItem('user'));
    let ans = alldata.filter((val) => {
        return val.userid == id
    });
    alert("clear all data")
    localStorage.setItem('user', JSON.stringify(ans));
    viewData();
}