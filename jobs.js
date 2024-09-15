document.addEventListener('DOMContentLoaded', function() {
    const jobList = document.querySelector('.job-list');

    fetch('/jobs')
        .then(response => response.json())
        .then(jobs => {
            jobs.forEach(job => {
                const jobItem = document.createElement('div');
                jobItem.classList.add('job-item');

                jobItem.innerHTML = `
                    <h3>${job.title}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p>${job.description}</p>
                    <button>Apply Now</button>
                `;

                jobList.appendChild(jobItem);
            });
        });
});
