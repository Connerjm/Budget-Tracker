const VERSION = 1;
const request = indexedDB.open("transactions", VERSION);
let db;

//If the version has been updated.
request.onupgradeneeded = function (e)
{
    //Get the db.
    db = e.target.result;

    //If it has no stores, make a new one.
    if (db.objectStoreNames.length === 0)
    {
        db.createObjectStore("TransactionsStore", { autoIncrement: true });
    }
}

//If indexeddb works.
request.onsuccess = function (e)
{
    //Get the db.
    db = e.target.result;

    //Check online status of the browser.
    if (navigator.onLine)
    {
        checkDB();
    }
}

//If indexeddb doesn't work.
request.onerror = function (e)
{
    //Log error.
    console.error("Database error: " + e.target.errorCode);
}

//Check the db.
function checkDB()
{
    const getAll = db.transaction(["TransactionsStore"], "readwrite").objectStore("TransactionsStore").getAll();

    getAll.onsuccess = function ()
    {
        if (getAll.result.length > 0)
        {
            fetch("/api/transaction/bulk",
            {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(res =>
                    {
                        if (res.length !== 0)
                        {
                            db.transaction(["TransactionsStore"], "readwrite").objectStore("TransactionsStore").clear();
                        }
                    });
        }
    }
}

//Save a record to the db.
function saveRecord(record)
{
    db.transaction(["TransactionsStore"], "readwrite").objectStore("TransactionsStore").add(record);
}

//Runs checkDB when the browser comes back online.
addEventListener("online", checkDB);