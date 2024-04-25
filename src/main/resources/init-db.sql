-- Création de la base de données et sélection
CREATE DATABASE IF NOT EXISTS clients_db;
USE clients_db;

-- Création de la table Clients si elle n'existe pas
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_naissance DATE,
    adresse VARCHAR(255),
    code_postal VARCHAR(10),
    ville VARCHAR(255)
    );

-- Création d'index pour optimiser les recherches (sans IF NOT EXISTS)
CREATE INDEX idx_nom ON clients (nom);
CREATE INDEX idx_prenom ON clients (prenom);


-- Insertion de données de test
INSERT INTO clients (nom, prenom, date_naissance, adresse, code_postal, ville) VALUES
    ('Doe', 'John', '1980-01-01', '123 rue de la Paix', '75001', 'Paris'),
    ('Smith', 'Jane', '1990-02-01', '456 avenue du Général', '75002', 'Paris');
