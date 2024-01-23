import { fetchOrCreateTodayCard } from '../service/daycard';

// An async function to run the test
async function testFetchOrCreateTodayCard() {
  const testDate = '2024-01-24'; // Replace with a date you want to test

  try {
    const card = await fetchOrCreateTodayCard(testDate);
    console.log('Success:', card);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test function
testFetchOrCreateTodayCard();

