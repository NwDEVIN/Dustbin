       let backToTopBtn = document.querySelector(".back-to-top");

        
        window.onscroll = function() {
            if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        };

       
        backToTopBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };


document.addEventListener('DOMContentLoaded', () => {
    const startYearSelect = document.getElementById('start-year');
    const startMonthSelect = document.getElementById('start-month');
    const startDaySelect = document.getElementById('start-day');
    const endYearSelect = document.getElementById('end-year');
    const endMonthSelect = document.getElementById('end-month');
    const endDaySelect = document.getElementById('end-day');

    const startYear = 1700; // Adjust this value as needed
    const currentYear = 3000; // Adjust this value as needed

    // Populate year dropdowns
    for (let year = startYear; year <= currentYear; year++) {
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        startYearSelect.add(option.cloneNode(true));
        endYearSelect.add(option.cloneNode(true));
    }

    // Populate month dropdowns
    for (let month = 1; month <= 12; month++) {
        let option = document.createElement('option');
        option.value = month;
        option.text = month;
        startMonthSelect.add(option.cloneNode(true));
        endMonthSelect.add(option.cloneNode(true));
    }

    // Function to populate days based on selected year and month
    function populateDays(selectDay, year, month) {
        if (!year || !month) return;

        const daysInMonth = new Date(year, month, 0).getDate();
        selectDay.innerHTML = ''; // Clear previous options

        for (let day = 1; day <= daysInMonth; day++) {
            let option = document.createElement('option');
            option.value = day;
            option.text = day;
            selectDay.add(option);
        }
    }

    // Populate days on year/month change
    function updateDays() {
        const startYear = parseInt(startYearSelect.value, 10);
        const startMonth = parseInt(startMonthSelect.value, 10);
        populateDays(startDaySelect, startYear, startMonth);

        const endYear = parseInt(endYearSelect.value, 10);
        const endMonth = parseInt(endMonthSelect.value, 10);
        populateDays(endDaySelect, endYear, endMonth);
    }

    startYearSelect.addEventListener('change', updateDays);
    startMonthSelect.addEventListener('change', updateDays);
    endYearSelect.addEventListener('change', updateDays);
    endMonthSelect.addEventListener('change', updateDays);

    // Function to calculate and display elapsed time
    window.calculateElapse = function() {
        const startYear = parseInt(startYearSelect.value, 10);
        const startMonth = parseInt(startMonthSelect.value, 10);
        const startDay = parseInt(startDaySelect.value, 10);

        const endYear = parseInt(endYearSelect.value, 10);
        const endMonth = parseInt(endMonthSelect.value, 10);
        const endDay = parseInt(endDaySelect.value, 10);

        // Validate selected dates
        if (!startYear || !startMonth || !startDay || !endYear || !endMonth || !endDay || 
            new Date(endYear, endMonth - 1, endDay) < new Date(startYear, startMonth - 1, startDay)) {
            document.querySelector('.date_span').innerHTML = '<span style="color: red;">End date must be greater than start date.</span>';
            return;
        }

        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endDate = new Date(endYear, endMonth - 1, endDay);

        // Calculate total days
        let totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Calculate elapsed years, months, and days
        let elapsedYears = endDate.getFullYear() - startDate.getFullYear();
        let elapsedMonths = endDate.getMonth() - startDate.getMonth();
        let elapsedDays = endDate.getDate() - startDate.getDate();

        if (elapsedDays < 0) {
            let daysInLastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
            elapsedDays += daysInLastMonth;
            elapsedMonths--;
        }
        if (elapsedMonths < 0) {
            elapsedMonths += 12;
            elapsedYears--;
        }

        // Calculate total weeks and remaining days
        let totalWeeks = Math.floor(totalDays / 7);
        let remainingDays = totalDays % 7;

        // Calculate total months
        let totalMonths = elapsedYears * 12 + elapsedMonths;

        // Output
        document.querySelector('.date_span').innerHTML = `${elapsedYears} years, ${elapsedMonths} months, and ${elapsedDays} days<br><br>Or, ${totalMonths} months and ${elapsedDays} days<br><br>Or, ${totalWeeks} weeks and ${remainingDays} days<br><br>Or, ${totalDays} days`;
    }

    // Set both start and end dates to today's date
    function setTodayDate() {
        const today = new Date();

        // Set start date to today's date
        startYearSelect.value = today.getFullYear();
        startMonthSelect.value = today.getMonth() + 1; // Months are 0-indexed
        populateDays(startDaySelect, today.getFullYear(), today.getMonth() + 1);
        startDaySelect.value = today.getDate();

        // Set end date to today's date
        endYearSelect.value = today.getFullYear();
        endMonthSelect.value = today.getMonth() + 1; // Months are 0-indexed
        populateDays(endDaySelect, today.getFullYear(), today.getMonth() + 1);
        endDaySelect.value = today.getDate();
    }

    setTodayDate(); // Initialize both dates to today's date
});
