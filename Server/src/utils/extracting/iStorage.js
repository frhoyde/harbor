function parseIStorageData(data) {
  const competitor = {
    name: '',
    storage_units: [],
  };


  // Select the specific element to insert HTML
  //const targetElement = document.querySelector('html');
const unitContainer = document.getElementById('unit-html-container');
  unitContainer.insertAdjacentHTML('beforeend', data);

  const storageUnitElements =
    unitContainer.querySelectorAll('.unit-select-item');

  console.log(storageUnitElements.length);

  storageUnitElements.forEach((unitElement, index) => {
    const sizeString = unitElement.querySelector(
      '.unit-select-item-detail-heading'
    ).innerHTML;
    const size = parseSize(sizeString);

    const type = unitElement.querySelector('.det').innerText;

    const price = parseFloat(
      unitElement
        .querySelector('.part_item_price')
        .innerText.replace(/[^\d.]/g, '')
    );

    const features = Array.from(
      unitElement.getElementsByClassName('det-listing')
    )
      .map((li) => li.innerText)
      .pop()
      .split(/\r?\n/);

    const specialElement = unitElement.querySelector('.part_badge');
    const special = specialElement
      ? specialElement.querySelector('span').innerText
      : undefined;

    // Create a table row with JSON and raw HTML for each unit
    const tableRow = `
  <tr>
    <td>${index + 1}</td>
    <td><pre contenteditable="true">${JSON.stringify(
      {
        size,
        type,
        price,
        features,
        special,
      },
      null,
      2
    )}</pre></td>
    <td><pre>${escapeHtml(unitElement.outerHTML)}</pre></td>
  </tr>`;


    competitor.storage_units.push({
      size,
      type,
      price,
      features,
      special,
    });

    // Append the table row to the result table
    document
      .getElementById('resultTableBody')
      .insertAdjacentHTML('beforeend', tableRow);
  });

  return competitor;
}

function parseSize(sizeString) {
  // Use a regular expression to extract width and depth values
  const match = sizeString.match(/\s*(\d+)\s*x\s*(\d+)\s*/);
  if (match) {
    const width = parseFloat(match[1]);
    const depth = parseFloat(match[2]);
    return { width, depth };
  }
  // Return a default size if the format is not as expected
  return { width: 0, depth: 0 };
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export { parseIStorageData };