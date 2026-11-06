document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('webcam');
    const statusMessage = document.getElementById('status-message');
    const btnToggleCamera = document.getElementById('btn-toggle-camera');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let stream = null;

    // Gerencia o acionamento da câmera
    btnToggleCamera.addEventListener('click', async () => {
        if (stream) {
            stopCamera();
        } else {
            await startCamera();
        }
    });

    async function startCamera() {
        try {
            // Solicita acesso à câmera do dispositivo
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: { ideal: 1280 }, height: { ideal: 720 } }, 
                audio: false 
            });
            
            // Direciona o fluxo de vídeo para o elemento <video>
            video.srcObject = stream;
            video.classList.add('active');
            statusMessage.style.display = 'none';
            
            // Atualiza o estado do botão
            btnToggleCamera.textContent = 'Desligar câmera';
            btnToggleCamera.classList.add('active');
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            alert('Não foi possível acessar a câmera. Verifique as permissões do seu navegador.');
        }
    }

    function stopCamera() {
        if (stream) {
            // Encerra todas as trilhas (tracks) ativas da câmera
            stream.getTracks().forEach(track => track.stop());
            stream = null;
        }
        
        // Remove a imagem do elemento de vídeo
        video.srcObject = null;
        video.classList.remove('active');
        statusMessage.style.display = 'block';
        
        // Reseta o botão e os filtros
        btnToggleCamera.textContent = 'Ligar câmera';
        btnToggleCamera.classList.remove('active');
        video.style.filter = 'none';
    }

    // Gerencia a aplicação dinâmica dos filtros CSS no elemento de vídeo
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            video.style.filter = filterValue;
        });
    });
});