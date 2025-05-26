<template>
  <div class="questions-page">
    <h1>Часто задаваемые вопросы о косметике</h1>
    <div v-for="question in questions" :key="question.id" class="question-item">
      <details>
        <summary>{{ question.question }}</summary>
        {{ question.answer }}
      </details>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheQuestions',
  data() {
    return {
      questions: [
        {
          id: 1,
          question: 'Какой срок годности косметики?',
          answer: 'Срок годности косметики зависит от продукта. Обычно кремовую продукцию рекомендуют хранить до двух лет, жидкую декоративную косметику — до полутора лет, сухие средства (тени, пудры) — до трех лет.'
        },
        {
          id: 2,
          question: 'Можно ли пользоваться просроченной косметикой?',
          answer: 'Просроченная косметика теряет свою эффективность и может вызывать раздражение кожи. Поэтому настоятельно рекомендуем избегать использования такой косметики.'
        },
        {
          id: 3,
          question: 'Как правильно выбрать уходовую косметику?',
          answer: 'При выборе уходовой косметики обратите внимание на состав и цели продукта. Обратите особое внимание на маркировку для чувствительной кожи, гипоаллергенность и отсутствие агрессивных веществ, таких как парабены и сульфаты.'
        },
        {
          id: 4,
          question: 'Стоит ли экономить на декоративной косметике?',
          answer: 'Экономия на декоративной косметике возможна, но предпочтение стоит отдавать известным брендам и качественным продуктам, которые дольше держатся и не вызывают аллергических реакций.'
        },
        {
          id: 5,
          question: 'Как часто нужно обновлять косметичку?',
          answer: 'Рекомендуется регулярно проверять сроки годности и состояния косметических средств. По мере истечения срока годности меняйте косметику на свежие аналоги.'
        }
      ]
    };
  }
}
</script>

<style scoped>
.questions-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.question-item {
  margin-bottom: 20px;
}

summary {
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

details {
  margin-bottom: 10px;
}

details[open] summary ~ div {
  animation: fadeIn 0.3s linear forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary::-webkit-details-marker {
  display: none;
}

.details > div {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.6;
}
</style>