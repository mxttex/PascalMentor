<template>
    <div class="chat-container">
        <div class="chat-window">
            <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.sender">
                <p>{{ msg.text }}</p>
            </div>
        </div>
        <form @submit.prevent="sendMessage" class="chat-input">
            <input v-model="userInput" placeholder="Scrivi un messaggio..." />
            <button type="submit">Invia</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import globalVariables from '../../../globalVariables';
    
const userInput = ref('')
const messages = ref([
    { sender: 'bot', text: 'Ciao! Sono il tuo assistente AI. Come posso aiutarti?' }
])

const sendMessage = async () => {
    const input = userInput.value.trim()
    if (!input) return

    messages.value.push({ sender: 'user', text: input })
    userInput.value = ''

    // Simulazione risposta AI (sostituibile con una fetch a OpenAI, ecc.)
    const botReply = await getBotReply(input)
    messages.value.push({ sender: 'bot', text: botReply })
}

const getBotReply = async (input) => {
    const response = await fetch(`${globalVariables.API_URL}askAi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // mancava!
        body: JSON.stringify({ message: input })
    })
    const data = await response.json()
    return data.reply 
}
</script>

<style scoped>
.chat-container {
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    height: 500px;
    background: #f9f9f9;
}

.chat-window {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
}

.message {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    max-width: 75%;
    word-wrap: break-word;
}

.message.user {
    background-color: #d1e7dd;
    align-self: flex-end;
}

.message.bot {
    background-color: #e2e3e5;
    align-self: flex-start;
}

.chat-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid #ccc;
}

.chat-input input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.chat-input button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}
</style>
