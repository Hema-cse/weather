var countries = [];
getCitiesData();
// retrieving the countries json file
async function fetch_countriesData()
{
    const countries_res = await fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json");
    const countries_data = await countries_res.json();
    countries = countries_data;
    console.log(countries_data);

}

// retreiving few cities in each drop down
async function getCitiesData()
{
    //calling the countries json file
    await fetch_countriesData();
    var cities1 = document.getElementById("cities1");
    var cities2 = document.getElementById("cities2");

    var citiCount = 0;
    var c = 0;
    for (var i = 0; i < countries.length; i++)
    {
        if (citiCount > 10)
        {
            break;
        }
        c=0;
        var states = countries[i]['states'];
        for (var j = 0; j < states.length; j++)
        {
           
            if (citiCount > 10) {
                break;
            }
            var cities = states[j]['cities'];
            for (var k = 0; k < cities.length; k++)
            {
                if (++c>1)
                {
                    break;
                }
                if (++citiCount > 10)
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
    const response = await fetch("https://www.7timer.info/bin/astro.php?lon=" + citi1value[1] + "&lat=" + citi1value[0] + "&ac=0&unit=metric&output=json&tzshift=0");
    const latlong_data = await response.json();
}

/* returns the temperature of 2 cities
 */
async function compareTemp()
{
    var citi1value = document.getElementById("cities1");
    citi1value = citi1value.options[citi1value.selectedIndex].value;
    citi1value = citi1value.split(",");
    var citi2value = document.getElementById("cities2");
    citi2value = citi2value.options[citi2value.selectedIndex].value;
    citi2value = citi2value.split(",");

     // retreiving the timezones of 2 cities

    var t1 = gettimezone(citi1value[2]);
    var t2 = gettimezone(citi2value[2]);
    document.getElementById("city1Time").innerHTML = t1;
    document.getElementById("city2Time").innerHTML = t2;
    /* (t1 < t2) {
        document.getElementsByClassName("temp_values1").innerHTML = "<span style='background-color: red;border-radius:50px;height:200px;width:200px'>**Message</span>";
    }*/

    // getting the temperature of city 1
    const response = await fetch("https://www.7timer.info/bin/astro.php?lon=" + citi1value[1] + "&lat=" + citi1value[0] + "&ac=0&unit=metric&output=json&tzshift=0");
    const latlong_data = await response.json();

    // getting the current date
    const d = new Date();
    let hour = d.getHours();
    // retrieving the current temperature from the json file from the array of temperatures
    let x = Math.floor(hour / 3);
    city1Temp = latlong_data.dataseries[x].temp2m;
    alert(city1Temp);
    document.getElementById("city1Temp").innerHTML = city1Temp;
    
    // getting the temperature of city 2
    const response1 = await fetch("https://www.7timer.info/bin/astro.php?lon=" + citi2value[1] + "&lat=" + citi2value[0] + "&ac=0&unit=metric&output=json&tzshift=0");
    const latlong_data1 = await response1.json();;
    city2Temp = latlong_data1.dataseries[x].temp2m;
    alert(city2Temp);
    document.getElementById("city2Temp").innerHTML = city2Temp; 
   
}


//  prints the time zones of 2 cities
function gettimezone(city) {
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

  
