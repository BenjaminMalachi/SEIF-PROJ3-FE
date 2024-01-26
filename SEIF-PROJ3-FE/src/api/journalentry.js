const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/journal'
  : 'https://seif-proj-3-be-379k.vercel.app/journal';

//create journal based on auth token
export async function createJournalEntry(entryData, token) {
  const createURL = `${BASE_URL}/create-journal-entry`;
  const response = await fetch(createURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Assuming you are using Bearer token
    },
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

