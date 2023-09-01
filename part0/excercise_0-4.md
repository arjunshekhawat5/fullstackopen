sequenceDiagram
participant browser
participant server

    Note right of browser: The user types a new note in the form and click save.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: TEXT/HTML URL Redirect
    deactivate server

    Note Left of server: The server gets new note from POST request and adds it to the JSON which contains all notes.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the new JSON from the server containing the new note

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Hello World", "date": "2023-09-01" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
