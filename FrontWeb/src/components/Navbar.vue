<template>
    <nav class="navbar navbar-expand-lg w-100">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="#">
            <img src="/logo_white.svg" alt="PascalMentor"/>
        </a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav d-flex justify-content-center align-items-center w-100 gap-3 mt-2 mt-lg-0">
                <li class="nav-item active">
                    <router-link class="nav-link unselectable" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link unselectable" to="/personal-area">Area Personale</router-link>
                </li>
                <li v-if="user == 'I'" class="nav-item">
                    <router-link class="nav-link" to="/create-event">Crea Evento</router-link>
                </li>
                <li v-if="user !== ''" class="nav-item">
                    <router-link class="nav-link" to="/see-ripetitions">Visualizza i tuoi eventi</router-link>
                </li>
                <li v-if="user == 'S'" class="nav-item">
                    <router-link class="nav-link" to="/book-ripetition">Prenota Ripetizioni</router-link>
                </li>
                <li class="flex-grow-1"></li>
                <li class="nav-item" style="margin-right: 10px;">
                    <router-link class="nav-link" to="/sign-in"><i class="bi bi-door-open-fill" style="font-size: 2em;"></i></router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { inject } from 'vue';

const user = inject('userType');

</script>

<style scoped>
nav {
    background: linear-gradient(135deg, #ff9100, #ffd664);
    font-size: 23px;
}

img {
    width: 4em;
}

.navbar-nav .nav-link {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.1em;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link:focus {
    /*color: rgb(255, 247, 0);*/
    text-decoration: none;
    text-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}
.navbar-nav .nav-link.disabled {
    color: gray;
    pointer-events: none;
    cursor: default;
}
</style>
