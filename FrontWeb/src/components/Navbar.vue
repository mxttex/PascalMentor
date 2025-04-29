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
                    <router-link class="nav-link unselectable" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link unselectable" to="/personal-area">Area Personale</router-link>
                </li>
                <li v-if="user == 'I'" class="nav-item">
                    <router-link class="nav-link" to="/create-event">Crea Evento</router-link>
                </li>
                <li v-if="user == 'S'" class="nav-item">
                    <router-link class="nav-link" to="/book-ripetition">Prenota Ripetizioni</router-link>
                </li>
                <li class="flex-grow-1"></li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/sign-in">Loggati</router-link>
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
    background-color: orange;
    font-size: 23px;
}

img {
    width: 4em;
}

.navbar-nav .nav-link {
    text-decoration: none;
    color: black;
    font-weight: bold;
}

.navbar-nav .nav-link:hover,
.navbar-nav .nav-link:focus {
    color: black;
    text-decoration: none;
}

.navbar-nav .nav-link.disabled {
    color: gray;
    pointer-events: none;
    cursor: default;
}
</style>
