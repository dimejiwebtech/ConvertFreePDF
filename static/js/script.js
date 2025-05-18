document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('#menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  }
});

// FAQ Toggle
document.querySelectorAll('.faq h3').forEach((faq) => {
  faq.addEventListener('click', () => {
    faq.parentNode.classList.toggle('open');
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('file-upload');
  const convertButton = document.querySelector('.convert-btn');
  const fileText = document.querySelector('.file-text');

  let uploadedFile = null;

  // Detect the active tool from a data attribute in the HTML
  const toolType = convertButton.getAttribute('data-tool'); // e.g., "doc_to_pdf"

  // Mapping toolType to corresponding backend URLs
  const toolEndpoints = {
    pdf_to_doc: '/tools/convert_pdf_to_doc/',
    doc_to_pdf: '/tools/convert_doc_to_pdf/',
    pdf_compressor: '/tools/compress_pdf/',
  };

  // "pdf_to_jpg": "/tools/convert_pdf_to_jpg/",
  // "jpg_to_pdf": "/tools/convert_jpg_to_pdf/",
  // "pdf_to_png": "/tools/convert_pdf_to_png/",
  //   "merge_pdf": "/tools/merge_pdf/"

  // Update UI when a file is selected
  fileInput.addEventListener('change', function () {
    if (this.files.length > 0) {
      uploadedFile = this.files[0];
      fileText.textContent = uploadedFile.name;
    } else {
      fileText.textContent = 'Choose a file';
    }
  });

  // Handle conversion
  convertButton.addEventListener('click', function () {
    if (!uploadedFile) {
      alert('Please upload a file before converting.');
      return;
    }

    let formData = new FormData();
    formData.append('file', uploadedFile);

    // Special handling for merge_pdf (multiple files)
    if (toolType === 'merge_pdf') {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    } else {
      uploadedFile = files[0]; // Just to be sure
      formData.append('file', uploadedFile);
    }

    convertButton.textContent = 'Converting...';
    convertButton.disabled = true;

    // Show loading state
    convertButton.textContent = 'Converting...';
    convertButton.disabled = true;

    fetch(toolEndpoints[toolType], {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': getCSRFToken(), // Add CSRF token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = data.download_url; // Redirect to download
        } else {
          alert('Conversion failed: ' + data.error);
        }
      })
      .catch((error) => {
        alert('An error occurred. Please try again.');
        console.error(error);
      })
      .finally(() => {
        convertButton.textContent = 'Convert';
        convertButton.disabled = false;
      });
  });
});

// CSRF Token function
function getCSRFToken() {
  let cookieValue = null;
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith('csrftoken=')) {
      cookieValue = cookie.substring('csrftoken='.length, cookie.length);
      break;
    }
  }
  return cookieValue;
}
