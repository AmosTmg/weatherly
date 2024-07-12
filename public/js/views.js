const userCardsContainer = document.querySelector("[data-cards-container]");
const userCardTemplate = document.querySelector("[data-user-template]");
const searchInput = document.querySelector("[data-search]");
const inputField = document.getElementById("textInput");

let timeoutId;

searchInput.addEventListener("input", (e)=>{
    var value = e.target.value;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        // if(value.endsWith(" ")){
            fetch(`https://geocode.maps.co/search?q=${value}&api_key=668d793f9191c753804907rmf801a17`)
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
    }, 1000);
    
});


