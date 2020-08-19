document.querySelector('#fileUpload').addEventListener('change', handleFileUpload, false);

let preview = document.querySelector('#preview')

chrome.storage.local.get(['carefreeImage'], function(result) {
    if (result.carefreeImage) {
        const img = document.createElement("img");
        img.src = result.carefreeImage;
        preview.appendChild(img);
    }    
})

function handleFileUpload(event) {
    var file = event.target.files[0];

    if (file.type.startsWith('image/')){ 
        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.innerHTML = '';
        preview.appendChild(img)

        const reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) {
                let dataUrl = e.target.result;
                aImg.src = e.target.result; 
                chrome.storage.local.set({'carefreeImage': e.target.result}, function() {
                    console.log('replacement image stored');
                })
            };
        })(img);
        reader.readAsDataURL(file);
    }
    
}