document.getElementById('job-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const company = document.getElementById('company').value;
    const description = document.getElementById('description').value;

    fetch('/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            company: company,
            description: description,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Job Posted!');
        window.location.href = 'jobs.html';
    });
});
