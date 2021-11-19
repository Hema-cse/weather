




getData()
    .catch(error => {
        console.log('error occured while loading the data');
        console.error(error);
    });

let states = [];
let opt = [];
let w=[]
async function getData() {

    
    const countries = await fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json");
    const countries_data = await countries.json();
   
   console.log(countries_data);

    
    for (let i = 0; i < countries_data.length; i++) {
        for (let j = 0; j < countries_data[i].states.length; j++) {
             for (let k = 0; k < countries_data[i].states[j].cities.length; k++) {
            //sel = document.createElement("select");
            //opt = document.createElement("option");
            //sel.options.add(opt);
                 console.log(countries_data[i].states[j].cities[k]);
            }
        }
        }
         //document.CreateElement("option");

    }

getData();

/*let dropdown = document.getElementById('dropdown');


let defaultOption = document.createElement('option');
defaultOption.text = 'Choose a city';*/