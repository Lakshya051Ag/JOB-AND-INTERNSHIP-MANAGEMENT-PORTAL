// ====================================================
// Job and Internship Management Portal - JavaScript
// File: script.js
// Description: Basic interactive features (Search, Filter, Form Submit)
// ====================================================

// Wait until the web page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------------------
    // 1. Search Functionality
    // ----------------------------------------------------
    var searchBtn = document.getElementById("searchBtn");
    var resetBtn = document.getElementById("resetBtn");
    var jobSearch = document.getElementById("jobSearch");
    var locSearch = document.getElementById("locSearch");

    // Get all job cards and internship cards
    var jobCards = document.querySelectorAll(".job");
    var internshipCards = document.querySelectorAll(".internship");

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            var jobQuery = jobSearch.value.toLowerCase().trim();
            var locQuery = locSearch.value.toLowerCase().trim();

            var foundJobs = 0;
            var foundInternships = 0;

            // If both inputs are empty, alert user
            if (jobQuery === "" && locQuery === "") {
                alert("Please enter a job title, skill or location to search.");
                return;
            }

            // Filter Available Jobs
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

            // Filter Internships
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

            // If no results are found, show an alert
            if (foundJobs === 0 && foundInternships === 0) {
                alert("No matching jobs or internships found. Try different keywords.");
            } else {
                // Smooth scroll to jobs section to view results
                var jobsSection = document.getElementById("jobs");
                if (jobsSection) {
                    jobsSection.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    }

    // ----------------------------------------------------
    // 2. Reset Button Functionality
    // ----------------------------------------------------
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            // Clear input fields
            jobSearch.value = "";
            locSearch.value = "";

            // Show all jobs again
            for (var i = 0; i < jobCards.length; i++) {
                jobCards[i].style.display = "block";
            }

            // Show all internships again
            for (var j = 0; j < internshipCards.length; j++) {
                internshipCards[j].style.display = "block";
            }
        });
    }

    // ----------------------------------------------------
    // 3. Category Click to Quick Filter
    // ----------------------------------------------------
    var categories = document.querySelectorAll(".category");

    for (var k = 0; k < categories.length; k++) {
        categories[k].style.cursor = "pointer";
        categories[k].title = "Click to filter jobs";

        categories[k].addEventListener("click", function () {
            var categoryHeading = this.querySelector("h3").innerText;
            jobSearch.value = categoryHeading;
            locSearch.value = "";

            // Automatically trigger the search button
            if (searchBtn) {
                searchBtn.click();
            }
        });
    }

    // ----------------------------------------------------
    // 4. Modal Application Form Submission Handler
    // ----------------------------------------------------
    var applicationForms = document.querySelectorAll(".modal-box form");

    for (var m = 0; m < applicationForms.length; m++) {
        applicationForms[m].addEventListener("submit", function (e) {
            e.preventDefault(); // Stop normal form submission (prevents page reload)

            // Get applicant name
            var nameField = this.querySelector("input[name='name']");
            var applicantName = nameField ? nameField.value : "Applicant";

            // Get role title from modal heading
            var modalBox = this.closest(".modal-box");
            var roleTitle = modalBox ? modalBox.querySelector("h3").innerText : "the selected role";

            // Success message popup
            alert("Thank you, " + applicantName + "!\nYour application for " + roleTitle + " has been submitted successfully.\nWe will contact you soon.");

            // Clear form fields
            this.reset();

            // Close modal by resetting URL hash
            window.location.hash = "#";
        });
    }

});
