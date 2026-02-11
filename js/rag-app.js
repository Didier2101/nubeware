/**
 * Nubeware RAG Application Logic - Senior Implementation
 * Features: SweetAlert2, Robust Error Handling, Input Validation, Typing Animation
 */

const API_BASE = CONFIG.API_BASE;

// UI Elements
const fileList = document.getElementById('file-list');
const messagesArea = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');

// State
let files = [];
let isQuerying = false;

/**
 * Configure SweetAlert2 globally for enterprise look
 */
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

/**
 * Initialize
 */
async function init() {
    await fetchFiles();
    
    // Event Listeners
    sendBtn.addEventListener('click', handleQuery);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleQuery();
    });
    
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleUpload);
    
    document.getElementById('clear-chat-btn').addEventListener('click', () => {
        messagesArea.innerHTML = `
            <div class="bubble ai-bubble" data-i18n="rag_app_welcome">
                ${getTranslation('rag_app_welcome')}
            </div>
        `;
    });
}

/**
 * Fetch files from server with better error feedback
 */
async function fetchFiles() {
    try {
        const response = await fetch(`${API_BASE}/list_sources`);
        if (!response.ok) throw new Error('API unreachable');
        
        const data = await response.json();
        files = data.files || [];
        renderFileList();
    } catch (err) {
        console.error('Fetch Error:', err);
        fileList.innerHTML = `<div style="color: #ef4444; padding: 1rem; font-size: 0.8rem; text-align: center;">
            <i data-lucide="alert-circle" style="width: 1rem; margin-bottom: 0.5rem;"></i><br>
            ${getTranslation('rag_app_error_loading')}
        </div>`;
        lucide.createIcons();
    }
}

/**
 * Render side file list with empty state handling
 */
function renderFileList() {
    if (files.length === 0) {
        fileList.innerHTML = `<div style="text-align: center; color: #94a3b8; padding: 2.5rem 1rem; font-size: 0.8rem;">
            <i data-lucide="folder-open" style="width: 1.5rem; margin-bottom: 0.5rem; opacity: 0.5;"></i><br>
            ${getTranslation('rag_app_no_files')}
        </div>`;
        lucide.createIcons();
        return;
    }
    
    fileList.innerHTML = files.map(file => `
        <div class="file-row" title="${file.filename}">
            <i data-lucide="file-text" style="width: 1rem; color: #94a3b8;"></i>
            <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.8rem; font-weight: 600;">
                ${file.filename}
            </span>
            <button onclick="handleDelete('${file.id}', '${file.filename}')" class="delete-btn" style="background: none; border: none; cursor: pointer; color: #cbd5e1; transition: color 0.2s;">
                <i data-lucide="trash-2" style="width: 0.8rem;"></i>
            </button>
        </div>
    `).join('');
    
    lucide.createIcons();
}

/**
 * Handle file upload with validations
 */
async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Senior Validation: Check file type (Allow PDF, DOCX, TXT)
    const allowedExtensions = ['pdf', 'docx', 'txt', 'xlsx', 'csv'];
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(extension)) {
        Swal.fire({
            icon: 'error',
            title: getTranslation('status_error'),
            text: `Formato .${extension} no soportado. Use PDF, DOCX o TXT.`,
            confirmButtonColor: '#0ea5e9'
        });
        fileInput.value = '';
        return;
    }

    // Senior Validation: File size limit (e.g., 10MB)
    if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
            icon: 'warning',
            title: getTranslation('status_warning'),
            text: 'El archivo es demasiado grande (Máx 10MB).',
            confirmButtonColor: '#0ea5e9'
        });
        fileInput.value = '';
        return;
    }
    
    const originalText = uploadBtn.innerHTML;
    uploadBtn.innerHTML = `<div class="loader" style="width: 1rem; height: 1rem; border-width: 1.5px;"></div>`;
    uploadBtn.disabled = true;
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_BASE}/upload_datasheets`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) throw new Error('Upload failed on server');
        
        Toast.fire({
            icon: 'success',
            title: getTranslation('rag_app_upload_success')
        });
        
        await fetchFiles();
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: getTranslation('status_error'),
            text: getTranslation('rag_app_error_upload') + err.message,
            confirmButtonColor: '#0ea5e9'
        });
    } finally {
        uploadBtn.innerHTML = originalText;
        uploadBtn.disabled = false;
        fileInput.value = '';
    }
}

/**
 * Handle Query with typing effect and robust handling
 */
async function handleQuery() {
    const query = userInput.value.trim();
    
    // Validation: Empty check
    if (!query) {
        Toast.fire({
            icon: 'warning',
            title: getTranslation('rag_app_empty_query')
        });
        return;
    }

    if (isQuerying) return;
    
    // Add user message
    addMessage(query, 'user');
    userInput.value = '';
    
    // Show AI thinking
    isQuerying = true;
    const aiMessageId = 'ai-' + Date.now();
    addMessage('<div class="loader"></div>', 'ai', aiMessageId);
    
    try {
        const response = await fetch(`${API_BASE}/rag_query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        
        if (!response.ok) throw new Error('Query service unavailable');
        
        const data = await response.json();
        const bubble = document.getElementById(aiMessageId);
        
        // Typing animation for better UX
        const fullAnswer = data.answer || data.response || getTranslation('rag_app_no_answer');
        bubble.innerHTML = '';
        
        await typeText(bubble, fullAnswer);
        
        // If there are sources, add them clearly
        if (data.sources && data.sources.length > 0) {
            const sourcesHtml = document.createElement('div');
            sourcesHtml.style.cssText = "margin-top: 0.75rem; font-size: 0.7rem; color: #0ea5e9; border-top: 1px solid #f1f5f9; padding-top: 0.5rem; opacity: 0; transition: opacity 0.5s;";
            sourcesHtml.innerHTML = `<i data-lucide="link" style="width: 10px; display: inline-block; vertical-align: middle; margin-right: 4px;"></i> ${getTranslation('rag_app_sources_label')} ${data.sources.join(', ')}`;
            bubble.appendChild(sourcesHtml);
            lucide.createIcons();
            setTimeout(() => sourcesHtml.style.opacity = "1", 100);
        }
        
    } catch (err) {
        const bubble = document.getElementById(aiMessageId);
        bubble.innerHTML = `<div style="color: #ef4444; display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="alert-triangle" style="width: 1rem;"></i>
            <span>${getTranslation('rag_app_query_error')} ${err.message}</span>
        </div>`;
        lucide.createIcons();
    } finally {
        isQuerying = false;
        scrollToBottom();
    }
}

/**
 * UI Helper: Typing effect
 */
async function typeText(element, text, speed = 15) {
    let i = 0;
    return new Promise(resolve => {
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                scrollToBottom();
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

/**
 * UI Helper: Scroll chat to bottom
 */
function scrollToBottom() {
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

/**
 * UI Helper: Add message bubble
 */
function addMessage(text, side, id = null) {
    const div = document.createElement('div');
    div.className = `bubble ${side}-bubble`;
    if (id) div.id = id;
    div.innerHTML = text;
    messagesArea.appendChild(div);
    scrollToBottom();
    return div;
}

/**
 * Handle Delete with professional confirmation
 */
window.handleDelete = async function(id, filename) {
    const result = await Swal.fire({
        title: getTranslation('status_warning'),
        text: `${getTranslation('rag_app_confirm_delete')} (${filename})`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;
    
    try {
        const response = await fetch(`${API_BASE}/delete_file/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Delete failed on server');
        
        Toast.fire({
            icon: 'success',
            title: 'Archivo eliminado'
        });
        
        await fetchFiles();
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: err.message
        });
    }
};

// Start the app
init();
