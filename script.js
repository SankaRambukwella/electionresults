// Ensure the script runs after the page is fully loaded
window.onload = function() {
    // Initialize votes display
    updateVoteDisplay();
    updateTotalVotes();
    updateDistrictResults();

    // Update overall votes
    document.getElementById('updateVotesBtn').onclick = function() {
        const candidate = document.getElementById('candidateSelect').value;
        const votes = parseInt(document.getElementById('votesInput').value, 10);

        if (votes >= 0 && candidate >= 1 && candidate <= 3) {
            const currentVotes = parseInt(localStorage.getItem("candidate" + candidate + "Votes")) || 0;
            localStorage.setItem("candidate" + candidate + "Votes", currentVotes + votes);
            document.getElementById('message').innerText = 'Overall votes updated successfully!';
            updateVoteDisplay(); // Update the display after changes
            updateTotalVotes();  // Update total votes
        } else {
            alert("Please enter a valid number of votes.");
        }
    };

    // Clear overall votes
    document.getElementById('clearVotesBtn').onclick = function() {
        const candidate = document.getElementById('candidateSelect').value;
        localStorage.setItem("candidate" + candidate + "Votes", 0);
        document.getElementById('message').innerText = 'Votes cleared successfully!';
        updateVoteDisplay(); // Update the display after clearing votes
        updateTotalVotes();  // Update total votes
    };

    // Edit overall votes
    document.getElementById('editVotesBtn').onclick = function() {
        const candidate = document.getElementById('editCandidateSelect').value;
        const votes = parseInt(document.getElementById('editVotesInput').value, 10);

        if (votes >= 0 && candidate >= 1 && candidate <= 3) {
            localStorage.setItem("candidate" + candidate + "Votes", votes);
            document.getElementById('message').innerText = 'Votes edited successfully!';
            updateVoteDisplay(); // Update the display after editing votes
            updateTotalVotes();  // Update total votes
        } else {
            alert("Please enter a valid number of votes.");
        }
    };

    // Update District Votes
    document.getElementById('updateDistrictVotesBtn').onclick = function() {
        const district = document.getElementById('districtSelect').value;
        const candidate = document.getElementById('districtCandidateSelect').value;
        const votes = parseInt(document.getElementById('districtVotesInput').value, 10);

        if (votes >= 0 && candidate >= 1 && candidate <= 3) {
            const currentDistrictVotes = parseInt(localStorage.getItem(`${district}_candidate${candidate}Votes`)) || 0;
            localStorage.setItem(`${district}_candidate${candidate}Votes`, currentDistrictVotes + votes);
            document.getElementById('districtMessage').innerText = 'District votes updated successfully!';
            updateDistrictResults(); // Refresh the district results
        } else {
            alert("Please enter a valid number of votes.");
        }
    };

    // Clear District Votes
    document.getElementById('clearDistrictVotesBtn').onclick = function() {
        const district = document.getElementById('districtSelect').value;
        const candidate = document.getElementById('districtCandidateSelect').value;
        localStorage.setItem(`${district}_candidate${candidate}Votes`, 0);
        document.getElementById('districtMessage').innerText = 'District votes cleared successfully!';
        updateDistrictResults(); // Refresh the district results
    };

    // Edit District Votes
    document.getElementById('editDistrictVotesBtn').onclick = function() {
        const district = document.getElementById('editDistrictSelect').value;
        const candidate = document.getElementById('editDistrictCandidateSelect').value;
        const votes = parseInt(document.getElementById('editDistrictVotesInput').value, 10);

        if (votes >= 0 && candidate >= 1 && candidate <= 3) {
            localStorage.setItem(`${district}_candidate${candidate}Votes`, votes);
            document.getElementById('districtMessage').innerText = 'District votes edited successfully!';
            updateDistrictResults(); // Refresh the district results
        } else {
            alert("Please enter a valid number of votes.");
        }
    };
};

// Function to update the vote display for each candidate
function updateVoteDisplay() {
    for (let i = 1; i <= 3; i++) {
        const votes = localStorage.getItem("candidate" + i + "Votes") || 0;
        document.getElementById('votes' + i).innerText = votes;
    }
}

// Function to update total votes
function updateTotalVotes() {
    let totalVotes = 0;
    for (let i = 1; i <= 3; i++) {
        totalVotes += parseInt(localStorage.getItem("candidate" + i + "Votes")) || 0;
    }
    document.getElementById('totalVotes').innerText = 'Total Votes: ' + totalVotes;
}




document.addEventListener("DOMContentLoaded", function() {
    const shareData = {
        title: 'Election Results',
        text: 'Check out the latest election results!',
        url: window.location.href // Current page URL
    };

    // Facebook share URL
    document.getElementById('facebookShare').href = 
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;

    // WhatsApp share URL
    document.getElementById('whatsappShare').href = 
        `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;

    // Instagram sharing works differently, as it doesn't have a direct web share link.
    // You could suggest users to share via a story or a post by prompting them to take a screenshot.

    document.getElementById('instagramShare').onclick = function() {
        alert('To share on Instagram, take a screenshot of the results and post it on your feed or story!');
        return false; // Prevent default link behavior
    };
});

// Function to update votes display
function updateVoteDisplay() {
    // Update candidate votes display
    for (let i = 1; i <= 3; i++) {
        const votes = parseInt(localStorage.getItem("candidate" + i + "Votes")) || 0;
        document.getElementById('votes' + i).innerText = votes.toLocaleString(); // Format with thousands separator
    }

    // Update total votes
    const totalVotes = [...Array(3).keys()].reduce((total, i) => {
        return total + (parseInt(localStorage.getItem("candidate" + (i + 1) + "Votes")) || 0);
    }, 0);
    document.getElementById('totalVotes').innerText = 'Total Votes: ' + totalVotes.toLocaleString(); // Format total votes
}

// Call this function to initialize the vote display
updateVoteDisplay();


// Update District Votes
document.getElementById('updateDistrictVotesBtn').onclick = function() {
    const district = document.getElementById('districtSelect').value;
    const candidate = document.getElementById('districtCandidateSelect').value;
    const votes = parseInt(document.getElementById('districtVotesInput').value, 10);

    if (votes >= 0 && candidate >= 1 && candidate <= 3) {
        const currentDistrictVotes = parseInt(localStorage.getItem(`${district}_candidate${candidate}Votes`)) || 0;
        localStorage.setItem(`${district}_candidate${candidate}Votes`, currentDistrictVotes + votes);
        document.getElementById('districtMessage').innerText = 'District votes updated successfully!';

        // Update the display for district votes
        updateDistrictVoteDisplay();
    } else {
        alert("Please enter a valid number of votes.");
    }
};

// Function to update district votes display
function updateDistrictVoteDisplay() {
    const districtTable = document.getElementById('districtResults');
    districtTable.innerHTML = ''; // Clear existing rows

    const districts = ['District1', 'District2', /* Add other districts */];

    districts.forEach(district => {
        const row = document.createElement('tr');
        const districtVotes = [...Array(3).keys()].map(i => {
            return parseInt(localStorage.getItem(`${district}_candidate${i + 1}Votes`)) || 0;
        });

        row.innerHTML = `<td>${district}</td>
                         <td>${districtVotes[0].toLocaleString()}</td>
                         <td>${districtVotes[1].toLocaleString()}</td>
                         <td>${districtVotes[2].toLocaleString()}</td>`;
        districtTable.appendChild(row);
    });
}

// Call this function when loading to display initial district votes
updateDistrictVoteDisplay();

// Function to update district votes display
function updateDistrictVoteDisplay() {
    const districtTable = document.getElementById('districtResults');
    districtTable.innerHTML = ''; // Clear existing rows

    const districts = [
        "Colombo", "Gampaha", "Kaluthara", "Kandy", "Matale",
        "Nuwara Eliya", "Galle", "Matara", "Hambantota", "Jaffna",
        "Vanni", "Batticaloa", "Digamadulla", "Trinkomalee", "Kurunegale",
        "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla", "Monaragala",
        "Rathnapura", "Kegalle"
    ];

    districts.forEach(district => {
        const row = document.createElement('tr');
        const districtVotes = [...Array(3).keys()].map(i => {
            return parseInt(localStorage.getItem(`${district}_candidate${i + 1}Votes`)) || 0;
        });

        row.innerHTML = `<td>${district}</td>
                         <td>${districtVotes[0].toLocaleString()}</td>
                         <td>${districtVotes[1].toLocaleString()}</td>
                         <td>${districtVotes[2].toLocaleString()}</td>`;
        districtTable.appendChild(row);
    });
}

// Call this function when loading to display initial district votes
updateDistrictVoteDisplay();

// Example data for candidates
const candidates = [
    { name: "Candidate 1", image: "candidate1.jpg", votes: 150 },
    { name: "Candidate 2", image: "candidate2.jpg", votes: 200 },
    { name: "Candidate 3", image: "candidate3.jpg", votes: 180 }
];

// Function to find and display the leading candidate's emoji
function displayTopCandidate() {
    const topCandidateIndex = candidates.reduce((prevIndex, current, index) => {
        return (candidates[prevIndex].votes > current.votes) ? prevIndex : index;
    }, 0);

    // Get the leading candidate element
    const leadingCandidate = document.getElementById(`candidate${topCandidateIndex + 1}`);

    // Get the emoji element
    const emoji = document.getElementById('topEmoji');

    // Position the emoji above the leading candidate
    const rect = leadingCandidate.getBoundingClientRect();
    emoji.style.left = `${rect.left + rect.width / 2 - 24}px`; // Center the emoji above
    emoji.style.top = `${rect.top - 40}px`; // Adjust vertical position

    // Make the emoji visible
    emoji.classList.add('visible');
}

// Call the function to display the top candidate's emoji
displayTopCandidate();



