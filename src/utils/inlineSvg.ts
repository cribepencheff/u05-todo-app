document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[src$=".svg"]');

  images.forEach(async (img)=> {
    const imageElement = img as HTMLImageElement;
    const svg = await loadSVG(imageElement.src);
    const imgClass = imageElement.className;
    img.replaceWith(svg);
    imgClass && svg.classList.add(imgClass);
  });
});

async function loadSVG(url: string): Promise<SVGElement> {
  const response = await fetch(url);
  const svgText = await response.text();
  const div = document.createElement('div');
  div.innerHTML = svgText;
  return div.firstElementChild as SVGElement;
}
