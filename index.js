function searchIFSC(event) {
    event.preventDefault();
    
    const ifscCode = document.getElementById('ifscCode').value.toUpperCase();
    const loading = document.querySelector('.loading');
    const result = document.getElementById('result');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.querySelector('button[type="submit"]');
    const spinner = submitBtn.querySelector('.spinner-border');
    const searchText = submitBtn.querySelector('.search-text');

    // Hide previous results and error messages
    result.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Show loading state
    submitBtn.disabled = true;
    spinner.classList.remove('d-none');
    searchText.textContent = 'Searching...';

    // Make API call to Razorpay IFSC API
    fetch('https://ifsc.razorpay.com/' + ifscCode)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid IFSC code or unable to fetch bank details');
            }
            return response.json();
        })
        .then(data => {
            // Reset button state
            submitBtn.disabled = false;
            spinner.classList.add('d-none');
            searchText.textContent = 'Search';

            // Display results
            document.getElementById('bankName').textContent = data.BANK;
            document.getElementById('branch').textContent = data.BRANCH;
            document.getElementById('address').textContent = data.ADDRESS;
            document.getElementById('city').textContent = data.CITY;
            document.getElementById('state').textContent = data.STATE;
            document.getElementById('micrCode').textContent = data.MICR || 'N/A';
            
            result.style.display = 'block';
        })
        .catch(error => {
            // Reset button state
            submitBtn.disabled = false;
            spinner.classList.add('d-none');
            searchText.textContent = 'Search';

            // Show error message
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        });
}

// Auto-format IFSC code input to uppercase
document.getElementById('ifscCode').addEventListener('input', function(e) {
    this.value = this.value.toUpperCase();
});