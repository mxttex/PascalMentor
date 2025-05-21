<template>
  <div class="leave-feedback">
    <h2>Lascia un Feedback</h2>
    <form @submit.prevent="submitFeedback">
      <div class="form-group">
        <label for="rating">Valutazione:</label>
        <div class="stars" @mousemove="handleHover" @mouseleave="clearHover">
          <div
            v-for="star in 5"
            :key="star"
            class="star-container"
            @click="setRating($event, star)"
          >
            <span
              class="star"
              :class="getStarClass(star)"
            >
              ★
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="message">Feedback:</label>
        <textarea
          id="message"
          v-model="feedback.message"
          placeholder="Scrivi il tuo feedback"
          required
        ></textarea>
      </div>
      <button type="submit">Invia</button>
    </form>
    <div v-if="submitted" class="thank-you">
      <p>Grazie per il tuo feedback! Hai dato una valutazione di {{ feedback.rating }} stelle.</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LeaveFeedback",
  setup() {
    const feedback = ref({
      rating: 0,
      message: "",
    });

    const hoverRating = ref(0);
    const submitted = ref(false);

    const setRating = (event, starIndex) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const isHalf = clickX < width / 2;
      feedback.value.rating = isHalf ? starIndex - 0.5 : starIndex;
    };

    const getStarClass = (starIndex) => {
      if (feedback.value.rating >= starIndex) return "full";
      if (feedback.value.rating >= starIndex - 0.5) return "half";
      return "empty";
    };

    const submitFeedback = () => {
      submitted.value = true;
      console.log("Feedback inviato:", feedback.value);
    };

    return {
      feedback,
      submitted,
      setRating,
      getStarClass,
    };
  },
};
</script>

<style scoped>
.leave-feedback {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 5px;
  user-select: none;
}

.star-container {
  position: relative;
  cursor: pointer;
  width: 24px;
}

.star {
  font-size: 24px;
  color: #ccc;
  transition: color 0.3s;
  pointer-events: none;
}

/* Stati delle stelle */
.star.full {
  color: #ffcc00;
}
.star.half {
  background: linear-gradient(90deg, #ffcc00 50%, #ccc 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.star.empty {
  color: #ccc;
}

.thank-you {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
