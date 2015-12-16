<h1>Laboration 3 Mashup</h1>

Länk till applikationen : http://sandrahansson.net/webbapi/
=========

<h3>Reflektionsfrågor</h3>

<ul>
<li>Vad finns det för krav du måste anpassa dig efter i de olika API:erna?</li>

<li>Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?</li>
Jag valde att cachea min trafikinformation i 15 minuter då det är en tillräckligt lång tid ifall närverket skulle vara svajjigt för användaren men inte för långt så att informationen fortfarande är aktuell.
<li>Vad finns det för risker kring säkerhet och stabilitet i din applikation?</li>

<li>Hur har du tänkt kring säkerheten i din applikation?</li>
Min applikation är ju främst skriven med javaskript så materialet finns tillgängligt för samtliga användare, dock så använder jag mig inte utav några input fält så det kan inte skickas in några injections på sidan vilket gör att den inte bryter mot A1.Injections. Datan som applikationen hanterar innehåller heller inga personliga eller känsliga uppgifter som kan läcka ut så den bryter inte mot A6.Känslig Exponering av Data.
<li>Hur har du tänkt kring optimeringen i din applikation?</li>
Kodsmässigt så har jag försökt använda mig så live som möjligt av duplicerad kod genom att bryta ut de i mindre funktioner där jag skickar med objektet eller objektets marker som en parameter efter jag loopat igenom samtliga objekt.
</ul>
