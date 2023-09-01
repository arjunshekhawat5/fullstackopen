sequenceDiagram
participant browser
participant server

    Note right of browser: The user types a new note and clicks on save button

    Note right of browser: The javasript code created an event handler for the save button which adds the new note to the list and rerenders the notes list.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON [{ "content": "Hello World", "date": "2023-09-01" } ]
    deactivate server

    Note right of browser: The browser sends the new note to the server in form of JSON and the server doest not request any redirect/reload.
