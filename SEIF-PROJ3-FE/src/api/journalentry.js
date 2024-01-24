const BASE_URL = 'http://localhost:3000/journal';

export async function createJournalEntry(entryData) {
  const createURL = `${BASE_URL}/create-journal-entry`; 
  const response = await fetch(createURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entryData),
  });

  if (response.ok) {
    return response.json();
  } else {
    // It's good to log the response to understand the error details
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to create journal entry');
  }
}

export async function getJournalEntries(queryParams) {
  const searchParams = new URLSearchParams(queryParams);
  const getURL = `${BASE_URL}?${searchParams}`;
  const response = await fetch(getURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    return response.json();
  } else {
    // It's good to log the response to understand the error details
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to get journal entries');
  }
}

export async function getJournalEntryById(entryId) {
  const getURL = `${BASE_URL}/${entryId}`; // RESTful convention for fetching a resource by ID
  const response = await fetch(getURL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to get journal entry');
  }
}

export async function getJournalEntriesByUserAndMonth(userId, month, year) {
  const response = await fetch(`http://localhost:3000/journal/user/${userId}/month/${month}/year/${year}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}