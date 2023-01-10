CREATE SCHEMA IF NOT EXISTS `shop`;

CREATE TABLE IF NOT EXISTS `shop`.`Produkt`
(   `id_produkt` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Nazwa` VARCHAR(50) NOT NULL,
    `Typ_produktu` VARCHAR(50) NOT NULL,
    `Pojemnosc` DECIMAL(5,2) NOT NULL,
    `Cena` DECIMAL(6,2) NOT NULL,
    `Opis` VARCHAR(100) NULL,
    PRIMARY KEY (`id_produkt`),
    UNIQUE INDEX `id_produkt_UNIQUE` (`id_produkt` ASC)
) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `shop`.`Producent`
(   `id_producent` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Nazwa_firmy` VARCHAR(50) NOT NULL,
    `Panstwo` VARCHAR(50) NOT NULL,
    `Miasto` VARCHAR(50) NOT NULL,
    `Telefon` VARCHAR(12) NOT NULL,
    `Email` VARCHAR(100) NULL,
    PRIMARY KEY (`id_producent`),
    UNIQUE INDEX `id_producent_UNIQUE` (`id_producent` ASC)
) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `shop`.`Zamowienie`
(   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `id_producent` INT UNSIGNED NOT NULL,
    `id_produkt` INT UNSIGNED NOT NULL,
    `Ilosc` INT NOT NULL,
    `Data_dostawy` DATE NOT NULL,
    `Komentarz` VARCHAR(50) NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_zamowienie_UNIQUE` (`id` ASC),
    CONSTRAINT `produkt_fk` FOREIGN KEY (`id_produkt`) REFERENCES `shop`.`Produkt`(`id_produkt`),
    CONSTRAINT `producent_fk` FOREIGN KEY (`id_producent`) REFERENCES `shop`.`Producent`(`id_producent`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;


INSERT IGNORE INTO `shop`.`Produkt` (`id_produkt`, `Nazwa`, `Typ_produktu`, `Pojemnosc`, `Cena`, `Opis`) VALUES
    (1, 'LushWow', 'Mascara', 5.0 , 50.0 , 'Black mascara for long lushes'),
    (2, 'Lip Stick Glow', 'Lipstick', 2.0 , 46.0 , 'Matte red lipstick');

INSERT IGNORE INTO `shop`.`Producent` (`id_producent`, `Nazwa_firmy`, `Panstwo`, `Miasto`, `Telefon`, `Email`) VALUES
    (1, 'Maybelline New York','USA', 'New York', '+48000000000', 'MayNY@post.com'),
    (2, 'KIKO Milano','Italy', 'Milan', '+39000000000', 'kiko@dot.com');

INSERT IGNORE INTO `shop`.`Zamowienie` (`id`, `id_produkt`,`id_producent`, `Ilosc`, `Data_dostawy`, `Komentarz`) VALUES
    (1,1,1,18,'2022-02-10','Shipping delayed'),
    (2,2,2,150,'2022-09-11', null);
