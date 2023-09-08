const voltarBtn = document.getElementsById('#login_button');

if (voltarBtn) {
  voltarBtn.addEventListener('click', () => {
    // Redirecionar o usuário para a página principal
    window.location.href = 'index.html';
  });
  
}else{
    voltarBtn.addEventListener('click', () => {
    window.history.back();
})};




