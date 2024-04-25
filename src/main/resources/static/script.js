function saveClient() {
    var client = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        dateNaissance: document.getElementById('dateNaissance').value,
        adresse: document.getElementById('adresse').value,
        codePostal: document.getElementById('codePostal').value,
        ville: document.getElementById('ville').value
    };
    fetch('http://localhost:8080/api/clients/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Client ajouté:', data);
            showClients();
        })
        .catch(error => console.error('Erreur:', error));
}

function updateClient() {
    var clientId = document.getElementById('clientId').value; // Get client ID from hidden input
    var client = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        dateNaissance: document.getElementById('dateNaissance').value,
        adresse: document.getElementById('adresse').value,
        codePostal: document.getElementById('codePostal').value,
        ville: document.getElementById('ville').value
    };
    fetch(`http://localhost:8080/api/clients/update/${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to update client');
            }
        })
        .then(data => {
            console.log('Client mis à jour:', data);
            showClients(); // Refresh the list
        })
        .catch(error => console.error('Error:', error));
}


function showClients() {
    fetch('http://localhost:8080/api/clients/', {
        method: 'GET'
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch clients');
            }
        })
        .then(clients => displayClients(clients))
        .catch(error => console.error('Error:', error));
}

function displayClients(clients) {
    var list = document.getElementById('clientsList');
    list.innerHTML = '';
    clients.forEach(client => {
        var item = document.createElement('div');
        item.textContent = `Nom: ${client.nom}, Prénom: ${client.prenom}, Adresse: ${client.adresse}, Code Postal: ${client.codePostal}, Ville: ${client.ville}`;
        item.onclick = function() { fillForm(client); }; // Add click event to fill the form
        item.style.cursor = 'pointer';

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = function() {
            event.stopPropagation();
            deleteClient(client.id);
        };
        deleteButton.style.width = '80px';
        deleteButton.style.marginLeft = '30px';
        deleteButton.className = 'deleteButton';

        item.appendChild(deleteButton);
        list.appendChild(item);
    });
}

function fillForm(client) {
    document.getElementById('clientId').value = client.id;
    document.getElementById('nom').value = client.nom;
    document.getElementById('prenom').value = client.prenom;
    document.getElementById('dateNaissance').value = client.dateNaissance ? client.dateNaissance.split('T')[0] : ''; // Format date if exists
    document.getElementById('adresse').value = client.adresse;
    document.getElementById('codePostal').value = client.codePostal;
    document.getElementById('ville').value = client.ville;
}

function deleteClient(clientId) {
    fetch(`http://localhost:8080/api/clients/delete/${clientId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Client supprimé avec succès');
                showClients(); // Refresh the list after deleting
            } else {
                throw new Error('Failed to delete client');
            }
        })
        .catch(error => console.error('Error:', error));
}