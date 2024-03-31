function calculateAge() {
            const birthdate = document.getElementById("birthdate").value;
            const resultElement = document.getElementById("result");
            const nextBirthdayElement = document.getElementById("nextBirthday");
            const birthdateLabel = document.getElementById("birthdateLabel");

            // Get selected language from the dropdown
            const selectedLanguage = document.getElementById("language").value;

            if (birthdate) {
                const today = new Date();
                const birthDate = new Date(birthdate);

                let ageYears = today.getFullYear() - birthDate.getFullYear();
                let ageMonths = today.getMonth() - birthDate.getMonth();
                let ageDays = today.getDate() - birthDate.getDate();

                if (ageDays < 0) {
                    ageMonths--;
                    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                }

                if (ageMonths < 0) {
                    ageYears--;
                    ageMonths += 12;
                }

                // Use language-specific messages based on user's choice
                const languageMessages = {
                    'en': `Your age is ${ageYears} years, ${ageMonths} months, and ${ageDays} days.`,
                    'bn': `আপনার বয়স হলো ${ageYears} বছর, ${ageMonths} মাস, এবং ${ageDays} দিন।`
                    // Add more languages as needed
                };

                resultElement.innerText = languageMessages[selectedLanguage];
                resultElement.style.color = "black";

                // Calculate days until the next birthday
                const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

                if (today > nextBirthday) {
                    // Birthday already occurred this year, calculate for the next year
                    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
                }

                const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

                // Use language-specific messages for next birthday
                const nextBirthdayMessages = {
                    'en': `Your next birthday will be in: ${daysUntilNextBirthday} days 🎉.`,
                    'bn': `আপনার পরবর্তী জন্মদিন হবে: ${daysUntilNextBirthday} দিনে 🎉।`
                    // Add more languages as needed
                };

                nextBirthdayElement.innerHTML = nextBirthdayMessages[selectedLanguage];

                // Use language-specific label for birthdate
                const birthdateLabels = {
                    'en': 'Enter Your Birthdate:',
                    'bn': 'আপনার জন্মতারিখ লিখুন:'
                    // Add more languages as needed
                };

                birthdateLabel.innerText = birthdateLabels[selectedLanguage];
            } else {
                resultElement.innerText = "Please enter your birthdate";
                resultElement.style.color = "red";
                nextBirthdayElement.innerText = ""; // Clear the next birthday result if birthdate is not entered
            }
        }
        // Function to change language on user selection
        function changeLanguage(selectedLanguage) {
            document.documentElement.lang = selectedLanguage;
            // Call calculateAge to update labels immediately upon language change
            calculateAge();
        }
  

