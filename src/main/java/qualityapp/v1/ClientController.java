package qualityapp.v1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
public class ClientController {
    @Autowired
    private ClientRepository repository;

    @PostMapping("/")
    @Transactional
    public Client createClient(@RequestBody Client client) {
        System.out.println("Client received: " + client);
        Client savedClient = repository.save(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedClient).getBody();
    }

    @GetMapping("/")
    public List<Client> getAllClients() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable(value = "id") Long clientId) {
        Client client = repository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found on :: " + clientId));
        return ResponseEntity.ok().body(client);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable(value = "id") Long clientId,
                                               @RequestBody Client clientDetails) {
        Client client = repository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found on :: " + clientId));

        client.setNom(clientDetails.getNom());
        client.setPrenom(clientDetails.getPrenom());
        client.setDateNaissance(clientDetails.getDateNaissance());
        client.setAdresse(clientDetails.getAdresse());
        client.setCodePostal(clientDetails.getCodePostal());
        client.setVille(clientDetails.getVille());

        final Client updatedClient = repository.save(client);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable(value = "id") Long clientId) {
        Client client = repository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found on :: " + clientId));

        repository.delete(client);
        return ResponseEntity.ok().build();
    }
}
