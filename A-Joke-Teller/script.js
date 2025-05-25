const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK
const VoiceRSS = { speech: function (e) { this._validate(e), this._request(e) }, _validate: function (e) { if (!e) throw "The settings are undefined"; if (!e.key) throw "The API key is undefined"; if (!e.src) throw "The text is undefined"; if (!e.hl) throw "The language is undefined"; if (e.c && "auto" != e.c.toLowerCase()) { var a = !1; switch (e.c.toLowerCase()) { case "mp3": a = (new Audio).canPlayType("audio/mpeg").replace("no", ""); break; case "wav": a = (new Audio).canPlayType("audio/wav").replace("no", ""); break; case "aac": a = (new Audio).canPlayType("audio/aac").replace("no", ""); break; case "ogg": a = (new Audio).canPlayType("audio/ogg").replace("no", ""); break; case "caf": a = (new Audio).canPlayType("audio/x-caf").replace("no", "") }if (!a) throw "The browser does not support the audio codec " + e.c } }, _request: function (e) { var a = this._buildRequest(e), t = this._getXHR(); t.onreadystatechange = function () { if (4 == t.readyState && 200 == t.status) { if (0 == t.responseText.indexOf("ERROR")) throw t.responseText; audioElement.src = t.responseText, audioElement.play() } }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a) }, _buildRequest: function (e) { var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true" }, _detectCodec: function () { var e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "" }, _getXHR: function () { try { return new XMLHttpRequest } catch (e) { } try { return new ActiveXObject("Msxml3.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { } throw "The browser does not support HTTP request" } };

// Function to toggle the button's disabled state
function toggleButton() {
    button.disabled = !button.disabled;
}

// Function to send the joke text to the VoiceRSS API for speech synthesis
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'ff6bb4a705204014bbb46b67895dd017', // Your VoiceRSS API key
        src: joke, // The text to convert to speech
        hl: "en-us", // Language (English - US)
        r: 0, // Rate of speech
        c: "mp3", // Audio format
        f: "44khz_16bit_stereo", // Frequency and bit rate
        ssml: false // SSML (optional) is disabled
    });
}

/// Function to fetch a programming joke from the JokeAPI
async function getJokes() {
    let joke = ''; // Variable to store the joke
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl); // Fetch joke data from the API
        const data = await response.json(); // Convert the response to JSON
        // Check if the joke has a setup and delivery (two-part joke)
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`; // Combine setup and delivery
        } else {
            joke = data.joke; // Single-line joke
        }
        tellMe(joke); // Convert the joke to speech
        toggleButton(); // Disable the button until the audio finishes
    } catch (error) {
        console.log('Whoops, Error:', error); // Log any errors
    }
}

// Event listener for the button click to fetch jokes
button.addEventListener('click', getJokes);

// Event listener to re-enable the button after the audio finishes
audioElement.addEventListener('ended', toggleButton);