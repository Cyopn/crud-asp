$(document).ready(function () {
    load_data()
    const links = document.querySelectorAll(".navbar__menu #nose");
    const sections = document.querySelectorAll(".section");
    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetClass = link.getAttribute("data-target");
            sections.forEach(section => {
                if (section.classList.contains(targetClass)) {
                    section.classList.add("active");
                    load_data()
                    section.classList.remove("exit");
                } else {
                    section.classList.remove("active");
                    section.classList.add("exit");
                }
            });
        });
    });

    const form = document.getElementById("formulario");
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementById("close");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData
            });
            if (response.ok) {
                const result = await response.text();
                modalMessage.textContent = result;
                load_data()
                modal.style.display = "flex";
            } else {
                modalMessage.textContent = "Ocurrió un error. Intente nuevamente.";
                modal.style.display = "flex";
            }
        } catch (error) {
            modalMessage.textContent = "Error de conexión. Intente más tarde.";
            modal.style.display = "flex";
        }
    });
    closeBtn.addEventListener("click", () => {
        document.querySelectorAll("#clave").forEach(c => {
            c.value = ""
        })
        document.querySelectorAll("#nombre").forEach(n => {
            n.value = ""
        })
        document.querySelectorAll("#sexo").forEach(s => {
            s.value = ""
        })
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            document.querySelectorAll("#clave").forEach(c => {
                c.value = ""
            })
            document.querySelectorAll("#nombre").forEach(n => {
                n.value = ""
            })
            document.querySelectorAll("#sexo").forEach(s => {
                s.value = ""
            })
            modal.style.display = "none";
        }
    });
})

async function load_data() {
    const response = await fetch(`/api/getUsers`, {
        method: "GET"
    });
    let result = await response.text();
    result = result.substring(1, result.length - 1);
    let res = result.split(";");
    let data;
    let table = `<tr><th>Identificador</th><th>Clave</th><th>Nombre</th><th>Sexo</th><th>Contraseña</th></tr>`;
    res.forEach(d => {
        data = d.split(",")
        table += `<tr class="tablebody" onclick="open_update('${d}')"><td>${data[0]}</td><td>${data[1]}</td><td>${data[2]}</td><td>${data[3]}</td><td>${data[4]}</td></tr>`
    })
    $("#queryu").html(table)
    let res2 = result.split(";")
    let data2
    let table2 = `<tr><th>Identificador</th><th>Clave</th><th>Nombre</th><th>Sexo</th><th>Contraseña</th></tr>`
    res2.forEach(d => {
        data2 = d.split(",")
        table2 += `<tr class="tablebody" onclick="open_delete('${d}')"><td>${data2[0]}</td><td>${data2[1]}</td><td>${data2[2]}</td><td>${data2[3]}</td><td>${data2[4]}</td></tr>`
    })
    $("#queryd").html(table2)
    let res3 = result.split(";")
    let data3
    let table3 = `<tr><th>Identificador</th><th>Clave</th><th>Nombre</th><th>Sexo</th><th>Contraseña</th></tr>`
    res3.forEach(d => {
        data3 = d.split(",")
        table3 += `<tr class="tablebody"><td>${data3[0]}</td><td>${data3[1]}</td><td>${data3[2]}</td><td>${data3[3]}</td><td>${data3[4]}</td></tr>`
    })
    $("#querys").html(table3)
}
