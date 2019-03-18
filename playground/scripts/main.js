const xTableNames = [{ "name": "categories" }, { "name": "customers" }, { "name": "employees" }, { "name": "orderDetails" }, { "name": "orders" }, { "name": "products" }, { "name": "shippers" }, { "name": "suppliers" }];
let xTables = [];
let xDatabase;
function onload() {
  xTableNames.forEach((table) => {
    fetch('./tables/' + table.name + '.json')
      .then(r => r.json())
      .then(data => {
        xTables.push(data);
        if (xTableNames.length == xTables.length) {
          setup();
        }
      }).catch(console.error);
  })
}

function checkParam() {
  let query = window.location.search.replace('?query=', '');
  if (query) {
    $("#query").val(decodeURIComponent(query));
    run();
  }
}

function setup() {
  fetch('./db.json').then(r => r.json()).then(database => {
    database.tables = xTables;
    xDatabase = database
    DB.setup(database).then(_ => {
      $("#inst-text").html(`DB.getInst().${xDatabase.databaseName}.`);
      legend();
      checkParam();
      clear();
    });
  }).catch(console.error);
}

function legend() {
  let tables = DB.getInst()[xDatabase.databaseName]._.objectStoreNames;
  for (let i = 0; i < tables.length; i++) {
    let table = tables[i];
    let li = document.createElement('li');
    li.setAttribute('id', table);
    li.classList = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = table;
    li.addEventListener('click', () => {
      document.querySelector('#query').value = table + ".get()";
    });
    document.querySelector('#navbar').appendChild(li);
  }
}

function load(table) {
  fetch('./data/' + table.name + '.json')
    .then(r => r.json())
    .then(data => {
      DB.getInst()[xDatabase.databaseName][table.name].add(data)
        .then(count => {
          let badge = document.createElement('span');
          badge.classList.add('badge');
          badge.classList.add('badge-secondary');
          badge.classList.add('badge-pill');
          badge.innerHTML = count;
          document.querySelector("#" + table.name).appendChild(badge);
        }).catch(console.error);
    }).catch(console.error);

}

function clear() {
  xTableNames.forEach((table) => {
    DB.getInst()[xDatabase.databaseName][table.name].clear()
      .then(() => {
        load(table);
      }).catch(console.error);
  });
}
var query;
function run() {
  query = document.querySelector("#query").value;
  if (query.length === 0) {
    return;
  }
  let inst = `DB.getInst().${xDatabase.databaseName}.`;
  window.eval(inst + query).then(output).catch(console.error);
}

output = values => {
  raw(values);
  json(values);
  //table(values);
};

raw = values => {
  if (typeof values === "number") {
    $("#raw-output").html("You have made changes to the database. Rows affected: " + values);
    return;
  } else {
    $("#raw-output").html(JSON.stringify(values));
  }
}

json = values => {
  if (typeof values === "number") {
    $("#json-output").html(values);
    return;
  } else {
    $("#json-output").html(pritifyJson(values));
  }
}

function pritifyJson(json) {
  json = JSON.stringify(json, undefined, 2);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

table = values => {
  let thead = document.querySelector('#table-output thead');
  let tbody = document.querySelector('#table-output tbody');
  thead.innerHTML = "", tbody.innerHTML = "";
  //Thead
  tables.forEach(table => {
    if (table.name === query.split(".")[0]) {
      let tr = document.createElement("tr");

      columns = query.match(/'.*?'|".*?"/g);
      if (columns === null) {
        let th = document.createElement("th");
        th.innerHTML = table.keyPath;
        tr.appendChild(th);
        table.columns.forEach(index => {
          let th = document.createElement("th");
          th.innerHTML = index.name;
          tr.appendChild(th);
        });
      } else {
        if (columns.includes("\"" + table.keyPath + "\"") || columns.includes("'" + table.keyPath + "'")) {
          let th = document.createElement("th");
          th.innerHTML = table.keyPath;
          tr.appendChild(th);
        }
        table.columns.forEach(index => {
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
}

