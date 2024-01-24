import * as journalAPI from '../api/journalentry';

export async function createJournalEntry(entryData) {
  // Delegate the network request code to the journalentry-api.js API module
  return await journalAPI.createJournalEntry(entryData);
}

// export async function getJournalEntries(queryParams) {
//   // Delegate the network request code to the journalentry-api.js API module
//   return await journalAPI.getJournalEntries(queryParams);
// }

export async function getJournalEntryById(entryId) {
  // Delegate the network request code to the api/journalentry.js API module
  return await journalAPI.getJournalEntryById(entryId);
}

export async function getJournalEntriesByUserAndMonth(userId, month, year) {
  // Delegate the network request code to the journalentry-api.js API module
  return await journalAPI.getJournalEntriesByUserAndMonth(userId, month, year);
}