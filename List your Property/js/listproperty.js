function submitForm() {
            const form = document.getElementById('propertyForm');
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('propertyForm');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         const formData = new FormData(form);
//         fetch('/listyourproperty', {
//             method: 'POST',
//             body: formData,
//         })
//         .then(response => response.json()) // Assuming the server responds with plain text
//         .then(text => {
//             document.getElementById('formResponse').innerText = text; // Display the response
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             document.getElementById('formResponse').innerText = 'Submission failed. Please try again.';
//         });
//     });
// });