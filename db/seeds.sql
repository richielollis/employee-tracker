INSERT INTO department (name) 
VALUES
('Engineering'),
('Finance'),
('Marketing'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Junior Engineer', 60000.00, 1),
('Senior Engineer', 120000.00, 1),
('Junior Financal Analyst', 50000.00, 2),
('Senior Financial Analyst', 110000.00, 2),
('Marketing Analyst', 55000.00, 3),
('Director of Marketing', 100000.00, 3),
('Junior Sales Representative', 40000.00, 4),
('Senior Sales Representative', 85000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 8, NULL),
('Dwight', 'Schrute', 7, 1),
('Angela', 'Martin', 4, NULL),
('Oscar', 'Martinez', 4, 3),
('Pam', 'Beesly', 5, NULL),
('Jim', 'Halpert', 7, 1),
('Kelly', 'Kapoor', 5, 5),
('Phyllis', 'Lapin-Vance', 5, 5),
('Stanley', 'Hudson', 2, NULL),
('Kevin', 'Malone', 1, 9),
('Andy', 'Bernard', 7, 1),
('Toby', 'Flenderson', 5, 5);

