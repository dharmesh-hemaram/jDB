const storeNames = [{
    "name": "categories"
}, {
    "name": "customers"
}, {
    "name": "employees"
}, {
    "name": "orderDetails"
}, {
    "name": "orders"
}, {
    "name": "products"
}, {
    "name": "shippers"
}, {
    "name": "suppliers"
}];
let stores = [];
let error = error => { console.error(error) };
function onload() {
    storeNames.forEach((store) => {
        Utils.loadJSON('./../assets/stores/' + store.name + '.json').then(data => {
            stores.push(data);
            if (storeNames.length == stores.length) {
                setup();
            }
        }).catch(error);
    })
}

function setup() {
    Utils.loadJSON('./assets/db.json').then(database => {
        database.stores = stores;
        DB.setup(database).then(_ => {
            legend();
            clear();
        });
    }).catch(error);
}

function legend() {
    let stores = DB.getInst().getDB('jDB').objectStoreNames;
    for (let i = 0; i < stores.length; i++) {
        let store = stores[i];
        let a = document.createElement('a');
        a.classList.add('nav-link');
        a.innerHTML = store;
        a.setAttribute("href", "#");
        a.addEventListener('click', () => {
            document.querySelector('#query').value = store + ".get()";
        });
        let li = document.createElement('li');
        li.setAttribute('id', store);
        li.classList.add('nav-item');
        li.appendChild(a);
        document.querySelector('#navbar').appendChild(li);
    }
}

function load(store) {
    Utils.loadJSON('./assets/data/' + store.name + '.json').then(data => {
        DB.getInst().jDB[store.name].add(data)
            .then(count => {
                let badge = document.createElement('span');
                badge.classList.add('badge');
                badge.classList.add('badge-secondary');
                badge.classList.add('badge-pill');
                badge.innerHTML = count;
                document.querySelector("#" + store.name + " a").appendChild(badge);
            }).catch(error);
    }).catch(error);

}

function clear() {
    storeNames.forEach((store) => {
        DB.getInst().jDB[store.name].clear()
            .then(result => {
                load(store);
            }).catch(error);
    });
}
var query;
function run() {
    query = document.querySelector("#query").value;
    if (query.length === 0) {
        return;
    }
    let inst = 'DB.getInst().jDB.';
    window.eval(inst + query).then(output).catch(error);
}

output = values => {

    if (typeof values === "number") {
        alert("You have made changes to the database. Rows affected: " + values);
        return;
    }

    let thead = document.querySelector('#output thead');
    let tbody = document.querySelector('#output tbody');
    thead.innerHTML = "", tbody.innerHTML = "";
    //Thead
    stores.forEach(store => {
        if (store.name === query.split(".")[0]) {
            let tr = document.createElement("tr");

            columns = query.match(/'.*?'|".*?"/g);
            if (columns === null) {
                let th = document.createElement("th");
                th.innerHTML = store.keyPath;
                tr.appendChild(th);
                store.indexes.forEach(index => {
                    let th = document.createElement("th");
                    th.innerHTML = index.name;
                    tr.appendChild(th);
                });
            } else {
                if (columns.includes("\"" + store.keyPath + "\"") || columns.includes("'" + store.keyPath + "'")) {
                    let th = document.createElement("th");
                    th.innerHTML = store.keyPath;
                    tr.appendChild(th);
                }
                store.indexes.forEach(index => {
                    if (columns.includes("\"" + index.name + "\"") || columns.includes("'" + index.name + "'")) {
                        let th = document.createElement("th");
                        th.innerHTML = index.name;
                        tr.appendChild(th);
                    }
                });
            }

            thead.appendChild(tr);
        }
    });
    //Tbody
    values.arr.forEach(value => {
        let tr = document.createElement("tr");
        if (typeof value === "string") {
            let td = document.createElement("td");
            td.innerHTML = value;
            tr.appendChild(td);
        } else {
            for (index in value) {
                let td = document.createElement("td");
                td.innerHTML = value[index];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
};