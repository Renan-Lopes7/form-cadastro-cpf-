class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector(".formulario");
        this.eventos();
    }
    eventos() {
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.isValid();
        const senhasValidas = this.passwordIsValid();

        if (camposValidos && senhasValidas) {
            alert("enviado");
            this.formulario.submit();

        }
    }
    //-VALIDAR TODOS OS CAMPOS
    isValid() {
        let valid = true;

        for (let errorText of this.formulario.querySelectorAll(".error-text")) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;

            if (!campo.value) {
                this.createError(campo, `Campo ${label} não pode estar vazio.`);
                valid = false;
            }
            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false;
            }
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }
    passwordIsValid() {
        let valid = true;
        const password = this.formulario.querySelector(".senha");
        const confirmPassword = this.formulario.querySelector(".confirm-password");

        //CHECAR
        if (password.value !== confirmPassword.value) {
            valid = false;
            this.createError(password, 'Campos Senha e comfirmação senha precisam ser iguais');
            this.createError(confirmPassword, 'Campos Senha e comfirmação senha precisam ser iguais');
        }
        if (password.value.length < 3 || password.value.length > 12) {
            this.createError(password, 'Senha precisa estar entre 3 e 12 caracteres.');
            valid = false;
        }
        return valid;
    }
    //-MÉTODO VALIDA USUARIO-
    validaUsuario(campo) {
        const usuario = campo.value
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, "Usuário precisa ter entre 3 e 12 caracteres.");
            return false;
        }
        if (!usuario.match(/[a-zA-Z0-9]+$/g)) {
            this.createError(campo, "Usuário precisa conter apenas letras e/ou numeros.");
            return false;
        }
        return valid;
    }
    //--MÉTODO VALIDA CPF
    validaCPF(campo) {
        const cpf = new ValidaCpf(campo.value);

        if (!cpf.valida()) {
            this.createError(campo, "CPF Inválido");
            return false;
        }
        return true;
    }
    //-MÉTODO QUE CRIA O ERRO
    createError(campo, msg) {
        const div = document.createElement("div");
        div.innerText = msg;
        div.classList.add("error-text");
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaFormulario();