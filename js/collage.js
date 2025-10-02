// collage.js
/**
 * Creates a square collage of images inside the given container.
 * @param {HTMLElement} container - Container element to append the collage
 * @param {string} performerId - ID of the performer
 * @param {string} imageBasePath - Base path for performer images
 */
export function createCollage(container, performerId, imageBasePath = './data/images') {
  container.innerHTML = ''; // clear container

  // Collage wrapper (square)
  const collageWrapper = document.createElement('div');
  collageWrapper.style.position = 'relative';
  collageWrapper.style.width = '100%';
  collageWrapper.style.paddingTop = '100%'; // maintain square
  collageWrapper.style.overflow = 'hidden';
  collageWrapper.style.borderRadius = '8px';
  collageWrapper.style.background = '#f0f0f0';
  container.appendChild(collageWrapper);

  // Helper to create positioned image
  function createImage(src, left, top, width, height) {
    const img = document.createElement('img');
    img.src = src;
    img.onerror = () => { img.src = `${imageBasePath}/placeholder.jpg`; };
    img.style.position = 'absolute';
    img.style.left = left;
    img.style.top = top;
    img.style.width = width;
    img.style.height = height;
    img.style.objectFit = 'cover';
    img.style.border = '2px solid #fff';
    return img;
  }

  // Arrange main + 5 small images in mirrored L shape
  const mainImg = createImage(`${imageBasePath}/${performerId}/main.jpg`, '0%', '0%', '66%', '66%');
  const img1 = createImage(`${imageBasePath}/${performerId}/1.jpg`, '66%', '0%', '34%', '33%');
  const img2 = createImage(`${imageBasePath}/${performerId}/2.jpg`, '66%', '33%', '34%', '33%');
  const img3 = createImage(`${imageBasePath}/${performerId}/3.jpg`, '0%', '66%', '33%', '34%');
  const img4 = createImage(`${imageBasePath}/${performerId}/4.jpg`, '33%', '66%', '33%', '34%');
  const img5 = createImage(`${imageBasePath}/${performerId}/5.jpg`, '66%', '66%', '34%', '34%');

  collageWrapper.append(mainImg, img1, img2, img3, img4, img5);
}
