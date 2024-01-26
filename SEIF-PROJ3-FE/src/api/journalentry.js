import { getToken } from "../util/security";

const BASE_URL = 'http://localhost:3000/journal';

export async function createJournalEntry(entryData) {

  const token = getToken();
  
  const createURL = `${BASE_URL}/create-journal-entry`; 
  const response = await fetch(createURL, {
    method: 'POST',
    //TODO: Add JWT token to headers
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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

export async function updateJournalEntry(entryId, entryData) {
  const token = getToken();
  const updateURL = `${BASE_URL}/${entryId}`; 
  const response = await fetch(updateURL, {
    method: 'PUT', // PUT method for updating
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(entryData),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to update journal entry');
  }
}

export async function deleteJournalEntry(entryId) {
  const token = getToken();
  const deleteURL = `${BASE_URL}/${entryId}`; 
  const response = await fetch(deleteURL, {
    method: 'DELETE', // DELETE method for deletion
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Error response body:', errorBody);
    throw new Error('Failed to delete journal entry');
  }
}