document.addEventListener("DOMContentLoaded", function () {

    function attachFolderToggle() {
        const folders = document.querySelectorAll(".wrapper ul li > div");

        folders.forEach(folder => {
            folder.removeEventListener("click", toggleFolder);
            folder.addEventListener("click", toggleFolder);
        });
    }

    function toggleFolder() {
        const sublist = this.nextElementSibling;
        
        if (sublist) {
            if (sublist.style.display === "none" || !sublist.style.display) {
                sublist.style.display = "block";
            } else {
                sublist.style.display = "none";
            }

            const icontoggle = this.querySelector(".fa-caret-down");
            if (icontoggle) {
                icontoggle.classList.toggle("fa-rotate-90");
            }
        }
    }

    attachFolderToggle();

    const form = document.querySelector(".addFolder form");
    const selectBox = document.getElementById("inputGroupSelect04");
    const inputField = document.querySelector(".addFolder input");
    const folderWrapper = document.querySelector(".wrapper > ul");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedFolder = selectBox.value;
        const newFolderName = inputField.value.trim();

        if (!selectedFolder || selectedFolder === "Choose..." || !newFolderName) {
            alert("Zəhmət olmasa qovluq seçin və yeni ad daxil edin.");
            return;
        }

        const allSpans = folderWrapper.querySelectorAll("span");
        let targetFolder = null;

        allSpans.forEach(span => {
            if (span.textContent.trim() === selectedFolder) {
                targetFolder = span.closest("li");
            }
        });

        if (!targetFolder) {
            alert("Seçilmiş qovluq tapılmadı!");
            return;
        }

        let parentUl = targetFolder.querySelector("ul");
        if (!parentUl) {
            parentUl = document.createElement("ul");
            parentUl.style.display = "block";
            targetFolder.appendChild(parentUl);
        }

        const newFolder = document.createElement("li");
        newFolder.innerHTML = `
            <div>
                <i class="fa-solid fa-caret-down"></i> 
                <i class="fa-solid fa-folder"></i> 
                <span>${newFolderName}</span>
            </div>
            <ul style="display: none;"></ul>
        `;

        parentUl.appendChild(newFolder);
        newFolder.querySelector("div").addEventListener("click", toggleFolder);

        // **Yeni qovluğu select box-a əlavə edirik**
        addFolderToSelect(newFolderName);

        inputField.value = "";
        selectBox.value = "Choose...";

    });

    // **Yeni qovluğu select box-a əlavə edən funksiya**
    function addFolderToSelect(folderName) {
        // Dublikat olub-olmadığını yoxla
        const options = selectBox.querySelectorAll("option");
        for (let option of options) {
            if (option.value === folderName) {
                return; // Əgər artıq varsa, əlavə etmə
            }
        }

        const newOption = document.createElement("option");
        newOption.value = folderName;
        newOption.textContent = folderName;
        selectBox.appendChild(newOption);
    }
});
