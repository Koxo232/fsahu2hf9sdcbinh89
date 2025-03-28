var confirmElement = document.querySelector(".confirm");

function closePage() {
    clearClassList();
}

function openPage(page) {
    clearClassList();
    var classList = confirmElement.classList;
    classList.add("page_open");
    classList.add("page_" + page + "_open");
}

function clearClassList() {
    var classList = confirmElement.classList;
    classList.remove("page_open");
    classList.remove("page_1_open");
    classList.remove("page_2_open");
    classList.remove("page_3_open");
}

var time = document.getElementById("time");
var options = { year: 'numeric', month: 'numeric', day: '2-digit' };
var optionsTime = { second: 'numeric', minute: 'numeric', hour: '2-digit' };

if (localStorage.getItem("update") == null) {
    localStorage.setItem("update", "24.12.2024");
}

var date = new Date();

var updateText = document.querySelector(".bottom_update_value");
updateText.innerHTML = localStorage.getItem("update");

var update = document.querySelector(".update");
update.addEventListener('click', () => {
    var newDate = date.toLocaleDateString("pl-PL", options);
    localStorage.setItem("update", newDate);
    updateText.innerHTML = newDate;

    scroll(0, 0);
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

setClock();
function setClock() {
    date = new Date();
    time.innerHTML = "Czas: " + date.toLocaleTimeString("pl-PL", optionsTime) + " " + date.toLocaleDateString("pl-PL", options);
    delay(1000).then(() => {
        setClock();
    });
}

var unfold = document.querySelector(".info_holder");
unfold.addEventListener('click', () => {
    if (unfold.classList.contains("unfolded")) {
        unfold.classList.remove("unfolded");
    } else {
        unfold.classList.add("unfolded");
    }
});

var data = {};

var params = new URLSearchParams(window.location.search);
for (var key of params.keys()) {
    data[key] = params.get(key);
}

// Sprawdzenie, czy wszystkie wymagane dane są obecne
if (!data['name'] || !data['surname'] || !data['birthday']) {
    alert("Brak wymaganych danych!");
    location.href = 'https://koxo232.github.io/koxo/index.html';
}

// Ustawianie danych w DOM
setData("name", data['name'].toUpperCase());
setData("surname", data['surname'].toUpperCase());
setData("birthday", data['birthday']);