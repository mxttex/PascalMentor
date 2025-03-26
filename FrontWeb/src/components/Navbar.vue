<template>
    <nav class="navbar navbar-expand-lg w-100">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="#">
            <img src="/logo.svg" alt="PascalMentor" />
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav d-flex w-100 mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link disabled" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Prenota Ripetizioni</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Visualizza Recensioni</a>
                </li>
                <li class="flex-grow-1"></li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <router-link to="/">Registrati</router-link>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

import router from '@/router';

export default {
    components: {
    }
};
</script>

<style scoped>
/* @import "../styles/Navbar.css"; */
nav {
    background-color: orange;
    /*la palette dei colori e' da decidere */
    font-size: 23px;
}

img {
    width: 4em;
}

i {
    width: 100px;
}
</style>