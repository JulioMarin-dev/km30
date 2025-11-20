// ==============================================
// 1. LÓGICA DEL SLIDER
// ==============================================
const $next = document.querySelector('.next');
const $prev = document.querySelector('.prev');
const $slide = document.querySelector('.slide');
const $progressBar = document.querySelector('.progress-bar'); // NUEVO: Elemento de la barra de progreso

const SLIDER_INTERVAL_TIME = 8000; // 8 segundos

let sliderInterval; // Variable para almacenar el intervalo del slider

// Función para avanzar al siguiente slide
function showNextSlide() {
    const items = document.querySelectorAll('.item');
    $slide.appendChild(items[0]);
    resetProgressBar(); // Reinicia la barra de progreso con cada cambio
}

// Función para retroceder al slide anterior
function showPrevSlide() {
    const items = document.querySelectorAll('.item');
    const lastItem = items[items.length - 1];
    $slide.prepend(lastItem);
    resetProgressBar(); // Reinicia la barra de progreso con cada cambio
}

// NUEVO: Función para iniciar/reiniciar el temporizador del slider
function startSliderInterval() {
    clearInterval(sliderInterval); // Limpia cualquier intervalo existente
    resetProgressBar(true); // Reinicia la barra de progreso al iniciar o reiniciar
    
    // Inicia la animación de la barra de progreso
    requestAnimationFrame(() => {
        $progressBar.classList.remove('reset');
        $progressBar.style.width = '100%';
    });

    sliderInterval = setInterval(() => {
        showNextSlide();
    }, SLIDER_INTERVAL_TIME);
}

// NUEVO: Función para reiniciar la barra de progreso
function resetProgressBar(noTransition = false) {
    // Si noTransition es true, reinicia sin animación para que no se vea el "salto" de 100% a 0%
    if (noTransition) {
        $progressBar.classList.add('reset');
        $progressBar.style.width = '0%';
        // Forzar un reflow para que el cambio de width a 0% sea instantáneo antes de la nueva transición
        void $progressBar.offsetWidth; 
    } else {
        $progressBar.classList.add('reset');
        $progressBar.style.width = '0%';
        void $progressBar.offsetWidth; // Forzar reflow
        $progressBar.classList.remove('reset');
        $progressBar.style.width = '100%';
    }
}


if ($next && $prev && $slide) {
    $next.addEventListener('click', () => {
        showNextSlide();
        startSliderInterval(); // Reinicia el temporizador cuando se hace clic manualmente
    });

    $prev.addEventListener('click', () => {
        showPrevSlide();
        startSliderInterval(); // Reinicia el temporizador cuando se hace clic manualmente
    });

    // Inicia el slider automático al cargar la página
    startSliderInterval();
}


// ==============================================
// 2. LÓGICA DE POPUP / MODAL (NUEVA SECCIÓN)
// ==============================================
const openPopupBtn = document.getElementById('open-popup-btn');
const modalOverlay = document.getElementById('publications-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');

if (openPopupBtn && modalOverlay && closeModalBtn) {
    // Función para abrir el modal
    openPopupBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    // Función para cerrar el modal al hacer clic en el botón X
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Función para cerrar el modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Cerrar al presionar la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modalOverlay.classList.remove('active');
        }
    });
}

// ==============================================
// 3. ANIMACIÓN DE REVELACIÓN AL HACER SCROLL (Permanece igual)
// ==============================================

const revealElements = document.querySelectorAll('.reveal');
const whatsappButton = document.querySelector('.whatsapp-button');
const sliderSection = document.getElementById('slider'); // Obtener la sección del slider

function revealOnScroll() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        // Obtenemos la distancia del elemento desde la parte superior del viewport
        const elementTop = revealElements[i].getBoundingClientRect().top;
        
        // El elemento se revela cuando está a 150px del fondo del viewport
        const revealPoint = 150; 

        if (elementTop < windowHeight - revealPoint) {
            revealElements[i].classList.add('active');
        } else {
            // Opcional: Para resetear la animación al subir
            // revealElements[i].classList.remove('active'); 
        }
    }
    toggleWhatsappButton(); // Llamar a la función del botón de WhatsApp
}

// NUEVA FUNCIÓN: Controla la visibilidad del botón de WhatsApp (Permanece igual)
function toggleWhatsappButton() {
    if (!whatsappButton || !sliderSection) return; // Asegúrate de que los elementos existan

    const sliderBottom = sliderSection.getBoundingClientRect().bottom;

    // Si la parte inferior del slider ya pasó la parte superior del viewport, muestra el botón.
    // Esto significa que ya no estamos en la sección del banner.
    if (sliderBottom <= 0) {
        whatsappButton.classList.add('visible');
    } else {
        whatsappButton.classList.remove('visible');
    }
}


// Escuchar el evento scroll y ejecutar la función
window.addEventListener('scroll', revealOnScroll);

// Ejecutar al cargar para mostrar elementos que ya están en el viewport
revealOnScroll();
// También ejecuta la función del botón de WhatsApp al cargar la página
toggleWhatsappButton();

// ==============================================
// 4. LÓGICA DE NAVEGACIÓN ACTIVA (Permanece igual)
// ==============================================
const navLinks = document.querySelectorAll('.nav-menu a');
// Incluimos .container (que es el slider de inicio) y todas las secciones
const sections = document.querySelectorAll('#slider, section'); 

function updateActiveLink() {
    let current = '';
    
    // Calcula la posición actual del scroll
    const scrollY = window.pageYOffset;
    
    // Recorre las secciones para ver cuál está en el viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Definimos un punto de activación (e.g., 200px desde la parte superior)
        const activationPoint = 200; 

        if (scrollY >= sectionTop - activationPoint) {
            // Obtiene el ID de la sección actual
            current = section.getAttribute('id'); 
        }
    });

    // Desactiva la clase 'active' de todos los enlaces
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Determina si el enlace corresponde a la sección actual
        if (
            // Caso "Inicio" (#) que enlaza al ID 'slider'
            (link.getAttribute('href') === '#' && current === 'slider') || 
            (link.getAttribute('href') === `#${current}`)           // Caso secciones con ID
        ) {
            link.classList.add('active');
        }
    });
}

// Escuchar el evento scroll y ejecutar la función
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink); 
// Ejecutar al cargar para asegurar que 'Inicio' esté activo si la página está arriba
updateActiveLink();