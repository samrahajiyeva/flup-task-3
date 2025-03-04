document.addEventListener("DOMContentLoaded", function () {
    // Bütün folder div-lərini seç
    const folders = document.querySelectorAll(".wrapper ul li > div");

    folders.forEach(folder => {
        folder.addEventListener("click", function () {
            // Növbəti UL elementini tap
            const sublist = this.nextElementSibling;
            
            if (sublist) {
                // Görünən və ya gizli etmək üçün toggle sinfi əlavə et
                sublist.classList.toggle("d-none");

                // Ox ikonunu dəyiş
                const caretIcon = this.querySelector(".fa-caret-down");
                if (caretIcon) {
                    caretIcon.classList.toggle("fa-rotate-90");
                }
            }
        });
    });
});
