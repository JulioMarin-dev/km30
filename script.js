// ==============================================
// 1. LÓGICA DEL SLIDER (CÓDIGO ANTERIOR)
// ==============================================
const $next = document.querySelector('.next');
const $prev = document.querySelector('.prev');
const $slide = document.querySelector('.slide');

if ($next && $prev && $slide) {
    $next.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        $slide.appendChild(items[0]); 
    });

    $prev.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        const lastItem = items[items.length - 1];
        $slide.prepend(lastItem);
    });
}


// ==============================================
// 2. LÓGICA DE PESTAÑAS (NOSOTROS)
// ==============================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // 1. Desactivar pestaña anterior de CONTENIDO
        document.querySelector('.tab-button.active').classList.remove('active');
        document.querySelector('.tab-content.active').classList.remove('active');
        
        // 2. Activar nueva pestaña y contenido
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');

        // 3. CLAVE: Lógica de cambio de IMAGEN de Fondo
        const targetImageId = 'bg-' + targetTab;

        // Desactivar imagen anterior
        document.querySelector('.bg-image.active').classList.remove('active');
        
        // Activar nueva imagen
        document.getElementById(targetImageId).classList.add('active');
    });
});


// ==============================================
// 3. ANIMACIÓN DE REVELACIÓN AL HACER SCROLL
// ==============================================

const revealElements = document.querySelectorAll('.reveal');

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
}

// Escuchar el evento scroll y ejecutar la función
window.addEventListener('scroll', revealOnScroll);

// Ejecutar al cargar para mostrar elementos que ya están en el viewport
revealOnScroll();