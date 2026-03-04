# Album Search & Save

This project is a small web application that allows users to search for albums and save their favorites. It uses a Mock API service along with the Fetch API to make GET, POST, and DELETE requests.

---

## Project Overview

The app has two main views:

1. **Search Albums**
2. **Favorite Albums**

Users can search for albums, add them to their favorites list, and remove them later. The data is stored both locally and in a Mock API resource.

This project focuses on:
- Fetching data from an API
- Display templating
- Working with objects and arrays
- Managing state
- Keeping local and remote data synchronized

---

## Search Albums View

- Fetches album data from the Mock API.
- Allows users to search by:
  - `artistName`
  - `albumName`
- Search is dynamic and filters matching results.
- Results are rendered using a reusable template.
- Each album card includes an **Add to Favorites** button.

---

## Favorite Albums View

- Displays albums saved to the favorites resource in the Mock API.
- Uses the same album card template as the search view.
- Button text changes to **Remove from Favorites**.
- When clicked:
  - The album is removed from the DOM.
  - The album is removed from the local data store.
  - (Bonus) The album is also removed from the Mock API.

The UI and the API data stay in sync.

---

## Tab Navigation

The app switches between the Search and Favorites views by adding and removing classes:

- `active` class updates the selected tab.
- `d-none` class hides or shows the correct section.

This keeps everything clean without reloading the page.

---

## API Requests Used

- **GET** – Fetch albums from the albums resource.
- **GET** – Fetch saved albums from the favorites resource.
- **POST** – Add an album to favorites.
- **DELETE** (Bonus) – Remove album from favorites.

Duplicate favorites are prevented so only one copy of each album is saved.

---

## Skills Demonstrated

- Fetch API (GET, POST, DELETE)
- Async/Await
- Working with JSON data
- DOM manipulation
- Interactive templating
- State management
- Event handling
- Keeping frontend and backend data in sync

---
