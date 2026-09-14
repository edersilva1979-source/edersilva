const menuBotao = document.getElementById('menuBotao');
const menuLinks = document.getElementById('menuLinks');
const links = document.querySelectorAll('.menuLinks a');
const secoes = document.querySelectorAll('main section[id]');
const elementos = document.querySelectorAll('.revelar');

menuBotao.addEventListener('click', () => {
  const aberto = menuLinks.classList.toggle('aberto');
  menuBotao.setAttribute('aria-expanded', aberto);
});

links.forEach(link => {
  link.addEventListener('click', () => {
    menuLinks.classList.remove('aberto');
    menuBotao.setAttribute('aria-expanded', 'false');
  });
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });

elementos.forEach(elemento => observador.observe(elemento));

const atualizarMenu = () => {
  let atual = '';
  secoes.forEach(secao => {
    const topo = secao.offsetTop - 140;
    if (window.scrollY >= topo) {
      atual = secao.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('ativo');
    if (link.getAttribute('href') === `#${atual}`) {
      link.classList.add('ativo');
    }
  });
};

window.addEventListener('scroll', atualizarMenu, { passive: true });
document.getElementById('anoAtual').textContent = new Date().getFullYear();
