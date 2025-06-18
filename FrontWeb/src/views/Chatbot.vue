<template>
    <div class="chat-container">
        <div class="chat-window" ref="chatWindowRef">
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
import { ref, nextTick } from 'vue'
import globalVariables from '../../../globalVariables'

const userInput = ref('')
const messages = ref([
    { sender: 'bot', text: 'Ciao! Sono il tuo assistente AI. Come posso aiutarti?' }
])

const chatWindowRef = ref(null)

const sendMessage = async () => {
    const input = userInput.value.trim()
    if (!input) return

    messages.value.push({ sender: 'user', text: input })
    userInput.value = ''
    await scrollToBottom()

    const botReply = await getBotReply(input)
    messages.value.push({ sender: 'bot', text: botReply })
    await scrollToBottom()
}

const getBotReply = async (input) => {
    const response = await fetch(`${globalVariables.API_URL}askAi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
    })
    const data = await response.json()
    return data.reply
}

const scrollToBottom = async () => {
    await nextTick()
    const container = chatWindowRef.value
    if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    }
}
</script>

<style scoped>
.chat-container {
    max-width: 600px;
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    height: 550px;
    background: linear-gradient(135deg, #ff9800, #ffc947);
    border-radius: 20px;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    color: white;
    font-family: "Segoe UI", sans-serif;
}

.chat-window {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
}

.message {
    padding: 0.6rem 1rem;
    border-radius: 16px;
    max-width: 75%;
    word-wrap: break-word;
    font-size: 1rem;
    line-height: 1.4;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
}

.message.user {
    align-self: flex-end;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    border-left: 4px solid #ffffff;
}

.message.bot {
    align-self: flex-start;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border-right: 4px solid #ffffff;
}

.chat-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(6px);
}

.chat-input input {
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
    outline: none;
    background: white;
    color: #333;
    transition: box-shadow 0.2s ease-in-out;
}

.chat-input input:focus {
    box-shadow: 0 0 0 3px rgba(255, 160, 0, 0.4);
}

.chat-input button {
    margin-left: 0.5rem;
    padding: 0.5rem 1.2rem;
    border-radius: 10px;
    border: none;
    background-color: #ff6f00;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.1s ease;
}

.chat-input button:hover {
    background-color: #e65100;
    transform: scale(1.03);
}
</style>
