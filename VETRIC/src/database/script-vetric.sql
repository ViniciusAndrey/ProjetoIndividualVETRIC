CREATE DATABASE vetric;

USE vetric;


CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table ranking (
	id INT PRIMARY KEY AUTO_INCREMENT,
	pontuação int,
    dt datetime default current_timestamp,
    fk_usuario int,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

drop table aquario;
drop table medida;

select * from usuario;
select * from aviso;
select * from ranking;

insert into ranking (pontuacao, fk_usuario) values (4, 13);