# u05 Todo App (VG)

[🔗 Todo-applikationen – live](https://cribepencheff.github.io/u05-todo-app/)

## Projektbeskrivning

Detta är en enkel todo-applikation där användare kan registrera sig (sign up), logga in med e-post och lösenord för att hantera sina personliga att-göra-listor.
Applikationen är byggd med *Vite*, *Vanilla TypeScript* och *Supabase* som Backend-as-a-Service.

## Reflektioner och Lärdomar
Jag känner mig nöjd med resultatet, särskilt med tanke på att det är mitt första projekt med en *BaaS* som *Supabase*. Dokumentationen var lätt att navigera, och jag använde både den och Supabase's AI-assistent för att skapa de nödvändiga användarpolicys. Dessa säkerställde att endast autentiserade användare kan läsa, skapa, uppdatera och radera sina egna todos i databasen.

*Vite* var nytt för mig, och jag stötte på utmaningar med hantering av assets, särskilt när det gäller att hantera olika typer beroende på deras ändamål. Statiska assets som delningsbilder bör placeras i public-mappen, medan bilder i HTML hanteras med relativa sökvägar och bilder i `.ts`-filer importeras som moduler. När jag löste dessa problem fick jag en bättre förståelse för Vites struktur. Jag ser fram emot att fortsätta arbeta med Vite, särskilt när jag börjar med React. Jag använde också ChatGPT för tips under projektets gång och känner mig nu mer bekväm med verktygen och processen, även om jag fortfarande har utrymme att fördjupa mig.

Jag kanske skrev lite mer kod än nödvändigt för den här appen, men mitt mål var att försöka prioritera typning och korrekt databehandling för att skapa en robust applikation. Det var också ett bra sätt för mig att bekanta mig med TypeScript och dess fördelar.

Som Supabase-dokumentationen föreslog laddade jag ner Supabase-typerna och använde de delar jag behövde för projektet. Detta hjälpte mig att undvika felaktig hantering av data, och jag skapade sedan egna lokala typer för att hantera Todo från Supabase-typerna.

Jag är nöjd med projektstrukturen, då jag försökt skapa en lättnavigerad och skalbar mappstruktur. Jag märker att jag fortfarande lägger mycket tid på att bestämma hur jag vill strukturera mina projekt, men jag kommer att bli bättre på detta med tiden.

Vid publicering gjorde jag en miss genom att först pusha min `.env`-fil med Supabase-nycklarna till GitHub. Efter att ha läst på om bästa praxis för säkerhet lade jag till filen i `.gitignore` och lade istället till nycklarna som *Repository Secrets* för publicering via `GitHub Pages`. Jag raderade historiken för `.env-filen` med hjälp av `git filter-repo` för att säkerställa att nycklarna inte fanns kvar i Git-historiken. Här tog jag hjälp av ChatGPT för att få steg-för-steg-guidning.

## Funktioner

- Användarregistrering och autentisering med e-post och lösenord via Supabase.
- CRUD-operationer för todos: Skapa, Läs, Uppdatera och Ta bort uppgifter.
- Ren och enkel användargränssnitt.

## Förutsättningar

- Node.js (version 16 eller senare)
- Ett Supabase-konto och projekt
- En databas som heter `todos` i Supabase

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
