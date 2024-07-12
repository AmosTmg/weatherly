// client.js (or your frontend JavaScript file)
let apiKey;
fetch('/api/key')
    .then(response => response.json())
    .then(data => {
        apiKey = data.apiKey;
        // Now you can use apiKey securely in your frontend code
        console.log('Received API key from server:');
    })
    .catch(error => console.error('Error fetching API key:', error));

const userCardsContainer = document.querySelector("[data-cards-container]");
const userCardTemplate = document.querySelector("[data-user-template]");
const searchInput = document.querySelector("[data-search]");
const inputField = document.getElementById("textInput");

let timeoutId;
searchInput.addEventListener("input", (e)=>{
    var value = e.target.value;

    if(value === ''){
        userCardsContainer.innerHTML = '';
    }

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        // if(value.endsWith(" ")){
            fetch(`https://geocode.maps.co/search?q=${value}&api_key=${apiKey}`)
            .then(res=>res.json())
            .then(locations=>{      
                locations.forEach(location=>{
                    userCardsContainer.innerHTML = '';
                    const cardClone = userCardTemplate.content.cloneNode(true).firstElementChild;
                    // const cardInfoDiv = cardClone.querySelector("[data-card-info]");    
                    const cardInfoParagraph = cardClone.querySelector("p");
                    cardInfoParagraph.textContent = location.display_name;
                    
                    cardClone.addEventListener("click", () => {
                        inputField.value = location.display_name; // Update input field with selected address
                        userCardsContainer.innerHTML = ''; // Clear suggestions after selection
                    });

                    userCardsContainer.append(cardClone);
                });
            })
            .catch(error=>console.log("error fetching data ", error));    
    }, 5000);
});


