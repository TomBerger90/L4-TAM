/* Lien vers extension.php*/
const API = "https://exemple.com/extension.php";

const Sens1_stop_sequence = new Map([[44105, "Garcia Lorca"], [ 43223, "Restanque"], [ 43225, "Saint-Martin"], [ 42123, "Nouveau Saint-Roch"], [ 42125, "Rondelet"], [ 43127, "Gare Saint-Roch"], [ 43233, "Observatoire"], [ 44104, "Saint-Guilhem"], [ 44103, "Peyrou"], [ 44102, "Albert 1er"], [ 41129, "Louis Blanc"], [ 41131, "Corum"], [ 42231, "Les Aubes"], [ 42233, "Pompignane"], [ 41143, "Place de l'Europe"], [ 41145, "Rives du Lez"], [ 43217, "Georges Frêche "], [ 43219, "La Rauze"], [ 44106, "Garcia Lorca"]]);
const Sens2_stop_sequence = new Map([[44201, "Garcia Lorca"], [43139, "La Rauze"], [43141, "Georges Frêche"], [41211, "Rives du Lez"], [41213, "Place de l'Europe"], [42137, "Pompignane"], [42139, "Les Aubes"], [41225, "Corum"], [41227, "Louis Blanc"], [44202, "Albert 1er"], [44203, "Peyrou"], [44204, "Saint-Guilhem"], [43125, "Observatoire"], [43231, "Gare Saint-Roch"], [42245, "Rondelet"], [42247, "Nouveau Saint-Roch"], [43133, "Saint-Martin"], [43135, "Restanque"], [44205, "Garcia Lorca"]]);

function create_stops(stop_sequence, sens){
    for (const [stopId, stopName] of stop_sequence.entries()) {
        const stop = document.createElement("li");
        stop.classList.add("thermoItem");
        stop.setAttribute("data-id", stopId);
        stop.setAttribute("data-sens", sens);
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = stopName + " <span class='text-right'><span id='first-" + stopId + "'></span> | <span id='second-" + stopId + "'></span>";
        stop.appendChild(button);
        document.getElementById("thermoList" + sens).appendChild(stop);
    }
}

function updateResult(result) {
    for (const stop of result) {
        const first = document.getElementById(`first-${stop.cityway_stop_id}`);
        const second = document.getElementById(`second-${stop.cityway_stop_id}`);
        let i = 1;
        stop.stop_next_time.sort(function(a, b){
            return a.waiting_time - b.waiting_time;
        });

        for (const next_stop of stop.stop_next_time){
            if (i == 1){
                first.innerHTML = next_stop.waiting_time;
                if (next_stop.waiting_time == "0 min" || next_stop.waiting_time == "1 min"){
                    first.classList.add("blink");
                }else{
                    first.classList.remove("blink");
                }
            }else if (i == 2){
                second.innerHTML = next_stop.waiting_time;
                if (next_stop.waiting_time == "0 min" || next_stop.waiting_time == "1 min"){
                    second.classList.add("blink");
                }else{
                    second.classList.remove("blink");
                }
            }
            i++;
        }
    }
}

function update() {
    fetch(API)
    .then(response=> response.json())
    .then(json=> updateResult(json))
    .catch(error=> console.error(error));
}

create_stops(Sens1_stop_sequence, 1);
create_stops(Sens2_stop_sequence, 2);
update();

setInterval(update, 10000);