const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'ZKX214GsdCw39QtIVdTIvqfyiytWHS67ZmJulXK_eCE';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper func to set attributes of DOM elts
function setAttributes(elt, attributes) {
    for (const key in attributes) {
        elt.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each obj in photosArray
    photosArray.forEach((photo) => {

        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });


        // Create image for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event listener, check when each is inished loading
        img.addEventListener('load', imageLoaded);

        // put the image inside anchor element, then put both inside of our image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos()
    } catch (error) {

    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    // Are we within 1000 pixels of the bottom of the page?
    // window.innerHeight: Height of the visible portion of the browser window (viewport).
    // window.scrollY: How far the user has scrolled vertically from the top of the page.
    // document.body.offsetHeight: Total height of the entire page content, including what’s off-screen.

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})


// on load
getPhotos();