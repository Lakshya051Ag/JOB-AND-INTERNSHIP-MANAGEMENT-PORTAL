// ====================================================
// Job and Internship Management Portal - JavaScript
// File: script.js
// Description: Multi-page interactivity (Search, Filter, Modals, Contact Form)
// ====================================================

// Wait until the entire HTML document is parsed and ready
document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------------------
    // 1. Search & Filter for Jobs and Internships
    // ----------------------------------------------------
    var searchBtn = document.getElementById("searchBtn");
    var resetBtn = document.getElementById("resetBtn");
    var jobSearch = document.getElementById("jobSearch");
    var locSearch = document.getElementById("locSearch");

    var jobCards = document.querySelectorAll(".job");
    var internshipCards = document.querySelectorAll(".internship");

    // Function to perform the search filter
    function performSearch() {
        if (!jobSearch || !locSearch) return;

        var jobQuery = jobSearch.value.toLowerCase().trim();
        var locQuery = locSearch.value.toLowerCase().trim();

        var foundJobs = 0;
        var foundInternships = 0;

        // If both inputs are empty
        if (jobQuery === "" && locQuery === "") {
            alert("Please enter a job title, skill or location to search.");
            return;
        }

        // Filter Jobs (if present on the current page)
        for (var i = 0; i < jobCards.length; i++) {
            var cardText = jobCards[i].innerText.toLowerCase();
            var matchJob = (jobQuery === "" || cardText.indexOf(jobQuery) !== -1);
            var matchLoc = (locQuery === "" || cardText.indexOf(locQuery) !== -1);

            if (matchJob && matchLoc) {
                jobCards[i].style.display = "block";
                foundJobs++;
            } else {
                jobCards[i].style.display = "none";
            }
        }

        // Filter Internships (if present on the current page)
        for (var j = 0; j < internshipCards.length; j++) {
            var internText = internshipCards[j].innerText.toLowerCase();
            var matchIntern = (jobQuery === "" || internText.indexOf(jobQuery) !== -1);
            var matchInternLoc = (locQuery === "" || internText.indexOf(locQuery) !== -1);

            if (matchIntern && matchInternLoc) {
                internshipCards[j].style.display = "block";
                foundInternships++;
            } else {
                internshipCards[j].style.display = "none";
            }
        }

        // If no results matched on this page
        var totalCards = jobCards.length + internshipCards.length;
        if (totalCards > 0 && foundJobs === 0 && foundInternships === 0) {
            alert("No listings found matching your search. Try different keywords.");
        }
    }

    // Attach click event to Search button
    if (searchBtn) {
        searchBtn.addEventListener("click", performSearch);
    }

    // Also allow pressing "Enter" key in search fields
    if (jobSearch) {
        jobSearch.addEventListener("keypress", function (e) {
            if (e.key === "Enter") performSearch();
        });
    }
    if (locSearch) {
        locSearch.addEventListener("keypress", function (e) {
            if (e.key === "Enter") performSearch();
        });
    }

    // ----------------------------------------------------
    // 2. Reset Button Functionality
    // ----------------------------------------------------
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            if (jobSearch) jobSearch.value = "";
            if (locSearch) locSearch.value = "";

            // Show all job cards again
            for (var i = 0; i < jobCards.length; i++) {
                jobCards[i].style.display = "block";
            }

            // Show all internship cards again
            for (var j = 0; j < internshipCards.length; j++) {
                internshipCards[j].style.display = "block";
            }
        });
    }

    // ----------------------------------------------------
    // 3. Category Click to Filter
    // ----------------------------------------------------
    var categories = document.querySelectorAll(".category");

    for (var k = 0; k < categories.length; k++) {
        categories[k].style.cursor = "pointer";
        categories[k].title = "Click to filter";

        categories[k].addEventListener("click", function () {
            var categoryHeading = this.querySelector("h3").innerText;

            if (jobSearch) {
                jobSearch.value = categoryHeading;
                if (locSearch) locSearch.value = "";
                performSearch();

                // Smooth scroll to jobs section
                var targetSection = document.getElementById("jobs") || document.getElementById("internships");
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                // If on a page without search bar, navigate to jobs.html with category
                window.location.href = "jobs.html?search=" + encodeURIComponent(categoryHeading);
            }
        });
    }

    // ----------------------------------------------------
    // 4. URL Query Parameter Support (e.g. jobs.html?search=Python)
    // ----------------------------------------------------
    var urlParams = new URLSearchParams(window.location.search);
    var searchParam = urlParams.get("search");

    if (searchParam && jobSearch) {
        jobSearch.value = searchParam;
        performSearch();
    }

    // ----------------------------------------------------
    // 5. Application Form Submission Handler (Modals)
    // ----------------------------------------------------
    var applicationForms = document.querySelectorAll(".modal-box form");

    for (var m = 0; m < applicationForms.length; m++) {
        applicationForms[m].addEventListener("submit", function (e) {
            e.preventDefault(); // Stop page reload

            var nameInput = this.querySelector("input[name='name']");
            var applicantName = nameInput && nameInput.value.trim() !== "" ? nameInput.value : "Applicant";

            var modalBox = this.closest(".modal-box");
            var positionTitle = modalBox ? modalBox.querySelector("h3").innerText : "Position";

            alert("Thank you, " + applicantName + "!\nYour application for " + positionTitle + " has been submitted successfully.\nWe will contact you via email.");

            this.reset(); // Clear all inputs

            // Close modal by resetting URL hash
            window.location.hash = "#";
        });
    }

    // ----------------------------------------------------
    // 6. Contact & Feedback Form Handler (About Page)
    // ----------------------------------------------------
    var contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var contactName = document.getElementById("contactName").value;
            alert("Thank you, " + contactName + "! Your feedback message has been received by Group 8.");

            contactForm.reset();
        });
    }

});
