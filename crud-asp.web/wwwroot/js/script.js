$(document).ready(function () {
    check_login();
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
        try {
            const formData = new FormData(form);
            let header = "?";
            for (let [name, value] of formData.entries()) {
                header += `${name}=${value}&`;
            }
            const response = await fetch(form.action + header, {
                method: form.method,
            });
            if (response.ok) {
                const result = await response.text();
                modalMessage.textContent = result.substring(1, result.length - 1);
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
        document.getElementById("clave").value = ""
        document.getElementById("nombre").value = ""
        document.getElementById("sexo").value = ""
        document.getElementById("contraseña").value = ""
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            document.getElementById("clave").value = ""
            document.getElementById("nombre").value = ""
            document.getElementById("sexo").value = ""
            document.getElementById("contraseña").value = ""
            modal.style.display = "none";
        }
    });
})

async function load_data() {
    const response = await fetch(`/api/get_users`, {
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

function open_update(source) {
    const modal = document.getElementById("modal-update");
    const form = document.getElementById("form-update")
    const modaln = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementById("close-update")
    modal.style.display = "flex";
    const data = source.split(",")
    document.getElementById("idu").value = data[0]
    document.getElementById("claveu").value = data[1]
    document.getElementById("nombreu").value = data[2]
    document.getElementById("sexou").value = data[3]
    document.getElementById("contraseñau").value = data[4]
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        let header = "?";
        for (let [name, value] of formData.entries()) {
            header += `${name}=${value}&`;
        }
        try {
            const response = await fetch(form.action + header, {
                method: form.method
            });
            if (response.ok) {
                const result = await response.text();
                modalMessage.textContent = result.substring(1, result.length - 1);
                modal.style.display = "none"
                load_data()
                modaln.style.display = "flex";
            } else {
                modalMessage.textContent = "Ocurrió un error. Intente nuevamente.";
                modaln.style.display = "flex";
            }
        } catch (error) {
            console.log(error)
            modal.style.display = "none"
            modalMessage.textContent = "Error de conexión. Intente más tarde.";
            modaln.style.display = "flex";
        }
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

function open_delete(source) {
    const modal = document.getElementById("modal-delete");
    const form = document.getElementById("form-delete")
    const modaln = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");
    const closeBtn = document.getElementById("close-delete")
    modal.style.display = "flex";
    const data = source.split(",")
    document.getElementById("idd").value = data[0]
    document.getElementById("claved").value = data[1]
    document.getElementById("nombred").value = data[2]
    document.getElementById("sexod").value = data[3]
    document.getElementById("contraseñad").value = data[4]
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        let header = "?";
        for (let [name, value] of formData.entries()) {
            header += `${name}=${value}&`;
        }
        try {
            const response = await fetch(form.action + header, {
                method: form.method,
            });
            if (response.ok) {
                const result = await response.text();
                modalMessage.textContent = result.substring(1, result.length - 1);
                modal.style.display = "none"
                load_data()
                modaln.style.display = "flex";
            } else {
                modalMessage.textContent = "Ocurrió un error. Intente nuevamente.";
                modaln.style.display = "flex";
            }
        } catch (error) {
            console.log(error)
            modal.style.display = "none"
            modalMessage.textContent = "Error de conexión. Intente más tarde.";
            modaln.style.display = "flex";
        }
    });
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}


async function check_login() {
    const response = await fetch("api/log", {
        method: "GET"
    });
    const result = await response.text();
    if (result.substring(1, result.length - 1) === "unauthorized") {
        const modal = document.getElementById("modal-login")
        modal.style.display = "flex"
        const form = document.getElementById("form-login")
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            let header = "?";
            for (let [name, value] of formData.entries()) {
                header += `${name}=${value}&`;
            }
            try {
                const response = await fetch(form.action + header, {
                    method: form.method
                });
                if (response.ok) {
                    let result = await response.text();
                    result = result.substring(1, result.length - 1)
                    if (result !== "unauthorized") {
                        const modaln = document.getElementById("modal-log");
                        const modalMessage = document.getElementById("modal-log-message");
                        modalMessage.textContent = "Bienvenido " + result;
                        modal.style.display = "none"
                        modaln.style.display = "flex";
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    } else {
                        const modaln = document.getElementById("modal");
                        const modalMessage = document.getElementById("modal-message");
                        modalMessage.textContent = "Usuario o contraseña incorrectos";
                        modal.style.display = "none"
                        modaln.style.display = "flex";
                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        })
    }
}

async function logout() {
    const response = await fetch("/api/logout", {
        method: "GET"
    });
    const modaln = document.getElementById("modal-log");
    const modalMessage = document.getElementById("modal-log-message");
    modalMessage.textContent = "Cerrando sesion.";
    modaln.style.display = "flex";
    setTimeout(() => {
        window.location.reload()
    }, 2000)

}