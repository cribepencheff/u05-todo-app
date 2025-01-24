# u05 Todo App

[🔗 Todo-applikationen – live](https://cribepencheff.github.io/u05-todo-app/)

## Projektbeskrivning

Detta är en enkel todo-applikation där användare kan logga in med e-post och lösenord för att hantera sina personliga att-göra-listor.
Applikationen är byggd med Vite, Vanilla TypeScript och Supabase.

## Funktioner

- Användarregistrering och autentisering med e-post och lösenord via Supabase.
- CRUD-operationer för todos: Skapa, Läs, Uppdatera och Ta bort uppgifter.
- Ren och enkel användargränssnitt.

## Förutsättningar

- Node.js (version 16 eller senare)
- Ett Supabase-konto och projekt
- En databas som heter todos i Supabase

## Komma igång

1. **Installera beroenden**

    ```
    npm install
    ```

2. **Ställ in miljövariabler**

    För lokal utveckling, skapa en `.env`-fil i root-katalogen och lägg till:

    ```
    VITE_SUPABASE_URL=<din-supabase-url>
    VITE_SUPABASE_ANON_KEY=<din-supabase-anon-key>
    ```

    Byt ut `<din-supabase-url>` och `<din-supabase-anon-key>` med värden från dina Supabase-projektinställningar.

    För att publicera sajten via GitHub Pages, spara dessa nycklar som *Repository Secrets* med namnen `VITE_SUPABASE_URL` och `VITE_SUPABASE_ANON_KEY`. Publiceringsprocessen använder dessa nycklar automatiskt för att konfigurera appen.

3. **Starta utvecklingsmiljön**

    ```
    npm run dev
    ```

## Skript

- `npm run dev`: Startar utvecklingsmiljön.
- `npm run build`: Bygger appen.
- `npm run preview`: Förhandsgranska appen lokalt.

## Publicering

Appen publiceras automatiskt till GitHub Pages vid varje commit till `main`-branchen. Detta görs via `.github/workflows/deploy.yml`.  
`dist/`-katalogen byggs och pushas till `gh-pages`-branchen.
