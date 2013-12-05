
/**
 * Holds several storage tables.
 *
 * @see http://www.html5rocks.com/en/tutorials/indexeddb/todo
 */

var dbStorage = {};
dbStorage.todoDB = {};

dbStorage.todoDB.db = null;

dbStorage.todoDB.open = function () {
  var version = 1;
  var request = indexedDB.open("todos", version);

  // We can only create Object stores in a versionchange transaction.
  request.onupgradeneeded = function (e) {
    var db = e.target.result;

    // A versionchange transaction is started automatically.
    e.target.transaction.onerror = dbStorage.todoDB.onerror;

    if (db.objectStoreNames.contains("todo")) {
      db.deleteObjectStore("todo");
    }

    var store = db.createObjectStore("todo",
      {keyPath: "timeStamp"}
    );
  };

  request.onsuccess = function (e) {
    dbStorage.todoDB.db = e.target.result;
    dbStorage.todoDB.getAllTodoItems();
  };

  request.onerror = dbStorage.todoDB.onerror;
};

dbStorage.todoDB.addTodo = function (todoText) {
  var db = dbStorage.todoDB.db;
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");
  var request = store.put({
    "text": todoText,
    "timeStamp": new Date().getTime()
  });

  request.onsuccess = function (e) {
    // Re-render all the todo's
    dbStorage.todoDB.getAllTodoItems();
  };

  request.onerror = function (e) {
    console.log(e.value);
  };
};

dbStorage.todoDB.getAllTodoItems = function () {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var db = dbStorage.todoDB.db;
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");

  // Get everything in the store;
  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = store.openCursor(keyRange);

  cursorRequest.onsuccess = function (e) {
    var result = e.target.result;
    if (!!result == false) {
      return;
    }

    renderTodo(result.value);
    result.continue();
  };

  cursorRequest.onerror = dbStorage.todoDB.onerror;
};

dbStorage.todoDB.deleteTodo = function (id) {
  var db = dbStorage.todoDB.db;
  var trans = db.transaction(["todo"], "readwrite");
  var store = trans.objectStore("todo");

  var request = store.delete(id);

  request.onsuccess = function (e) {
    dbStorage.todoDB.getAllTodoItems();  // Refresh the screen
  };

  request.onerror = function (e) {
    console.log(e);
  };
};
