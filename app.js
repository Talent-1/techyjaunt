import data from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const timeOptions = document.querySelectorAll('.time-options button');
  const activityCards = document.querySelectorAll('.activity-card');

  function updateActivityCards(timeframe) {
    activityCards.forEach((card) => {
      const category = card.querySelector('.activity-title').textContent.trim(); // Get category from the card title
      const categoryData = data.find(item => item.title === category);

      if (categoryData) {
        const currentTime = categoryData.timeframes[timeframe].current;
        const previousTime = categoryData.timeframes[timeframe].previous;

        card.querySelector('.current-time').textContent = `${currentTime}hrs`;
        card.querySelector('.previous-time').textContent = `Last Week - ${previousTime}hrs`;
      } else {
        console.error(`Category data not found for ${category}`);
      }
    });
  }

  // Initial update on page load (default to weekly)
  updateActivityCards('weekly');

  timeOptions.forEach(button => {
    button.addEventListener('click', () => {
      timeOptions.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const timeframe = button.getAttribute('data-timeframe');
      updateActivityCards(timeframe);
    });
  });
});
