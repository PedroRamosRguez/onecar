SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `onecar` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `onecar` ;

-- -----------------------------------------------------
-- Table `onecar`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onecar`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellidos` VARCHAR(45) NOT NULL,
  `Username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Edad` INT NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Sexo` VARCHAR(10) NOT NULL,
  `Vehiculo` VARCHAR(2) NOT NULL,
  `Tipo_Usuario` VARCHAR(45) NOT NULL,
  `Zona` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `onecar`.`Trayectos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `onecar`.`Trayectos` (
  `idTrayectos` INT NOT NULL AUTO_INCREMENT,
  `Zona` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTrayectos`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
