/* ============================================================
   FISZKI — terminy i koncepcje z sylabusa ISTQB CTFL v4.0
   Pola: ch (rozdział 1-6), pl (termin po polsku), en (termin EN),
         def (definicja/wyjaśnienie po polsku)
   ============================================================ */
window.FLASHCARDS = [
/* ---------- ROZDZIAŁ 1: Podstawy testowania ---------- */
{ch:1,pl:"Testowanie",en:"testing",def:"Zestaw czynności mających na celu wykrywanie defektów i ocenę jakości artefaktów oprogramowania. To nie tylko wykonywanie testów — obejmuje też planowanie, analizę, projektowanie itd. Może być statyczne lub dynamiczne."},
{ch:1,pl:"Przedmiot testów",en:"test object",def:"Artefakt poddawany testowaniu — komponent, system lub powiązany produkt pracy (np. dokument)."},
{ch:1,pl:"Cel testów",en:"test objective",def:"Powód testowania, np.: ocena produktów pracy, wywoływanie awarii i wykrywanie defektów, zapewnienie pokrycia, obniżanie ryzyka, weryfikacja i walidacja wymagań, budowanie zaufania, dostarczanie informacji interesariuszom."},
{ch:1,pl:"Weryfikacja",en:"verification",def:"Sprawdzenie, czy system spełnia określone wymagania (specyfikację). Pytanie: „czy zbudowaliśmy produkt zgodnie ze specyfikacją?”."},
{ch:1,pl:"Walidacja",en:"validation",def:"Sprawdzenie, czy system spełnia potrzeby użytkowników i interesariuszy w środowisku operacyjnym. Pytanie: „czy zbudowaliśmy właściwy produkt?”."},
{ch:1,pl:"Debugowanie",en:"debugging",def:"Czynność NIEbędąca testowaniem: znajdowanie, analiza i usuwanie przyczyn awarii. Proces: reprodukcja awarii → diagnoza (przyczyna źródłowa) → naprawa."},
{ch:1,pl:"Pomyłka",en:"error / mistake",def:"Działanie człowieka dające błędny wynik. Pomyłka prowadzi do defektu. Ludzie popełniają pomyłki m.in. z presji czasu, złożoności, zmęczenia lub braku szkolenia."},
{ch:1,pl:"Defekt",en:"defect / fault / bug",def:"Niedoskonałość lub brak w produkcie pracy (kodzie, dokumentacji), który — gdy zostanie wykonany — może spowodować awarię. Skutek pomyłki."},
{ch:1,pl:"Awaria",en:"failure",def:"Zdarzenie, w którym komponent lub system nie wykonuje wymaganej funkcji w granicach określonych wymagań. Objaw defektu uruchomionego podczas działania. Może też wynikać z warunków środowiskowych (np. promieniowania)."},
{ch:1,pl:"Przyczyna źródłowa",en:"root cause",def:"Fundamentalny powód wystąpienia problemu (np. sytuacja prowadząca do pomyłki). Identyfikowana przez analizę przyczyny źródłowej, by zapobiec podobnym defektom/awariom."},
{ch:1,pl:"Zapewnianie jakości",en:"quality assurance (QA)",def:"Podejście zorientowane na proces, prewencyjne — skupione na ustanawianiu i doskonaleniu procesów (dobry proces → dobry produkt). Odpowiedzialność każdego w projekcie."},
{ch:1,pl:"Kontrola jakości",en:"quality control (QC)",def:"Podejście zorientowane na produkt, korygujące — skupione na osiąganiu odpowiedniego poziomu jakości. Testowanie jest główną formą QC (inne: metody formalne, symulacje, prototypowanie)."},
{ch:1,pl:"Siedem zasad testowania",en:"7 testing principles",def:"1) Testowanie pokazuje obecność, nie brak defektów. 2) Testowanie pełne jest niewykonalne. 3) Wczesne testowanie oszczędza czas i pieniądze. 4) Defekty występują w skupiskach. 5) Testy się zużywają (paradoks pestycydów). 6) Testowanie zależy od kontekstu. 7) Błędne przekonanie o braku błędów."},
{ch:1,pl:"Podstawa testów",en:"test basis",def:"Źródło informacji, na podstawie którego tworzy się testy: wymagania, specyfikacje, historyjki użytkownika, modele, kod, doświadczenie."},
{ch:1,pl:"Warunek testowy",en:"test condition",def:"Aspekt przedmiotu testów istotny do przetestowania. Wynik analizy testów — odpowiada na pytanie „co testować?”."},
{ch:1,pl:"Przypadek testowy",en:"test case",def:"Zbiór warunków wstępnych, danych wejściowych, oczekiwanych wyników i warunków końcowych. Wynik projektowania testów — odpowiada na pytanie „jak testować?”."},
{ch:1,pl:"Pokrycie",en:"coverage",def:"Stopień, w jakim określone elementy pokrycia zostały wykonane przez zestaw testów, wyrażony w procentach."},
{ch:1,pl:"Element pokrycia",en:"coverage item",def:"Atrybut wyprowadzony z techniki testowania, który jest mierzony przez pokrycie (np. instrukcja, gałąź, klasa równoważności)."},
{ch:1,pl:"Dane testowe",en:"test data",def:"Dane potrzebne do wykonania przypadków testowych (tworzone w implementacji testów)."},
{ch:1,pl:"Procedura testowa",en:"test procedure",def:"Sekwencja przypadków testowych wraz z czynnościami niezbędnymi do ich wykonania. Przypadki łączy się w zestawy testów (test suites)."},
{ch:1,pl:"Testalia",en:"testware",def:"Produkty pracy wytwarzane w czynnościach testowych: plany testów, przypadki, warunki, dane, skrypty, procedury, logi, raporty."},
{ch:1,pl:"Czynności testowe",en:"test activities",def:"Planowanie; monitorowanie i nadzór; analiza („co testować”); projektowanie („jak testować”); implementacja; wykonywanie; ukończenie. Często iteracyjne i równoległe."},
{ch:1,pl:"Identyfikowalność",en:"traceability",def:"Powiązania między elementami podstawy testów, testaliami, wynikami testów i defektami. Wspiera ocenę pokrycia, analizę wpływu zmian, audyty oraz zrozumiałe raportowanie."},
{ch:1,pl:"Rola zarządzania testami",en:"test management role",def:"Odpowiedzialność za proces testowy, zespół i przywództwo. Skupia się na planowaniu, monitorowaniu i nadzorze oraz ukończeniu testów."},
{ch:1,pl:"Rola testowania",en:"testing role",def:"Odpowiedzialność za techniczny (inżynierski) aspekt testowania. Skupia się na analizie, projektowaniu, implementacji i wykonywaniu testów."},
{ch:1,pl:"Podejście całego zespołu",en:"whole team approach",def:"Praktyka z Programowania Ekstremalnego (XP): każdy członek zespołu z odpowiednimi umiejętnościami może wykonać każde zadanie, a za jakość odpowiadają wszyscy. Współlokalizacja sprzyja komunikacji i synergii."},
{ch:1,pl:"Niezależność testowania",en:"independence of testing",def:"Testy projektowane przez osobę inną niż autor produktu. Im większa niezależność, tym łatwiej wykryć różne defekty (inne spojrzenie), ale rośnie ryzyko gorszej komunikacji i izolacji."},
{ch:1,pl:"Umiejętności ogólne testera",en:"generic skills",def:"Wiedza o testowaniu; skrupulatność, ciekawość, dbałość o szczegóły; komunikacja, aktywne słuchanie, praca zespołowa; myślenie analityczne i krytyczne, kreatywność; wiedza techniczna; wiedza dziedzinowa."},

/* ---------- ROZDZIAŁ 2: Testowanie w cyklu życia ---------- */
{ch:2,pl:"Cykl życia oprogramowania",en:"SDLC",def:"Sposób organizacji wytwarzania (sekwencyjny, iteracyjny, przyrostowy). Wpływa na to, kiedy i jak testujemy: zakres, czas, poziomy, techniki i dokumentację testów."},
{ch:2,pl:"Model sekwencyjny",en:"sequential model",def:"Np. model kaskadowy lub V. Każda faza zaczyna się po poprzedniej. Kod powstaje późno, więc testowanie dynamiczne jest ograniczone do późniejszych faz; testowanie statyczne można robić wcześnie."},
{ch:2,pl:"Modele iteracyjny i przyrostowy",en:"iterative & incremental",def:"System powstaje w iteracjach/przyrostach; każdy przyrost wymaga testowania statycznego i dynamicznego na wielu poziomach. Częste dostarczanie wymaga intensywnej regresji (najlepiej automatycznej)."},
{ch:2,pl:"Wytwarzanie sterowane testami",en:"TDD (test-driven development)",def:"Podejście „najpierw test”: piszesz test (zorientowany na kod), zanim powstanie kod, który ma go zaliczyć. Cykl: test → kod → refaktoryzacja."},
{ch:2,pl:"Wytwarzanie sterowane testami akceptacyjnymi",en:"ATDD",def:"Testy tworzone z kryteriów akceptacji w ramach projektowania, sterują wytwarzaniem oprogramowania. Podejście oparte na współpracy całego zespołu."},
{ch:2,pl:"Wytwarzanie sterowane zachowaniem",en:"BDD (behavior-driven development)",def:"Testy zapisuje się w formacie given/when/then (zakładając/kiedy/wtedy), opisując pożądane zachowanie; ułatwia zrozumienie i automatyzację."},
{ch:2,pl:"DevOps",en:"DevOps",def:"Podejście łączące wytwarzanie i operacje, z CI/CD. Zalety: szybsze wydania, szybka informacja zwrotna o jakości kodu, automatyczna regresja, stała dostępność oprogramowania. Ryzyko: pominięcie wartości testów manualnych, koszt frameworka automatyzacji."},
{ch:2,pl:"Przesunięcie w lewo",en:"shift-left",def:"Wcześniejsze rozpoczynanie testowania w cyklu życia (np. wczesne przeglądy wymagań, TDD, wczesne testy niefunkcjonalne), aby tańsze było wykrywanie i usuwanie defektów."},
{ch:2,pl:"Retrospektywa",en:"retrospective",def:"Spotkanie na koniec iteracji/wydania, na którym zespół identyfikuje, co poszło dobrze/źle, i ustala usprawnienia. Wspiera ciągłe doskonalenie procesu."},
{ch:2,pl:"Poziom testów",en:"test level",def:"Grupa czynności testowych zorganizowana i zarządzana wspólnie. Poziomy: testowanie komponentów, integracji komponentów, systemowe, integracji systemów, akceptacyjne."},
{ch:2,pl:"Testowanie komponentów",en:"component / unit testing",def:"Testowanie pojedynczych komponentów w izolacji. Często wykonywane przez programistów; wykrywa defekty w logice modułu."},
{ch:2,pl:"Testowanie integracji komponentów",en:"component integration testing",def:"Testowanie interakcji i interfejsów między komponentami systemu (np. UI ↔ baza danych). Wykrywa defekty w komunikacji między komponentami."},
{ch:2,pl:"Testowanie systemowe",en:"system testing",def:"Testowanie zachowania i możliwości całego systemu, w tym testy niefunkcjonalne (np. bezpieczeństwa). Podstawą są specyfikacje systemu; często niezależny zespół."},
{ch:2,pl:"Testowanie integracji systemów",en:"system integration testing",def:"Testowanie interfejsów testowanego systemu z innymi systemami i usługami zewnętrznymi."},
{ch:2,pl:"Testowanie akceptacyjne",en:"acceptance testing",def:"Sprawdzenie gotowości do użycia i zgodności z potrzebami biznesowymi użytkownika. Podstawą są potrzeby biznesowe. Typy: UAT, operacyjne, kontraktowe/regulacyjne, alfa, beta."},
{ch:2,pl:"Typ testów",en:"test type",def:"Grupa czynności testowych nastawiona na konkretne charakterystyki jakości. Główne: funkcjonalne (co system robi) i niefunkcjonalne (jak dobrze)."},
{ch:2,pl:"Testowanie funkcjonalne",en:"functional testing",def:"Sprawdza, CO system robi — zgodność z wymaganiami funkcjonalnymi (funkcje, zachowanie)."},
{ch:2,pl:"Testowanie niefunkcjonalne",en:"non-functional testing",def:"Sprawdza, JAK DOBRZE system działa — charakterystyki jakości: wydajność, użyteczność, niezawodność, bezpieczeństwo, kompatybilność, pielęgnowalność, przenośność."},
{ch:2,pl:"Testowanie czarnoskrzynkowe",en:"black-box testing",def:"Oparte na specyfikacji — sprawdza zachowanie zewnętrzne bez znajomości wewnętrznej struktury."},
{ch:2,pl:"Testowanie białoskrzynkowe",en:"white-box testing",def:"Oparte na strukturze — wykorzystuje wewnętrzną strukturę i implementację (np. przepływ sterowania, kod)."},
{ch:2,pl:"Testowanie potwierdzające",en:"confirmation testing",def:"Po naprawie defektu — sprawdza, czy defekt został poprawnie usunięty (czy awaria już nie występuje)."},
{ch:2,pl:"Testowanie regresji",en:"regression testing",def:"Sprawdza, czy zmiany (w kodzie lub środowisku) nie wywołały negatywnych skutków w niezmienionych częściach oprogramowania. Dobry kandydat do automatyzacji."},
{ch:2,pl:"Testowanie pielęgnacyjne",en:"maintenance testing",def:"Testowanie zmian w systemie już działającym. Wyzwalacze: modyfikacje/ulepszenia, migracja danych/środowiska, wycofanie (retirement) systemu — w tym testy migracji i archiwizacji danych."},

/* ---------- ROZDZIAŁ 3: Testowanie statyczne ---------- */
{ch:3,pl:"Testowanie statyczne",en:"static testing",def:"Ocena produktów pracy BEZ uruchamiania kodu. Obejmuje przeglądy (ręczne) i analizę statyczną (narzędziowa). Wykrywa defekty bezpośrednio (nie awarie)."},
{ch:3,pl:"Testowanie dynamiczne",en:"dynamic testing",def:"Ocena z uruchomieniem oprogramowania. Wywołuje awarie spowodowane defektami; sprawdza zachowanie zewnętrzne."},
{ch:3,pl:"Analiza statyczna",en:"static analysis",def:"Narzędziowa ocena kodu lub innych produktów pracy bez wykonywania, wykrywająca m.in. odstępstwa od standardów kodowania, kod nieosiągalny, luki bezpieczeństwa."},
{ch:3,pl:"Anomalia",en:"anomaly",def:"Każdy stan odbiegający od oczekiwań, wykryty w trakcie przeglądu lub testowania. Może być defektem, ale wymaga jeszcze analizy/decyzji."},
{ch:3,pl:"Przegląd",en:"review",def:"Statyczna ocena produktu pracy przez ludzi w celu wykrycia anomalii (np. defektów) i poprawy jakości. Może być nieformalny lub formalny."},
{ch:3,pl:"Wartość testowania statycznego",en:"value of static testing",def:"Wczesne wykrywanie defektów (taniej je naprawić), wykrywanie defektów nie do złapania testowaniem dynamicznym (np. kod nieosiągalny), wykrywanie luk i niespójności w wymaganiach."},
{ch:3,pl:"Korzyści wczesnej informacji zwrotnej",en:"early & frequent feedback",def:"Wczesna i częsta informacja zwrotna od interesariuszy: szybkie komunikowanie problemów z jakością, zapobieganie nieporozumieniom co do wymagań, szybsze uwzględnianie zmian."},
{ch:3,pl:"Czynności procesu przeglądu",en:"review process activities",def:"1) Planowanie. 2) Inicjowanie przeglądu (dostęp do produktu, role). 3) Przegląd indywidualny (wykrywanie anomalii). 4) Komunikacja i analiza (omówienie anomalii, decyzje). 5) Ustalenie i raportowanie."},
{ch:3,pl:"Role w przeglądzie",en:"roles in reviews",def:"Kierownik (decyduje, co przeglądać, zapewnia zasoby), autor (twórca produktu), facylitator/moderator (sprawne spotkanie, bezpieczne środowisko), lider przeglądu (ogólna odpowiedzialność, organizacja), protokolant (zapisuje), recenzent."},
{ch:3,pl:"Przegląd nieformalny",en:"informal review",def:"Najmniej sformalizowany: brak zdefiniowanego procesu i dokumentacji wyników. Cel: szybkie wykrycie anomalii niskim kosztem."},
{ch:3,pl:"Przejrzenie",en:"walkthrough",def:"Przegląd prowadzony przez autora produktu pracy. Cele: ocena jakości, budowanie zaufania, edukacja uczestników, generowanie pomysłów. Może mieć protokolanta i indywidualne przygotowanie."},
{ch:3,pl:"Przegląd techniczny",en:"technical review",def:"Przegląd prowadzony przez wykwalifikowanych recenzentów (peers), zwykle z moderatorem. Cele: podjęcie decyzji technicznych, wykrycie anomalii, ocena jakości."},
{ch:3,pl:"Inspekcja",en:"inspection",def:"Najbardziej sformalizowany przegląd, wg zdefiniowanego procesu, z metrykami. Prowadzona przez moderatora (NIE autora), z protokolantem. Cele: wykrycie maksimum anomalii, ocena jakości, doskonalenie procesu."},
{ch:3,pl:"Czynniki sukcesu przeglądów",en:"review success factors",def:"Jasne cele, odpowiedni typ przeglądu i ludzie, dzielenie dużych produktów na części, odpowiedni czas, wsparcie kierownictwa, kultura uczenia się i obiektywnego, rzeczowego podejścia (bez atakowania osób)."},

/* ---------- ROZDZIAŁ 4: Analiza i projektowanie testów ---------- */
{ch:4,pl:"Technika testowania",en:"test technique",def:"Systematyczny sposób wyprowadzania przypadków testowych. Kategorie: czarnoskrzynkowe (oparte na specyfikacji), białoskrzynkowe (oparte na strukturze), oparte na doświadczeniu."},
{ch:4,pl:"Techniki czarnoskrzynkowe",en:"black-box techniques",def:"Oparte na analizie specyfikacji bez odwołania do struktury. Należą tu: podział na klasy równoważności, analiza wartości brzegowych, tablice decyzyjne, testowanie przejść stanów."},
{ch:4,pl:"Techniki białoskrzynkowe",en:"white-box techniques",def:"Oparte na strukturze przedmiotu testów (kod, przepływ sterowania). Należą tu: testowanie i pokrycie instrukcji oraz testowanie i pokrycie gałęzi."},
{ch:4,pl:"Techniki oparte na doświadczeniu",en:"experience-based techniques",def:"Wykorzystują wiedzę i doświadczenie testera. Należą tu: zgadywanie błędów, testowanie eksploracyjne, testowanie oparte na liście kontrolnej."},
{ch:4,pl:"Podział na klasy równoważności",en:"equivalence partitioning (EP)",def:"Dziedzinę danych dzieli się na klasy, w których elementy są traktowane tak samo. Wystarczy przetestować jeden reprezentant z każdej klasy (poprawnej i niepoprawnej). Pokrycie = przetestowane klasy / wszystkie klasy."},
{ch:4,pl:"Analiza wartości brzegowych",en:"boundary value analysis (BVA)",def:"Testowanie wartości na granicach klas równoważności (uporządkowanych). 2-punktowa: granica i jej najbliższy sąsiad z drugiej strony. 3-punktowa: granica oraz oba jej sąsiady."},
{ch:4,pl:"Testowanie tablic decyzyjnych",en:"decision table testing",def:"Modeluje kombinacje warunków i odpowiadające im akcje. Każda kolumna to reguła. Pokrycie = pokryte reguły / wszystkie reguły. Wykrywa błędy w regułach logiki biznesowej."},
{ch:4,pl:"Testowanie przejść stanów",en:"state transition testing",def:"Modeluje stany systemu, zdarzenia i przejścia. Pokrycie przejść = przetestowane prawidłowe przejścia / wszystkie prawidłowe przejścia."},
{ch:4,pl:"Pokrycie instrukcji",en:"statement coverage",def:"Pokrycie = wykonane instrukcje / wszystkie wykonywalne instrukcje. 100% oznacza, że każda instrukcja (także zawierająca defekt) została wykonana co najmniej raz."},
{ch:4,pl:"Pokrycie gałęzi",en:"branch coverage",def:"Pokrycie = wykonane gałęzie / wszystkie gałęzie. 100% pokrycia gałęzi implikuje 100% pokrycia instrukcji (nie odwrotnie) oraz wykonanie wszystkich wyników decyzji."},
{ch:4,pl:"Wartość testowania białoskrzynkowego",en:"value of white-box testing",def:"Uwzględnia całą implementację; obiektywne miary pokrycia pozwalają dobrać dodatkowe testy. Słabość: nie wykryje brakującej implementacji wymagań (opiera się tylko na strukturze)."},
{ch:4,pl:"Zgadywanie błędów",en:"error guessing",def:"Przewidywanie defektów na podstawie wiedzy i doświadczenia o typowych pomyłkach programistów i defektach z przeszłości (czasem z listami kontrolnymi)."},
{ch:4,pl:"Testowanie eksploracyjne",en:"exploratory testing",def:"Jednoczesne uczenie się, projektowanie i wykonywanie testów (często sterowane kartami testów). Przydatne przy słabych/brakujących specyfikacjach lub presji czasu; skuteczniejsze z doświadczonym testerem."},
{ch:4,pl:"Testowanie oparte na liście kontrolnej",en:"checklist-based testing",def:"Tester sprawdza systematycznie warunki testowe z wcześniej przygotowanej listy kontrolnej (np. najlepszych praktyk UI)."},
{ch:4,pl:"Podejścia oparte na współpracy",en:"collaboration-based approaches",def:"Nastawione na zapobieganie defektom przez współpracę: wspólne pisanie historyjek, kryteria akceptacji, ATDD."},
{ch:4,pl:"Wspólne pisanie historyjek",en:"collaborative user story writing",def:"Wszyscy interesariusze tworzą historyjki wspólnie (wspólna wizja). Dobra historyjka: INVEST (niezależna, negocjowalna, wartościowa, estymowalna, mała, testowalna). Model 3C: karta, rozmowa, potwierdzenie."},
{ch:4,pl:"Kryteria akceptacji",en:"acceptance criteria",def:"Warunki, które historyjka musi spełnić, by uznać ją za ukończoną. Formaty: zorientowany na scenariusz (given/when/then) oraz zorientowany na reguły (lista punktów / tabela)."},

/* ---------- ROZDZIAŁ 5: Zarządzanie działaniami testowymi ---------- */
{ch:5,pl:"Plan testów",en:"test plan",def:"Dokument opisujący cele, zasoby i harmonogram testów oraz podejście do testów. Zawiera m.in. kontekst, podejście, kryteria, harmonogram. Wspiera myślenie o testowaniu i komunikację."},
{ch:5,pl:"Wkład testera w planowanie iteracji i wydań",en:"iteration & release planning",def:"Testerzy m.in. uczestniczą w identyfikacji i ocenie ryzyk historyjek, definiują testowalne kryteria akceptacji, estymują pracochłonność testów, pomagają priorytetyzować."},
{ch:5,pl:"Kryteria wejścia",en:"entry criteria",def:"Warunki, które muszą być spełnione, by rozpocząć daną czynność (np. gotowość środowiska, dostępność testowalnych wymagań). Tzw. „definition of ready”."},
{ch:5,pl:"Kryteria wyjścia",en:"exit criteria",def:"Warunki, które muszą być spełnione, by zakończyć czynność (np. osiągnięta gęstość defektów, zautomatyzowana regresja, brak krytycznych defektów). Tzw. „definition of done”."},
{ch:5,pl:"Estymacja trójpunktowa",en:"three-point estimation",def:"E = (optymistyczna + 4·najbardziej prawdopodobna + pesymistyczna) / 6. Daje wartość oczekiwaną i miarę niepewności."},
{ch:5,pl:"Poker planistyczny",en:"planning poker",def:"Technika estymacji oparta na konsensusie (wariant szerokopasmowej Delphi): członkowie szacują kartami; przy małym rozrzucie można przyjąć np. wartość z największą liczbą głosów."},
{ch:5,pl:"Techniki estymacji",en:"estimation techniques",def:"M.in.: oparta na proporcjach (np. testy = 10% kosztu wytwarzania), ekstrapolacja, szerokopasmowa Delphi (w tym poker planistyczny), estymacja trójpunktowa."},
{ch:5,pl:"Priorytetyzacja przypadków testowych",en:"test case prioritization",def:"Ustalanie kolejności wykonywania. Strategie: oparta na ryzyku, na pokryciu, na wymaganiach. Uwzględnia też zależności logiczne między przypadkami."},
{ch:5,pl:"Piramida testów",en:"test pyramid",def:"Model: więcej testów na niższych poziomach (szybkich, tanich — komponenty, automatyzacja przez API), mniej na wyższych (system/akceptacja — narzędzia GUI). Szybka informacja zwrotna u podstawy."},
{ch:5,pl:"Kwadranty zwinnego testowania",en:"testing quadrants",def:"Q1: zorientowane na technologię, wspierające zespół (np. testy komponentów, integracji). Q2: zorientowane na biznes, wspierające zespół (np. funkcjonalne). Q3: zorientowane na biznes, krytykujące produkt (np. użyteczność, akceptacyjne). Q4: zorientowane na technologię, krytykujące produkt (np. wydajność, niezawodność)."},
{ch:5,pl:"Ryzyko",en:"risk",def:"Potencjalne zdarzenie o negatywnych skutkach. Poziom ryzyka = prawdopodobieństwo × wpływ. Prawdopodobieństwo i wpływ są niezależne."},
{ch:5,pl:"Ryzyko produktowe vs projektowe",en:"product vs project risk",def:"Ryzyko produktowe — dotyczy jakości produktu (np. zła wydajność, niezgodność ze standardami). Ryzyko projektowe — dotyczy zarządzania projektem (np. utrata testerów, opóźnienia, błędne oczekiwania interesariuszy)."},
{ch:5,pl:"Testowanie oparte na ryzyku",en:"risk-based testing",def:"Wykorzystanie analizy ryzyka do ustalenia dokładności, zakresu i kolejności testowania — najwyższe ryzyka testuje się najwcześniej i najdokładniej."},
{ch:5,pl:"Zarządzanie ryzykiem",en:"risk management",def:"Identyfikacja ryzyk, ich ocena (analiza), kontrola: łagodzenie (mitygacja), akceptacja, transfer, plan awaryjny — oraz monitorowanie ryzyk."},
{ch:5,pl:"Łagodzenie ryzyka",en:"risk mitigation",def:"Działania obniżające poziom ryzyka, np. testowanie odpowiada na ryzyka produktowe (wykrycie defektów obniża ryzyko)."},
{ch:5,pl:"Monitorowanie i nadzór nad testami",en:"test monitoring & control",def:"Monitorowanie — bieżące porównywanie postępu z planem (metryki). Nadzór — podejmowanie działań korygujących, by osiągnąć cele testów."},
{ch:5,pl:"Ukończenie testów",en:"test completion",def:"Czynności na kamieniach milowych (wydanie, koniec iteracji): archiwizacja testaliów, wnioski (lessons learned), raport ukończenia, zgłoszenia zmian."},
{ch:5,pl:"Metryki testowania",en:"testing metrics",def:"Kategorie: metryki postępu projektu, postępu testów, jakości produktu, defektów, ryzyka, pokrycia, kosztów. Np. gęstość defektów = liczba defektów / rozmiar produktu pracy."},
{ch:5,pl:"Raport postępu testów",en:"test progress report",def:"Bieżąca komunikacja statusu w trakcie cyklu: postęp, przeszkody, nowe ryzyka, metryki. Dla biznesu istotne są informacje wysokopoziomowe, nie techniczne (np. pokrycie gałęzi)."},
{ch:5,pl:"Raport ukończenia testów",en:"test completion report",def:"Podsumowanie po zakończeniu poziomu testów/iteracji/projektu: co przetestowano, wyniki, odstępstwa, ryzyko resztkowe, wnioski."},
{ch:5,pl:"Zarządzanie konfiguracją",en:"configuration management (CM)",def:"Identyfikacja i kontrola wersji elementów konfiguracji (w tym testaliów i środowisk). Zapewnia spójność i integralność; np. wersjonowanie skryptów testowych."},
{ch:5,pl:"Zarządzanie defektami",en:"defect management",def:"Proces rozpoznawania, rejestrowania, klasyfikowania, badania, rozwiązywania i zamykania defektów."},
{ch:5,pl:"Raport o defekcie",en:"defect report",def:"Powinien zawierać m.in.: identyfikator, tytuł i opis (kroki, wynik oczekiwany i faktyczny), datę, autora, status, severity (dotkliwość) i priorytet, środowisko testowe, element testowy/wersję, odniesienia (np. do wymagania)."},
{ch:5,pl:"Severity vs priorytet",en:"severity vs priority",def:"Severity (dotkliwość) — jak poważny jest wpływ defektu na działanie. Priorytet — jak pilna jest naprawa (z perspektywy biznesowej). Są niezależne."},

/* ---------- ROZDZIAŁ 6: Narzędzia wspomagające testowanie ---------- */
{ch:6,pl:"Kategorie narzędzi testowych",en:"tool categories",def:"M.in.: narzędzia zarządzania (testami, wymaganiami, defektami, konfiguracją), narzędzia testowania statycznego, projektowania i przygotowania danych testowych, wykonywania testów (frameworki, pokrycie), testów niefunkcjonalnych, DevOps, współpracy, skalowalności/standaryzacji wdrożeń (np. maszyny wirtualne, konteneryzacja)."},
{ch:6,pl:"Automatyzacja testów",en:"test automation",def:"Użycie narzędzi do wykonywania testów i porównywania wyników. Najlepsza dla powtarzalnych, stabilnych testów (np. regresja)."},
{ch:6,pl:"Korzyści automatyzacji",en:"benefits of automation",def:"Oszczędność czasu na powtarzalnych zadaniach, eliminacja prostych ludzkich pomyłek, spójność i powtarzalność, obiektywne miary (np. pokrycie kodu zbyt złożone do ręcznego wyliczenia), szybszy dostęp do informacji o testach."},
{ch:6,pl:"Ryzyka automatyzacji",en:"risks of automation",def:"Nierealistyczne oczekiwania, niedoszacowany wysiłek na utrzymanie testaliów, nadmierne poleganie na narzędziu, problemy z dostawcą narzędzia, zaniedbanie testów manualnych. Automatyzacja nie zastępuje krytycznego myślenia."}
];

/* ============================================================
   SILNIK FISZEK + przełączanie zakładek
   ============================================================ */
(function(){
  const FC = window.FLASHCARDS;
  const FK = "istqb_flashcards_known";
  const CHN = (typeof CH_NAMES!=="undefined") ? CH_NAMES : {1:"Rozdział 1",2:"Rozdział 2",3:"Rozdział 3",4:"Rozdział 4",5:"Rozdział 5",6:"Rozdział 6"};
  const $ = id => document.getElementById(id);
  let known = load();
  let fview=[], fi=0, revealed=false;

  function load(){ try{ return JSON.parse(localStorage.getItem(FK)) || {}; }catch(e){ return {}; } }
  function save(){ localStorage.setItem(FK, JSON.stringify(known)); }
  function key(c){ return c.ch+"|"+c.en+"|"+c.pl; }
  function isKnown(c){ return !!known[key(c)]; }

  /* --- filtr rozdziałów --- */
  (function(){
    const sel=$("fcChapter");
    const o0=document.createElement("option"); o0.value="all"; o0.textContent="Wszystkie rozdziały"; sel.appendChild(o0);
    for(let ch=1;ch<=6;ch++){ const o=document.createElement("option"); o.value=String(ch);
      o.textContent=CHN[ch]+"  ("+FC.filter(c=>c.ch===ch).length+")"; sel.appendChild(o); }
  })();

  function buildFView(reset){
    const ch=$("fcChapter").value, rep=$("fcOnlyRepeat").checked;
    fview = FC.filter(c=>{
      if(ch!=="all" && c.ch!==Number(ch)) return false;
      if(rep && isKnown(c)) return false;
      return true;
    });
    if($("fcShuffle").checked) fview = shuffleF(fview);
    if(reset || fi>=fview.length) fi=0;
    revealed=false;
    renderFlash(); updateFStats();
  }
  function shuffleF(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }

  function renderFlash(){
    const card=$("flash");
    if(!fview.length){
      $("fcCat").textContent=""; $("fcKnown").textContent="";
      $("fcFront").textContent = $("fcOnlyRepeat").checked ? "🎉 Wszystkie fiszki w tym filtrze oznaczone jako „Umiem”!" : "Brak fiszek dla wybranego filtra.";
      $("fcEn").textContent=""; $("fcBack").textContent=""; card.classList.remove("revealed");
      $("fcCounter").textContent="0 / 0";
      return;
    }
    const c=fview[fi];
    $("fcCat").textContent=CHN[c.ch];
    $("fcKnown").innerHTML = isKnown(c) ? '<span style="color:var(--ok)">✓ umiem</span>' : '<span style="color:var(--muted2)">do powtórki</span>';
    $("fcFront").textContent=c.pl;
    $("fcEn").textContent = c.en ? "ang. "+c.en : "";
    $("fcBack").textContent=c.def;
    card.classList.toggle("revealed", revealed);
    $("fcCounter").textContent=(fi+1)+" / "+fview.length;
    $("fcPrev").disabled = fi===0;
    $("fcNext").disabled = fi===fview.length-1;
  }
  function updateFStats(){
    const total=FC.length, kn=FC.filter(isKnown).length;
    $("fcStatKnown").textContent=kn+" / "+total;
    $("fcStatLeft").textContent=total-kn;
    $("fcStatPct").textContent=Math.round(kn/total*100)+"%";
  }

  function flip(){ if(!fview.length) return; revealed=!revealed; $("flash").classList.toggle("revealed",revealed); }
  function nextF(){ if(fi<fview.length-1){ fi++; revealed=false; renderFlash(); } }
  function prevF(){ if(fi>0){ fi--; revealed=false; renderFlash(); } }
  function mark(v){
    if(!fview.length) return;
    const c=fview[fi];
    if(v) known[key(c)]=true; else delete known[key(c)];
    save(); updateFStats();
    if($("fcOnlyRepeat").checked && v){ buildFView(false); }   // znika z puli do powtórki
    else if(fi<fview.length-1){ fi++; revealed=false; renderFlash(); }
    else { renderFlash(); }
  }

  /* zdarzenia */
  $("flash").onclick=flip;
  $("fcChapter").onchange=()=>buildFView(true);
  $("fcOnlyRepeat").onchange=()=>buildFView(true);
  $("fcShuffle").onchange=()=>buildFView(true);
  $("fcPrev").onclick=prevF;
  $("fcNext").onclick=nextF;
  $("fcKnow").onclick=()=>mark(true);
  $("fcRepeat").onclick=()=>mark(false);
  $("fcReset").onclick=()=>{ if(confirm("Wyczyścić oznaczenia „Umiem” dla wszystkich fiszek?")){ known={}; save(); buildFView(true); } };

  /* klawiatura w trybie fiszek */
  document.addEventListener("keydown",e=>{
    if($("tabCards").classList.contains("hidden")) return;
    if(e.key===" "||e.key==="Enter"){ e.preventDefault(); flip(); }
    else if(e.key==="ArrowRight"){ e.preventDefault(); nextF(); }
    else if(e.key==="ArrowLeft"){ e.preventDefault(); prevF(); }
    else if(e.key.toLowerCase()==="u"){ e.preventDefault(); mark(true); }
    else if(e.key.toLowerCase()==="p"){ e.preventDefault(); mark(false); }
  });

  /* --- przełączanie zakładek: Oficjalne / Trening / Fiszki --- */
  let fviewBuilt=false;
  document.querySelectorAll(".tab").forEach(b=>{
    b.onclick=()=>{
      document.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on", x===b));
      const tab = b.dataset.tab;
      const isQuiz = (tab==="quiz"||tab==="practice"||tab==="exam");
      $("tabQuiz").classList.toggle("hidden", !isQuiz);
      $("tabCards").classList.toggle("hidden", tab!=="cards");
      $("tabPodcast").classList.toggle("hidden", tab!=="podcast");
      if((tab==="cards"||tab==="podcast") && typeof window.suspendExam==="function") window.suspendExam();
      if(tab==="cards"){
        if(!fviewBuilt){ fviewBuilt=true; buildFView(true); }
      } else if(tab==="podcast"){
        if(typeof window.initPodcast==="function") window.initPodcast();
      } else if(tab==="exam"){
        if(typeof window.enterExamTab==="function") window.enterExamTab();
      } else if(typeof window.switchPool==="function"){
        window.switchPool(tab==="practice" ? "practice" : "official");
      }
    };
  });
})();
