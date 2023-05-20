const form = document.getElementById('a');
const sumInput = document.getElementById('sum');
function calculate() {
    const urlParams = new URLSearchParams(window.location.search);
    x = urlParams.get('x');
    y = urlParams.get('y');
    const sum = parseInt(x) + parseInt(y);
    sumInput.value = sum;
    fetch('http://localhost:8000', {
        method: 'POST', 
        body: JSON.stringify({
            value: sum
        })
    });
}
window.addEventListener("DOMContentLoaded", () => {
    calculate()
});