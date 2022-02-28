INSERT INTO department (name)
VALUES ('Software Engineer'),
        ('Civil Engineer'),
        ('Lawyer'),
        ('Business'),
        ('Design'),
        ('Music');

INSERT INTO role (title,salary,department_id)
VALUES ('Web Developer',100000,1),
        ('Surveyor',100000,2),
        ('solicitor',100000,3),
        ('Sales Representative',100000,4),
        ('Architecture',100000,5),
        ('Rapper',100000,6),
        ('Web Developer',100000,1),
        ('Web Developer',100000,1),
        ('Web Developer',100000,1),
        ('Web Developer',100000,1),
        ('Web Developer',100000,1);

INSERT INTO employee (first_name,last_name,role_id, manager_id)
VALUES ('kevin','peng',1,1),
        ('bob','bob',2,2),
        ('andres','rob',1,1),
        ('anthony','hib',3,1),
        ('dwayne','bob',4,2),
        ('rock','peter',2,1),
        ('paul','tang',4,1),
        ('quincy','fang',3,1),
        ('david','ling',1,NULL);