document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area')
    const fileInput = document.getElementById('file-input')
    const progressBar = document.getElementById('progress-bar')
    const imagePreview = document.getElementById('image-preview')
    const modal = document.getElementById('fullscreen-modal')
    const fullscreenImage = document.getElementById('fullscreen-image')
    const closeModal = document.querySelector('.close-btn')

    // Prevent default behavior for drag events
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        dropArea.addEventListener(eventName, (e) => {
            e.preventDefault()
            e.stopPropagation()
        })
    })

    // Highlight drop area on drag
    ;['dragenter', 'dragover'].forEach((eventName) => {
        dropArea.addEventListener(eventName, () =>
            dropArea.classList.add('highlight')
        )
    })

    // Remove highlight when drag leaves or drop happens
    ;['dragleave', 'drop'].forEach((eventName) => {
        dropArea.addEventListener(eventName, () =>
            dropArea.classList.remove('highlight')
        )
    })

    // Handle dropped files
    dropArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files))

    // Open file input when clicked
    dropArea.addEventListener('click', () => fileInput.click())

    // Handle file selection through input
    fileInput.addEventListener('change', () => handleFiles(fileInput.files))

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0]

            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                alert('Only images are allowed!')
                return
            }

            uploadFile(file)
            previewImage(file)
        }
    }

    function uploadFile(file) {
        progressBar.style.display = 'block'
        progressBar.value = 0

        // Simulate file upload progress
        let progress = 0
        const interval = setInterval(() => {
            progress += 10
            progressBar.value = progress

            if (progress >= 100) {
                clearInterval(interval)
                setTimeout(() => (progressBar.style.display = 'none'), 500)
            }
        }, 300)
    }

    function previewImage(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = function (e) {
            imagePreview.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded Image" id="uploaded-image">
                <button class="remove-btn">&times;</button>
            `

            const uploadedImage = document.getElementById('uploaded-image')
            const removeBtn = document.querySelector('.remove-btn')

            // Enable fullscreen preview
            uploadedImage.addEventListener('click', () => {
                fullscreenImage.src = e.target.result
                modal.style.display = 'flex'
            })

            // Remove image on clicking the remove button
            removeBtn.addEventListener('click', () => {
                imagePreview.innerHTML = ''
                fileInput.value = '' // Reset file input
            })
        }
    }

    // Close the modal when clicking the close button
    closeModal.addEventListener('click', () => (modal.style.display = 'none'))

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'
        }
    })
})
