
document.addEventListener('DOMContentLoaded', function() {
    
    function obtain(fil){
        const listDoggo = fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(json =>{
            if (fil==0){
                mostList(json);
            }
            else{
                const listFilt= json.filter(function(Dog) {
                    return Dog.isGoodDog;
                });
                mostList(listFilt);
            }
    
        });
    }



    function mostList(listDogs){
        eraseChild();
        const wriList = document.querySelector("#dog-bar");
        const ul = document.createElement('ul');
        ul.style.display = "flex";
        wriList.appendChild(ul);

        longListDogs = listDogs.length;
        console.log('longitud ' + longListDogs);
        for (let i = 0; i < longListDogs; i++) {
            const newElem = document.createElement('li');
            newElem.style.listStyle ="none";
            newElem.style.fontSize = "10px";
            newElem.style.height ="30px";
            newElem.innerHTML = '<span>'+ listDogs[i].name+ '</span>';
            newElem.style.cursor = 'pointer';
            newElem.style.margin= '0px 8px 0px 8px';
            newElem.addEventListener('click',(e) => {
                e.preventDefault();
                eraseChildDogInfo();
                obtain(0);
                const imDog = document.querySelector('#dog-info');
                const imageDog = document.createElement('img');
                imageDog.id = 'imgDogOn';
                imDog.appendChild(imageDog);
        
                const h2 = document.createElement('h2');
                imDog.appendChild(h2);

                const butDog = document.createElement('button');
                butDog.width = "100px";
                butDog.height = "100px";
                butDog.id = "status";
                imDog.appendChild(butDog);

                const h3 = document.createElement('h3');
                imDog.appendChild(h3);

                imageDog.src = listDogs[i].image;
                h2.innerText = listDogs[i].name;
                h3.value = listDogs[i].id;
                let typDog = (listDogs[i].isGoodDog) ? "Good Dog!" : "Bad Dog!"
                butDog.innerText = typDog;
                const valuId= listDogs[i].id;
                butDog.addEventListener('click',chanStatus);
            });
            ul.appendChild(newElem);
        }
          
    }

    function filterListDogsIs(){
        console.log('entre a filter');
        const goodDogFilter = document.getElementById("good-dog-filter");
        console.log(goodDogFilter);
        const textGood = goodDogFilter.innerText;
        if(textGood ==="Filter good dogs: ON"){
            console.log("entre a ON Y SE PONE OFF");
            goodDogFilter.innerText = "Filter good dogs: OFF";
            eraseChild();
            obtain(0);
        }
        else{
            console.log("entre a OFF Y SE PONE ON");
            goodDogFilter.innerText = "Filter good dogs: ON";
            eraseChild();
            obtain(1);
        }
    }
  
    
    function eraseChildDogInfo(){
        console.log("entre a borrar");
        
        let element2 = document.getElementById("dog-info");
        while (element2.firstChild) {
            element2.removeChild(element2.firstChild);
        }
        let erase=true;
        return erase;
    }

    function eraseChild(){
        let element1 = document.getElementById("dog-bar");
        while (element1.firstChild) {
            element1.removeChild(element1.firstChild);
        }
        let erase=true;
        return erase;
    }

    function chanStatus(){
        console.log('entre a chanStatus');
        const ch = document.querySelector('#status');
        if(ch.innerText === "Good Dog!"){
            ch.innerText = "Bad Dog!"
        }
        else{
            ch.innerText = "Good Dog!"
        }
        const env = sendStatus();
    }

    function sendStatus(){
        console.log('entre a sendStatus');
        const ch2 = document.querySelector('h2');
        const breedDis = ch2.innerText;
        console.log('ch2' + breedDis);

        const ch3 = document.querySelector('h3');
        const idDisInv = ch3.value;
        console.log('ch3 ' + idDisInv);

        const ch = document.querySelector('#status');
        const statIsGood = ch.innerText;
        if (statIsGood === 'Good Dog!'){
            statIsGoodBol = true;
        }
        else{
            statIsGoodBol = false;
        }
        console.log(statIsGoodBol);

        const url = `http://localhost:3000/pups/${idDisInv}`;
        console.log(url);
    
        const modiOne = fetch(`http://localhost:3000/pups/${idDisInv}`, {
            method: "PATCH",
            headers: {
            "Content-type": "application/json",
            "accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: statIsGoodBol
            })
            })
            .then(res => console.log(res.json()))
            .catch(function(error) {
                alert("Try again...!");
                console.log(error.message);
              })
            
            console.log(modiOne);
    };



    obtain(0);
    const goodDogFilter = document.getElementById("good-dog-filter");
    console.log(goodDogFilter);
    goodDogFilter.addEventListener('click', (e) =>{
        alert('enter');
        e.preventDefault();
        filterListDogsIs()});   
});