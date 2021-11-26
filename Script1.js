var countries = [];
document.getElementById("c").disabled = true; // disabling the radio buttons until the temperatures are retrieved
document.getElementById("f").disabled = true;

getCitiesData(); // retreives few cities from the states


async function fetch_countriesData()             // retrieving the countries json file
{
    document.getElementById("loading").style.display = "block"; // displays loading icon before fetching the data
    const countries_res = await fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json");
    const countries_data = await countries_res.json();
    document.getElementById("loading").style.display = "none"; // loading icon is not displayed once data is loaded
    countries = countries_data;
    console.log(countries);
}


async function getCitiesData()                      // 
{
    document.getElementById("loading").style.display = "block";

    await fetch_countriesData();                      //calling the countries json file
    document.getElementById("loading").style.display = "none";
    var cities1 = document.getElementById("cities1");      // drop down list 1
    var cities2 = document.getElementById("cities2");       // drop down list 2

    var citiCount = 0; // holds the number of options in drop down
    var c = 0; 
    for (var i = 0; i < countries.length; i++)
    {
        
        if (citiCount > 50)  // breaks when city count is greater than 50
        {
            break;
        }
        c=0;
        var states = countries[i]['states'];
        console.log('s',states);
            for (var j = 0; j < states.length; j++)       
            {           
                if (citiCount > 50)
                {
                     break;
                }
                var cities = states[j]['cities'];
                    for (var k = 0; k < cities.length; k++)
                    {
                        if (++c > 2)                  // breaks when  retreiving the 2 cities from each country
                        {
                            break;
                        }
                        if (++citiCount > 50)
                        {
                            break;
                        }
                        // adding the options to 1 drop down
                        var option1 = document.createElement("OPTION");
                        option1.value = cities[k].latitude + "," + cities[k].longitude + "," + cities[k].name;
                        option1.innerHTML = cities[k].name;
                        cities1.options.add(option1);

                        // adding the options to 2 drop down
                        var option2 = document.createElement("OPTION");
                        option2.value = cities[k].latitude + "," + cities[k].longitude + "," + cities[k].name;
                        option2.innerHTML = cities[k].name;
                        cities2.options.add(option2);
                    }
            }
    }
}
// loading the product astro json file
async function fetch_time()
{
    document.getElementById("loading").style.display = "block";
    const response = await fetch("https://www.7timer.info/bin/astro.php?lon=" + citi1value[1] + "&lat=" + citi1value[0] + "&ac=0&unit=metric&output=json&tzshift=0");
    const latlong_data = await response.json();
    document.getElementById("loading").style.display = "none";
}

/* This function compares the temperature of 2 cities
  and  the also assigns the timezones for 2 cities
 */

async function compareTemp()
{
    document.getElementById("loading").style.display = "block"; // initially loading is displayed
    var citi1value = document.getElementById("cities1");
    citi1value = citi1value.options[citi1value.selectedIndex].value; // holds the latitude , longitude and city1 name
    citi1value = citi1value.split(",");
    var citi2value = document.getElementById("cities2");
    citi2value = citi2value.options[citi2value.selectedIndex].value; // holds the latitude , longitude and city2 name
    citi2value = citi2value.split(",");
    document.getElementById("loading").style.display = "none";

    // checks if the cities are not selected
    if (citi1value == "none" || citi2value == "none")
    {
        alert("select the city");
        return;
    }

    // retreiving the timezones of 2 cities
    document.getElementById("city1Time").innerHTML = gettimezone(citi1value[2]); // city name is present at 2 index
    document.getElementById("city2Time").innerHTML = gettimezone(citi2value[2]);
  
    document.getElementById("loading").style.display = "block";

    // getting the temperature of city 1
    const response = await fetch("https://www.7timer.info/bin/astro.php?lon=" + citi1value[1] + "&lat=" + citi1value[0] + "&ac=0&unit=metric&output=json&tzshift=0");
    const latlong_data = await response.json();
    document.getElementById("loading").style.display = "none";

    // getting the current date
    const d = new Date();
    let hour = d.getHours();

    // retrieving the current temperature from the json file from the array of temperatures
    let x = Math.floor(hour / 3);
    city1Temp = latlong_data.dataseries[x].temp2m;
    document.getElementById("city1Temp").innerHTML = city1Temp;

    document.getElementById("loading").style.display = "block";

    // getting the temperature of city 2
    const response1 = await fetch("https://www.7timer.info/bin/astro.php?lon=" + citi2value[1] + "&lat=" + citi2value[0] + "&ac=0&unit=metric&output=json&tzshift=0");
    const latlong_data1 = await response1.json();
    document.getElementById("loading").style.display = "none";

     city2Temp = latlong_data1.dataseries[x].temp2m;
    document.getElementById("city2Temp").innerHTML = city2Temp;

    document.getElementById("c").disabled = false; // enabling the radio buttons
    document.getElementById("f").disabled = false;


    // assigning the colors based on temperature
    if (city1Temp > city2Temp)
    {
        document.getElementById("city1Temp").style.backgroundColor = 'red';
        document.getElementById("city2Temp").style.backgroundColor = 'green';;
    }
    else if (city1Temp < city2Temp)
    {
        document.getElementById("city1Temp").style.backgroundColor = 'green';
        document.getElementById("city2Temp").style.backgroundColor = 'red';
    }

}

// converting the temperature from celsius to fahrenheit

function convertTemp()
{
    
    let tmp1 = city1Temp;
    let tmp2 = city2Temp;
    const city1ele = document.getElementById("city1Temp");
    const city2ele = document.getElementById("city2Temp");
    if (document.getElementById("f").checked)
    {

        tmp1 = (Math.round(city1Temp * 9 / 5) + 32);
        tmp2 = (Math.round(city2Temp * 9 / 5) + 32);
        city1ele.innerHTML = tmp1 ;       
        city2ele.innerHTML = tmp2;
         
    }
     if (document.getElementById("c").checked)      // displays the same temperature when the celcius is checked
     {
        city1ele.innerHTML = city1Temp;
        city2ele.innerHTML = city2Temp;
     }
    
}


//  prints the time zones of 2 cities
function gettimezone(city)
{
    for (var i = 0; i < countries.length; i++) {

        var states = countries[i]['states'];
        for (var j = 0; j < states.length; j++) {

            var cities = states[j]['cities'];
            for (var k = 0; k < cities.length; k++) {
                if (cities[k].name == city) {
                    return countries[i].timezones[0].gmtOffsetName;
                    document.getElementById("city1Time").innerHTML = countries[i].timezones[0].gmtOffsetName;;
                }

            }
        }
    }
}

