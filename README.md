Hello! Welcome to my phase-1 project.

!!!!Brewery Snob Quiz!!!!

--Mission--
For this project, I will test a users knowledge of their local breweries. To do this, the user will have to pick the brewery from a list of breweries that matches their hometown. 

--Process--

    -pick a difficulty-

First, a user must choose a difficulty. There are three difficulty options (easy, medium, and hard). The easy difficulty will populate 5 total choices; the medium difficulty will populate 10 total choices; the hard difficulty will populate 20 total chocies. 

At the time, the JS will fetch the given 'diffculty-minus-one' number of breweries from the API. Incorrect choices will be saved in an array of 'choices'.


    -enter your hometown-

Next, a user will type in their hometown city and state. 

The JS will fetch all of the breweries in the provided city/state, randomly pick a 'correct choice' from 'correct choices', and finally push the 'correct choice' to 'choices'. If there are no breweries in the city/state provided (len of fetched cities is zero), an alert will be triggered.

Upon submission, the page is populated with the brewery name of each brewery in 'choices'.

Before population, and to prevent the 'correct choice' from easily being found at the end of the array, the JS will randomize (shuffle) the order of the array. Thus, the Fisher-Yates Shuffle will be implemented


    -pick your hometown brewery-



    ///tbd//



SOURCE :
https://www.openbrewerydb.org/documentation
//there are 409 pages available

Notes:
3 Event Listeners Used:
-submit brewery search (form)

-vote for correct brewery (click)

-drag favorite brewery over to a section of learn more(drag/drop)