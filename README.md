#Laboration 3 Mashup</h1>

Länk till applikationen : http://sandrahansson.net/webbapi/

<h3>Reflektionsfrågor</h3>


<strong>Vad finns det för krav du måste anpassa dig efter i de olika API:erna?</strong>

Google Maps: Man måste använda sig utav en API nyckel som man tilldelas på deras webbsida. För just mitt konto (Standard) så gäller det även att applikationen inte överskriper 25 000 kart uppladdningar per dag under en 90 dagars tidram.

Sveriges Radio: Under deras Användarvillkor lyder följande: "Materialet som tillhandahålls via API får inte användas på ett sådant sätt att det skulle kunna skada Sveriges Radios oberoende eller trovärdighet.".

<strong>Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?</strong>

Jag valde att cachea min trafikinformation i 15 minuter då det är en tillräckligt lång tid ifall närverket skulle vara svajjigt för användaren men inte för långt så att informationen fortfarande är aktuell.

<strong>Vad finns det för risker kring säkerhet och stabilitet i din applikation?</strong>

Om Sveriges Radios API skulle srivas om på ett annat sätt så formateringen blev annorlunda (ex namnbyte på objekt element, borttagning av essentiella element, borttagning av jsonformat) så skulle applikationen krasha och jag hade behövt skriva om lite kod. 

<strong>Hur har du tänkt kring säkerheten i din applikation?</strong>

Min applikation är ju främst skriven med javaskript så materialet finns tillgängligt för samtliga användare, dock så använder jag mig inte utav några input fält så det kan inte skickas in någon skadlig kod på sidan vilket gör att den inte bryter mot A3.Cross Site Scrupting, XSS. Datan som applikationen hanterar innehåller heller inga personliga eller känsliga uppgifter som kan läcka ut så den bryter inte mot A6.Känslig Exponering av Data.

<strong>Hur har du tänkt kring optimeringen i din applikation?</strong>

Kodsmässigt så har jag försökt använda mig så live som möjligt av duplicerad kod genom att bryta ut de i mindre funktioner där jag skickar med objektet eller objektets marker som en parameter efter jag loopat igenom samtliga objekt.

