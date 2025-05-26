<template>
  <div class="hotline-container">
    <h1>Горячая линия поддержки</h1>
    <div class="info-section">
      <h2>Связаться с нами:</h2>
      <p>Обращайтесь круглосуточно по телефону или отправляйте письма на электронную почту. Мы стараемся обрабатывать обращения максимально быстро и оперативно помогать нашим клиентам.</p>
    </div>
    <div class="contact-info">
      <a :href="'tel:' + phoneNumber" class="phone-link">{{ phoneNumber }}</a>
      <a :href="'mailto:' + emailAddress" class="email-link">{{ emailAddress }}</a>
    </div>
    <div class="info-section">
      <h2>Время обработки запроса:</h2>
      <p>Среднее время обработки заявок составляет 1 рабочий день. Большинство обращений обрабатываются значительно быстрее.</p>
      <p>Так же можно через бота в телеграме</p>
      <a href="https://t.me/Akkery_bot"> AkkeryHelp</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHotline',
  data() {
    return {
      phoneNumber: '+7 (495) 123-45-67',
      emailAddress: 'support@example.com'
    };
  }
};
</script>

<style scoped>
.hotline-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.info-section {
  margin-bottom: 20px;
}

.info-section h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.contact-info {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.phone-link, .email-link {
  font-size: 18px;
  color: #007BFF;
  text-decoration: underline;
}

.phone-link::before {
  content: '\u260E'; /* Телефон */
  margin-right: 5px;
}

.email-link::before {
  content: '\u2709'; /* Почта */
  margin-right: 5px;
}
</style>