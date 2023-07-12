export function pressGrid(page, child) {
  return `
    <ul id="grid_page_${page}" class="press_grid">
        ${child}
    </ul>
    `;
}
