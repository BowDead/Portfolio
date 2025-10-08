const data = [
    { 
        "id": 1, 
        "caption": "Gra Snake", 
        "description": "Prosta gra napisana w języku Java, odtwarzająca klasyczny tytuł 'Snake' w wersji gridless. Użytkownik steruje wężem, zbiera punkty i unika kolizji ze ścianami, samym sobą lub wrogami." 
    },
    { 
        "id": 2, 
        "caption": "Symulator GOPR", 
        "description": "Symulacja ruchu turystów oraz zwierząt w górach pozwalająca na dużą customizację warunków symulacyjnych. Przeznaczona do testowania systemu analitycznego dla takich sygnałów" 
    },
    { 
        "id": 3, 
        "caption": "Zagadkomat", 
        "description": "Interaktywna aplikacja mobilna z zestawem zagadek logicznych obrazkowych. Użytkownik ma możliwość rozwiązywania zagadek o różnym poziomie trudności oraz tworzenia własnych." 
    },
    { 
        "id": 4, 
        "caption": "Rejestr GOPR", 
        "description": "System bazodanowy, którego zadaniem jest zapisywanie i przechowywanie zdarzeń, które wystąpiły podczas trwania symulacji." 
    },
    { 
        "id": 5, 
        "caption": "Wyświetlacz GOPR", 
        "description": "Aplikacja wizualizująca dane przechowywane w rejestrze GOPR w celu ich analizy lub modyfikacji. Napisana w Java Spring." 
    },
    { 
        "id": 6, 
        "caption": "Portfolio", 
        "description": "Interaktywne portfolio programistyczne prezentujące moje projekty oraz umiejętności. Aplikacja responsywna i estetyczna w miarę moich możliwości." 
    },
    { 
        "id": 7, 
        "caption": "Placeholder 1", 
        "description": "Wstępne miejsce na przyszły projekt, który zostanie dodany wkrótce. Obecnie w fazie koncepcyjnej." 
    },
    { 
        "id": 8, 
        "caption": "Placeholder 2", 
        "description": "Zarezerwowane na kolejny projekt – szczegóły wkrótce. Prace trwają nad prototypem." 
    },
    { 
        "id": 9, 
        "caption": "Placeholder 3", 
        "description": "Przygotowanie przestrzeni na nowy pomysł – więcej informacji już niebawem." 
    },
    { 
        "id": 10, 
        "caption": "Placeholder 4", 
        "description": "Sekcja dla przyszłych projektów w trakcie opracowywania. Szczegóły pojawią się po ukończeniu pierwszej wersji." 
    }
];

// Określenie liczby elementów na stronie
const itemsPerPage = 4;
// Inicjalizacja aktualnej strony
let currentPage = 1;

// Funkcja renderująca przyciski do zmiany stron
function renderPagination() {
    const totalPages = Math.ceil(data.length / itemsPerPage); // Obliczenie liczby stron
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Czyszczenie poprzednich przycisków

    // Tworzenie przycisków dla każdej strony
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        // Ustawienie klasy 'active' dla przycisku aktualnej strony
        button.className = i === currentPage ? 'active' : 'pag';
        button.addEventListener('click', () => {
            currentPage = i; // Ustawienie nowej strony
            renderContent(); // Ponowne renderowanie zawartości
            renderPagination(); // Ponowne renderowanie paginacji
        });
        paginationContainer.appendChild(button);
    }
}

// Funkcja renderująca zawartość na stronie
function renderContent() {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = ''; // Czyszczenie poprzedniej zawartości

    const searchText = document.getElementById('search-input').value.toLowerCase(); // Pobranie tekstu do wyszukania
    const filteredData = data.filter(item => {
        return (
            item.caption.toLowerCase().includes(searchText) ||  // Sprawdzanie czy caption zawiera tekst
            item.description.toLowerCase().includes(searchText) // Sprawdzanie czy description zawiera tekst
        );
    });

    // Obliczanie indeksów dla wyświetlanych danych
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex); // Wybór danych do wyświetlenia

    // Tworzenie elementów listy dla danych
    currentData.forEach(item => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `<h3 class="textfield">${item.caption}</h3>`; // Dodanie tytułu jako nagłówek
        listItem.addEventListener('click', () => {
            // Zapisanie wybranego elementu w localStorage i przejście do strony szczegółów
            localStorage.setItem('selectedItem', JSON.stringify(item));
            window.location.href = `details.html?page=${currentPage}`; // Dodanie aktualnej strony do URL
        });
        contentContainer.appendChild(listItem); // Dodanie elementu do kontenera
    });

    // Renderowanie paginacji na podstawie filtrowanych danych
    renderPagination(filteredData.length);
}

// Funkcja renderująca przyciski do zmiany stron
function renderPagination(filteredDataLength) {
    const totalPages = Math.ceil(filteredDataLength / itemsPerPage); // Obliczenie liczby stron
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Czyszczenie poprzednich przycisków

    // Tworzenie przycisków dla każdej strony
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        // Ustawienie klasy 'active' dla przycisku aktualnej strony
        button.className = i === currentPage ? 'active' : 'pag';
        button.addEventListener('click', () => {
            currentPage = i; // Ustawienie nowej strony
            renderContent(); // Ponowne renderowanie zawartości
            renderPagination(filteredDataLength); // Ponowne renderowanie paginacji
        });
        paginationContainer.appendChild(button);
    }
}

// Funkcja wykonywana przy załadowaniu strony
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    currentPage = parseInt(urlParams.get('page')) || 1;

    // Dodanie nasłuchiwacza do przycisku filtrowania
    document.getElementById('filter-button').addEventListener('click', () => {
        currentPage = 1; // Zresetowanie strony przy każdym nowym filtrowaniu
        renderContent(); // Renderowanie zawartości na nowo
    });

    renderContent(); // Renderowanie zawartości
    renderPagination(data.length); // Renderowanie paginacji
    injectHeader('head1', 'header1'); // Funkcja do wstawiania nagłówków (jeśli istnieje)
    injectHeader('head2', 'header2'); // Funkcja do wstawiania nagłówków (jeśli istnieje)
};