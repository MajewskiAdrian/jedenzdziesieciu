-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 10:09 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `1z10`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `answer_text` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `answer_text`) VALUES
(1, 'JAN KOCHANOWSKI'),
(2, 'ROLAND'),
(3, 'EDYP'),
(4, 'STAROSTA GADULSKI'),
(5, 'LADY MAKBET'),
(6, 'ARYSTOTELES'),
(7, 'TRISTAN'),
(8, 'BLAISE PASCAL'),
(9, 'PIOTR SKARGA'),
(10, 'WERTER'),
(11, 'IGNACY RZECKI'),
(12, 'OFELIA'),
(13, 'ANTENOR'),
(14, 'STANISŁAW STASZIC'),
(15, 'IMMANUEL KANT'),
(16, 'EDEK'),
(17, 'OJCIEC PANELOUX'),
(18, 'WINSTON SMITH'),
(19, 'FIODOR DOSTOJEWSKI'),
(20, 'ALBERT CAMUS'),
(21, 'KONRAD WALLENROD / WALTER ALF'),
(22, 'CHOCHOŁ');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `chances` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `chances`, `score`) VALUES
(1, 'UCZESTNIK 1', 3, 0),
(2, 'UCZESTNIK 2', 3, 0),
(3, 'UCZESTNIK 3', 3, 0),
(4, 'UCZESTNIK 4', 3, 0),
(5, 'UCZESTNIK 5', 3, 0),
(6, 'UCZESTNIK 6', 3, 0),
(7, 'UCZESTNIK 7', 3, 0),
(8, 'UCZESTNIK 8', 3, 0),
(9, 'UCZESTNIK 9', 3, 0),
(10, 'UCZESTNIK 10', 3, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question_number` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `points` int(11) NOT NULL,
  `answer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question_number`, `question_text`, `points`, `answer_id`) VALUES
(1, 1, 'W jego wyjątkowej twórczości znajdziemy fraszki, treny i pieśni oraz tragedię humanistyczną „Odprawa posłów greckich”', 3, 1),
(2, 1, 'Dzięki studiom w Akademii Krakowskiej, a później w Królewcu i Padwie zdobył gruntowne wykształcenie', 2, 1),
(3, 1, 'Jego protektorem i przyjacielem był Piotr Myszkowski, któremu poświęcił jeden ze swoich utworów', 1, 1),
(4, 2, 'Według legendy aniołowie zabrali jego duszę do nieba w nagrodę za patriotyzm i walkę w obronie wiary', 3, 2),
(5, 2, 'Bohater chanson de geste (szansą de żest), właściciel Durendala, przyjaciel Oliwiera', 2, 2),
(6, 3, 'Przedstawiciel rodu Labdakidów, który bezskutecznie uciekał przed swoim losem', 3, 3),
(7, 3, 'Ojciec Eteoklesa i Polinika, a także Antygony i Ismeny', 2, 3),
(8, 4, 'Bohater dramatu napisanego w czasie obrad Sejmu Czteroletniego; przeciwnik postępowych reform, których zwolennikami są Podkomorzy i jego synowie', 3, 4),
(9, 4, 'Ojciec Teresy z komedii Juliana Ursyna Niemcewicza „Powrót posła”; dumny autor słów: Ja, co nigdy nie czytam, a przynajmniej mało, wiem, że tak jest najlepiej, jak przedtem bywało', 2, 4),
(10, 5, 'Przebiegła i bezwzględna, jednak nie na tyle, by unieść brzemię odpowiedzialności za zbrodnie, do których zachęcała męża', 3, 5),
(11, 5, 'To ona zaplanowała przebieg zabójstwa króla Dunkana i podrzuciła narzędzie zbrodni śpiącym służącym', 2, 5),
(12, 6, 'Był uczniem Platona, ale sprzeciwił się jego poglądom; stworzył materialistyczny system filozoficzny i teorię złotego środka', 3, 6),
(13, 6, 'Był nauczycielem Aleksandra Macedońskiego i autorem słynnej „Poetyki”', 2, 6),
(14, 7, 'Zabił Morhołta i pokonał smoka, a swemu wujowi – królowi Markowi – przywiózł z Irlandii jasnowłosą narzeczoną', 3, 7),
(15, 7, 'Jeden z rycerzy Okrągłego Stołu, bohater romansu rycerskiego zrekonstruowanego przez Josepha Bediera', 2, 7),
(16, 8, 'Filozof i matematyk, umieścił człowieka między nieskończonością a nicością jako trzcinę myślącą', 3, 8),
(17, 8, 'Jest autorem teorii, że warto wierzyć w Boga (tzw. zakładu)', 2, 8),
(18, 9, 'Nadworny kaznodzieja Zygmunta III Wazy, autor kazania „O miłości ku Ojczyźnie”, w którym porównywał ojczyznę do matki oraz tonącego okrętu', 3, 9),
(19, 9, 'Członek zakonu jezuitów, przeciwstawiał się reformacji, za cel postawił sobie kształtowanie postawy patriotycznej Polaków', 2, 9),
(20, 10, 'Bohater niemieckiej powieści epistolarnej, słaby psychicznie, jednocześnie nadmiernie uczuciowy, niezdolny do czynu, popełnił samobójstwo', 3, 10),
(21, 10, 'Jego ukochana została żoną Alberta', 2, 10),
(22, 11, 'Jeden z literackich idealistów, oddany swojej pracy w sklepie, prowadzący pamiętnik', 3, 11),
(23, 11, 'Wierny przyjaciel Stanisława Wokulskiego', 2, 11),
(24, 12, 'Postać fikcyjna z angielskiego dramatu; prawdopodobnie popełniła samobójstwo, rzucając się do wody', 3, 12),
(25, 12, 'Niezwykle piękna i wrażliwa dziewczyna, uległa i podporządkowana ojcu, popadła w obłęd po jego śmierci', 2, 12),
(26, 12, 'Siostra Laertesa, ukochana Hamleta, duńskiego królewicza', 1, 12),
(27, 13, 'Polityk trojański, wzór cnót obywatelskich, oszczędzony przez Greków po zdobyciu przez nich Troi', 3, 13),
(28, 13, 'Zwolennik oddania Heleny jej mężowi Menelaosowi, czego wymagały racja stanu i dobro Trojan', 2, 13),
(29, 13, 'Przeciwnik polityczny Parysa, jeden z głównych bohaterów „Odprawy posłów greckich”', 1, 13),
(30, 14, 'Polski działacz oświeceniowy, publicysta i filozof, a także pionier spółdzielczości, geograf i geolog', 3, 14),
(31, 14, 'Działał na rzecz poprawy położenia chłopów; był zwolennikiem Konstytucji 3 maja', 2, 14),
(32, 14, 'Autor broszur politycznych, m.in. „Przestróg dla Polski” i „Uwag nad życiem Jana Zamoyskiego”', 1, 14),
(33, 15, 'Pochodził z Królewca, gdzie spędził całe życie i gdzie przysłowiowa stała się jego punktualność, według której podobno można było regulować zegarki', 3, 15),
(34, 15, 'Jest twórcą takich pojęć, jak: noumen, sąd a priori, imperatyw kategoryczny', 2, 15),
(35, 15, 'To obok Kartezjusza główny przedstawiciel racjonalizmu oświeceniowego', 1, 15),
(36, 16, 'Bohater literacki dramatu rodzinnego, bezmyślny, prymitywny, prostacki w zachowaniu, pozbawiony zasad moralnych, osobnik w najwyższym stopniu mętny i podejrzany', 3, 16),
(37, 16, 'Stosuje brutalną siłę i zabija Artura', 2, 16),
(38, 17, 'Uczony i wojujący jezuita – znakomity kaznodzieja Oranu', 3, 17),
(39, 17, 'Uważa, że dżuma, która opanowała miasto, jest karą za grzechy ludzi', 2, 17),
(40, 18, 'Członek Partii Zewnętrznej, pracownik departamentu Archiwów Ministerstwa Prawdy', 3, 18),
(41, 18, 'Buntuje się przeciwko obowiązującej ideologii angsocu i ponosi klęskę', 2, 18),
(42, 18, 'Kocha Julię, ale zdradza ją podczas tortur', 1, 18),
(43, 19, 'Za zdradę wobec carskiego systemu zostaje skazany na cztery lata katorgi, po której odbyciu tworzy Wspomnienia z domu umarłych', 3, 19),
(44, 19, 'Do najważniejszych jego dzieł należą – Biesy, Zbrodnia i kara, Idiota', 2, 19),
(45, 20, 'Twórca francuskiej powieści – paraboli, w której opisuje miasto i ludzi w obliczu epidemii', 3, 20),
(46, 20, 'Propagator egzystencjalizmu w literaturze, autor m.in. takich dzieł – Obcy, Upadek, Dżuma', 2, 20),
(47, 21, 'Rycerz (pochodzący z Litwy), który tak ukochał swój kraj, że złamał etos rycerski i poświęcił szczęście osobiste', 3, 21),
(48, 21, 'Bohater romantycznej powieści Adama Mickiewicza, mąż Aldony i podopieczny Wajdeloty', 2, 21),
(49, 22, 'Przygrywa do tańca bronowickim gościom na skrzypcach / patykach, a oni w zamyśleniu i zasłuchaniu - tańczą', 3, 22),
(50, 22, 'Bohater dramatu Stanisława Wyspiańskiego, którego Isia wyrzuca z izby weselnej', 2, 22);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
