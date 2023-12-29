const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B/events';

console.log(apiUrl);

function createPartyListItem(party) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${party.name}</strong> -
        Date: ${party.date},
        Time: ${party.time},
        Location: ${party.location},
        Description: ${party.description}
        <button onclick="deleteParty(${party.id})">Delete</button>
    `;
    return listItem;
}

console.log(createPartyListItem)

async function fetchParties() {
        try {
            const response = await fetch(apiUrl);
            const partiesObject = await response.json();
            const partyList = document.getElementById('partyList');
    
            partyList.innerHTML = '';
    
            // parties.forEach(party => {
            //     const listItem = createPartyListItem(party);
            //     partyList.appendChild(listItem);
            // });
            if (typeof partiesObject === 'object') {
                for (const partyKey in partiesObject) {
                    if (partiesObject.hasOwnProperty(partyKey)) {
                        const party = partiesObject[partyKey];
                        const listItem = createPartyListItem(party);
                        partyList.appendChild(listItem);
                    }
                }
            } else {
                console.error('Parties is not an object: ', partiesObject);
                const listItem = createPartyListItem(partiesObject);
                partyList.appendChild(listItem);
            }
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    }

async function deleteParty(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
        fetchParties();
    } catch (error) {
        console.error('Error deleting party:', error);
    }
}
    
fetchParties();



// async function fetchParties() {
//     try {
//         const response = await fetch(apiUrl);
//         const parties = await response.json();
//         const partyList = document.getElementById('partyList');

//         partyList.innerHTML = '';

//         parties.forEach(party => {
//             const listItem = document.createElement('li');
//             listItem.innerHTML = `
//                 <strong>${party.name}</strong> -
//                 Date: ${party.date},
//                 Time: ${party.time},
//                 Location: ${party.location},
//                 Description: ${party.description}
//                 <button onclick="deleteParty(${party.id})">Delete</button>
//             `;
//             partyList.appendChild(listItem);
//         });
//     } catch (error) {
//         console.error('Error fetching parties:', error);
//     }
// }

// document.getElementById('form').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);
//     const newParty = {
//         name: formData.get('name'),
//         date: formData.get('date'),
//         time: formData.get('time'),
//         location: formData.get('location'),
//         description: formData.get('description'),
//     };
//     try {
//         await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newParty),
//         });
//         fetchParties();
//         event.target.reset();
//     } catch (error) {
//         console.error('Error adding party:', error);
//     }
// });